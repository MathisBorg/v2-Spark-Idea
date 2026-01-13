import { useWalletContext } from "../hooks/useWalletContext"

export function WalletConnect() {
  const {
    isWalletConnected,
    truncatedAddress,
    connectWithPhantom,
    signOut,
    walletState,
  } = useWalletContext()

  if (isWalletConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-bg-secondary rounded-lg border border-bd-primary">
          <span className="text-fg-primary font-mono">{truncatedAddress}</span>
        </div>
        <button
          onClick={signOut}
          className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/40 hover:bg-red-600/30 transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connectWithPhantom}
      disabled={walletState === "CONNECTING"}
      className="px-6 py-3 bg-spark-primary text-black font-semibold rounded-lg hover:bg-spark-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {walletState === "CONNECTING" ? "Connecting..." : "Connect Wallet"}
    </button>
  )
}
