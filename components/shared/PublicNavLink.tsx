"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const PublicNavLink = forwardRef<
  HTMLAnchorElement,
  { href: string; children: ReactNode; className: string }
>(function PublicNavLink({ href, children, className }, ref) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      ref={ref}
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(className, active && "bg-primary/10 text-primary")}
    >
      {children}
    </Link>
  );
});

export default PublicNavLink;
