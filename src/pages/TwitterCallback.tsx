import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { exchangeCodeForToken, getTwitterUser, storeTwitterUser } from "../services/twitterService"
import { useTwitterAuth } from "../hooks/useTwitterAuth"

export function TwitterCallback() {
  const navigate = useNavigate()
  const { setUser } = useTwitterAuth()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get code and state from URL
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code")
        const state = params.get("state")
        const errorParam = params.get("error")

        // Check for errors from Twitter
        if (errorParam) {
          throw new Error(`Twitter OAuth error: ${errorParam}`)
        }

        if (!code || !state) {
          throw new Error("Missing authorization code or state")
        }

        // Exchange code for tokens
        const tokens = await exchangeCodeForToken(code, state)

        // Get user info
        const twitterUser = await getTwitterUser(tokens.access_token)

        // Store user info
        storeTwitterUser(twitterUser)
        setUser(twitterUser)

        // Redirect to ideas page with success message
        navigate("/ideas?twitter_connected=true")
      } catch (err) {
        console.error("Twitter OAuth error:", err)
        setError(err instanceof Error ? err.message : "Authentication failed")
        setIsLoading(false)

        // Redirect to ideas page after 3 seconds
        setTimeout(() => {
          navigate("/ideas")
        }, 3000)
      }
    }

    handleCallback()
  }, [navigate, setUser])

  if (error) {
    return (
      <div className="min-h-screen bg-bg-default flex items-center justify-center p-4">
        <div className="bg-bg-secondary border border-red-500/50 rounded-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-fg-primary mb-4">
            Authentication Failed
          </h1>
          <p className="text-fg-secondary mb-6">{error}</p>
          <p className="text-fg-tertiary text-sm">Redirecting to Ideas page...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-default flex items-center justify-center p-4">
        <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4 animate-pulse">🐦</div>
          <h1 className="text-2xl font-bold text-fg-primary mb-4">
            Connecting to Twitter...
          </h1>
          <p className="text-fg-secondary">Please wait while we complete the authentication.</p>
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-4 border-spark-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
