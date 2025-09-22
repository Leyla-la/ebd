"use client";

import {
  CircleUser,
  LayoutGrid,
  ListCollapse,
  Menu,
  Search,
  Users,
  Library,
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

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/browse", label: "Browse", icon: ListCollapse },
  { href: "/library", label: "Library", icon: Library },
];

const adminLinks = [
  { href: "/admin/users", label: "Users", icon: Users },
  // Add other admin links here
];

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

  const isLandingPage = pathname === "/";

  // Show landing page navbar if on landing page and not authenticated
  if (isLandingPage && !user) {
    return <LandingPageNavbar />;
  }

  // Show dashboard navbar for all other cases (authenticated users on any page, or unauthenticated on non-landing pages)
  return (
    <DashboardNavbar
      user={user}
      isLoading={isLoading}
      handleSignOut={handleSignOut}
    />
  );
}

const LandingPageNavbar = () => (
  <header
    className={cn(
      "fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6"
    )}
    style={{ height: NAVBAR_HEIGHT }}
  >
    <Link href='/' className='flex items-center gap-2'>
      <Image src='/file.svg' alt='EBD Logo' width={28} height={28} />
      <span className='text-lg font-semibold'>EBD</span>
    </Link>
    <div className='hidden items-center gap-4 md:flex'>
      <Link
        href='#features'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
      >
        Features
      </Link>
      <Link
        href='#how-it-works'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
      >
        How It Works
      </Link>
      <Link
        href='#discover'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
      >
        Discover
      </Link>
      <Link
        href='#faq'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
      >
        FAQs
      </Link>
    </div>
    <div className='flex items-center gap-2'>
      <Button asChild variant='outline'>
        <Link href='/login'>Sign In</Link>
      </Button>
      <Button asChild>
        <Link href='/register'>Sign Up</Link>
      </Button>
    </div>
  </header>
);

const DashboardNavbar = ({
  user,
  isLoading,
  handleSignOut,
}: {
  user: AuthenticatedUser | null | undefined;
  isLoading: boolean;
  handleSignOut: () => void;
}) => {
  const pathname = usePathname();
  const userImage = user?.employee?.image || user?.admin?.image;

  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link
              href='/'
              className='flex items-center gap-2 text-lg font-semibold mb-4'
            >
              <Image src='/file.svg' alt='EBD Logo' width={32} height={32} />
              <span className=''>EBD</span>
            </Link>
            {[...navLinks, ...(user?.role === "ADMIN" ? adminLinks : [])].map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    { "bg-muted text-foreground": pathname === link.href }
                  )}
                >
                  <link.icon className='h-5 w-5' />
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            {isLoading ? (
              <div className='h-8 w-8 animate-pulse rounded-full bg-muted' />
            ) : userImage ? (
              <Image
                src={userImage}
                alt='User Avatar'
                width={32}
                height={32}
                className='rounded-full'
              />
            ) : (
              <CircleUser className='h-5 w-5' />
            )}
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {isLoading ? (
            <DropdownMenuLabel>Loading...</DropdownMenuLabel>
          ) : user ? (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/settings'>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href='/login'>Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/register'>Register</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

