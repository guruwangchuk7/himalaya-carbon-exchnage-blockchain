# 🚀 HCE Execution & Run Guide

This guide provides the sequence for running the **Himalaya Carbon Exchange (HCE)** in a local development environment. For the system to be fully functional (with live blockchain data and CAD Trust synchronization), you must run these services in parallel.

---

## 🏗️ 1. Start the Local Blockchain
The HCE system uses Hardhat to simulate a sovereign carbon registry. This must be active for the dashboard to show real-time "Reserve Health" and "Article 6.2" tracking.

```bash
# Terminal 1: START THE NODE
npx hardhat node
```

## 📜 2. Deploy Smart Contracts
Once the node is active, push the Carbon Registry and Sovereign Bridge logic to the local chain.

```bash
# Terminal 2: DEPLOY REGISTRY
npx hardhat run scripts/deploy.ts --network localhost
```
> [!IMPORTANT]
> **Update `.env`**: After deployment, the terminal will print a "CarbonRegistry deployed to: `0x...`" address. Copy this address into your `.env` file under `NEXT_PUBLIC_REGISTRY_ADDRESS`.

## 🔄 3. Start the Harmony Sync Engine
The **Harmony Watcher** is the bridge between the blockchain and the CAD Trust. It monitors for `CarbonRetired` events and synchronizes them with the global registry.

```bash
# Terminal 3: START THE WATCHER
npm run harmony-watch
```

## 🖥️ 4. Launch the Web Interface
Finally, run the Next.js frontend to access the marketplace, retirement engine, and transparency dashboard.

```bash
# Terminal 4: START THE FRONTEND
npm run dev
```
👉 **Access the Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 🧪 Testing the Lifecycle
Once all services are running, verify the "Sovereign Integrity" flow:

1.  **Mint Simulation**: Use the **National Registry Simulator** in the admin portal to "Lock" a physical carbon asset.
2.  **Marketplace Discovery**: Visit `/marketplace` to confirm the new project is indexed and Article 6.2 compliant.
3.  **Impact Claim**: Visit `/retire` to burn tokens for a specific beneficiary.
4.  **Sync Verification**: Check **Terminal 3 (Harmony Watcher)** to see the event being detected and mirrored to the CAD Trust.
5.  **Public Audit**: Visit `/transparency` to see the retirement logged in the "Global Proof of Reserve."

---

**Version**: 1.0  
**Updated**: 2026-03-18
