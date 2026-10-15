import GearFilterSidebar from '../_components/gear/GearFilterSidebar'
import GearCard from "../_components/gear/GearCard";
import { fetchGearItems } from "../_action/gearActions";
import { IGearItem } from "../_types/gear.types";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function GearPage({ searchParams }: PageProps) {
  const filters = await searchParams;

  const res = await fetchGearItems({
    searchTerm: filters.searchTerm,
    category: filters.category,
    brand: filters.brand,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    isAvailable: filters.isAvailable ? filters.isAvailable === "true" : undefined,
    sortBy: filters.sortBy || "createdAt",
    sortOrder: (filters.sortOrder as "asc" | "desc") || "desc",
    page: filters.page ? Number(filters.page) : 1,
    limit: 10,
  });

  const gearItems: IGearItem[] = res.data || [];
  const meta = res.meta;

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Browse Rental Gear</h1>
        <p className="text-muted-foreground text-sm">
          Find and rent top-tier equipment from verified providers in your area.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <GearFilterSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">
              Showing <span className="text-foreground font-bold">{gearItems.length}</span> of{" "}
              <span className="text-foreground font-bold">{meta?.total || 0}</span> items
            </p>
          </div>

          {gearItems.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center space-y-3">
              <h3 className="font-bold text-lg">No equipment found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria or clearing filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gearItems.map((gear) => (
                <GearCard key={gear.id} gear={gear} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}