import { notFound } from "next/navigation";
import { fetchPaymentDetails } from "../_action/paymentActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Store, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface PaymentDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const { id } = await params;
  const payment = await fetchPaymentDetails(id);

  if (!payment) {
    notFound();
  }

  const formattedDate = new Date(payment.createdAt).toLocaleDateString(
    "en-US",
    {
      dateStyle: "long",
    },
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="gap-2 -ml-3 text-muted-foreground"
        >
          <Link href="/customer-dashboard/payments">
            <ArrowLeft className="h-4 w-4" /> Back to Payment History
          </Link>
        </Button>
      </div>

      {/* Payment Summary Header */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">
                Transaction #{payment.id.slice(0, 8)}
              </h1>
              <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px]">
                <ShieldCheck className="h-3 w-3 mr-1 inline" /> {payment.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Processed on {formattedDate}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase font-semibold">
              Total Paid
            </p>
            <p className="text-3xl font-black text-primary">
              ${payment.amount}{" "}
              <span className="text-sm uppercase">{payment.currency}</span>
            </p>
          </div>
        </div>

        {/* Gateway Meta Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border bg-muted/20 p-4 space-y-1">
            <p className="font-bold text-muted-foreground uppercase">
              Stripe Session ID
            </p>
            <p className="font-mono text-foreground truncate">
              {payment.stripeSessionId || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-4 space-y-1">
            <p className="font-bold text-muted-foreground uppercase">
              Payment Intent ID
            </p>
            <p className="font-mono text-foreground truncate">
              {payment.stripePaymentIntentId || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Associated Order Information */}
      {payment.order && (
        <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-bold text-xl tracking-tight">
              Associated Rental Order
            </h3>
            <Badge variant="outline" className="font-mono">
              Order Status: {payment.order.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border bg-muted/10 p-4 space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Provider Info
              </p>
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Store className="h-4 w-4 text-primary" />
                <span>
                  {payment.order.provider?.name} (
                  {payment.order.provider?.email})
                </span>
              </div>
            </div>

            <div className="rounded-xl border bg-muted/10 p-4 space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Rental Period
              </p>
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {new Date(payment.order.startDate).toLocaleDateString()}{" "}
                  &rarr; {new Date(payment.order.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3 pt-4">
            <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">
              Rented Equipment
            </h4>
            {payment.order.items?.map((item: any) => (
              <div
                key={item.id}
                className="rounded-xl border p-4 flex justify-between items-center bg-muted/5"
              >
                <div>
                  <h5 className="font-bold">{item.gear?.name}</h5>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity} | Brand: {item.gear?.brand}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">
                    ${item.priceAtRental} / day
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
