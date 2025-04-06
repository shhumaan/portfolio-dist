"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  // Default to false on the server
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Set initial value
      setMatches(media.matches)

      // Define callback for media query change
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      // Add listener
      media.addEventListener("change", listener)

      // Clean up
      return () => {
        media.removeEventListener("change", listener)
      }
    }
  }, [query])

  return matches
}

