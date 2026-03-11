# Architecture

## High-Level Overview

This codebase is a monorepo-style Next.js application with embedded Solidity contracts.

- The frontend is implemented with Next.js App Router under `src/app/`.
- The application exposes API routes under `src/app/api/`.
- Wallet access is configured in `src/components/Providers.tsx` using Wagmi, RainbowKit, and React Query.
- Blockchain reads and server-side writes are implemented with `viem` in `src/lib/blockchain.ts`.
- Contracts under `contracts/` model the on-chain registry and pooled liquidity primitives.

The system currently behaves as a prototype:

- UI pages mostly render static or mock content.
- Several API endpoints return mock responses.
- Some routes initiate real blockchain interactions if environment variables are present.
- External systems such as the national registry and CAD Trust are simulated rather than integrated.

## Folder and Module Responsibilities

### Application

- `src/app/layout.tsx`: root layout and provider wiring
- `src/app/page.tsx`: marketing-style landing page
- `src/app/marketplace/page.tsx`: marketplace UI with local mock inventory and RFQ submission modal
- `src/app/dashboard/page.tsx`: dashboard UI with static compliance and liquidity content
- `src/app/dashboard/admin/page.tsx`: admin UI for participant whitelist management; reads `/api/registry/participants` and invokes a server action for updates
- `src/app/retire/page.tsx`: retirement UI; writes directly to the registry contract from the browser and then calls `/api/retire/verify`
- `src/app/simulator/page.tsx`: UI to generate a signed payload and submit it to `/api/registry/lock`
- `src/app/transparency/page.tsx`: proof-of-reserve style UI; mixes one API call, one on-chain read, and hard-coded issuance numbers
- `src/app/projects/[id]/page.tsx`: project detail page backed entirely by route-parameter-derived mock data

### API Routes

- `src/app/api/registry/status/route.ts`: mock registry status data
- `src/app/api/registry/participants/route.ts`: mock participant listing and signed participant authorization write path
- `src/app/api/registry/lock/route.ts`: signed minting bridge from registry payload to contract write
- `src/app/api/registry/lock/test/route.ts`: local simulator that posts a signed mock payload to the lock endpoint
- `src/app/api/registry/cad-trust/status/route.ts`: mock CAD Trust status
- `src/app/api/registry/cad-trust/sync/route.ts`: simulated CAD Trust lifecycle sync response
- `src/app/api/market/rfq/route.ts`: RFQ intake endpoint with generated reference ID
- `src/app/api/retire/verify/route.ts`: on-chain receipt inspection and certificate generation

### Server Actions

- `src/app/actions/sovereign.ts`: server action for whitelist updates without client-side HMAC signing
- `src/app/actions/simulate.ts`: server action that returns an HMAC signature for simulator payloads

### Shared Libraries

- `src/lib/blockchain.ts`: `viem` public/wallet clients and registry mint helper
- `src/lib/security.ts`: payload schema, HMAC verification/signing, audit logging
- `src/lib/certificates.ts`: retirement certificate generation from blockchain state
- `src/lib/dex.ts`: swap and liquidity helper stubs; not wired into active routes

### Contracts

- `contracts/HimalayaCarbonRegistry.sol`: ERC-1155 registry with project metadata, whitelisting, minting, Article 6 fields, and retirement
- `contracts/CarbonPool.sol`: ERC-20 wrapper around eligible registry assets
- `contracts/CarbonPoolFactory.sol`: owner-only factory for pool deployment

### Supporting Assets

- `src/constants/index.ts`: registry ABI, placeholder registry address, status labels
- `public/`: images and static PDFs
- `docs/`: internal project notes; several statements there exceed what the code currently guarantees

## Request and Data Flow

### 1. Registry lock to on-chain mint

1. A caller sends `POST /api/registry/lock` with JSON matching `RegistryMetadataSchema`.
2. The route verifies `X-Registry-Signature` via `HimalayaSecurity.verifyRegistrySignature`.
3. The route transforms request metadata into the Solidity `ProjectMetadata` shape.
4. `mintFromRegistry()` simulates and submits `mintCarbonCredit` through the relayer wallet.
5. The API responds with transaction metadata if submission and receipt confirmation succeed.

