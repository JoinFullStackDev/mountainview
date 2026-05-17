import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SetPasswordForm } from "./set-password-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Set Password",
  description: "Set a password for your Mountain View Pharmacy admin account",
  robots: { index: false, follow: false },
};

export default async function SetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Reaching this page requires a session created by the invite/recovery
  // callback. If somebody hits it directly without a session, bounce them
  // to login.
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary">
            Mountain View Pharmacy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Set your password
          </p>
        </div>
        <SetPasswordForm email={user.email ?? ""} />
      </div>
    </div>
  );
}
