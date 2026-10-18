"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createGear, updateGear } from "../_action/gearActions";

interface SpecificationPair {
  key: string;
  value: string;
}

interface GearFormProps {
  categories: any[];
  initialData?: any;
  mode: "create" | "update";
  gearId?: string;
}

export default function GearForm({ categories, initialData, mode, gearId }: GearFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialSpecsArray: SpecificationPair[] = initialData?.specifications
    ? Object.entries(initialData.specifications).map(([key, value]) => ({
        key,
        value: String(value),
      }))
    : [{ key: "", value: "" }];

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    brand: initialData?.brand || "",
    pricePerDay: initialData?.pricePerDay || "",
    stock: initialData?.stock || "",
    isAvailable: initialData?.isAvailable ?? true,
    categoryId: initialData?.categoryId || "",
  });

  const [specifications, setSpecifications] = useState<SpecificationPair[]>(initialSpecsArray);

  const handleAddSpec = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    const updated = specifications.filter((_, i) => i !== index);
    setSpecifications(updated);
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specifications];
    updated[index][field] = val;
    setSpecifications(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const specObject: Record<string, string | number> = {};
      specifications.forEach((spec) => {
        if (spec.key.trim() && spec.value.trim()) {
          const isNum = !isNaN(Number(spec.value.trim()));
          specObject[spec.key.trim()] = isNum ? Number(spec.value.trim()) : spec.value.trim();
        }
      });

      const payload = {
        name: formData.name,
        description: formData.description,
        brand: formData.brand,
        pricePerDay: parseFloat(formData.pricePerDay),
        stock: parseInt(formData.stock),
        isAvailable: formData.isAvailable,
        categoryId: formData.categoryId,
        specifications: specObject,
      };

      let res;
      if (mode === "create") {
        res = await createGear(payload);
      } else {
        res = await updateGear(gearId!, payload);
      }

      if (res.success) {
        toast.success(res.message);
        router.push("/provider-dashboard/gear");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground">Gear Name</label>
          <Input
            required
            placeholder="e.g. Sony Alpha a7 IV"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground">Brand</label>
          <Input
            required
            placeholder="e.g. Sony"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-muted-foreground">Description</label>
        <Textarea
          required
          rows={3}
          placeholder="Detailed description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground">Price Per Day ($)</label>
          <Input
            type="number"
            required
            placeholder="65"
            value={formData.pricePerDay}
            onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground">Stock Quantity</label>
          <Input
            type="number"
            required
            placeholder="2"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground">Category</label>
          <Select
            value={formData.categoryId}
            onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dynamic Specs */}
      <div className="border-t pt-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Dynamic Specifications</h3>
            <p className="text-xs text-muted-foreground">Add custom specification fields.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSpec}
            className="gap-1.5 cursor-pointer rounded-xl"
          >
            <Plus className="h-4 w-4" /> Add Specification
          </Button>
        </div>

        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex items-center gap-3">
              <Input
                placeholder="Key (e.g. resolutionMP)"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Value (e.g. 33)"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                className="flex-1"
              />
              {specifications.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSpec(index)}
                  className="text-destructive hover:bg-destructive/10 shrink-0 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full gap-2 cursor-pointer rounded-xl py-6 text-base font-bold"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {mode === "create" ? "Publish Gear Listing" : "Update Gear Changes"}
      </Button>
    </form>
  );
}