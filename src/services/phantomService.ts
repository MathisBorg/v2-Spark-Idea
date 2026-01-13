import { PublicKey, Transaction } from "@solana/web3.js"
import type { PhantomProvider } from "../types/wallet"

const PAGE_DOMAIN = window.location.host

export function getPhantomProvider(): PhantomProvider | null {
  return window?.phantom?.solana || null
}

export async function connectPhantom(): Promise<string> {
  const provider = getPhantomProvider()

  if (!provider) {
    alert("Phantom wallet not detected! Please install Phantom.")
    throw new Error("Phantom not found")
  }

  try {
    const signInRes = await provider.connect()
    const address = signInRes.publicKey.toString()
    return address
  } catch (error) {
    console.error("Phantom connection error:", error)
    throw error
  }
}

export async function signInPhantom(): Promise<string> {
  const provider = getPhantomProvider()

  if (!provider) {
    alert("Phantom wallet not detected! Please install Phantom.")
    throw new Error("Phantom not found")
  }

  try {
    const signInRes = await provider.signIn({
      domain: PAGE_DOMAIN,
    })
    const address = signInRes.address.toString()
    return address
  } catch (error) {
    console.error("Phantom sign in error:", error)
    throw error
  }
}

export function setupPhantomWalletListeners(callbacks: {
  onConnect: (publicKey: PublicKey | { publicKey: string } | string) => void
  onDisconnect: () => void
  onAccountChange: (address: string) => void
}): () => void {
  const provider = getPhantomProvider()

  if (!provider) {
    console.error("Phantom provider not found!")
    return () => {}
  }

  // Safe event listener setup
  if (typeof provider.on === 'function') {
    provider.on("connect", callbacks.onConnect)
    provider.on("disconnect", callbacks.onDisconnect)
  }

  const handleFocusChange = () => {
    if (provider.publicKey) {
      const currentAddress = provider.publicKey.toString()
      callbacks.onAccountChange(currentAddress)
    }
  }

  window.addEventListener("focus", handleFocusChange)

  return () => {
    // Safe cleanup - check if removeListener exists
    if (typeof provider.removeListener === 'function') {
      try {
        provider.removeListener("connect", callbacks.onConnect)
        provider.removeListener("disconnect", callbacks.onDisconnect)
      } catch (e) {
        console.warn("Error removing listeners:", e)
      }
    }
    window.removeEventListener("focus", handleFocusChange)
  }
}

export async function signTransactionWithPhantom(
  transaction: Transaction
): Promise<Transaction | null> {
  const provider = getPhantomProvider()

  if (!provider) {
    console.error("Phantom provider not found!")
    return null
  }

  try {
    const signedTx = await provider.signTransaction(transaction)
    return signedTx
  } catch (error) {
    console.error("Phantom sign transaction error:", error)
    return null
  }
}
