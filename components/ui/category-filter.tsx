"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { SkillCategory } from "@/types/skill"
import type { ProjectCategory } from "@/types/project"

type CategoryFilterProps<T extends string> = {
  categories: T[]
  selectedCategory: T
  onSelectCategory: (category: T) => void
}

// Default color scheme for categories
const defaultCategoryColors = {
  all: "bg-soft-cream/10 hover:bg-soft-cream/20 text-soft-cream",
  cloud: "bg-[#4ECDC4]/10 hover:bg-[#4ECDC4]/20 text-[#4ECDC4]",
  development: "bg-[#34BE82]/10 hover:bg-[#34BE82]/20 text-[#34BE82]",
  ai: "bg-[#8A2BE2]/10 hover:bg-[#8A2BE2]/20 text-[#8A2BE2]",
  database: "bg-[#F4A261]/10 hover:bg-[#F4A261]/20 text-[#F4A261]",
  system: "bg-[#f43f5e]/10 hover:bg-[#f43f5e]/20 text-[#f43f5e]",
  support: "bg-orange-100/10 hover:bg-orange-100/20 text-orange-100",
}

export function CategoryFilter<T extends string>({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps<T>) {
  // Cast the colors to the appropriate type to handle both skill and project categories
  const categoryColors = defaultCategoryColors as Record<T, string>

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            "border border-premium-green/20",
            categoryColors[category] || defaultCategoryColors.all,
            selectedCategory === category && "ring-2 ring-premium-green/50 ring-offset-2 ring-offset-black"
          )}
        >
          <div className="flex items-center gap-2">
            {selectedCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="w-2 h-2 rounded-full bg-premium-green"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="capitalize">{category}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

