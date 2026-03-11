# Himalaya Carbon Exchange

Technical documentation for the current repository state of the Himalaya Carbon Exchange prototype.

This project combines:

- A `Next.js` App Router web application
- `viem`-based blockchain reads and server-side writes
- `wagmi` + `RainbowKit` wallet connectivity
- Solidity contracts for a sovereign carbon registry and pool primitives
- Mocked and semi-realistic API flows for registry synchronization, retirement verification, RFQ intake, and CAD Trust lifecycle events

The codebase presents a production-style sovereign carbon market UX, but several modules are still prototype or simulation layers. This README documents what is actually present in code as of March 11, 2026.

## 1. Repository Purpose

The repository models a sovereign carbon exchange where:

- a national registry is treated as the source of truth
- locked registry units can be mirrored on-chain as ERC-1155 credits
- authorized institutions can be whitelisted to hold or receive credits
- credits can be retired on-chain
- a retirement receipt can be transformed into a certificate-like response
- liquidity and market structure concepts are represented in UI and contracts

Important constraint: the application is not itself a full registry implementation. The landing page and supporting code position it as a market layer synchronized with an external sovereign registry.

## 2. Tech Stack

### Frontend

- `Next.js 16.1.6`
- `React 19.2.3`
- App Router under `src/app`
- Tailwind CSS v4 via `@tailwindcss/postcss`
- `framer-motion`
- `lucide-react`

### Web3 / Data

- `viem`
- `wagmi`
- `@rainbow-me/rainbowkit`
- `@tanstack/react-query`

### Validation / Utilities

- `zod`
- Node `crypto`
- `clsx`
- `tailwind-merge`

### Smart Contracts

- Solidity `^0.8.20`
- OpenZeppelin `@openzeppelin/contracts`

## 3. Current Feature Set

Implemented in code:

- marketing landing page
- wallet provider setup for Polygon and Polygon Amoy
- marketplace page with mock inventory and RFQ submission
- dashboard page with static metrics
- admin page for whitelist management
- retirement page with direct browser-side contract write
- simulator page to generate signed registry payloads
- transparency page combining mock API data and on-chain reads
- project detail pages driven by route params
- API routes for registry status, participants, lock/mint, CAD Trust sync, RFQ intake, and retirement verification
- Solidity contracts for registry and pool constructs

Partially implemented or simulated:

- sovereign registry bridge
- CAD Trust synchronization
- certificate issuance
- market inventory, pricing, compliance metrics, and analytics
- administrative access control

Not implemented in this repository:

- database or persistent storage
- authentication/session system
- automated test suite
- contract deployment pipeline
- contract compilation script/tooling in `package.json`
- real CAD Trust or registry outbound integrations

## 4. Project Structure

```text
.
|-- contracts/
|   |-- HimalayaCarbonRegistry.sol
|   |-- CarbonPool.sol
|   `-- CarbonPoolFactory.sol
|-- docs/
|   |-- dashboard_overview.md
|   `-- implementation_report_mar_2026.md
|-- public/
|   |-- docs/
|   `-- images/
|-- src/
|   |-- abis/
|   |-- app/
|   |   |-- actions/
|   |   |-- api/
|   |   |-- dashboard/
|   |   |-- marketplace/
|   |   |-- projects/[id]/
|   |   |-- retire/
|   |   |-- simulator/
|   |   `-- transparency/
|   |-- components/
|   |-- constants/
|   |-- docs/
|   `-- lib/
|-- API.md
|-- ARCHITECTURE.md
|-- DOCSTRINGS.md
`-- README.md
```

## 5. Application Modules

### UI Pages

- `src/app/page.tsx`
  - landing page
  - frames the platform as a registry-synchronized market layer
- `src/app/marketplace/page.tsx`
  - marketplace UI
  - uses local/mock inventory
  - posts RFQs to `/api/market/rfq`
- `src/app/dashboard/page.tsx`
  - user dashboard
  - largely presentation-oriented with static content
