"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ShieldCheck, Plus, Minus, Loader2 } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { createRentalOrder } from "../../../_action/rentalAction"; 
import { toast } from "sonner"; 

interface RentNowProps {
  pricePerDay: number;
  gearId: string;
  maxStock: number;
  isLoggedIn: boolean;
}

export default function RentNowSection({ pricePerDay, gearId, maxStock, isLoggedIn }: RentNowProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const rentalDays = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate)) : 0;
  const totalPrice = rentalDays * pricePerDay * quantity;

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc" && quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRentNow = () => {
    if (!startDate || !endDate) return;

    startTransition(async () => {
      const payload = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        items: [
          {
            gearId,
            quantity,
          },
        ],
      };

      const result = await createRentalOrder(payload);

      if (result.success) {
        toast.success(result.message);
        router.push("/customer-dashboard"); 
      } else {
        toast.error(result.message);
      }
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-md space-y-4 text-center">
        <h3 className="font-bold text-lg">Want to rent this gear?</h3>
        <p className="text-xs text-muted-foreground">
          Please log in to your account to select rental dates and place an order.
        </p>
        <Button 
          className="w-full" 
          onClick={() => router.push(`/login?redirectTo=${window.location.pathname}`)}
        >
          Login to Rent Gear
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-md space-y-6">
      <div className="space-y-1">
        <span className="text-2xl font-black text-primary">${pricePerDay.toFixed(2)}</span>
        <span className="text-xs text-muted-foreground"> / day</span>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold">Quantity (Stock: {maxStock})</label>
        <div className="flex items-center justify-between rounded-lg border px-3 py-2 bg-muted/20">
          <span className="text-xs font-medium">Select Units</span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleQuantityChange("dec")}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-bold w-4 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleQuantityChange("inc")}
              disabled={quantity >= maxStock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Select Dates */}
      <div className="space-y-3">
        <label className="text-xs font-semibold">Select Rental Dates</label>
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left text-xs">
                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                {startDate ? format(startDate, "PP") : "Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left text-xs">
                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                {endDate ? format(endDate, "PP") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {rentalDays > 0 && (
        <div className="space-y-2 border-t pt-4 text-xs">
          <div className="flex justify-between">
            <span>${pricePerDay} x {rentalDays} days x {quantity} unit(s)</span>
            <span className="font-semibold">${totalPrice}</span>
          </div>
          <div className="flex justify-between font-bold text-sm text-foreground border-t pt-2">
            <span>Total Amount</span>
            <span className="text-primary">${totalPrice}</span>
          </div>
        </div>
      )}

      <Button 
        className="w-full" 
        size="lg" 
        disabled={!startDate || !endDate || isPending}
        onClick={handleRentNow}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing Order...
          </>
        ) : (
          "Place Rental Order"
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2">
        <ShieldCheck className="h-4 w-4 text-green-600" />
        <span>Verified Insurance Protected</span>
      </div>
    </div>
  );
}