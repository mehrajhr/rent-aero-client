import Link from "next/link";
import LoginForm from "../_components/LoginForm";
import { Suspense } from "react";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirectTo || "";
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your RentAero account
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm redirectTo={redirectTo}/>
        </Suspense>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
