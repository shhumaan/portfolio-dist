"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useScrollPosition } from "@/hooks/use-scroll-position"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "AI Showcase", href: "#ai-showcase" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isScrolled } = useScrollPosition()
  const { scrollYProgress } = useScroll()
  const headerRef = useRef<HTMLElement>(null)

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [mobileMenuOpen])

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  const availableBadgeVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-deep-teal/80 backdrop-blur-premium shadow-premium-sm" 
          : "bg-transparent"
      )}
    >
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-emerald origin-left z-10"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to content
        </a>

        {/* Logo with animation */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            className="text-2xl font-heading font-bold relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <span className="bg-gradient-to-r from-cream to-emerald bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
              Anshuman
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald to-cream transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </motion.div>
          
          {/* Available for Opportunities Badge */}
          <motion.div 
            className="hidden md:flex items-center px-2 py-1 bg-emerald/10 border border-emerald/30 rounded-full"
            variants={availableBadgeVariants}
            animate="pulse"
          >
            <span className="h-2 w-2 rounded-full bg-emerald mr-2"></span>
            <span className="text-xs font-medium text-cream">Available for opportunities</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
            >
              <Link 
                href={item.href} 
                className="text-sm font-medium relative group"
              >
                <span className="text-cream group-hover:text-emerald transition-colors duration-300">
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-emerald transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-cream hover:text-emerald hover:bg-deep-teal/50"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-elevation-3 border-t border-emerald/10 backdrop-blur-premium"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-5">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="text-lg font-medium py-2 flex items-center space-x-2 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald group-hover:w-3 transition-all duration-300"></span>
                      <span className="text-cream group-hover:text-emerald transition-colors duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Available Badge (Mobile) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                  className="mt-4 flex items-center px-3 py-2 bg-emerald/10 border border-emerald/20 rounded-md"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald mr-2"></span>
                  <span className="text-sm font-medium text-cream">Available for opportunities</span>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

