"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { UserRole } from "@/types/database";

interface UserRoleSelectProps {
  userId: string;
  currentRole: UserRole;
  isCurrentUser: boolean;
}

const roles: { value: UserRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "author", label: "Author" },
  { value: "viewer", label: "Viewer" },
];

export function UserRoleSelect({ userId, currentRole, isCurrentUser }: UserRoleSelectProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRoleChange = async (newRole: UserRole) => {
    if (newRole === currentRole) return;

    if (isCurrentUser) {
      toast.error("You cannot change your own role");
      return;
    }

    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from("profiles") as any)
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Role updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      value={currentRole}
      onValueChange={(value) => handleRoleChange(value as UserRole)}
      disabled={loading || isCurrentUser}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
