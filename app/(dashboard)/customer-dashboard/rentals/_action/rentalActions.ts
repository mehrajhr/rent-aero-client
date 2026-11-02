"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function fetchMyRentals() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return [];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals/my-rentals`, {
      headers: {
        Authorization: accessToken, // Without Bearer as per your backend specs
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return [];
  }
}

export async function fetchRentalDetails(id: string) {
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
    if (!result.success || !result.data) return null;

    const rental = result.data;
    if (rental.status === "RETURNED" && rental.items?.length) {
      const gearIds = Array.from(
        new Set(
          rental.items
            .map((item: { gearId?: unknown }) => item.gearId)
            .filter(
              (gearId: unknown): gearId is string =>
                typeof gearId === "string" && gearId.length > 0,
            ),
        ),
      );
      const reviewsByGearId = Object.fromEntries(
        await Promise.all(
          gearIds.map(async (gearId) => {
            try {
              const gearRes = await fetch(`${backendUrl}/gear/${gearId}`, {
                cache: "no-store",
              });
              if (!gearRes.ok) return [gearId, null];

              const gearResult = await gearRes.json();
              const review = gearResult.success
                ? gearResult.data?.reviews?.find(
                    (entry: any) => entry.orderId === id,
                  ) ?? null
                : null;
              return [gearId, review];
            } catch {
              return [gearId, null];
            }
          }),
        ),
      );

      rental.items = rental.items.map((item: any) => ({
        ...item,
        review: reviewsByGearId[item.gearId] ?? null,
      }));
    }

    return rental;
  } catch (error) {
    console.error("Error fetching rental details:", error);
    return null;
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized token missing." };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/rentals/${orderId}/status`, {
      method: "PATCH", // Or PUT depending on backend definition
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

    revalidatePath("/customer-dashboard/rentals");
    return { success: true, message: result.message || "Status updated successfully." };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Something went wrong." };
  }
}
