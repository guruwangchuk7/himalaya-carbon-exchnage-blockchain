# Himalaya Carbon Exchange - Platform Documentation

## 1. Executive Summary
The Himalaya Carbon Exchange is a digital sovereign carbon market platform designed to tokenize, trace, and trade national carbon assets. Built with a focus on Article 6.2 compliance and integration with global metadata layers (like CAD Trust), the platform serves as a vital infrastructure bridge between national registries and international carbon markets. Primarily, it aims to prevent double-counting of carbon credits through transparent, on-chain tracking and robust database state management. In its current iteration, it serves as a powerful demonstration of how institutional buyers can acquire and retire sovereign-backed carbon credits with full cryptographic traceability.

## 2. Demo Purpose and Scope
**MANDATORY DISCLAIMER:**
- This platform is a demo/prototype and not a live production carbon exchange.
- Any carbon credit assets, project entries, token balances, retirement flows, and certificates shown in the system are mock, simulated, or demonstration-based unless backed by verified external registries.
- The system should not be interpreted as issuing legally recognized carbon credits in its current form.
- No real climate claim, offset claim, or emissions reduction claim should be made based on this demo alone.
- Real deployment would require verified registry data, legal compliance, regulatory approval, authenticated MRV systems, and real payment/integration infrastructure.

**Current Scope:**
The platform showcases a complete user journey from viewing Article 6 compliant assets to mock purchasing and retirement. While the smart contract foundations (ERC1155) and database schema are built for real interaction, many of the active workflows—such as CAD Trust synchronization, payment settlement, and live smart-contract retirements—are simulated to provide a seamless presentation experience without requiring live mainnet funds or real-time external API responses.

## 3. Codebase-Derived System Overview
Based on the codebase structure, the architecture relies on a modern Next.js 14 server-client model tightly coupled with a PostgreSQL/MySQL database (via Prisma) and an EVM-compatible blockchain layer (Polygon Amoy / Hardhat).
- **Frontend Layer**: A React-based interface utilizing Tailwind CSS and Framer Motion for premium, dynamic dashboards.
- **Backend / API Layer**: Next.js Server Actions manage database transactions, mock user sessions during development, and mock blockchain interactions.
- **Data Layer**: A relational database tracking Profiles, Projects, Certificates, User Balances, and RFQs (Requests for Quote), acting as an ultra-fast indexer for off-chain queries.
- **Blockchain Layer**: An ERC1155-based `HimalayaCarbonRegistry` smart contract deployed to manage the canonical state of project vintages, Article 6 authorizations, and unit retirements.

## 4. Codebase-Derived Technology Stack
The actual stack evidenced in `package.json`, `hardhat.config.js`, and `schema.prisma` is:
- **Frontend Framework**: Next.js (v16.1.6) / React (19.2.3)
- **Styling & UI**: Tailwind CSS 4, Framer Motion, Lucide React, clsx, tailwind-merge
- **Backend Runtime**: Node.js via Next.js server context
- **Database / ORM**: Prisma ORM (`@prisma/client` 7.5.0) configured for `mysql` (via schema) and `pg` / `mariadb` adapters.
- **Authentication**: Supabase Auth (`@supabase/ssr` / `@supabase/supabase-js`)
- **Blockchain Tech**: Hardhat (Solidity 0.8.26), viem (2.47.1), wagmi, RainbowKit, OpenZeppelin Contracts (v5.6.1). Target networks: Polygon Amoy and Hardhat Localhost.
- **State Management**: React Hooks and server-injected state.

## 5. User Roles and Access Model
The Prisma schema defines the following core roles:
- **TRADER**: The default role for institutional buyers or standard users. They can view the marketplace, submit RFQs, acquire assets, and retire credits.
- **OPERATOR**: Implied as an administrative or sovereign registry role responsible for overseeing the platform and managing project states.
- **AUDITOR**: Implied as a verification body, likely meant to interact with project states (e.g., `UNDER_AUDIT` to `APPROVED`).

*Note on Access Control*: In the current codebase implementation (`src/lib/actions/market.ts`), if the environment is set to `development`, the system automatically provisions and bypasses authentication with a mock "Institutional Test Organization" profile ID (`00000000...`) to facilitate seamless demoing without forced logins.

## 6. Dashboard Documentation (DETAILED)

