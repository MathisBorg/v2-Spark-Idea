# Backend Cloudflare Workers - À implémenter

Ce document décrit les prochaines étapes pour ajouter un backend Cloudflare Workers au projet Spark Ideas v2.

## État Actuel

✅ **Frontend Complet**
- Connexion wallet Phantom
- Composant d'investissement USDC
- Transfert direct de tokens SPL
- Interface utilisateur complète

❌ **Backend Non Implémenté**
- Pas de validation serveur
- Pas d'enregistrement en base de données
- Pas de gestion des récompenses

## Architecture Backend Proposée

### 1. Cloudflare Workers

**Pourquoi Cloudflare Workers ?**
- Serverless → Pas de gestion de serveur
- Edge computing → Latence ultra-faible
- Gratuit jusqu'à 100K requêtes/jour
- Déjà utilisé dans BorgPad

### 2. Base de Données

**Options :**
- **Cloudflare D1** (SQL serverless)
- **Cloudflare KV** (Key-Value store)
- **Supabase** (PostgreSQL + auth)
- **MongoDB Atlas**

### 3. APIs à Implémenter

#### a) POST `/api/createdeposittransaction`

**Rôle** : Créer une transaction USDC non signée

**Input** :
```typescript
{
  userWalletAddress: string
  amount: number
  projectId?: string  // Optionnel pour tracker les projets
}
```

**Output** :
```typescript
{
  serializedTransaction: string  // Transaction en base64
  depositId: string              // ID unique du dépôt
}
```

**Logique** :
1. Valider le montant (min/max)
2. Créer l'instruction de transfert USDC
3. Sérialiser la transaction
4. Retourner au frontend pour signature

#### b) POST `/api/senddeposittransaction`

**Rôle** : Envoyer la transaction signée et enregistrer en BD

**Input** :
```typescript
{
  serializedTransaction: string  // Transaction signée
  depositId: string
}
```

**Output** :
```typescript
{
  signature: string
  status: "success" | "failed"
  transactionUrl: string  // Lien Solscan/Explorer
}
```

**Logique** :
1. Envoyer la transaction à Solana
2. Attendre la confirmation
3. Parser la transaction (montant, wallet, etc.)
4. Enregistrer en base de données
5. Retourner la signature

#### c) GET `/api/deposits/:walletAddress`

**Rôle** : Récupérer l'historique des dépôts d'un wallet

**Output** :
```typescript
{
  deposits: [
    {
      id: string
      amount: number
      timestamp: Date
      signature: string
      status: string
    }
  ]
  totalInvested: number
}
```

#### d) GET `/api/stats`

**Rôle** : Statistiques globales

**Output** :
```typescript
{
  totalInvestors: number
  totalRaised: number
  totalDeposits: number
}
```

## Schéma de Base de Données

### Table `deposits`

```sql
CREATE TABLE deposits (
  id TEXT PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  amount REAL NOT NULL,
  token_mint TEXT NOT NULL,
  signature TEXT NOT NULL,
  project_id TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'confirmed',

  INDEX idx_wallet (wallet_address),
  INDEX idx_project (project_id),
  INDEX idx_timestamp (timestamp)
);
```

### Table `projects` (Optionnel)

```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  target_amount REAL,
  raised_amount REAL DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Structure des Fichiers Backend

```
v2-Spark-Idea/
├── functions/              # Cloudflare Workers
│   ├── api/
│   │   ├── createdeposittransaction.ts
│   │   ├── senddeposittransaction.ts
│   │   ├── deposits.ts
│   │   └── stats.ts
│   ├── services/
│   │   ├── depositService.ts
│   │   ├── solanaService.ts
│   │   └── dbService.ts
│   └── wrangler.toml       # Config Cloudflare Workers
```

## Étapes d'Implémentation

### Phase 1 : Setup Cloudflare Workers

```bash
# Installer Wrangler (CLI Cloudflare)
npm install -g wrangler

# Login
wrangler login

# Créer un nouveau worker
wrangler init backend
```

### Phase 2 : Configuration D1 Database

```bash
# Créer une base D1
wrangler d1 create spark-database

# Créer les tables
wrangler d1 execute spark-database --file=./schema.sql
```

### Phase 3 : Implémenter les APIs

1. `createdeposittransaction.ts` - Créer transaction
2. `senddeposittransaction.ts` - Envoyer et enregistrer
3. `deposits.ts` - Historique
4. `stats.ts` - Statistiques

### Phase 4 : Intégration Frontend

Modifier `src/components/InvestmentForm.tsx` pour :
1. Appeler `/api/createdeposittransaction` au lieu de `sendTokenTo` direct
2. Signer la transaction
3. Appeler `/api/senddeposittransaction` avec la transaction signée

## Exemple de Code

### `createdeposittransaction.ts`

```typescript
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { createTransferCheckedInstruction, getAssociatedTokenAddress } from '@solana/spl-token'

export async function onRequest(context) {
  const { userWalletAddress, amount } = await context.request.json()

  // Validation
  if (amount < 1 || amount > 10000) {
    return new Response(JSON.stringify({ error: 'Invalid amount' }), { status: 400 })
  }

  // Créer transaction
  const connection = new Connection('https://api.mainnet-beta.solana.com')
  const transaction = new Transaction()

  // ... ajouter instructions de transfert

  const serialized = transaction.serialize({ requireAllSignatures: false }).toString('base64')

  return new Response(JSON.stringify({
    serializedTransaction: serialized,
    depositId: crypto.randomUUID()
  }))
}
```

## Variables d'Environnement

Créer `wrangler.toml` :

```toml
name = "spark-backend"
main = "functions/index.ts"
compatibility_date = "2024-01-01"

[vars]
SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
SPARK_WALLET = "YOUR_WALLET_ADDRESS"
USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

[[d1_databases]]
binding = "DB"
database_name = "spark-database"
database_id = "..."
```

## Déploiement

```bash
# Déployer sur Cloudflare
wrangler deploy

# Tester localement
wrangler dev
```

## Sécurité

- [ ] Valider tous les inputs
- [ ] Rate limiting (éviter le spam)
- [ ] CORS configuré correctement
- [ ] Pas de clés privées côté serveur (transaction signée par le client)
- [ ] Logs pour audit trail

## Coûts Estimés

**Cloudflare Workers** :
- Gratuit : 100K requêtes/jour
- Payant : $5/mois pour 10M requêtes

**D1 Database** :
- Gratuit : 100K lectures/jour, 50K écritures/jour
- Très abordable au-delà

## Roadmap

1. **v1.0** - Transaction directe (ACTUEL)
2. **v1.1** - Backend API + BD
3. **v1.2** - Multi-projets
4. **v1.3** - Récompenses et gamification
5. **v2.0** - Dashboard analytics

## Ressources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- [BorgPad Monorepo](../borgpad-monorepo) - Référence existante

---

**Note** : Le système actuel (frontend uniquement) fonctionne déjà pour les transactions directes. Le backend est optionnel mais recommandé pour :
- Tracking et analytics
- Validation serveur
- Gestion des récompenses
- Historique persistant