`needs verification`: this flow assumes the relayer private key controls the registry contract owner account. There is no startup-time ownership check.

### 2. Participant authorization

Two write paths exist:

- `POST /api/registry/participants`: requires HMAC signature and updates authorization via the registry contract
- `updateParticipantAuthorization()` server action: called from `/dashboard/admin`, does not perform user/session authorization checks

`needs verification`: the admin page is presented as restricted, but there is no implemented authentication or authorization layer in the repository.

### 3. Credit retirement and certificate generation

1. `/retire` calls the registry contract `retire` function directly from the connected wallet.
2. After the transaction confirms in the browser, the page posts the hash to `POST /api/retire/verify`.
3. The route waits for the receipt, searches logs for `CarbonRetired`, and calls `generateImpactCertificate`.
4. The route patches amount and beneficiary onto the returned certificate and responds with the final object.

`needs verification`: `generateImpactCertificate()` hard-codes `projectId = 1` instead of extracting it from logs, so certificate project metadata may not match the retired token ID.

### 4. Transparency dashboard

1. `/transparency` fetches `/api/registry/status` for off-chain locked-unit counts.
2. It reads `getProjectCount` from the registry contract via Wagmi.
3. It compares a hard-coded `onChainIssued` value to the API response and displays a reserve ratio.

`needs verification`: reserve calculations are not derived from live token supply.

### 5. Marketplace RFQ

1. Marketplace modal posts buyer/project/amount/purpose to `POST /api/market/rfq`.
2. The route performs minimal presence checks and returns a generated `rfqId`.
3. No persistence, queueing, or notification mechanism exists.

## External Integrations

### Blockchain

- Polygon Amoy is hard-coded in `src/lib/blockchain.ts`.
- Client wallet providers are configured for Polygon and Polygon Amoy.
- The app relies on a deployed registry contract address passed through environment variables or the placeholder constant.

### Wallet and Query Stack

- RainbowKit
- Wagmi
- TanStack React Query

### Simulated Integrations

- National registry bridge via signed webhook payloads
- CAD Trust lifecycle sync and status monitoring
- Uniswap-related swap/liquidity helpers in `src/lib/dex.ts`

None of the above simulated integrations currently make outbound network calls to the named third-party services.

## Important Design Decisions

- Next.js App Router is used for both UI and HTTP endpoints, keeping route handlers in the same codebase as the frontend.
- `viem` is used instead of `ethers` for client and server blockchain interactions.
- Registry bridge calls are protected with HMAC signatures and a shared secret.
- The registry contract uses ERC-1155 to represent multiple project vintages in one contract.
- Transfer restrictions are enforced in the registry contract by requiring recipient whitelist membership for non-mint/non-burn transfers.
- The admin dashboard uses a server action for writes, which avoids exposing relayer configuration to the browser.

## Known Risks and Technical Debt

- Authentication is not implemented for `/dashboard/admin` or the `updateParticipantAuthorization` server action.
- Several API endpoints return mock data while using production-oriented names such as "authoritative", "live", or "healthy".
- `src/lib/security.ts` contains a default shared secret fallback.
- `src/lib/certificates.ts` generates certificate data with partial mock values:
  - hard-coded project ID
  - random CAD sync ID
  - placeholder sovereign signature
  - amount and beneficiary filled in later by the route
- `src/constants/index.ts` contains a placeholder registry address, while server code also reads the address from environment variables. This split source of truth can cause frontend and backend to target different contracts.
- Contract ownership assumptions are implicit. The relayer key is expected to be the contract owner for minting and whitelist changes.
- No persistence layer exists for RFQs, audit logs, participant lists, or certificate records.
- No automated tests are configured in `package.json`.
- No contract build/deploy/test tooling is configured in this repository, despite references in older project docs.
- The transparency dashboard mixes live reads, mock API values, and hard-coded figures in a single calculation.
