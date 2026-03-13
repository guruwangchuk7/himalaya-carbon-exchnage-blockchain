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
    // Some wallet extensions (like Martian) incorrectly call chrome.runtime.sendMessage 
    // from the webpage context without an extension ID. This shim prevents the 
    // resulting Runtime TypeError which can block execution.
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.chrome?.runtime && !window.chrome.runtime.id) {
        // @ts-ignore
        const original = window.chrome.runtime.sendMessage;
        // @ts-ignore
        window.chrome.runtime.sendMessage = function (id: any, msg: any, opts: any, cb: any) {
          if (typeof id !== "string") {
            // Redirect the call or ignore if it's missing the required Extension ID
            return;
          }
          return original.apply(this, [id, msg, opts, cb]);
        };
      }
    } catch (e) {
      /* ignore shim errors */
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#22c55e", // brand green
            borderRadius: "large",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
