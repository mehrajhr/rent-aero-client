"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function fetchAllUsers() {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return [];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/admin/users`, {
      headers: { Authorization: accessToken },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateUserRoleOrStatus(userId: string, payload: { role?: string; status?: string }) {
  try {
    const accessToken = await getAuthToken();
    if (!accessToken) return { success: false, message: "Unauthorized" };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to update user" };

    revalidatePath("/admin-dashboard/users");
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}