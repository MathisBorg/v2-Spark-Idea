export interface Team {
  id: string
  name: string
  tagline: string
  description: string
  logo: string
  members: number
  fundingGoal?: number
  currentFunding?: number
  category: string
  tags: string[]
  website?: string
  twitter?: string
  discord?: string
  achievements?: string[]
}

export interface TeamMember {
  name: string
  role: string
  avatar: string
  bio: string
  twitter?: string
  linkedin?: string
}
