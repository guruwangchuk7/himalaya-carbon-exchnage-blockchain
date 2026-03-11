"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, polygon, polygonAmoy } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "@rainbow-me/rainbowkit/styles.css";

// Fallback RPCs for development (if env vars are missing)
const POLYGON_RPC = process.env.NEXT_PUBLIC_RPC_URL_MAINNET || "https://polygon-rpc.com";
const AMOY_RPC = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc-amoy.polygon.technology";

const config = getDefaultConfig({
  appName: "Himalaya Carbon Exchange",
  projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID || "c0f4f9a39f60f64c4832537f59d9c22e", // Standard public project ID for dev
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(POLYGON_RPC),
    [polygonAmoy.id]: http(AMOY_RPC),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#22c55e", // brand green
            borderRadius: "large",
          })}
        >
          {/* 
             Only render children when mounted to prevent wallet extensions 
             (like Phantom/MetaMask) from triggering errors during initial 
             page load/hydration. Returns null initially to match server-side 
             rendering state.
          */}
          {mounted ? children : null}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
