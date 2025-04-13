"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight, Download } from "lucide-react"
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
  
  // Enhanced typewriter effect states
  const [currentRole, setCurrentRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);
  
  // Use roles from the JSON data
  const roles = heroData.role.titles;
  
  // Role-specific styling classes - enhanced with more vibrant colors and glow effects
  const roleStyles = [
    "text-cyan-300 glow-cyan-sm font-bold", // Web Developer
    "text-violet-300 glow-violet-sm font-bold", // Cloud Engineer
    "text-amber-300 glow-amber-sm font-bold", // Support Specialist
  ];
  
  // Typewriter effect logic
  useEffect(() => {
    const typewriterEffect = () => {
      const currentFullRole = roles[roleIndex];
      
      if (isDeleting) {
        // Deleting text - faster speed when deleting
        setTypingSpeed(50);
        setCurrentRole(current => current.substring(0, current.length - 1));
        if (currentRole === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(120);
        }
      } else {
        // Typing text
        setCurrentRole(current => 
          currentFullRole.substring(0, current.length + 1)
        );
        if (currentRole === currentFullRole) {
          // Pause at the end of typing before starting to delete
          setTypingSpeed(2500);
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(typewriterEffect, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentRole, isDeleting, roleIndex, roles, typingSpeed]);

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
      {/* Add a container div for the elevation styles */}
      <div className="container mx-auto px-4 py-24 relative z-10 bg-card/80 backdrop-blur-sm rounded-lg shadow-premium-lg my-8 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.3)]">
        {/* Local gradient overlay for better hero text readability */}
        {/* This gradient is now less necessary with the card background, but keep for style */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/5 to-background/20 opacity-60 rounded-lg pointer-events-none" />
        
        {/* Add glow effect classes to globals.css */}
        <style jsx global>{`
          .glow-cyan-sm {
            text-shadow: 0 0 15px rgba(103, 232, 249, 0.5), 0 0 8px rgba(103, 232, 249, 0.3);
          }
          .glow-violet-sm {
            text-shadow: 0 0 15px rgba(196, 181, 253, 0.5), 0 0 8px rgba(196, 181, 253, 0.3);
          }
          .glow-amber-sm {
            text-shadow: 0 0 15px rgba(252, 211, 77, 0.5), 0 0 8px rgba(252, 211, 77, 0.3);
          }
        `}</style>
        
        {/* Content */}
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ y, opacity }}
        >
          <motion.div variants={itemVariants} className="mb-2 flex justify-center sm:justify-start">
            <span className="px-4 py-1 rounded-full bg-theme/10 border border-theme/20 text-theme text-sm font-medium">
              {heroData.welcomeBadge}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-6xl xl:text-7xl font-bold font-heading mb-4 text-center sm:text-left"
          >
            {heroData.greeting.prefix} <span className="text-theme">{heroData.greeting.name}</span>
          </motion.h1>
          
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl font-medium mb-6 text-center sm:text-left"
          >
            <div className="h-12 flex items-center justify-center sm:justify-start">
              <span className="mr-2">{heroData.role.prefix}</span>
              <div className="h-10 flex items-center relative rounded-lg px-2 py-1 bg-elevation-2/50 backdrop-blur-sm border border-elevation-1">
                <span className={roleStyles[roleIndex]}>
                  {currentRole}
                </span>
                <span className={`animate-pulse ml-0.5 h-6 w-1 ${roleIndex === 0 ? 'bg-cyan-300' : roleIndex === 1 ? 'bg-violet-300' : 'bg-amber-300'}`}></span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="text-xl font-accent text-soft-cream mb-8 text-center sm:text-left"
          >
            <span className="text-theme">{heroData.tagline.prefix}</span> {heroData.tagline.content} <span className="text-theme">{heroData.tagline.suffix}</span>
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
                className="bg-theme hover:bg-theme/90 text-deep-teal font-medium rounded-full"
              >
                {heroData.buttons.projects} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection("contact")}
                className="border-theme/30 text-cream hover:text-theme hover:bg-theme/10 font-medium rounded-full"
              >
                {heroData.buttons.contact}
              </Button>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-theme/30 text-cream hover:text-theme hover:bg-theme/10 font-medium rounded-full"
                asChild
              >
                <a href="/resume.pdf" download="Anshuman_Resume.pdf">
                  Resume <Download className="ml-2 h-4 w-4" />
                </a>
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
        <ArrowDown className="h-8 w-8 text-theme" />
      </motion.div>
    </section>
  )
}

