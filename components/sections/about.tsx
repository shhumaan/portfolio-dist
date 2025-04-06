"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { StatCounter } from "@/components/ui/stat-counter"
import { Timeline } from "@/components/ui/timeline"
import { QuoteCallout } from "@/components/ui/quote-callout"
import { experience } from "@/data/experience"
import { Server, Globe, Cpu, PhoneCall, Sparkles, Brain, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [riddlesSolved, setRiddlesSolved] = useState<number[]>([])
  const [currentRiddle, setCurrentRiddle] = useState<number | null>(null)
  const [skipRiddles, setSkipRiddles] = useState(false)

  // Reset state on mount to fix potential stale state issues
  useEffect(() => {
    setRiddlesSolved([])
    setCurrentRiddle(null)
    setSkipRiddles(false)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  }

  const riddles = [
    {
      id: 1,
      icon: <Server className="h-8 w-8 text-emerald" />,
      title: "Cloud Engineering",
      riddle: "I orchestrate containers, scale with ease, and keep your infrastructure running in the breeze. What AWS service am I?",
      answer: "eks",
      hintIcon: <Server className="text-emerald" />,
      hint: "I manage Kubernetes clusters in the Amazon cloud.",
      explanation: "Cloud infrastructure is my specialty, particularly AWS EKS (Elastic Kubernetes Service). I've designed scalable and resilient architectures for enterprise applications.",
    },
    {
      id: 2,
      icon: <Globe className="h-8 w-8 text-emerald" />,
      title: "Web Development",
      riddle: "I bring reactivity without the library, keeping state in sync across the UI. What modern framework am I?",
      answer: "next.js",
      hintIcon: <Globe className="text-emerald" />,
      hint: "I'm built on React but add server-side rendering and more.",
      explanation: "I specialize in Next.js development, creating performant web applications with server-side rendering, static site generation, and modern React patterns.",
    },
    {
      id: 3,
      icon: <Cpu className="h-8 w-8 text-emerald" />,
      title: "AI Automation",
      riddle: "I process language naturally, complete your code, and generate images too. What AI technology am I?",
      answer: "llm",
      hintIcon: <Brain className="text-emerald" />,
      hint: "Large _____ Models are transforming how we interact with AI.",
      explanation: "I implement Large Language Models (LLMs) like GPT to automate processes, create intelligent systems, and enhance user experiences through natural language processing.",
    },
  ]

  const handleSolveRiddle = (id: number) => {
    if (!riddlesSolved.includes(id)) {
      setRiddlesSolved([...riddlesSolved, id])
    }
    setCurrentRiddle(null)
  }

  const isAllSolved = riddlesSolved.length === riddles.length

  const handleSkipToInterview = () => {
    setSkipRiddles(true)
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-emerald/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-emerald/3 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium mb-4">
              About Me
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Discover My Story</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {!skipRiddles && !isAllSolved 
                ? "Solve the riddles below to reveal different aspects of my professional journey" 
                : "Cloud Engineer, Web Developer, and AI Automation Specialist"}
            </p>
          </motion.div>

          {!skipRiddles && !isAllSolved ? (
          <motion.div variants={itemVariants} className="mb-12">
              <div className="flex justify-center mb-8">
                <Button 
                  variant="outline" 
                  className="border-emerald/30 text-emerald hover:bg-emerald/10 group flex items-center gap-2"
                  onClick={handleSkipToInterview}
                >
                  <PhoneCall className="h-4 w-4 group-hover:animate-pulse" />
                  <span>Skip to Interview Contact</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {riddles.map((riddle) => (
                  <motion.div 
                    key={riddle.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`bg-elevation-2 rounded-xl p-6 border ${
                      riddlesSolved.includes(riddle.id) 
                        ? "border-emerald/30" 
                        : "border-elevation-1"
                    } shadow-lg cursor-pointer relative overflow-hidden`}
                    onClick={() => setCurrentRiddle(currentRiddle === riddle.id ? null : riddle.id)}
                  >
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald/10 blur-xl"></div>
                    
                    <div className="flex flex-col items-center text-center relative">
                      <div className={`w-16 h-16 rounded-full ${
                        riddlesSolved.includes(riddle.id) 
                          ? "bg-emerald/20" 
                          : "bg-elevation-3"
                      } flex items-center justify-center mb-4`}>
                        {riddle.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-cream">{riddle.title}</h3>
                      
                      {riddlesSolved.includes(riddle.id) ? (
                        <div>
                          <div className="flex items-center justify-center mb-2">
                            <span className="w-5 h-5 rounded-full bg-emerald/20 flex items-center justify-center mr-1">
                              <Check className="h-3 w-3 text-emerald" />
                            </span>
                            <p className="text-emerald text-sm font-medium">Riddle Solved!</p>
                          </div>
                          <p className="text-soft-cream/80">{riddle.explanation}</p>
                        </div>
                      ) : (
                        <p className="text-soft-cream/90">{riddle.riddle}</p>
                      )}
                      
                      {currentRiddle === riddle.id && !riddlesSolved.includes(riddle.id) && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 w-full"
                        >
                          <div className="flex items-center space-x-2 mb-3 bg-elevation-3 rounded-lg p-3">
                            {riddle.hintIcon}
                            <p className="text-soft-cream/90 text-sm">{riddle.hint}</p>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <input 
                              type="text" 
                              placeholder="Enter your answer..."
                              className="p-2 rounded-lg bg-elevation-3 border border-elevation-1 text-cream focus:border-emerald/50 focus:ring-emerald/20"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const answer = (e.target as HTMLInputElement).value.toLowerCase().trim()
                                  if (answer === riddle.answer.toLowerCase()) {
                                    handleSolveRiddle(riddle.id)
                                  }
                                }
                              }}
                            />
                            <Button 
                              size="sm"
                              variant="outline"
                              className="border-emerald/30 text-emerald hover:bg-emerald/10"
                              onClick={() => handleSolveRiddle(riddle.id)}
                            >
                              Reveal Answer
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-elevation-2 rounded-xl p-8 border border-emerald/20 shadow-lg"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-emerald" />
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-cream">
                {skipRiddles ? "Let's Schedule an Interview!" : "All Riddles Solved!"}
              </h3>
              
              <div className="space-y-6">
                <p className="text-soft-cream/90">
              I'm a passionate Cloud Engineer and Web Developer with a strong background in technical support and
              automation. My journey in technology has been driven by a desire to solve complex problems with elegant,
              efficient solutions.
            </p>
                <p className="text-soft-cream/90">
              With experience across cloud platforms, web development, and AI integration, I bring a versatile skill set
              to every project. I'm particularly interested in leveraging AI tools to enhance workflows and create more
              efficient systems.
            </p>
                
                {skipRiddles && (
                  <div className="mt-6 pt-6 border-t border-elevation-1">
                    <h4 className="text-lg font-medium mb-3 text-cream">Contact for Interview</h4>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <Button 
                        className="bg-emerald hover:bg-emerald/90 text-deep-teal w-full md:w-auto shadow-[0_2px_10px_rgba(6,214,160,0.3)]"
                        onClick={() => window.location.href = "#contact"}
                      >
                        <PhoneCall className="h-4 w-4 mr-2" />
                        Schedule a Call
                      </Button>
                      <p className="text-sm text-soft-cream/70">
                        I'm currently available for new opportunities and would be happy to discuss potential projects.
                      </p>
                    </div>
                  </div>
                )}
              </div>
          </motion.div>
          )}

          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-elevation-2 rounded-xl p-8 border border-elevation-1 shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald/5 rounded-full blur-3xl -mr-10 -mb-10"></div>
              <div className="text-lg md:text-xl text-cream/90 italic font-medium">
            <QuoteCallout
              quote="Technology is most powerful when it empowers everyone. My goal is to build solutions that make complex systems accessible and efficient."
              author="Anshuman"
            />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold font-heading mb-6 text-cream">Key Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-elevation-2 rounded-xl p-6 border border-elevation-1 shadow-lg">
              <StatCounter value={95} label="First-call resolution rate" suffix="%" duration={2000} />
              </div>
              <div className="bg-elevation-2 rounded-xl p-6 border border-elevation-1 shadow-lg">
              <StatCounter value={20} label="System downtime reduction" suffix="%" duration={2000} />
              </div>
              <div className="bg-elevation-2 rounded-xl p-6 border border-elevation-1 shadow-lg">
              <StatCounter value={30} label="Workflow efficiency improvement" suffix="%" duration={2000} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold font-heading mb-6 text-cream">My Journey</h3>
            <div className="bg-elevation-2 rounded-xl p-6 border border-elevation-1 shadow-lg">
            <Timeline items={experience} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

