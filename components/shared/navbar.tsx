"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dumbbell, User, LogOut, LayoutDashboard, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const isAuthenticated = true; 
  const userRole = "customer"; 

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Left Side: Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu (Visible on mobile only) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-87.5">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <span>Rent<span className="text-foreground">Aero</span></span>
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

          {/* Logo */}
          <Link className="flex items-center gap-2 font-bold text-xl text-primary transition-opacity hover:opacity-90" href="/">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-lg sm:text-xl">Rent<span className="text-foreground">Aero</span></span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Hidden on mobile) */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground flex-1">
          {NAV_LINKS.map((link) => (
            <Link className="transition-colors hover:text-primary" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: User Options / Auth Profile Menu */}
        <div className="flex items-center justify-end gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full focus-visible:ring-0" variant="ghost">
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-border">
                    <AvatarImage alt="User" src="https://github.com/shadcn.png" />
                    <AvatarFallback>MH</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Mehraj Hasan</p>
                    <p className="text-xs leading-none text-muted-foreground">mehraj@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link className="flex items-center cursor-pointer" href={`/dashboard/${userRole}`}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className="flex items-center cursor-pointer" href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Button asChild variant="ghost" size="sm" className="sm:default">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="sm:default">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}