"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

interface ParticleBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export default function ParticleBackground({ containerRef }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Only run on client-side after component is mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update mouse position for particle interaction
  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMounted])

  useEffect(() => {
    // Only initialize Three.js after component is mounted and refs are available
    if (!isMounted || !canvasRef.current || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    // Position camera further back to see more of the scene
    camera.position.z = 8

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Particle setup - increase particle counts for fuller scene
    const particleCount = window.innerWidth < 768 ? 1800 : 3500
    const particleGeometry = new THREE.BufferGeometry()
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      alphaMap: new THREE.TextureLoader().load("/particle.png"),
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    // Create particles
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    // Define category colors based on our premium green/cream palette with more vibrant colors
    const categoryColors = {
      cloud: new THREE.Color(0x4ECDC4).multiplyScalar(1.2), // Brighter Cyan
      development: new THREE.Color(0x34BE82).multiplyScalar(1.2), // Brighter Green
      ai: new THREE.Color(0x268980).multiplyScalar(1.2), // Brighter Teal
      support: new THREE.Color(0xF4A261).multiplyScalar(1.2), // Brighter Amber
      emerald: new THREE.Color(0x06D6A0).multiplyScalar(1.2), // Brighter Emerald
      accent1: new THREE.Color(0x8EE4AF).multiplyScalar(1.2), // Mint
      accent2: new THREE.Color(0xEB5160).multiplyScalar(1.2), // Coral
    }

    // Create streams of particles - increase stream count
    const streamCount = 20
    const particlesPerStream = Math.floor(particleCount / streamCount)
    
    for (let s = 0; s < streamCount; s++) {
      // Generate a curved path for this stream using a seeded random approach
      const curvePoints = []
      const seed = s / streamCount; // Use stream index as seed for deterministic values
      
      // Generate "random" values that are actually deterministic based on the seed
      const randomOffset1 = Math.sin(seed * 10) * 4;
      const randomOffset2 = Math.cos(seed * 20) * 4;
      const randomOffset3 = Math.sin(seed * 30) * 4;
      
      const startX = (s % 3 - 1) * 8 // Deterministic start position
      const startY = (Math.floor(s / 4) - 1) * 8
      const startZ = ((s + 2) % 4 - 1.5) * 8
      
      // Deterministic curve control points
      const control1 = { 
        x: startX + randomOffset1,
        y: startY + randomOffset2, 
        z: startZ + randomOffset3 
      }
      
      const control2 = { 
        x: control1.x + randomOffset2,
        y: control1.y + randomOffset3, 
        z: control1.z + randomOffset1 
      }
      
      const endPoint = { 
        x: control2.x + randomOffset3,
        y: control2.y + randomOffset1, 
        z: control2.z + randomOffset2 
      }
      
      // Create cubic Bezier curve for this stream
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(control1.x, control1.y, control1.z),
        new THREE.Vector3(control2.x, control2.y, control2.z),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)
      )
      
      // Select a color for this stream
      const categories = Object.keys(categoryColors) as Array<keyof typeof categoryColors>
      const category = categories[s % categories.length]
      const color = categoryColors[category]
      
      // Place particles along the curve
      for (let p = 0; p < particlesPerStream; p++) {
        const i = s * particlesPerStream + p
        const i3 = i * 3
        
        // Get position along curve (from 0 to 1)
        const t = p / particlesPerStream
        const pos = curve.getPoint(t)
        
        // Position
        positions[i3] = pos.x
        positions[i3 + 1] = pos.y
        positions[i3 + 2] = pos.z
        
        // Color with slight variation - use deterministic variation
        const variation = 0.85 + ((p * s) % 10) / 100;
        colors[i3] = color.r * variation
        colors[i3 + 1] = color.g * variation
        colors[i3 + 2] = color.b * variation
        
        // Velocity (direction along curve)
        const nextT = Math.min(1, t + 0.01)
        const nextPos = curve.getPoint(nextT)
        velocities[i3] = (nextPos.x - pos.x) * 0.01
        velocities[i3 + 1] = (nextPos.y - pos.y) * 0.01
        velocities[i3 + 2] = (nextPos.z - pos.z) * 0.01
        
        // Size variation - deterministic
        sizes[i] = (0.5 + ((i * 7) % 10) / 100) * 0.02
      }
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    // Create particle system
    const particles = new THREE.Points(particleGeometry, particlesMaterial)
    scene.add(particles)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Time-based pulsing effect
      const time = Date.now() * 0.001;
      const pulseScale = Math.sin(time * 0.5) * 0.2 + 1;
      
      // Update particle sizes for pulsing effect
      const sizeAttribute = particleGeometry.getAttribute('size') as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const baseSize = (0.5 + ((i * 7) % 10) / 100) * 0.02;
        // Add subtle variation based on particle's position in stream
        const streamPosition = (i % particlesPerStream) / particlesPerStream;
        const pulseFactor = 1 + Math.sin(time + streamPosition * Math.PI * 2) * 0.15;
        sizeAttribute.array[i] = baseSize * pulseFactor;
      }
      sizeAttribute.needsUpdate = true;
      
      // Update particle positions along their stream path
      const positions = particleGeometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Move particle along its velocity vector
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
        
        // Add subtle mouse influence
        positions[i3] += mousePosition.x * 0.0005
        positions[i3 + 1] += mousePosition.y * 0.0005
        
        // If particle reaches end of stream, loop back to beginning of stream
        // This creates an infinite flowing stream effect
        const streamIndex = Math.floor(i / particlesPerStream)
        const particleInStreamIndex = i % particlesPerStream
        
        if (particleInStreamIndex === particlesPerStream - 1) {
          const startParticleIndex = streamIndex * particlesPerStream
          const startIndex3 = startParticleIndex * 3
          
          positions[i3] = positions[startIndex3]
          positions[i3 + 1] = positions[startIndex3 + 1]
          positions[i3 + 2] = positions[startIndex3 + 2]
        }
      }
      
      particleGeometry.attributes.position.needsUpdate = true
      
      // Slow gentle rotation of the entire scene
      particles.rotation.y += 0.0005
      // Add subtle rotation influence from mouse
      particles.rotation.y += mousePosition.x * 0.0001
      particles.rotation.x += mousePosition.y * 0.0001
      
      renderer.render(scene, camera)
    }
    
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      
      scene.remove(particles)
      particleGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [isMounted]) // Only run when isMounted changes to true

  // Render nothing on server, or canvas on client
  if (!isMounted) {
    return null;
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

