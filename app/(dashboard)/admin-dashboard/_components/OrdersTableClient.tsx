"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardList, User, ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import OrderDetailsModal from "./OrderDetailsModal";

interface Props {
  initialOrders: any[];
}

export default function OrdersTableClient({ initialOrders }: Props) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = initialOrders.filter((order) => {
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;

    const customerName = order.customer?.name?.toLowerCase() || "";
    const customerEmail = order.customer?.email?.toLowerCase() || "";
    const providerName = order.provider?.name?.toLowerCase() || "";
    const gearName = order.items?.[0]?.gear?.name?.toLowerCase() || "";
    const orderId = order.id?.toLowerCase() || "";

    const matchesSearch =
      customerName.includes(searchTerm.toLowerCase()) ||
      customerEmail.includes(searchTerm.toLowerCase()) ||
      providerName.includes(searchTerm.toLowerCase()) ||
      gearName.includes(searchTerm.toLowerCase()) ||
      orderId.includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Status Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, customer, provider, or gear..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">Filter Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 rounded-xl">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PLACED">Placed</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="PICKED_UP">Picked Up</SelectItem>
              <SelectItem value="RETURNED">Returned</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <ClipboardList className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No rental orders found</h3>
          <p className="text-xs text-muted-foreground">Try adjusting your search or filter options.</p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-4 font-bold">Order ID</th>
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold">Provider</th>
                  <th className="p-4 font-bold">Item / Gear</th>
                  <th className="p-4 font-bold">Total</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order: any) => {
                  const firstItem = order.items?.[0]?.gear;
                  return (
                    <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-mono font-bold text-xs">
                        #{order.id.slice(0, 8)}
                      </td>

                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs flex items-center gap-1">
                            <User className="h-3 w-3 text-primary" /> {order.customer?.name || "Customer"}
                          </p>
                          <p className="text-[10px] text-muted-foreground">{order.customer?.email}</p>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-foreground">{order.provider?.name || "Provider"}</p>
                          <p className="text-[10px] text-muted-foreground">{order.provider?.email}</p>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-foreground line-clamp-1 flex items-center gap-1.5">
                          <ShoppingBag className="h-3.5 w-3.5 text-primary shrink-0" />
                          {firstItem?.name || "Equipment Rental"}
                        </span>
                      </td>

                      <td className="p-4 font-extrabold text-primary">
                        ${order.totalAmount}
                      </td>

                      <td className="p-4">
                        <Badge
                          className={
                            order.status === "PLACED"
                              ? "bg-amber-500/10 text-amber-600 border-none font-bold"
                              : order.status === "CONFIRMED"
                              ? "bg-blue-500/10 text-blue-600 border-none font-bold"
                              : order.status === "PICKED_UP"
                              ? "bg-purple-500/10 text-purple-600 border-none font-bold"
                              : order.status === "CANCELLED"
                              ? "bg-red-500/10 text-red-600 border-none font-bold"
                              : "bg-green-500/10 text-green-600 border-none font-bold"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>

                      <td className="p-4 text-right">
                        <OrderDetailsModal order={order} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}