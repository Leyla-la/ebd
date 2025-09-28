"use client";

import Link from "next/link";
import {
  Home,
  Users,
  DollarSign,
  Shield,
  Camera,
  Briefcase,
  BarChart2,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import LiquidGlass from "liquid-glass-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/admin/employees", label: "Employees", icon: Users },
  { href: "/admin/payroll", label: "Payroll", icon: DollarSign },
  { href: "/admin/shifts", label: "Shifts", icon: Briefcase },
  { href: "/admin/cameras", label: "Cameras", icon: Camera },
  { href: "/admin/reports", label: "Reports", icon: BarChart2 },
  { href: "/admin/policies", label: "Policies", icon: Shield },
];

export function AppSidebar() {
  const { isOpen } = useSidebar();

  return (
    <LiquidGlass
      displacementScale={70}
      blurAmount={0.09}
      saturation={170}
      elasticity={0.18}
      mode="prominent"
      cornerRadius={0}
      style={{ height: "100vh", position: "relative" }}
      className={cn(
        "border-r border-white/30 shadow-lg transition-all",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-full flex-col gap-2">
        <nav className="flex-1 space-y-2 px-4 py-4">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "w-full justify-start bg-white/10 hover:bg-white/20 transition-colors rounded-md border border-white/20",
                      !isOpen && "justify-center"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {isOpen && <span className="ml-4">{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto space-y-1 px-4 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    "w-full justify-start bg-white/10 hover:bg-white/20 transition-colors rounded-md border border-white/20",
                    !isOpen && "justify-center"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  {isOpen && <span className="ml-4">Settings</span>}
                </Link>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
    </LiquidGlass>
  );
}
