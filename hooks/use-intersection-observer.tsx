"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  root?: Element | null
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<Element>
  isInView: boolean
  wasEverInView: boolean
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = "0px",
  root = null,
}: UseIntersectionObserverProps = {}): UseIntersectionObserverReturn {
  const ref = useRef<Element>(null)
  const [isInView, setIsInView] = useState(false)
  const [wasEverInView, setWasEverInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting

        setIsInView(inView)

        if (inView && !wasEverInView) {
          setWasEverInView(true)
        }
      },
      {
        threshold,
        rootMargin,
        root,
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, root, wasEverInView])

  return { ref, isInView, wasEverInView }
}

