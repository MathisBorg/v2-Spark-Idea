import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { mockTeams, mockTeamMembers } from "../data/mockData"
import { useWalletContext } from "../hooks/useWalletContext"
import { sendTokenTo } from "../utils/sendTokenTo"
import type { TeamInvestor } from "../types/teams"

// USDC Mint address on Solana Mainnet
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
// Wallet Spark de destination
const SPARK_WALLET = "8B5hi5887py2kJ8DiSv8bnmNuSDo2adf3fCVM1WxYfkb"

// Mock investors data
const mockInvestors: Record<string, TeamInvestor[]> = {
  "nomu": [
    {
      id: "1",
      userName: "David Chen",
      userAvatar: "👨‍💼",
      walletAddress: "8xKLp...3WnT",
      investmentAmount: 5000,
      comment: "NOMU is revolutionizing RWA commerce. Excited to share in the future revenue!",
      date: "2024-01-12"
    },
    {
      id: "2",
      userName: "Emma Wilson",
      userAvatar: "👩‍💻",
      walletAddress: "2mQ9j...7TpX",
      investmentAmount: 10000,
      comment: "Strong team with proven track record. Happy to invest in their future success.",
      date: "2024-01-11"
    }
  ],
  "spark": [
    {
      id: "1",
      userName: "Alex Rodriguez",
      userAvatar: "🧑‍🚀",
      walletAddress: "5pNw4...9HkL",
      investmentAmount: 2500,
      comment: "Spark is building the future of crowdfunding on Solana. Proud to be an investor!",
      date: "2024-01-10"
    }
  ]
}

