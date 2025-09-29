"use client";
import DashboardShell from "./DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SidebarProvider in DashboardShell will handle sidebar state (optionally read cookie client-side if needed)
  return <DashboardShell>{children}</DashboardShell>;
}
