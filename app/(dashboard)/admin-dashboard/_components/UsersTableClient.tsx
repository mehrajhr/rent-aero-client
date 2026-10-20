"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Shield, Mail, Calendar, Search } from "lucide-react";
import UserRoleStatusSwitcher from "./UserRoleStatusSwitcher";

interface Props {
  initialUsers: any[];
}

export default function UsersTableClient({ initialUsers }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  // Client-side filtering based on name, email, or role
  const filteredUsers = initialUsers.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const role = user.role?.toLowerCase() || "";
    const status = user.status?.toLowerCase() || "active";

    const term = searchTerm.toLowerCase();

    return (
      name.includes(term) ||
      email.includes(term) ||
      role.includes(term) ||
      status.includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Bar Header */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="text-xs text-muted-foreground font-medium hidden sm:block">
          Showing <strong className="text-foreground">{filteredUsers.length}</strong> of {initialUsers.length} users
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <Users className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No users found</h3>
          <p className="text-xs text-muted-foreground">Try searching with a different keyword.</p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-4 font-bold">User</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Joined Date</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                    {/* User Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase border">
                          {user.name ? user.name.substring(0, 2) : "U"}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{user.name || "N/A"}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3 inline" /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Current Role Badge */}
                    <td className="p-4">
                      <Badge
                        className={
                          user.role === "ADMIN"
                            ? "bg-purple-500/10 text-purple-600 border-none font-bold"
                            : user.role === "PROVIDER"
                            ? "bg-blue-500/10 text-blue-600 border-none font-bold"
                            : "bg-gray-500/10 text-gray-600 border-none font-bold"
                        }
                      >
                        <Shield className="h-3 w-3 mr-1 inline" />
                        {user.role}
                      </Badge>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <Badge
                        className={
                          user.status === "BLOCKED"
                            ? "bg-red-500/10 text-red-600 border-none font-bold"
                            : "bg-green-500/10 text-green-600 border-none font-bold"
                        }
                      >
                        {user.status || "ACTIVE"}
                      </Badge>
                    </td>

                    {/* Joined Date */}
                    <td className="p-4 text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          dateStyle: "medium",
                        })}
                      </span>
                    </td>

                    {/* Quick Role & Status Update Action */}
                    <td className="p-4 text-right">
                      <UserRoleStatusSwitcher
                        userId={user.id}
                        currentRole={user.role}
                        currentStatus={user.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}