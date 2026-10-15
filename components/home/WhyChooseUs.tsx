import { ShieldCheck, Lock, Headphones, RefreshCw, Award, CheckCircle2 } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Verified Gear",
    description: "Every piece of equipment listed on RentAero goes through strict quality checks by verified providers.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Your money is safe with our escrow-based payment system, released only after successful inspection.",
  },
  {
    icon: RefreshCw,
    title: "Hassle-free Rentals",
    description: "Flexible booking dates, transparent pricing with zero hidden fees, and easy return policies.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    description: "Our support team is always ready to assist you with any questions or rental disputes anytime.",
  },
];

const TRUST_POINTS = [
  "Verified Provider Badges",
  "Instant Damage Protection Coverage",
  "Real-time Order & Delivery Tracking",
  "Transparent Customer Review System",
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-background border-b relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Award className="h-4 w-4" />
            <span>Why Rent With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Built on Trust, Safety & Quality
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            We ensure a seamless and secure rental experience for both renters and providers across the marketplace.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {FEATURES.map((feature, index) => {
            const IconComp = feature.icon;
            return (
              <div 
                key={index} 
                className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <IconComp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust & Safety Highlights Banner */}
        <div className="rounded-2xl bg-muted/50 border p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold tracking-tight">Your Safety is Our Top Priority</h3>
            <p className="text-sm text-muted-foreground max-w-xl">
              From secure authentication to verified provider profiles and secure payment gateways, RentAero guarantees complete peace of mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
            {TRUST_POINTS.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}