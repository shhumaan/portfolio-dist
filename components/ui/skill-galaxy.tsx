"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Skill } from "@/types/skill"

interface SkillGalaxyProps {
  skills: Skill[]
  onToggleCategory?: (category: string) => void
  activeCategory?: string | null
}

export default function SkillGalaxy({ 
  skills, 
  onToggleCategory,
  activeCategory 
}: SkillGalaxyProps) {
  const [mounted, setMounted] = useState(false)
  const galaxyRef = useRef<HTMLDivElement>(null)
  
  // Set up state for skills with positions
  const [skillsWithPositions, setSkillsWithPositions] = useState<(Skill & {
    x: number
    y: number
    scale: number
    opacity: number
    zIndex: number
  })[]>([])
  
  // Set up center point state
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 })
  
  // Track if the galaxy is being interacted with
  const [isInteracting, setIsInteracting] = useState(false)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Only run on client-side
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Position skills in a galaxy pattern when component mounts or window resizes
  useEffect(() => {
    if (!mounted || !galaxyRef.current) return
    
    const positionSkills = () => {
      if (!galaxyRef.current) return
      
      // Get container dimensions for responsive positioning
      const container = galaxyRef.current
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      
      // Set center point to middle of container
      const center = {
        x: containerWidth / 2,
        y: containerHeight / 2,
      }
      setCenterPoint(center)
      
      // Calculate galaxy radius (responsive to container size)
      const minDimension = Math.min(containerWidth, containerHeight)
      const galaxyRadius = minDimension * 0.4 // Use 40% of container dimension
      
      // Create positioned skills array
      const positionedSkills = skills.map((skill, index) => {
        // Create spiral galaxy effect
        const angleOffset = (index / skills.length) * Math.PI * 10 // Spiral factor
        const distanceFromCenter = (index / skills.length) * galaxyRadius
        
        // Add randomness to positions for natural look
        const randomAngle = Math.random() * Math.PI * 2
        const randomDistance = Math.random() * galaxyRadius * 0.3 // 30% random variation
        
        // Calculate position on spiral
        const angle = (index / skills.length) * Math.PI * 2 + angleOffset
        
        // Apply spiral position + randomness
        const x = center.x + Math.cos(angle) * distanceFromCenter + 
                Math.cos(randomAngle) * randomDistance
        const y = center.y + Math.sin(angle) * distanceFromCenter + 
                Math.sin(randomAngle) * randomDistance
        
        // Calculate z-index and scale based on importance and category
        // This makes important skills larger and more prominent
        const importance = typeof skill.proficiency === "number" ? skill.proficiency / 10 : 1
        const baseScale = 0.7 + importance * 0.3
        const scale = baseScale * (1 + Math.random() * 0.3) 
        
        // Calculate appropriate z-index
        const zIndex = Math.floor(importance * 10)
        
        // Adjust opacity for depth effect - more central skills are more opaque
        const distanceRatio = distanceFromCenter / galaxyRadius
        const opacity = 1 - (distanceRatio * 0.2)
        
        return {
          ...skill,
          x,
          y,
          scale,
          opacity,
          zIndex
        }
      })
      
      setSkillsWithPositions(positionedSkills)
    }
    
    // Set up resize handler
    const handleResize = () => {
      positionSkills()
    }
    
    // Initial positioning
    positionSkills()
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mounted, skills])
  
  // Handle interaction state (for animation effects)
  const handleInteractionStart = () => {
    setIsInteracting(true)
    
    // Clear any existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
  }
  
  const handleInteractionEnd = () => {
    // Set timeout to end interaction state after some delay
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false)
    }, 2000)
  }
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
    }
  }, [])

  // Animate skills based on mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!galaxyRef.current || !isInteracting) return
    
    const container = galaxyRef.current
    const mouseX = e.clientX - container.getBoundingClientRect().left
    const mouseY = e.clientY - container.getBoundingClientRect().top
    
    // Calculate gravity effect based on mouse position
    const updatedSkills = skillsWithPositions.map(skill => {
      // Calculate direction and distance from mouse
      const dx = mouseX - skill.x
      const dy = mouseY - skill.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Skip if too close to avoid extreme movement
      if (distance < 10) return skill
      
      // Calculate gravitational force (stronger for closer skills)
      const maxForce = 30
      const force = Math.min(maxForce, maxForce / (distance * 0.05))
      
      // Apply force vector to position
      const moveX = (dx / distance) * force
      const moveY = (dy / distance) * force
      
      return {
        ...skill,
        x: skill.x + moveX * 0.03, // Scale down movement for smoother effect
        y: skill.y + moveY * 0.03
      }
    })
    
    setSkillsWithPositions(updatedSkills)
  }
  
  // If not mounted, return null (no SSR)
  if (!mounted) return null
  
  // Determine tag colors based on category
  const getTagColor = (category: string, isActive: boolean) => {
    // Apply dimming effect to non-active categories when filtering
    const dimmed = activeCategory !== null && !isActive

    switch(category) {
      case 'cloud':
        return dimmed ? 'bg-blue-700/30 text-blue-300/50' : 'bg-blue-700 text-blue-100'
      case 'development': 
        return dimmed ? 'bg-emerald-700/30 text-emerald-300/50' : 'bg-emerald-700 text-emerald-100'
      case 'database':
        return dimmed ? 'bg-amber-700/30 text-amber-300/50' : 'bg-amber-700 text-amber-100'
      case 'ai':
        return dimmed ? 'bg-purple-700/30 text-purple-300/50' : 'bg-purple-700 text-purple-100'
      case 'system':
        return dimmed ? 'bg-rose-700/30 text-rose-300/50' : 'bg-rose-700 text-rose-100'
      default:
        return dimmed ? 'bg-slate-700/30 text-slate-300/50' : 'bg-slate-700 text-slate-100'
    }
  }
  
  // Generate animation variants for skills
  const skillVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: 1, 
      scale: 1,
      transition: { 
        opacity: { duration: 0.3, delay: i * 0.02 },
        scale: { duration: 0.5, delay: i * 0.02 }
      }
    }),
    hover: { 
      scale: 1.15,
      boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
      transition: { duration: 0.2 }
    }
  }
  
  // Generate pulse animation variants
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  }
  
  return (
    <div 
      ref={galaxyRef}
      className="h-full w-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      {skillsWithPositions.map((skill, index) => {
        const isActive = activeCategory === null || skill.category === activeCategory
        return (
          <motion.button
            key={`${skill.name}-${index}`}
            className={`absolute inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium shadow-sm ${getTagColor(skill.category, isActive)}`}
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              opacity: skill.opacity,
              zIndex: skill.zIndex,
              transformOrigin: 'center center',
              position: 'absolute',
              cursor: onToggleCategory ? 'pointer' : 'default'
            }}
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={skillVariants}
            custom={index}
            onClick={() => onToggleCategory && onToggleCategory(skill.category)}
            layout={true}
          >
            {skill.name}
            
            {/* Pulsing background for higher importance skills */}
            {typeof skill.proficiency === "number" && skill.proficiency > 7 && (
              <motion.span 
                className="absolute inset-0 rounded-full bg-current opacity-30"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

