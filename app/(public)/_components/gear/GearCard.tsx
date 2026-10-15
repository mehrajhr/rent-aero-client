import Link from "next/link";
import { Star, Tag, CheckCircle2, XCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IGearItem } from "../../_types/gear.types";

interface GearCardProps {
  gear: IGearItem;
}

export default function GearCard({ gear }: GearCardProps) {
  return (
    <div className="group rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between p-5 space-y-4">
      <div className="space-y-3">
        {/* Top Badges with flex-wrap to prevent cutting off text */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="secondary" className="text-xs gap-1 font-medium">
            <Tag className="h-3 w-3" />
            {gear.category?.name}
          </Badge>

          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            gear.isAvailable ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
          }`}>
            {gear.isAvailable ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
            {gear.isAvailable ? "Available" : "Rented Out"}
          </span>
        </div>

        {/* Brand & Name */}
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{gear.brand}</span>
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {gear.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {gear.description}
          </p>
        </div>

        {/* Provider info */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
          <User className="h-3.5 w-3.5" />
          <span>Provider: {gear.provider?.name}</span>
        </div>
      </div>

      {/* Footer / Price & Rating */}
      <div className="pt-4 border-t flex items-center justify-between">
        <div>
          <span className="text-xl font-extrabold text-primary">${gear.pricePerDay}</span>
          <span className="text-xs text-muted-foreground"> / day</span>
        </div>

        <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>{gear.averageRating > 0 ? gear.averageRating : "New"}</span>
          {gear.totalReviews > 0 && <span className="text-muted-foreground">({gear.totalReviews})</span>}
        </div>
      </div>

      <Button asChild className="w-full" size="sm">
        <Link href={`/gear/${gear.id}`}>View Details & Rent</Link>
      </Button>
    </div>
  );
}