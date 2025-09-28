"use client";

import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { markAllAsRead, markAsRead } from "@/state/notificationSlice";
import LiquidGlass from "liquid-glass-react";


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
  // Debug: log user info after redirect to dashboard
  React.useEffect(() => {
    if (user) {
      console.log("[Navbar] Authenticated user:", user);
      // You can check if user exists in DB here
      // Optionally, fetch again or show a warning if not found
    }
  }, [user]);
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

  // Notification state
  const { unreadCount, notifications } = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  return (
    <LiquidGlass
      displacementScale={80}
      blurAmount={0.07}
      saturation={170}
      elasticity={0.18}
      mode="prominent"
      cornerRadius={0}
      style={{ position: "fixed", left: 0, top: 0, zIndex: 50, width: "100%", height: NAVBAR_HEIGHT }}
      className={cn("border-b border-white/30 shadow-md md:px-6")}
    >
      <header
        className={cn(
          "flex w-full items-center justify-between px-4 py-2",
        )}
        style={{ height: NAVBAR_HEIGHT, background: "transparent" }}
      >
        {/* Left: Logo + EBD Corp */}
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/file.svg' alt='EBD Logo' width={28} height={28} />
          <span className='text-lg font-semibold'>EBD Corp</span>
        </Link>
        {/* Right: Auth-dependent */}
        <div className='flex items-center gap-2'>
          {/* Notification icon and dropdown (always show if logged in) */}
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <button className='relative focus:outline-none'>
                  <Bell className='h-6 w-6 text-muted-foreground hover:text-foreground' />
                  {unreadCount > 0 && (
                    <Badge className='absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500 text-white'>{unreadCount}</Badge>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align='end' className='w-80 p-0 bg-white/30 border border-white/30 shadow-lg backdrop-blur-[12px]' style={{ WebkitBackdropFilter: "blur(12px) saturate(180%)" }}>
                <div className='max-h-80 overflow-y-auto'>
                  <div className='flex items-center justify-between px-4 py-2 border-b border-white/30'>
                    <span className='font-semibold'>Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        className='text-xs text-blue-600 hover:underline ml-2'
                        onClick={() => dispatch(markAllAsRead())}
                      >Mark all as read</button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className='p-4 text-sm text-muted-foreground'>No notifications</div>
                  ) : (
                    <ul className='divide-y divide-white/20'>
                      {notifications.slice(0, 10).map((n) => (
                        <li
                          key={n.id}
                          className={cn('px-4 py-2 flex flex-col gap-0.5 cursor-pointer', !n.read && 'bg-white/20 backdrop-blur-[6px]')}
                          style={!n.read ? { WebkitBackdropFilter: "blur(6px) saturate(180%)" } : {}}
                          onClick={() => !n.read && dispatch(markAsRead(n.id))}
                        >
                          <div className='flex items-center gap-2'>
                            <span className={cn('font-medium', !n.read && 'text-primary')}>{n.title}</span>
                            {!n.read && <Badge className='ml-2 bg-yellow-400 text-black'>New</Badge>}
                          </div>
                          <span className='text-xs text-muted-foreground'>{n.content}</span>
                          <span className='text-xs text-gray-400'>{new Date(n.sentAt).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className='px-4 py-2 border-t border-white/30 text-xs text-center'>
                    <Link href='/notifications' className='text-blue-600 hover:underline'>View all</Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {/* Theme icon (placeholder) */}
          <Button className='rounded-full px-2 py-2 bg-transparent hover:bg-white/10 transition' title='Change theme (coming soon)'>
            <ThemeIcon className='h-6 w-6 text-muted-foreground' />
          </Button>
          {/* Language icon (placeholder) */}
          <Button className='rounded-full px-2 py-2 bg-transparent hover:bg-white/10 transition' title='Change language (coming soon)'>
            <LanguageIcon className='h-6 w-6 text-muted-foreground' />
          </Button>
          {/* Avatar or Sign In */}
          {isLoading ? (
            <div className='h-8 w-8 animate-pulse rounded-full bg-muted' />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='rounded-full px-2 py-2 bg-white/20 hover:bg-white/30 transition'>
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
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.admin?.name || user.employee?.name}</span>
                    <span className="text-xs text-muted-foreground">{user.role}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
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
            <Button className='px-4 py-2 border border-white/30 bg-white/10 hover:bg-white/20 transition rounded-lg'>
              <Link href='/signin'>Sign In</Link>
            </Button>
          )}
        </div>
      </header>
    </LiquidGlass>
  );
// NOTE: If you want to use other AWS services for user/session storage (like Redis, DynamoDB, etc.), you can implement a custom session/user store in your backend and update the frontend API calls accordingly. Cognito is easiest for managed auth, but Redis/DynamoDB can be used for custom logic or caching.
}

