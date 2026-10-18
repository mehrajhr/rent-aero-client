"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "../_action/rentalActions";
import { toast } from "sonner";
import { CreditCard, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface RentalActionsCellProps {
  orderId: string;
  status: string;
}

export default function RentalActionsCell({
  orderId,
  status,
}: RentalActionsCellProps) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, "CANCELLED");
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap justify-end">
      {/* View Details Button */}
      <Button asChild size="sm" variant="outline">
        <Link href={`/customer-dashboard/rentals/${orderId}`}>
          View Details
        </Link>
      </Button>

      {/* Cancel Order: Only when status is PLACED (before provider confirmation) */}
      {status === "PLACED" && (
        <Button
          size="sm"
          variant="destructive"
          disabled={isPending}
          onClick={handleCancel}
          className="gap-1"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <XCircle className="h-3.5 w-3.5" />
          )}
          Cancel Order
        </Button>
      )}

      {/* Payment Option: Show ONLY when provider confirms (e.g. status === "CONFIRMED") */}
      {status === "CONFIRMED" && (
        <Button
          size="sm"
          className="gap-1.5 bg-green-600 hover:bg-green-700 text-white"
        >
          <Link href={`/customer-dashboard/rentals/${orderId}/payment`} className="flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5" /> Pay Now
          </Link>
        </Button>
      )}

      {status === "CANCELLED" && (
        <span className="text-xs font-semibold text-destructive italic">
          Order Cancelled
        </span>
      )}
    </div>
  );
}
