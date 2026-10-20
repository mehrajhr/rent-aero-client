export const dynamic = "force-dynamic";
import { fetchAllUsers } from "../_action/usersAction";
import UsersTableClient from "../_components/UsersTableClient";

export default async function AdminManageUsersPage() {
  const users = await fetchAllUsers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Manage Users</h1>
        <p className="text-muted-foreground text-sm">
          View all registered platform users, modify roles, and handle status access.
        </p>
      </div>

      {/* Client-side Search and Table Component */}
      <UsersTableClient initialUsers={users} />
    </div>
  );
}