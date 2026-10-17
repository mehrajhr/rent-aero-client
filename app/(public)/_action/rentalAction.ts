"use server";

import { cookies } from "next/headers";

interface CreateRentalPayload {
  startDate: string;
  endDate: string;
  items: {
    gearId: string;
    quantity: number;
  }[];
}

export async function createRentalOrder(payload: CreateRentalPayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to place a rental order.",
      };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to place rental order.",
      };
    }

    return {
      success: true,
      message: result.message || "Rental order placed successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Error creating rental order:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}