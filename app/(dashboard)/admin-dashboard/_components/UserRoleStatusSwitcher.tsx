"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserRoleOrStatus } from "../_action/usersAction";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  userId: string;
  currentRole: string;
  currentStatus?: string;
}

export default function UserRoleStatusSwitcher({ userId, currentRole, currentStatus = "ACTIVE" }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: string) => {
    startTransition(async () => {
      const res = await updateUserRoleOrStatus(userId, { role: newRole });
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      const res = await updateUserRoleOrStatus(userId, { status: newStatus });
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Role Switcher */}
      <div className="flex items-center gap-1">
        <Select defaultValue={currentRole} onValueChange={handleRoleChange} disabled={isPending}>
          <SelectTrigger className="h-8 w-28 text-xs font-semibold rounded-lg">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
            <SelectItem value="PROVIDER">PROVIDER</SelectItem>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Switcher (Optional) */}
      <div className="flex items-center gap-1">
        <Select defaultValue={currentStatus} onValueChange={handleStatusChange} disabled={isPending}>
          <SelectTrigger className="h-8 w-24 text-xs font-semibold rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
            <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isPending && <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />}
    </div>
  );
}