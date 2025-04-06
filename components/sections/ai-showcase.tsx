"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { WorkflowComparison } from "@/components/ui/workflow-comparison"
import { AIUseCase } from "@/components/ui/ai-use-case"
import { MetricDisplay } from "@/components/ui/metric-display"
import { Brain, MessageSquare, FileText, Workflow, Sparkles, Zap, LineChart } from "lucide-react"

export default function AIShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="ai-showcase" ref={sectionRef} className="py-24 bg-elevation-5 relative overflow-hidden">
      {/* Background pattern using image */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat"></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium mb-4">
              AI Integration
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-5 text-cream">AI Showcase</h2>
            <p className="text-soft-cream/80 max-w-2xl mx-auto text-lg">
              Enhancing productivity through intelligent automation and AI-driven solutions
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-24">
            <WorkflowComparison />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-24">
            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-12 text-center text-cream relative">
              <span className="relative inline-block">
                Key AI Use Cases
                <motion.span
                  className="absolute -top-6 right-0 text-emerald"
                  initial={{ opacity: 0, y: 10, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.span>
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AIUseCase
                icon={<MessageSquare className="h-8 w-8" />}
                title="ChatGPT for Debugging"
                description="Accelerated troubleshooting by using ChatGPT to analyze error logs and suggest solutions, reducing resolution time by 40%."
              />
              <AIUseCase
                icon={<FileText className="h-8 w-8" />}
                title="Notion AI for Documentation"
                description="Streamlined documentation process using Notion AI to generate and refine technical documentation, improving clarity and completeness."
              />
              <AIUseCase
                icon={<Workflow className="h-8 w-8" />}
                title="Custom GPT Workflows"
                description="Developed specialized GPT workflows for ticket categorization and initial response generation, improving first-response time by 65%."
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-12 text-center text-cream relative">
              <span className="relative inline-block">
                Impact Metrics
                <motion.span
                  className="absolute -top-6 -right-6 text-emerald"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <LineChart className="h-5 w-5" />
                </motion.span>
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MetricDisplay 
                value={65} 
                label="Faster first response" 
                suffix="%" 
                icon={<Zap className="h-6 w-6" />} 
              />
              <MetricDisplay
                value={40}
                label="Reduced debugging time"
                suffix="%"
                icon={<Brain className="h-6 w-6" />}
              />
              <MetricDisplay
                value={30}
                label="Documentation efficiency"
                suffix="%"
                icon={<FileText className="h-6 w-6" />}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

