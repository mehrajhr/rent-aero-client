import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-full max-w-md space-y-6">
        
        {/* Visual 404 Badge with Icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner">
          <Compass className="h-12 w-12 animate-pulse" />
        </div>

        {/* Heading & Description */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Error 404
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Oops! The gear or page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild variant="default" className="w-full sm:w-auto gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
            <Link href="/gear">
              <ArrowLeft className="h-4 w-4" />
              Browse Gear
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}