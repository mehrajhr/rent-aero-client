"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Calendar, User, ShoppingBag, Mail, Store, Tag } from "lucide-react";

export default function OrderDetailsModal({ order }: { order: any }) {
  const [open, setOpen] = useState(false);

  const firstItem = order.items?.[0] || {};
  const gear = firstItem.gear || {};
  const customer = order.customer || {};
  const provider = order.provider || {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-3 rounded-xl gap-1 text-xs cursor-pointer">
          <Eye className="h-3.5 w-3.5" /> Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              Order Details <span className="font-mono text-xs text-muted-foreground">(#{order.id.slice(0, 8)})</span>
            </DialogTitle>
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
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Customer & Provider Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Customer Info */}
            <div className="rounded-2xl border bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground border-b pb-2">
                <User className="h-4 w-4 text-primary" /> Customer Information
              </div>
              <div className="space-y-1 text-sm pt-1">
                <p className="font-bold text-foreground">{customer.name || "N/A"}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                  <Mail className="h-3 w-3 text-primary" /> {customer.email || "N/A"}
                </p>
              </div>
            </div>

            {/* Provider Info */}
            <div className="rounded-2xl border bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground border-b pb-2">
                <Store className="h-4 w-4 text-primary" /> Provider Information
              </div>
              <div className="space-y-1 text-sm pt-1">
                <p className="font-bold text-foreground">{provider.name || "N/A"}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                  <Mail className="h-3 w-3 text-primary" /> {provider.email || "N/A"}
                </p>
              </div>
            </div>

          </div>

          {/* Rental Duration & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border bg-muted/20 p-3">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Start Date</span>
              <span className="text-xs font-bold text-foreground flex items-center gap-1 mt-1 font-mono">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {new Date(order.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="rounded-xl border bg-muted/20 p-3">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">End Date</span>
              <span className="text-xs font-bold text-foreground flex items-center gap-1 mt-1 font-mono">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {new Date(order.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="rounded-xl border bg-primary/10 p-3 flex flex-col justify-center">
              <span className="text-[10px] text-primary uppercase font-bold block">Total Amount</span>
              <span className="text-lg font-black text-primary">${order.totalAmount}</span>
            </div>
          </div>

          {/* Rented Gear Details */}
          <div className="rounded-2xl border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between border-pb pb-2 border-b">
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                <ShoppingBag className="h-4 w-4 text-primary" /> Rented Equipment
              </h4>
              <Badge variant="outline" className="font-bold font-mono text-xs">
                <Tag className="h-3 w-3 mr-1 text-primary" /> {gear.brand || "Brand"}
              </Badge>
            </div>

            <div className="space-y-1">
              <h5 className="font-extrabold text-base text-foreground">{gear.name || "Gear Name"}</h5>
              <p className="text-xs text-muted-foreground">{gear.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs border-t">
              <div>
                <span className="text-muted-foreground">Quantity Rented:</span>
                <p className="font-bold text-foreground">{firstItem.quantity || 1}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Price At Rental:</span>
                <p className="font-bold text-primary">${firstItem.priceAtRental}/day</p>
              </div>
              <div>
                <span className="text-muted-foreground">Available Stock:</span>
                <p className="font-bold text-foreground">{gear.stock}</p>
              </div>
            </div>

            {/* Dynamic Specifications */}
            {gear.specifications && Object.keys(gear.specifications).length > 0 && (
              <div className="pt-2 border-t space-y-1.5">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Gear Specifications:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(gear.specifications).map(([key, val]: [string, any]) => (
                    <div key={key} className="rounded-xl border bg-muted/10 p-2">
                      <span className="text-[9px] text-muted-foreground block uppercase font-medium">{key}</span>
                      <span className="text-xs font-bold text-foreground">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}