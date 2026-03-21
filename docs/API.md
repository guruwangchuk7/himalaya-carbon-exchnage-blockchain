# API Reference & Server Actions

The Himalaya Carbon Exchange (HCE) uses a hybrid model of traditional REST API endpoints (under `src/app/api`) and Next.js Server Actions (under `src/lib/actions`).

---

## 🚨 Active API Endpoints (`/api`)

### `POST /api/registry/lock`
The critical, fully-functioning secure proxy that interfaces with the off-chain NCRC registry webhook system.
- **Auth Strategy**: Strictly requires an `X-Registry-Signature` header implementing HMAC-SHA256 validation (`verifyRegistrySignature()`).
- **Input Validation**: Hardened automatically by Zod matching (`RegistryMetadataSchema`).
- **Execution Hook**: Success results in a direct call to `mintFromRegistry` pushing EVM interactions to the Polygon network. Simultaneously upserts the `RegistryProject` table natively via Prisma.

### `POST /api/market/rfq`
A decoupled entry sequence designed to store raw Request For Quotes structurally.
- **Limitations**: Currently inserts records storing *only* the `buyerName` as a raw string without firmly joining to a structural `Profile`.

### `POST /api/stripe/webhook`
Handles external financial checkout receipts natively triggering Prisma updates.
- **Current Constraints**: Automatically flags `Payment` database rows as `SUCCEEDED`. However, logic assigning actual functional roles to individuals successfully paying is currently commented out heavily in the execution branch.

---

## ⚡ Key Server Actions (`/src/lib/actions` & `/src/app/actions`)
*Server actions run explicitly on the Node.js backend to bypass client-side inspection.*

### `market.ts`
- **`ensureProfile()`**: Heartbeat function. Ensures the user maintains a valid relational `Profile`. Heals unique email constraint crashes natively.
- **`getUserBalances()`**: Fully relational execution joining `UserBalance` directly to actual `RegistryProject` details.
- **`initiateAcquisition()`**: Advanced `$transaction` bundle decrementing target project capacity, instancing `RFQ` logs, writing to an `AuditLog`, and inflating `.amount` dynamically onto the user's balance.
- **`retireCredits()`**: Decrements internal limits and spawns an immutable `Certificate` token inside MySQL mapping.

### `registry.ts`
- **`authorizeProjectArticle6()`**: Restricts execution to `GOVERNMENT_ADMIN`, dynamically updating true authorization bounds inside Prisma.
- **`syncCADTrust(projectId)`**: **[MOCK WARNING]**. Does not interact with external infrastructure. Returns `Promise` delay simulating 1.5s network lag.

### `sovereign.ts`
- **`updateParticipantAuthorization()`**: Highly protected action requiring `OPERATOR`, `AUDITOR`, or Admin levels that pushes direct ABI instructions using `publicClient.simulateContract` prior to writing natively to Polygon Amoy.
