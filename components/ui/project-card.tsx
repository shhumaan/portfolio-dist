"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import type { Project } from "@/types/project"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

// Color mapping for different project categories
const categoryColors: Record<string, string> = {
  ai: "#8b5cf6",      // purple
  cloud: "#3b82f6",   // blue
  development: "#10b981", // emerald
  support: "#f59e0b", // amber
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <motion.div 
      className={cn("perspective-1000 cursor-pointer", featured ? "h-[420px]" : "h-96")} 
      whileHover={{ translateY: -5 }} 
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-premium-sm",
            "bg-elevation-1 border border-premium-green/20"
          )}
        >
          <div className="h-2 w-full" style={{ backgroundColor: categoryColors[project.category] }}></div>
          <div className="p-6 flex flex-col h-full">
            <div className="mb-auto">
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${categoryColors[project.category]}20`,
                    color: categoryColors[project.category] 
                  }}
                >
                  {project.category}
                </span>
                {project.company && (
                  <span className="text-xs text-soft-cream/60">{project.company}</span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-cream mb-2">{project.title}</h3>
              <p className="text-soft-cream/70 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-xs px-2 py-0.5 bg-premium-green/10 text-soft-cream/80 rounded-full">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-xs px-2 py-0.5 bg-soft-cream/10 text-soft-cream/60 rounded-full">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-soft-cream/10">
              <span className="text-sm text-soft-cream/60">{project.date}</span>
              <button className="text-sm flex items-center text-premium-green hover:text-premium-green/80 transition-colors">
                Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-premium-sm bg-elevation-1 border border-premium-green/20 rotate-y-180">
          <div className="h-2 w-full" style={{ backgroundColor: categoryColors[project.category] }}></div>
          <div className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-3 text-cream">{project.title}</h3>

            {project.longDescription && (
              <p className="text-sm text-soft-cream/80 mb-4">{project.longDescription}</p>
            )}

            <div className="mb-4">
              <h4 className="font-medium mb-2 text-cream">Key Achievements</h4>
              <ul className="space-y-1.5">
                {project.achievements.slice(0, featured ? 4 : 3).map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-soft-cream/80">
                    <span className="text-premium-green mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
                {!featured && project.achievements.length > 3 && (
                  <li className="text-sm text-soft-cream/60">+ {project.achievements.length - 3} more</li>
                )}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="px-3 py-1.5 bg-elevation-2 rounded-lg text-soft-cream/80 text-sm hover:bg-elevation-3 transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" /> Source Code
                </a>
              )}

              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="px-3 py-1.5 bg-premium-green text-black rounded-lg text-sm hover:bg-premium-green/90 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

