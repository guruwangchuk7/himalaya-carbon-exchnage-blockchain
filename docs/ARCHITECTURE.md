# System Architecture

The Himalaya Carbon Exchange (HCE) follows a **Sovereign Transparency Architecture**. This design ensures that while carbon credits are traded on a decentralized public blockchain (Polygon), the **Sovereign Control** remains with the National Carbon Registry of Bhutan (NCRC).

---

## 🏗️ Technical Blueprint

### 1. Hybrid Market Layer
HCE does not implement a registry from scratch. Instead, it serves as a **Protocol Mirror**.
-   **NCRC (Off-Chain)**: The authoritative database of carbon projects and serial numbers.
-   **HCE (On-Chain)**: A cryptographic representation of NCRC units as ERC-1155 tokens.
-   **Synchronization**: Handled via HMAC-signed webhooks and the **Sovereign Sync Engine**.

### 2. The Multi-Chain Ledger
-   **Polygon Amoy/Mainnet**: Used for project issuance, decentralized trading, and retirement.
-   **Sovereign Relayer**: A secure execution environment in `src/lib/blockchain.ts` that acts as the only entity authorized to "Bridge" credits from the physical registry to the blockchain.

---

## 🧩 Core Modules

### 🛰️ The Harmony Watcher (`scripts/harmony-watcher.ts`)
The "Heartbeat" of the global integration. It listens for `CarbonRetired` events on the blockchain and automatically pushes a structured Article 6.2 payload to the **CAD Trust Metadata Layer**.

### 🔄 The Sync Engine (`src/lib/sync.ts`)
Periodically pulls project metadata from the NCRC smart contract and upserts it into the **Supabase (Prisma)** database. This enables:
-   Instant search and filtering in the Marketplace.
-   High-performance analytics on the Dashboard.
-   Redundancy between on-chain state and off-chain metadata.

### 🛡️ Sovereign Bridge Security (`src/lib/security.ts`)
Implements HMAC-SHA256 signature verification. All minting requests from the NCRC must be signed with a shared-secret (or NDI-derived key in production) before the HCE Relayer will process them.

---

## 📦 Data Models

### On-Chain: `HimalayaCarbonRegistry.sol`
Stores the "Minimum Viable Metadata" for Article 6.2 compliance:
-   `vintageYear`: Tracking the year of sequestration.
-   `isArticle6Authorized`: Boolean flag for ITMO eligibility.
-   `correspondingAdjustment`: Status of bilateral settlement.
-   `methodology`: The carbon accounting standard used.

### Off-Chain: `schema.prisma`
Enriches the on-chain data with user-friendly information:
-   Full project descriptions and images.
-   Co-benefit tags (SDGs).
-   RFQ (Request for Quote) history.
-   Sovereign audit trails.

---

## 📈 Request Flows

### A. The "Lock-and-Mint" Flow
1.  NCRC signals a credit lock via a `POST /api/registry/lock` webhook.
2.  HCE verifies the HMAC signature.
3.  The **Relayer** mints the corresponding ERC-1155 tokens to the project developer's wallet.
4.  The action is logged in the **Sovereign Audit Trail**.

### B. The "Retire-and-Sync" Flow
1.  A user calls `retire()` on the smart contract.
2.  The **Harmony Watcher** detects the event.
3.  The Watcher calls the **CAD Trust API** to record the global retirement.
4.  The system generates a uniquely hash-linked **Retirement Certificate**.

---

## ⚖️ Governance & Compliance

-   **Transfer Whitelisting**: The registry contract restricts credit transfers to `AuthorizedParticipants`. This ensures that carbon credits only move through institutional entities that have completed national KYB (Know Your Business).
-   **Article 6.2 ITMOs**: The platform provides native fields for `ItmoAuthorizationID`, ensuring that every bilateral trade between Bhutan and another country is verifiable at the protocol level.