export function TeamDetail() {
  const { id } = useParams()
  const team = mockTeams.find((t) => t.id === id)
  const members = mockTeamMembers[id || ""] || []
  const { address, connectWithPhantom, signTransaction, walletProvider, isWalletConnected } = useWalletContext()

  const [investAmount, setInvestAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [txSignature, setTxSignature] = useState("")
  const [error, setError] = useState("")
  const [investors] = useState<TeamInvestor[]>(mockInvestors[id || ""] || [])

  if (!team) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-fg-primary">Team not found</h1>
        <Link to="/teams" className="text-spark-primary hover:underline mt-4 inline-block">
          ← Back to Teams
        </Link>
      </div>
    )
  }

  const fundingPercentage = Math.round((team.currentFunding / team.fundingGoal) * 100)

  const handleInvest = async () => {
    if (!isWalletConnected || !address) {
      alert("Please connect your wallet first!")
      return
    }

    if (!investAmount || parseFloat(investAmount) <= 0) {
      alert("Please enter a valid amount!")
      return
    }

    setIsProcessing(true)
    setError("")
    setTxSignature("")

    try {
      const signature = await sendTokenTo({
        amount: parseFloat(investAmount),
        decimals: 6,
        tokenMint: USDC_MINT,
        walletAddress: address,
        destAddress: SPARK_WALLET,
        signTransaction,
        walletProvider: walletProvider as any,
        cluster: "mainnet",
      })

      setTxSignature(signature)
      setInvestAmount("")
      alert(`Investment successful!\n\nYou will receive ${team.revenueSharePercentage}% of ${team.name}'s future revenue proportional to your investment.\n\nTransaction: ${signature.slice(0, 8)}...${signature.slice(-8)}`)
    } catch (err) {
      console.error("Investment error:", err)
      setError(err instanceof Error ? err.message : "Failed to process investment")
      alert("Investment failed. Please check console for details.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link
        to="/teams"
        className="inline-flex items-center text-spark-primary hover:underline mb-8"
      >
        ← Back to Teams
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Team Header */}
          <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="text-8xl">{team.logo}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-fg-primary mb-2">
                  {team.name}
                </h1>
                <p className="text-xl text-spark-primary mb-4">{team.tagline}</p>
                <span className="inline-block px-4 py-2 bg-spark-primary/10 text-spark-primary text-sm font-semibold rounded-full border border-spark-primary/20 mb-4">
                  {team.category}
                </span>
                <p className="text-fg-secondary mb-6 leading-relaxed">{team.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {team.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-bg-tertiary text-fg-secondary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 text-sm">
                  {team.website && (
                    <a
                      href={team.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spark-primary hover:underline font-semibold"
                    >
                      🌐 Visit Website
                    </a>
                  )}
                  {team.twitter && (
                    <span className="text-fg-secondary">🐦 {team.twitter}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {team.achievements && team.achievements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-fg-primary mb-6">✨ Key Achievements</h2>
              <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {team.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-bg-tertiary rounded-lg"
                    >
                      <div className="text-spark-primary text-xl mt-1">✓</div>
                      <p className="text-fg-secondary flex-1">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Members */}
          {members.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-fg-primary mb-6">👥 Team Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-bg-secondary border border-bd-primary rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{member.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-fg-primary mb-1">
                          {member.name}
                        </h3>
                        <p className="text-spark-primary text-sm font-semibold mb-2">
                          {member.role}
                        </p>
                        <p className="text-fg-tertiary text-sm">{member.bio}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      {member.twitter && (
                        <a
                          href={`https://twitter.com/${member.twitter.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-spark-primary hover:underline"
                        >
                          🐦 Twitter
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investor Comments */}
          <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8">
            <h2 className="text-2xl font-bold text-fg-primary mb-6">
              Investor Community ({investors.length})
            </h2>

            <div className="space-y-6">
              {investors.map((investor) => (
                <div
                  key={investor.id}
                  className="bg-bg-tertiary border border-bd-primary rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{investor.userAvatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-fg-primary font-bold">{investor.userName}</h3>
                          <p className="text-fg-tertiary text-xs font-mono">{investor.walletAddress}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-spark-primary font-bold text-lg">
                            ${investor.investmentAmount} USDC
                          </div>
                          <div className="text-fg-tertiary text-xs">
                            {new Date(investor.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-fg-secondary mt-3">{investor.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {investors.length === 0 && (
              <div className="text-center py-12 text-fg-tertiary">
                No investors yet. Be the first to invest in {team.name}'s future!
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Investment */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Funding Stats */}
            <div className="bg-bg-secondary border border-bd-primary rounded-xl p-6">
              <div className="text-3xl font-bold text-fg-primary mb-2">
                ${(team.currentFunding / 1000).toFixed(0)}K
              </div>
              <div className="text-fg-secondary text-sm mb-4">
                raised of ${(team.fundingGoal / 1000).toFixed(0)}K goal
              </div>

              <div className="w-full bg-bg-tertiary rounded-full h-3 mb-6">
                <div
                  className="bg-spark-primary h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-bold text-fg-primary">
                    {team.investorCount}
                  </div>
                  <div className="text-fg-secondary text-sm">investors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-spark-primary">
                    {team.revenueSharePercentage}%
                  </div>
                  <div className="text-fg-secondary text-sm">revenue share</div>
                </div>
              </div>

              {/* Revenue Share Info */}
              <div className="bg-spark-primary/10 border border-spark-primary/20 rounded-lg p-4 mb-6">
                <div className="text-spark-primary text-sm font-semibold mb-1">
                  Revenue Sharing Model
                </div>
                <div className="text-fg-secondary text-xs">
                  Investors receive {team.revenueSharePercentage}% of {team.name}'s future revenue, distributed proportionally to investment amounts.
                </div>
              </div>

              {/* Investment Form */}
              <div className="border-t border-bd-primary pt-6">
                {!isWalletConnected ? (
                  <div className="text-center py-4">
                    <p className="text-fg-secondary text-sm mb-4">
                      Connect your wallet to invest
                    </p>
                    <button
                      onClick={connectWithPhantom}
                      className="w-full px-6 py-3 bg-spark-primary text-black font-bold rounded-lg hover:bg-spark-secondary transition-colors"
                    >
                      Connect Wallet
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-fg-secondary text-sm mb-2">
                        Investment Amount (USDC)
                      </label>
                      <input
                        type="number"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-3 bg-bg-tertiary border border-bd-primary rounded-lg text-fg-primary placeholder-fg-tertiary focus:outline-none focus:border-spark-primary"
                        disabled={isProcessing}
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-600/20 border border-red-600/40 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    {txSignature && (
                      <div className="p-3 bg-green-600/20 border border-green-600/40 rounded-lg">
                        <p className="text-green-400 text-sm font-mono break-all">
                          Success! Tx: {txSignature.slice(0, 8)}...{txSignature.slice(-8)}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleInvest}
                      disabled={isProcessing || !investAmount}
                      className="w-full px-6 py-3 bg-spark-primary text-black font-bold rounded-lg hover:bg-spark-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Processing..." : "Invest Now"}
                    </button>

                    <p className="text-fg-tertiary text-xs">
                      You'll receive {team.revenueSharePercentage}% of future revenue proportional to your investment
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
