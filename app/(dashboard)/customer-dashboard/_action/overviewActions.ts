"use server";

import { cookies } from "next/headers";

export async function fetchCustomerOverviewData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Fetch rentals & payment history concurrently
    const [rentalsRes, paymentsRes] = await Promise.all([
      fetch(`${backendUrl}/rentals/my-rentals`, {
        headers: { Authorization: accessToken },
        cache: "no-store",
      }),
      fetch(`${backendUrl}/payments`, {
        headers: { Authorization: accessToken },
        cache: "no-store",
      }),
    ]);

    const rentalsData = await rentalsRes.json();
    const paymentsData = await paymentsRes.json();

    const rentals = rentalsData.success ? rentalsData.data : [];
    const payments = paymentsData.success ? paymentsData.data : [];

    // Calculate Dashboard Analytics
    const activeRentals = rentals.filter(
      (r: any) => r.status === "CONFIRMED" || r.status === "PICKED_UP"
    ).length;

    const pendingConfirmations = rentals.filter(
      (r: any) => r.status === "PLACED"
    ).length;

    const totalSpent = payments
      .filter((p: any) => p.status === "PAID")
      .reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);

    return {
      stats: {
        totalRentals: rentals.length,
        activeRentals,
        pendingConfirmations,
        totalSpent,
      },
      recentRentals: rentals.slice(0, 5), // Latest 5 rentals
      recentPayments: payments.slice(0, 5), // Latest 5 transactions
    };
  } catch (error) {
    console.error("Error fetching customer overview:", error);
    return null;
  }
}