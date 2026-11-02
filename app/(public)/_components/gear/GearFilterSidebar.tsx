"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GearFilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = format(new Date(), "yyyy-MM-dd");

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [isAvailable, setIsAvailable] = useState(searchParams.get("isAvailable") || "all");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [dateError, setDateError] = useState("");

  const applyFilters = () => {
    if (Boolean(startDate) !== Boolean(endDate)) {
      setDateError("Choose both rental dates, or clear both.");
      return;
    }
    if (startDate && endDate && endDate <= startDate) {
      setDateError("End date must be after the start date.");
      return;
    }
    setDateError("");
    const params = new URLSearchParams();

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (category && category !== "all") params.set("category", category);
    if (brand) params.set("brand", brand);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (isAvailable !== "all") params.set("isAvailable", isAvailable);
    if (startDate && endDate) { params.set("startDate", startDate); params.set("endDate", endDate); }

    params.set("page", "1");
    router.push(`/gear?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchTerm("");
    setCategory("all");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setIsAvailable("all");
    setStartDate("");
    setEndDate("");
    setDateError("");
    router.push("/gear");
  };

  return (
    <div className="space-y-6 rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs text-muted-foreground">
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">Rental dates (optional)</Label>
        <Input aria-label="Rental start date" type="date" min={today} value={startDate} onChange={(e) => { setStartDate(e.target.value); setDateError(""); }} className="text-sm" />
        <Input aria-label="Rental end date" type="date" min={startDate || today} value={endDate} onChange={(e) => { setEndDate(e.target.value); setDateError(""); }} className="text-sm" />
        {dateError && <p role="alert" className="text-xs text-destructive">{dateError}</p>}
        <p className="text-xs text-muted-foreground">Show gear with stock available for the whole period.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs font-semibold">Search</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search gear..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
      </div>

      {/* Category Dropdown with all API categories */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="camping-hiking">Camping & Hiking</SelectItem>
            <SelectItem value="cycling">Cycling</SelectItem>
            <SelectItem value="fitness-gym">Fitness & Gym</SelectItem>
            <SelectItem value="party-events">Party & Events</SelectItem>
            <SelectItem value="photography-video">Photography & Video</SelectItem>
            <SelectItem value="tools-equipment">Tools & Equipment</SelectItem>
            <SelectItem value="winter-sports">Winter Sports</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brand" className="text-xs font-semibold">Brand</Label>
        <Input
          id="brand"
          placeholder="Sony, Trek, Bowflex..."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">Price Per Day ($)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="text-sm"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">Availability</Label>
        <Select value={isAvailable} onValueChange={setIsAvailable}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="true">Available Now</SelectItem>
            <SelectItem value="false">Rented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}
