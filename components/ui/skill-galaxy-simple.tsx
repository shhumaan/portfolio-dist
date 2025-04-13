"use client"

import { motion } from "framer-motion"
import type { Skill } from "@/types/skill"
import { cn } from "@/lib/utils"
import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface SkillGalaxySimpleProps {
  skills: Skill[]
  onSelectSkill: (skill: Skill) => void
  selectedSkill: Skill | null
}

const categoryColors: Record<string, number> = {
  cloud: 0x4ECDC4,
  development: 0x34BE82,
  ai: 0x8A2BE2,
  database: 0xF4A261,
  system: 0xf43f5e,
}

// Get proficiency color based on level
const getProficiencyColor = (proficiency: number | string): string => {
  const num = typeof proficiency === 'number' ? proficiency : 0;
  if (num >= 80) return '#34BE82'; // Working - Vibrant Green
  if (num >= 50) return '#4ECDC4'; // Active Development - Soft Cyan
  return '#8A2BE2'; // Exploration - Rich Purple
};

export function SkillGalaxySimple({ skills, onSelectSkill, selectedSkill }: SkillGalaxySimpleProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [renderError, setRenderError] = useState<string | null>(null)

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Wait until the container has dimensions
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      // Optionally, set up a ResizeObserver or check again later
      // For now, we just return and let the effect re-run if needed
      console.warn("SkillGalaxySimple: Container dimensions are zero. Skipping init.");
      return;
    }

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let controls: OrbitControls | null = null;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Ensure alpha for transparency
      container.appendChild(renderer.domElement);
      renderer.setSize(container.clientWidth, container.clientHeight); // Set size after appending

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(50, 50, 50);
      scene.add(pointLight);

      // Skill Spheres
      skills.forEach((skill, index) => {
        const color = categoryColors[skill.category] || 0xffffff;
        const material = new THREE.MeshStandardMaterial({ color: color });
        const sphere = new THREE.Mesh(geometry, material);
        
        // Position spheres in a simple spiral or random cloud
        const angle = index * 137.5 * (Math.PI / 180);
        const radius = Math.sqrt(index + 1) * 2;
        sphere.position.set(Math.cos(angle) * radius, (index - skills.length / 2) * 0.5, Math.sin(angle) * radius);
        
        sphere.userData = { skill }; // Store skill data
        scene.add(sphere);
      });

      camera.position.z = 15;

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      // Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (controls) controls.update();
        if (renderer) renderer.render(scene, camera);
      };
      animate();

      // Initial resize call
      handleResize();

      window.addEventListener('resize', handleResize);

      setRenderError(null); // Clear any previous error

    } catch (error) {
      console.error("SkillGalaxySimple: Failed to initialize Three.js:", error);
      setRenderError("Could not load 3D visualization. WebGL might not be supported.");
      // Cleanup potentially partially initialized resources
      if (renderer && container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
      geometry?.dispose();
      // Dispose materials etc. if necessary
      return; // Stop further execution in this effect run
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (controls) controls.dispose();
      if (mountRef.current && container && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
      geometry.dispose();
      // Dispose materials?
      // Clean up spheres if needed
    };
  }, [skills]);

  // Raycasting for selection (Example, needs refinement)
  useEffect(() => {
    if (!mountRef.current || !selectedSkill) return;
    // Add logic here to highlight the selected skill sphere if needed
    // This would involve finding the sphere with matching userData
    // and potentially changing its material or adding an outline.
  }, [selectedSkill]);

  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      {renderError && (
        <div className="absolute inset-0 flex items-center justify-center text-destructive p-4 text-center bg-background/80 z-20">
          {renderError}
        </div>
      )}
      <div
        ref={mountRef}
        className="absolute inset-0"
      ></div>
    </div>
  );
}

