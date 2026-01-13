import type { Team, TeamMember } from "../types/teams"
import type { Idea } from "../types/ideas"

export const mockTeams: Team[] = [
  {
    id: "nomu",
    name: "NOMU",
    tagline: "Rewriting ecommerce with Solana's strongest communities & builders",
    description: "The RWA Launchpad where you buy products & share their success. NOMU enables customers to participate in product launches while earning rewards tied to sales performance. If you help a product win, you should win with it.",
    logo: "🏪",
    members: 5,
    fundingGoal: 500000,
    currentFunding: 342000,
    investorCount: 156,
    revenueSharePercentage: 15, // 15% of future revenue shared with investors
    category: "Web3 Commerce",
    tags: ["RWA", "Ecommerce", "Solana", "Rewards"],
    website: "https://nomu.dev",
    twitter: "@nomu",
    achievements: [
      "Built The RWA Launchpad on Solana",
      "Partnered with Monke DAO, Solflare, Swissborg",
      "Launched OG NFT & $NOMU token ecosystem",
      "Created reward-sharing mechanism for product launches",
      "Established Holders Hub community platform"
    ]
  },
  {
    id: "spark",
    name: "Spark",
    tagline: "Fund the future, one idea at a time",
    description: "Spark is a platform that enables funding innovative ideas with USDC on Solana. We're building the infrastructure for the next generation of crowdfunding, powered by blockchain technology.",
    logo: "⚡",
    members: 3,
    fundingGoal: 250000,
    currentFunding: 187000,
    investorCount: 89,
    revenueSharePercentage: 20, // 20% of future revenue shared with investors
    category: "Web3 Finance",
    tags: ["Crowdfunding", "Solana", "USDC", "Innovation"],
    website: "https://spark.example.com",
    twitter: "@spark",
    achievements: [
      "Building v2 of Spark Ideas platform",
      "Integrated Phantom wallet & USDC transfers",
      "Created seamless funding experience on Solana",
      "Evolved from BorgPad infrastructure"
    ]
  },
]

