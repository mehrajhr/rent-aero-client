"use server";

import { ICategory, ICategoryResponse } from "../_types/category.types";

export async function fetchCategories(): Promise<ICategory[]> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/categories`, {
      cache: "no-store",
    });

    console.log("Response from fetchCategories:", res);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result: ICategoryResponse = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}