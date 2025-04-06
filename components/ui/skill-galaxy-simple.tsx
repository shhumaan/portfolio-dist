"use client"

import { motion } from "framer-motion"
import type { Skill } from "@/types/skill"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

interface SkillGalaxySimpleProps {
  skills: Skill[]
  onSelectSkill: (skill: Skill) => void
  selectedSkill: Skill | null
}

const categoryColors = {
  cloud: "bg-[#4ECDC4]/10 border-[#4ECDC4]/20 text-[#4ECDC4]",
  development: "bg-[#34BE82]/10 border-[#34BE82]/20 text-[#34BE82]",
  ai: "bg-[#8A2BE2]/10 border-[#8A2BE2]/20 text-[#8A2BE2]",
  database: "bg-[#F4A261]/10 border-[#F4A261]/20 text-[#F4A261]",
  system: "bg-[#f43f5e]/10 border-[#f43f5e]/20 text-[#f43f5e]",
}

// Get proficiency color based on level
const getProficiencyColor = (proficiency: number | string): string => {
  const num = typeof proficiency === 'number' ? proficiency : 0;
  if (num >= 80) return '#34BE82'; // Working - Vibrant Green
  if (num >= 50) return '#4ECDC4'; // Active Development - Soft Cyan
  return '#8A2BE2'; // Exploration - Rich Purple
};

export function SkillGalaxySimple({ skills, onSelectSkill, selectedSkill }: SkillGalaxySimpleProps) {
  // Generate stable animation delays for each skill
  const animationDelays = useMemo(() => {
    return skills.map((_, index) => {
      // Use a deterministic value based on index instead of random
      return (index % 5) * 0.1; // 0, 0.1, 0.2, 0.3, 0.4, repeat
    });
  }, [skills.length]); // Only regenerate if the number of skills changes
  
  return (
    <div className="h-full overflow-auto p-4 flex items-center justify-center" style={{ backgroundColor: '#0A2E2A' }}>
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {skills.map((skill, index) => {
          const proficiency = typeof skill.proficiency === 'number' ? skill.proficiency : 50;
          const proficiencyColor = getProficiencyColor(proficiency);
          
          return (
            <motion.button
              key={skill.id}
              layoutId={`skill-${skill.id}`}
              onClick={() => onSelectSkill(skill)}
              className={cn(
                "p-4 rounded-lg border flex flex-col items-center text-center",
                "transition-all duration-300 hover:scale-105",
                categoryColors[skill.category],
                selectedSkill?.id === skill.id ? "ring-2 ring-premium-green ring-offset-2 ring-offset-black" : ""
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: animationDelays[index],
              }}
            >
              {/* Circular skill indicator */}
              <div className="relative w-14 h-14 mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  {/* Background circle */}
                  <circle 
                    cx="18" cy="18" r="16" 
                    fill="none" 
                    stroke="#333" 
                    strokeWidth="1"
                  />
                  
                  {/* Foreground circle - animated progress */}
                  <motion.circle 
                    cx="18" cy="18" r="16" 
                    fill="none" 
                    stroke={proficiencyColor}
                    strokeWidth="2.5"
                    strokeDasharray={`${proficiency} 100`}
                    strokeDashoffset="25"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 100" }}
                    animate={{ strokeDasharray: `${proficiency} 100` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  
                  {/* Skill icon or text */}
                  <text 
                    x="18" y="20" 
                    textAnchor="middle" 
                    fontSize="12"
                    fill="white"
                  >
                    {skill.icon || skill.name.charAt(0)}
                  </text>
                </svg>
                {/* Proficiency percentage */}
                <div className="absolute -bottom-1 -right-1 bg-black text-white text-xs px-1 rounded-sm">
                  {proficiency}%
                </div>
              </div>
              
              <h3 className="text-sm font-medium mb-1">{skill.name}</h3>
              
              {/* Proficiency label */}
              <div className="text-xs opacity-80 mt-1">
                {proficiency >= 80 ? 'Working' : 
                  proficiency >= 50 ? 'Active Development' : 
                  'Exploration'}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  )
}

