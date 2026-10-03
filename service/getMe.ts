"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  console.log(accessToken);

  if (!accessToken) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
    headers: {
      Authorization: `${accessToken}`,
    },

    cache: "force-cache",
    next:{
      revalidate: 60 * 60 * 24, // 1 day
      tags: ["my-profile"],
    }
  });

  const result = await res.json();

  console.log(result, "result from getMe");

  return result;
};
