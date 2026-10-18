import { getMe } from "@/service/getMe";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, ShieldCheck, User } from "lucide-react";
import ProfileEditForm from "./_components/ProfileEditForm";

export default async function ProfilePage() {
  const profileRes = await getMe();
  const user = profileRes?.success ? profileRes.data.user : null;

  if (!user) {
    return (
      <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground">
        Failed to load profile details. Please log in again.
      </div>
    );
  }

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Account Profile</h1>
        <p className="text-muted-foreground text-sm">
          Manage your personal information, email address, and account role settings.
        </p>
      </div>

      {/* Overview Banner Card */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-2xl uppercase border border-primary/20">
              {user.name ? user.name.substring(0, 2) : "US"}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-[10px] uppercase font-bold">
                  {user.role}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-500/20">
            <ShieldCheck className="h-4 w-4" />
            <span>Account {user.status || "ACTIVE"}</span>
          </div>

        </div>

        {/* Quick Meta Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <span>User ID: <code className="font-mono text-foreground font-semibold">{user.id}</code></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Member Since: <strong className="text-foreground">{formattedDate}</strong></span>
          </div>
        </div>
      </div>

      {/* Profile Form Card */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-bold text-xl tracking-tight">Edit Information</h3>
          <p className="text-xs text-muted-foreground">
            Update your account information below. Changes will be updated instantly across your dashboard.
          </p>
        </div>

        <ProfileEditForm user={user} />
      </div>

    </div>
  );
}