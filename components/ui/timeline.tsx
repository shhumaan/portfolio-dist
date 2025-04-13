"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CalendarDays, Briefcase, GraduationCap, ChevronDown, ChevronUp, Star, Award, User, Code } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimelineItem as TimelineItemType } from "@/types/experience"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

interface TimelineProps {
  items: TimelineItemType[]
}

export function Timeline({ items }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 })
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [viewMode, setViewMode] = useState<"vertical" | "horizontal">(
    isMobile ? "vertical" : "vertical"
  )

  useEffect(() => {
    if (isMobile) {
      setViewMode("vertical")
    }
  }, [isMobile])

  return (
    <div ref={timelineRef} className="relative">
      {!isMobile && (
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <Button
              className={`rounded-l-md rounded-r-none px-4 py-2 text-sm font-medium transition-all duration-300 ${
                viewMode === "vertical" 
                  ? "bg-theme text-card shadow-md ring-2 ring-theme" 
                  : "bg-elevation-1 text-soft-cream/80 hover:text-soft-cream"
              }`}
              onClick={() => setViewMode("vertical")}
              size="sm"
            >
              Vertical
            </Button>
            <Button
              className={`rounded-r-md rounded-l-none px-4 py-2 text-sm font-medium transition-all duration-300 ${
                viewMode === "horizontal" 
                  ? "bg-theme text-card shadow-md ring-2 ring-theme" 
                  : "bg-elevation-1 text-soft-cream/80 hover:text-soft-cream"
              }`}
              onClick={() => setViewMode("horizontal")}
              size="sm"
            >
              Horizontal
            </Button>
          </div>
        </div>
      )}

      {viewMode === "vertical" ? (
        <VerticalTimeline items={items} isInView={isInView} />
      ) : (
        !isMobile && <HorizontalTimeline items={items} isInView={isInView} />
      )}

      <motion.div 
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button 
          variant="outline" 
          className="gap-2 border-theme/30 text-theme hover:bg-theme/10 hover:scale-105 transition-all duration-300 hover:border-theme font-medium rounded-full shadow-sm px-5"
          asChild
        >
          <a href="/resume.pdf" download="Anshuman_Resume.pdf">
            <Code className="h-4 w-4" />
            Download Resume
          </a>
        </Button>
      </motion.div>
    </div>
  )
}

interface VerticalTimelineProps {
  items: TimelineItemType[]
  isInView: boolean
}

function VerticalTimeline({ items, isInView }: VerticalTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-theme/50 transform md:translate-x-px" />

      <div className="relative">
        {items.map((item, index) => (
          <VerticalTimelineItem key={index} item={item} index={index} isInView={isInView} />
        ))}
      </div>
    </div>
  )
}

interface VerticalTimelineItemProps {
  item: TimelineItemType
  index: number
  isInView: boolean
}

