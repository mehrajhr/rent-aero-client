import { notFound } from "next/navigation";
import { fetchProviderOrderDetails } from "../../_action/providerOrderActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProviderOrderDetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const order = await fetchProviderOrderDetails(id);

  if (!order) {
    notFound();
  }

  const startDate = new Date(order.startDate).toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const endDate = new Date(order.endDate).toLocaleDateString("en-US", {
    dateStyle: "medium",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-3 text-muted-foreground">
          <Link href="/provider-dashboard/orders">
            <ArrowLeft className="h-4 w-4" /> Back to Incoming Orders
          </Link>
        </Button>
      </div>

      {/* Order Header Summary */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">Order #{order.id.slice(0, 8)}</h1>
              <Badge
                className={
                  order.status === "PLACED"
                    ? "bg-amber-500/10 text-amber-600"
                    : order.status === "CONFIRMED"
                    ? "bg-blue-500/10 text-blue-600"
                    : order.status === "PICKED_UP"
                    ? "bg-purple-500/10 text-purple-600"
                    : order.status === "CANCELLED"
                    ? "bg-red-500/10 text-red-600"
                    : "bg-green-500/10 text-green-600"
                }
              >
                {order.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Requested on {new Date(order.createdAt).toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Earnings</p>
            <p className="text-2xl font-black text-primary">${order.totalAmount}</p>
          </div>
        </div>

        {/* Customer Info & Rental Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-muted/20 p-4 space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase">Rental Period</p>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{startDate} &rarr; {endDate}</span>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/20 p-4 space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase">Customer Contact</p>
            <div className="space-y-1 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span>{order.customer?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span>{order.customer?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rented Items */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="font-bold text-xl tracking-tight">Requested Gear Items</h3>

        <div className="space-y-4">
          {order.items?.map((item: any) => (
            <div key={item.id} className="rounded-xl border p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">{item.gear?.brand}</Badge>
                  <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                </div>
                <h4 className="font-bold text-lg">{item.gear?.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{item.gear?.description}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">Rental Rate</p>
                <p className="font-bold text-lg text-primary">${item.priceAtRental} / day</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}