- `src/app/dashboard/admin/page.tsx`
  - admin-facing whitelist management UI
  - fetches `/api/registry/participants`
  - invokes `updateParticipantAuthorization` server action
  - labels itself restricted, but there is no real auth layer
- `src/app/retire/page.tsx`
  - user-driven retirement flow
  - connected wallet calls the registry contract directly
  - then posts transaction hash to `/api/retire/verify`
- `src/app/simulator/page.tsx`
  - test harness for HMAC-signed registry lock payloads
- `src/app/transparency/page.tsx`
  - combines mock registry status data and on-chain project count
- `src/app/projects/[id]/page.tsx`
  - project detail page from route-derived mock content

### Shared Components

The landing page is composed from `src/components/`:

- `Navbar.tsx`
- `Hero.tsx`
- `LogoTicker.tsx`
- `Features.tsx`
- `BentoGrid.tsx`
- `Pricing.tsx`
- `Footer.tsx`
- `Button.tsx`
- `Providers.tsx`

### Server Actions

- `src/app/actions/sovereign.ts`
  - server-side participant authorization update
  - uses relayer wallet
  - no session check is implemented
- `src/app/actions/simulate.ts`
  - returns an HMAC signature for simulator payload generation

### Shared Libraries

- `src/lib/blockchain.ts`
  - creates `publicClient`
  - creates `walletClient` from `PRIV_KEY`
  - exports `mintFromRegistry()`
  - hard-codes Polygon Amoy for server-side chain operations
- `src/lib/security.ts`
  - defines `RegistryMetadataSchema`
  - signs and verifies HMAC payloads
  - logs audit events
  - falls back to a hard-coded development secret if env var is missing
- `src/lib/certificates.ts`
  - creates certificate objects from retirement context
  - not fully grounded in event-derived project metadata
- `src/lib/dex.ts`
  - DEX/liquidity helpers
  - currently not a core runtime dependency of active routes

### Constants and ABI

- `src/constants/index.ts`
  - registry ABI export
  - UI constants
  - includes a registry address constant used by some code paths
- `src/abis/HimalayaCarbonRegistry.json`
  - ABI artifact used by the application

## 6. Smart Contracts

### `contracts/HimalayaCarbonRegistry.sol`

Primary on-chain registry contract.

Key characteristics:

- ERC-1155 based
- `Ownable`
- `ERC1155Supply`
- holds per-project metadata in `projectData`
- keeps a whitelist in `authorizedParticipants`
- restricts non-mint/non-burn transfers to authorized recipients

Core data model:

- `ProjectStatus`: `Pending`, `Authorized`, `Issued`, `Retired`, `Cancelled`, `Transferred`
- `ProjectMetadata` includes:
  - project name and external project ID
  - batch / serial metadata
  - vintage year
  - Article 6 authorization flags
  - corresponding adjustment flag
  - methodology
  - registry link
  - total issuance
  - retired amount

Core functions:

- `mintCarbonCredit()`
- `batchMintCarbonCredits()`
- `getProjectIds()`
- `getProjectCount()`
- `getProject()`
- `setParticipantAuthorization()`
- `setArticle6Status()`
- `setCorrespondingAdjustment()`
- `retire()`
- `uri()`

Core events:

- `CarbonMinted`
- `CarbonRetired`
- `Article6StatusUpdated`
- `ParticipantAuthorized`
- `CorrespondingAdjustmentRecorded`

### `contracts/CarbonPool.sol`

Represents pooled exposure around registry assets using an ERC-20 style wrapper. This expands the market design beyond the registry contract, but the pool layer is not fully wired into the live app flows.

### `contracts/CarbonPoolFactory.sol`

Owner-controlled pool deployment contract. The repository includes the Solidity source, but no build or deployment pipeline is declared in `package.json`.

## 7. API Surface

All route handlers live under `src/app/api/`.

### Registry

#### `GET /api/registry/status`

Returns mock registry summary data:

