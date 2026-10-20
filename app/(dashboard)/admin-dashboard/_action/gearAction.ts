"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function fetchAllGears(filters: {
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
}) {
  try {
    const accessToken = await getAuthToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const queryParams = new URLSearchParams();
    if (filters.searchTerm) queryParams.append("searchTerm", filters.searchTerm);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.brand) queryParams.append("brand", filters.brand);
    if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
    if (filters.isAvailable && filters.isAvailable !== "ALL") {
      queryParams.append("isAvailable", filters.isAvailable);
    }
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder);
    if (filters.page) queryParams.append("page", filters.page);
    if (filters.limit) queryParams.append("limit", filters.limit);

    const res = await fetch(`${backendUrl}/gear?${queryParams.toString()}`, {
      headers: accessToken ? { Authorization: accessToken } : {},
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? { data: result.data, meta: result.meta } : { data: [], meta: null };
  } catch (error) {
    console.error("Error fetching gears:", error);
    return { data: [], meta: null };
  }
}

export async function fetchCategoriesList() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/categories`, { cache: "no-store" });
    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    return [];
  }
}

export async function deleteGearByAdmin(gearId: string) {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return { success: false, message: "Unauthorized" };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear/${gearId}`, {
      method: "DELETE",
      headers: { Authorization: accessToken },
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to delete gear" };

    revalidatePath("/admin-dashboard/gear");
    return { success: true, message: "Gear deleted successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}