# Smart Contract Infrastructure

The **HimalayaCarbonRegistry** operates as the sole EVM executor on the Polygon network managing the State's sovereign carbon assets.

## 🔗 The Relayer Connection (`src/lib/blockchain.ts`)
The platform explicitly leverages `viem` to bypass traditional RPC layers, establishing a heavily permissioned local instance executing Smart Contracts natively.

### Configuration Parameters
```typescript
export const publicClient = createPublicClient({
  chain: // Targets the mapped chain (Mainnet/Amoy/Local)
  transport: http(process.env.NEXT_PUBLIC_RPC_URL)
});

export const walletClient = createWalletClient({
  account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`),
  chain: // Mapping
});
```

Because `walletClient` initializes utilizing `process.env.PRIVATE_KEY`, the application itself serves as a **highly-permissioned cryptographic bridge**.

---

## 📜 Executed Functions
The Node.js server acts as an authorized relayer triggering writes onto the blockchain specifically when validated NCRC commands execute.

### `mintFromRegistry` 
- Executed exclusively via `/api/registry/lock` when a valid HMAC signature clears.
- Constructs strongly typed metadata structs holding values specifically matching Article 6.2 demands (e.g. `isArticle6Authorized`, `vintageYear`, `correspondingAdjustmentFinalized`).
- Simulates the execution context prior to writing natively via `walletClient.writeContract()`.

### `setParticipantAuthorization` 
- Executed directly out of the `updateParticipantAuthorization` server action inside `/admin/dashboard`.
- Restricts transfers entirely, demanding execution from the active Deployer Key instance.

---

## ⚠️ Known Limitations
The platform currently treats the Smart Contract predominantly as a one-way Write-Ledger. 
While functions like `syncProjectsToDb` pull specific structural states backward into Prisma, most immediate Application state logic ignores active gas polling or event-log tracing dynamically, opting instead to write simultaneously to Prisma and Viem simultaneously inside unified Server Actions.
