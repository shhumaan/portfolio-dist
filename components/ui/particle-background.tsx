"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface ParticleBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export default function ParticleBackground({ containerRef }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })

  // --- Add back getThemeColor helper ---
  function getThemeColor(variableName: string, fallbackColor: string = '#ffffff'): THREE.Color {
    if (typeof window !== 'undefined') {
      const colorString = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
      try {
        if (colorString.includes(' ')) { 
          const [h, s, l] = colorString.split(' ').map(parseFloat);
          if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
            const threeColor = new THREE.Color(`hsl(${h}, ${s}%, ${l}%)`);
            return threeColor;
          } else {
            return new THREE.Color(fallbackColor);
          }
        } else {
          const threeColor = new THREE.Color(colorString || fallbackColor);
          return threeColor;
        }
      } catch (e) {
        return new THREE.Color(fallbackColor);
      }
    } 
    return new THREE.Color(fallbackColor);
  }
  // -------------------------------------

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Initialization effect
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 8
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Particle Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      alphaMap: new THREE.TextureLoader().load("/particle.png"),
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true, // We still set vertex colors (to white)
    })

    // --- Define Gradient Particle Colors --- 
    const themeColor = getThemeColor('--theme-color');
    const whiteColor = new THREE.Color(0xffffff);
    const dimWhiteColor = whiteColor.clone().multiplyScalar(0.7);
    const particleColors = [
      themeColor.clone(),
      themeColor.clone().lerp(whiteColor, 0.3),
      themeColor.clone().lerp(whiteColor, 0.6),
      dimWhiteColor,
      whiteColor.clone()
    ];
    // ---------------------------------------

    // Particle Geometry & Groups
    const particleCount = window.innerWidth < 768 ? 2500 : 5000
    const particleGroup1 = new THREE.Group();
    const particleGroup2 = new THREE.Group();
    scene.add(particleGroup1);
    scene.add(particleGroup2);
    const geometry1 = new THREE.BufferGeometry();
    const geometry2 = new THREE.BufferGeometry();
    const particlesPerGroup = Math.floor(particleCount / 2);
    const boundary = 15;

    // Arrays for Group 1
    const positions1 = new Float32Array(particlesPerGroup * 3);
    const colors1 = new Float32Array(particlesPerGroup * 3);
    const velocities1 = new Float32Array(particlesPerGroup * 3);
    const sizes1 = new Float32Array(particlesPerGroup);
    let group1Idx = 0;

    // Arrays for Group 2
    const positions2 = new Float32Array((particleCount - particlesPerGroup) * 3);
    const colors2 = new Float32Array((particleCount - particlesPerGroup) * 3);
    const velocities2 = new Float32Array((particleCount - particlesPerGroup) * 3);
    const sizes2 = new Float32Array(particleCount - particlesPerGroup);
    let group2Idx = 0;

    // --- Populate Particle Data with RANDOM positions and velocities ---
    for (let i = 0; i < particleCount; i++) {
      // Random position within the boundary box
      const posX = (Math.random() - 0.5) * boundary * 2;
      const posY = (Math.random() - 0.5) * boundary * 2;
      const posZ = (Math.random() - 0.5) * boundary * 2;

      // Random velocity
      const velX = (Math.random() - 0.5) * 0.015; // Adjust speed factor if needed
      const velY = (Math.random() - 0.5) * 0.015;
      const velZ = (Math.random() - 0.5) * 0.015;
      
      // Assign color from gradient array
      const color = particleColors[i % particleColors.length];
      const variation = 0.85 + Math.random() * 0.15; // Slightly randomize brightness
      const r = color.r * variation;
      const g = color.g * variation;
      const b = color.b * variation;
      
      // Random base size
      const size = (0.3 + Math.random() * 0.7) * 0.03;

      // Assign to groups
      if (i % 2 === 0 && group1Idx < particlesPerGroup) {
        const idx3 = group1Idx * 3;
        positions1[idx3] = posX; colors1[idx3] = r; velocities1[idx3] = velX;
        positions1[idx3 + 1] = posY; colors1[idx3 + 1] = g; velocities1[idx3 + 1] = velY;
        positions1[idx3 + 2] = posZ; colors1[idx3 + 2] = b; velocities1[idx3 + 2] = velZ;
        sizes1[group1Idx] = size;
        group1Idx++;
      } else if (i % 2 !== 0 && group2Idx < (particleCount - particlesPerGroup)) {
        const idx3 = group2Idx * 3;
        positions2[idx3] = posX; colors2[idx3] = r; velocities2[idx3] = velX;
        positions2[idx3 + 1] = posY; colors2[idx3 + 1] = g; velocities2[idx3 + 1] = velY;
        positions2[idx3 + 2] = posZ; colors2[idx3 + 2] = b; velocities2[idx3 + 2] = velZ;
        sizes2[group2Idx] = size;
        group2Idx++;
      }
    }
    // ---------------------------------------------------------------------

    // Set Geometry Attributes
    geometry1.setAttribute("position", new THREE.BufferAttribute(positions1, 3));
    geometry1.setAttribute("color", new THREE.BufferAttribute(colors1, 3));
    geometry1.setAttribute("velocity", new THREE.BufferAttribute(velocities1, 3));
    geometry1.setAttribute("baseSize", new THREE.BufferAttribute(sizes1, 1));
    const particles1 = new THREE.Points(geometry1, particlesMaterial);
    particleGroup1.add(particles1);

    geometry2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
    geometry2.setAttribute("color", new THREE.BufferAttribute(colors2, 3));
    geometry2.setAttribute("velocity", new THREE.BufferAttribute(velocities2, 3));
    geometry2.setAttribute("baseSize", new THREE.BufferAttribute(sizes2, 1));
    const particles2 = new THREE.Points(geometry2, particlesMaterial);
    particleGroup2.add(particles2);

    // Animation loop
    let animationFrameId: number | null = null;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      if (!renderer || !scene || !camera || !particleGroup1 || !particleGroup2) return;

      const time = Date.now() * 0.001;
      
      // Update Group Function with Boundary WRAPPING
      function updateGroup(group: THREE.Group | null, velocities: Float32Array | null) {
        if (!group) return;
        const particles = group.children[0] as THREE.Points;
        if (!particles || !particles.geometry || !velocities) return;

        const positions = particles.geometry.getAttribute('position') as THREE.BufferAttribute;
        const baseSizes = particles.geometry.getAttribute('baseSize') as THREE.BufferAttribute;
        let sizes = particles.geometry.getAttribute('size') as THREE.BufferAttribute;
        if (!sizes || sizes.array.length !== baseSizes.count) {
            sizes = new THREE.BufferAttribute(new Float32Array(baseSizes.count), 1);
            particles.geometry.setAttribute('size', sizes);
        }
        
        for (let i = 0; i < positions.count; i++) {
          const i3 = i * 3;
          
          // Pulsing Size (Subtler pulse)
          const baseSize = baseSizes.array[i];
          const pulseFactor = 1 + Math.sin(time * 0.5 + i * 0.1) * 0.05; // Slower, less intense pulse
          sizes.array[i] = baseSize * pulseFactor;

          // Update Position based on velocity
          positions.array[i3] += velocities[i3];
          positions.array[i3 + 1] += velocities[i3 + 1];
          positions.array[i3 + 2] += velocities[i3 + 2];
          
          /* --- Temporarily Disable Mouse Influence --- 
          positions.array[i3] += mousePositionRef.current.x * 0.0005;
          positions.array[i3 + 1] += mousePositionRef.current.y * 0.0005;
          */
          
          // Boundary Wrapping Logic
           if (positions.array[i3] > boundary) positions.array[i3] = -boundary;
           if (positions.array[i3] < -boundary) positions.array[i3] = boundary;
           if (positions.array[i3 + 1] > boundary) positions.array[i3 + 1] = -boundary;
           if (positions.array[i3 + 1] < -boundary) positions.array[i3 + 1] = boundary;
           if (positions.array[i3 + 2] > boundary) positions.array[i3 + 2] = -boundary;
           if (positions.array[i3 + 2] < -boundary) positions.array[i3 + 2] = boundary;
        }
        positions.needsUpdate = true;
        sizes.needsUpdate = true;
      }

      const velocitiesArr1 = geometry1.getAttribute('velocity')?.array as Float32Array | null;
      const velocitiesArr2 = geometry2.getAttribute('velocity')?.array as Float32Array | null;
      updateGroup(particleGroup1, velocitiesArr1);
      updateGroup(particleGroup2, velocitiesArr2);
      
      /* --- Temporarily Disable Rotations --- 
      particleGroup1.rotation.y += 0.0005 + mousePositionRef.current.x * 0.0001;
      particleGroup1.rotation.x += mousePositionRef.current.y * 0.0001;
      particleGroup2.rotation.y -= 0.0003 - mousePositionRef.current.x * 0.00005;
      particleGroup2.rotation.x -= mousePositionRef.current.y * 0.00005;
      */
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      // Dispose Three.js objects
      scene?.remove(particleGroup1);
      scene?.remove(particleGroup2);
      geometry1?.dispose(); 
      geometry2?.dispose(); 
      particlesMaterial?.dispose(); 
      renderer?.dispose(); 
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

