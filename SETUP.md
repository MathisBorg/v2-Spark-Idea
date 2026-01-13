# Guide de Setup - Spark Ideas v2

## Configuration Rapide

### 1. Configurer le Wallet de Destination

**IMPORTANT** : Avant d'utiliser l'application, vous devez configurer le wallet qui recevra les fonds USDC.

Ouvrez `src/components/InvestmentForm.tsx` et remplacez :

```typescript
const SPARK_WALLET = "YOUR_SPARK_WALLET_ADDRESS_HERE"
```

Par votre adresse de wallet Solana, par exemple :

```typescript
const SPARK_WALLET = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"
```

### 2. Choisir le Réseau

Par défaut, l'application est configurée pour **mainnet**.

Pour tester sur **devnet** :

Dans `src/components/InvestmentForm.tsx`, ligne ~45, changez :

```typescript
cluster: "devnet",  // au lieu de "mainnet"
```

⚠️ **Attention** : Sur devnet, vous devez aussi changer l'adresse du token USDC :

```typescript
// USDC Devnet (obtenir depuis Solana faucet)
const USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
```

### 3. Vérifier Phantom

Assurez-vous d'avoir installé [Phantom Wallet](https://phantom.app/) dans votre navigateur.

### 4. Obtenir des USDC (pour tests)

#### Mainnet
Achetez du USDC sur un exchange (Coinbase, Binance, etc.) et transférez vers votre wallet Phantom.

#### Devnet (pour tests)
1. Obtenir du SOL devnet : https://faucet.solana.com/
2. Swap SOL → USDC sur un DEX devnet ou utiliser un faucet USDC devnet

## Lancement de l'Application

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev

# Ou builder pour production
npm run build
```

## Points de Configuration

### Frontend

| Fichier | Variable | Description |
|---------|----------|-------------|
| `src/components/InvestmentForm.tsx` | `SPARK_WALLET` | Wallet destination pour les fonds |
| `src/components/InvestmentForm.tsx` | `USDC_MINT` | Adresse du token USDC |
| `src/components/InvestmentForm.tsx` | `cluster` | "mainnet" ou "devnet" |

### Couleurs et Branding

Pour personnaliser les couleurs, modifiez `tailwind.config.js` :

```javascript
colors: {
  spark: {
    primary: "#ACFF73",    // Couleur principale
    secondary: "#A3E683",   // Couleur secondaire
    dark: "#0B0F19",        // Fond sombre
  },
}
```

## Vérification Avant Production

Avant de déployer en production, vérifiez :

- [ ] `SPARK_WALLET` est configuré avec la bonne adresse
- [ ] `cluster` est défini sur `"mainnet"`
- [ ] `USDC_MINT` utilise l'adresse mainnet
- [ ] Vous avez testé une transaction sur devnet
- [ ] Le build fonctionne sans erreur (`npm run build`)

## Troubleshooting

### "Phantom not detected"
→ Installez l'extension Phantom : https://phantom.app/download

### "Failed to send token"
→ Vérifiez que vous avez assez de USDC dans votre wallet
→ Vérifiez que vous avez assez de SOL pour les frais de transaction (~0.000005 SOL)

### Erreur de build
→ Supprimez `node_modules` et `package-lock.json`
→ Relancez `npm install`

### Transaction échoue
→ Vérifiez le réseau (mainnet vs devnet)
→ Vérifiez l'adresse du wallet de destination
→ Vérifiez que le compte existe et peut recevoir des tokens

## Support

Pour toute question :
- GitHub Issues : https://github.com/MathisBorg/v2-Spark-Idea/issues
- Email : mathis@borgpad.com
