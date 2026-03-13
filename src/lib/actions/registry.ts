"use server";

import { prisma } from "../db/prisma";
import { HimalayaSecurity } from "../security";

export async function getRegistryProjects() {
  try {
    const projects = await prisma.registryProject.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: projects };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function authorizeProjectArticle6(id: string, isAuthorized: boolean) {
  try {
    // In production, verify admin session
    const project = await prisma.registryProject.update({
      where: { id },
      data: { isArticle6: isAuthorized }
    });

    HimalayaSecurity.logAuditAction("ARTICLE_6_AUTHORIZATION", { 
      projectId: project.projectId, 
      status: isAuthorized 
    });

    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function syncCADTrust(projectId: string) {
  try {
    // Mock CAD Trust sync
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    HimalayaSecurity.logAuditAction("CAD_TRUST_SYNC", { projectId });
    
    return { 
      success: true, 
      gin: `BT-${Math.floor(1000 + Math.random() * 9000)}-${['X', 'Y', 'Z'][Math.floor(Math.random() * 3)]}`
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
