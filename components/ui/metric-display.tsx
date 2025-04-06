"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface MetricDisplayProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
}

export function MetricDisplay({ value, label, prefix = "", suffix = "", icon }: MetricDisplayProps) {
  const [count, setCount] = useState(0)
  const countStarted = useRef(false)
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.5 })

  useEffect(() => {
    if (!isInView || countStarted.current) return

    countStarted.current = true
    let startTime: number
    let animationFrame: number

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      // Calculate the current count based on progress
      const percentage = Math.min(progress / 2000, 1)
      // Use easeOutQuad for smoother animation
      const easeOutQuad = 1 - (1 - percentage) * (1 - percentage)
      const currentCount = Math.floor(easeOutQuad * value)

      setCount(currentCount)

      if (progress < 2000) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value])

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-elevation-2 rounded-lg p-8 border border-elevation-1 shadow-lg relative overflow-hidden group"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 border border-emerald/20 text-emerald mb-6 mx-auto relative">
        {icon}
      </div>
      
      <div className="text-4xl md:text-5xl font-bold text-emerald mb-4 text-center relative">
        {prefix}
        <span className="inline-block min-w-[2ch] tabular-nums">{count}</span>
        {suffix}
      </div>
      
      <div className="text-base text-soft-cream/70 text-center relative">{label}</div>
    </div>
  )
}

