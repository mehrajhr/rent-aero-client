"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function fetchMyRentals() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return [];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals/my-rentals`, {
      headers: {
        Authorization: accessToken, // Without Bearer as per your backend specs
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return [];
  }
}

export async function fetchRentalDetails(id: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals/${id}`, {
      headers: {
        Authorization: accessToken,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching rental details:", error);
    return null;
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized token missing." };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals/${orderId}/status`, {
      method: "PATCH", // Or PUT depending on backend definition
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || "Failed to update order status." };
    }

    revalidatePath("/customer-dashboard/rentals");
    return { success: true, message: result.message || "Status updated successfully." };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Something went wrong." };
  }
}