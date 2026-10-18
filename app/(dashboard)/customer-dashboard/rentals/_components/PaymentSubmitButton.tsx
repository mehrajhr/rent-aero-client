"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function PaymentSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full gap-2 cursor-pointer hover:cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting to Secure Gateway...
        </>
      ) : (
        <>
          <ShieldCheck className="h-4 w-4" />
          Proceed to Pay Securely
        </>
      )}
    </Button>
  );
}