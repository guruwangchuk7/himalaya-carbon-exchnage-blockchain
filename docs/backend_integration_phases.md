# Himalaya Carbon Exchange: Backend Integration Phases

This document outlines the phased implementation plan for migrating the Himalaya Carbon Exchange from a prototype to a production-grade full-stack architecture using **Supabase (PostgreSQL)**.

## 🏗️ Production Stack Architecture
*   **Frontend**: Next.js (App Router) + React + Tailwind
*   **Backend / APIs**: Next.js Server Actions & API Routes + Supabase Edge Functions (if needed)
*   **Database**: Supabase (PostgreSQL)
*   **Database ORM**: Prisma or Drizzle
*   **Authentication**: Supabase Auth + SIWE (Sign-In with Ethereum)
*   **Web3 Indexing**: Viem (cron jobs or event listeners syncing to Postgres)

---

## 📍 Phase 1: Foundation & Secure Environment
**Goal:** Establish the database, authentication, and secure backend routing.

*   **API Secrets & Third-Party Integrations:**
    *   *Problem:* Integrating with National Registry Bridge and CAD Trust requires securing HMAC secrets and API keys away from the frontend.
    *   *Implementation:* Set up dedicated Next.js API Routes to securely hold environment variables. This backend receives webhooks from the National Registry, validates the HMAC cryptographic signature, and safely signs the transaction to execute `mintCarbonCredit()` on-chain.
*   **Authentication Hub (Supabase Auth):**
    *   Integrate SIWE (Sign-In with Ethereum) to securely map user wallets to database sessions.
    *   Setup traditional email/SSO login for web2 users (e.g., government auditors, registry officials).

## 📍 Phase 2: Compliance, Identity & Workflows
**Goal:** Move sensitive data and multi-step processes off-chain to ensure privacy law compliance and better UX.

*   **Privacy, KYC, and Institutional Data:**
    *   *Problem:* Sovereign exchanges cannot place private corporate data (KYC, Government IDs) on a blockchain due to privacy laws.
    *   *Implementation:* Create a secure, encrypted schema in Supabase. The smart contract only retains the wallet address and authorization status (`isAuthorized = true`). The Postgres database maps the address (`0x123...`) to the institutional profile (e.g., "Bhutan Power Corp"), along with contact persons and uploaded compliance PDFs.
*   **Application State & Draft Workflows:**
    *   *Problem:* Carbon issuance involves multi-day workflows (document upload, audit approval, government sign-off) that do not belong on-chain.
    *   *Implementation:* Track project states (`Draft` -> `Under Audit` -> `Approved`) in Supabase. Only when the status reaches "Approved" does the Next.js backend trigger the blockchain to physically mint the tokens.

## 📍 Phase 3: Web3 Indexing & Market Discovery
**Goal:** Drastically improve UI read performance and enable complex filtering without incurring high RPC node request limits.

*   **The "Indexer" and Read Performance (Caching):**
    *   *Problem:* Blockchain nodes are slow for queries like filtering the `/marketplace` by "Reforestation", "Vintage 2023", and "Volume > 10,000".
    *   *Implementation:* Build a backend indexer script using Viem that listens to smart contract events (like `CarbonMinted`). This script continually saves the blockchain data into Supabase (PostgreSQL). The frontend then queries the fast Postgres DB to render the UI instantly.

## 📍 Phase 4: Off-Chain Trading Engine
**Goal:** Eliminate unnecessary gas fees for market discovery and intent-to-trade actions.

*   **The RFQ System and Market Order Books:**
    *   *Problem:* Putting every bid, ask, or Request for Quote (RFQ) on-chain forces users to pay network fees just to post an intent to buy.
    *   *Implementation:* Build an off-chain order book and RFQ database in Supabase. Institutional buyers submit bids to the database. Only when the buyer and seller agree and match their orders off-chain does the backend construct the transaction for final settlement on the blockchain.

---

**Summary:** The smart contract handles **Settlement, Ownership, and Scarcity**. The Supabase Database handles **Discovery, User Profiles, Privacy, and Speed**.
