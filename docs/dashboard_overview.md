# Himalaya Carbon Engine: Dashboard & Interface Overview

This document provides a detailed breakdown of the various dashboards and pages within the Himalaya Carbon Engine platform, defining their specific functions, target users, and key features.

---

## 🖥️ 1. Main Dashboard (`/dashboard`)
**Primary Users**: Standard Participants, Institutional Buyers, Project Holders.

The central hub for managing your interaction with the sovereign carbon market.
*   **Asset Management**: Real-time view of your Article 6.2 credit holdings (ERC-1155).
*   **Registry-Market Sync**: A status monitor for the live bridge between your assets and the National Registry.
*   **Sovereign Trust Indicators**: Visual confirmation of Article 6 status, ITMO authorization, and CAD Trust harmonization.
*   **Quick Actions**: Direct links to Market Trading, Retirement (Burn), and Liquidity Pools.

---

## 🔒 2. Registry Admin Center (`/dashboard/admin`)
**Primary Users**: National Carbon Registry Officials, Ministry of Energy & Natural Resources.

A restricted, high-security portal for sovereign oversight of the blockchain ecosystem.
*   **Institutional Whitelist**: The "master switch" for participant authorization. Only whitelisted legal entities can trade or receive credits.
*   **On-chain Authorization**: A secure interface to call the `setParticipantAuthorization` function on the smart contract.
*   **Compliance Monitoring**: High-level stats on the total number of sovereign entities, licensed brokers, and cross-border participation.

---

## ⚖️ 3. Proof of Reserve Dashboard (`/transparency`)
**Primary Users**: Public, External Auditors, Regulatory Bodies, Media.

The "Integrity Layer" of the platform, providing cryptographic proof of asset backing.
*   **Reserve Health Index**: A live gauge comparing **Off-chain Locked Units** (in the National Registry) against **On-chain Issued Supply** (the tokens).
*   **Institutional Audit Log**: A transparent stream of recent minting (issuance) and burning (retirement) events.
*   **Sovereign Logic Guide**: An educational section explaining how Article 6.2 ITMO authorization and CAD Trust synchronization are enforced.

---

## 🛒 4. Integrated Marketplace (`/marketplace`)
**Primary Users**: Traders, Corporate ESG Teams, Institutional Brokers.

The core trading engine, now supporting two distinct liquidity segments:
*   **Individual Vintages**: Trading of specific project-linked ERC-1155 credits (e.g., specific reforestation cycles).
*   **ERC-20 Carbon Pools**: Instant liquidity pools for high-volume trading of composite asset classes (e.g., nature-based or renewable energy pools).
*   **Institutional RFQ Layer**: A "Request for Quote" system for large-scale acquisitions (over 10,000 tCO2e) which triggers a manual sovereign brokerage flow.

---

## 🌿 5. Retirement & Proof of Impact (`/retire`)
**Primary Users**: Corporations seeking to claim carbon offsets, Individuals.

The final stage of the carbon credit lifecycle where tokens are converted into legal impact claims.
*   **On-chain Burn Sync**: Triggers the permanent destruction of tokens and notifies the National Registry to officially retire the units.
*   **Digital Certificate Generation**: Produces a cryptographically signed "Proof of Impact" with a unique GIN (Global Identification Number).
*   **Verification Timeline**: A live UI that tracks the transaction from blockchain confirmation to sovereign registry finality.

---

**Last Updated**: March 10, 2026  
**Confidentiality**: Institutional Technical Reference
