"use server";

import { prisma } from "../db/prisma";

export async function getMarketplaceProjects() {
  try {
    const projects = await prisma.registryProject.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (projects.length === 0) {
      return { success: true, data: [], source: "DB_EMPTY" };
    }

    return { 
      success: true, 
      data: projects.map(p => ({
        id: p.projectId,
        name: p.projectName,
        vintage: p.vintageYear,
        methodology: p.methodology,
        authorized: p.isArticle6,
        available: `${p.totalVolume.toLocaleString()} tCO2e`,
        price: "$20.00", // Placeholder for actual market price logic
        image: p.methodology.toLowerCase().includes("forest") ? "/images/project-forest.png" : "/images/project-hydro.png",
        riskScore: "A+",
        coBenefits: ["SDG 13", "SDG 15"]
      })),
      source: "SUPABASE"
    };
  } catch (error: any) {
    console.error("Failed to fetch marketplace projects:", error);
    return { success: false, error: error.message, source: "ERROR" };
  }
}
