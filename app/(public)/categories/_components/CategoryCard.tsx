import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { ICategory } from "../../_types/category.types";

interface CategoryCardProps {
  category: ICategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/gear?category=${category.slug}`}
      className="group relative rounded-2xl border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Accent Glow on Hover */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all" />

      <div className="space-y-4 relative z-10">
        {/* Icon Header */}
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-inner">
            <Layers className="h-6 w-6" />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600">
            Active
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            Explore Collection
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t flex items-center justify-between text-xs font-semibold text-primary relative z-10">
        <span>Browse Gear</span>
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}