"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CalendarDays, Briefcase, GraduationCap, ChevronDown, ChevronUp, Star, Award, User, Code } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimelineItem as TimelineItemType } from "@/types/experience"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TimelineProps {
  items: TimelineItemType[]
}

export function Timeline({ items }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 })
  const [viewMode, setViewMode] = useState<"vertical" | "horizontal">("vertical")

  // For small screens, default to horizontal
  useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("horizontal")
    }
  })

  return (
    <div ref={timelineRef} className="relative">
      {/* View mode toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={viewMode === "vertical" ? "default" : "outline"}
            className="rounded-l-md rounded-r-none"
            onClick={() => setViewMode("vertical")}
            size="sm"
          >
            Vertical
          </Button>
          <Button
            variant={viewMode === "horizontal" ? "default" : "outline"}
            className="rounded-r-md rounded-l-none"
            onClick={() => setViewMode("horizontal")}
            size="sm"
          >
            Horizontal
          </Button>
        </div>
      </div>

      {viewMode === "vertical" ? (
        <VerticalTimeline items={items} isInView={isInView} />
      ) : (
        <HorizontalTimeline items={items} isInView={isInView} />
      )}

      {/* Download Resume Button */}
      <div className="flex justify-center mt-10">
        <Button variant="outline" className="gap-2 border-emerald/30 text-emerald hover:bg-emerald/10">
          <Code className="h-4 w-4" />
          Download Resume
        </Button>
      </div>
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
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald/50 transform md:translate-x-px" />

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
      {/* Main timeline line - this is static and always present */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald/30 transform md:translate-x-px z-0 h-full" />
      
      {/* Timeline item content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className={cn(
          "relative flex flex-col md:flex-row md:justify-between group",
        isEven ? "md:flex-row-reverse" : "",
      )}
    >
      {/* Content */}
        <div 
          className={cn(
            "w-full md:w-5/12 bg-elevation-2 rounded-lg p-6 shadow-md border border-elevation-1 transition-all duration-300 relative z-10",
            expanded ? "md:w-7/12" : "md:w-5/12",
            "hover:shadow-lg hover:border-emerald/20"
          )}
        >
        <div className="flex items-center mb-2">
          <div className={cn("flex items-center", isEven ? "md:ml-auto" : "")}>
              <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center mr-3">
            {item.type === "work" ? (
                  <Briefcase className="h-5 w-5 text-emerald" />
            ) : (
                  <GraduationCap className="h-5 w-5 text-emerald" />
            )}
              </div>
              <h4 className="text-lg font-bold text-cream">{item.title}</h4>
          </div>
        </div>

          <div className={cn("flex items-center text-sm text-soft-cream/70 mb-3", isEven ? "md:justify-end" : "")}>
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{item.date}</span>
        </div>

          <p className="text-soft-cream/90 font-medium mb-3">{item.company}</p>
          <p className="text-soft-cream/80 mb-4">{item.description}</p>

          {/* Skills badges */}
          {item.skills && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="bg-emerald/5 text-emerald border-emerald/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {item.achievements && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Award className="h-4 w-4 text-emerald mr-1" />
                <h5 className="text-sm font-semibold text-emerald">Key Achievements</h5>
              </div>
              <ul className="space-y-1">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-soft-cream/80 flex items-start">
                    <Star className="h-3 w-3 text-emerald mr-1 mt-1 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Testimonial */}
          {item.testimonial && expanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 mt-3 bg-elevation-3 rounded-lg p-4 border border-elevation-1"
            >
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 text-emerald mr-1" />
                <h5 className="text-sm font-semibold text-emerald">Testimonial</h5>
              </div>
              <p className="text-sm text-soft-cream/80 italic mb-2">"{item.testimonial.text}"</p>
              <p className="text-xs text-soft-cream/70 text-right">
                — {item.testimonial.author}, {item.testimonial.position}
              </p>
            </motion.div>
          )}

          {/* Expanded view */}
          <AnimatePresence>
            {expanded && item.expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                {/* Responsibilities */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-emerald mb-2">Responsibilities</h5>
                  <ul className="space-y-1">
                    {item.expanded.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="text-sm text-soft-cream/80 ml-4 list-disc">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Projects */}
                {item.expanded.keyProjects && (
                  <div>
                    <h5 className="text-sm font-semibold text-emerald mb-2">Key Projects</h5>
                    <div className="space-y-3">
                      {item.expanded.keyProjects.map((project, idx) => (
                        <div key={idx} className="bg-elevation-3 rounded p-3 border border-elevation-1">
                          <h6 className="text-sm font-medium text-cream mb-1">{project.name}</h6>
                          <p className="text-xs text-soft-cream/80 mb-1">{project.description}</p>
                          {project.metrics && (
                            <p className="text-xs text-emerald font-medium">
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

          {/* Expand/Collapse button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-xs text-emerald mt-3 hover:underline"
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

        {/* Circle marker - separate from content flow */}
        <div 
          className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-emerald rounded-full transform -translate-x-2 md:-translate-x-2 z-20 shadow-md"
        />

        {/* Animated fill line that grows when in view */}
        {isInView && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute left-0 md:left-1/2 top-8 w-0.5 bg-emerald transform md:translate-x-px z-10 h-full"
          />
        )}
      </motion.div>
    </div>
  )
}

interface HorizontalTimelineProps {
  items: TimelineItemType[]
  isInView: boolean
}

function HorizontalTimeline({ items, isInView }: HorizontalTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute left-0 right-0 top-16 h-0.5 bg-emerald/30 z-0" />

      {/* Navigation controls */}
      <div className="flex justify-between mb-6">
        <Button 
          variant="outline"
          className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
          onClick={() => handleScroll("left")}
        >
          <ChevronDown className="h-4 w-4 rotate-90" />
        </Button>
        <Button 
          variant="outline"
          className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
          onClick={() => handleScroll("right")}
        >
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Button>
      </div>

      {/* Scrollable timeline */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide pb-6 pt-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[300px] w-[300px] snap-center pr-6"
            onClick={() => setActiveItemIndex(index)}
          >
      {/* Circle marker */}
            <div className="flex justify-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 mb-4 transition-all duration-300 ${
                  activeItemIndex === index 
                    ? "bg-emerald text-white" 
                    : "bg-elevation-2 border border-emerald/30 text-emerald"
                }`}
              >
                {item.type === "work" ? (
                  <Briefcase className="h-5 w-5" />
                ) : (
                  <GraduationCap className="h-5 w-5" />
                )}
              </div>
            </div>
            
            {/* Date indicator */}
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald/10 text-emerald text-sm">
                {item.date}
              </span>
            </div>

            {/* Card content */}
            <div className={cn(
              "bg-elevation-2 rounded-lg p-4 border transition-all duration-300 h-[340px] overflow-y-auto",
              activeItemIndex === index
                ? "border-emerald/30 shadow-md shadow-emerald/5"
                : "border-elevation-1"
            )}>
              <h4 className="text-lg font-bold text-cream mb-1">{item.title}</h4>
              <p className="text-soft-cream/90 font-medium mb-3 text-sm">{item.company}</p>
              <p className="text-soft-cream/80 mb-4 text-sm">{item.description}</p>

              {/* Skills badges */}
              {item.skills && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {item.skills.map((skill, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="bg-emerald/5 text-emerald border-emerald/20 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {item.achievements && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Award className="h-4 w-4 text-emerald mr-1" />
                    <h5 className="text-xs font-semibold text-emerald">Key Achievements</h5>
                  </div>
                  <ul className="space-y-1">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-xs text-soft-cream/80 flex items-start">
                        <Star className="h-3 w-3 text-emerald mr-1 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testimonial (if available) */}
              {item.testimonial && (
                <div className="mt-3 bg-elevation-3 rounded-lg p-3 border border-elevation-1">
                  <p className="text-xs text-soft-cream/80 italic mb-1">"{item.testimonial.text}"</p>
                  <p className="text-xs text-soft-cream/70 text-right">
                    — {item.testimonial.author}
                  </p>
                </div>
              )}
            </div>
    </motion.div>
        ))}
      </div>
    </div>
  )
}