- total locked units
- active serial batches
- last audit timestamp
- jurisdiction
- status string

This is not backed by live registry infrastructure.

#### `GET /api/registry/participants`

Returns a hard-coded participant list. It does not read on-chain whitelist state.

#### `POST /api/registry/participants`

Purpose:

- update participant authorization on-chain via relayer

Requirements:

- `X-Registry-Signature` header
- JSON body with `participantAddress` and `status`

Behavior:

- validates request body
- simulates `setParticipantAuthorization`
- submits transaction through relayer wallet

#### `POST /api/registry/lock`

Purpose:

- accept a signed sovereign registry lock payload
- mint credits on-chain using `mintCarbonCredit`

Security:

- validates `X-Registry-Signature`
- validates payload via `RegistryMetadataSchema`

Behavior:

- transforms inbound metadata into contract struct shape
- sets `status = 2` (`Issued`)
- sets `correspondingAdjustmentFinalized = false`
- calls `mintFromRegistry()`
- logs a security audit action

#### `POST /api/registry/lock/test`

Development helper that posts a built-in mock payload to `http://localhost:3000/api/registry/lock`.

This is environment-specific and assumes the app is running locally on port `3000`.

### CAD Trust

#### `GET /api/registry/cad-trust/status`

Returns mock global/network status values.

#### `POST /api/registry/cad-trust/sync`

Simulates lifecycle synchronization and returns:

- synchronization status
- generated GIN-like ID
- gateway name
- timestamp
- metadata hash
- lifecycle event

No real outbound API call is made.

### Market

#### `POST /api/market/rfq`

Accepts RFQ submissions with fields such as:

- buyer
- project ID
- amount
- target price
- purpose

Current behavior:

- minimal validation only
- generates a pseudo-random RFQ ID
- no persistence
- no workflow engine, notification, or CRM integration

### Retirement

#### `POST /api/retire/verify`

Purpose:

- verify a retirement transaction receipt
- locate a `CarbonRetired` event
- generate a certificate object

Behavior:

- waits for transaction receipt
- rejects reverted transactions
- scans logs from the configured registry address
- decodes `CarbonRetired`
- calls `generateImpactCertificate()`
- patches amount and beneficiary from event data

## 8. End-to-End Flows

### Flow A: Registry Lock to On-Chain Mint

1. External caller signs JSON payload with shared HMAC secret.
2. Caller posts payload to `POST /api/registry/lock`.
3. Route verifies signature and schema.
4. Route converts payload into `ProjectMetadata` contract struct.
5. `src/lib/blockchain.ts` simulates and submits `mintCarbonCredit`.
6. Transaction hash and receipt metadata are returned.

Assumption:

- the relayer account is the contract owner

This is not validated at startup.

### Flow B: Admin Whitelist Update

1. Admin page loads and fetches `/api/registry/participants`.
2. User submits an address or toggles an existing participant.
3. Client calls `updateParticipantAuthorization()` server action.
4. Server action simulates and writes `setParticipantAuthorization`.
5. UI waits, then refreshes participant list.

Limitation:

- there is no authentication or role check in the code

### Flow C: Retirement Verification

1. User retires credits from `/retire` using connected wallet.
2. UI waits for tx confirmation.
3. UI posts `txHash` to `POST /api/retire/verify`.
4. Route scans receipt logs for `CarbonRetired`.
5. Certificate object is generated and returned.

Limitation:

- certificate generation is only partially event-derived

### Flow D: Simulator

1. `/simulator` builds a payload string.
2. `generateTestSignature()` signs it with HMAC.
3. The UI submits payload plus signature to `/api/registry/lock`.
4. This lets developers test the sovereign lock-to-mint flow locally.

## 9. Environment Variables

Copy `.env.example` to `.env.local`.

### Required for normal startup

- `NEXT_PUBLIC_RPC_URL`
  - Polygon Amoy RPC URL
  - used by server public client and wallet provider transport
