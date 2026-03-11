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

export async function submitRFQ(projectId: string, volume: number) {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Authentication required for institutional RFQ." };

    // 1. Get user profile
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id }
    });

    if (!profile) return { success: false, error: "Institutional profile not found." };

    // 2. Create the RFQ
    const rfq = await prisma.rFQ.create({
      data: {
        buyerId: profile.id,
        projectId: projectId, // This should be the database ID or unique code
        targetVolume: volume,
        targetPriceCents: 0, // Negotiable starting point
        status: "OPEN"
      }
    });

    return { success: true, rfqId: rfq.id };
  } catch (error: any) {
    console.error("RFQ Submission Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserRFQs() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, data: [] };

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id }
    });

    if (!profile) return { success: false, data: [] };

    const rfqs = await prisma.rFQ.findMany({
      where: { buyerId: profile.id },
      include: { project: true },
      orderBy: { createdAt: "desc" }
    });

    return { success: true, data: rfqs };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

