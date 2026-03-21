# Developer Guide

This guide ensures engineers maintain architectural consistency against the existing infrastructure bounds of the **Himalaya Carbon Exchange (HCE)**.

---

## 🎨 Design & Data Standards

### 1. Prisma & Type Casting
**CRITICAL**: Do NOT bypass Prisma Typescript bindings utilizing `(prisma as any)`. 
The `schema.prisma` file accurately tracks all relationships (e.g., `UserBalance` arrays cascading against `Profile`). Ensure you frequently run `npx prisma generate` to synchronize your IDE cache.

### 2. Role Assignments
With the removal of the `SELLER` structure, the primary role enumerations utilized inside the routing guards are:
-   `GOVERNMENT_ADMIN`: Full access to `/admin/dashboard`. Can simulate issuance and authorize whitelists.
-   `BUYER`: Institutional user routed to `/buyer/dashboard`.

*(Other minor sub-roles like `TRADER` or `AUDITOR` fall through to the Buyer or default flows).*

### 3. Action Hooks
Always locate database mutating tasks inside `src/lib/actions/*` files using `"use server"`.
- `market.ts`: For standard buying, trading, profile creation, and balance inquiries.
- `registry.ts`: For Sovereign admin capabilities or project injection.
- `sovereign.ts`: Designed primarily for high-tier blockchain interactions (e.g. `updateParticipantAuthorization`).

---

## 🛠️ Developer Interventions (Bypasses)

Because Supabase authentication flows can be cumbersome to simulate, the system supports a hardcoded override URL parameter logic in local environments.
- Appending `?bypass=admin` injects a simulated CUID and circumvents the profile fetch to force `GOVERNMENT_ADMIN`.
- Appending `?bypass=buyer` forces `BUYER` and routes you gracefully.
*(This logic sits heavily in `getUserProfile()` in `market.ts`).*

---

## 🛡️ Production Hardening Needed

Before pushing the existing prototype to a real, live deployment, YOU MUST:
1.  **Strip Mocks**: Search the codebase for instances returning `setTimeout` delays or default fallback arrays (e.g. `getTransparencyLogs` in `market.ts` falling back to `mockLogs` if the DB is unpopulated).
2.  **Strip the Dev Bypass**: The bypass functionality allows dangerous cross-role access explicitly designed to aid prototyping. Removing `process.env.NODE_ENV === "development"` checks from `getUserProfile` and replacing them with hard JWT checks is mandatory.
3.  **Implement Stripe Webhook Profile Logic**: The current Stripe Webhook in `api/stripe/webhook/route.ts` successfully acknowledges `SUCCEEDED` triggers, but the inner logic updating the user `isAuthorized` flag is currently commented out.

---

## ✍️ Documentation Style
When adding files to this `docs` folder, prioritize honesty over aspiration. If a feature executes a `Promise.resolve("fake_id")`, do not document it as an active microservice.
