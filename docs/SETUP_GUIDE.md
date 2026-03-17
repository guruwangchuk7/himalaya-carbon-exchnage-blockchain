# Setup & Installation Guide

This guide describes how to configure your local development environment for the **Himalaya Carbon Exchange (HCE)**.

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:

-   **Node.js**: v20 or higher (v22.18+ recommended)
-   **npm**: v10 or higher
-   **PostgreSQL**: A running instance (or a [Supabase](https://supabase.com) project URL)
-   **Wallet**: A browser extension like Metamask (configured for Polygon Amoy)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/himalaya-carbon/carbon-exchange-blockchain.git
cd himalaya-carbon-exchnage-blockchain
npm install
```

### 2. Environment Configuration

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

**Key Variables to Configure:**
-   `DATABASE_URL`: Your PostgreSQL connection string.
-   `NEXT_PUBLIC_RPC_URL`: Set to `http://127.0.0.1:8545` for local dev or a Polygon Amoy URL.
-   `PRIV_KEY`: A private key for the protocol relayer (must have funds for the target network).
-   `REGISTRY_BRIDGE_AUTH`: A shared secret used for HMAC-signed bridge transactions.

### 3. Database Initialization

```bash
npx prisma generate
npx prisma db push
```

### 4. Start Local Blockchain (Optional)

If you are not using a live testnet, start a local Hardhat node in a separate terminal:

```bash
npx hardhat node
```

### 5. Deploy Smart Contracts

Deploy the registry to your local branch/testnet:

```bash
# To local node
npx hardhat run scripts/deploy.ts --network localhost

# To Polygon Amoy
npm run deploy-amoy
```

*Don't forget to update `NEXT_PUBLIC_REGISTRY_ADDRESS` in your `.env` with the output address.*

---

## 🛠️ Running the Services

The HCE system consists of multiple services that should be run in parallel during development.

### Web Application (UI & API)
Runs the Next.js frontend and the administrative API endpoints.
```bash
npm run dev
```

### Harmony Watcher (CAD Trust Bridge)
Runs the real-time event listener that synchronizes retirements with the CAD Trust.
```bash
npm run harmony-watch
```

---

## 🧪 Verification Commands

Use these built-in scripts to verify your setup:

-   **Check Balance**: `npx tsx scripts/check-balance.ts`
-   **Estimate Gas**: `npx tsx scripts/estimate-gas.ts`
-   **Contract Compile**: `npm run compile`

---

## ⚠️ Troubleshooting

### Node.js Version Warning
If you see a warning about Node.js v22 not being supported by Hardhat, it is safe to ignore. We have configured `tsconfig.json` to be compatible with ES2020 features.

### "Module not found" for .js files
If you encounter module resolution errors when running scripts, ensure you are using `npx tsx` instead of `ts-node`. We have removed `.js` extensions from imports to support standard TypeScript resolution.

### Prisma Client Errors
If the database schema changes, ensure you run `npx prisma generate` to refresh the type-safe client.
