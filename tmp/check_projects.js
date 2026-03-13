const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.registryProject.count();
  console.log(`TOTAL PROJECTS: ${count}`);
  const projects = await prisma.registryProject.findMany();
  console.log(JSON.stringify(projects, null, 2));
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
