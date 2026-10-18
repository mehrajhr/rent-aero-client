"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProviderOrderStatus } from "../_action/providerOrderActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface ProviderOrderActionsProps {
  orderId: string;
  currentStatus: string;
}

export default function ProviderOrderActionsCell({
  orderId,
  currentStatus,
}: ProviderOrderActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      const res = await updateProviderOrderStatus(orderId, newStatus);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="flex items-center gap-3 flex-wrap justify-end">
      {/* View Details Button */}
      <Button asChild size="sm" variant="outline">
        <Link href={`/provider-dashboard/orders/${orderId}`}>View Details</Link>
      </Button>

      {/* Status Selector for Provider */}
      <div className="flex items-center gap-2">
        {isPending && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
        <Select
          defaultValue={currentStatus}
          onValueChange={handleStatusChange}
          disabled={isPending || currentStatus === "CANCELLED" || currentStatus === "RETURNED"}
        >
          <SelectTrigger className="w-37.5 text-xs h-9 rounded-xl">
            <SelectValue placeholder="Update Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PLACED">PLACED</SelectItem>
            <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
            <SelectItem value="PICKED_UP">PICKED UP</SelectItem>
            <SelectItem value="RETURNED">RETURNED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}