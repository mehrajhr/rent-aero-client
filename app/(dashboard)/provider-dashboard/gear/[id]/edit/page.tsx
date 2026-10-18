import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GearForm from "../../../_components/GearForm";

// Fetch single gear details
async function getGearDetails(id: string) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear/${id}`, { cache: "no-store" });
    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    return null;
  }
}

// Fetch categories list
async function getCategoriesList() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/categories`, { cache: "no-store" });
    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    return [];
  }
}

interface EditGearPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGearPage({ params }: EditGearPageProps) {
  const { id } = await params;
  const [gear, categories] = await Promise.all([
    getGearDetails(id),
    getCategoriesList(),
  ]);

  if (!gear) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-3 text-muted-foreground mb-4">
          <Link href="/provider-dashboard/gear">
            <ArrowLeft className="h-4 w-4" /> Back to Inventory
          </Link>
        </Button>
        <h1 className="text-3xl font-extrabold tracking-tight">Edit Gear</h1>
        <p className="text-muted-foreground text-sm">
          Update specifications, pricing, stock, or availability for <span className="font-semibold text-foreground">"{gear.name}"</span>.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
        <GearForm
          categories={categories}
          initialData={gear}
          mode="update"
          gearId={id}
        />
      </div>
    </div>
  );
}