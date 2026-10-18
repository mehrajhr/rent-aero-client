"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateProfile } from "../_action/profileAction";
import { Loader2, Save, UserCheck } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: string;
  createdAt: string;
}

export default function ProfileEditForm({ user }: { user: UserProfile }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState<"CUSTOMER" | "PROVIDER">(
    user.role === "ADMIN" ? "CUSTOMER" : (user.role as "CUSTOMER" | "PROVIDER")
  );
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const payload: { name?: string; email?: string; role?: "CUSTOMER" | "PROVIDER" } = {};

      if (name.trim() !== user.name) payload.name = name.trim();
      if (email.trim() !== user.email) payload.email = email.trim();
      if (user.role !== "ADMIN" && role !== user.role) payload.role = role;

      if (Object.keys(payload).length === 0) {
        toast.info("No changes detected.");
        return;
      }

      const result = await updateProfile(payload);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            className="rounded-xl"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="rounded-xl"
          />
        </div>

        {/* Account Role Field */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider">
            Account Role
          </Label>
          
          {user.role === "ADMIN" ? (
            <div className="p-3 rounded-xl border bg-muted/40 text-sm font-semibold text-muted-foreground flex items-center justify-between">
              <span>ADMIN (System Role - Cannot be downgraded)</span>
              <UserCheck className="h-4 w-4 text-primary" />
            </div>
          ) : (
            <Select
              value={role}
              onValueChange={(value: "CUSTOMER" | "PROVIDER") => setRole(value)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select account role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="PROVIDER">
                  Provider
                </SelectItem>
              </SelectContent>
            </Select>
          )}

          <p className="text-xs text-muted-foreground pt-1">
            Upgrading to a <strong>Provider</strong> allows you to list your own gear on RentAero while keeping customer rental access.
          </p>
        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" disabled={isPending} className="rounded-xl gap-2 px-6">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving Changes...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Profile Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}