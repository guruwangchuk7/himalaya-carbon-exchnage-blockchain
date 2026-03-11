"use server";

import { syncProjectsToDb } from "../sync";

export async function triggerManualSync() {
  try {
    const result = await syncProjectsToDb();
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
