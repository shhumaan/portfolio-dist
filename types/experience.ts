export type ExperienceType = "work" | "education"

export interface TimelineItem {
  type: ExperienceType
  title: string
  company: string
  date: string
  description: string
  skills?: string[]  // Technologies used in this role
  achievements?: string[] // Key accomplishments
  testimonial?: {
    text: string
    author: string
    position: string
  }
  expanded?: {
    responsibilities: string[]
    keyProjects?: {
      name: string
      description: string
      metrics?: string
    }[]
  }
}

