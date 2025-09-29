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
    <aside
      className={cn(
        "liquid-glass-sidebar transition-all overflow-hidden relative flex flex-col items-center py-4 shadow-2xl",
        isOpen ? "w-64" : "w-20"
      )}
      style={{ height: "100vh", minWidth: isOpen ? 240 : 64 }}
    >
      <span className="liquid-glass-shine" aria-hidden="true" />
      <style>{`
        .liquid-glass-sidebar {
          position: relative;
          background: rgba(255,255,255,0.18);
          border: 1.5px solid rgba(255,255,255,0.22);
          border-radius: 22px;
          box-shadow: 0 8px 40px 0 rgba(0,0,0,0.13);
          backdrop-filter: blur(18px) saturate(200%);
          -webkit-backdrop-filter: blur(18px) saturate(200%);
        }
        .liquid-glass-sidebar::before {
          content: '';
          pointer-events: none;
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.35) 50%,
            rgba(255,255,255,0) 100%
          );
          animation: shine 3s infinite linear;
        }
        @keyframes shine {
          0% { transform: translateX(0%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
      <div className="flex flex-col h-full w-full relative z-10">
        <nav className="flex-1 space-y-2 px-2 py-2">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-0.5 w-full px-2 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl border border-white/20 text-gray-800 font-medium text-base",
                      !isOpen ? "justify-center" : "justify-start"
                    )}
                    style={{ minHeight: 44 }}
                  >
                    <item.icon className="h-5 w-5 min-w-[20px]" />
                    {isOpen && <span className="ml-4 whitespace-nowrap">{item.label}</span>}
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
       
      </div>
    </aside>
  );
}
