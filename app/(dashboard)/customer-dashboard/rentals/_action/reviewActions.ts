"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type ReviewInput = {
  rating: number;
  comment: string;
};

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function createRentalReview(
  orderId: string,
  gearId: string,
  input: ReviewInput,
) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { success: false, message: "Please log in to leave a review." };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ orderId, gearId, ...input }),
    });
    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Could not submit your review.",
      };
    }

    revalidatePath(`/customer-dashboard/rentals/${orderId}`);
    revalidatePath(`/gear/${gearId}`);
    return { success: true, message: result.message || "Review submitted." };
  } catch {
    return {
      success: false,
      message: "Something went wrong while submitting your review.",
    };
  }
}

export async function updateRentalReview(
  orderId: string,
  gearId: string,
  reviewId: string,
  input: ReviewInput,
) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { success: false, message: "Please log in to update your review." };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(input),
    });
    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Could not update your review.",
      };
    }

    revalidatePath(`/customer-dashboard/rentals/${orderId}`);
    revalidatePath(`/gear/${gearId}`);
    return { success: true, message: result.message || "Review updated." };
  } catch {
    return {
      success: false,
      message: "Something went wrong while updating your review.",
    };
  }
}
