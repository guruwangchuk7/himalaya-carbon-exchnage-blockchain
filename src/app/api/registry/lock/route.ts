import { NextResponse } from "next/server";
import { z } from "zod";
import { HimalayaSecurity, RegistryMetadataSchema } from "@/lib/security";
import { mintFromRegistry } from "@/lib/blockchain";

/**
 * Himalaya Carbon Registry Bridge Endpoint
 * 
 * Receives "Lock" signals from the National Carbon Registry
 * Triggers on-chain minting of the corresponding Article 6 credits.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("X-Registry-Signature");

    // 1. Authenticate with HMAC-SHA256 (Sovereign Trust Layer)
    if (!signature || !HimalayaSecurity.verifyRegistrySignature(rawBody, signature)) {
      process.stderr.write("Unauthorized or Tampered registry signal detected.\n");
      return NextResponse.json({ error: "Invalid signature. Sovereign trust violation." }, { status: 401 });
    }

    const body = JSON.parse(rawBody);

    // 2. Validate Metadata via Zod (Strict Integrity)
    const validation = RegistryMetadataSchema.safeParse(body);
    if (!validation.success) {
      process.stderr.write(`Metadata validation failed: ${validation.error.message}\n`);
      return NextResponse.json({ error: "Article 6 schema violation.", details: validation.error.format() }, { status: 400 });
    }

    const { recipient, id, amount, metadata } = validation.data;

    // 3. Transform to Smart Contract Metadata Format
    const contractMetadata = {
      projectName: metadata.projectName,
      projectID: metadata.projectID,
      unitBatchID: metadata.unitBatchID,
      vintageYear: BigInt(metadata.vintageYear),
      status: 2, // 2 = Issued
      isArticle6Authorized: metadata.isArticle6Authorized ?? true,
      correspondingAdjustmentFinalized: false,
      itmoAuthorizationID: metadata.itmoAuthorizationID || "",
      methodology: metadata.methodology,
      serialNumber: metadata.serialNumber,
      registryLink: metadata.registryLink || "",
      totalIssuance: BigInt(amount),
      retiredAmount: BigInt(0),
    };

    // 4. Trigger Secure On-chain Minting via Relayer Wallet
    process.stdout.write(`Registry Bridge: Synchronizing ${amount} units for ${metadata.projectID}...\n`);
    
    const result = await mintFromRegistry(
      recipient as `0x${string}`, 
      BigInt(id), 
      BigInt(amount), 
      contractMetadata
    );

    if (result.success) {
      process.stdout.write(`Registry Bridge: SUCCESSFULLY MINTED credits on-chain. TX: ${result.hash}\n`);
      
      // 5. Log Administrative Audit Action
      HimalayaSecurity.logAuditAction("MINT_VINTAGE", { projectID: metadata.projectID, amount, hash: result.hash });

      return NextResponse.json({
        status: "Synchronized",
        message: "Article 6.2 Carbon Credits minted successfully.",
        hash: result.hash,
        block: Number(result.blockNumber),
        registryBatch: metadata.unitBatchID,
      });
    } else {
      process.stderr.write(`Registry Bridge: FAILED to mint on-chain. ${result.error}\n`);
      return NextResponse.json({ 
        status: "Failed", 
        error: result.error 
      }, { status: 500 });
    }

  } catch (err: any) {
    process.stderr.write(`Registry Bridge Error: ${err.message}\n`);
    return NextResponse.json({ error: "Internal Bridge Error." }, { status: 500 });
  }
}
