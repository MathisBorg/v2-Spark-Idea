import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import { WalletProvider } from "./hooks/useWalletContext"
import { TwitterAuthProvider } from "./hooks/useTwitterAuth"
import { WalletConnect } from "./components/WalletConnect"
import { Home } from "./pages/Home"
import { Teams } from "./pages/Teams"
import { TeamDetail } from "./pages/TeamDetail"
import { Ideas } from "./pages/Ideas"
import { IdeaDetail } from "./pages/IdeaDetail"
import { TwitterCallback } from "./pages/TwitterCallback"

function AppContent() {
  const location = useLocation()

  return (
    <WalletProvider>
      <TwitterAuthProvider>
        <div className="min-h-screen bg-bg-default">
        <header className="border-b border-bd-primary sticky top-0 bg-bg-default/95 backdrop-blur-sm z-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-3xl font-bold text-spark-primary hover:opacity-80 transition-opacity">
                ⚡ Spark Ideas
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                <Link
                  to="/teams"
                  className={`text-lg font-semibold transition-colors ${
                    location.pathname.startsWith('/teams')
                      ? 'text-spark-primary'
                      : 'text-fg-secondary hover:text-fg-primary'
                  }`}
                >
                  Teams
                </Link>
                <Link
                  to="/ideas"
                  className={`text-lg font-semibold transition-colors ${
                    location.pathname.startsWith('/ideas')
                      ? 'text-spark-primary'
                      : 'text-fg-secondary hover:text-fg-primary'
                  }`}
                >
                  Ideas
                </Link>
              </nav>

              <WalletConnect />
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/ideas/:id" element={<IdeaDetail />} />
            <Route path="/auth/twitter/callback" element={<TwitterCallback />} />
          </Routes>
        </main>

        <footer className="border-t border-bd-primary mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-spark-primary mb-4">⚡ Spark Ideas</h3>
                <p className="text-fg-tertiary text-sm">
                  Fund the future, one idea at a time. Built on Solana.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-fg-primary mb-4">Explore</h4>
                <div className="space-y-2">
                  <Link to="/teams" className="block text-fg-secondary hover:text-spark-primary text-sm">
                    Teams
                  </Link>
                  <Link to="/ideas" className="block text-fg-secondary hover:text-spark-primary text-sm">
                    Ideas
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-fg-primary mb-4">Connect</h4>
                <div className="space-y-2 text-fg-secondary text-sm">
                  <div>🐦 Twitter</div>
                  <div>💬 Discord</div>
                  <div>📧 hello@sparkideas.io</div>
                </div>
              </div>
            </div>
            <div className="border-t border-bd-primary pt-6 text-center text-fg-tertiary text-sm">
              Spark Ideas v2.0 - Powered by Solana © 2026
            </div>
          </div>
        </footer>
      </div>
      </TwitterAuthProvider>
    </WalletProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
