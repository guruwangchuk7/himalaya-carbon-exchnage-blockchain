import { NextResponse } from "next/server";
import { z } from "zod";
import { HimalayaSecurity } from "@/lib/security";
import { walletClient, account, publicClient } from "@/lib/blockchain";
import { REGISTRY_ABI, REGISTRY_ADDRESS } from "@/constants";

const ParticipantUpdateSchema = z.object({
  participantAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  status: z.boolean(),
});

/**
 * Institutional Participant Management Endpoint
 * 
 * Allows the National Registry to manage the whitelist of wallets 
 * authorized to trade and receive carbon credits.
 */
export async function GET(request: Request) {
  // Mock listing: In production, we'd fetch participants from an event indexer
  const mockParticipants = [
    { address: "0x8E285434FBe799a4c84433E78b179047144eCDB1", name: "National Bank of Bhutan", authorized: true },
    { address: "0x7a2d48c087265882618D80dF2c159847144eCDB1", name: "Druk Green Power Corp", authorized: true },
    { address: "0x123d48c087265882618D80dF2c159847144eCDB1", name: "Bhutan Carbon Fund", authorized: false },
  ];

  return NextResponse.json(mockParticipants);
}

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

    // 2. Validate Payload (Strict Integrity)
    const validation = ParticipantUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid participant payload.", details: validation.error.format() }, { status: 400 });
    }

    const { participantAddress, status } = validation.data;

    if (!walletClient || !account) {
      return NextResponse.json({ error: "Institutional relayer not configured." }, { status: 500 });
    }

    process.stdout.write(`Registry Admin: Updating authorization for ${participantAddress} to ${status}...\n`);

    const { request: txRequest } = await publicClient.simulateContract({
      account,
      address: REGISTRY_ADDRESS as `0x${string}`,
      abi: REGISTRY_ABI,
      functionName: "setParticipantAuthorization",
      args: [participantAddress as `0x${string}`, status],
    });

    const hash = await walletClient.writeContract(txRequest);
    
    process.stdout.write(`Registry Admin: Transaction submitted ${hash}\n`);

    // 3. Log Administrative Security Action
    HimalayaSecurity.logAuditAction("WHITELIST_UPDATE", { participantAddress, status, hash });

    return NextResponse.json({
      status: "Submitted",
      hash,
      message: `Updating authorization for ${participantAddress} is in progress.`,
    });

  } catch (err: any) {
    process.stderr.write(`Registry Admin Error: ${err.message}\n`);
    return NextResponse.json({ error: "Failed to update participant authorization." }, { status: 500 });
  }
}
