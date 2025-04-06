export type ProjectCategory = "all" | "ai" | "cloud" | "development" | "support"

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  achievements: string[]
  technologies: string[]
  category: Exclude<ProjectCategory, "all">
  company?: string
  date?: string
  image?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

