export interface Idea {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  category: string
  fundingGoal: number
  currentFunding: number
  backers: number
  daysLeft: number
  tags: string[]
  status: "active" | "funded" | "upcoming"
  proposedBy: {
    name: string
    twitter: string
    avatar?: string
  }
}

export interface IdeaDetail extends Idea {
  longDescription: string
  roadmap: RoadmapItem[]
  updates: Update[]
  faqs: FAQ[]
}

export interface RoadmapItem {
  phase: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
}

export interface Update {
  id: string
  date: string
  title: string
  content: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Comment {
  id: string
  userName: string
  userAvatar: string
  walletAddress: string
  investmentAmount: number
  comment: string
  date: string
}
