import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface PaymentCallbackProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function PaymentCallbackPage({ searchParams }: PaymentCallbackProps) {
  const params = await searchParams;
  const isSuccess = params.success === "true";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-lg space-y-6">
        {isSuccess ? (
          <>
            <div className="h-16 w-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Payment Successful!</h1>
              <p className="text-xs text-muted-foreground">
                Your payment has been processed successfully. Your rental order is now confirmed.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
              <XCircle className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Payment Failed / Cancelled</h1>
              <p className="text-xs text-muted-foreground">
                Something went wrong with your transaction or you cancelled the payment.
              </p>
            </div>
          </>
        )}

        <Button asChild className="w-full">
          <Link href="/customer-dashboard/payments">Go to Payment History</Link>
        </Button>
      </div>
    </div>
  );
}