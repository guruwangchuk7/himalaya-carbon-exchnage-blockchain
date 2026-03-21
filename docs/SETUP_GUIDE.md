# Setup Guide

Follow this guide to initialize the Himalaya Carbon Exchange infrastructure locally.

---

## 1. System Requirements
- Node.js (v18 or higher)
- npm or yarn
- MySQL (v8) or PostgreSQL (If altering the Prisma Datasource Provider)
- Supabase Account 

---

## 2. Environment Variables
Copy `.env.example` to `.env` (or create a new `.env` file).

```env
# Database Access
DATABASE_URL="mysql://root:password@localhost:3306/himalaya_db"

# Authentication (Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Sovereign Security (Bridge)
REGISTRY_BRIDGE_AUTH="local_dev_secret_himalaya_123"

# Blockchain Configuration
PRIVATE_KEY="your_deployer_wallet_private_key"
NEXT_PUBLIC_RPC_URL="http://127.0.0.1:8545"

# Integration Mocks (Optional)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## 3. Database Initialization (Prisma)
Because the application hinges structurally on relational MySQL tables (e.g., locking `UserBalance` explicitly to `Profile`), initializing the schema is strictly mandatory.

```bash
# Apply the schema to your MySQL instance natively
npx prisma db push

# Generate the strictly-typed TypeScript definitions
npx prisma generate
```

> **Note**: If you radically modify `schema.prisma`, it is imperative that you re-execute `npx prisma generate` to reset the cached `include: {}` mappings, otherwise Server Actions heavily nested inside Next.js compilers may falsely throw TS warnings believing the newly created keys are type `never`.

---

## 4. Bootstrapping Blockchain State
To ensure the `publicClient` connects to the expected logic layer:

```bash
# Start a local Hardhat or Anvil node
npx hardhat node

# Deploy the Smart Contracts
npx hardhat run scripts/deploy.ts --network localhost
```

Insert the deployed contract address forcefully into `src/constants/index.ts` replacing `REGISTRY_ADDRESS`.
