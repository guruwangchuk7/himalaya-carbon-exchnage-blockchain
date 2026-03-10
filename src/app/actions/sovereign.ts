"use server";

import { walletClient, account, publicClient } from "@/lib/blockchain";
import { REGISTRY_ABI, REGISTRY_ADDRESS } from "@/constants";
import { HimalayaSecurity } from "@/lib/security";

/**
 * Himalaya Carbon Engine: Sovereign Administrative Actions
 * 
 * Server Actions allow administrative tasks (whitelisting) to be 
 * executed without exposing the Sovereign Bridge Secrets to the client.
 */
export async function updateParticipantAuthorization(address: string, status: boolean) {
  // In production: Add session check to ensure the user is an AUTH_ADMIN
  // e.g. const session = await getServerSession(authOptions);

  if (!walletClient || !account) {
    throw new Error("Sovereign relayer not configured.");
  }

  try {
    process.stdout.write(`Server Action (Sovereign Portal): Whitelisting ${address} -> ${status}...\n`);

    const { request: txRequest } = await publicClient.simulateContract({
      account,
      address: REGISTRY_ADDRESS as `0x${string}`,
      abi: REGISTRY_ABI,
      functionName: "setParticipantAuthorization",
      args: [address as `0x${string}`, status],
    });

    const hash = await walletClient.writeContract(txRequest);

    // Record Sovereign Security Audit
    HimalayaSecurity.logAuditAction("PORTAL_WHITELIST_UPDATE", { address, status, hash });

    return { success: true, hash };
  } catch (error: any) {
    process.stderr.write(`Sovereign Portal Error: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}