### 6.1 Registry Dashboard (`/dashboard`)
**Purpose**: Acts as the central command center for tracking registry synchronization, Article 6 compliance, and user asset portfolios. Best suited for the institutional buyer/trader to visualize their holdings.
- **Main Sections/Widgets**: 
  - Summary Statistics (Total Issuance, A6 Authorized, Sync Status, Active Vintages).
  - Registry-Market Synchronization Table (projects waiting for or holding signature authorizations).
  - CAD Trust Metadata Harmony feed (shows mock synchronization logs).
  - "My Asset Portfolio" card.
- **Features Available**:
  - Simulating an Article 6.2 authorization handshake (displays loader and transitions state to VERIFIED).
  - Syncing Global State (triggers mock CAD Trust syncing feed).
  - Viewing existing portfolio balances directly pulled from the database `UserBalance` table.
- **Production Deployment Additions Required**: 
  - Real integration with National Registry APIs to populate the project list securely.
  - Real cryptographic signature checks for the authorization handshake instead of `setTimeout` delays.

### 6.2 Carbon Marketplace (`/marketplace`)
**Purpose**: A public-facing storefront for acquiring authorized sovereign carbon units.
- **Main Sections/Widgets**: 
  - A hero section.
  - A dynamic project catalog (`MarketplaceClient`) mapping over available database projects alongside pre-defined mock fallbacks (e.g., "Wangdue Hydropower Offset").
  - Sovereign Price Feed UI widget showing a mock aggregated index.
- **Features Available**:
  - Viewing specific project details (vintage, available volume, price).
  - Initiating an acquisition workflow (updates DB `UserBalance` and decrements `RegistryProject.totalVolume`).
- **Production Deployment Additions Required**:
  - Real-time pricing or order-book matching engines.
  - Fiat/crypto payment gateways (Stripe, USDC settlement) to back the asset transfer. Currently, acquisition is a pure database mutation without real fund transfer.
  - Automated KYC/AML checks before allowing an acquisition transaction.

### 6.3 Retirement Page (`/retire`)
**Purpose**: Allows users to permanently remove credits from the active supply, generating a cryptographic proof of impact.
- **Main Sections/Widgets**: 
  - Institutional summary bar (balance, organization name).
  - "Select Asset to Retire" listing portfolio items.
  - "Retirement Details" form (Amount, Beneficiary Name, Reason).
  - Live CAD Trust Status info panel.
- **Features Available**:
  - Submitting a retirement request. Upon success, displays a UI certificate with a mock transaction hash and CAD Sync ID.
- **Production Deployment Additions Required**:
  - True on-chain smart contract integration. Currently, `market.ts` bypasses the `blockchain.ts` contract calls and creates a mock `0x...` hash and updates the DB state directly.
  - Verifiable digital signatures for the final certificate PDF.
  - Irreversible multi-sig or sovereign enforcement to ensure real-world metadata matches the burned tokens.

## 7. Detailed Feature Documentation

### 7.1 Authentication and Login
- **Current State**: Handled via Supabase SSR. However, extensive developer bypasses are written into the codebase (`process.env.NODE_ENV === 'development'`) to automatically mock the user session. Wallet connection exists via `wagmi` and `RainbowKit`.
- **Production Requirements**: Enforcement of Supabase sessions, linking specific wallet addresses tightly to verified Profiles via KYC/AML checks, and MFA implementation. 

### 7.2 Project Upload / Project Registration
- **Current State**: The schema supports `RegistryProject` with fields like `methodology`, `vintageYear`, `totalVolume`, and `status`. The database syncs from the smart contract (`sync.ts`), relying on the contract's `getProjectIds`. 
- **Production Requirements**: A dedicated administrative UI for operators to upload documentation, geospatial MRV data, and methodology reports for validation prior to on-chain issuance.

### 7.3 Asset Creation / Carbon Credit Record Creation
- **Current State**: Smart contract handles creation via `mintCarbonCredit`. Metadata struct includes `unitBatchID`, `vintageYear`, `isArticle6Authorized`, etc.
- **Production Requirements**: API connections to national climate ministries for authoritative and legally binding serial batch creation to prevent double-issuance.

### 7.4 Minting Flow
- **Current State**: `blockchain.ts` provides a `mintFromRegistry` function wrapper calling the `HimalayaCarbonRegistry` contract using a server-side private key. This is partially implemented off-chain and requires the deployer key.
- **Production Requirements**: Role-restricted minting strictly managed by the Sovereign entity (e.g., physical hardware wallets or enterprise HSMs), not stored as an environment variable (`PRIV_KEY`).

### 7.5 Marketplace / Listing Flow
- **Current State**: Auto-lists projects existing in the internal Database. A fallback mechanism populates missing UI projects if the database is empty.
- **Production Requirements**: Dynamic pricing Oracles, registry sync for exact real-time balances to prevent front-running, and tax/fee structures.

