"use server";

import { cookies } from "next/headers";

export async function fetchPaymentHistory() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return [];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/payments`, {
      headers: {
        Authorization: accessToken, // Without Bearer as per your backend spec
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return [];
  }
}

export async function fetchPaymentDetails(id: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/payments/${id}`, {
      headers: {
        Authorization: accessToken,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data.payment : null;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return null;
  }
}