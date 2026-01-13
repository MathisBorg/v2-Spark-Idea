export interface Team {
  id: string
  name: string
  tagline: string
  description: string
  logo: string
  members: number
  fundingGoal: number
  currentFunding: number
  investorCount: number
  revenueSharePercentage: number // Percentage of future revenue shared with investors
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

export interface TeamInvestor {
  id: string
  userName: string
  userAvatar: string
  walletAddress: string
  investmentAmount: number
  comment: string
  date: string
}
