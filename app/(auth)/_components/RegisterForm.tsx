'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { registerUser } from "../_action/authAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerUser, false);
  const router = useRouter();
  useEffect(() => {
    if (isPending || !state) {
      return;
    }
    if (state.success) {
      toast.success("Account created successfully! Please login to continue.");
      router.replace("/login");
    } else {
      toast.error(
        state.message || "Failed to create account. Please try again.",
      );
    }
  }, [isPending, state, router]);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="Mehraj Hasan" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="mehraj@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Register As</Label>
        <select
          name="role"
          defaultValue="CUSTOMER"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="CUSTOMER">Customer</option>
          <option value="PROVIDER">Provider</option>
        </select>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
