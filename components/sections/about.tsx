"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { StatCounter } from "@/components/ui/stat-counter"
import { Timeline } from "@/components/ui/timeline"
import { QuoteCallout } from "@/components/ui/quote-callout"
import { experience } from "@/data/experience"
import * as LucideIcons from "lucide-react" // Import all icons
import { Button } from "@/components/ui/button"
import aboutData from "@/data/about.json" // Import the about data JSON

// Define an interface for the props expected by DynamicIcon
interface DynamicIconProps {
  name: string;
  className?: string;
}

// Create a component that will render the appropriate icon based on name
const DynamicIcon = ({ name, className }: DynamicIconProps) => {
  // Use type assertion to safely access the icon
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }
  
  return <IconComponent className={className} />;
}

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

  // Use riddles from JSON data
  const riddles = aboutData.riddles

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
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 relative overflow-visible"
    >
      {/* Apply elevation styles to the main container within the section */}
      <div className="container mx-auto px-4 relative z-10 bg-card/80 backdrop-blur-sm rounded-lg shadow-premium-lg py-12 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.3)]">
        {/* Decorative elements - Adjust positioning if needed relative to the new container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-theme/5 blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-theme/3 blur-3xl opacity-50"></div>
        </div>
      
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto relative" // Add relative positioning here
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-theme/10 border border-theme/20 text-theme text-sm font-medium mb-4">
              {aboutData.sectionBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{aboutData.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {!skipRiddles && !isAllSolved 
                ? aboutData.description.riddleState 
                : aboutData.description.solvedState}
            </p>
          </motion.div>

          {!skipRiddles && !isAllSolved ? (
          <motion.div variants={itemVariants} className="mb-12">
              <div className="flex justify-center mb-8">
                <Button 
                  variant="outline" 
                  className="border-theme/30 text-theme hover:bg-theme/10 group flex items-center gap-2"
                  onClick={handleSkipToInterview}
                >
                  <DynamicIcon name={aboutData.skipButton.icon} className="h-4 w-4 group-hover:animate-pulse" />
                  <span>{aboutData.skipButton.text}</span>
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
                        ? "border-theme/30" 
                        : "border-elevation-1"
                    } shadow-lg cursor-pointer relative overflow-hidden`}
                    onClick={() => setCurrentRiddle(currentRiddle === riddle.id ? null : riddle.id)}
                  >
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-theme/10 blur-xl"></div>
                    
                    <div className="flex flex-col items-center text-center relative">
                      <div className={`w-16 h-16 rounded-full ${
                        riddlesSolved.includes(riddle.id) 
                          ? "bg-theme/20" 
                          : "bg-elevation-3"
                      } flex items-center justify-center mb-4`}>
                        <DynamicIcon name={riddle.icon} className="h-8 w-8 text-theme" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-cream">{riddle.title}</h3>
                      
                      {riddlesSolved.includes(riddle.id) ? (
                        <div>
                          <div className="flex items-center justify-center mb-2">
                            <span className="w-5 h-5 rounded-full bg-theme/20 flex items-center justify-center mr-1">
                              <DynamicIcon name="Check" className="h-3 w-3 text-theme" />
                            </span>
                            <p className="text-theme text-sm font-medium">{aboutData.riddleUI.solvedStatus}</p>
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
                            <DynamicIcon name={riddle.hintIcon} className="text-theme" />
                            <p className="text-soft-cream/90 text-sm">{riddle.hint}</p>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <input 
                              type="text" 
                              placeholder={aboutData.riddleUI.inputPlaceholder}
                              className="p-2 rounded-lg bg-elevation-3 border border-elevation-1 text-cream focus:border-theme/50 focus:ring-theme/20"
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
                              className="border-theme/30 text-theme hover:bg-theme/10"
                              onClick={() => handleSolveRiddle(riddle.id)}
                            >
                              {aboutData.riddleUI.revealButton}
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
              className="mb-12 bg-elevation-2 rounded-xl p-8 border border-theme/20 shadow-lg"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-theme/20 flex items-center justify-center">
                  <DynamicIcon name={aboutData.completedState.icon} className="h-8 w-8 text-theme" />
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-cream">
                {skipRiddles ? aboutData.completedState.title.skipped : aboutData.completedState.title.solved}
              </h3>
              
              <div className="space-y-6">
                {aboutData.completedState.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-foreground/90">{paragraph}</p>
                ))}
                
                {skipRiddles && (
                  <div className="mt-6 pt-6 border-t border-elevation-1">
                    <h4 className="text-lg font-medium mb-3 text-cream">{aboutData.completedState.interview.title}</h4>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <Button 
                        className="bg-theme hover:bg-theme/90 text-deep-teal w-full md:w-auto shadow-theme-sm"
                        onClick={() => window.location.href = "#contact"}
                      >
                        <DynamicIcon name={aboutData.completedState.interview.buttonIcon} className="h-4 w-4 mr-2" />
                        {aboutData.completedState.interview.buttonText}
                      </Button>
                      <p className="text-sm text-soft-cream/70">
                        {aboutData.completedState.interview.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
          </motion.div>
          )}

          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-elevation-2 rounded-xl p-8 border border-elevation-1 shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-theme/5 rounded-full blur-3xl -mr-10 -mb-10"></div>
              <div className="text-lg md:text-xl text-cream/90 italic font-medium">
                <QuoteCallout
                  quote={aboutData.quote.text}
                  author={aboutData.quote.author}
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold font-heading mb-6 text-cream">{aboutData.achievements.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aboutData.achievements.stats.map((stat, index) => (
                <div key={index} className="bg-elevation-2 rounded-xl p-6 border border-elevation-1 shadow-lg">
                  <StatCounter 
                    value={stat.value} 
                    label={stat.label} 
                    suffix={stat.suffix} 
                    duration={2000} 
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold font-heading mb-6 text-cream">{aboutData.journey.title}</h3>
            <div className="bg-elevation-2 rounded-xl p-6 border border-elevation-1 shadow-lg">
              <Timeline items={experience} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

