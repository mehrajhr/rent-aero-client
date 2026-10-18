"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface UpdateProfilePayload {
  name?: string;
  email?: string;
  role?: "CUSTOMER" | "PROVIDER";
}

export async function updateProfile(payload: UpdateProfilePayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Authentication token missing. Please log in again.",
      };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Request sending without 'Bearer' prefix as specified
    const res = await fetch(`${backendUrl}/auth/me/update`, {
      method: "PATCH", // Or "PUT" based on backend definition
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken, 
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update profile information.",
      };
    }

    // Revalidate the dashboard and profile pages to update UI globally
    revalidatePath("/my-profile");
    // revalidatePath("/dashboard");

    return {
      success: true,
      message: result.message || "Profile updated successfully!",
      data: result.data,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}