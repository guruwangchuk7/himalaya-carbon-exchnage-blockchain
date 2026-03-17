import hre from "hardhat";
async function main() {
  const [deployer] = await (hre as any).ethers.getSigners();
  const HimalayaCarbonRegistry = await (hre as any).ethers.getContractFactory("HimalayaCarbonRegistry");
  const baseUri = "https://api.himalayacarbon.bt/metadata/";
  
  try {
    const deploymentTransaction = await HimalayaCarbonRegistry.getDeployTransaction(baseUri);
    const gasEstimate = await (hre as any).ethers.provider.estimateGas(deploymentTransaction);
    const feeData = await (hre as any).ethers.provider.getFeeData();
    
    const totalCost = gasEstimate * (feeData.gasPrice || BigInt(0));
    const costInEth = (hre as any).ethers.formatEther(totalCost);
    
    console.log(`Estimated Gas: ${gasEstimate.toString()}`);
    console.log(`Gas Price:      ${(hre as any).ethers.formatUnits(feeData.gasPrice || BigInt(0), "gwei")} gwei`);
    console.log(`Estimated Cost: ${costInEth} POL`);
  } catch (error: any) {
    console.error("Estimation failed:", error.message);
  }
}
main().catch(console.error);
