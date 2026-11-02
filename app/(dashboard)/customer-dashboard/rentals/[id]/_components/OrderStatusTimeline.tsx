import { Check, Circle, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type StatusEvent = { id: string; status: string; createdAt: string };

const labels: Record<string, string> = {
  PLACED: "Order placed",
  CONFIRMED: "Confirmed by provider",
  PAID: "Payment received",
  PICKED_UP: "Gear picked up",
  RETURNED: "Gear returned",
  CANCELLED: "Order cancelled",
};

const nextActions: Record<string, string> = {
  PLACED: "Your order is waiting for the provider to confirm it.",
  CONFIRMED: "Your order is confirmed. Complete payment before pickup.",
  PAID: "Payment is complete. Arrange pickup with your provider.",
  PICKED_UP: "Enjoy your rental and return the gear by the end date.",
  RETURNED: "Rental complete. You can leave or update your gear review below.",
  CANCELLED: "This order was cancelled and has no further steps.",
};

export default function OrderStatusTimeline({ history, currentStatus }: { history?: StatusEvent[]; currentStatus: string }) {
  const events = history?.length ? history : [];
  const hasCurrent = events.some((event) => event.status === currentStatus);
  const timeline = hasCurrent ? events : [...events, { id: "current", status: currentStatus, createdAt: "" }];

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8" aria-label="Order status timeline">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Order progress</h2>
          <p className="mt-1 text-sm text-muted-foreground">A timestamped record of your rental status.</p>
        </div>
        <Badge variant="secondary">{labels[currentStatus] ?? currentStatus.replaceAll("_", " ")}</Badge>
      </div>
      {nextActions[currentStatus] && <p className="mb-6 rounded-lg bg-muted/50 px-4 py-3 text-sm">{nextActions[currentStatus]}</p>}
      {timeline.length ? <ol className="space-y-0">
        {timeline.map((event, index) => (
          <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
            {index < timeline.length - 1 && <span aria-hidden="true" className="absolute left-[11px] top-6 h-full w-px bg-border" />}
            <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {index === timeline.length - 1 ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-2.5 w-2.5 fill-current" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{labels[event.status] ?? event.status.replaceAll("_", " ")}</p>
              {event.createdAt ? <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(event.createdAt))}</p> : <p className="mt-1 text-xs text-muted-foreground">Current status</p>}
            </div>
          </li>
        ))}
      </ol> : <p className="text-sm text-muted-foreground">Status history is not available for this order yet.</p>}
    </section>
  );
}
