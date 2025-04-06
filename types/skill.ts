export type SkillCategory = "all" | "cloud" | "development" | "ai" | "database" | "system"
export type SkillProficiency = "Advanced" | "Intermediate" | "Basic"

export interface Skill {
  id: string
  name: string
  category: Exclude<SkillCategory, "all">
  proficiency: SkillProficiency | number
  description: string
  experience: string
  relatedSkills: string[]
  isRecent: boolean
  icon?: string
  years?: number
  projects?: string[]
}

