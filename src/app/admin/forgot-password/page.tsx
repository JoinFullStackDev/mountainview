import type { Metadata } from "next";
import { ForgotPasswordForm } from "./forgot-password-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Request a password reset email for your admin account",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary">
            Mountain View Pharmacy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Reset your password
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
