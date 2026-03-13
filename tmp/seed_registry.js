const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const devId = "00000000-0000-0000-0000-000000000000"; // Dummy ID

  const projects = [
    { projectId: "BHU-RE-2023-001", projectName: "Himalaya Solar Farm", methodology: "ACM0002", vintageYear: 2023, totalVolume: 250000, isArticle6: true, developerId: devId },
    { projectId: "BHU-BIO-2024-004", projectName: "Bhutan Biowaste Energy", methodology: "ACM0010", vintageYear: 2024, totalVolume: 120000, isArticle6: false, developerId: devId },
    { projectId: "BHU-RE-2022-012", projectName: "Gelephu Wind Cluster", methodology: "ACM0002", vintageYear: 2022, totalVolume: 500000, isArticle6: true, developerId: devId },
    { projectId: "BHU-FOR-2023-009", projectName: "National Forest Reforestation", methodology: "AR-ACM0003", vintageYear: 2023, totalVolume: 75000, isArticle6: true, developerId: devId },
  ];

  for (const p of projects) {
    await prisma.registryProject.upsert({
      where: { projectId: p.projectId },
      update: { isArticle6: p.isArticle6 },
      create: p
    });
  }

  console.log("Registry Projects Seeded Successfully.");
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
