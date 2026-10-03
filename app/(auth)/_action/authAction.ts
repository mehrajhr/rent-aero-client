"use server";

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
