# Sovereign Sync Engine

The **Sovereign Sync Engine** is the internal bridge that ensures the HCE Web Application remains perfectly aligned with the On-Chain Registry state.

---

## 🔍 Overview

While the blockchain is the **Source of Truth**, direct blockchain queries are often slow for sophisticated UI features like searching, filtering, and dashboard analytics. The Sync Engine solves this by mirroring on-chain state into a high-performance **Supabase (PostgreSQL)** database.

**Location**: `src/lib/sync.ts`  
**Database**: Prisma ORM

---

## 🛠️ How it Works

### 1. Data Ingestion
The engine uses `publicClient.readContract` to fetch the complete list of project IDs and their associated metadata from the `HimalayaCarbonRegistry`.

### 2. Status Mapping
It translates Solidity data types into user-friendly database enums.
-   **Solidity 0/1/2/3** (Pending/Authorized/Issued/Retired)
-   **Mapped to**: `DRAFT` / `APPROVED` / `ISSUED_ON_CHAIN`

### 3. Upsert Logic
The engine performs an **Upsert** (Update or Insert) using Prisma. If a project already exists in the database, its metadata (Total Volume, Article 6 Status, etc.) is updated to match the change on the blockchain.

---

## 🏗️ Use Cases

### Performance-First Marketplace
The `MarketplacePage` queries the database via `prisma.registryProject.findMany()`. This allows for sub-100ms load times and advanced filtering by methodology or vintage year, which would be impossible with raw blockchain calls.

### Institutional Dashboards
The **Registry Dashboard** uses the synced data to calculate global metrics like "Total Issuance" and "Article 6 Authorization Ratios" instantly.

---

## 🧹 Manual Synchronization

You can trigger a manual full-system sync from the **Registry-Market Synchronization** panel in the administrative dashboard, or by calling the `syncProjectsToDb()` function in the server environment.

---

## 📑 Database Schema (Registry Segment)

```prisma
model RegistryProject {
  id          String   @id @default(uuid())
  projectId   String   @unique // On-chain Serial
  projectName String
  methodology String
  vintageYear Int
  totalVolume Decimal
  status      String   @default("ISSUED_ON_CHAIN")
  isArticle6  Boolean  @default(false)
  updatedAt   DateTime @updatedAt
}
```
