"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// 1. Fetch Provider's Gears
async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function fetchMyGears() {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return [];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear/my-gear`, {
      headers: { Authorization: accessToken },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching provider gears:", error);
    return [];
  }
}

// 2. Create New Gear (POST with Auth)
export async function createGear(payload: any) {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return { success: false, message: "Unauthorized: No token found" };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to create gear" };

    revalidatePath("/dashboard/provider/gear");
    return { success: true, message: "Gear added successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

// 3. Update Existing Gear (PUT with Auth)
export async function updateGear(gearId: string, payload: any) {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return { success: false, message: "Unauthorized: No token found" };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear/${gearId}`, {
      method: "PUT", // অথবা আপনার ব্যাকএন্ড অনুযায়ী PATCH হলে PATCH দিন
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to update gear" };

    revalidatePath("/dashboard/provider/gear");
    return { success: true, message: "Gear updated successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

// 4. Delete Gear (DELETE with Auth)
export async function deleteGear(gearId: string) {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return { success: false, message: "Unauthorized" };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/gear/${gearId}`, {
      method: "DELETE",
      headers: { Authorization: accessToken },
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to delete" };

    revalidatePath("/dashboard/provider/gear");
    return { success: true, message: "Gear deleted successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}