# Backend Integration Phases

This tracking sheet aggressively documents the actual technical progression of the integration layers.

---

## 🟢 Phase 1: Storage Layer Consistency (COMPLETED)
-   [x] Establish explicit relationships inside `schema.prisma`.
-   [x] Link `Profile` directly against `userId` strings originating out of Supabase contexts.
-   [x] Force strict cascading joins establishing `UserBalance` explicitly tethering to `RegistryProject.projectId` and `Profile.userId`.
-   [x] Eradicate legacy `SELLER` enums preventing logic bloat across the dashboard redirects.

## 🟢 Phase 2: Action Bindings (COMPLETED)
-   [x] Optimize `getUserBalances()` to request native `.include{ project: true }` fetching.
-   [x] Eliminate non-explicit TS casts `(prisma as any)` across Audit Logs and Profile creators.
-   [x] Bind the Server Action `updateParticipantAuthorization` accurately revalidating `/admin/dashboard`.
-   [x] Ensure `initiateAcquisition` transacts simultaneously targeting `project.totalVolume` decrement logic while creating an un-linked `RFQ` trace.
-   [x] Patch the `ensureProfile()` bootloader logic gracefully bypassing unique `P2002` email collisions when aggressively simulating tests.

## 🟡 Phase 3: External Payment Logic (PENDING)
-   [x] Initialize and capture Webhook payloads evaluating matching signatures.
-   [x] Safely mutate internal database status mappings for `SUCCEEDED` `Payment` records.
-   [ ] Connect or uncomment internal checkout logic ensuring institutional customers actually obtain `isAuthorized: true` state dynamically.

## 🔴 Phase 4: External CAD Sync Integration (NOT STARTED)
-   [ ] Fully replace `syncCADTrust()` inside `/actions/registry.ts`. Remove the heavily isolated `1500ms` fake timer entirely.
-   [ ] Map out actual HTTP endpoints targeting physical external systems.
-   [ ] Wire `generateHarmonyReport` ensuring true cryptographic linkages instead of returning math randomizers (`BT-${Math.random()}`).
