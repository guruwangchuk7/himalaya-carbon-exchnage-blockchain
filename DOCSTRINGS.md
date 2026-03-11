# Docstring Recommendations

This file lists major functions that would benefit from stronger professional docstrings. Recommendations are based on current implementation and avoid claiming behavior that is not present.

## Recommended Targets

### `src/lib/blockchain.ts`

#### `mintFromRegistry`

```ts
/**
 * Mints registry-backed credits through the configured relayer wallet.
 *
 * Simulates `mintCarbonCredit` against the registry contract, submits the
 * transaction with the relayer account, and waits for the transaction receipt.
 *
 * @param to Recipient wallet for the ERC-1155 credits.
 * @param id Registry token ID / project vintage identifier.
 * @param amount Quantity of credits to mint.
 * @param metadata Contract-shaped project metadata payload.
 * @returns A success object with transaction details, or a failure object with
 * an error message if simulation, submission, or confirmation fails.
 * @throws Error If the relayer wallet is not configured.
 */
```

### `src/lib/security.ts`

#### `RegistryMetadataSchema`

```ts
/**
 * Validates signed registry lock payloads before they are transformed into the
 * on-chain `ProjectMetadata` struct.
 *
 * The schema accepts numeric identifiers as strings or numbers to match the
 * webhook formats used by the simulator and route handlers.
 */
```

#### `HimalayaSecurity.verifyRegistrySignature`

```ts
/**
 * Verifies the HMAC-SHA256 signature attached to a registry webhook payload.
 *
 * The function computes a hex digest using the shared bridge secret and
 * compares it to the provided signature with a constant-time equality check.
 *
 * @param payload Raw request body string exactly as received.
 * @param signature Hex-encoded HMAC digest from `X-Registry-Signature`.
 * @returns `true` when the signature matches; otherwise `false`.
 */
```

#### `HimalayaSecurity.logAuditAction`

```ts
/**
 * Emits a lightweight audit log entry to stdout for sensitive server actions.
 *
 * @param action Logical audit event name.
 * @param metadata Context object associated with the action.
 */
```

### `src/lib/certificates.ts`

#### `generateImpactCertificate`

```ts
/**
 * Builds a retirement certificate from on-chain transaction state.
 *
 * The current implementation verifies receipt success, reads project metadata
 * from the registry contract, and generates certificate identifiers and timing
 * fields locally. Amount and beneficiary are supplemented by the caller.
 *
 * @param txHash Confirmed retirement transaction hash.
 * @returns A partially derived certificate object, or `null` if verification
 * or metadata lookup fails.
 */
```

### `src/lib/dex.ts`

#### `simulateCarbonSwap`

```ts
/**
 * Returns a mocked swap quote for a carbon pool token.
 *
 * This helper does not call a DEX router or quoter contract in its current
 * form. It exists as a placeholder interface for future market integrations.
 *
 * @param poolToken Pool token symbol or identifier.
 * @param amount Trade size supplied by the caller.
 * @param isSell Whether the quote represents selling pool tokens for a stable asset.
 */
```

#### `seedSovereignLiquidity`

```ts
/**
 * Returns a mocked liquidity-seeding result for a carbon pool.
 *
 * @param poolAddress Target pool contract address.
 * @param carbonAmount Carbon-side contribution amount.
 * @param stableAmount Stablecoin-side contribution amount.
 * @returns A mock transaction result used by prototype flows.
 */
```

### `src/app/actions/sovereign.ts`

#### `updateParticipantAuthorization`

```ts
/**
 * Submits a participant authorization update through a server action.
 *
 * This action is used by the admin dashboard to bypass client-side HMAC
 * signing. It assumes the server relayer account is authorized to call the
 * registry contract owner-only function.
 *
 * @param address Participant wallet address.
 * @param status Authorization state to apply.
 * @returns A success result with transaction hash, or a failure result with an error message.
 */
```

### `src/app/actions/simulate.ts`

#### `generateTestSignature`

```ts
/**
 * Generates an HMAC signature for simulator payloads using the configured
 * bridge secret.
 *
 * @param payloadStr Raw JSON payload string to sign.
 * @returns Hex-encoded signature string.
 */
```

### `src/app/api/registry/lock/route.ts`

#### `POST`

```ts
/**
 * Accepts a signed registry lock payload and attempts to mint the matching
 * credits on-chain through the relayer wallet.
 *
 * The handler verifies the request signature, validates the payload with Zod,
 * maps request metadata into the registry contract struct, and returns
 * transaction information after receipt confirmation.
 */
```

### `src/app/api/retire/verify/route.ts`

#### `POST`

```ts
/**
 * Verifies a retirement transaction and assembles the API certificate response.
 *
 * The handler waits for the receipt, searches for a `CarbonRetired` event from
 * the configured registry contract, delegates certificate construction to
 * `generateImpactCertificate`, and patches event-derived amount and beneficiary
 * fields into the final response.
 */
```

### `contracts/HimalayaCarbonRegistry.sol`

The contract already has basic NatSpec on several functions. The following would benefit from stronger detail:

- `mintCarbonCredit`: document metadata overwrite behavior for existing IDs
- `setParticipantAuthorization`: document that whitelist checks apply only to non-mint, non-burn transfers
- `retire`: document that it burns caller-held tokens and increments `retiredAmount`
- `_update`: document transfer restriction logic and exceptions for mint/burn

Recommended style:

```solidity
/**
 * @notice Updates participant whitelist status for transfer eligibility.
 * @dev The whitelist is enforced for transfers where both `from` and `to` are
 * non-zero addresses. Minting and burning bypass this recipient check.
 * @param account Participant wallet address.
 * @param status Whether the wallet should be treated as an authorized participant.
 */
```
