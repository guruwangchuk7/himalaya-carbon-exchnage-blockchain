import { NextResponse } from "next/server";
import { decodeEventLog } from "viem";
import { publicClient } from "@/lib/blockchain";
import { REGISTRY_ABI, REGISTRY_ADDRESS } from "@/constants";
import { generateImpactCertificate } from "@/lib/certificates";

/**
 * Verification Endpoint for Retirement
 * 
 * Securely verifies an on-chain burn event and officially 
 * records it in the registry system, issuing a digital certificate.
 */
export async function POST(request: Request) {
  try {
    const { txHash } = await request.json();

    if (!txHash || !txHash.startsWith("0x")) {
      return NextResponse.json({ error: "Invalid transaction hash." }, { status: 400 });
    }

    process.stdout.write(`Retire Verification: Processing certificate for ${txHash}...\n`);

    // 1. Verify existence of transaction and extract logs
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash as `0x${string}` });

    if (receipt.status !== "success") {
      return NextResponse.json({ error: "Transaction verification failed (Status: Reverted)." }, { status: 422 });
    }

    // 2. Locate the CarbonRetired event
    let retirementData: any = null;

    for (const log of receipt.logs) {
      if (log.address.toLowerCase() === REGISTRY_ADDRESS.toLowerCase()) {
        try {
          const decodedLog = decodeEventLog({
            abi: REGISTRY_ABI,
            data: log.data,
            topics: log.topics,
            eventName: "CarbonRetired",
          }) as any;
          
          if (decodedLog) {
            retirementData = decodedLog.args;
            break; 
          }
        } catch (e) {
          // Log might be a different event from the same contract
          continue;
        }
      }
    }

    if (!retirementData) {
       return NextResponse.json({ error: "CarbonRetired event not found in logs." }, { status: 404 });
    }

    // 3. Generate Official Certificate using the found data
    // In production, this would also trigger the CAD Trust API push.
    const certificate = await generateImpactCertificate(txHash as `0x${string}`);

    if (!certificate) {
      return NextResponse.json({ error: "Impact certificate generation failed." }, { status: 500 });
    }

    // Patch the amount and beneficiary from the actual event
    certificate.amount = retirementData.amount.toString();
    certificate.beneficiary = retirementData.beneficiary;

    process.stdout.write(`Retire Verification: SUCCESS. Certificate ${certificate.certificateId} issued.\n`);

    return NextResponse.json({
      status: "Synchronized",
      certificate,
      registryStatus: "Retired / Locked",
    });

  } catch (error: any) {
    process.stderr.write(`Retire Verification Error: ${error.message}\n`);
    return NextResponse.json({ error: "Bridge Verification Error." }, { status: 500 });
  }
}
