export const dynamic = "force-dynamic";
import { fetchMyGears } from "../_action/gearActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Boxes } from "lucide-react";
import Link from "next/link";
import DeleteGearButton from "../_components/DeleteGearButton";

export default async function ManageInventoryPage() {
  const gears = await fetchMyGears();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Inventory</h1>
          <p className="text-muted-foreground text-sm">
            View, edit, or remove your listed rental equipment.
          </p>
        </div>
        <Button asChild className="gap-2 rounded-xl">
          <Link href="/provider-dashboard/gear/new">
            <PlusCircle className="h-4 w-4" /> Add New Gear
          </Link>
        </Button>
      </div>

      {gears.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <Boxes className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No gear listed yet</h3>
          <p className="text-sm text-muted-foreground">Start by adding your first equipment for rent.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gears.map((gear: any) => (
            <div key={gear.id} className="rounded-2xl border bg-card p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">{gear.brand}</Badge>
                  <Badge className={gear.isAvailable ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                    {gear.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg line-clamp-1">{gear.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{gear.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Price: <strong className="text-primary">${gear.pricePerDay}/day</strong></span>
                  <span>Stock: {gear.stock}</span>
                </div>

                {/* Actions: Edit & Delete with Modal */}
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 gap-1">
                    <Link href={`/provider-dashboard/gear/${gear.id}/edit`}>
                      <Edit className="h-3.5 w-3.5" /> Edit
                    </Link>
                  </Button>
                  
                  {/* Delete Component with Confirmation */}
                  <DeleteGearButton gearId={gear.id} gearName={gear.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}