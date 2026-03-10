import { NextResponse } from "next/server";

/**
 * Institutional Market: Request for Quote (RFQ)
 * 
 * Handles high-volume institutional trade requests that require 
 * manual sovereign approval and custom pricing.
 */
export async function POST(request: Request) {
  try {
    const { buyer, projectId, amount, targetPrice, purpose } = await request.json();

    if (!buyer || !projectId || !amount) {
      return NextResponse.json({ error: "Incomplete RFQ parameters." }, { status: 400 });
    }

    // Process RFQ (In production: Save to database for registry agents to review)
    process.stdout.write(`Market RFQ: New high-volume request for ${projectId} from ${buyer} (${amount} units)...\n`);

    const rfqId = `RFQ-BT-${Math.floor(Math.random() * 9000) + 1000}`;

    return NextResponse.json({
      status: "Submitted",
      rfqId,
      message: "Our sovereign brokers will review your quote request and contact you within 24 hours.",
      nextSteps: "Please ensure your institutional KYB is up-to-date in the dashboard.",
    });

  } catch (err: any) {
    process.stderr.write(`Market RFQ Error: ${err.message}\n`);
    return NextResponse.json({ error: "Failed to submit RFQ." }, { status: 500 });
  }
}
