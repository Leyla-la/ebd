import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AOSProvider from "./AOSProvider";
import AuthProvider from "./(auth)/auth-provider";

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
        <StoreProvider>
          <AuthProvider>
            <AOSProvider>{children}</AOSProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
