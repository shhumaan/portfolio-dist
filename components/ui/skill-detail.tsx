"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Skill } from "@/types/skill"
import skillsData from "@/data/skillsSection.json" // Import the skills section data

type SkillDetailProps = {
  skill: Skill | null
}

export function SkillDetail({ skill }: SkillDetailProps) {
  const categoryColors = {
    cloud: "bg-[#4ECDC4]/10 border-[#4ECDC4]/20 text-[#4ECDC4]",
    development: "bg-[#34BE82]/10 border-[#34BE82]/20 text-[#34BE82]",
    ai: "bg-[#8A2BE2]/10 border-[#8A2BE2]/20 text-[#8A2BE2]",
    database: "bg-[#F4A261]/10 border-[#F4A261]/20 text-[#F4A261]",
    system: "bg-[#f43f5e]/20 border-[#f43f5e]/30 text-[#f43f5e] font-semibold",
  }

  const mapProficiency = (proficiency: string | number): string => {
    if (typeof proficiency === 'string') {
      if (proficiency === 'Advanced') return skillsData.skillDetail.proficiencyLevels.working;
      if (proficiency === 'Intermediate') return skillsData.skillDetail.proficiencyLevels.activeDevelopment;
      return skillsData.skillDetail.proficiencyLevels.exploration;
    }
    
    // If numeric
    const num = Number(proficiency);
    if (num >= 80) return skillsData.skillDetail.proficiencyLevels.working;
    if (num >= 50) return skillsData.skillDetail.proficiencyLevels.activeDevelopment;
    return skillsData.skillDetail.proficiencyLevels.exploration;
  }

  const renderSkillStatus = (skill: Skill) => {
    let statusColor = "bg-[#8A2BE2]"; // Default for Exploration
    if (typeof skill.proficiency === 'number') {
      if (skill.proficiency >= 80) {
        statusColor = "bg-[#34BE82]"; // Working
      } else if (skill.proficiency >= 50) {
        statusColor = "bg-[#4ECDC4]"; // Active Development
      }
    }
    
    return (
      <div className="flex items-center gap-2 text-xs mt-1">
        <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
        <span className="text-soft-cream">
          {mapProficiency(skill.proficiency)}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-elevation-1 rounded-lg shadow-premium-md p-6 h-full flex flex-col">
      <h3 className="text-xl font-heading font-semibold mb-4 text-cream">{skillsData.skillDetail.title}</h3>
      
      <AnimatePresence mode="wait">
        {skill ? (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-elevation-2 border ${skill.category && categoryColors[skill.category].split(' ')[2]}`}>
                  {skill.icon && (
                    <span className="text-2xl">{skill.icon}</span>
                  )}
                </div>
                <div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-medium text-cream">{skill.name}</h4>
                      <span className={cn(
                        "text-xs px-2.5 py-0.75 rounded-full border-2 shadow-sm", 
                        categoryColors[skill.category],
                        skill.category === 'system' ? "animate-pulse" : ""
                      )}>
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {renderSkillStatus(skill)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-soft-cream/70">{skillsData.skillDetail.labels.proficiency}</span>
                <span className="text-sm font-medium text-soft-cream">{skill.proficiency}%</span>
              </div>
              <div className="h-2 bg-elevation-2 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${
                    typeof skill.proficiency === 'number' && skill.proficiency >= 80 
                      ? 'bg-[#34BE82]' 
                      : typeof skill.proficiency === 'number' && skill.proficiency >= 50
                        ? 'bg-[#4ECDC4]'
                        : 'bg-[#8A2BE2]'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {skill.years && (
              <div className="mb-4">
                <span className="text-sm text-soft-cream/70 font-medium">{skillsData.skillDetail.labels.experience}</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-elevation-2 text-xs text-soft-cream">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-soft-cream">
                    {skill.years} {skill.years === 1 
                      ? skillsData.skillDetail.timeUnits.singular 
                      : skillsData.skillDetail.timeUnits.plural}
                  </span>
                </div>
              </div>
            )}

            {skill.description && (
              <div className="mb-4">
                <span className="text-sm text-soft-cream/70 font-medium">{skillsData.skillDetail.labels.description}</span>
                <p className="text-soft-cream mt-1 leading-relaxed text-sm">{skill.description}</p>
              </div>
            )}

            {skill.experience && (
              <div className="mb-4">
                <span className="text-sm text-soft-cream/70 font-medium">{skillsData.skillDetail.labels.myExperience}</span>
                <p className="text-soft-cream mt-1 leading-relaxed text-sm">{skill.experience}</p>
              </div>
            )}

            {skill.projects && skill.projects.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-soft-cream/70 font-medium">{skillsData.skillDetail.labels.relatedProjects}</span>
                <ul className="mt-2 space-y-2">
                  {skill.projects.map((project) => (
                    <li key={project} className="flex items-start gap-2">
                      <span className="text-premium-green flex-shrink-0 mt-1">•</span>
                      <span className="text-soft-cream text-sm">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {skill.relatedSkills && skill.relatedSkills.length > 0 && (
              <div>
                <span className="text-sm text-soft-cream/70 font-medium">{skillsData.skillDetail.labels.relatedSkills}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skill.relatedSkills.map((relId) => (
                    <span 
                      key={relId} 
                      className="text-xs px-2 py-1 rounded-md bg-elevation-2 text-soft-cream"
                    >
                      {relId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center text-soft-cream/50"
          >
            <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed border-soft-cream/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soft-cream/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 110-20 10 10 0 010 20z" />
              </svg>
            </div>
            <p className="text-sm">{skillsData.skillDetail.emptyState}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

