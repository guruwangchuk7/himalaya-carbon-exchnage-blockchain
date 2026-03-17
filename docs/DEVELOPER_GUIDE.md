# Developer Guide

This guide covers the standards, tools, and workflows for engineers contributing to the **Himalaya Carbon Exchange (HCE)**.

---

## 🎨 Coding Standards

### 1. Terminology & Phrasing
To maintain a professional, sovereign-grade tone, always use consistent terminology:
-   **NCRC**: National Carbon Registry of Bhutan.
-   **HCE**: Himalaya Carbon Exchange.
-   **ITMO**: Internationally Transferred Mitigation Outcome (Article 6.2 term).
-   **Sovereign Relayer**: The backend service that signs on behalf of the registry.
-   **Harmony Watcher**: The CAD Trust synchronization service.

### 2. TypeScript Formatting
-   Use **Functional Components** with `tsx`.
-   Use `viem` for all blockchain interactions (avoid `ethers` to reduce bundle size).
-   Always use **Absolute Path Aliases** (e.g., `@/components/Navbar` instead of `../../components/Navbar`).

---

## 🛠️ CLI Tooling

We have implemented several diagnostic scripts in the `scripts/` directory to speed up development.

### Protocol Diagnostics
| Command | Result |
| :--- | :--- |
| `npx tsx scripts/check-balance.ts` | Displays public address and MATIC/POL balance. |
| `npx tsx scripts/estimate-gas.ts` | Calculates the current cost of a full deployment. |

### Protocol Maintenance
| Command | Result |
| :--- | :--- |
| `npm run compile` | Compiles Solidity contracts and generates ABIs. |
| `npm run harmony-watch` | Starts the Harmony CAD Trust bridge. |

---

## 🛡️ Production Hardening

Before deploying to a mainnet environment, the following hardening steps must be completed:

1.  **Secret Management**: Move `PRIV_KEY` and `REGISTRY_BRIDGE_AUTH` to a secure manager like **Azure Key Vault** or **AWS Secrets Manager**. Never leave them in the root `.env`.
2.  **Removal of Mock Fallbacks**:
    -   In `src/lib/security.ts`, remove the hard-coded development secret.
    -   In `src/lib/harmony.ts`, remove the simulation of CAD Trust Sync IDs.
3.  **Governance Layer**: Ensure the `owner` of the `HimalayaCarbonRegistry` is a **Multi-Sig Wallet** (e.g., Safe) controlled by authorized government members, not a single private key.

---

## ✍️ Documentation Style

Technical documentation should follow these principles:
-   **Actionable**: Use imperative verbs (e.g., "Install the dependency" instead of "The dependency should be installed").
-   **Visual**: Use tables and diagrams where possible to represent complex flows.
-   **Accessible**: Explain acronyms (like ITMO or CDM) on their first use.

---

## 📝 Change Log (Docs)

### [1.1.0] - 2026-03-17
-   Added **Harmony Watcher** documentation.
-   Added **Sovereign Sync Engine** documentation.
-   Updated **Setup & Architecture** for Hardhat 3 and `tsx` compatibility.
-   Reorganized `docs/` folder for logical flow.
