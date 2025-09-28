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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { markAllAsRead, markAsRead } from "@/state/notificationSlice";


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

  // Notification state
  const { unreadCount, notifications } = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

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
        {/* Notification icon and dropdown (only if logged in) */}
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <button className='relative focus:outline-none'>
                <Bell className='h-6 w-6 text-muted-foreground hover:text-foreground' />
                {unreadCount > 0 && (
                  <Badge variant='destructive' className='absolute -top-1 -right-1 px-1.5 py-0.5 text-xs'>{unreadCount}</Badge>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-80 p-0'>
              <div className='max-h-80 overflow-y-auto'>
                <div className='flex items-center justify-between px-4 py-2 border-b'>
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
                  <ul className='divide-y'>
                    {notifications.slice(0, 10).map((n) => (
                      <li
                        key={n.id}
                        className={cn('px-4 py-2 flex flex-col gap-0.5 cursor-pointer', !n.read && 'bg-accent/30')}
                        onClick={() => !n.read && dispatch(markAsRead(n.id))}
                      >
                        <div className='flex items-center gap-2'>
                          <span className={cn('font-medium', !n.read && 'text-primary')}>{n.title}</span>
                          {!n.read && <Badge variant='warning' className='ml-2'>New</Badge>}
                        </div>
                        <span className='text-xs text-muted-foreground'>{n.content}</span>
                        <span className='text-xs text-gray-400'>{new Date(n.sentAt).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className='px-4 py-2 border-t text-xs text-center'>
                  <Link href='/notifications' className='text-blue-600 hover:underline'>View all</Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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

