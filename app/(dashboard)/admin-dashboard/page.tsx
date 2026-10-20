import { fetchAdminOverviewStats } from "./_action/adminStatsActions";
import { Users, Boxes, ClipboardList, DollarSign, TrendingUp, ArrowRight, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminOverviewPage() {
  const stats = await fetchAdminOverviewStats();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-linear-to-r from-primary/10 via-primary/5 to-card rounded-3xl p-6 md:p-8 border shadow-sm">
        <div className="space-y-1">
          <Badge className="bg-primary/20 text-primary border-none font-bold mb-1">
            Admin Control Center
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">Platform Overview</h1>
          <p className="text-muted-foreground text-sm">
            Monitor system metrics, review latest equipment listings, and track rental operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-xl font-bold">
            <Link href="/admin-dashboard/gear">Manage Gear</Link>
          </Button>
          <Button asChild className="rounded-xl font-bold">
            <Link href="/admin-dashboard/orders">View Orders</Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-muted-foreground">Total Revenue</span>
            <div className="h-9 w-9 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center font-bold">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-foreground">${stats.totalRevenue}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-600" /> Platform-wide earnings
          </p>
        </div>

        {/* Total Rentals */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-muted-foreground">Rental Orders</span>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-foreground">{stats.totalRentals}</p>
          <p className="text-[11px] text-muted-foreground">Total bookings recorded</p>
        </div>

        {/* Total Gear */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-muted-foreground">Equipment Listed</span>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
              <Boxes className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-foreground">{stats.totalGears}</p>
          <p className="text-[11px] text-muted-foreground">Active items in catalog</p>
        </div>

        {/* Total Users */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-muted-foreground">Registered Users</span>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-foreground">{stats.totalUsers}</p>
          <p className="text-[11px] text-muted-foreground">Customers, providers & admins</p>
        </div>
      </div>

      {/* Recent Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Rental Orders */}
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b flex items-center justify-between bg-muted/20">
            <div>
              <h3 className="font-extrabold text-base">Recent Rental Orders</h3>
              <p className="text-xs text-muted-foreground">Latest transactions across the platform</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="rounded-xl text-xs gap-1">
              <Link href="/admin-dashboard/orders">View All <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>

          <div className="overflow-x-auto flex-1">
            {stats.recentRentals.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground">No recent rentals found</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b text-[10px] uppercase text-muted-foreground">
                  <tr>
                    <th className="p-3.5 font-bold">Order ID</th>
                    <th className="p-3.5 font-bold">Customer</th>
                    <th className="p-3.5 font-bold">Amount</th>
                    <th className="p-3.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {stats.recentRentals.map((order: any) => (
                    <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-xs">#{order.id.slice(0, 6)}</td>
                      <td className="p-3.5 text-xs font-semibold">{order.customer?.name || "N/A"}</td>
                      <td className="p-3.5 font-extrabold text-primary">${order.totalAmount}</td>
                      <td className="p-3.5">
                        <Badge className="bg-blue-500/10 text-blue-600 border-none font-bold text-[10px]">
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Registered Users */}
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b flex items-center justify-between bg-muted/20">
            <div>
              <h3 className="font-extrabold text-base">New Registered Users</h3>
              <p className="text-xs text-muted-foreground">Latest accounts created on platform</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="rounded-xl text-xs gap-1">
              <Link href="/admin-dashboard/users">View All <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>

          <div className="overflow-x-auto flex-1">
            {stats.recentUsers.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground">No recent users found</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b text-[10px] uppercase text-muted-foreground">
                  <tr>
                    <th className="p-3.5 font-bold">User</th>
                    <th className="p-3.5 font-bold">Role</th>
                    <th className="p-3.5 font-bold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {stats.recentUsers.map((user: any) => (
                    <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-3.5">
                        <div className="space-y-0.5">
                          <p className="font-bold text-xs">{user.name || "N/A"}</p>
                          <p className="text-[10px] text-muted-foreground">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <Badge className="bg-purple-500/10 text-purple-600 border-none font-bold text-[10px]">
                          <Shield className="h-2.5 w-2.5 mr-1 inline" /> {user.role}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-xs text-muted-foreground font-mono">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}