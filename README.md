# Himalaya Carbon Registry & Exchange

Himalaya Carbon is a sovereign-grade market infrastructure for Bhutan's carbon credits. It provides a registry-synchronized token system to make official National Carbon Registry units easier to trade, track, and retire, while ensuring full alignment with Article 6.2 requirements and CAD Trust metadata standards.

## 🏔️ Core Features

*   **Registry-Market Sync**: 1:1 tokenization of sovereign registry units.
*   **Article 6.2 Compliant Engine**: Immutable tracking of ITMO (Internationally Transferred Mitigation Outcomes) authorizations and Corresponding Adjustment (CA) status.
*   **Institutional Whitelist**: High-integrity market rails with participant-level transfer guards.
*   **Transparent Price Discovery**: Live price feeds and volume indexing for authorized carbon vintages.
*   **Sovereign Impact Proof**: On-chain retirement workflow generating downloadable, verifiable impact certificates.
*   **CAD Trust Integration**: Real-time heartbeat visualization of the connection between the registry and global climate data.

## 🏗️ Technical Stack

*   **Frontend**: Next.js 15+, React, Tailwind CSS, Framer Motion, Lucide React.
*   **Blockchain**: Solidity 0.8.20+, OpenZeppelin ERC1155 (with Supply extensions).
*   **Performance**: Fully optimized for core web vitals and high accessibility.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)
- Hardhat (for local contract deployment)

### 2. Environment Setup
Create a `.env.local` file based on `.env.example`:
```bash
NEXT_PUBLIC_RPC_URL=your_rpc_url
NEXT_PUBLIC_REGISTRY_ADDRESS=your_contract_address
PRIV_KEY=your_private_key
ETHERSCAN_API_KEY=your_scan_key
```

### 3. Installation
```bash
npm install
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

### 5. Smart Contract Deployment
```bash
npx hardhat run scripts/deploy.js --network <your-network>
```

## 📜 Article 6.2 Guidelines
This implementation follows the **Bhutan National Carbon Registry** governance structure, ensuring no double counting through:
1.  **Corresponding Adjustments**: Handled via the `setCorrespondingAdjustment` function.
2.  **ITMO Authorizations**: Tracked via `setArticle6Status` with bilateral agreement references (e.g., BT-SG-2025).
3.  **Registry Lock**: Assets move through `Authorized` -> `Issued` -> `Retired` lifecycle phases.

## 📊 Deployment Strategy
- **Stage 1 (Sandbox)**: Pilot launches on Polygon Amoy or Base Sepolia.
- **Stage 2 (Production)**: Mainnet deployment with multisig owners (National Registry Council).

---
© 2026 Himalaya Carbon Exchange. All rights reserved.
