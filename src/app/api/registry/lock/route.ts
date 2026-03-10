import { NextResponse } from "next/server";
import { mintFromRegistry } from "@/lib/blockchain";

// Institutional API Configuration (Keep in .env!)
const REGISTRY_AUTH_TOKEN = process.env.REGISTRY_BRIDGE_AUTH || "test-lock-token-2026";

/**
 * Himalaya Carbon Registry Bridge Endpoint
 * 
 * Receives "Lock" signals from the National Carbon Registry
 * Triggers on-chain minting of the corresponding Article 6 credits.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("Authorization");

    // 1. Authenticate National Registry Signal
    if (authHeader !== `Bearer ${REGISTRY_AUTH_TOKEN}`) {
      process.stderr.write("Unauthorized access attempt to Registry Lock endpoint.\n");
      return NextResponse.json({ error: "Unauthorized registry signal." }, { status: 401 });
    }

    const { recipient, id, amount, metadata } = body;

    // 2. Validate Metadata Structure (Article 6 criteria)
    if (!recipient || !id || !amount || !metadata?.projectID) {
      return NextResponse.json({ error: "Incomplete Article 6 metadata provided." }, { status: 400 });
    }

    // 3. Transform to Smart Contract Metadata Format
    // enum ProjectStatus { Pending, Authorized, Issued, Retired, Cancelled, Transferred }
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
    
    // Convert to proper BigInts for viem
    const result = await mintFromRegistry(
      recipient as `0x${string}`, 
      BigInt(id), 
      BigInt(amount), 
      contractMetadata
    );

    if (result.success) {
      process.stdout.write(`Registry Bridge: SUCCESSFULLY MINTED credits on-chain. TX: ${result.hash}\n`);
      
      // Phase 2 Success: Respond to the Registry with the on-chain receipt
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
