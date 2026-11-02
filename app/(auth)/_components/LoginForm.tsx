"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "../_action/authAction";

const LoginForm = ({ redirectTo }: { redirectTo: string }) => {
  const [state, action, isPending] = useActionState(loginUser, false);
  const router = useRouter();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const fillAdminCredentials = () => {
    if (emailInput.current) {
      emailInput.current.value = "admin@gmail.com";
    }
    if (passwordInput.current) {
      passwordInput.current.value = "mehraj1234";
    }
  };

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
      {/* Hidden input to pass redirectTo path to server action */}
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          ref={emailInput}
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
          ref={passwordInput}
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={fillAdminCredentials}
      >
        Login as admin
      </Button>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
