"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'
import themeColors from '@/data/themeColors.json'

type ThemeColor = {
  id: string
  name: string
  value: string
  tailwind: string
}

type ThemeContextType = {
  currentTheme: ThemeColor
  changeTheme: (themeId: string) => void
  colors: ThemeColor[]
}

const defaultTheme = themeColors.colors.find(color => color.id === 'emerald') || themeColors.colors[0]

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  changeTheme: () => {},
  colors: themeColors.colors
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Load saved theme from localStorage on mount (client-side only)
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      const theme = themeColors.colors.find(color => color.id === savedTheme)
      if (theme) setCurrentTheme(theme)
    }
  }, [])

  // Apply theme class to body
  useEffect(() => {
    if (!mounted) return

    // Remove all theme classes
    document.body.classList.forEach(className => {
      if (className.startsWith('theme-')) {
        document.body.classList.remove(className)
      }
    })

    // Add new theme class
    document.body.classList.add(`theme-${currentTheme.id}`)

    // Save to localStorage
    localStorage.setItem('portfolio-theme', currentTheme.id)
  }, [currentTheme, mounted])

  const changeTheme = (themeId: string) => {
    const theme = themeColors.colors.find(color => color.id === themeId)
    if (theme) setCurrentTheme(theme)
  }

  // Provide the actual value only after mounting to avoid hydration mismatch
  return (
    <ThemeContext.Provider 
      value={{
        currentTheme,
        changeTheme,
        colors: themeColors.colors
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
} 