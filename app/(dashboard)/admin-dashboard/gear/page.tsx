import { fetchAllGears, fetchCategoriesList } from "../_action/gearAction";
import { Badge } from "@/components/ui/badge";
import { Boxes, Tag, User, FolderTree, ChevronLeft, ChevronRight } from "lucide-react";
import DeleteGearModal from "../_components/DeleteGearModal";
import GearFilters from "../_components/GearFilters";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{
    searchTerm?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    isAvailable?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function AdminAllGearPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const [gearRes, categories] = await Promise.all([
    fetchAllGears(resolvedParams),
    fetchCategoriesList(),
  ]);

  const gears = gearRes.data || [];
  const meta = gearRes.meta;

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">All Gear Listings</h1>
        <p className="text-muted-foreground text-sm">
          Monitor, filter, and manage all equipment listed across the platform.
        </p>
      </div>

      {/* Filter and Search Bar Component */}
      <GearFilters categories={categories} />

      {gears.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <Boxes className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No gear listings found</h3>
          <p className="text-xs text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-4 font-bold">Gear Item</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Provider</th>
                  <th className="p-4 font-bold">Price / Day</th>
                  <th className="p-4 font-bold">Stock</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {gears.map((gear: any) => (
                  <tr key={gear.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground line-clamp-1">{gear.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                          <Tag className="h-3 w-3 text-primary" /> {gear.brand}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-medium flex items-center gap-1 text-muted-foreground">
                        <FolderTree className="h-3.5 w-3.5 text-primary" />
                        {gear.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-xs flex items-center gap-1">
                          <User className="h-3 w-3 text-primary" /> {gear.provider?.name || "Unknown"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{gear.provider?.email}</p>
                      </div>
                    </td>

                    <td className="p-4 font-extrabold text-primary">${gear.pricePerDay}</td>

                    <td className="p-4 font-bold font-mono">{gear.stock}</td>

                    <td className="p-4">
                      <Badge
                        className={
                          gear.isAvailable
                            ? "bg-green-500/10 text-green-600 border-none font-bold"
                            : "bg-red-500/10 text-red-600 border-none font-bold"
                        }
                      >
                        {gear.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </td>

                    <td className="p-4 text-right">
                      <DeleteGearModal gearId={gear.id} gearName={gear.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t bg-muted/20">
              <p className="text-xs text-muted-foreground font-medium">
                Page <strong className="text-foreground">{currentPage}</strong> of <strong className="text-foreground">{totalPages}</strong>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  className={`rounded-xl h-8 px-3 ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                >
                  <Link href={`/admin-dashboard/gear?page=${currentPage - 1}`}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  className={`rounded-xl h-8 px-3 ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                >
                  <Link href={`/admin-dashboard/gear?page=${currentPage + 1}`}>
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}