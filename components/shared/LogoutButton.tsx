"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/service/logoutUser";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center w-full cursor-pointer text-red-600 focus:text-red-600"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>{isPending ? "Logging out..." : "Log out"}</span>
    </div>
  );
}
