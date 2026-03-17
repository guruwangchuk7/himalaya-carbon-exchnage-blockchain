import hre from "hardhat";
const ethers = (hre as any).ethers;

async function main() {
  console.log("Deploying HimalayaCarbonRegistry...");

  const HimalayaCarbonRegistry = await ethers.getContractFactory("HimalayaCarbonRegistry");
  const baseUri = "https://api.himalayacarbon.bt/metadata/";
  const registry = await HimalayaCarbonRegistry.deploy(baseUri);

  await registry.waitForDeployment();

  const address = await registry.getAddress();
  console.log(`HimalayaCarbonRegistry deployed to: ${address}`);
  
  console.log("\nNext steps:");
  console.log(`1. Copy this address: ${address}`);
  console.log(`2. Update NEXT_PUBLIC_REGISTRY_ADDRESS in your .env file.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
