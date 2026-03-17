# Himalaya Carbon Exchange (HCE) Documentation

Welcome to the technical documentation for the **Himalaya Carbon Exchange (HCE)**, a sovereign-grade carbon market infrastructure built for the Kingdom of Bhutan. 

This repository implements a production-ready prototype that bridges the **National Carbon Registry of Bhutan (NCRC)** with global carbon markets via the **Climate Action Data (CAD) Trust**.

---

## 📑 Table of Contents

1.  **[Introduction](#introduction)**
2.  **[Core Architecture](./ARCHITECTURE.md)**
3.  **[Setup & Installation](./SETUP_GUIDE.md)**
4.  **[Sovereign Sync Engine](./SYNC_ENGINE.md)** - *New: Real-time Registry Sync*
5.  **[Harmony Watcher](./HARMONY.md)** - *New: Global CAD Trust Bridge*
6.  **[Smart Contracts](./SMART_CONTRACTS.md)**
7.  **[API Reference](./API.md)**
8.  **[Developer Workflow](./DEVELOPER_GUIDE.md)**
9.  **[Testing & Simulation](./TESTING.md)**

---

## 1. Introduction

The Himalaya Carbon Exchange is designed to operationalize **Article 6.2 of the Paris Agreement**. It provides the cryptographic "Market Layer" that sits on top of the physical carbon registry, enabling:

-   **High-Integrity Issuance**: On-chain credits (ERC-1155) directly linked to sovereign project approvals.
-   **Article 6.2 Compliance**: Automated tracking of ITMO (Internationally Transferred Mitigation Outcomes) authorizations and Corresponding Adjustments.
-   **Global Synchronicity**: Real-time data mirroring to the CAD Trust to prevent double-counting.
-   **Fractional Liquidity**: Institutional carbon pools (ERC-20) for secondary market trading.

### Current Implementation Status (March 2026)

| Feature Component | Status | Technology |
| :--- | :--- | :--- |
| **National Registry Sync** | ✅ Operational | Prisma + Supabase + Viem |
| **Global Harmony Bridge** | ✅ Operational | Viem Event Watcher + CAD Trust v2 API |
| **Sovereign Minting Bridge** | ✅ Operational | HMAC-Signed Webhooks |
| **Marketplace & RFQ** | ✅ Functional | Next.js App Router |
| **Retirement Verification** | ✅ Operational | On-chain Log Inspection |
| **Auth & Security** | ⚠️ Prototype | HMAC / NDI-Hardening Planned |

---

## 🛠️ Tech Stack

### Frameworks & UI
-   **Next.js 15.1.6** (App Router)
-   **Tailwind CSS v4** (Modern Utility-First Styles)
-   **Framer Motion** (Micro-animations & Transitions)
-   **Lucide React** (Consistent Iconography)

### Blockchain & Web3
-   **Hardhat 3**: Smart contract development and local node.
-   **Viem & Wagmi**: High-performance blockchain interaction layer.
-   **RainbowKit**: Premium wallet connectivity experience.
-   **Solidity 0.8.26**: Using the Cancun EVM for high-integrity execution.

### Data & Backend
-   **Prisma ORM**: Type-safe database access.
-   **Supabase**: Cloud-native PostgreSQL for sovereign metadata storage.
-   **tsx**: Next-generation TypeScript execution engine for service watchers.

---

## 📂 Project Structure

```text
.
├── contracts/          # Solidity Smart Contracts
├── docs/               # Technical Documentation (You are here)
├── prisma/             # Database Schema & Migrations
├── public/             # Static Assets & Images
├── scripts/            # Deployment & Maintenance Scripts
│   ├── harmony-watcher.ts  # Real-time CAD Trust Sync Service
│   └── deploy.ts           # Protocol Deployment Pipeline
└── src/
    ├── app/            # Next.js Pages & API Routes
    ├── components/     # UI Component Library
    ├── lib/            # Core Logic (Blockchain, Sync, Harmony)
    └── constants/      # Protocol Addresses & ABIs
```

---

## 📋 Documentation Metadata

-   **Version**: 1.1.0-PROTOTYPE
-   **Last Updated**: 2026-03-17
-   **Author**: HCE Engineering Team (Bhutan Platform)
-   **Contact**: admin@himalayacarbon.bt

---

> [!IMPORTANT]
> This documentation covers the current codebase state. Some values (like `CAD_TRUST_AUTH_TOKEN`) are placeholders for simulation purposes. For a live deployment, refer to the [Production Hardening Guide](./DEVELOPER_GUIDE.md#production-hardening).
