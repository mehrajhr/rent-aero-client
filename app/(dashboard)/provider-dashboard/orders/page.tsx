export const dynamic = "force-dynamic";
import { fetchProviderOrders } from "../_action/providerOrderActions";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, User } from "lucide-react";
import ProviderOrderActionsCell from "../_components/ProviderOrderActionsCell";

export default async function ProviderOrdersPage() {
  const orders = await fetchProviderOrders();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Incoming Rental Orders</h1>
        <p className="text-muted-foreground text-sm">
          Manage rental requests from customers, confirm bookings, and update fulfillment statuses.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <Package className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No incoming orders</h3>
          <p className="text-sm text-muted-foreground">You don't have any rental requests for your gear yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => {
            const startDate = new Date(order.startDate).toLocaleDateString();
            const endDate = new Date(order.endDate).toLocaleDateString();
            const firstItem = order.items?.[0]?.gear;

            return (
              <div
                key={order.id}
                className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      #{order.id.slice(0, 8)}
                    </Badge>
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

                  <div>
                    <h3 className="font-bold text-lg">{firstItem?.name || "Equipment Rental"}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <User className="h-3.5 w-3.5 text-primary" /> Customer: {order.customer?.name} ({order.customer?.email})
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> {startDate} - {endDate}
                    </span>
                    <span className="font-bold text-foreground">Total: ${order.totalAmount}</span>
                  </div>
                </div>

                <ProviderOrderActionsCell orderId={order.id} currentStatus={order.status} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}