export const dynamic = "force-dynamic";
import { fetchAllRentalOrders } from "../_action/rentalAction";
import OrdersTableClient from "../_components/OrdersTableClient";

export default async function AdminAllRentalOrdersPage() {
  const orders = await fetchAllRentalOrders();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">All Rental Orders</h1>
        <p className="text-muted-foreground text-sm">
          Track and monitor all equipment rental bookings, customer records, and provider assignments.
        </p>
      </div>

      {/* Main Client Table Component */}
      <OrdersTableClient initialOrders={orders} />
    </div>
  );
}