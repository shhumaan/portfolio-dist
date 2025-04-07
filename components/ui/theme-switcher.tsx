"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, ChevronDown } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export function ThemeSwitcher() {
  const { currentTheme, changeTheme, colors } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [showColorRipple, setShowColorRipple] = useState(false)
  const [rippleColor, setRippleColor] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSelectTheme = (themeId: string) => {
    const selectedTheme = colors.find(c => c.id === themeId)
    if (selectedTheme) {
      // Create a color change ripple effect
      setRippleColor(selectedTheme.value)
      setShowColorRipple(true)
      
      // Apply the theme change after a short delay
      setTimeout(() => {
        changeTheme(themeId)
        
        // Hide the ripple effect
        setTimeout(() => {
          setShowColorRipple(false)
        }, 400)
      }, 100)
    }
    
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className="relative">
      {/* Global color change ripple effect */}
      <AnimatePresence>
        {showColorRipple && (
          <motion.div
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 40, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 w-8 h-8 m-auto rounded-full z-50 pointer-events-none"
            style={{ backgroundColor: rippleColor }}
          />
        )}
      </AnimatePresence>
      
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 rounded-full bg-elevation-3 border border-elevation-1 px-3 py-1.5 text-sm text-soft-cream/80 hover:text-soft-cream transition-colors focus:outline-none shadow-premium-sm"
        aria-label="Change theme color"
      >
        <Palette className="h-4 w-4 text-theme" strokeWidth={2.5} />
        <span className="hidden md:inline">Theme</span>
        <motion.span 
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: currentTheme.value }}
          initial={false}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.4, times: [0, 0.5, 1], ease: "easeInOut" }}
        />
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 rounded-xl bg-elevation-3 border border-elevation-1 shadow-premium-md z-50 overflow-hidden"
          >
            <div className="p-2">
              <div className="p-2 text-center border-b border-elevation-1 mb-2">
                <p className="text-xs text-soft-cream/60 uppercase tracking-wider">Choose Theme Color</p>
              </div>
              
              {/* Color preview */}
              <div className="flex justify-center mb-3 px-2">
                <div className="w-full h-10 rounded-lg bg-elevation-4 flex items-center justify-center overflow-hidden">
                  <div className="flex space-x-1">
                    {colors.map((color) => (
                      <motion.span
                        key={color.id}
                        className={`h-6 w-6 rounded-full cursor-pointer 
                          ${currentTheme.id === color.id ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'}`}
                        style={{ backgroundColor: color.value }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleSelectTheme(color.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-1">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleSelectTheme(color.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm ${
                      currentTheme.id === color.id ? 'bg-elevation-4 shadow-premium-sm' : 'hover:bg-elevation-2'
                    } transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2">
                      <motion.span 
                        className="h-4 w-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color.value }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="text-soft-cream">{color.name}</span>
                    </div>
                    {currentTheme.id === color.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <Check className="h-3.5 w-3.5 text-theme" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-elevation-4 p-2 text-xs text-center text-soft-cream/50">
              Changes apply to all accent colors
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 