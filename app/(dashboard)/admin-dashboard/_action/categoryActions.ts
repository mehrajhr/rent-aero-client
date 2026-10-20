"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// 1. Fetch All Categories (Public/Open API)
export async function fetchCategories() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/categories`, {
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// 2. Create Category (Admin Only - POST /categories)
export async function createCategory(payload: { name: string; slug: string; isActive?: boolean }) {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return { success: false, message: "Unauthorized" };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to create category" };

    revalidatePath("/admin-dashboard/categories");
    return { success: true, message: "Category created successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

// 3. Update Category / Toggle Status (Admin Only - PATCH /categories/:id)
export async function updateCategory(categoryId: string, payload: { name?: string; slug?: string; isActive?: boolean }) {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return { success: false, message: "Unauthorized" };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/categories/${categoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to update category" };

    revalidatePath("/admin-dashboard/categories");
    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}