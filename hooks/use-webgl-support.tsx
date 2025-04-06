"use client"

import { useState, useEffect } from "react"

interface WebGLSupportResult {
  hasWebGL: boolean
  webGLVersion: number | null
}

export function useWebGLSupport(): WebGLSupportResult {
  const [result, setResult] = useState<WebGLSupportResult>({
    hasWebGL: false,
    webGLVersion: null,
  })

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    try {
      // Try to create a WebGL 2 context
      const canvas = document.createElement("canvas")
      let gl = canvas.getContext("webgl2")

      if (gl) {
        setResult({
          hasWebGL: true,
          webGLVersion: 2,
        })
        return
      }

      // Fall back to WebGL 1
      gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext)

      if (gl) {
        setResult({
          hasWebGL: true,
          webGLVersion: 1,
        })
        return
      }

      // No WebGL support
      setResult({
        hasWebGL: false,
        webGLVersion: null,
      })
    } catch (error) {
      console.error("Error detecting WebGL support:", error)
      setResult({
        hasWebGL: false,
        webGLVersion: null,
      })
    }
  }, [])

  return result
}

