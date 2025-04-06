"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useWebGLSupport } from "@/hooks/use-webgl-support"
import heroData from "@/data/hero.json" // Import the hero data JSON

export default function Hero() {
  const { scrollToSection } = useSmoothScroll()
  const { hasWebGL } = useWebGLSupport()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  // State for typewriter effect
  const [roleIndex, setRoleIndex] = useState(0)
  // Use roles from the JSON data
  const roles = heroData.role.titles
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length]) // Added roles.length as a dependency

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
  
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* Local gradient overlay for better hero text readability */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/10 to-background/50 opacity-80" />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ y, opacity }}
        >
          <motion.div variants={itemVariants} className="mb-2 flex justify-center sm:justify-start">
            <span className="px-4 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium">
              {heroData.welcomeBadge}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-6xl xl:text-7xl font-bold font-heading mb-4 text-center sm:text-left"
          >
            {heroData.greeting.prefix} <span className="text-emerald">{heroData.greeting.name}</span>
          </motion.h1>
          
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl font-medium mb-6 text-center sm:text-left"
          >
            <div className="h-12 flex items-center justify-center sm:justify-start">
              <span className="mr-2">{heroData.role.prefix}</span>
              <div className="relative h-10 overflow-hidden">
                <div 
                  className="absolute transition-transform duration-500 ease-in-out flex flex-col"
                  style={{ transform: `translateY(-${roleIndex * 100}%)` }}
                >
                  {roles.map((role, index) => (
                    <span 
                      key={index} 
                      className={`h-10 flex items-center text-transparent bg-clip-text bg-gradient-to-r
                        ${index === 0 ? 'from-cloud to-emerald' : 
                         index === 1 ? 'from-dev to-cloud' : 
                         'from-ai to-support'}`
                      }
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="text-xl font-accent text-soft-cream mb-8 text-center sm:text-left"
          >
            <span className="text-emerald">{heroData.tagline.prefix}</span> {heroData.tagline.content} <span className="text-emerald">{heroData.tagline.suffix}</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-12 text-soft-cream/90 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left"
          >
            <p className="mb-4 leading-relaxed">
              {heroData.description}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
          >
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button 
                size="lg" 
                onClick={() => scrollToSection("projects")} 
                className="bg-emerald hover:bg-emerald/90 text-deep-teal font-medium rounded-full"
              >
                {heroData.buttons.projects} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection("contact")}
                className="border-emerald/30 text-cream hover:text-emerald hover:bg-emerald/10 font-medium rounded-full"
              >
                {heroData.buttons.contact}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
      >
        <ArrowDown className="h-8 w-8 text-emerald" />
      </motion.div>
    </section>
  )
}

