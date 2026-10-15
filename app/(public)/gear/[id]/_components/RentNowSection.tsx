"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ShieldCheck } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface RentNowProps {
  pricePerDay: number;
  gearId: string;
}

export default function RentNowSection({ pricePerDay, gearId }: RentNowProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const rentalDays = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate)) : 0;
  const totalPrice = rentalDays * pricePerDay;

  return (
    <div className="rounded-xl border bg-card p-6 shadow-md space-y-6">
      <div className="space-y-1">
        <span className="text-2xl font-black text-primary">${pricePerDay.toFixed(2)}</span>
        <span className="text-xs text-muted-foreground"> / day</span>
      </div>

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
            <span>${pricePerDay.toFixed(2)} x {rentalDays} days</span>
            <span className="font-semibold">${totalPrice}</span>
          </div>
          <div className="flex justify-between font-bold text-sm text-foreground border-t pt-2">
            <span>Total Amount</span>
            <span className="text-primary">${totalPrice}</span>
          </div>
        </div>
      )}

      <Button className="w-full" size="lg" disabled={!startDate || !endDate}>
        Rent Now
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2">
        <ShieldCheck className="h-4 w-4 text-green-600" />
        <span>Verified Insurance Protected</span>
      </div>
    </div>
  );
}