- `NEXT_PUBLIC_RAINBOW_PROJECT_ID`
  - WalletConnect project ID
- `NEXT_PUBLIC_REGISTRY_ADDRESS`
  - registry contract address used by server-side write flows and client reads

### Required for server-side write flows

- `PRIV_KEY`
  - relayer private key
  - must correspond to an account able to execute owner-only contract functions

### Required for signed registry bridge flows

- `REGISTRY_BRIDGE_AUTH`
  - shared HMAC secret for lock and participant API calls

### Present in `.env.example` but not materially used in current code

- `NEXT_PUBLIC_RPC_URL_MAINNET`
  - used only in wallet provider transport config for Polygon mainnet
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_CAD_TRUST_API_URL`
- `CAD_TRUST_AUTH_TOKEN`
- `NEXT_PUBLIC_VERCEL_ENV`
- `NEXT_PUBLIC_ENABLE_ANALYTICS`
- `VULN_AUDIT_NOTIF_EMAIL`

### Security note

If `REGISTRY_BRIDGE_AUTH` is missing, `src/lib/security.ts` falls back to:

```text
test-lock-token-2026
```

That is acceptable only for local development and should be treated as insecure outside a test environment.

## 10. Local Development

### Prerequisites

- Node.js 20+
- npm 10+
- access to a Polygon-compatible RPC endpoint
- WalletConnect project ID
- deployed `HimalayaCarbonRegistry` contract if you want real blockchain flows

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

Then open `http://localhost:3000`.

### Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

There is no `test` script and no contract-specific script in `package.json`.

## 11. Deployment Notes

The repository contains app code and contracts, but it is not a full deployment system.

For a functional deployment you would still need:

- deployed contracts
- owner/relayer key management
- environment-specific RPC configuration
- production auth for admin operations
- persistence for RFQs, audit logs, and certificates
- operational monitoring
- secure secret management
- contract ownership verification during boot or health checks

## 12. Known Gaps and Risks

- No authentication for `/dashboard/admin`
- No session/role enforcement in `updateParticipantAuthorization()`
- Some APIs return mock or hard-coded data while presenting live-system terminology
- Participant list API is not sourced from chain state
- Transparency page mixes mock API values with live contract reads and hard-coded issuance numbers
- HMAC secret has an insecure fallback
- Contract and frontend can drift if `src/constants/index.ts` and env-based addresses differ
- Retirement certificate generation is only partially tied to decoded on-chain event data
- RFQs are not persisted and IDs are not guaranteed unique
- No automated tests
- No contract compile/deploy/test tooling declared in the npm scripts
- Relayer ownership assumptions are implicit, not verified

## 13. Recommended Production Hardening

- add authentication and authorization for admin surfaces
- remove the default HMAC secret fallback
- add a real datastore for RFQs, audit trails, participants, and certificates
- derive all transparency metrics from verifiable state
- validate contract ownership and chain configuration on startup
- add contract build/deploy/test tooling
- add unit, integration, and end-to-end tests
- replace mock CAD Trust and registry adapters with real service clients
- unify registry address configuration into a single source of truth

## 14. Companion Documents

The repo already includes additional documentation:

- [ARCHITECTURE.md](/D:/My%20Files/Projects/himalaya-carbon-exchnage-blockchain/ARCHITECTURE.md)
- [API.md](/D:/My%20Files/Projects/himalaya-carbon-exchnage-blockchain/API.md)
- [DOCSTRINGS.md](/D:/My%20Files/Projects/himalaya-carbon-exchnage-blockchain/DOCSTRINGS.md)
- [docs/implementation_report_mar_2026.md](/D:/My%20Files/Projects/himalaya-carbon-exchnage-blockchain/docs/implementation_report_mar_2026.md)
- [docs/dashboard_overview.md](/D:/My%20Files/Projects/himalaya-carbon-exchnage-blockchain/docs/dashboard_overview.md)

This README should be treated as the top-level technical source of truth for setup, architecture, runtime behavior, and current implementation limits.
