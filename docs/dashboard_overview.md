# Dashboard & Interface Overview

The UI layer is distinctly partitioned into a dual-hub model to prevent role fragmentation and logic crossover.

---

## 🛡️ 1. Sovereign Command Center (`/admin/dashboard`)
**Intended For**: National Carbon Registry (NCRC) Officials & Sovereign Regulators.

This acts as the master simulation and issuance gateway for the state.
- **Sovereign Project Simulator**: A dedicated module allowing authorized administrators to launch the upload wizard and mathematically preview the projected volume of ITMO Minting.
- **CAD Trust Metadata Harmony**: A UI block containing an automated sync button. *(Note: While it appears fully functional, the current implementation strictly spins a mocked loading state prior to injecting a success notification into the array list).*
- **Whitelist Operations**: Utilizing `src/app/actions/sovereign.ts`, admins can authorize participants directly to the EVM registry mapping.

---

## 🏢 2. Institutional Buyer Terminal (`/buyer/dashboard`)
**Intended For**: Verified Corporations, Traders, and Auditors.

Automatically routed from `/dashboard` upon identifying a non-admin role.
- **Acquisitions Sandbox**: Direct integration with the `market.ts` module to acquire listed fractions of carbon projects.
- **Live Portfolio**: Relies tightly on the Prisma `UserBalance` relational hook. Retrieves and aggregates active holdings by querying arrays directly bound to the user's `Profile`.

---

## 🔀 3. The Core Redirector (`/dashboard`)
Does not technically possess a user interface. This is a Server Component acting entirely as an invisible junction box.
It runs `getUserProfile()` and rapidly fires Next.js `redirect()` instructions based on the active session role.

---

## 🌐 4. Generic App Pages
- **`/marketplace`**: Read-only grid display mapping out active `RegistryProject` lines.
- **`/transparency`**: A chronological feed of all `AuditLog` rows from the Prisma backend, detailing transaction times and verification statuses.
- **`/retire`**: The execution interface for burning digital asset holdings securely logged inside `UserBalance`.
