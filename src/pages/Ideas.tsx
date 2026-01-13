import { useState } from "react"
import { Link } from "react-router-dom"
import { mockIdeas } from "../data/mockData"
import { useWalletContext } from "../hooks/useWalletContext"
import { sendTokenTo } from "../utils/sendTokenTo"

// USDC Mint address on Solana Mainnet
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
// Wallet Spark de destination
const SPARK_WALLET = "8B5hi5887py2kJ8DiSv8bnmNuSDo2adf3fCVM1WxYfkb"

export function Ideas() {
  const [showShareModal, setShowShareModal] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-fg-primary mb-4">
          Explore Ideas
        </h1>
        <p className="text-fg-secondary text-lg max-w-2xl mx-auto mb-8">
          Browse innovative ideas seeking funding. Invest in projects that resonate with your vision for the future.
        </p>

        <button
          onClick={() => setShowShareModal(true)}
          className="px-8 py-4 bg-spark-primary text-black font-bold text-lg rounded-lg hover:bg-spark-secondary transition-colors inline-flex items-center gap-2"
        >
          <span>✨</span>
          Share My Idea
        </button>
      </div>

      {/* All Ideas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* Share Idea Modal */}
      {showShareModal && (
        <ShareIdeaModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  )
}

function IdeaCard({ idea }: { idea: typeof mockIdeas[0] }) {
  const fundingPercentage = Math.round(
    (idea.currentFunding / idea.fundingGoal) * 100
  )

  return (
    <Link
      to={`/ideas/${idea.id}`}
      className="bg-bg-secondary border border-bd-primary rounded-xl overflow-hidden hover:border-spark-primary transition-all hover:shadow-lg hover:shadow-spark-primary/20 flex flex-col"
    >
      <div className="aspect-video bg-bg-tertiary flex items-center justify-center text-6xl">
        {idea.image}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-spark-primary/20 text-spark-primary text-xs font-semibold rounded">
            {idea.category}
          </span>
          {idea.status === "funded" && (
            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-semibold rounded">
              ✓ Funded
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-fg-primary mb-2">
          {idea.title}
        </h3>
        <p className="text-fg-secondary text-sm mb-2">{idea.tagline}</p>
        <p className="text-fg-tertiary text-sm mb-4 line-clamp-2">
          {idea.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-bg-tertiary text-fg-secondary text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-fg-secondary">Progress</span>
              <span className="text-spark-primary font-semibold">
                {fundingPercentage}%
              </span>
            </div>
            <div className="w-full bg-bg-tertiary rounded-full h-2">
              <div
                className="bg-spark-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-fg-tertiary">
              <span className="text-fg-primary font-semibold">
                ${(idea.currentFunding / 1000).toFixed(0)}K
              </span>{" "}
              raised
            </div>
            <div className="text-fg-tertiary">{idea.backers} backers</div>
            {idea.daysLeft > 0 && (
              <div className="text-spark-primary font-semibold">
                {idea.daysLeft}d left
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function ShareIdeaModal({ onClose }: { onClose: () => void }) {
  const { address: walletAddress, connectWithPhantom, signTransaction, walletProvider } = useWalletContext()
  const [twitterConnected, setTwitterConnected] = useState(false)
  const [twitterUser, setTwitterUser] = useState({ name: "", username: "" })
  const [depositComplete, setDepositComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [txSignature, setTxSignature] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    estimatedBudget: "",
    description: "",
  })

  const handleTwitterConnect = () => {
    // Simulated Twitter connection for demo
    setTwitterUser({
      name: "Demo User",
      username: "demouser"
    })
    setTwitterConnected(true)
  }

  const handleDepositUSDC = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first")
      return
    }

    setIsProcessing(true)
    setTxSignature("")

    try {
      // Real USDC transfer - 1 USDC deposit
      const signature = await sendTokenTo({
        amount: 1,
        decimals: 6,
        tokenMint: USDC_MINT,
        walletAddress: walletAddress,
        destAddress: SPARK_WALLET,
        signTransaction,
        walletProvider: walletProvider as any,
        cluster: "mainnet",
      })

      setTxSignature(signature)
      setDepositComplete(true)
      alert(`✓ USDC deposit successful!\n\nTransaction: ${signature.slice(0, 8)}...${signature.slice(-8)}\n\nYou can now submit your idea.`)
    } catch (err) {
      console.error("Deposit error:", err)
      alert(err instanceof Error ? err.message : "Deposit failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!depositComplete) {
      alert("Please deposit USDC first to create your idea")
      return
    }

    // Prepare idea data
    const ideaData = {
      ...formData,
      walletAddress,
      estimatedBudget: parseInt(formData.estimatedBudget),
      submittedAt: new Date().toISOString()
    }

    // TODO: Submit to backend API
    console.log("Submitting idea:", ideaData)
    alert(`Idea submitted successfully!\n\nName: ${ideaData.name}\nCategory: ${ideaData.category}\nBudget: $${ideaData.estimatedBudget}\n\nYour idea will be reviewed and published soon.`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary border border-bd-primary rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-fg-primary">Share Your Idea ✨</h2>
            <button
              onClick={onClose}
              className="text-fg-secondary hover:text-fg-primary text-2xl"
            >
              ×
            </button>
          </div>

          {/* Step 1: Twitter Connection (Simulated) */}
          {!twitterConnected ? (
            <div className="text-center py-12">
              <p className="text-fg-secondary mb-6">
                Connect your Twitter account to share your idea
              </p>
              <button
                onClick={handleTwitterConnect}
                className="px-6 py-3 bg-[#1DA1F2] text-white font-bold rounded-lg hover:bg-[#1a8cd8] transition-colors inline-flex items-center gap-2"
              >
                <span>🐦</span>
                Connect Twitter
              </button>
            </div>
          ) : !walletAddress ? (
            /* Step 2: Wallet Connection */
            <div>
              {/* Twitter Connected Status */}
              <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-fg-primary font-semibold">Twitter Connected</div>
                  <div className="text-green-400 text-sm">✓</div>
                </div>
                <div className="text-fg-tertiary text-sm">@{twitterUser.username}</div>
              </div>

              <div className="text-center py-8">
                <p className="text-fg-secondary mb-6">
                  Now connect your wallet to continue
                </p>
                <button
                  onClick={connectWithPhantom}
                  className="px-6 py-3 bg-spark-primary text-black font-bold rounded-lg hover:bg-spark-secondary transition-colors inline-flex items-center gap-2"
                >
                  <span>👛</span>
                  Connect Wallet
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Twitter Connected Status */}
              <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-fg-primary font-semibold">Twitter Connected</div>
                  <div className="text-green-400 text-sm">✓</div>
                </div>
                <div className="text-fg-tertiary text-sm">@{twitterUser.username}</div>
              </div>

              {/* Wallet Connected */}
              <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-fg-primary font-semibold">Wallet Connected</div>
                  <div className="text-green-400 text-sm">✓</div>
                </div>
                <div className="text-fg-tertiary text-sm font-mono">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </div>
              </div>

              {/* USDC Deposit Section */}
              {!depositComplete && (
                <div className="bg-bg-tertiary border border-bd-primary rounded-lg p-6 mb-6">
                  <h3 className="text-fg-primary font-bold text-lg mb-3">Step 1: Deposit USDC</h3>
                  <p className="text-fg-secondary text-sm mb-4">
                    To submit your idea, you need to deposit a small amount of USDC as a commitment fee. This helps ensure quality submissions.
                  </p>
                  <button
                    onClick={handleDepositUSDC}
                    disabled={isProcessing}
                    className="w-full px-6 py-3 bg-spark-primary text-black font-bold rounded-lg hover:bg-spark-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Deposit 1 USDC"}
                  </button>
                </div>
              )}

              {depositComplete && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <span>✓</span>
                    <span className="font-semibold">Deposit Complete</span>
                  </div>
                  <p className="text-fg-secondary text-sm mb-1">You can now submit your idea</p>
                  {txSignature && (
                    <p className="text-fg-tertiary text-xs font-mono break-all mt-2">
                      Tx: {txSignature.slice(0, 8)}...{txSignature.slice(-8)}
                    </p>
                  )}
                </div>
              )}
            {/* Idea Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-fg-primary font-bold text-lg mb-4">
                {depositComplete ? "Step 2: Submit Your Idea" : "Idea Details"}
              </h3>

              <div>
                <label className="block text-fg-primary font-semibold mb-2">
                  Idea Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-tertiary border border-bd-secondary rounded-lg text-fg-primary focus:border-spark-primary focus:outline-none"
                  placeholder="Enter your idea name"
                  disabled={!depositComplete}
                />
              </div>

              <div>
                <label className="block text-fg-primary font-semibold mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-tertiary border border-bd-secondary rounded-lg text-fg-primary focus:border-spark-primary focus:outline-none"
                  disabled={!depositComplete}
                >
                  <option value="">Select a category</option>
                  <option value="Web3">Web3</option>
                  <option value="DeFi">DeFi</option>
                  <option value="NFT">NFT & Art</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Education">Education</option>
                  <option value="Climate">Climate & Sustainability</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-fg-primary font-semibold mb-2">
                  Estimated Budget (USD) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-tertiary border border-bd-secondary rounded-lg text-fg-primary focus:border-spark-primary focus:outline-none"
                  placeholder="50000"
                  min="1000"
                  disabled={!depositComplete}
                />
              </div>

              <div>
                <label className="block text-fg-primary font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-bg-tertiary border border-bd-secondary rounded-lg text-fg-primary focus:border-spark-primary focus:outline-none resize-none"
                  placeholder="Describe your idea in detail..."
                  disabled={!depositComplete}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-bg-tertiary text-fg-primary font-bold rounded-lg hover:bg-bg-default transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!depositComplete}
                  className="flex-1 px-6 py-3 bg-spark-primary text-black font-bold rounded-lg hover:bg-spark-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Idea
                </button>
              </div>
            </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