export const mockIdeas: Idea[] = [
  {
    id: "idea-1",
    title: "Decentralized Social Network",
    tagline: "Own your data, control your feed",
    description: "A truly decentralized social network built on Solana where users own their content and data. No algorithms, no censorship, just pure peer-to-peer connection.",
    image: "🌐",
    category: "Web3",
    fundingGoal: 150000,
    currentFunding: 98000,
    backers: 234,
    daysLeft: 12,
    tags: ["Social", "Web3", "Decentralization"],
    status: "active",
    proposedBy: {
      name: "Alex Chen",
      twitter: "@alexchen_web3",
      avatar: "👨‍💻"
    }
  },
  {
    id: "idea-2",
    title: "NFT Music Marketplace",
    tagline: "Empowering artists through NFTs",
    description: "A marketplace where musicians can mint, sell, and trade music NFTs. Artists get 95% of sales, fans get exclusive perks and voting rights on future releases.",
    image: "🎵",
    category: "Music & Art",
    fundingGoal: 200000,
    currentFunding: 145000,
    backers: 412,
    daysLeft: 18,
    tags: ["NFT", "Music", "Artists"],
    status: "active",
    proposedBy: {
      name: "Sarah Martinez",
      twitter: "@sarahmusic",
      avatar: "🎤"
    }
  },
  {
    id: "idea-3",
    title: "Carbon Credit Protocol",
    tagline: "Transparent carbon offsetting on-chain",
    description: "A Solana-based protocol for issuing, trading, and retiring carbon credits. Making climate action transparent and accessible to everyone.",
    image: "🌱",
    category: "Climate",
    fundingGoal: 500000,
    currentFunding: 500000,
    backers: 892,
    daysLeft: 0,
    tags: ["Climate", "Carbon", "Sustainability"],
    status: "funded",
    proposedBy: {
      name: "Emma Green",
      twitter: "@emmagreen_eco",
      avatar: "🌍"
    }
  },
  {
    id: "idea-4",
    title: "Web3 Gaming Platform",
    tagline: "Play, earn, and own your assets",
    description: "A gaming platform where players truly own their in-game assets as NFTs. Cross-game compatibility and a thriving marketplace for digital collectibles.",
    image: "🎮",
    category: "Gaming",
    fundingGoal: 300000,
    currentFunding: 125000,
    backers: 567,
    daysLeft: 25,
    tags: ["Gaming", "NFT", "Play-to-Earn"],
    status: "active",
    proposedBy: {
      name: "Jake Williams",
      twitter: "@jakegames",
      avatar: "🕹️"
    }
  },
  {
    id: "idea-5",
    title: "DeFi Education DAO",
    tagline: "Learn DeFi, earn rewards",
    description: "A DAO-governed platform offering free DeFi education courses. Students earn tokens for completing courses, which can be used for governance or staked for rewards.",
    image: "📚",
    category: "Education",
    fundingGoal: 100000,
    currentFunding: 45000,
    backers: 156,
    daysLeft: 30,
    tags: ["DeFi", "Education", "DAO"],
    status: "active",
    proposedBy: {
      name: "David Kim",
      twitter: "@davidkim_defi",
      avatar: "📖"
    }
  },
  {
    id: "idea-6",
    title: "DAO Fundraising Tool",
    tagline: "Crowdfunding for DAOs, powered by Spark",
    description: "An all-in-one platform for DAOs to fundraise, manage treasuries, and distribute rewards to contributors. Built with transparency and governance at its core.",
    image: "⚡",
    category: "Infrastructure",
    fundingGoal: 250000,
    currentFunding: 78000,
    backers: 234,
    daysLeft: 45,
    tags: ["DAO", "Fundraising", "Governance"],
    status: "active",
    proposedBy: {
      name: "Lisa Park",
      twitter: "@lisapark_dao",
      avatar: "⚙️"
    }
  },
]

export const mockTeamMembers: Record<string, TeamMember[]> = {
  "nomu": [
    {
      name: "DLophem",
      role: "Co-founder",
      avatar: "🎮",
      bio: "Co-founder of NOMU, building the future of RWA commerce on Solana.",
      twitter: "@DLophem",
    },
    {
      name: "kriskolton",
      role: "Tech Lead",
      avatar: "💻",
      bio: "Leading technical development and architecture at NOMU.",
      twitter: "@kriskolton",
    },
    {
      name: "cryp_theo",
      role: "Community Manager",
      avatar: "👥",
      bio: "Building and nurturing the NOMU community across Web3.",
      twitter: "@cryp_theo",
    },
    {
      name: "tbazilee",
      role: "Design Lead",
      avatar: "🎨",
      bio: "Crafting beautiful and intuitive experiences for NOMU users.",
      twitter: "@tbazilee",
    },
    {
      name: "MattCogne",
      role: "Tech Magician",
      avatar: "🪄",
      bio: "Making the impossible possible with code and creativity.",
      twitter: "@MattCogne",
    },
  ],
  "spark": [
    {
      name: "Mathis",
      role: "Founder & Lead",
      avatar: "🚀",
      bio: "Leading Spark's product, structure, and operations with clarity and vision. Driving the future of decentralized crowdfunding.",
      twitter: "@Mathis_btc",
    },
    {
      name: "Hamon",
      role: "Tech Lead",
      avatar: "💻",
      bio: "Pushing product development to the next level. Building robust Solana infrastructure for seamless USDC transfers.",
      twitter: "@hamon28706",
    },
    {
      name: "Emre",
      role: "Communication & Strategy",
      avatar: "📢",
      bio: "Crafting Spark's narrative and growth strategy. Connecting innovative ideas with the right audience.",
      twitter: "@emre",
    },
  ],
}
