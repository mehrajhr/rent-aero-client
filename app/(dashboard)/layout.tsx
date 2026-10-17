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
} from "lucide-react";
import LogoutButton from "../../components/shared/LogoutButton";
import RoleSwitcher from "./_components/RoleSwitcher";

interface NavLink {
  label: string;
  href: string;
  icon: any;
  roles: ("ADMIN" | "PROVIDER" | "CUSTOMER")[];
}

const DASHBOARD_NAV_LINKS: NavLink[] = [
  // Common Overview
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "PROVIDER", "CUSTOMER"],
  },

  // Customer Features (Accessible by CUSTOMER or when Admin/Provider switches to Customer View)
  {
    label: "My Rental Orders",
    href: "/dashboard/customer/rentals",
    icon: ShoppingBag,
    roles: ["CUSTOMER"],
  },
  {
    label: "Payment History",
    href: "/dashboard/customer/payments",
    icon: CreditCard,
    roles: ["CUSTOMER"],
  },
  {
    label: "My Reviews",
    href: "/dashboard/customer/reviews",
    icon: Star,
    roles: ["CUSTOMER"],
  },

  // Provider Features
  {
    label: "Manage Inventory",
    href: "/dashboard/provider/gear",
    icon: Boxes,
    roles: ["PROVIDER"],
  },
  {
    label: "Add New Gear",
    href: "/dashboard/provider/gear/new",
    icon: PackagePlus,
    roles: ["PROVIDER"],
  },
  {
    label: "Incoming Orders",
    href: "/dashboard/provider/orders",
    icon: ClipboardList,
    roles: ["PROVIDER"],
  },

  // Admin Features
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "All Gear Listings",
    href: "/dashboard/admin/gear",
    icon: Boxes,
    roles: ["ADMIN"],
  },
  {
    label: "All Rental Orders",
    href: "/dashboard/admin/orders",
    icon: ClipboardList,
    roles: ["ADMIN"],
  },
  {
    label: "Manage Categories",
    href: "/dashboard/admin/categories",
    icon: FolderTree,
    roles: ["ADMIN"],
  },

  // Common Profile Management
  {
    label: "Manage Profile",
    href: "/dashboard/profile",
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

  // Check if Admin/Provider has switched to Customer view via cookies
  const cookieStore = await cookies();
  const activeViewRoleCookie = cookieStore.get("activeViewRole")?.value as
    | "ADMIN"
    | "PROVIDER"
    | "CUSTOMER"
    | undefined;

  // নির্ধারণ করা হচ্ছে বর্তমান ইউজার কোন মোডে ড্যাশবোর্ড দেখবে
  const currentViewRole =
    activeViewRoleCookie &&
    (originalRole === "ADMIN" || originalRole === "PROVIDER")
      ? activeViewRoleCookie
      : originalRole;

  // ফিল্টার লিংকস: বর্তমান ভিউ রোল অনুযায়ী নেভিগেশন শো করবে
  const filteredLinks = DASHBOARD_NAV_LINKS.filter((link) =>
    link.roles.includes(currentViewRole),
  );

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card p-6 space-y-6 sticky top-0 h-screen">
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="font-bold text-xl text-primary">
            Rent<span className="text-foreground">Aero</span>
          </Link>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
            {currentViewRole}
          </span>
        </div>

        {/* Role Switcher Option for Admin / Provider */}
        <RoleSwitcher
          originalRole={originalRole}
          currentViewRole={currentViewRole}
        />

        {/* Dynamic Navigation Links */}
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

        {/* Logout Action Component */}
        <div className="pt-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Top Header */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 lg:hidden">
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

        {/* Page Content */}
        <div className="p-6 lg:p-10 flex-1">{children}</div>
      </main>
    </div>
  );
}
