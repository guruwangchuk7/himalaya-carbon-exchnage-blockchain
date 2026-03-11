# API

This document describes the HTTP interfaces implemented under `src/app/api/`. It covers actual behavior in code only.

## Conventions

- All endpoints return JSON.
- There is no shared error envelope.
- Input validation is inconsistent across routes.
- Authentication is route-specific and partial.

## Auth Rules

### HMAC-protected routes

These routes require the `X-Registry-Signature` header:

- `POST /api/registry/lock`
- `POST /api/registry/participants`

The signature is verified with `HimalayaSecurity.verifyRegistrySignature(payload, signature)` using `REGISTRY_BRIDGE_AUTH` or a development fallback secret.

### Unauthenticated routes

These routes do not enforce authentication in current code:

- `GET /api/registry/status`
- `GET /api/registry/participants`
- `POST /api/registry/lock/test`
- `GET /api/registry/cad-trust/status`
- `POST /api/registry/cad-trust/sync`
- `POST /api/market/rfq`
- `POST /api/retire/verify`

`needs verification`: `/dashboard/admin` implies restricted access, but the backing participant APIs and server action do not implement session-based access control.

## Route Reference

### `GET /api/registry/status`

Returns mock registry summary data.

Response body:

```json
{
  "totalUnitsLocked": 154000,
  "activeSerialBatches": 12,
  "lastAuditTimestamp": "2026-03-11T00:00:00.000Z",
  "isAuthoritative": true,
  "jurisdiction": "Bhutan",
  "status": "Healthy"
}
```

Notes:

- `lastAuditTimestamp` is generated per request with `new Date().toISOString()`.
- No request parameters are used.

### `GET /api/registry/participants`

Returns a mock participant list.

Response body:

```json
[
  {
    "address": "0x8E285434FBe799a4c84433E78b179047144eCDB1",
    "name": "National Bank of Bhutan",
    "authorized": true
  }
]
```

Notes:

- The returned list is hard-coded.
- The `request` parameter is unused.

### `POST /api/registry/participants`

Updates participant authorization on-chain.

Headers:

- `Content-Type: application/json`
- `X-Registry-Signature: <hex hmac>`

Request body:

```json
{
  "participantAddress": "0x0000000000000000000000000000000000000000",
  "status": true
}
```

Validation:

- `participantAddress` must match `^0x[a-fA-F0-9]{40}$`
- `status` must be boolean

Success response:

```json
{
  "status": "Submitted",
  "hash": "0x...",
  "message": "Updating authorization for 0x... is in progress."
}
```

Error behavior:

- `401` if the signature header is missing or invalid
- `400` if the payload fails Zod validation
- `500` if the relayer wallet is not configured or the contract write fails

`needs verification`: the route calls `publicClient.simulateContract()` without checking whether the configured account is the on-chain owner.

### `POST /api/registry/lock`

Receives a signed registry lock payload and mints ERC-1155 credits through the relayer wallet.

Headers:

- `Content-Type: application/json`
- `X-Registry-Signature: <hex hmac>`

Request body shape:

```json
{
  "recipient": "0x0000000000000000000000000000000000000000",
  "id": 1,
  "amount": 5000,
  "metadata": {
    "projectName": "Bhutan Forest Restoration",
    "projectID": "BT-FOR-2024-001",
    "unitBatchID": "BCH-12345",
    "vintageYear": 2024,
    "isArticle6Authorized": true,
    "itmoAuthorizationID": "BT-SG-2026-001",
    "methodology": "VM0015",
    "serialNumber": "SN-BT-123",
    "registryLink": "https://example.com/project"
  }
}
```

Validation:

- `recipient` must be an EVM address
- `id` and `amount` may be strings or numbers
- nested metadata fields are validated by `RegistryMetadataSchema`
- `registryLink`, if provided, must be a valid URL

Success response:

```json
{
  "status": "Synchronized",
  "message": "Article 6.2 Carbon Credits minted successfully.",
  "hash": "0x...",
  "block": 123456,
  "registryBatch": "BCH-12345"
}
```

Error behavior:

- `401` for missing or invalid signature
- `400` for schema validation failure
- `500` if minting fails or an exception is thrown

Implementation notes:

- The route transforms incoming metadata into the contract struct used by `mintCarbonCredit`.
- Contract `status` is always set to `2` in the route, corresponding to `Issued` in the Solidity enum.
- `correspondingAdjustmentFinalized` is always initialized to `false`.

### `POST /api/registry/lock/test`

