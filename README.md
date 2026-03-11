# Himalaya Carbon Exchange

This repository contains a Next.js application and Solidity contracts for a carbon-credit marketplace prototype. The implemented code covers:

- A public web UI built with Next.js App Router
- Wallet connectivity through Wagmi and RainbowKit
- Server-side API routes for registry lock ingestion, participant authorization, RFQ submission, CAD Trust sync simulation, and retirement verification
- Solidity contracts for an ERC-1155 registry and ERC-20 pool wrappers

Several pages and API responses currently use mock data while presenting production-style workflows. Those areas are identified in [ARCHITECTURE.md](/D:/My%20Files/Projects/himalaya-carbon-exchnage-blockchain/ARCHITECTURE.md) and [API.md](/D:/My%20Files/Projects/himalaya-carbon-exchnage-blockchain/API.md).

## Prerequisites

- Node.js 20+ recommended
- npm 10+
- A Polygon-compatible RPC endpoint for client and server blockchain access
- A deployed `HimalayaCarbonRegistry` contract address for contract-backed flows
- A WalletConnect project ID for RainbowKit

## Installation

```bash
npm install
```

## Environment Variables

Create `.env.local` from `.env.example`.

### Required for core app startup

- `NEXT_PUBLIC_RPC_URL`: RPC URL used by the server `publicClient` and the client-side Polygon Amoy config
- `NEXT_PUBLIC_RAINBOW_PROJECT_ID`: WalletConnect project ID used by RainbowKit
- `NEXT_PUBLIC_REGISTRY_ADDRESS`: registry contract address used by client reads/writes and server-side relayer code

### Required for server-side contract writes

- `PRIV_KEY`: private key for the relayer/owner wallet used by server routes and server actions

### Required for signed registry webhook flows

- `REGISTRY_BRIDGE_AUTH`: shared secret used to sign and verify `X-Registry-Signature`

### Optional in current code

- `NEXT_PUBLIC_RPC_URL_MAINNET`: mainnet RPC transport for the Polygon chain in the wallet provider config
- `NEXT_PUBLIC_CHAIN_ID`: present in `.env.example` but not read in code
- `NEXT_PUBLIC_CAD_TRUST_API_URL`: present in `.env.example` but not read in code
- `CAD_TRUST_AUTH_TOKEN`: present in `.env.example` but not read in code
- `NEXT_PUBLIC_VERCEL_ENV`: present in `.env.example` but not read in code
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: present in `.env.example` but not read in code
- `VULN_AUDIT_NOTIF_EMAIL`: present in `.env.example` but not read in code

`needs verification`: `src/lib/security.ts` falls back to the hard-coded secret `"test-lock-token-2026"` when `REGISTRY_BRIDGE_AUTH` is missing. That is acceptable for local testing only and should not be relied on outside development.

## Local Development

1. Install dependencies with `npm install`.
2. Create `.env.local` from `.env.example`.
3. Set `NEXT_PUBLIC_RPC_URL`, `NEXT_PUBLIC_RAINBOW_PROJECT_ID`, and `NEXT_PUBLIC_REGISTRY_ADDRESS`.
4. Set `PRIV_KEY` if you want server-side write flows to work:
   - `POST /api/registry/lock`
   - `POST /api/registry/participants`
   - `updateParticipantAuthorization` server action used by `/dashboard/admin`
5. Start the dev server:

```bash
npm run dev
```

6. Open `http://localhost:3000`.

## Available Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

There is no `test` script in `package.json`.

## Smart Contracts

The repository includes Solidity contracts under `contracts/`:

- `HimalayaCarbonRegistry.sol`
- `CarbonPool.sol`
- `CarbonPoolFactory.sol`

No contract build, deploy, or test toolchain is currently declared in `package.json`. Existing README references to Hardhat are not backed by this repository state and need verification before handoff.
