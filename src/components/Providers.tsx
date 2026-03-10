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

const config = getDefaultConfig({
  appName: "Himalaya Carbon Exchange",
  projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_URL_MAINNET),
    [polygonAmoy.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
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
