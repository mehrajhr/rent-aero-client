"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import DashboardPageSkeleton from "@/components/shared/DashboardPageSkeleton";

interface DashboardNavigationState {
  isNavigating: boolean;
  beginNavigation: () => void;
}

const DashboardNavigationContext = createContext<DashboardNavigationState | null>(null);

export function useDashboardNavigation() {
  const context = useContext(DashboardNavigationContext);
  if (!context) {
    throw new Error("useDashboardNavigation must be used inside its provider.");
  }
  return context;
}

export function DashboardNavigationFeedbackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const search = useSearchParams().toString();

  const beginNavigation = useCallback(() => setIsNavigating(true), []);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, search]);

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest<HTMLAnchorElement>("a[href]");
    if (!anchor || anchor.target === "_blank") return;

    const destination = new URL(anchor.href, window.location.href);
    const isDashboardRoute =
      /^\/(admin|provider|customer)-dashboard(?:\/|$)/.test(destination.pathname) ||
      /^\/my-profile(?:\/|$)/.test(destination.pathname);

    if (
      destination.origin === window.location.origin &&
      isDashboardRoute &&
      (destination.pathname !== pathname || destination.search !== (search ? `?${search}` : ""))
    ) {
      beginNavigation();
    }
  };

  return (
    <DashboardNavigationContext.Provider value={{ isNavigating, beginNavigation }}>
      <div onClickCapture={handleClickCapture}>{children}</div>
    </DashboardNavigationContext.Provider>
  );
}

export function DashboardPageContent({ children }: { children: ReactNode }) {
  const { isNavigating } = useDashboardNavigation();
  return isNavigating ? <DashboardPageSkeleton /> : children;
}
