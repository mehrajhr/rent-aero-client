import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CreditCard } from "lucide-react";
import PaymentSubmitButton from "../../_components/PaymentSubmitButton";

// Server action to trigger payment checkout session and redirect
async function handleCheckout(orderId: string) {
  "use server";

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      redirect("/login");
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/payments/checkout/${orderId}`, {
      method: "POST",
      headers: {
        Authorization: accessToken, // Without Bearer as per your backend specification
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (result.success && result.data?.checkoutUrl) {
      redirect(result.data.checkoutUrl);
    } else {
      console.error("Failed to create checkout session:", result.message);
    }
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Payment checkout error:", error);
  }
}

export default async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="max-w-md mx-auto rounded-2xl border bg-card p-8 shadow-sm space-y-6 text-center my-12">
      <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
        <CreditCard className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Complete Payment</h1>
        <p className="text-xs text-muted-foreground">
          Securely complete your rental payment via Stripe checkout gateway.
        </p>
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 text-left space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order ID:</span>
          <span className="font-mono font-semibold">#{id.slice(0, 8)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gateway:</span>
          <span className="font-semibold text-primary">Stripe Secure Checkout</span>
        </div>
      </div>

      {/* Form with Client Submit Button for loading & pointer cursor */}
      <form action={handleCheckout.bind(null, id)}>
        <PaymentSubmitButton />
      </form>
    </div>
  );
}