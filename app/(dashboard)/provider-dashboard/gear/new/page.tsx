import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GearForm from "../../_components/GearForm";
import { fetchCategories } from "@/app/(public)/_action/categoryActions";


export default async function AddNewGearPage() {
  const categories = await fetchCategories();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-3 text-muted-foreground mb-4">
          <Link href="/provider-dashboard/gear">
            <ArrowLeft className="h-4 w-4" /> Back to Inventory
          </Link>
        </Button>
        <h1 className="text-3xl font-extrabold tracking-tight">Add New Gear</h1>
        <p className="text-muted-foreground text-sm">
          List your photography or videography equipment for rent.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
        <GearForm categories={categories} mode="create" />
      </div>
    </div>
  );
}