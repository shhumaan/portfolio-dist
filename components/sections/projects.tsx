"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CategoryFilter } from "@/components/ui/category-filter"
import { ProjectCard } from "@/components/ui/project-card"
import { projects } from "@/data/projects"
import type { ProjectCategory } from "@/types/project"

const categories: ProjectCategory[] = ["all", "ai", "cloud", "development", "support"]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all")
  const [viewMode, setViewMode] = useState<"grid" | "featured">("featured")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)
  
  const featuredProjects = filteredProjects.filter(project => project.featured)
  const displayProjects = viewMode === "featured" && selectedCategory === "all" 
    ? featuredProjects 
    : filteredProjects

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10 bg-card/80 backdrop-blur-sm rounded-lg shadow-premium-lg py-12 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.3)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-theme/5 blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-theme/3 blur-3xl opacity-50"></div>
        </div>
        
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-cream">
              My Projects
            </h2>
            <p className="text-soft-cream/80 max-w-xl mx-auto">
              A showcase of my professional work across various domains including AI integration, 
              cloud infrastructure, and full-stack development.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            {selectedCategory === "all" && (
              <div className="flex bg-elevation-1 rounded-full p-1 mb-4 md:mb-0 shadow-premium-sm">
                <button
                  onClick={() => setViewMode("featured")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    viewMode === "featured"
                      ? "bg-premium-green text-black shadow-premium-sm"
                      : "text-soft-cream/80 hover:text-soft-cream"
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    viewMode === "grid" 
                      ? "bg-premium-green text-black shadow-premium-sm"
                      : "text-soft-cream/80 hover:text-soft-cream"
                  }`}
                >
                  All Projects
                </button>
              </div>
            )}
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(category) => {
                setSelectedCategory(category)
                if (category !== "all") {
                  setViewMode("grid")
                }
              }}
            />
          </motion.div>

          {displayProjects.length > 0 ? (
            <>
              {viewMode === "featured" && selectedCategory === "all" ? (
                <div className="space-y-16">
                  {featuredProjects.map((project, index) => (
                    <motion.div 
                      key={project.id}
                      variants={itemVariants} 
                      className={`flex flex-col ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      } gap-8 items-center`}
                    >
                      <div className="w-full md:w-1/2">
                        <ProjectCard project={project} featured={true} />
                      </div>
                      <div className="w-full md:w-1/2 space-y-4">
                        <h3 className="text-2xl font-bold text-cream">{project.title}</h3>
                        <p className="text-soft-cream/90">{project.longDescription}</p>
                        <div className="space-y-2">
                          <h4 className="text-cream font-medium">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {project.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-soft-cream/80">
                                <span className="text-premium-green mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2">
                          <h4 className="text-cream font-medium mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span 
                                key={tech} 
                                className="px-3 py-1 bg-premium-green/10 border border-premium-green/30 
                                           rounded-full text-xs text-soft-cream"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  variants={itemVariants} 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {displayProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-soft-cream/60">No projects found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

