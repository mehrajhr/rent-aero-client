import { Search, CalendarDays, CreditCard, Star, ShieldCheck, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Browse & Select",
    description: "Explore our wide range of professional gear, view detailed specifications, and pick your required items.",
    icon: Search,
    badge: "Browse Gear",
  },
  {
    step: "02",
    title: "Book & Pay Securely",
    description: "Select your rental dates, complete the secure checkout, and proceed with seamless payment.",
    icon: CreditCard,
    badge: "Checkout & Pay",
  },
  {
    step: "03",
    title: "Rent & Track",
    description: "Track your order status in real-time as your equipment is prepared and delivered right to you.",
    icon: CalendarDays,
    badge: "Track Order",
  },
  {
    step: "04",
    title: "Return & Review",
    description: "Mark the item as returned when you're done, and share your experience to help the community.",
    icon: Star,
    badge: "Review & Earn",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30 border-y relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <ShieldCheck className="h-4 w-4" />
            <span>Simple & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How RentAero Works
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            From booking your favorite gear to returning it hassle-free, our streamlined process makes renting effortless.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="group relative rounded-2xl border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Top Number & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-inner">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Tag / Milestone */}
                <div className="pt-4 border-t flex items-center justify-between text-xs font-semibold text-primary">
                  <span className="bg-primary/10 px-2.5 py-1 rounded-md">
                    {item.badge}
                  </span>
                  {index < STEPS.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground hidden lg:block opacity-40 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}