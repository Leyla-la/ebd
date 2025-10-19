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
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/employees", label: "Employees", icon: Users },
  { href: "/admin/payroll", label: "Payroll", icon: DollarSign },
  { href: "/admin/shifts", label: "Shifts", icon: Briefcase },
  { href: "/admin/cameras", label: "Cameras", icon: Camera },
  { href: "/admin/reports", label: "Reports", icon: BarChart2 },
  { href: "/admin/policies", label: "Policies", icon: Shield },
];

export function AppSidebar() {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "liquid-glass-sidebar transition-all overflow-hidden relative flex flex-col items-center py-4 shadow-2xl",
        // Spacing so it doesn't stick to navbar and aligns with main padding (reduced top, flush left)
        "mt-2 md:mt-4 mb-4 md:mb-8",
        // Keep it visible on scroll like a card
        "sticky top-2 md:top-4",
        // Responsive height to account for top/bottom margins
        "h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]",
        isOpen ? "w-72" : "w-24"
      )}
      style={{ minWidth: isOpen ? 288 : 96 }}
    >
      <span className="liquid-glass-shine" aria-hidden="true" />
      <style>{`
        .liquid-glass-sidebar {
          position: relative;
          background: rgba(255,255,255,0.5);
          border: 1.25px solid rgba(187,247,208,0.6);
          border-radius: 24px;
          box-shadow: 0 6px 28px 0 rgba(0,0,0,0.10);
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
            rgba(255,255,255,0.18) 50%,
            rgba(255,255,255,0) 100%
          );
          animation: shine 6s infinite linear;
        }
        @keyframes shine {
          0% { transform: translateX(0%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
      <div className="flex flex-col h-full w-full relative z-10">
        <nav className="flex-1 space-y-2.5 px-2 py-2">
          <TooltipProvider>
            {navItems.map((item) => {
              const isActive = !!pathname && (pathname === item.href || pathname.startsWith(item.href));
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center w-full gap-2 px-3 py-3 rounded-2xl border font-medium text-base select-none",
                        "transition-colors duration-200 ease-out",
                        isActive
                          ? "bg-green-50 border-green-300 text-green-800 shadow-sm"
                          : "bg-white/50 hover:bg-white/70 border-green-200 hover:border-green-300 text-gray-700 hover:text-gray-900",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/50",
                        !isOpen ? "justify-center" : "justify-start"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      style={{ minHeight: 48 }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-green-400" />
                      )}
                      <item.icon className={cn(
                        "h-5 w-5 min-w-[20px]",
                        isActive ? "text-green-700" : "text-gray-600 group-hover:text-gray-800"
                      )} />
                      {isOpen && (
                        <span className={cn(
                          "ml-3 whitespace-nowrap",
                          isActive ? "text-green-800" : "text-gray-800 group-hover:text-gray-900"
                        )}>
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
       
      </div>
    </aside>
  );
}
