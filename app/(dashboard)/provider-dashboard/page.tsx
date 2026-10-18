import { fetchProviderOverviewData } from "./_action/overviewActions";
import { getMe } from "@/service/getMe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Boxes,
  ClipboardList,
  DollarSign,
  PackagePlus,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default async function ProviderOverviewPage() {
  const [meRes, overviewData] = await Promise.all([
    getMe(),
    fetchProviderOverviewData(),
  ]);

  const userName = meRes?.data?.user?.name || "Provider";
  const stats = overviewData?.stats || {
    totalGearCount: 0,
    availableGearCount: 0,
    pendingOrdersCount: 0,
    activeRentalsCount: 0,
    totalEarnings: 0,
  };

  const recentOrders = overviewData?.recentOrders || [];
  const topGears = overviewData?.topGears || [];

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8 border">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your gear listings, track incoming rental requests, and monitor your revenue.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-xl gap-2 shadow-sm shrink-0">
          <Link href="/provider-dashboard/gear/new">
            <PackagePlus className="h-4 w-4" /> Add New Gear
          </Link>
        </Button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Total Revenue
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">${stats.totalEarnings}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" /> Earned from gear rentals
            </p>
          </CardContent>
        </Card>

        {/* Pending Order Requests */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Pending Requests
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{stats.pendingOrdersCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires your response</p>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Active Rentals
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ClipboardList className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{stats.activeRentalsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Gear currently with clients</p>
          </CardContent>
        </Card>

        {/* Listed Inventory */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
              Total Listed Gear
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Boxes className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">{stats.totalGearCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.availableGearCount} available right now
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Incoming Orders (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Recent Incoming Orders</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link href="/provider-dashboard/orders">
                Manage Orders <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center space-y-2">
              <ClipboardList className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="font-semibold text-sm">No incoming orders yet</p>
              <p className="text-xs text-muted-foreground">
                Orders placed for your listed gear will show up here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order: any) => {
                const firstItem = order.items?.[0]?.gear;
                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-[10px]">
                          #{order.id.slice(0, 8)}
                        </Badge>
                        <Badge
                          className={
                            order.status === "PLACED"
                              ? "bg-amber-500/10 text-amber-600"
                              : order.status === "CONFIRMED"
                              ? "bg-blue-500/10 text-blue-600"
                              : order.status === "PICKED_UP"
                              ? "bg-purple-500/10 text-purple-600"
                              : order.status === "CANCELLED"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-green-500/10 text-green-600"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-base">{firstItem?.name || "Rental Request"}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />{" "}
                        {new Date(order.startDate).toLocaleDateString()} &rarr;{" "}
                        {new Date(order.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                      <span className="font-extrabold text-lg text-primary">${order.totalAmount}</span>
                      <Button asChild size="sm" variant="outline" className="rounded-xl">
                        <Link href="/provider-dashboard/orders">Review</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Inventory Summary (1 Column) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Your Equipment</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link href="/provider-dashboard/gear">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {topGears.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center space-y-2">
              <Boxes className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="font-semibold text-sm">No inventory found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topGears.map((gear: any) => (
                <div
                  key={gear.id}
                  className="rounded-2xl border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="font-bold uppercase text-[10px]">
                      {gear.brand}
                    </Badge>
                    <Badge
                      className={
                        gear.isAvailable
                          ? "bg-green-500/10 text-green-600 border-none"
                          : "bg-red-500/10 text-red-600 border-none"
                      }
                    >
                      {gear.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-sm line-clamp-1">{gear.name}</h3>

                  <div className="flex items-center justify-between text-xs font-medium pt-1">
                    <span className="text-muted-foreground">
                      Stock: <strong className="text-foreground">{gear.stock}</strong>
                    </span>
                    <span className="font-extrabold text-primary">${gear.pricePerDay}/day</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}