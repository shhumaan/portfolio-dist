"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import type { SkillCategory } from "@/types/skill"
import type { ProjectCategory } from "@/types/project"

// Category-specific colors aligned with skill visualization
const categoryColors = {
  all: { bg: "bg-theme/10", hoverBg: "hover:bg-theme/20", text: "text-theme" },
  ai: { bg: "bg-[#8A2BE2]/10", hoverBg: "hover:bg-[#8A2BE2]/20", text: "text-[#8A2BE2]" },
  cloud: { bg: "bg-[#4ECDC4]/10", hoverBg: "hover:bg-[#4ECDC4]/20", text: "text-[#4ECDC4]" },
  development: { bg: "bg-[#34BE82]/10", hoverBg: "hover:bg-[#34BE82]/20", text: "text-[#34BE82]" },
  database: { bg: "bg-[#F4A261]/10", hoverBg: "hover:bg-[#F4A261]/20", text: "text-[#F4A261]" },
  system: { bg: "bg-[#f43f5e]/10", hoverBg: "hover:bg-[#f43f5e]/20", text: "text-[#f43f5e]" },
  support: { bg: "bg-[#FB8B24]/10", hoverBg: "hover:bg-[#FB8B24]/20", text: "text-[#FB8B24]" }
}

type CategoryFilterProps<T extends string> = {
  categories: T[]
  selectedCategory: T
  onSelectCategory: (category: T) => void
}

export function CategoryFilter<T extends string>({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps<T>) {
  const { currentTheme } = useTheme()
  
  const getCategoryColors = (category: T) => {
    // Cast the category to keyof typeof categoryColors to access the color scheme
    const colorKey = category as keyof typeof categoryColors;
    return categoryColors[colorKey] || categoryColors.all;
  }
  
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const colors = getCategoryColors(category);
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "border border-theme/20",
              colors.bg,
              colors.hoverBg,
              colors.text,
              selectedCategory === category && "ring-2 ring-theme/50 ring-offset-2 ring-offset-black"
            )}
          >
            <div className="flex items-center gap-2">
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="w-2 h-2 rounded-full bg-theme"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="capitalize">{category}</span>
            </div>
          </button>
        );
      })}
    </div>
  )
}

