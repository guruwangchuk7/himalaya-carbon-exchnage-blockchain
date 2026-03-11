"use server";

import { HimalayaSecurity } from "@/lib/security";

export async function generateTestSignature(payloadStr: string) {
  // Use the established Sovereign Security Layer to sign the payload
  // This simulates the National Registry securely signing their webhooks with the shared secret
  const signature = HimalayaSecurity.signPayload(payloadStr);
  return signature;
}
