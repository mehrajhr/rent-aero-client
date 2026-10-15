import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Target, Heart, Award, ArrowRight, CheckCircle2 } from "lucide-react";

const STATS = [
  { label: "Active Renters", value: "2,500+" },
  { label: "Verified Gear", value: "500+" },
  { label: "Trusted Providers", value: "150+" },
  { label: "Successful Rentals", value: "4,000+" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety First",
    description: "Every provider and gear listing undergoes strict verification to ensure a secure and reliable rental experience.",
  },
  {
    icon: Target,
    title: "Accessibility",
    description: "We believe professional equipment should be accessible to everyone, whether for a weekend project or an adventure.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Building a trusted ecosystem where creators, fitness enthusiasts, and explorers can share and earn seamlessly.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero / Header Section */}
      <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-28 border-b">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Award className="h-4 w-4" />
            <span>About RentAero</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Empowering Rentals, <br />
            <span className="text-primary">Connecting Communities.</span>
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            RentAero is the ultimate equipment rental marketplace designed to bridge the gap between people who need professional-grade gear and those who own it. Rent securely, list easily, and explore without limits.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/gear">
                Explore Gear <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register?role=PROVIDER">Become a Provider</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Story */}
      <section className="py-20 lg:py-28 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
              <Users className="h-4 w-4" /> Our Mission
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Making Quality Gear Accessible & Affordable for Everyone
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Buying expensive cameras, fitness equipment, or camping gear for a one-time project or vacation isn't always practical. RentAero solves this by creating a trustworthy platform where owners can monetize their idle assets and renters can access top-tier equipment at a fraction of the cost.
            </p>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>Transparent pricing with zero hidden fees</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>Secure payment and escrow protection workflow</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>Real-time tracking and verified user reviews</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border bg-card p-8 md:p-10 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-2xl font-bold">Why Choose RentAero?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We combine modern web technology with a robust user-first approach. Whether you are a professional photographer renting out your kit or an adventurer seeking hiking gear, RentAero ensures peace of mind at every step.
              </p>
              <div className="pt-4 border-t flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">Ready to start?</p>
                  <p className="text-xs text-muted-foreground">Join our growing community today.</p>
                </div>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Our Core Values</h2>
            <p className="text-muted-foreground text-base">
              The principles that guide our platform, our community, and our continuous growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val, idx) => {
              const IconC = val.icon;
              return (
                <div key={idx} className="rounded-2xl border bg-card p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <IconC className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{val.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}