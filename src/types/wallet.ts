import { PublicKey, Transaction } from "@solana/web3.js"

export type WalletState = "NOT_CONNECTED" | "CONNECTING" | "CONNECTED"

export const SupportedWallets = ["PHANTOM"] as const
export type SupportedWallet = (typeof SupportedWallets)[number]

export type PhantomProvider = {
  signIn: (args: { domain: string }) => Promise<{
    address: { toString(): string }
  }>
  connect: (args?: { onlyIfTrusted?: boolean }) => Promise<{
    publicKey: { toString(): string }
  }>
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  publicKey: PublicKey
  isConnected: boolean
  on: (
    event: string,
    callback: (publicKey: PublicKey | { publicKey: string } | string) => void
  ) => void
  removeListener: (
    event: string,
    callback: (publicKey: PublicKey | { publicKey: string } | string) => void
  ) => void
  disconnect: () => Promise<void>
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider
    }
  }
}
