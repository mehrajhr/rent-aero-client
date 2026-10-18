"use server";

import { cookies } from "next/headers";

export async function fetchProviderOverviewData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Concurrently fetch provider's inventory and incoming rental orders
    const [gearsRes, ordersRes] = await Promise.all([
      fetch(`${backendUrl}/gear/my-gear`, {
        headers: { Authorization: accessToken },
        cache: "no-store",
      }),
      fetch(`${backendUrl}/rentals/provider-orders`, {
        headers: { Authorization: accessToken },
        cache: "no-store",
      }),
    ]);

    const gearsData = await gearsRes.json();
    const ordersData = await ordersRes.json();

    const gears = gearsData.success ? gearsData.data : [];
    const orders = ordersData.success ? ordersData.data : [];

    // Calculate Analytics Metrics
    const totalGearCount = gears.length;
    const availableGearCount = gears.filter((g: any) => g.isAvailable).length;

    const pendingOrdersCount = orders.filter(
      (o: any) => o.status === "PLACED"
    ).length;

    const activeRentalsCount = orders.filter(
      (o: any) => o.status === "CONFIRMED" || o.status === "PICKED_UP"
    ).length;

    // Calculate total earned revenue from completed & paid orders
    const totalEarnings = orders
      .filter((o: any) => o.status === "RETURNED" || o.status === "PICKED_UP")
      .reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);

    return {
      stats: {
        totalGearCount,
        availableGearCount,
        pendingOrdersCount,
        activeRentalsCount,
        totalEarnings,
      },
      recentOrders: orders.slice(0, 5), // Latest 5 incoming orders
      topGears: gears.slice(0, 4),      // Provider's top listings
    };
  } catch (error) {
    console.error("Error fetching provider overview:", error);
    return null;
  }
}