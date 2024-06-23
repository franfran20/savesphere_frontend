"use client";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { meterTestnet } from "wagmi/chains";
import { WagmiProvider } from "wagmi";

const config = getDefaultConfig({
  appName: "SafeSpace",
  projectId: "d8be04a2123a126e74060688df6f3f9d",
  chains: [meterTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </div>

        <div className="mobile-not-supported">No Support For Mobile Yet</div>
      </body>
    </html>
  );
}
