# System Architecture

The Himalaya Carbon Exchange (HCE) follows a **Two-Factor Sovereign Market** architecture, bifurcated cleanly between **Government Admins** (Issuers) and **Institutional Buyers** (Acquirers).

---

## 🏗️ Technical Blueprint

### 1. The Request Lifecycle Layer (Next.js App Router)
The platform utilizes React Server Components heavily.
- **Routing**: A centralized redirector at `src/app/dashboard/page.tsx` evaluates user roles and instantly forces traffic into either `/admin/dashboard` or `/buyer/dashboard`.
- **Database Intercession**: `src/lib/actions/market.ts` acts as the primary ORM service layer, ensuring database profile synchronization and referential integrity against the Prisma engine.

### 2. The Persistence Layer (MySQL / Prisma)
The schema rigidly enforces relations to prevent state fragmentation:
- **`Profile`**: Driven by Supabase ID, acts as the root object for `UserBalance` and `RFQ`.
- **`RegistryProject`**: The physical representation of a carbon deployment.
- **`UserBalance`**: Ties an exact amount of carbon assets (`amount`) directly to a `Profile` and a `RegistryProject`.
- **`Certificate`**: Immutable event streams of retirements.

### 3. The Blockchain Execution Layer (Viem / Polygon)
- The server initializes a private `walletClient` inside `src/lib/blockchain.ts` utilizing the `PRIVATE_KEY`.
- This relayer acts as a highly permissioned agent. It receives validated off-chain triggers directly from NCRC and pushes them onto the public ledger.

---

## 📈 Request Flows

### A. The "Lock-and-Mint" Sovereign Flow (Implemented)
1.  External actor pushes to `POST /api/registry/lock`.
2.  `HimalayaSecurity.verifyRegistrySignature()` checks the HMAC-SHA256 signature using a shared secret.
3.  The request passes through strict `Zod` metadata validation.
4.  The server executes `mintFromRegistry` via Viem, pushing an EVM state change.
5.  A simultaneous Prisma `upsert` logs the off-chain proxy into `RegistryProject`, making it visible to web users instantly.

### B. Institutional Acquisition Flow (Implemented)
1.  A buyer natively fires `initiateAcquisition()` server action.
2.  Prisma utilizes `$transaction` to atomically:
    - Decrement `totalVolume` from the `RegistryProject`.
    - Construct an `RFQ` receipt labeled `MATCHED`.
    - Append securely onto the `UserBalance` array.
    - Emit an off-chain `AuditLog` string.

### C. Harmony CAD Trust Integration (MOCKED)
1. The architecture historically defined a complex cross-chain watcher.
2. **Current Reality**: This is heavily mocked. `syncCADTrust()` in `registry.ts` artificially simulates a 1500ms delay and mathematically derives a fake string (`BT-3422-X`) instead of actively communicating with an Oracle or node network.

---

## 🚫 Deprecated Architectures
The **Seller Dashboard** and its adjacent routing logic have been entirely removed. The sovereign government operates as the primary origin point for Article 6 credits.
