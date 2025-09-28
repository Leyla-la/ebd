
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AOSProvider from "./AOSProvider";
import AuthProvider from "./(auth)/auth-provider";
import NotificationListener from "@/components/NotificationListener";
import LiquidGlass from "liquid-glass-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EBD Corp",
  description: "Employee Behavior Detection System",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LiquidGlass
          displacementScale={50}
          blurAmount={0.07}
          saturation={170}
          elasticity={0.15}
          mode="prominent"
          cornerRadius={0}
          style={{ minHeight: "100vh", width: "100vw" }}
        >
          <StoreProvider>
            <AuthProvider>
              <NotificationListener />
              <AOSProvider>{children}</AOSProvider>
            </AuthProvider>
          </StoreProvider>
        </LiquidGlass>
      </body>
    </html>
  );
}
