import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import type { ReactNode } from "react"
import { PublicKey, Transaction } from "@solana/web3.js"
import {
  connectPhantom,
  signInPhantom,
  setupPhantomWalletListeners,
  signTransactionWithPhantom,
} from "../services/phantomService"
import type { WalletState, SupportedWallet } from "../types/wallet"

type Context = {
  address: string
  walletState: WalletState
  walletProvider: SupportedWallet | ""
  connectWithPhantom: () => void
  signInWithPhantom: () => void
  signOut: () => void
  truncatedAddress: string
  signTransaction: (transaction: Transaction) => Promise<Transaction | null>
  isWalletConnected: boolean
}

const WalletContext = createContext<Context | undefined>(undefined)

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (!context)
    throw new Error("Component is outside of the <WalletProvider />")
  return context
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string>(
    () => localStorage.getItem("wallet_address") || ""
  )
  const [walletProvider, setWalletProvider] = useState<SupportedWallet | "">(
    () => (localStorage.getItem("wallet_provider") as SupportedWallet) || ""
  )
  const initialWalletState: WalletState = address ? "CONNECTED" : "NOT_CONNECTED"
  const [walletState, setWalletState] =
    useState<WalletState>(initialWalletState)

  const isWalletConnected = walletState === "CONNECTED" && Boolean(address)

  // Persist wallet data
  useEffect(() => {
    if (address) {
      localStorage.setItem("wallet_address", address)
    } else {
      localStorage.removeItem("wallet_address")
    }
  }, [address])

  useEffect(() => {
    if (walletProvider) {
      localStorage.setItem("wallet_provider", walletProvider)
    } else {
      localStorage.removeItem("wallet_provider")
    }
  }, [walletProvider])

  // Set up wallet event listeners
  useEffect(() => {
    if (!walletProvider) return

    const handleConnect = (
      publicKey: PublicKey | { publicKey: string } | string
    ) => {
      if (publicKey) {
        const addr = String(publicKey)
        setAddress(addr)
        setWalletState("CONNECTED")
      }
    }

    const handleDisconnect = () => {
      setAddress("")
      setWalletState("NOT_CONNECTED")
      setWalletProvider("")
    }

    const handleAccountChange = (newAddress: string) => {
      if (newAddress !== address) {
        setAddress(newAddress)
      }
    }

    let cleanup: () => void = () => {}

    if (walletProvider === "PHANTOM") {
      cleanup = setupPhantomWalletListeners({
        onConnect: handleConnect,
        onDisconnect: handleDisconnect,
        onAccountChange: handleAccountChange,
      })
    }

    return () => {
      cleanup()
    }
  }, [walletProvider, address])

  async function connectWithPhantom() {
    try {
      setWalletState("CONNECTING")
      const addr = await connectPhantom()
      setAddress(addr)
      setWalletState("CONNECTED")
      setWalletProvider("PHANTOM")
    } catch (e) {
      setWalletState("NOT_CONNECTED")
      handleConnectionError(e)
    }
  }

  async function signInWithPhantom() {
    try {
      setWalletState("CONNECTING")
      const addr = await signInPhantom()
      setAddress(addr)
      setWalletState("CONNECTED")
      setWalletProvider("PHANTOM")
    } catch (e) {
      setWalletState("NOT_CONNECTED")
      handleConnectionError(e)
    }
  }

  function handleConnectionError(e: unknown) {
    if (e instanceof Error && e.message === "User rejected the request.") {
      alert("Sign in declined by user!")
    } else {
      console.error(e)
    }
  }

  async function signTransaction(
    transaction: Transaction
  ): Promise<Transaction | null> {
    try {
      if (walletProvider === "PHANTOM") {
        return await signTransactionWithPhantom(transaction)
      }
      throw new Error("Provider not found!")
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async function signOut() {
    setAddress("")
    setWalletState("NOT_CONNECTED")
    setWalletProvider("")
    localStorage.removeItem("wallet_address")
    localStorage.removeItem("wallet_provider")
  }

  const truncatedAddress = truncateAddress(address)

  return (
    <WalletContext.Provider
      value={{
        address,
        walletState,
        walletProvider,
        connectWithPhantom,
        signInWithPhantom,
        signOut,
        truncatedAddress,
        signTransaction,
        isWalletConnected,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

function truncateAddress(address: string) {
  if (!address) return ""
  return address.slice(0, 4) + "..." + address.slice(-4)
}
