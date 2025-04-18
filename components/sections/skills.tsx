"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useWebGLSupport } from "@/hooks/use-webgl-support"
import { useMediaQuery } from "@/hooks/use-media-query"
import { CategoryFilter } from "@/components/ui/category-filter"
import { SkillDetail } from "@/components/ui/skill-detail"
import { SkillNetwork } from "@/components/ui/skill-network"
import { SkillGalaxySimple } from "@/components/ui/skill-galaxy-simple"
import { skills } from "@/data/skills"
import skillsData from "@/data/skillsSection.json"
import type { Skill, SkillCategory } from "@/types/skill"

const categories: SkillCategory[] = ["all", "cloud", "development", "ai", "database", "system"]

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("all")
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [visualizationType, setVisualizationType] = useState<"network" | "category">("network")
  const { hasWebGL } = useWebGLSupport()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const filteredSkills =
    selectedCategory === "all" ? skills : skills.filter((skill) => skill.category === selectedCategory)

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
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10 bg-card/80 backdrop-blur-sm rounded-lg shadow-premium-lg py-12 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.3)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-theme/5 blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-theme/3 blur-3xl opacity-50"></div>
        </div>
        
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-cream">
              {skillsData.section.title}
            </h2>
            <p className="text-soft-cream/80 max-w-xl mx-auto">
              {skillsData.section.description}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            {/* Hide visualization type switcher on mobile */}
            {!isMobile && (
              <div className="flex bg-elevation-1 rounded-full p-1 mb-4 md:mb-0 shadow-premium-sm">
                <button
                  onClick={() => setVisualizationType("network")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    visualizationType === "network"
                      ? "bg-theme text-card shadow-md ring-2 ring-theme"
                      : "bg-elevation-1 text-soft-cream/80 hover:text-soft-cream"
                  }`}
                >
                  {skillsData.visualizationTypes.network.buttonLabel}
                </button>
                <button
                  onClick={() => setVisualizationType("category")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    visualizationType === "category" 
                      ? "bg-theme text-card shadow-md ring-2 ring-theme"
                      : "bg-elevation-1 text-soft-cream/80 hover:text-soft-cream"
                  }`}
                >
                  {skillsData.visualizationTypes.category.buttonLabel}
                </button>
              </div>
            )}

            {/* Keep category filter always visible */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>

          {/* Grid layout for details and visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-1 order-2 lg:order-1">
              <SkillDetail skill={selectedSkill} />
            </motion.div>

            {/* Visualization container - removed fixed height */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 order-1 lg:order-2 bg-elevation-1 rounded-lg shadow-premium-md overflow-hidden relative p-4 md:p-6" // Added padding
            >
              {/* Always render SkillNetwork, force category view on mobile */}
              <SkillNetwork
                skills={filteredSkills}
                onSelectSkill={setSelectedSkill}
                selectedSkill={selectedSkill}
                visualizationType={isMobile ? "category" : visualizationType}
              />
            </motion.div>
          </div>

          {/* Description below visualization - Conditional based on effective type */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center text-soft-cream/70 text-sm max-w-2xl mx-auto"
          >
            {(isMobile || visualizationType === "category") ? (
              <p>
                {skillsData.visualizationTypes.category.buttonLabel}
              </p>
            ) : ( // Only show network description on desktop when network is selected
              <p>
                {skillsData.visualizationTypes.network.description}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}



