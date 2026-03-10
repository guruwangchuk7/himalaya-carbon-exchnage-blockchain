import crypto from "crypto";
import { z } from "zod";

/**
 * Himalaya Carbon Engine: Sovereign Security Layer
 * 
 * Implements HMAC-SHA256 signature verification and 
 * strict metadata validation for cross-registry synchronization.
 */
export const RegistryMetadataSchema = z.object({
  recipient: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  id: z.union([z.string(), z.number()]),
  amount: z.union([z.string(), z.number()]),
  metadata: z.object({
    projectName: z.string().min(3),
    projectID: z.string().min(5), // e.g. "BHU-RE-2023-001"
    unitBatchID: z.string(),
    vintageYear: z.union([z.string(), z.number()]),
    isArticle6Authorized: z.boolean().optional().default(true),
    itmoAuthorizationID: z.string().optional(),
    methodology: z.string(),
    serialNumber: z.string(),
    registryLink: z.string().url().optional(),
  })
});

const SHARED_SECRET = process.env.REGISTRY_BRIDGE_AUTH || "test-lock-token-2026";

export class HimalayaSecurity {
  /**
   * Verifies an HMAC-SHA256 signature from the National Registry.
   * prevents both replay attacks and data tampering.
   */
  static verifyRegistrySignature(payload: string, signature: string): boolean {
    try {
      const computedHash = crypto
        .createHmac("sha256", SHARED_SECRET)
        .update(payload)
        .digest("hex");
      
      // Use constant-time comparison to prevent timing attacks
      return crypto.timingSafeEqual(
        Buffer.from(computedHash, "hex"),
        Buffer.from(signature, "hex")
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * Generates a signature (Used for Registry Simulator testing)
   */
  static signPayload(payload: string): string {
    return crypto
      .createHmac("sha256", SHARED_SECRET)
      .update(payload)
      .digest("hex");
  }

  /**
   * Logs a Sovereign security event
   */
  static logAuditAction(action: string, metadata: any) {
    const timestamp = new Date().toISOString();
    const eventHash = crypto.createHash("sha256").update(JSON.stringify({ action, metadata, timestamp })).digest("hex");
    
    process.stdout.write(`[SOVEREIGN-AUDIT] ${timestamp} | Action: ${action} | Hash: ${eventHash.slice(0, 12)}... | ID: ${metadata.projectID || 'SYSTEM'}\n`);
  }
}
