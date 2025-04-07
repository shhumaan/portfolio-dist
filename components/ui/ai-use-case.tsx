"use client"

import React from "react"
import { motion } from "framer-motion"

interface AIUseCaseProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function AIUseCase({ icon, title, description }: AIUseCaseProps) {
  return (
    <motion.div 
      className="bg-elevation-2 rounded-lg p-6 border border-theme/20 shadow-lg relative overflow-hidden"
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-theme/5 blur-2xl -mb-16 -mr-16"></div>
      
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="w-16 h-16 rounded-full bg-theme/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-cream">{title}</h3>
        <p className="text-soft-cream/70 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

