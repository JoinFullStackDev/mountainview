import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listUsers } from "@/app/actions/users";
import { UsersClient } from "./users-client";
import type { Profile } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Users",
  description: "Invite and manage admin and staff users",
};

export default async function UsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = (await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()) as { data: Profile | null };

  // Defense in depth: middleware already enforces this, but checking here
  // protects against any case where the middleware doesn't run.
  if (!profile || profile.role !== "admin") {
    redirect("/admin/dashboard");
  }

  const result = await listUsers();

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Invite and manage admin and staff users
          </p>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {result.error}
        </div>
      </div>
    );
  }

  return <UsersClient currentUserId={user.id} initialUsers={result.users} />;
}
