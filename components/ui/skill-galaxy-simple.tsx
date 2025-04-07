"use client"

import { motion } from "framer-motion"
import type { Skill } from "@/types/skill"
import { cn } from "@/lib/utils"
import { useMemo, useRef, useEffect } from "react"
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

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Skill Spheres
    const spheres: THREE.Mesh[] = [];
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);

    skills.forEach((skill, index) => {
      const color = categoryColors[skill.category] || 0xffffff;
      const material = new THREE.MeshStandardMaterial({ color: color });
      const sphere = new THREE.Mesh(geometry, material);
      
      // Position spheres in a simple spiral or random cloud
      const angle = index * 137.5 * (Math.PI / 180);
      const radius = Math.sqrt(index + 1) * 2;
      sphere.position.set(Math.cos(angle) * radius, (index - skills.length / 2) * 0.5, Math.sin(angle) * radius);
      
      sphere.userData = { skill }; // Store skill data
      spheres.push(sphere);
      scene.add(sphere);
    });

    camera.position.z = 15;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      // Dispose materials?
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
      <div 
        ref={mountRef} 
        className="absolute inset-0 bg-background flex items-center justify-center"
      ></div>
    </div>
  );
}

