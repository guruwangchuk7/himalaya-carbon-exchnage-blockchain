import { NextResponse } from "next/server";

export async function GET() {
  const mockStatus = {
    connectedNodes: 142,
    activeExchanges: 28,
    registryParticipation: "High",
    bhutanGatewayStatus: "Optimal",
    harmonizedEntries: 14500,
    lastGlobalUpdate: new Date().toISOString(),
  };

  return NextResponse.json(mockStatus);
}
