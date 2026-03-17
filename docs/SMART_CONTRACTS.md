# Smart Contract Protocol

The HCE Protocol is built on a modular suite of Solidity contracts, leveraging OpenZeppelin's tried-and-tested libraries.

---

## 📜 HimalayaCarbonRegistry.sol

The core of the Bhutanese Carbon Market. It manages the issuance, metadata, and retirement of credits.

### 💎 Token Standard: ERC-1155
We use ERC-1155 because it allows us to manage thousands of different **Project Vintages** within a single contract. Each `TokenID` represents a unique project/vintage pair.

### 🛡️ Access Control & Security
-   **Owner-Only Minting**: Only the authorized Sovereign Relayer (the contract owner) can issue new credits.
-   **Participant Whitelist**: The `setParticipantAuthorization` function restricts who can hold and trade credits.
-   **Transfer Interdiction**: Non-whitelisted addresses cannot receive tokens, preventing the illicit trade of sovereign assets.

### 🧩 Key Functions
-   `mintCarbonCredit(...)`: Issues new credits and locks their metadata on-chain.
-   `retire(...)`: Burns the credits and emits a `CarbonRetired` event for global synchronization.
-   `setArticle6Status(...)`: Updates the international authorization status of a specific vintage.
-   `setCorrespondingAdjustment(...)`: Records proof that the bilateral settlement has occurred.

---

## 💧 CarbonPool.sol

A liquidity wrapper that converts specific ERC-1155 vintages into divisible ERC-20 tokens.
-   **Fungibility**: Allows credits from different projects with similar methodologies to be traded as a single "Pool Token" (e.g., *BHU-NATURE-POOL*).
-   **DEX Ready**: These tokens can be placed into Uniswap V3 or other decentralized exchanges to provide 24/7 liquidity.

---

## 🏭 CarbonPoolFactory.sol

A factory pattern designed for the Ministry to deploy new thematic pools (e.g., Renewable Energy, Afforestation) without manual contract coding.

---

## 📊 Event Schema (The "Source of Truth")

The frontend and the **Harmony Watcher** rely on these high-integrity events:

| Event Name | Purpose |
| :--- | :--- |
| `CarbonMinted` | Triggers the creation of the local database record. |
| `CarbonRetired` | Triggers the CAD Trust synchronization sequence. |
| `Article6StatusUpdated` | Updates international trade eligibility markers. |
| `ParticipantAuthorized` | Updates the institutional whitelist. |
