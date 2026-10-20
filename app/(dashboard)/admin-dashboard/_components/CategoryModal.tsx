"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCategory, updateCategory } from "../_action/categoryActions";
import { toast } from "sonner";
import { Loader2, Plus, Edit } from "lucide-react";

interface Props {
  category?: any; // If provided, it's Edit mode; otherwise, Create mode
}

const getFormValues = (currentCategory?: any) => ({
  name: currentCategory?.name || "",
  slug: currentCategory?.slug || "",
  isActive: currentCategory?.isActive ?? true,
});

export default function CategoryModal({ category }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const initialValues = getFormValues(category);
  const [name, setName] = useState(initialValues.name);
  const [slug, setSlug] = useState(initialValues.slug);
  const [isActive, setIsActive] = useState(initialValues.isActive);

  const resetForm = (nextCategory = category) => {
    const values = getFormValues(nextCategory);
    setName(values.name);
    setSlug(values.slug);
    setIsActive(values.isActive);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    resetForm();
  };

  // Auto-generate slug from name in create mode
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!category) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      let res;
      if (category) {
        res = await updateCategory(category.id, { name, slug, isActive });
      } else {
        res = await createCategory({ name, slug, isActive });
      }

      if (res.success) {
        toast.success(res.message);
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {category ? (
          <Button variant="outline" size="sm" className="h-8 px-2.5 rounded-xl gap-1 text-xs">
            <Edit className="h-3.5 w-3.5" /> Edit
          </Button>
        ) : (
          <Button className="rounded-xl gap-2 font-bold cursor-pointer">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-bold">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g. Camping & Hiking"
              value={name}
              onChange={handleNameChange}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="slug" className="text-xs font-bold">Slug</Label>
            <Input
              id="slug"
              placeholder="e.g. camping-hiking"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="rounded-xl font-mono text-xs"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border p-3 bg-muted/20">
            <div className="space-y-0.5">
              <Label className="text-xs font-bold">Active Status</Label>
              <p className="text-[10px] text-muted-foreground">Make category visible on platform listings</p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="rounded-xl gap-2 font-bold cursor-pointer">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {category ? "Update Category" : "Create Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}