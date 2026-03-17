# Protocol Maintenance & Testing Guide

This guide describes the procedures for validating and maintaining the **Himalaya Carbon Exchange (HCE)** protocol.

---

## 🏗️ 1. Health Diagnostics (CLI)

Before performing any UI-based tests, ensure the protocol infrastructure is healthy using our built-in CLI tools.

### 1.1: Environment Check
```bash
# Verify the .env is correctly pointing to the target network
npx tsx scripts/check-balance.ts
```
**Expected Output**: Displays the correct deployer address and a positive MATIC/POL balance.

### 1.2: System Compilation
```bash
# Ensure all contracts and ABIs are synchronized
npm run compile
```

---

## 🌐 2. Frontend & Interaction Testing

### 2.1: Local Host Configuration
1.  Start the local node: `npx hardhat node`
2.  Deploy the registry: `npx hardhat run scripts/deploy.ts --network localhost`
3.  Ensure `.env` has:
    - `NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545`
    - `NEXT_PUBLIC_CHAIN_ID=31337`

### 2.2: Marketplace Verification
1.  Navigate to `http://localhost:3000/marketplace`.
2.  **Search**: Type "Hydro" to verify real-time project filtering.
3.  **RFQ**: Click "Institutional RFQ" and submit a request. Verify the "Success" toast notification.

### 2.3: Wallet Connectivity (RainbowKit)
1.  Click **Connect Wallet**.
2.  Select Metamask and switch to the Localhost work network.
3.  **Verification**: The Navbar should display the abbreviated wallet address.

---

## 🧪 3. Sovereign Lifecycle Testing

This is the most critical test flow for the BSL 2026 demo.

### 3.1: The Registry Mint (Simulator)
1.  Navigate to `/simulator`.
2.  Click **"Lock in NCRC & Trigger Bridge"**.
3.  **Verification**: 
    -   The simulator console should show a successful HMAC signature validation.
    -   A transaction hash should appear, confirming the minting on the local blockchain.

### 3.2: The Harmony Retirement (Cross-Process Test)
1.  Open a second terminal and start the watcher: `npm run harmony-watch`.
2.  In the browser, navigate to `/retire`.
3.  Select a carbon vintage and click **"Retire Units"**.
4.  **Verification**:
    -   **UI**: Should show "Retirement Confirmed" and display a downloadable certificate.
    -   **Watcher Terminal**: Should immediately print: `Detected CarbonRetired event... Harmony Watcher: SUCCESS. Linked to CAD Trust Harmony Node.`

---

## 🛡️ 4. API & Security Audits

### 4.1: Bridge Security
Attempt to post a mock minting request to `/api/registry/lock` without a valid `X-Registry-Signature`.
-   **Expected Result**: `401 Unauthorized`.

### 4.2: Audit Logs
Check the terminal running the Next.js server (`npm run dev`) after a retirement.
-   **Expected Result**: Search for `[AUDIT]` tags in the console output to verify log persistence.

---

## 🔧 5. Maintenance Commands

| Task | Command |
| :--- | :--- |
| **Refresh Database** | `npx prisma db push` |
| **Regenerate Client** | `npx prisma generate` |
| **Clean Contracts** | `npx hardhat clean` |
| **Watch CAD Trust** | `npm run harmony-watch` |

---

**Last Review**: 2026-03-17  
**Status**: Manual Testing Protocol Operational  
