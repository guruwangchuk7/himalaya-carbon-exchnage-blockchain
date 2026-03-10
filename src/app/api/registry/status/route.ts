import { NextResponse } from "next/server";

/**
 * Mock National Carbon Registry Status API
 * In production: Connects to the ministry's database for official locked serial numbers.
 */
export async function GET() {
  const mockRegistryData = {
    totalUnitsLocked: 154000, // Aggregate tons locked for on-chain issuance
    activeSerialBatches: 12,
    lastAuditTimestamp: new Date().toISOString(),
    isAuthoritative: true,
    jurisdiction: "Bhutan",
    status: "Healthy",
  };

  return NextResponse.json(mockRegistryData);
}