### 7.6 Purchase Flow
- **Current State**: Accomplished via the `initiateAcquisition` server action. It is simulated: it updates the user's base `UserBalance` and decrements the project's `totalVolume` in a Prisma transaction, alongside an AuditLog entry. No actual financial payment or on-chain transfer occurs.
- **Production Requirements**: Fiat or crypto escrow integration. The actual token transfer (ERC1155 `safeTransferFrom`) must be executed on-chain after payment confirmation.

### 7.7 Retirement Flow
- **Current State**: The `retireCredits` server action decreases the DB `UserBalance` and creates an `AuditLog` and a `Certificate` record with a randomly generated hash. The actual ERC1155 `retire` function exists in the smart contract but is bypassed by the UI for demonstration smoothness.
- **Production Requirements**: Must strictly call the on-chain `retire` function, listen for the `CarbonRetired` event, and *then* issue the off-chain certificate based on the actual mined transaction.

### 7.8 Certificate Generation
- **Current State**: Handled through UI generation post-retirement. The `certificates.ts` file outlines an `ImpactCertificate` structure, but properties like signatures are mocked (`SIGNED_BY_HIMALAYA_CARBON_ENGINE`).
- **Production Requirements**: Trusted robust PDF generation endpoints embedding true cryptographic signatures tying the recipient's identity to the exact retired blockchain token hash.

### 7.9 Analytics and Reporting
- **Current State**: Visualized on dashboards via static mapping and database sums (e.g. `getReserveStats` in `market.ts`). Transparency logs use real DB data supplemented by hardcoded fallbacks if empty.
- **Production Requirements**: Event-driven indexing architectures (like The Graph), BI exports (CSV/PDF), and real-time public reconciliation dashboards proving 1:1 token matching.

## 8. End-to-End User Flows

### 8.1 Organization / Project Developer Flow
- **Prototype Flow**: Not fully implemented in the UI. Implicitly managed via DB seeding or smart contract deployments.
- **Production Additions**: A dedicated portal to submit documentation, request 'Authorized' status, and interact with the `AUDITOR` role.

### 8.2 Institutional Buyer Flow
- **Prototype Flow**: 
  1. Access `/dashboard` to view index.
  2. Navigate to `/marketplace` to view assets.
  3. "Simulate" acquisition immediately updating portfolio.
  4. Navigate to `/retire` and burn units to receive a certificate.
- **Production Additions**: Login verification, wallet connection enforcement, payment gateway checkpoint via Stripe/Crypto, and waiting on block confirmations.

### 8.3 Admin Flow
- **Prototype Flow**: There is an empty `/dashboard/admin` route structure, but admin capabilities are mostly constrained to smart contract ownership logic off-screen.
- **Production Additions**: A full CRM-style dashboard for `OPERATOR`s to view transaction volumes, manually review authorizations, and configure global variables.

## 9. Data Architecture
- **Models Used**:
  - `Profile`: Extends Supabase auth users with roles and organizations.
  - `RegistryProject`: Mirrored state of the on-chain asset.
  - `UserBalance`: Off-chain reflection of what the user "owns" (to avoid constant blockchain reads).
  - `Certificate`: Immutable records of retirements.
  - `AuditLog`: Action tracking for transparency.
  - `RFQ`: Request for Quote flows between buyers and projects.
- **Production Requirements**: Immutability guarantees on the `AuditLog` table (e.g., using append-only DB ledgers or external blockchain anchoring).

## 10. API/Server Actions Documentation Overview
- **Actions Found**:
  - `getMarketplaceProjects()`: Fetches projects or returns standard fallbacks.
  - `initiateAcquisition()`: Handles DB mutations for a mock purchase.
  - `retireCredits()`: Handles DB mutations and mock hash generation for burn workflows.
  - `syncProjectsToDb()`: Syncs the canonical smart contract data into PostgreSQL.
  - `getTransparencyLogs()`: Combines audit and RFQ logs.
- **Production API Requirements**: Webhooks for incoming payments, robust rate limiting, and authentic REST/GraphQL interfaces for third-party verifiers.

## 11. Smart Contract / Blockchain Overview
- **Implementation**: A single core contract `HimalayaCarbonRegistry.sol`.
- **Logic**: Built on OpenZeppelin `ERC1155` and `ERC1155Supply`. 
  - Restricts transfers via a whitelist: `authorizedParticipants`. Only vetted institutions can hold tokens.
  - Tracks specific Article 6 metadata natively on-chain, such as `itmoAuthorizationID` and `correspondingAdjustmentFinalized`.
