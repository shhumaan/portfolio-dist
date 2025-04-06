import type React from "react"
import { motion } from "framer-motion"

interface AIUseCaseProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function AIUseCase({ icon, title, description }: AIUseCaseProps) {
  return (
    <motion.div 
      className="bg-elevation-2 rounded-lg p-8 border border-elevation-1 shadow-lg hover:shadow-emerald/10 transition-all duration-300"
      whileHover={{ 
        y: -5,
        boxShadow: "0 15px 30px rgba(6, 214, 160, 0.07)",
        borderColor: "rgba(6, 214, 160, 0.3)" 
      }}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 border border-emerald/20 text-emerald mb-6 mx-auto">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-center mb-4 text-cream">{title}</h4>
      <p className="text-soft-cream/80 text-center leading-relaxed">{description}</p>
    </motion.div>
  )
}

