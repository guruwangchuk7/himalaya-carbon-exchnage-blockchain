# Harmony Watcher (CAD Trust Bridge)

The **Harmony Watcher** is conceptualized as an off-chain daemon required to fulfill Article 6.2 transparency obligations under the Paris Agreement by syndicating data back to the global **Climate Action Data (CAD) Trust**.

---

## 🛑 Current Implementation Status: MOCKED

Historically, HCE documentation may have described this feature as "Operational." **This is incorrect.**

The real-time synchronization between the local Himalaya Carbon Exchange node and the global multilateral CAD Trust is currently **not fully implemented**. It relies heavily on mock simulation functions for demonstration purposes.

### Where is it mocked?
Inside `src/lib/actions/registry.ts`:
```typescript
export async function syncCADTrust(projectId: string) {
  // Mock CAD Trust sync
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  HimalayaSecurity.logAuditAction("CAD_TRUST_SYNC", { projectId });
  
  return { 
    success: true, 
    gin: `BT-${Math.floor(Math.random() * 9000)}-${['X', 'Y', 'Z'][Math.floor(Math.random() * 3)]}`
  };
}
```
If you encounter UI components indicating successful "Harmonized" states or CAD Trust GIN generations, they are currently deriving success from this 1.5-second timeout and randomized string generator, NOT from an active RPC listener or external REST payload.

### Legacy Watcher Scripts
Any existing script in `scripts/harmony-watcher.ts` intended to actively listen to EVM `CarbonRetired` events has not been integrated into the production Next.js runtime build.

## 🏗️ Future Implementation Requirements

To bring this feature to a production-ready state, a developer must:
1. Initialize an active WebSocket (`wss://`) connection to the Polygon network utilizing `viem`.
2. Map the `CarbonRetired` event signature precisely to the deployed `HimalayaCarbonRegistry`.
3. Construct a valid JSON-LD metadata payload matching the CAD Trust Data Dictionary v2.
4. Issue an authenticated `POST` request to the national CAD Trust instance API gateway.
5. Store the returned specific Global Identification Number (GIN) mapping onto the Prisma `Certificate` database model.
