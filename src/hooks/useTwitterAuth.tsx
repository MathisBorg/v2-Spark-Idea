import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { TwitterUser } from "../services/twitterService"
import {
  isTwitterAuthenticated,
  getStoredTwitterUser,
  logoutTwitter,
} from "../services/twitterService"

interface TwitterAuthContextType {
  user: TwitterUser | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  setUser: (user: TwitterUser | null) => void
}

const TwitterAuthContext = createContext<TwitterAuthContextType | undefined>(undefined)

export function TwitterAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TwitterUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      if (isTwitterAuthenticated()) {
        const storedUser = getStoredTwitterUser()
        if (storedUser) {
          setUser(storedUser)
          setIsAuthenticated(true)
        }
      }
    }

    checkAuth()
  }, [])

  const login = () => {
    // This will be called from the Share My Idea modal
    // The actual OAuth flow is handled by initiateTwitterLogin
  }

  const logout = () => {
    logoutTwitter()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <TwitterAuthContext.Provider
      value={{ user, isAuthenticated, login, logout, setUser }}
    >
      {children}
    </TwitterAuthContext.Provider>
  )
}

export function useTwitterAuth() {
  const context = useContext(TwitterAuthContext)
  if (context === undefined) {
    throw new Error("useTwitterAuth must be used within a TwitterAuthProvider")
  }
  return context
}
