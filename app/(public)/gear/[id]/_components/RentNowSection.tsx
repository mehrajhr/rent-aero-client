"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ShieldCheck, Plus, Minus, Loader2 } from "lucide-react";
import { format, differenceInDays, parseISO, startOfToday } from "date-fns";
import { createRentalOrder } from "../../../_action/rentalAction"; 
import { fetchGearAvailability } from "../../../_action/gearActions";
import { toast } from "sonner"; 

interface RentNowProps {
  pricePerDay: number;
  gearId: string;
  maxStock: number;
  isLoggedIn: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
}

export default function RentNowSection({ pricePerDay, gearId, maxStock, isLoggedIn, initialStartDate, initialEndDate }: RentNowProps) {
  const router = useRouter();
  const parseDate = (value?: string) => value ? parseISO(`${value.slice(0, 10)}T12:00:00`) : undefined;
  const [startDate, setStartDate] = useState<Date | undefined>(() => parseDate(initialStartDate));
  const [endDate, setEndDate] = useState<Date | undefined>(() => parseDate(initialEndDate));
  const [quantity, setQuantity] = useState<number>(1);
  const [availableStock, setAvailableStock] = useState<number | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [isPending, startTransition] = useTransition();

  const hasValidDates = Boolean(startDate && endDate && endDate > startDate && startDate >= startOfToday());
  useEffect(() => {
    if (!hasValidDates || !startDate || !endDate) { setAvailableStock(null); return; }
    let active = true;
    setCheckingAvailability(true);
    setAvailableStock(null);
    fetchGearAvailability(gearId, format(startDate, "yyyy-MM-dd"), format(endDate, "yyyy-MM-dd"))
      .then((availability) => { if (active) setAvailableStock(availability?.availableStock ?? 0); })
      .finally(() => { if (active) setCheckingAvailability(false); });
    return () => { active = false; };
  }, [gearId, startDate, endDate, hasValidDates]);

  const effectiveStock = hasValidDates ? availableStock ?? 0 : maxStock;
  const rentalDays = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate)) : 0;
  const totalPrice = rentalDays * pricePerDay * quantity;

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc" && quantity < effectiveStock) {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRentNow = () => {
    if (!startDate || !endDate) return;

    startTransition(async () => {
      const payload = {
        startDate: format(startDate, "yyyy-MM-dd'T'00:00:00.000'Z'"),
        endDate: format(endDate, "yyyy-MM-dd'T'00:00:00.000'Z'"),
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
        <label className="text-xs font-semibold">Quantity (Available: {effectiveStock})</label>
        {hasValidDates && <p aria-live="polite" className="text-xs text-muted-foreground">{checkingAvailability ? "Checking dates…" : `${effectiveStock} unit(s) available for selected dates`}</p>}
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
              disabled={quantity >= effectiveStock || checkingAvailability}
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
              <Calendar mode="single" selected={startDate} disabled={{ before: startOfToday() }} onSelect={(date) => { setStartDate(date); if (date && endDate && endDate <= date) setEndDate(undefined); }} />
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
              <Calendar mode="single" selected={endDate} disabled={{ before: startDate ?? startOfToday() }} onSelect={setEndDate} />
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
        disabled={!hasValidDates || isPending || checkingAvailability || (hasValidDates && (!availableStock || quantity > (availableStock ?? 0)))}
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
