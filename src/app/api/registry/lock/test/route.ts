import { NextResponse } from "next/server";
import { HimalayaSecurity } from "@/lib/security";
const BRIDGE_URL = "http://localhost:3000/api/registry/lock";

/**
 * National Registry Simulator (Tester)
 * 
 * Simulates the National Carbon Registry Council (NCRC) of Bhutan 
 * locking credits and sending a "Lock" signal to the Himalaya Carbon Engine.
 */
export async function POST() {
  const mockLockSignal = {
    recipient: "0x8E285434FBe799a4c84433E78b179047144eCDB1", // Participant/Broker Wallet
    id: 1, // Project ID (Token ID)
    amount: 50000, // 50,000 tCO2e
    metadata: {
      projectName: "Punakha Reforestation Initiative",
      projectID: "BT-FOR-2026-001",
      unitBatchID: "NCRC-2026-BHU-B1",
      vintageYear: 2026,
      itmoAuthorizationID: "BT-SG-2026-001",
      methodology: "AR-ACM0003: Afforestation and reforestation",
      serialNumber: "BT-2026-0001-5000",
      registryLink: "https://carbon-registry.gov.bt/projects/BT-FOR-2026-001",
      isArticle6Authorized: true,
    }
  };

  try {
    process.stdout.write("Registry Simulator: Generating Signed Sovereign Signal...\n");
    
    // 1. Prepare and stringify the payload
    const payload = JSON.stringify(mockLockSignal);

    // 2. Compute the HMAC Signature
    const signature = HimalayaSecurity.signPayload(payload);

    // 3. Dispatch to the Bridge with Protected Headers
    const response = await fetch(BRIDGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Registry-Signature": signature,
      },
      body: payload,
    });

    const data = await response.json();

    if (response.ok) {
      process.stdout.write(`Registry Simulator: SUCCESS. Credits synchronized. On-chain TX: ${data.hash}\n`);
      return NextResponse.json({
        simulation: "Success",
        registrySignal: "Locked",
        engineResponse: data,
      });
    } else {
      process.stderr.write(`Registry Simulator: FAILED. Engine error: ${data.error}\n`);
      return NextResponse.json({
        simulation: "Failed",
        reason: data.error,
      }, { status: response.status });
    }

  } catch (error: any) {
    process.stderr.write(`Registry Simulator Error: ${error.message}\n`);
    return NextResponse.json({ simulation: "Error", message: error.message }, { status: 500 });
  }
}
