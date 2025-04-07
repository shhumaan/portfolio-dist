"use client"

import { useState, useEffect } from "react"
import { ArrowLeftRight } from "lucide-react"

export function WorkflowComparison() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect()
    const newPosition = ((e.clientX - container.left) / container.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return
    const container = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const newPosition = ((touch.clientX - container.left) / container.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  // Don't render interactive elements until client-side
  if (!isClient) {
    return (
      <div className="max-w-4xl mx-auto bg-elevation-2 rounded-xl border border-elevation-1 shadow-lg overflow-hidden">
        <div className="p-6 text-center mb-4">
          <h3 className="text-xl font-bold mb-2 text-cream">Before & After: AI-Enhanced Workflows</h3>
          <p className="text-soft-cream/70">Drag the slider to compare traditional vs. AI-assisted workflows</p>
        </div>
        <div className="h-[400px] bg-elevation-3 flex items-center justify-center">
          <p className="text-cream/80">Loading comparison...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-elevation-2 rounded-xl border border-elevation-1 shadow-lg overflow-hidden">
      <div className="p-6 text-center mb-4">
        <h3 className="text-xl font-bold mb-2 text-cream">Before & After: AI-Enhanced Workflows</h3>
        <p className="text-soft-cream/70">Drag the slider to compare traditional vs. AI-assisted workflows</p>
      </div>

      <div className="relative h-[400px]">
        {/* Traditional workflow */}
        <div className="absolute inset-0 px-6 py-4 bg-elevation-3">
          <div className="max-w-[480px] mx-auto">
            <h4 className="text-lg font-bold mb-6 text-cream">Traditional Workflow</h4>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-elevation-1 flex-shrink-0 flex items-center justify-center text-soft-cream font-bold mt-0.5">1</div>
                <div className="ml-3">
                  <p className="font-medium text-cream">Manual ticket review</p>
                  <p className="text-sm text-soft-cream/80">15-20 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-elevation-1 flex-shrink-0 flex items-center justify-center text-soft-cream font-bold mt-0.5">2</div>
                <div className="ml-3">
                  <p className="font-medium text-cream">Search knowledge base</p>
                  <p className="text-sm text-soft-cream/80">10-15 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-elevation-1 flex-shrink-0 flex items-center justify-center text-soft-cream font-bold mt-0.5">3</div>
                <div className="ml-3">
                  <p className="font-medium text-cream">Draft response</p>
                  <p className="text-sm text-soft-cream/80">15-20 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-elevation-1 flex-shrink-0 flex items-center justify-center text-soft-cream font-bold mt-0.5">4</div>
                <div className="ml-3">
                  <p className="font-medium text-cream">Review and send</p>
                  <p className="text-sm text-soft-cream/80">5-10 minutes</p>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-elevation-1 rounded-lg border border-elevation-2">
                <p className="font-medium text-cream text-center">Total time: 45-65 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI-enhanced workflow - overlaid with a semi-transparent background */}
        <div 
          className="absolute inset-0 px-6 py-4 bg-[rgba(6,40,36,0.95)] backdrop-blur-[2px]"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <div className="max-w-[480px] mx-auto">
            <h4 className="text-lg font-bold mb-6 text-theme">AI-Enhanced Workflow</h4>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-theme/30 flex-shrink-0 flex items-center justify-center text-theme font-bold mt-0.5">1</div>
                <div className="ml-3">
                  <p className="font-medium text-cream/95">AI ticket categorization</p>
                  <p className="text-sm text-theme/95">1-2 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-theme/30 flex-shrink-0 flex items-center justify-center text-theme font-bold mt-0.5">2</div>
                <div className="ml-3">
                  <p className="font-medium text-cream/95">AI knowledge retrieval</p>
                  <p className="text-sm text-theme/95">2-3 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-theme/30 flex-shrink-0 flex items-center justify-center text-theme font-bold mt-0.5">3</div>
                <div className="ml-3">
                  <p className="font-medium text-cream/95">AI response generation</p>
                  <p className="text-sm text-theme/95">3-5 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-theme/30 flex-shrink-0 flex items-center justify-center text-theme font-bold mt-0.5">4</div>
                <div className="ml-3">
                  <p className="font-medium text-cream/95">Human review and send</p>
                  <p className="text-sm text-theme/95">5 minutes</p>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-theme/25 rounded-lg border border-theme/40">
                <p className="font-medium text-theme/95 text-center">Total time: 11-15 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slider divider control */}
        <div 
          className="absolute inset-y-0 w-[3px] bg-theme shadow-[0_0_12px_rgba(6,214,160,0.9)] z-20" 
          style={{ left: `${sliderPosition}%` }}
        >
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-theme border-[3px] border-deep-teal shadow-[0_0_15px_rgba(6,214,160,0.9)] flex items-center justify-center cursor-ew-resize"
            onMouseDown={() => {
              const handleMouseMove = (e: MouseEvent) => {
                const container = document.querySelector('.relative.h-\\[400px\\]')?.getBoundingClientRect()
                if (!container) return
                const newPosition = ((e.clientX - container.left) / container.width) * 100
                setSliderPosition(Math.max(0, Math.min(100, newPosition)))
              }

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }

              document.addEventListener('mousemove', handleMouseMove)
              document.addEventListener('mouseup', handleMouseUp)
            }}
            onTouchStart={(e) => {
              e.preventDefault()
              
              const handleTouchMove = (e: TouchEvent) => {
                if (e.touches.length === 0) return
                const container = document.querySelector('.relative.h-\\[400px\\]')?.getBoundingClientRect()
                if (!container) return
                const touch = e.touches[0]
                const newPosition = ((touch.clientX - container.left) / container.width) * 100
                setSliderPosition(Math.max(0, Math.min(100, newPosition)))
              }

              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove)
                document.removeEventListener('touchend', handleTouchEnd)
              }

              document.addEventListener('touchmove', handleTouchMove)
              document.addEventListener('touchend', handleTouchEnd)
            }}
          >
            <ArrowLeftRight className="h-5 w-5 text-deep-teal" />
          </div>
        </div>

        {/* Invisible interaction surface for the slider */}
        <div 
          className="absolute inset-0 z-10 cursor-ew-resize"
          onMouseMove={handleMove}
          onTouchMove={handleTouchMove}
        ></div>
      </div>
    </div>
  )
}

