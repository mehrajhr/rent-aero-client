import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getMe } from "@/service/getMe";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Star,
  User,
  PackagePlus,
  Users,
  FolderTree,
  ClipboardList,
  Boxes,
  Menu,
} from "lucide-react";
import LogoutButton from "../../components/shared/LogoutButton";
import RoleSwitcher from "./_components/RoleSwitcher";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
  icon: any;
  roles: ("ADMIN" | "PROVIDER" | "CUSTOMER")[];
}

const DASHBOARD_NAV_LINKS: NavLink[] = [
  // Role Based Overview Links
  {
    label: "Overview",
    href: "/customer-dashboard",
    icon: LayoutDashboard,
    roles: ["CUSTOMER"],
  },
  {
    label: "Overview",
    href: "/provider-dashboard",
    icon: LayoutDashboard,
    roles: ["PROVIDER"],
  },
  {
    label: "Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN"],
  },

  // Customer Features
  {
    label: "My Rental Orders",
    href: "/customer-dashboard/rentals",
    icon: ShoppingBag,
    roles: ["CUSTOMER"],
  },
  {
    label: "Payment History",
    href: "/customer-dashboard/payments",
    icon: CreditCard,
    roles: ["CUSTOMER"],
  },

  // Provider Features
  {
    label: "Manage Inventory",
    href: "/provider-dashboard/gear",
    icon: Boxes,
    roles: ["PROVIDER"],
  },
  {
    label: "Add New Gear",
    href: "/provider-dashboard/gear/new",
    icon: PackagePlus,
    roles: ["PROVIDER"],
  },
  {
    label: "Incoming Orders",
    href: "/provider-dashboard/orders",
    icon: ClipboardList,
    roles: ["PROVIDER"],
  },

  // Admin Features
  {
    label: "Manage Users",
    href: "/admin-dashboard/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "All Gear Listings",
    href: "/admin-dashboard/gear",
    icon: Boxes,
    roles: ["ADMIN"],
  },
  {
    label: "All Rental Orders",
    href: "/admin-dashboard/orders",
    icon: ClipboardList,
    roles: ["ADMIN"],
  },
  {
    label: "Manage Categories",
    href: "/admin-dashboard/categories",
    icon: FolderTree,
    roles: ["ADMIN"],
  },

  // Common Profile Management
  {
    label: "My Profile",
    href: "/my-profile",
    icon: User,
    roles: ["ADMIN", "PROVIDER", "CUSTOMER"],
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileRes = await getMe();
  const userData = profileRes?.success ? profileRes.data.user : null;

  const originalRole = (userData?.role || "CUSTOMER").toUpperCase() as
    | "ADMIN"
    | "PROVIDER"
    | "CUSTOMER";
  const userName = userData?.name || "User";

  const cookieStore = await cookies();
  const activeViewRoleCookie = cookieStore.get("activeViewRole")?.value as
    | "ADMIN"
    | "PROVIDER"
    | "CUSTOMER"
    | undefined;

  const currentViewRole =
    activeViewRoleCookie &&
    (originalRole === "ADMIN" || originalRole === "PROVIDER")
      ? activeViewRoleCookie
      : originalRole;

  const filteredLinks = DASHBOARD_NAV_LINKS.filter((link) =>
    link.roles.includes(currentViewRole),
  );

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card p-6 space-y-6 sticky top-0 h-screen">
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="font-bold text-xl text-primary">
            Rent<span className="text-foreground">Aero</span>
          </Link>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
            {currentViewRole}
          </span>
        </div>

        <RoleSwitcher
          originalRole={originalRole}
          currentViewRole={currentViewRole}
        />

        <nav className="space-y-1.5 flex-1 overflow-y-auto">
          {filteredLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <IconComponent className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-card px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
          
          {/* Mobile View: Hamburger Menu & Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 flex flex-col p-6">
                <SheetHeader className="text-left space-y-2 pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl text-primary">
                      Rent<span className="text-foreground">Aero</span>
                    </Link>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
                      {currentViewRole}
                    </span>
                  </div>
                </SheetHeader>

                <div className="py-4">
                  <RoleSwitcher
                    originalRole={originalRole}
                    currentViewRole={currentViewRole}
                  />
                </div>

                <nav className="space-y-1.5 flex-1 overflow-y-auto">
                  {filteredLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-4 border-t">
                  <LogoutButton />
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="font-bold text-lg text-primary">
              RentAero
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
              {currentViewRole}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">{userName}</p>
              <p className="text-[10px] text-muted-foreground capitalize">
                {currentViewRole.toLowerCase()}{" "}
                {originalRole !== currentViewRole
                  ? `(Switched from ${originalRole})`
                  : ""}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase border">
              {userName.substring(0, 2)}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-10 flex-1">{children}</div>
      </main>
    </div>
  );
}