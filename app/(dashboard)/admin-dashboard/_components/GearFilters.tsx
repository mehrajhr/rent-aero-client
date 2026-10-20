"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw, Loader2 } from "lucide-react";

export default function GearFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "ALL");
  const [isAvailable, setIsAvailable] = useState(searchParams.get("isAvailable") || "ALL");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");

  const handleFilterApply = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams();
      if (searchTerm) params.set("searchTerm", searchTerm);
      if (category && category !== "ALL") params.set("category", category);
      if (isAvailable && isAvailable !== "ALL") params.set("isAvailable", isAvailable);
      if (sortBy) params.set("sortBy", sortBy);
      if (sortOrder) params.set("sortOrder", sortOrder);
      params.set("page", "1");

      router.push(`/admin-dashboard/gear?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setCategory("ALL");
    setIsAvailable("ALL");
    setSortBy("createdAt");
    setSortOrder("desc");
    router.push("/admin-dashboard/gear");
  };

  return (
    <form onSubmit={handleFilterApply} className="rounded-2xl border bg-card p-4 md:p-6 space-y-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by gear name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>

        {/* Category Filter */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {categories.map((cat: any) => (
              <SelectItem key={cat.name} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Availability Filter */}
        <Select value={isAvailable} onValueChange={setIsAvailable}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="true">Available</SelectItem>
            <SelectItem value="false">Unavailable</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Date Created</SelectItem>
            <SelectItem value="pricePerDay">Price Per Day</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="rounded-xl gap-1 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
        </Button>
        <Button type="submit" size="sm" disabled={isPending} className="rounded-xl gap-1 text-xs font-bold">
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Apply Filters
        </Button>
      </div>
    </form>
  );
}