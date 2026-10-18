"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function fetchProviderOrders() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return [];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals/provider-orders`, {
      headers: {
        Authorization: accessToken, 
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching provider orders:", error);
    return [];
  }
}

export async function fetchProviderOrderDetails(id: string) {
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
    console.error("Error fetching order details:", error);
    return null;
  }
}

export async function updateProviderOrderStatus(orderId: string, status: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Authentication token missing." };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals/${orderId}/status`, {
      method: "PATCH",
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

    revalidatePath("/provider-dashboard/orders");
    revalidatePath(`/provider-dashboard/orders/${orderId}`);

    return { success: true, message: result.message || `Order status updated to ${status}` };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}