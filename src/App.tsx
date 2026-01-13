import { WalletProvider } from "./hooks/useWalletContext"
import { WalletConnect } from "./components/WalletConnect"
import { InvestmentForm } from "./components/InvestmentForm"

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-bg-default">
        <header className="border-b border-bd-primary">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-spark-primary">
              Spark Ideas
            </h1>
            <WalletConnect />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-fg-primary mb-4">
              Fund Innovation
            </h2>
            <p className="text-fg-secondary text-lg">
              Invest in groundbreaking ideas with USDC on Solana
            </p>
          </div>

          <InvestmentForm />
        </main>

        <footer className="border-t border-bd-primary mt-20">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-fg-tertiary text-sm">
            Spark Ideas v2.0 - Powered by Solana
          </div>
        </footer>
      </div>
    </WalletProvider>
  )
}

export default App
