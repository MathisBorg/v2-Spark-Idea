# Spark Ideas v2.0

La plateforme v2 de Spark pour financer les idées innovantes via USDC sur Solana.

## Features

- 🔗 Connexion Wallet Solana (Phantom)
- 💰 Investissement en USDC
- ⚡ Transactions rapides sur Solana
- 🎨 Interface moderne avec Tailwind CSS

## Stack Technique

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Solana (mainnet/devnet)
- **Wallet**: Phantom (extensible à Backpack, Solflare, Jupiter)

## Installation

### Prérequis

- Node.js v20+
- npm ou yarn
- Phantom Wallet extension installée dans votre navigateur

### Setup

1. Cloner le repository :
```bash
git clone https://github.com/MathisBorg/v2-Spark-Idea.git
cd v2-Spark-Idea
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer le wallet de destination :

Ouvrez `src/components/InvestmentForm.tsx` et modifiez la constante `SPARK_WALLET` :

```typescript
const SPARK_WALLET = "VOTRE_ADRESSE_WALLET_SOLANA"
```

4. Lancer le serveur de développement :
```bash
npm run dev
```

5. Ouvrir dans votre navigateur :
```
http://localhost:5173
```

## Configuration

### Wallet de Destination

Le wallet qui recevra les fonds USDC doit être configuré dans `src/components/InvestmentForm.tsx` :

```typescript
const SPARK_WALLET = "YOUR_SPARK_WALLET_ADDRESS_HERE"
```

### Réseau Solana

Par défaut, l'application utilise le **mainnet** Solana. Pour utiliser le devnet :

Dans `src/components/InvestmentForm.tsx`, changez :

```typescript
cluster: "devnet",  // au lieu de "mainnet"
```

### USDC Token Mint

L'adresse du token USDC est configurée automatiquement :
- **Mainnet**: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`

Pour devnet, utilisez l'adresse USDC devnet.

## Utilisation

1. **Connecter votre Wallet**
   - Cliquez sur "Connect Wallet"
   - Approuvez la connexion dans Phantom
   - Votre adresse s'affichera en haut à droite

2. **Investir**
   - Entrez le montant en USDC
   - Cliquez sur "Invest Now"
   - Approuvez la transaction dans Phantom
   - Attendez la confirmation

3. **Déconnexion**
   - Cliquez sur "Disconnect" pour déconnecter votre wallet

## Structure du Projet

```
v2-Spark-Idea/
├── src/
│   ├── components/         # Composants React
│   │   ├── WalletConnect.tsx    # Bouton de connexion wallet
│   │   └── InvestmentForm.tsx   # Formulaire d'investissement
│   ├── hooks/              # React hooks
│   │   └── useWalletContext.tsx # Context pour la gestion du wallet
│   ├── services/           # Services externes
│   │   └── phantomService.ts    # Intégration Phantom wallet
│   ├── types/              # Types TypeScript
│   │   └── wallet.ts            # Types pour les wallets
│   ├── utils/              # Utilitaires
│   │   └── sendTokenTo.ts       # Fonction pour envoyer des tokens SPL
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── public/                 # Assets statiques
├── tailwind.config.js      # Configuration Tailwind
├── vite.config.ts          # Configuration Vite
└── package.json            # Dépendances
```

## Fonctionnalités Techniques

### Connexion Wallet

Le système de connexion wallet utilise :
- `useWalletContext` hook pour gérer l'état global du wallet
- Persistance dans localStorage
- Event listeners pour détecter les changements de compte

### Transfert USDC

La fonction `sendTokenTo` gère :
- Création automatique du compte token de destination si nécessaire
- Gestion des associated token accounts (ATA)
- Signature de transaction avec le wallet
- Confirmation de transaction

### Gestion d'Erreurs

- Détection de wallet non installé
- Validation des montants
- Gestion des erreurs de transaction
- Retry automatique avec plusieurs RPC endpoints

## Backend (À venir)

Le backend Cloudflare Workers sera ajouté pour :
- Validation des transactions
- Enregistrement en base de données
- Gestion des récompenses
- API REST pour les dépôts

## Sécurité

- ⚠️ **IMPORTANT**: Configurez correctement l'adresse `SPARK_WALLET` avant de déployer en production
- Les clés privées ne sont jamais exposées (gérées par Phantom)
- Les transactions sont signées côté client
- Validation des montants avant signature

## Développement

### Ajouter un nouveau wallet

Pour ajouter le support d'un autre wallet (ex: Backpack) :

1. Créer le service : `src/services/backpackService.ts`
2. Ajouter le type dans `src/types/wallet.ts`
3. Intégrer dans `useWalletContext.tsx`
4. Mettre à jour `WalletConnect.tsx`

### Personnaliser l'UI

Les couleurs sont configurées dans `tailwind.config.js` :

```javascript
colors: {
  spark: {
    primary: "#ACFF73",
    secondary: "#A3E683",
  },
  // ...
}
```

## Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

### Déployer sur Vercel/Netlify

1. Connectez votre repo GitHub
2. Configurez :
   - Build command: `npm run build`
   - Output directory: `dist`
3. Déployez

## Roadmap

- [ ] Backend Cloudflare Workers
- [ ] Support multi-wallets (Backpack, Solflare)
- [ ] Historique des transactions
- [ ] Dashboard utilisateur
- [ ] Support multi-tokens (SOL, autres SPL tokens)
- [ ] Notifications temps réel

## Contribution

Les contributions sont les bienvenues ! Merci de :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## License

MIT License - voir LICENSE pour plus de détails

## Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Email : mathis@borgpad.com

---

**Spark Ideas** - Fund the future, one idea at a time 💡
