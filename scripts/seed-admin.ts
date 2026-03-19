import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import "dotenv/config";

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env')
}

const adapter = new PrismaMariaDb(connectionString)
const prisma = new PrismaClient({ adapter })

async function forceCreateAdmin() {
  const email = "guruwangchuk1234@gmail.com";
  
  // Use a temporary ID since we don't have the Supabase ID yet
  // Once you log in successfully later, this will sync up
  const userId = "admin-dev-sync-" + Date.now();

  console.log(`🚀 Force creating/updating Admin profile for: ${email}`)

  const profile = await (prisma.profile as any).upsert({
    where: { email },
    update: {
      role: 'GOVERNMENT_ADMIN',
      isAuthorized: true
    },
    create: {
      userId,
      email,
      organization: "National Carbon Registry of Bhutan",
      role: 'GOVERNMENT_ADMIN',
      isAuthorized: true
    }
  })

  console.log(`✅ Success! You are now a Government Admin.`)
}

forceCreateAdmin()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
