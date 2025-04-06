"use client"

import { useCallback } from "react"

interface UseSmoothScrollOptions {
  duration?: number
  offset?: number
  easing?: (t: number) => number
}

interface UseSmoothScrollReturn {
  scrollTo: (target: HTMLElement | string) => void
  scrollToTop: () => void
  scrollToSection: (sectionId: string) => void
}

// Easing function
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function useSmoothScroll({
  duration = 1000,
  offset = 80, // Account for fixed header
  easing = easeInOutQuad,
}: UseSmoothScrollOptions = {}): UseSmoothScrollReturn {
  const scrollTo = useCallback(
    (target: HTMLElement | string) => {
      let targetElement: HTMLElement | null = null

      if (typeof target === "string") {
        targetElement = document.querySelector(target)
      } else {
        targetElement = target
      }

      if (!targetElement) return

      const startPosition = window.scrollY
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const easedProgress = easing(progress)

        window.scrollTo(0, startPosition + distance * easedProgress)

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    },
    [duration, offset, easing],
  )

  const scrollToTop = useCallback(() => {
    scrollTo("body")
  }, [scrollTo])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      scrollTo(`#${sectionId}`)
    },
    [scrollTo],
  )

  return { scrollTo, scrollToTop, scrollToSection }
}

