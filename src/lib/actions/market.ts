"use server";

import { prisma } from "../db/prisma";



async function ensureProject(projectIdStr: string) {
  // 1. Try to find by projectId (the human readable unique ID)
  let project = await prisma.registryProject.findUnique({
    where: { projectId: projectIdStr }
  });

  if (!project && process.env.NODE_ENV === 'development') {
    // 2. Mock create if missing during development
    project = await prisma.registryProject.create({
      data: {
        projectId: projectIdStr,
        projectName: "Auto-Generated Test Project",
        methodology: "Nature-Based (VM0015)",
        vintageYear: 2024,
        totalVolume: 100000,
        isArticle6: true,
        developerId: "00000000-0000-0000-0000-000000000000" // System developer
      }
    });
  }

  return project;
}

async function ensureProfile(userId: string) {
  let profile = await prisma.profile.findUnique({
    where: { userId }
  });

  if (!profile) {
    // Create a default profile if it doesn't exist (for dev/test purposes)
    profile = await prisma.profile.create({
      data: {
        userId,
        organization: "Institutional Test Organization",
        isAuthorized: true, // Default to true for testing purposes
        role: "TRADER"
      }
    });
  }

  return profile;
}

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
    
    // DEV BYPASS: Allow mock user if in development and session is missing
    let effectiveUserId = user?.id;
    if (!effectiveUserId && process.env.NODE_ENV === 'development') {
      console.log("Using Mock Institutional User for RFQ development");
      effectiveUserId = "00000000-0000-0000-0000-000000000000";
    }

    if (!effectiveUserId) return { success: false, error: "Authentication required for institutional RFQ." };

    // 1. Get user profile (auto-create for testing)
    const profile = await ensureProfile(effectiveUserId);

    // 2. Resolve Project (auto-create for testing)
    const project = await ensureProject(projectId);
    if (!project) return { success: false, error: "Project not found in registry." };

    // 3. Create the RFQ
    const rfq = await prisma.rFQ.create({
      data: {
        buyerId: profile.id,
        projectId: project.id, // Linking to the CUID internal ID
        targetVolume: volume,
        targetPriceCents: 0,
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


export async function initiateAcquisition(projectId: string, volume: number) {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    // DEV BYPASS: Allow mock user if in development and session is missing
    let effectiveUserId = user?.id;
    if (!effectiveUserId && process.env.NODE_ENV === 'development') {
      console.log("Using Mock Institutional User for Acquisition development");
      effectiveUserId = "00000000-0000-0000-0000-000000000000";
    }

    if (!effectiveUserId) return { success: false, error: "Authentication required." };


    const profile = await ensureProfile(effectiveUserId);

    if (!profile.isAuthorized) {
      return { 
        success: false, 
        error: "UNAUTHORIZED", 
        message: "Your account is not yet authorized for direct acquisitions. Please complete institutional verification." 
      };
    }

    // 2. Resolve Project (auto-create for testing)
    const project = await ensureProject(projectId);
    if (!project) return { success: false, error: "Project not found in registry." };

    // 3. Create the transaction record
    const acquisition = await prisma.rFQ.create({
      data: {
        buyerId: profile.id,
        projectId: project.id, // Linking to the CUID internal ID
        targetVolume: volume,
        targetPriceCents: 2000,
        status: "MATCHED"
      }
    });

    return { success: true, acquisitionId: acquisition.id };
  } catch (error: any) {
    console.error("Acquisition Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getTransparencyLogs() {
  try {
    const logs = await prisma.rFQ.findMany({
      where: {
        status: { in: ["MATCHED", "SETTLED_ON_CHAIN", "OPEN"] }
      },
      include: {
        project: true
      },
      orderBy: { createdAt: "desc" },
      take: 10
    });

    return {
      success: true,
      data: logs.map(log => ({
        event: log.status === "MATCHED" || log.status === "SETTLED_ON_CHAIN" ? "Mint Sync" : "RFQ Log",
        proj: log.project.projectId,
        val: `+${log.targetVolume}`,
        time: log.createdAt,
        status: log.status === "SETTLED_ON_CHAIN" ? "Success" : "Pending Sync"
      }))
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getReserveStats() {
  try {
    const totalOnChain = await prisma.rFQ.aggregate({
      where: {
        status: "SETTLED_ON_CHAIN"
      },
      _sum: {
        targetVolume: true
      }
    });

    const totalReserved = await prisma.rFQ.aggregate({
      where: {
        status: "MATCHED"
      },
      _sum: {
        targetVolume: true
      }
    });

    // Baseline fallback + our dynamic data
    const baseline = 153850;
    const dynamic = (totalOnChain._sum.targetVolume || 0) + (totalReserved._sum.targetVolume || 0);

    return {
      success: true,
      onChainIssued: baseline + dynamic,
      registryLocked: 154000 + dynamic // Assuming lock happens first
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
