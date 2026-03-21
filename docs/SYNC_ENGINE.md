# Database & Sync Engine

The central persistence layer of the Himalaya Carbon Exchange lies explicitly within the MySQL environment mapped by the Prisma ORM. 

## 🏗️ The Schema (`prisma/schema.prisma`)
The system explicitly mandates structural relational integrity to ensure the carbon tracking engine cannot mathematically deviate or lose sync.

### Cascading Rules
- `Profile`: Holds `Role` definitions (`GOVERNMENT_ADMIN`, `BUYER`). Tied directly to a Supabase User ID.
- `RegistryProject`: Stores global details including `totalVolume`, `vintageYear`, and `isArticle6`.
- `UserBalance`: A strict mapping table that acts as the "Wallet". Every balance is intrinsically tethered to a specific `Profile` and a specific `RegistryProject` utilizing `.include{}` join compatibility. Deleting a user safely cascades their balance destruction.

---

## 🔄 The Sync Environment (`src/lib/sync.ts`)

Historically conceptualized as a daemon monitoring process, the **Sovereign Sync Engine** (`syncProjectsToDb`) currently executes on-demand capabilities to ingest public blockchain metrics aggressively into the local Prisma metadata layer.

### How it Works:
1. Calls the `HimalayaCarbonRegistry` Smart Contract function `getProjectIds()`.
2. Iterates across numerical IDs utilizing `getProject(ID)` fetching pure `BigInt` arrays.
3. Rapidly decodes internal enumerations (e.g. tracking State Level 2 -> `ISSUED_ON_CHAIN`).
4. Rebuilds the fast-search index utilizing `prisma.registryProject.upsert`, ensuring no duplicate overrides occur.

**Current Limitations**: This process is effectively a one-way mirror. Operations taking place initially **inside** the HCE (like trading or manual retirement) depend on internal API endpoints writing instantly back to Prisma, rather than strictly waiting for eventual-consistency derived from the Ethereum Virtual Machine events.
