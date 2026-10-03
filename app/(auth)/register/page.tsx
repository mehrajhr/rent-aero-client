import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-sm text-muted-foreground">
            Join Rent-Aero as a Customer or a Provider
          </p>
        </div>

        <RegisterForm />

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
