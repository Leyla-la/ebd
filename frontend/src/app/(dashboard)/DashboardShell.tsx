"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
            <div className="liquid-glass-card w-full h-full min-h-[80vh] rounded-3xl p-4 md:p-8 relative overflow-hidden">
              <span className="liquid-glass-shine" aria-hidden="true" />
              <div className="relative z-10">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardShell;
