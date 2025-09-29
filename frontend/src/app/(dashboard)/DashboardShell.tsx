"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import LiquidGlass from "liquid-glass-react";

interface DashboardShellProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children, defaultOpen = true }) => {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col" style={{ paddingTop: 60 }}>
        <Navbar />
        <div className="flex flex-1 min-h-0">
          <AppSidebar />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <LiquidGlass
              displacementScale={60}
              blurAmount={0.08}
              saturation={170}
              elasticity={0.16}
              mode="prominent"
              cornerRadius={32}
              className="w-full h-full min-h-[80vh] border border-white/30 bg-white/20 shadow-xl backdrop-blur-[16px] p-4 md:p-8"
              style={{ WebkitBackdropFilter: "blur(16px) saturate(180%)" }}
            >
              {children}
            </LiquidGlass>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardShell;