function VerticalTimelineItem({ item, index, isInView }: VerticalTimelineItemProps) {
  const isEven = index % 2 === 0
  const [expanded, setExpanded] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={itemRef}
      className={cn(
        "relative mb-16",
      )}
    >
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-theme/30 transform md:translate-x-px z-0 h-full" />
      
      {/* Single properly styled circle for the timeline */}
      <div className="absolute left-3 md:left-1/2 top-5 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-6 h-6 rounded-full bg-background border-4 border-theme shadow-md group-hover:scale-110 transition-transform duration-300"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className={cn(
          "relative flex flex-col md:flex-row group ml-8 md:ml-0", // Add margin-left on mobile
          isEven ? "md:justify-end" : "md:justify-start"
        )}
      >
        <div 
          className={cn(
            "w-full bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-premium-lg border border-theme/20 transition-all duration-300 relative z-10",
            isEven ? "md:mr-[calc(50%+1rem)]" : "md:ml-[calc(50%+1rem)]", // Adjust desktop positioning based on even/odd
            "hover:shadow-lg hover:border-theme/30 md:max-w-[calc(50%-1rem)]" // Ensure cards don't overlap line on desktop
          )}
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center mr-3 flex-shrink-0">
              {item.type === "work" ? (
                <Briefcase className="h-5 w-5 text-theme" />
              ) : (
                <GraduationCap className="h-5 w-5 text-theme" />
              )}
            </div>
            <h4 className="text-lg font-bold text-cream">{item.title}</h4>
          </div>

          <div className="flex items-center text-sm text-soft-cream/70 mb-3">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{item.date}</span>
          </div>

          <p className="text-soft-cream/90 font-medium mb-3">{item.company}</p>
          <p className="text-soft-cream/80 mb-4">{item.description}</p>

          {item.skills && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="bg-theme/5 text-theme border-theme/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.achievements && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Award className="h-4 w-4 text-theme mr-1" />
                <h5 className="text-sm font-semibold text-theme">Key Achievements</h5>
              </div>
              <ul className="space-y-1">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-soft-cream/80 flex items-start">
                    <Star className="h-3 w-3 text-theme mr-1 mt-1 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.testimonial && expanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 mt-3 bg-elevation-3 rounded-lg p-4 border border-elevation-1"
            >
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 text-theme mr-1" />
                <h5 className="text-sm font-semibold text-theme">Testimonial</h5>
              </div>
              <p className="text-sm text-soft-cream/80 italic mb-2">\"{item.testimonial.text}\"</p>
              <p className="text-xs text-soft-cream/70 text-right">
                — {item.testimonial.author}, {item.testimonial.position}
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {expanded && item.expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-theme mb-2">Responsibilities</h5>
                  <ul className="space-y-1">
                    {item.expanded.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="text-sm text-soft-cream/80 ml-4 list-disc">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                {item.expanded.keyProjects && (
                  <div>
                    <h5 className="text-sm font-semibold text-theme mb-2">Key Projects</h5>
                    <div className="space-y-3">
                      {item.expanded.keyProjects.map((project, idx) => (
                        <div key={idx} className="bg-elevation-3 rounded p-3 border border-elevation-1">
                          <h6 className="text-sm font-medium text-cream mb-1">{project.name}</h6>
                          <p className="text-xs text-soft-cream/80 mb-1">{project.description}</p>
                          {project.metrics && (
                            <p className="text-xs text-theme font-medium">
                              <Star className="h-3 w-3 inline-block mr-1" />
                              {project.metrics}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-xs text-theme mt-3 hover:underline"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Show More
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

interface HorizontalTimelineProps {
  items: TimelineItemType[]
  isInView: boolean
}

function HorizontalTimeline({ items, isInView }: HorizontalTimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-8 pb-8 scrollbar-thin scrollbar-thumb-elevation-3 scrollbar-track-transparent"
      >
        {items.map((item, index) => (
          <HorizontalTimelineItem key={index} item={item} index={index} isInView={isInView} />
        ))}
      </div>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 pointer-events-none px-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-theme/10 border-theme/30 text-theme"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-theme/10 border-theme/30 text-theme"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </Button>
      </div>
    </div>
  )
}

interface HorizontalTimelineItemProps {
  item: TimelineItemType
  index: number
  isInView: boolean
}

function HorizontalTimelineItem({ item, index, isInView }: HorizontalTimelineItemProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex-shrink-0 w-80 bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-premium-lg border border-theme/20 relative group transition-all duration-300 hover:shadow-lg hover:border-theme/30"
    >
      {/* Improved circle styling and positioning for consistency */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-background border-4 border-theme shadow-md z-10 group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute top-[2px] left-0 right-0 h-0.5 bg-theme/30 -translate-y-[1px]" />

      <div className="flex items-center mb-2 mt-2">
        <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center mr-3">
          {item.type === "work" ? (
            <Briefcase className="h-5 w-5 text-theme" />
          ) : (
            <GraduationCap className="h-5 w-5 text-theme" />
          )}
        </div>
        <h4 className="text-lg font-bold text-cream">{item.title}</h4>
      </div>

      <div className="flex items-center text-sm text-soft-cream/70 mb-3">
        <CalendarDays className="h-4 w-4 mr-1" />
        <span>{item.date}</span>
      </div>

      <p className="text-soft-cream/90 font-medium mb-3">{item.company}</p>
      <p className="text-soft-cream/80 mb-4 text-sm line-clamp-3 group-hover:line-clamp-none transition-all">
        {item.description}
      </p>

      {item.skills && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {item.skills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="outline" className="bg-theme/5 text-theme border-theme/20 text-xs px-2 py-0.5">
                {skill}
              </Badge>
            ))}
            {item.skills.length > 3 && (
              <Badge variant="outline" className="bg-theme/5 text-theme border-theme/20 text-xs px-2 py-0.5">
                +{item.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center text-xs text-theme mt-3 hover:underline w-full justify-center py-1 bg-elevation-1 rounded-md hover:bg-elevation-3 transition-colors"
      >
        {expanded ? (
          <>
            <ChevronUp className="h-3 w-3 mr-1" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3 mr-1" />
            Show More Details
          </>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            {item.achievements && (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Award className="h-4 w-4 text-theme mr-1" />
                  <h5 className="text-sm font-semibold text-theme">Key Achievements</h5>
                </div>
                <ul className="space-y-1">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-xs text-soft-cream/80 flex items-start">
                      <Star className="h-3 w-3 text-theme mr-1 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.testimonial && (
              <motion.div 
                className="mb-4 mt-3 bg-elevation-3 rounded-lg p-3 border border-elevation-1"
              >
                <div className="flex items-center mb-1">
                  <User className="h-3 w-3 text-theme mr-1" />
                  <h5 className="text-xs font-semibold text-theme">Testimonial</h5>
                </div>
                <p className="text-xs text-soft-cream/80 italic mb-1">\"{item.testimonial.text}\"</p>
                <p className="text-[10px] text-soft-cream/70 text-right">
                  — {item.testimonial.author}, {item.testimonial.position}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

