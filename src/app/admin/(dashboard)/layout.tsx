import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import type { Profile } from "@/types/database";

const ALLOWED_ROLES = ["admin", "staff"] as const;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single() as { data: Profile | null };

  if (!profile) {
    redirect("/admin/login");
  }

  // Defense in depth: middleware already enforces this, but checking here
  // protects against any case where the middleware doesn't run (e.g. an
  // explicitly invoked Server Component bypassing the matcher in the future).
  if (!ALLOWED_ROLES.includes(profile.role)) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={profile.role} />
      <div className="flex-1 flex flex-col">
        <AdminHeader user={profile} />
        <main className="flex-1 p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}
