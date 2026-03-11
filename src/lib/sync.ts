import { publicClient } from "./blockchain";
import { prisma } from "./db/prisma";
import { REGISTRY_ABI, REGISTRY_ADDRESS } from "@/constants";

/**
 * Himalaya Carbon Sync Engine
 * 
 * Synchronizes on-chain carbon project metadata with the off-chain Postgres database (Supabase).
 * This enables fast discovery, filtering, and indexing of carbon assets.
 */
export async function syncProjectsToDb() {
  process.stdout.write("Sync Engine: Starting project synchronization...\n");

  try {
    // 1. Fetch all project IDs from the smart contract
    const projectIds = await publicClient.readContract({
      address: REGISTRY_ADDRESS as `0x${string}`,
      abi: REGISTRY_ABI,
      functionName: "getProjectIds",
    }) as bigint[];

    process.stdout.write(`Sync Engine: Found ${projectIds.length} projects on-chain.\n`);

    const syncResults = [];

    // 2. Iterate and upsert each project's metadata
    for (const id of projectIds) {
      const metadata: any = await publicClient.readContract({
        address: REGISTRY_ADDRESS as `0x${string}`,
        abi: REGISTRY_ABI,
        functionName: "getProject",
        args: [id],
      });

      // Map on-chain enum status (0-5) to our DB State
      // 0=None, 1=Authorized, 2=Issued, 3=Retired, 4=Cancelled, 5=Transferred
      const stateMap: Record<number, any> = {
        0: "DRAFT",
        1: "APPROVED",
        2: "ISSUED_ON_CHAIN",
        3: "ISSUED_ON_CHAIN", // Retired is handled by volume balance in detailed apps
        4: "DRAFT",
        5: "ISSUED_ON_CHAIN",
      };

      const result = await prisma.registryProject.upsert({
        where: { projectId: metadata.projectID },
        update: {
          projectName: metadata.projectName,
          methodology: metadata.methodology,
          vintageYear: Number(metadata.vintageYear),
          totalVolume: Number(metadata.totalIssuance),
          status: stateMap[metadata.status] || "ISSUED_ON_CHAIN",
          isArticle6: metadata.isArticle6Authorized,
        },
        create: {
          projectId: metadata.projectID,
          projectName: metadata.projectName,
          methodology: metadata.methodology,
          vintageYear: Number(metadata.vintageYear),
          totalVolume: Number(metadata.totalIssuance),
          status: stateMap[metadata.status] || "ISSUED_ON_CHAIN",
          isArticle6: metadata.isArticle6Authorized,
          developerId: "00000000-0000-0000-0000-000000000000", // Fallback for system-detected
        },
      });

      syncResults.push(result);
    }

    process.stdout.write(`Sync Engine: Successfully synchronized ${syncResults.length} projects.\n`);
    return { success: true, count: syncResults.length };
  } catch (error: any) {
    process.stderr.write(`Sync Engine Error: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}
