import { useState } from "react"
import { useWalletContext } from "../hooks/useWalletContext"
import { sendTokenTo } from "../utils/sendTokenTo"

// USDC Mint address on Solana Mainnet
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

// Wallet Spark de destination (à configurer)
const SPARK_WALLET = "YOUR_SPARK_WALLET_ADDRESS_HERE"

export function InvestmentForm() {
  const { isWalletConnected, address, signTransaction, walletProvider } =
    useWalletContext()
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [txSignature, setTxSignature] = useState("")
  const [error, setError] = useState("")

  const handleInvest = async () => {
    if (!isWalletConnected) {
      alert("Please connect your wallet first!")
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount!")
      return
    }

    setIsLoading(true)
    setError("")
    setTxSignature("")

    try {
      const signature = await sendTokenTo({
        amount: parseFloat(amount),
        decimals: 6,
        tokenMint: USDC_MINT,
        walletAddress: address,
        destAddress: SPARK_WALLET,
        signTransaction,
        walletProvider: walletProvider as any,
        cluster: "mainnet",
      })

      setTxSignature(signature)
      setAmount("")
      alert(`Investment successful! Transaction: ${signature}`)
    } catch (err) {
      console.error("Investment error:", err)
      setError(
        err instanceof Error ? err.message : "Failed to process investment"
      )
      alert("Investment failed. Please check console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isWalletConnected) {
    return (
      <div className="max-w-md mx-auto p-8 bg-bg-secondary rounded-xl border border-bd-primary">
        <p className="text-fg-secondary text-center">
          Please connect your wallet to invest
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-bg-secondary rounded-xl border border-bd-primary">
      <h2 className="text-2xl font-bold text-fg-primary mb-6">
        Invest in Spark Ideas
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-fg-secondary text-sm mb-2">
            Amount (USDC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-bg-tertiary border border-bd-primary rounded-lg text-fg-primary placeholder-fg-tertiary focus:outline-none focus:border-spark-primary"
            disabled={isLoading}
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
          disabled={isLoading || !amount}
          className="w-full px-6 py-3 bg-spark-primary text-black font-semibold rounded-lg hover:bg-spark-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Invest Now"}
        </button>

        <div className="pt-4 border-t border-bd-primary">
          <p className="text-fg-tertiary text-xs">
            Note: You'll be funding ideas on the Spark platform. Make sure you
            have USDC in your wallet.
          </p>
        </div>
      </div>
    </div>
  )
}
