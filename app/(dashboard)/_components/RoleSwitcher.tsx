"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Loader2 } from "lucide-react";

interface RoleSwitcherProps {
  originalRole: "ADMIN" | "PROVIDER" | "CUSTOMER";
  currentViewRole: "ADMIN" | "PROVIDER" | "CUSTOMER";
}

export default function RoleSwitcher({ originalRole, currentViewRole }: RoleSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // যদি ইউজার রিয়েললি কাস্টমার হয়, তবে সুইচিং দেখানোর দরকার নেই
  if (originalRole === "CUSTOMER") return null;

  const targetRole = currentViewRole === "CUSTOMER" ? originalRole : "CUSTOMER";
  const buttonLabel = currentViewRole === "CUSTOMER" ? `Switch to ${originalRole} Dashboard` : "Switch to Customer View";

  const handleSwitch = () => {
    startTransition(async () => {
      // কুকিতে বর্তমান ভিউ রোল সেট করার জন্য একটি এপিআই কল বা কুকি আপডেট করতে পারেন
      document.cookie = `activeViewRole=${targetRole}; path=/; max-age=86400`;
      router.refresh();
    });
  };

  return (
    <div className="pt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSwitch}
        disabled={isPending}
        className="w-full justify-center gap-2 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10"
      >
        {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowLeftRight className="h-3.5 w-3.5" />}
        <span>{buttonLabel}</span>
      </Button>
    </div>
  );
}