# API Reference

The Himalaya Carbon Exchange (HCE) provides a suite of administrative and public API endpoints to facilitate registry synchronization and market participation.

---

## 🔐 Authentication

### 1. Sovereign HMAC (`X-Registry-Signature`)
Endpoints that perform protocol-level state changes (Minting, Whitelisting) require an HMAC-SHA256 signature.
-   **Header**: `X-Registry-Signature`
-   **Secret**: `REGISTRY_BRIDGE_AUTH`

### 2. Public Endpoints
Read-only endpoints and simulation helpers are publicly accessible.

---

## 🏗️ Registry Endpoints

### `POST /api/registry/lock`
The primary bridge for bringing NCRC credits on-chain.
-   **Method**: `POST`
-   **Auth**: HMAC Required
-   **Payload**: `RegistryMetadataSchema`
-   **Action**: Mints ERC-1155 credits via the relayer account.
-   **Response**: `200 OK` with transaction hash and block number.

### `GET /api/registry/participants`
Lists all authorized institutional participants.
-   **Method**: `GET`
-   **Response**: Array of participant objects (Address, Name, Status).

### `GET /api/registry/status`
Returns the operational health of the NCRC bridge.
-   **Response**:
    ```json
    {
      "totalUnitsLocked": 154000,
      "jurisdiction": "Bhutan",
      "status": "Healthy"
    }
    ```

---

## 🏛️ Harmony & CAD Trust

### `POST /api/registry/cad-trust/sync`
Manually triggers a lifecycle synchronization for a specific project.
-   **Payload**: `{ "projectId": string, "action": string }`
-   **Response**: Contains a `GIN` (Global Identification Number) and a `harmonizedTimestamp`.

### `GET /api/registry/cad-trust/status`
Returns connectivity metrics for the Global CAD Trust network.
-   **Response**: Nodes connected, harmonized entries, and gateway health.

---

## 🛒 Market & RFQ

### `POST /api/market/rfq`
Accepts institutional Requests for Quote.
-   **Payload**:
    ```json
    {
      "buyer": "Institutional Name",
      "projectId": "BHU-001",
      "amount": "5000",
      "targetPrice": "18.50"
    }
    ```
-   **Note**: Currently simulates intake; real persistence is handled via Supabase during the `harmony-watch` cycle.

---

## 🛡️ Verification & Transparency

### `POST /api/retire/verify`
In-depth inspection of on-chain retirement events.
-   **Method**: `POST`
-   **Payload**: `{ "txHash": "0x..." }`
-   **Action**: Scans blockchain logs, decodes the `CarbonRetired` event, and generates a signed certificate object.

---

## 🧪 Simulation Endpoints

### `POST /api/registry/lock/test`
Development helper to test the minting bridge locally.
-   **Action**: Signs a mock payload with the local secret and posts it to the `/lock` endpoint.
