"use client"

import { useRef, useEffect, useState } from "react"
import ParticleBackground from "./particle-background"

export default function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Only run on client-side after component is mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background/30 to-background/80">
        <ParticleBackground containerRef={containerRef} />
      </div>
      
      {/* Gradient overlays for better content readability */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/80 opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
    </div>
  )
} 