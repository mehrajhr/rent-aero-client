export const dynamic = "force-dynamic";
import { fetchPaymentHistory } from "./_action/paymentActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, Store, ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function PaymentsPage() {
  const payments = await fetchPaymentHistory();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Payment History</h1>
        <p className="text-muted-foreground text-sm">
          View all your secure transactions, invoice references, and payment receipts.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <CreditCard className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No payment history found</h3>
          <p className="text-sm text-muted-foreground">You haven't completed any transactions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment: any) => {
            const paymentDate = new Date(payment.createdAt).toLocaleDateString("en-US", {
              dateStyle: "medium",
            });
            const firstItem = payment.order?.items?.[0]?.gear;

            return (
              <div
                key={payment.id}
                className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      Txn: #{payment.id.slice(0, 8)}
                    </Badge>
                    <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px]">
                      <ShieldCheck className="h-3 w-3 mr-1 inline" /> {payment.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {firstItem?.name || "Equipment Rental Payment"}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Store className="h-3.5 w-3.5 text-primary" /> Provider: {payment.order?.provider?.name}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> {paymentDate}
                    </span>
                    <span className="uppercase font-mono text-foreground font-semibold">
                      Currency: usd
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Paid Amount</p>
                    <p className="text-2xl font-black text-primary">${payment.amount}</p>
                  </div>

                  <Button asChild size="sm" className="rounded-xl gap-1">
                    <Link href={`/customer-dashboard/payments/${payment.id}`}>
                      Details <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}