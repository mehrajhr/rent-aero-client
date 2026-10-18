import { fetchMyRentals } from "./_action/rentalActions";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, User, Store } from "lucide-react";
import RentalActionsCell from "./_components/RentalActionsCell";

export default async function MyRentalsPage() {
  const rentals = await fetchMyRentals();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My Rental Orders</h1>
        <p className="text-muted-foreground text-sm">
          Track your gear rentals, cancel unconfirmed orders, or complete payments.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <Package className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No rental orders found</h3>
          <p className="text-sm text-muted-foreground">You haven't placed any rental orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental: any) => {
            const startDate = new Date(rental.startDate).toLocaleDateString();
            const endDate = new Date(rental.endDate).toLocaleDateString();
            const firstItem = rental.items?.[0]?.gear;

            return (
              <div
                key={rental.id}
                className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      #{rental.id.slice(0, 8)}
                    </Badge>
                    <Badge
                      className={
                        rental.status === "PLACED"
                          ? "bg-amber-500/10 text-amber-600"
                          : rental.status === "CONFIRMED"
                          ? "bg-blue-500/10 text-blue-600"
                          : rental.status === "CANCELLED"
                          ? "bg-red-500/10 text-red-600"
                          : "bg-green-500/10 text-green-600"
                      }
                    >
                      {rental.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">{firstItem?.name || "Equipment Rental"}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Store className="h-3.5 w-3.5 text-primary" /> Provider: {rental.provider?.name}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> {startDate} - {endDate}
                    </span>
                    <span className="font-bold text-foreground">Total: ${rental.totalAmount}</span>
                  </div>
                </div>

                <RentalActionsCell orderId={rental.id} status={rental.status} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}