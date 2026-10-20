"use server";

import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function fetchAdminOverviewStats() {
  try {
    const accessToken = await getAuthToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Parallel fetch for dashboard statistics
    const [usersRes, gearsRes, categoriesRes, rentalsRes] = await Promise.all([
      fetch(`${backendUrl}/admin/users`, { headers: accessToken ? { Authorization: accessToken } : {}, cache: "no-store" }),
      fetch(`${backendUrl}/gear`, { cache: "no-store" }),
      fetch(`${backendUrl}/categories`, { cache: "no-store" }),
      fetch(`${backendUrl}/rentals/all-rentals-orders`, { headers: accessToken ? { Authorization: accessToken } : {}, cache: "no-store" }),
    ]);

    const usersData = await usersRes.json();
    const gearsData = await gearsRes.json();
    const categoriesData = await categoriesRes.json();
    const rentalsData = await rentalsRes.json();

    const users = usersData.success ? usersData.data : [];
    const gears = gearsData.success ? gearsData.data : [];
    const categories = categoriesData.success ? categoriesData.data : [];
    const rentals = rentalsData.success ? rentalsData.data : [];

    // Calculate total revenue from all orders
    const totalRevenue = rentals.reduce((acc: number, order: any) => {
      return order.status !== "CANCELLED" ? acc + (order.totalAmount || 0) : acc;
    }, 0);

    return {
      totalUsers: users.length,
      totalGears: gears.length,
      totalCategories: categories.length,
      totalRentals: rentals.length,
      totalRevenue,
      recentRentals: rentals.slice(0, 5), // Latest 5 rentals for overview table
      recentUsers: users.slice(0, 5),     // Latest 5 users
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      totalUsers: 0,
      totalGears: 0,
      totalCategories: 0,
      totalRentals: 0,
      totalRevenue: 0,
      recentRentals: [],
      recentUsers: [],
    };
  }
}