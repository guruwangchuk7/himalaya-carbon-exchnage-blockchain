import { NextResponse } from "next/server";
import { walletClient, account, publicClient } from "@/lib/blockchain";
import { REGISTRY_ABI, REGISTRY_ADDRESS } from "@/constants";

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
    const { participantAddress, status } = await request.json();

    if (!walletClient || !account) {
      return NextResponse.json({ error: "Institutional relayer not configured." }, { status: 500 });
    }

    if (!participantAddress || !participantAddress.startsWith("0x")) {
      return NextResponse.json({ error: "Invalid participant address." }, { status: 400 });
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
