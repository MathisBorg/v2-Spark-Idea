// Twitter OAuth 2.0 with PKCE implementation
// Documentation: https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code

const TWITTER_CLIENT_ID = import.meta.env.VITE_TWITTER_CLIENT_ID || ""
const REDIRECT_URI = import.meta.env.VITE_TWITTER_REDIRECT_URI || `${window.location.origin}/auth/twitter/callback`

// Generate random string for code verifier (PKCE)
function generateRandomString(length: number): string {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], "")
}

// Generate code challenge from verifier (PKCE)
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

export interface TwitterUser {
  id: string
  name: string
  username: string
  profile_image_url?: string
}

export interface TwitterAuthTokens {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
}

// Start Twitter OAuth flow
export async function initiateTwitterLogin(): Promise<void> {
  // Generate PKCE parameters
  const codeVerifier = generateRandomString(128)
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  const state = generateRandomString(32)

  // Store in sessionStorage for later verification
  sessionStorage.setItem("twitter_code_verifier", codeVerifier)
  sessionStorage.setItem("twitter_state", state)

  // Build authorization URL
  const params = new URLSearchParams({
    response_type: "code",
    client_id: TWITTER_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "tweet.read users.read offline.access",
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  })

  const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`

  // Redirect to Twitter authorization page
  window.location.href = authUrl
}

// Exchange authorization code for access token
export async function exchangeCodeForToken(
  code: string,
  state: string
): Promise<TwitterAuthTokens> {
  // Verify state matches
  const savedState = sessionStorage.getItem("twitter_state")
  if (state !== savedState) {
    throw new Error("State mismatch - possible CSRF attack")
  }

  const codeVerifier = sessionStorage.getItem("twitter_code_verifier")
  if (!codeVerifier) {
    throw new Error("Code verifier not found")
  }

  // Exchange code for token
  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: TWITTER_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Token exchange failed: ${error.error_description || error.error}`)
  }

  const tokens: TwitterAuthTokens = await response.json()

  // Clear session storage
  sessionStorage.removeItem("twitter_code_verifier")
  sessionStorage.removeItem("twitter_state")

  // Store tokens
  localStorage.setItem("twitter_access_token", tokens.access_token)
  if (tokens.refresh_token) {
    localStorage.setItem("twitter_refresh_token", tokens.refresh_token)
  }
  localStorage.setItem(
    "twitter_token_expiry",
    (Date.now() + tokens.expires_in * 1000).toString()
  )

  return tokens
}

// Get current user info from Twitter
export async function getTwitterUser(accessToken: string): Promise<TwitterUser> {
  const response = await fetch(
    "https://api.twitter.com/2/users/me?user.fields=profile_image_url",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch user info")
  }

  const data = await response.json()
  return data.data
}

// Check if user is authenticated
export function isTwitterAuthenticated(): boolean {
  const token = localStorage.getItem("twitter_access_token")
  const expiry = localStorage.getItem("twitter_token_expiry")

  if (!token || !expiry) {
    return false
  }

  // Check if token is expired
  if (Date.now() > parseInt(expiry)) {
    // Token expired, try to refresh
    return false
  }

  return true
}

// Get stored access token
export function getStoredTwitterToken(): string | null {
  return localStorage.getItem("twitter_access_token")
}

// Get stored user info
export function getStoredTwitterUser(): TwitterUser | null {
  const userJson = localStorage.getItem("twitter_user")
  return userJson ? JSON.parse(userJson) : null
}

// Store user info
export function storeTwitterUser(user: TwitterUser): void {
  localStorage.setItem("twitter_user", JSON.stringify(user))
}

// Logout
export function logoutTwitter(): void {
  localStorage.removeItem("twitter_access_token")
  localStorage.removeItem("twitter_refresh_token")
  localStorage.removeItem("twitter_token_expiry")
  localStorage.removeItem("twitter_user")
}
