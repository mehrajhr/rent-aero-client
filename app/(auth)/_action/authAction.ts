"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

type RegisterState = {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

export async function loginUser(prevState: LoginState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success && result.data) {
    const cookieStore = await cookies();

    // set cookies
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedToken && decodedToken.role) {
      const role = decodedToken.role.toLowerCase(); // admin, provider, customer

      if (role === "ADMIN") {
        redirect("/admin-dashboard");
      } else if (role === "PROVIDER") {
        redirect("/provider-dashboard");
      } else {
        redirect("/customer-dashboard");
      }
    } else {
      redirect("/");
    }
  }

  return result;
}

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string; // CUSTOMER ba PROVIDER
  const payload = { name, email, password, role };

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
}
