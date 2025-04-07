"use client"

import { useRef } from "react"
import { useTheme } from "next-themes"
import ParticleBackground from "@/components/ui/particle-background"

export default function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <ParticleBackground key={theme} containerRef={containerRef} />
    </div>
  )
} 