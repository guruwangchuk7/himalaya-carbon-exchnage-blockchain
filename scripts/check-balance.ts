import hre from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const [deployer] = await (hre as any).ethers.getSigners();
  const address = deployer.address;
  const balance = await (hre as any).ethers.provider.getBalance(address);
  const formattedBalance = (hre as any).ethers.formatEther(balance);
  
  console.log(`-------------------------------------------`);
  console.log(`Deployer Address: ${address}`);
  console.log(`Balance:          ${formattedBalance} POL`);
  console.log(`-------------------------------------------`);
  
  if (balance > BigInt(0)) {
    console.log("🚀 SUCCESS: Funds detected! Run 'npm run deploy-amoy' now.");
  } else {
    console.log("⏳ WAITING: Still 0 POL. Faucets can take up to 2-3 minutes.");
  }
}
main().catch(console.error);
