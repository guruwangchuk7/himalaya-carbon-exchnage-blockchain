import { createWalletClient, createPublicClient, http, custom } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonAmoy } from "viem/chains";
import { REGISTRY_ABI } from "@/constants";

// For Server-side operations using Private Key
const PRIV_KEY = process.env.PRIV_KEY as `0x${string}`;
const REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`;

if (!PRIV_KEY) {
  process.stderr.write("CRITICAL: PRIV_KEY not configured in environment variables.\n");
}

export const account = PRIV_KEY ? privateKeyToAccount(PRIV_KEY) : null;

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

export const walletClient = account
  ? createWalletClient({
    account,
    chain: polygonAmoy,
    transport: http(process.env.NEXT_PUBLIC_RPC_URL),
  })
  : null;

/**
 * Registry Bridge Core: On-chain Minting Implementation
 */
export async function mintFromRegistry(
  to: `0x${string}`,
  id: bigint,
  amount: bigint,
  metadata: any
) {
  if (!walletClient || !account) {
    throw new Error("Registry Bridge Wallet not configured (PRIV_KEY missing).");
  }

  process.stdout.write(`Initiating on-chain mint for project ${metadata.projectID} (ID: ${id})...\n`);

  try {
    const { request } = await publicClient.simulateContract({
      account,
      address: REGISTRY_ADDRESS,
      abi: REGISTRY_ABI,
      functionName: "mintCarbonCredit",
      args: [to, id, amount, metadata],
    });

    const hash = await walletClient.writeContract(request);

    process.stdout.write(`Mint transaction submitted: ${hash}\n`);

    // Wait for confirmation to ensure state consistency
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return {
      success: true,
      hash,
      blockNumber: receipt.blockNumber,
      status: receipt.status,
    };
  } catch (error: any) {
    process.stderr.write(`Minting failed: ${error.message}\n`);
    return {
      success: false,
      error: error.message,
    };
  }
}
