"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "../_action/authAction";

const LoginForm = () => {
  const [state, action, isPending] = useActionState(loginUser, false);
  const router = useRouter();

  useEffect(() => {
    if (!state || isPending) {
      return;
    }

    if (state.success) {
      toast.success("Login successfully");
    }

    toast.error(state.message || "Login failed");
  }, [state, router, isPending]);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="customer@gmail.com"
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

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
