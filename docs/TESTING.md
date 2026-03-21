# Testing Procedures

This guide provides an honest set of procedures for evaluating the active logic paths in the Himalaya Carbon Exchange. 

---

## 🛠️ 1. Environment Simulation Setup

Because strict Supabase Authentication is currently augmented, testing the platform revolves heavily around the local **Developer Override** logic.

### Modifying User State (Bypasses)
1. Boot the server via `npm run dev`.
2. Navigate to `http://localhost:3000/login`.
3. The server natively listens for the mock credential combo:
   - **Email:** `guruwangchuk1234` (any domain)
   - **Password:** `123456`
4. If accessed via the standard portal, this instantly vectors you into the `BUYER` role and routes to `/buyer/dashboard`.
5. If accessed specifically through the Sovereign portal, you are verified as `GOVERNMENT_ADMIN` and dumped natively into `/admin/dashboard`.

*(Alternatively, you can manually force access by simply appending `?bypass=admin` or `?bypass=buyer` directly to the `/dashboard` URL).*

---

## 🌐 2. Lifecycle Audits

### 2.1 Initiating an Acquisition (`BUYER`)
1. With `?bypass=buyer` active, navigate to `/marketplace`.
2. Attempt to acquire carbon assets natively from a listed project.
3. This triggers `initiateAcquisition()` in `market.ts`.
4. Check Prisma Studio (`npx prisma studio`) or your MySQL client:
   - A `UserBalance` block should exist actively storing your generated CUID and joining directly to the `RegistryProject.projectId` and your `Profile.userId`.
   - Your `.amount` should decrement heavily against the global project limit.
   - An `AuditLog` row should visibly exist showing "ASSET_ACQUISITION".

### 2.2 Re-Issuing the Balance (`ADMIN`)
1. Flip your simulation override to `?bypass=admin` and navigate to `/admin/dashboard`.
2. The Simulator component should natively evaluate the active values inside the `RegistryProject` module.
3. Observe how UI elements like "Sovereign Project Simulator" currently mock functionality without directly tying a UI form to an actual database `$transaction`. *(Uploading projects is unhooked).*
4. Navigate to the CAD Sync module. Click "Sync Global State". Note that it completes artificially fast due to the mocked `setTimeout` bypass.

### 2.3 Retiring a Balance (`BUYER`)
1. Return to `?bypass=buyer` and navigate to `/retire`.
2. Retiring a fraction of your `UserBalance` deducts natively using `prisma.$transaction`.
3. The platform generates an immutable `Certificate` hash logically bound to the database.

---

## 🚨 3. Broken Scenarios to Avoid
- **Stripe Subscriptions**: Attempting to pay via the mocked checkout flow will reach success in the Stripe dashboard and hit the `route.ts` webhook safely. However, because the profile updater block is commented out, your `isAuthorized` flag will remain false, rendering manual payment testing ineffective.
- **RFQs**: `api/market/rfq` executes purely functionally but natively ignores mapping your active Session to the `buyerId`, writing raw strings to `buyerName` instead. Testing RFQs in heavily related queries will fail.
