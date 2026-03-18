import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Use the ID you just copied from Supabase!
  const ADMIN_ID = "73cfa5c0-4680-4e6e-a914-6e8da920427d"; 

  console.log(`Promoting User ${ADMIN_ID} to Sovereign Operator...`);

  await prisma.profile.upsert({
    where: { userId: ADMIN_ID },
    update: {
      role: "OPERATOR",
      isAuthorized: true,
      organization: "Bhutan Central Carbon Registry"
    },
    create: {
      userId: ADMIN_ID,
      role: "OPERATOR",
      isAuthorized: true,
      organization: "Bhutan Central Carbon Registry"
    }
  });

  console.log("🚀 SUCCESS: You are now a FIXED ADMIN.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
