import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { UserRoleSelect } from "@/components/admin/user-role-select";
import type { Profile } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage users",
};

export default async function UsersPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single() as { data: { role: string } | null };

  // Only admins can access this page
  if (currentProfile?.role !== "admin") {
    redirect("/admin/dashboard");
  }

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false }) as { data: Profile[] | null };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "editor":
        return "secondary";
      case "author":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage user accounts and roles
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        {users && users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((profile) => {
                const initials = profile.full_name
                  ? profile.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : profile.email[0].toUpperCase();

                return (
                  <TableRow key={profile.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile.avatar_url || undefined} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {profile.full_name || "Unnamed User"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(profile.role)}>
                        {profile.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(profile.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <UserRoleSelect
                        userId={profile.id}
                        currentRole={profile.role}
                        isCurrentUser={profile.id === user.id}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
