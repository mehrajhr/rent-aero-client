"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function DashboardNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardOverview = href.endsWith("-dashboard");
  const isNewGearRoute = href.endsWith("/gear") && pathname.startsWith(`${href}/new`);
  const active =
    pathname === href ||
    (!isDashboardOverview && !isNewGearRoute && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}
