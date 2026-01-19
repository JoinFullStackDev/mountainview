import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      // If already logged in, redirect to dashboard
      if (user) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return supabaseResponse;
    }

    // Require authentication for all other admin routes
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Check user role from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // Only allow users with admin, editor, or author roles
    const allowedRoles = ["admin", "editor", "author", "viewer"];
    if (!profile || !allowedRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check specific route permissions
    if (request.nextUrl.pathname.startsWith("/admin/users")) {
      // Only admins can access user management
      if (profile.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  }

  return supabaseResponse;
}
