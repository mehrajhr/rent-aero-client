import { fetchCustomerOverviewData } from "./_action/overviewActions";
import { getMe } from "@/service/getMe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  CreditCard,
  Clock,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default async function CustomerOverviewPage() {
  const [meRes, overviewData] = await Promise.all([
    getMe(),
    fetchCustomerOverviewData(),
  ]);

  const userName = meRes?.data?.user?.name || "Customer";
  const stats = overviewData?.stats || {
    totalRentals: 0,
    activeRentals: 0,
    pendingConfirmations: 0,
    totalSpent: 0,
  };
  const recentRentals = overviewData?.recentRentals || [];
  const recentPayments = overviewData?.recentPayments || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8 border">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's an overview of your active gear rentals, payment activity, and order statuses.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-xl gap-2 shadow-sm shrink-0">
          <Link href="/">
            <PlusCircle className="h-4 w-4" /> Browse Gear
          </Link>
        </Button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Rentals */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Active Rentals
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{stats.activeRentals}</div>
            <p className="text-xs text-muted-foreground mt-1">Gear currently with you</p>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Pending Approval
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{stats.pendingConfirmations}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting provider confirmation</p>
          </CardContent>
        </Card>

        {/* Total Spent */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Total Investment
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">${stats.totalSpent}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime rental expenditure</p>
          </CardContent>
        </Card>

        {/* Total Completed Orders */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Total Orders
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{stats.totalRentals}</div>
            <p className="text-xs text-muted-foreground mt-1">All-time bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Split: Recent Rentals & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Rentals List (2 Columns on large screen) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Recent Rental Orders</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link href="/customer-dashboard/rentals">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {recentRentals.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center space-y-2">
              <ShoppingBag className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="font-semibold text-sm">No rental orders yet</p>
              <p className="text-xs text-muted-foreground">Start exploring gear to make your first rental request.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRentals.map((rental: any) => {
                const firstItem = rental.items?.[0]?.gear;
                return (
                  <div
                    key={rental.id}
                    className="rounded-2xl border bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-[10px]">
                          #{rental.id.slice(0, 8)}
                        </Badge>
                        <Badge
                          className={
                            rental.status === "PLACED"
                              ? "bg-amber-500/10 text-amber-600"
                              : rental.status === "CONFIRMED"
                              ? "bg-blue-500/10 text-blue-600"
                              : rental.status === "PICKED_UP"
                              ? "bg-purple-500/10 text-purple-600"
                              : rental.status === "CANCELLED"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-green-500/10 text-green-600"
                          }
                        >
                          {rental.status}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-base">{firstItem?.name || "Equipment Rental"}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />{" "}
                        {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                      <span className="font-extrabold text-lg text-primary">${rental.totalAmount}</span>
                      <Button asChild size="sm" variant="outline" className="rounded-xl">
                        <Link href={`/customer-dashboard/rentals/${rental.id}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Payments (1 Column) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Recent Payments</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link href="/customer-dashboard/payments">
                History <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {recentPayments.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center space-y-2">
              <CreditCard className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="font-semibold text-sm">No payment history</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPayments.map((payment: any) => (
                <div
                  key={payment.id}
                  className="rounded-2xl border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground">
                      #{payment.id.slice(0, 8)}
                    </span>
                    <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px]">
                      <ShieldCheck className="h-3 w-3 mr-1 inline" /> {payment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Stripe Payment</span>
                    <span className="font-black text-base text-primary">${payment.amount}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}