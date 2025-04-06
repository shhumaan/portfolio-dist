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
    <section id="skills" ref={sectionRef} className="py-20 bg-elevation-2 texture-overlay">
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-cream">
              Skills Visualization
            </h2>
            <p className="text-soft-cream/80 max-w-xl mx-auto">
              Interactive visualization of my technical expertise, with skills categorized and
              sized by proficiency level. Choose visualization type and filter by category.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex bg-elevation-1 rounded-full p-1 mb-4 md:mb-0 shadow-premium-sm">
              <button
                onClick={() => setVisualizationType("network")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  visualizationType === "network"
                    ? "bg-premium-green text-black shadow-premium-sm"
                    : "text-soft-cream/80 hover:text-soft-cream"
                }`}
              >
                Network Graph
              </button>
              <button
                onClick={() => setVisualizationType("category")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  visualizationType === "category" 
                    ? "bg-premium-green text-black shadow-premium-sm"
                    : "text-soft-cream/80 hover:text-soft-cream"
                }`}
              >
                Category View
              </button>
            </div>
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-1 order-2 lg:order-1">
              <SkillDetail skill={selectedSkill} />
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-2 h-[500px] md:h-[600px] order-1 lg:order-2 bg-elevation-1 rounded-lg shadow-premium-md overflow-hidden relative"
            >
              {isMobile ? (
                <SkillGalaxySimple
                  skills={filteredSkills}
                  onSelectSkill={setSelectedSkill}
                  selectedSkill={selectedSkill}
                />
              ) : (
                <SkillNetwork 
                  skills={filteredSkills} 
                  onSelectSkill={setSelectedSkill} 
                  selectedSkill={selectedSkill}
                  visualizationType={visualizationType}
                />
              )}
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants} 
            className="mt-12 text-center text-soft-cream/70 text-sm max-w-2xl mx-auto"
          >
            {visualizationType === "network" ? (
              <p>
                This network visualization shows how my skills are interconnected, with links between related technologies.
                The force-directed layout allows you to drag nodes to explore different arrangements, while node sizes
                represent proficiency levels. Click any node to see detailed information.
              </p>
            ) : (
              <p>
                This visualization displays my skills grouped by category, with the size of each node
                representing my proficiency level. The circular progress indicator shows the exact 
                percentage proficiency for each skill. Click any skill to view detailed information
                about my experience and related projects.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}



