"use client"

import { useState, useEffect } from "react"

interface ScrollPosition {
  scrollY: number
  scrollDirection: "up" | "down" | null
  isScrolled: boolean
}

export function useScrollPosition(threshold = 50): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollDirection: null,
    isScrolled: false,
  })

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollPosition = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? "down" : "up"

      setScrollPosition({
        scrollY,
        scrollDirection: direction,
        isScrolled: scrollY > threshold,
      })

      lastScrollY = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition)
        ticking = true
      }
    }

    // Set initial position
    updateScrollPosition()

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [threshold])

  return scrollPosition
}

