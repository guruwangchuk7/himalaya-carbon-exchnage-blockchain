# Himalaya Carbon Exchange (HCE) Documentation

Welcome to the technical documentation for the **Himalaya Carbon Exchange (HCE)**, a prototype sovereign carbon market infrastructure designed for the Kingdom of Bhutan.

This repository implements a **two-sided market prototype** bridging the National Carbon Registry (NCRC) with institutional buyers, utilizing a Next.js frontend, Prisma/MySQL database, and Polygon smart contracts.

---

## 📑 Table of Contents
1. **[Core Architecture](./ARCHITECTURE.md)**
2. **[Setup & Installation](./SETUP_GUIDE.md)**
3. **[Running Locally](./RUN_GUIDE.md)**
4. **[Dashboard Overview](./dashboard_overview.md)**
5. **[Smart Contracts](./SMART_CONTRACTS.md)**
6. **[API Reference](./API.md)**
7. **[Database & Backend Sync](./SYNC_ENGINE.md)**
8. **[Developer Workflow](./DEVELOPER_GUIDE.md)**
9. **[Testing Procedures](./TESTING.md)**
10. **[Harmony Watcher (CAD Trust)](./HARMONY.md)**

---

## 1. Introduction

The HCE platform acts as a web portal for **Sovereign Admins (Issuers)** and **Institutional Buyers**, enabling the simulated issuance, acquisition, and retirement of Article 6.2 carbon credits. 

> **Important Note:** The "Seller" role has been entirely consolidated into the "Government Admin" role, as the sovereign state acts natively as the primary issuer and supplier.

### Current Implementation Status (March 2026)

| Feature Component | Status | Reality Check / Implementation Details |
| :--- | :--- | :--- |
| **Prisma DB Architecture** | ✅ Operational | Fully relational MySQL structure with cascading limits and explicit type-mapping. |
| **NCRC Registry Lock** | ✅ Operational | `api/registry/lock` endpoint validates HMAC signatures and mints via Viem relayer. |
| **Sovereign Admin Panel** | ✅ Operational | Securely hosted at `/admin/dashboard`, merging registry oversight and simulators. |
| **Buyer Marketplace** | ✅ Operational | Users query `RegistryProject` via Prisma and acquire via `initiateAcquisition`. |
| **Retirement Flow** | ⚠️ Partial Prototype | Writes to off-chain DB effectively (`Certificate` table), mapping to a mocked on-chain verification hash. |
| **CAD Trust Harmony** | ⛔ Mock / Demo | Currently uses `setTimeout` delays and generates fake strings (`BT-XXXX`). Not connected to external nodes. |
| **OAuth / Session Management** | ⚠️ Partial Prototype | Bypassed easily for dev (`?bypass=admin`). Supabase logic exists but is often sidestepped for rapid demonstration testing. |

---

## 🛠️ Tech Stack

### Frontend & Routing
- **Next.js 15.1** (App Router)
- **Tailwind CSS v4** & **Framer Motion** (UI)

### Database & Security
- **Prisma ORM** (MySQL mapping engine)
- **Supabase** (Auth provider mapping strictly linked to off-chain Profiles).
- **HMAC-SHA256 Profiles** (Sovereign webhook verification).

### Blockchain
- **Viem** (Relayer client for Node executing Smart Contracts).
- **Solidity** (Core EVM contract logic in `/contracts`).

---

## 📂 Project Structure

```text
.
├── contracts/          # Solidity Smart Contracts
├── docs/               # Technical Documentation (You are here)
├── prisma/             # Schema & Relationships generated into .prisma/client
├── public/             # Static Assets & Images
├── src/
│   ├── app/            # Next.js Pages (Admin, Buyer, API Routes)
│   ├── components/     # UI Component Library
│   └── lib/            # Server Actions (market.ts, registry.ts, sync.ts)
```

---

> [!WARNING]
> This repository contains aggressively mocked integration stubs (e.g. `syncCADTrust` in `registry.ts`). Do not deploy this to production without isolating and establishing real networking for the mocked endpoints.
