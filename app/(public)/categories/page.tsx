import { fetchCategories } from "../_action/categoryActions";
import { ICategory } from "../_types/category.types";
import CategoryCard from "./_components/CategoryCard";
import { Compass, Sparkles } from "lucide-react";

export default async function CategoriesPage() {
  const categories: ICategory[] = await fetchCategories();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 lg:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase">
          <Sparkles className="h-4 w-4" />
          <span>Explore Categories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Find Gear by Category
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Browse through our curated equipment collections tailored for photography, fitness, camping, cycling, and more.
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center space-y-3">
          <Compass className="h-10 w-10 mx-auto text-muted-foreground animate-spin" />
          <h3 className="font-bold text-lg">No categories found</h3>
          <p className="text-sm text-muted-foreground">
            Please check back later or ensure the backend service is running.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}

    </div>
  );
}