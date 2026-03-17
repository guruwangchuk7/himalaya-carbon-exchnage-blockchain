# Harmony Watcher: Global CAD Trust Bridge

The **Harmony Watcher** is a specialized service that provides the real-time link between Bhutan's National Registry and the **Global Climate Action Data Trust**.

---

## 🛰️ Overview

The watcher runs as a standalone Node.js process using the `tsx` engine. Its primary responsibility is to ensure that every **Retirement** event in Bhutan is immediately visible to the global carbon market.

**Location**: `scripts/harmony-watcher.ts`  
**Core Logic**: `src/lib/harmony.ts`

---

## 🔄 The Synchronization Lifecycle

1.  **Event Detection**: The watcher uses a persistent WebSocket/HTTP connection to listen for the `CarbonRetired(address holder, uint256 id, uint256 amount, string beneficiary, string purpose)` event.
2.  **Metadata Enrichment**: Upon detection, it queries the smart contract for the underlying project metadata (Vintage, Methodology, Project ID).
3.  **Governance Mapping**: The local data is mapped to the **CAD Trust Meta-Data Standard v2.0**.
4.  **CAD Trust Push**: The service makes a `POST` request to the Harmony API with a Bearer Token (`CAD_TRUST_AUTH_TOKEN`).
5.  **Circular Reference**:
    -   The **CAD Sync ID** is returned by the global trust.
    -   This ID is logged in the local sovereign audit trail, creating a verifiable link between the `txHash` and the `SyncID`.

---

## 🛠️ Configuration

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_CAD_TRUST_API_URL` | The Harmony API endpoint. | `https://api.harmony.cadtrust.org/v2` |
| `CAD_TRUST_AUTH_TOKEN` | Institutional credential. | Secure Bearer Token |

### Simulation Mode
If the `CAD_TRUST_AUTH_TOKEN` is set to the default placeholder (`your-institutional-token-here`), the watcher will:
-   Validates the on-chain event.
-   Generate a **Sovereign-Authentic Sync ID** (e.g., `CAD-BT-XXXXXXXX`).
-   Simulate the network latency of a real global sync.

---

## 🚀 Running the Watcher

In a production or high-stakes demo environment, run:

```bash
npm run harmony-watch
```

**Expected Console Output:**
```text
----------------------------------------------------------------
    Himalaya Carbon Exchange - Sovereign Harmony Watcher        
----------------------------------------------------------------
Status: Initializing...
Target Registry: 0x5Fb...
CAD Trust API:   https://api.harmony.cadtrust.org/v2
----------------------------------------------------------------
Harmony Watcher: Starting real-time event monitoring...
Status: RUNNING
Monitoring 'CarbonRetired' events. Press Ctrl+C to stop.
```

---

## 🛡️ Resilience & Error Handling

-   **Fallback IDs**: If the CAD Trust API is unreachable, the system generates a `CAD-FALLBACK-BT-...` ID to ensure local accounting is never blocked.
-   **Retry Logic**: The service is designed to be restart-safe. In future releases, it will support block-range scanning to catch events missed during downtime.
