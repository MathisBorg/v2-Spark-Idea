import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { mockIdeas } from "../data/mockData"
import { useWalletContext } from "../hooks/useWalletContext"
import { sendTokenTo } from "../utils/sendTokenTo"
import type { Comment } from "../types/ideas"

// USDC Mint address on Solana Mainnet
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
// Wallet Spark de destination
const SPARK_WALLET = "8B5hi5887py2kJ8DiSv8bnmNuSDo2adf3fCVM1WxYfkb"

// Mock comments data - in real app, this would come from backend
const mockComments: Comment[] = [
  {
    id: "1",
    userName: "Alice Chen",
    userAvatar: "👩‍💼",
    walletAddress: "7xKXt...9YnE",
    investmentAmount: 500,
    comment: "Amazing project! Really excited to see this come to life. The team has a solid track record.",
    date: "2024-01-10"
  },
  {
    id: "2",
    userName: "Bob Smith",
    userAvatar: "👨‍💻",
    walletAddress: "3mN4k...2TpL",
    investmentAmount: 1000,
    comment: "This is exactly what the ecosystem needs. Happy to support!",
    date: "2024-01-09"
  },
  {
    id: "3",
    userName: "Carlos Rodriguez",
    userAvatar: "🧑‍🚀",
    walletAddress: "9pQw8...4HjM",
    investmentAmount: 250,
    comment: "Great vision and clear roadmap. Looking forward to the launch!",
    date: "2024-01-08"
  }
]

export function IdeaDetail() {
  const { id } = useParams()
  const idea = mockIdeas.find((i) => i.id === id)
  const { address, connectWithPhantom, signTransaction, walletProvider, isWalletConnected } = useWalletContext()

  const [investAmount, setInvestAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [txSignature, setTxSignature] = useState("")
  const [error, setError] = useState("")
  const [comments] = useState<Comment[]>(mockComments)

  if (!idea) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-fg-primary">Idea not found</h1>
        <Link to="/ideas" className="text-spark-primary hover:underline mt-4 inline-block">
          ← Back to Ideas
        </Link>
      </div>
    )
  }

  const fundingPercentage = Math.round((idea.currentFunding / idea.fundingGoal) * 100)

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
      alert(`Investment successful!\n\nTransaction: ${signature.slice(0, 8)}...${signature.slice(-8)}`)
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
        to="/ideas"
        className="inline-flex items-center text-spark-primary hover:underline mb-8"
      >
        ← Back to Ideas
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* 1. Header - Idea Info */}
          <div className="bg-bg-secondary border border-bd-primary rounded-xl overflow-hidden mb-8">
            <div className="aspect-video bg-bg-tertiary flex items-center justify-center text-9xl">
              {idea.image}
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-spark-primary/20 text-spark-primary text-sm font-semibold rounded">
                  {idea.category}
                </span>
                {idea.status === "funded" && (
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm font-semibold rounded">
                    ✓ Funded
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-fg-primary mb-3">
                {idea.title}
              </h1>
              <p className="text-xl text-spark-primary mb-6">{idea.tagline}</p>
              <p className="text-fg-secondary mb-6">{idea.description}</p>

              {/* 5. Tags */}
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-bg-tertiary text-fg-secondary text-sm rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Vision/Details */}
          <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-fg-primary mb-4">
              The Vision
            </h2>
            <div className="space-y-4 text-fg-secondary">
              <p>
                {idea.description}
              </p>
              <p>
                This innovative project aims to revolutionize the {idea.category.toLowerCase()} sector by addressing key challenges and providing sustainable solutions.
              </p>
              <p>
                With your support, we can bring this vision to life and create lasting impact in the industry. Our team is committed to transparency and will provide regular updates on the project's progress.
              </p>
            </div>
          </div>

          {/* 6. Comments Section */}
          <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8">
            <h2 className="text-2xl font-bold text-fg-primary mb-6">
              Community Support ({comments.length})
            </h2>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-bg-tertiary border border-bd-primary rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{comment.userAvatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-fg-primary font-bold">{comment.userName}</h3>
                          <p className="text-fg-tertiary text-xs font-mono">{comment.walletAddress}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-spark-primary font-bold text-lg">
                            ${comment.investmentAmount} USDC
                          </div>
                          <div className="text-fg-tertiary text-xs">
                            {new Date(comment.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-fg-secondary mt-3">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-12 text-fg-tertiary">
                No comments yet. Be the first to invest and share your thoughts!
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* 2. Funding Progress */}
            <div className="bg-bg-secondary border border-bd-primary rounded-xl p-6">
              <div className="text-3xl font-bold text-fg-primary mb-2">
                ${(idea.currentFunding / 1000).toFixed(0)}K
              </div>
              <div className="text-fg-secondary text-sm mb-4">
                pledged of ${(idea.fundingGoal / 1000).toFixed(0)}K goal
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
                    {idea.backers}
                  </div>
                  <div className="text-fg-secondary text-sm">backers</div>
                </div>
                {idea.status === "active" && (
                  <div>
                    <div className="text-2xl font-bold text-spark-primary">
                      {idea.daysLeft}
                    </div>
                    <div className="text-fg-secondary text-sm">days left</div>
                  </div>
                )}
              </div>

              {/* 3. Investment Form */}
              {idea.status === "active" && (
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
                        Your investment will be sent via USDC on Solana
                      </p>
                    </div>
                  )}
                </div>
              )}

              {idea.status === "funded" && (
                <div className="bg-green-600/20 border border-green-600/40 rounded-lg p-4 text-center">
                  <div className="text-green-400 font-semibold mb-1">
                    🎉 Successfully Funded!
                  </div>
                  <div className="text-fg-secondary text-sm">
                    This project has reached its funding goal
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-bg-secondary border border-bd-primary rounded-xl p-6">
              <h3 className="font-bold text-fg-primary mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Category</span>
                  <span className="text-fg-primary font-semibold">
                    {idea.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Status</span>
                  <span className="text-spark-primary font-semibold capitalize">
                    {idea.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Funding Progress</span>
                  <span className="text-fg-primary font-semibold">
                    {fundingPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
