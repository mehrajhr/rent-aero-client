"use server";

import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function fetchAllRentalOrders() {
  try {
    const accessToken = await getAuthToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await fetch(`${backendUrl}/rentals/all-rentals-orders`, {
      headers: accessToken ? { Authorization: accessToken } : {},
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching rental orders:", error);
    return [];
  }
}