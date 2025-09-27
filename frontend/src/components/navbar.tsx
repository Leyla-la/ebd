"use client";

import {
  CircleUser,
  Bell,
  Sun,
  Globe,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { useGetAuthUserQuery } from "@/state/api";
import type { AuthenticatedUser } from "@/types/prismaTypes";
import { signOut } from "@aws-amplify/auth";
import Link from "next/link";
import Image from "next/image";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";


// Placeholder icons for theme/language
const ThemeIcon = Sun;
const LanguageIcon = Globe;

// Role-specific dropdown items
const getDropdownItems = (role: string) => {
  if (role === "ADMIN") {
    return [
      { href: "/admin/dashboard", label: "Admin Dashboard" },
      { href: "/admin/employees", label: "Manage Employees" },
      { href: "/admin/payroll", label: "Payroll" },
      { href: "/admin/ebd-logs", label: "EBD Logs" },
      { href: "/admin/notifications", label: "Notifications" },
      { href: "/admin/settings", label: "Settings" },
    ];
  }
  // Default: employee
  return [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/payroll", label: "Payroll" },
    { href: "/tasks", label: "Tasks" },
    { href: "/ebd-logs", label: "EBD Logs" },
    { href: "/notifications", label: "Notifications" },
    { href: "/settings", label: "Settings" },
  ];
};

export function Navbar() {
  const pathname = usePathname();
  const { data: user, isLoading } = useGetAuthUserQuery();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      // After sign out, you might want to refetch user data or redirect
      router.push("/");
      // This depends on how you manage cache invalidation with RTK Query
      // For now, a page reload will clear the state.
      window.location.reload();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Always show the same navbar structure
  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6"
      )}
      style={{ height: NAVBAR_HEIGHT }}
    >
      {/* Left: Logo + EBD Corp */}
      <Link href='/' className='flex items-center gap-2'>
        <Image src='/file.svg' alt='EBD Logo' width={28} height={28} />
        <span className='text-lg font-semibold'>EBD Corp</span>
      </Link>
      {/* Right: Auth-dependent */}
      <div className='flex items-center gap-2'>
        {/* Notification icon (only if logged in) */}
        {user && (
          <Link href='/notifications' className='relative'>
            <Bell className='h-6 w-6 text-muted-foreground hover:text-foreground' />
            {/* TODO: Add badge for unread count */}
          </Link>
        )}
        {/* Theme icon (placeholder) */}
        <Button variant='ghost' size='icon' className='rounded-full' title='Change theme (coming soon)'>
          <ThemeIcon className='h-6 w-6 text-muted-foreground' />
        </Button>
        {/* Language icon (placeholder) */}
        <Button variant='ghost' size='icon' className='rounded-full' title='Change language (coming soon)'>
          <LanguageIcon className='h-6 w-6 text-muted-foreground' />
        </Button>
        {/* Avatar or Sign In */}
        {isLoading ? (
          <div className='h-8 w-8 animate-pulse rounded-full bg-muted' />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                {user.employee?.avatarUrl || user.admin?.image ? (
                  <Image
                    src={
                      user.employee?.avatarUrl ||
                      user.admin?.image ||
                      "/default-avatar.png"
                    }
                    alt='User Avatar'
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                ) : (
                  <CircleUser className='h-6 w-6' />
                )}
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {getDropdownItems(user.role).map((item) => (
                <DropdownMenuItem asChild key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant='outline'>
            <Link href='/signin'>Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

