import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32 border-b">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>The #1 Equipment Rental Marketplace</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Rent Premium Gear, <br />
              <span className="text-primary">Anytime, Anywhere.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              Discover, rent, or list professional-grade gear with absolute confidence. Secure payments, verified providers, and seamless rentals all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto gap-2 text-base shadow-lg">
                <Link href="/gear">
                  Explore Gear <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base">
                <Link href="/register?role=PROVIDER">Become a Provider</Link>
              </Button>
            </div>

            {/* Trust Indicators / Stats */}
            <div className="pt-8 border-t grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-xs text-muted-foreground">Verified Gear</p>
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-muted-foreground">Secure Rentals</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-500 font-bold text-lg">
                  <Star className="h-4 w-4 fill-current" /> 4.9
                </div>
                <p className="text-xs text-muted-foreground">User Rating</p>
              </div>
            </div>

          </div>

          {/* Right Visual / Hero Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border bg-card p-6 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    RA
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Featured Equipment</h3>
                    <p className="text-xs text-muted-foreground">Ready for instant rent</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                  Available
                </span>
              </div>

              {/* Simulated Card Image Box */}
              <div className="h-48 w-full rounded-xl bg-muted flex items-center justify-center border border-dashed text-muted-foreground">
                <div className="text-center space-y-1">
                  <ShieldCheck className="h-8 w-8 mx-auto text-primary opacity-80" />
                  <span className="text-xs font-medium">Verified Quality Gear</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Rate</span>
                  <span className="font-bold text-primary">৳250.00 / day</span>
                </div>
                <Button asChild className="w-full" variant="secondary">
                  <Link href="/gear">View Details</Link>
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}