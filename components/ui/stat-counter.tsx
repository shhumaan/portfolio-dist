"use client"

import { useState, useEffect, useRef } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface StatCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
}

export function StatCounter({ value, label, prefix = "", suffix = "", duration = 2000 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 })
  const countStarted = useRef(false)

  useEffect(() => {
    if (!isInView || countStarted.current) return

    countStarted.current = true
    let startTime: number
    let animationFrame: number

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      // Calculate the current count based on progress
      const percentage = Math.min(progress / duration, 1)
      // Use easeOutQuad for smoother animation
      const easeOutQuad = 1 - (1 - percentage) * (1 - percentage)
      const currentCount = Math.floor(easeOutQuad * value)

      setCount(currentCount)

      if (progress < duration) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

