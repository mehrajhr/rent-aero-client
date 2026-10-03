import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dumbbell,
  User as UserIcon,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
];

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface NavbarProps {
  user?: UserData | null;
}

export default function Navbar({ user }: NavbarProps) {
//   console.log(!user);
  const isAuthenticated = !!user;
  const userRole = user?.role ? user.role.toLowerCase() : "customer";

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left Side: Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-87.5">
              <div className="flex flex-col gap-6 py-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl text-primary"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <span>
                    Rent<span className="text-foreground">Aero</span>
                  </span>
                </Link>
                <div className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors font-medium py-2 px-3 rounded-md hover:bg-muted"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            className="flex items-center gap-2 font-bold text-xl text-primary transition-opacity hover:opacity-90"
            href="/"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-lg sm:text-xl">
              Rent<span className="text-foreground">Aero</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              className="transition-colors hover:text-primary"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Profile or Auth buttons */}
        <div className="flex items-center justify-end gap-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full focus-visible:ring-0"
                  variant="ghost"
                >
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-border">
                    <AvatarImage alt={user.name} src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    className="flex items-center cursor-pointer"
                    href={`/${userRole}-dashboard`}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    className="flex items-center cursor-pointer"
                    href="/profile"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
