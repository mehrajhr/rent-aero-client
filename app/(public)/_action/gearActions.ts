"use server";
import { IGearFilterRequest } from "../_types/gear.types";

export async function fetchGearItems(filters: IGearFilterRequest) {
  try {
    const queryParams = new URLSearchParams();

    if (filters.searchTerm) queryParams.append("searchTerm", filters.searchTerm);
    if (filters.category && filters.category !== "all") queryParams.append("category", filters.category);
    if (filters.brand) queryParams.append("brand", filters.brand);
    if (filters.minPrice !== undefined) queryParams.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters.isAvailable !== undefined) queryParams.append("isAvailable", filters.isAvailable.toString());
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder);
    if (filters.page) queryParams.append("page", filters.page.toString());
    if (filters.limit) queryParams.append("limit", filters.limit.toString());

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear?${queryParams.toString()}`, {
      cache: "no-store", // Real-time data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch gear items");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching gear items:", error);
    return {
      success: false,
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
    };
  }
}

export async function fetchSingleGearItem(id: string) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching single gear item:", error);
    return null;
  }
}