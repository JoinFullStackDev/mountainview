import { Metadata } from "next";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the Mountain View Pharmacy admin dashboard",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary">Mountain View Pharmacy</h1>
          <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