Posts a built-in mock lock signal to `http://localhost:3000/api/registry/lock`.

Request body:

- none

Success response:

```json
{
  "simulation": "Success",
  "registrySignal": "Locked",
  "engineResponse": {}
}
```

Error behavior:

- Mirrors the status code and JSON error from `/api/registry/lock`
- Returns `500` on local fetch/runtime errors

`needs verification`: the target URL is hard-coded to `http://localhost:3000`, so this route is environment-specific.

### `GET /api/registry/cad-trust/status`

Returns mock CAD Trust status information.

Response body:

```json
{
  "connectedNodes": 142,
  "activeExchanges": 28,
  "registryParticipation": "High",
  "bhutanGatewayStatus": "Optimal",
  "harmonizedEntries": 14500,
  "lastGlobalUpdate": "2026-03-11T00:00:00.000Z"
}
```

### `POST /api/registry/cad-trust/sync`

Returns a simulated lifecycle synchronization result.

Request body:

```json
{
  "projectId": "BT-FOR-2024-001",
  "action": "Issuance",
  "metadata": {}
}
```

Validation:

- `projectId` must be present
- `action` must be present
- `metadata` is optional in practice; if omitted, the route still hashes `undefined` via `JSON.stringify`

Success response:

```json
{
  "status": "Synchronized",
  "gin": "GIN-BT-XXXXXXXX",
  "gateway": "Bhutan Sovereign Gateway Node",
  "harmonizedTimestamp": "2026-03-11T00:00:00.000Z",
  "metadataHash": "0x...",
  "lifeCycleEvent": "Issuance"
}
```

Error behavior:

- `400` if `projectId` or `action` is missing
- `500` on parsing/runtime errors

### `POST /api/market/rfq`

Accepts a request-for-quote submission.

Request body:

```json
{
  "buyer": "Institutional Participant",
  "projectId": "BHU-NATURE-POOL",
  "amount": "10000",
  "targetPrice": "18.00",
  "purpose": "Sovereign Retirement / Secondary Market Seed"
}
```

Validation:

- `buyer`, `projectId`, and `amount` must be truthy
- `targetPrice` and `purpose` are accepted but not required

Success response:

```json
{
  "status": "Submitted",
  "rfqId": "RFQ-BT-1234",
  "message": "Our sovereign brokers will review your quote request and contact you within 24 hours.",
  "nextSteps": "Please ensure your institutional KYB is up-to-date in the dashboard."
}
```

Error behavior:

- `400` if required fields are missing
- `500` on parsing/runtime errors

Notes:

- RFQs are not persisted.
- `rfqId` is generated with `Math.random()` and is not guaranteed unique.

### `POST /api/retire/verify`

Verifies a retirement transaction receipt and generates a certificate object.

Request body:

```json
{
  "txHash": "0x..."
}
```

Validation:

- `txHash` must be present
- `txHash` must start with `0x`

Success response:

```json
{
  "status": "Synchronized",
  "certificate": {
    "certificateId": "HCR-XXXXXXXXXX",
    "project": "Bhutan Sovereign Carbon Project",
    "vintage": 2024,
    "amount": "500",
    "beneficiary": "Example Beneficiary",
    "retirementHash": "0x...",
    "cadSyncId": "CAD-BT-12345",
    "timestamp": "2026-03-11T00:00:00.000Z",
    "sovereignSignature": "SIGNED_BY_HIMALAYA_CARBON_ENGINE"
  },
  "registryStatus": "Retired / Locked"
}
```

Error behavior:

- `400` for invalid hash format
- `422` if the transaction receipt exists but reverted
- `404` if no `CarbonRetired` event is found in matching registry logs
- `500` if certificate generation fails or other errors occur

Implementation notes:

- The route decodes only `CarbonRetired` logs from the configured registry contract address.
- The route overwrites `certificate.amount` and `certificate.beneficiary` with event-derived values after certificate generation.
- `generateImpactCertificate()` currently reads project metadata using a hard-coded project ID.

## Server Action Interfaces

These are not HTTP endpoints, but they are application interfaces used by the frontend.

### `updateParticipantAuthorization(address: string, status: boolean)`

- Location: `src/app/actions/sovereign.ts`
- Called by: `/dashboard/admin`
- Behavior: simulates and submits `setParticipantAuthorization` using the relayer wallet
- Auth: no implemented session check

### `generateTestSignature(payloadStr: string)`

- Location: `src/app/actions/simulate.ts`
- Called by: `/simulator`
- Behavior: returns `HimalayaSecurity.signPayload(payloadStr)`

