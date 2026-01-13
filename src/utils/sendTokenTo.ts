import {
  Transaction,
  PublicKey,
  Connection,
  TransactionInstruction,
} from "@solana/web3.js"
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token"
import type { SupportedWallet } from "../types/wallet"

const MAINNET_ENDPOINTS = [
  "https://api.mainnet-beta.solana.com",
  "https://solana-rpc.publicnode.com",
]

const DEVNET_ENDPOINTS = ["https://api.devnet.solana.com"]

export interface SendTokenParams {
  amount: number
  decimals?: number
  tokenMint: string
  walletAddress: string
  destAddress: string
  signTransaction: (transaction: Transaction) => Promise<Transaction | null>
  walletProvider: SupportedWallet
  cluster?: "mainnet" | "devnet"
}

export async function sendTokenTo(
  params: SendTokenParams
): Promise<string> {
  const {
    amount,
    decimals = 6,
    tokenMint,
    walletAddress: fromAddress,
    destAddress: toAddress,
    signTransaction,
    walletProvider,
    cluster = "mainnet",
  } = params

  if (!signTransaction || !walletProvider) {
    throw new Error("signTransaction and walletProvider are required")
  }

  const endpoints = cluster === "mainnet" ? MAINNET_ENDPOINTS : DEVNET_ENDPOINTS
  let lastError = null

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint} on ${cluster}`)

      const connection = new Connection(endpoint, "confirmed")
      const mint = new PublicKey(tokenMint)
      const fromPublicKey = new PublicKey(fromAddress)
      const toPublicKey = new PublicKey(toAddress)

      // Get associated token accounts for sender and receiver
      const fromTokenAccount = await getAssociatedTokenAddress(
        mint,
        fromPublicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )

      const toTokenAccount = await getAssociatedTokenAddress(
        mint,
        toPublicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )

      // Check if destination token account exists
      const toAccountInfo = await connection.getAccountInfo(toTokenAccount)
      const instructions: TransactionInstruction[] = []

      // Create destination token account if it doesn't exist
      if (!toAccountInfo) {
        console.log("Creating token account for recipient...")
        instructions.push(
          createAssociatedTokenAccountInstruction(
            fromPublicKey,
            toTokenAccount,
            toPublicKey,
            mint,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        )
      }

      // Add transfer instruction
      const transferAmount = amount * Math.pow(10, decimals)
      instructions.push(
        createTransferCheckedInstruction(
          fromTokenAccount,
          mint,
          toTokenAccount,
          fromPublicKey,
          transferAmount,
          decimals,
          [],
          TOKEN_PROGRAM_ID
        )
      )

      // Create and send transaction
      const transaction = new Transaction()
      transaction.add(...instructions)

      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = fromPublicKey

      // Sign transaction with wallet
      const signedTransaction = await signTransaction(transaction)
      if (!signedTransaction) {
        throw new Error("Transaction signing failed")
      }

      // Send transaction
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      )

      // Confirm transaction
      await connection.confirmTransaction(signature, "confirmed")

      console.log(`Transaction successful: ${signature}`)
      return signature
    } catch (error) {
      console.error(`Error with endpoint ${endpoint}:`, error)
      lastError = error
      continue
    }
  }

  throw lastError || new Error("Failed to send token with all endpoints")
}
