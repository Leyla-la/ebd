import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/layout/MainLayout";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Provider>
          <MainLayout>{children}</MainLayout>
        </Provider>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