- **Status**: It is designed for Polygon Amoy (testnet). 
- **Production Blockchain Requirements**: Formal smart contract security audits, upgradeability paths (Proxy patterns), and deployment to a Mainnet (e.g., Polygon POS or a sovereign app-chain). 

## 12. Real-World Integrations Required for Production
1. **Government Carbon Registry API**: Needed to inherently trust the source of truth for volume and project inception, rather than manually seeding the DB.
2. **CAD Trust Node**: `harmony.ts` explicitly simulates the CAD Trust connection using delays. A real production system requires an explicit API bridge to push `CarbonRetired` events to the global meta-registry.
3. **Payment Gateways**: Traditional banking rails (Stripe/Swift) or Stablecoin escrows (USDC) are strictly missing.
4. **KYC/AML Providers**: Identifiers like Sumsub or similar to verify institutional buyers before granting them the `TRADER` role or on-chain whitelist status.

## 13. Demo Limitations and Non-Production Gaps
- **Mock Purchases**: "Buying" a credit is currently a simulated database update.
- **Simulated Retirements**: Retiring a credit does not trigger a blockchain transaction in the primary user flow; it generates a mock hash to show UI completeness.
- **Authentication Bypass**: Hardcoded developer overrides exist to keep the demo smooth without requiring database setups.
- **Legal Void**: The generated "Sovereign Certificate" holds no current legal merit.

## 14. Security Review Summary
- **Current Stance**: The codebase uses robust structural frameworks (Next.js server actions, Prisma types) preventing standard SQL injections. Supabase provides baseline Auth. Smart Contracts use proven OpenZeppelin standards.
- **Identified Gaps**: 
  - Minting logic in `blockchain.ts` relies on a highly sensitive plaintext environment variable (`PRIV_KEY`) executing server-side.
  - API actions often fallback to a default mock user (`00000000-00...`) if `NODE_ENV === 'development'`, which is standard for demos but highly risky if accidentally deployed to production.
  - No signature verification exists for the on-chain retirement mock flow.

## 15. Deployment and Environment Notes
- **Local Run**: Runs via `npm run dev`. Depends on `.env` containing `NEXT_PUBLIC_RPC_URL` and `NEXT_PUBLIC_REGISTRY_ADDRESS`.
- **Scripts**: A `harmony-watch` script exists in `scripts/` to run a listener that acts as a bridge between the blockchain and the CAD Trust API.
- **Production Additions Needed**: CI/CD pipelines (GitHub Actions -> Vercel/AWS), proper secret injection via KMS, database migration tracking, and failover clustering for the PostgreSQL instance.

## 16. Presentation Guide for Live Demo
- **Step 1: The Index**: Start at `/dashboard`. Explain the importance of "Registry Synchronization" and how it acts as the canonical source. Click "Sync Global State" to demonstrate the simulated CAD trust connection.
- **Step 2: The Market**: Navigate to `/marketplace`. Show the available projects. Highlight the Article 6.2 badges to emphasize government compliance.
- **Step 3: The Treasury**: Quickly mention that you've simulated a purchase, expanding your portfolio.
- **Step 4: The Impact**: Move to `/retire`. Explain that holding isn't offsetting. Go through the form, inputting "Corporate CSR" as a beneficiary. Submit to view the final, beautifully rendered certificate. Point out the "Transaction Hash" and "Sync ID" as the cryptographic anchors of trust.

## 17. Future Roadmap
1. Ensure full end-to-end integration mapping the UI directly to the Blockchain state via wallet signing (`wagmi`), stopping reliance on server-side DB mocks.
2. Integrate fiat on-ramps to allow instantaneous clearing.
3. Create the Operator Portal for seamless registry uploads.
4. Obtain formal third-party audits of the ERC1155 smart contracts before mainnet migration.

## 18. Conclusion
The Himalaya Carbon Exchange prototype successfully proves the architectural concept of a sovereign-backed, Article 6.2 compliant carbon marketplace. By prioritizing clean UI, clear indicators of compliance (like CAD Trust integration hooks), and database-driven speed, the codebase is an excellent foundation for presentations. While the financial clearing and real-world API hooks are gracefully mocked for demonstration stability, the data architecture cleanly supports swapping these mocks for production infrastructure. Once the gaps regarding payment settlement and on-chain syncing are fulfilled, it has the potential to become a robust real-world platform.
