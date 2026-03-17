import { startHarmonyWatcher } from "../src/lib/harmony";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("----------------------------------------------------------------");
console.log("    Himalaya Carbon Exchange - Sovereign Harmony Watcher        ");
console.log("----------------------------------------------------------------");
console.log("Status: Initializing...");
console.log(`Target Registry: ${process.env.NEXT_PUBLIC_REGISTRY_ADDRESS}`);
console.log(`CAD Trust API:   ${process.env.NEXT_PUBLIC_CAD_TRUST_API_URL || "https://api.harmony.cadtrust.org/v2"}`);
console.log("----------------------------------------------------------------");

try {
  const unwatch = startHarmonyWatcher();
  
  console.log("Status: RUNNING");
  console.log("Monitoring 'CarbonRetired' events. Press Ctrl+C to stop.");
  
  // Keep the process alive
  process.stdin.resume();
  
  process.on('SIGINT', () => {
    console.log("\nStatus: Shutting down Harmony Watcher...");
    unwatch();
    process.exit(0);
  });

} catch (error: any) {
  console.error("CRITICAL: Failed to start Harmony Watcher.");
  console.error(error.message);
  process.exit(1);
}
