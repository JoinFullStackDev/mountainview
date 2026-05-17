import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// =====================================================
// Rate Limiting for Login Page
// TODO: replace this in-memory store with Vercel KV / Upstash Redis
// before going to production. The current implementation is per-instance
// and resets on cold starts, which makes it unreliable on serverless.
// =====================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const loginRateLimitStore = new Map<string, RateLimitEntry>();

const LOGIN_RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const LOGIN_RATE_LIMIT_MAX_ATTEMPTS = 10; // 10 attempts per window

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginRateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    loginRateLimitStore.set(ip, { count: 1, resetAt: now + LOGIN_RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= LOGIN_RATE_LIMIT_MAX_ATTEMPTS) {
    return true;
  }

  entry.count++;
  return false;
}

// Cleanup old entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of loginRateLimitStore.entries()) {
      if (now > entry.resetAt) {
        loginRateLimitStore.delete(key);
      }
    }
  }, 60 * 1000);
}

// =====================================================
// Main Middleware Function
// =====================================================

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured, allow the request to continue
  // This allows the build to succeed without environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // The OAuth/email-link callback handles its own session exchange and
    // must be reachable without an existing session. Bail early so we
    // don't redirect mid-exchange.
    if (request.nextUrl.pathname.startsWith("/admin/auth/")) {
      return supabaseResponse;
    }

    // The "forgot password" page is by definition for users who can't
    // sign in, so it must be reachable without a session too.
    if (request.nextUrl.pathname.startsWith("/admin/forgot-password")) {
      return supabaseResponse;
    }

    // Handle login page with rate limiting
    if (request.nextUrl.pathname === "/admin/login") {
      // If already logged in, redirect to dashboard
      if (user) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      // Rate limit login page access
      const ip = getClientIP(request);
      if (isLoginRateLimited(ip)) {
        // Return a rate limit response
        return new NextResponse(
          JSON.stringify({
            error: "Too many login attempts. Please try again in 15 minutes.",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "900", // 15 minutes in seconds
            },
          }
        );
      }

      return supabaseResponse;
    }

    // Require authentication for all other admin routes
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // /admin/set-password requires a session (the invite/recovery callback
    // creates one) but intentionally skips the admin/staff role gate so a
    // freshly invited user can always finish setting their password, even
    // if the profile-creation trigger glitched.
    if (request.nextUrl.pathname.startsWith("/admin/set-password")) {
      return supabaseResponse;
    }

    // Check user role from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // Only allow users with admin or staff roles into the admin area.
    const allowedRoles = ["admin", "staff"];
    if (!profile || !allowedRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // /admin/users is restricted to admins. Staff get bounced to the
    // dashboard rather than the homepage so they don't fall out of the
    // admin shell entirely.
    if (
      request.nextUrl.pathname.startsWith("/admin/users") &&
      profile.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return supabaseResponse;
}
