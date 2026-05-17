import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Receives email-link redirects from Supabase Auth and exchanges the
 * one-time PKCE `code` for a real session cookie. Used by:
 *   - admin invitations (inviteUserByEmail)  -> next defaults to /admin/set-password
 *   - password recovery (resetPasswordForEmail) -> next defaults to /admin/set-password
 *   - magic links / email confirmations    -> caller-provided `next`
 *
 * The `next` query parameter is sanitized: only same-origin paths beginning
 * with "/admin/" are honored so a malicious invite URL can't bounce a
 * signed-in user off-site.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const errorDescription =
    url.searchParams.get("error_description") ?? url.searchParams.get("error");

  const rawNext = url.searchParams.get("next");
  const next =
    rawNext && rawNext.startsWith("/admin/") ? rawNext : "/admin/dashboard";

  if (errorDescription) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", errorDescription);
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set(
      "error",
      "Missing authentication code. The link may have expired."
    );
    return NextResponse.redirect(loginUrl);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set(
      "error",
      error.message || "Could not sign you in. The link may have expired."
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(new URL(next, request.url));
}
