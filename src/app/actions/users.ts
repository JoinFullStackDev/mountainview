"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import type { Profile, UserListItem, UserRole } from "@/types/database";

// =====================================================
// Authorization helpers
// =====================================================

const ADMIN_ONLY = ["admin"] as const;

interface AuthorizedAdmin {
  userId: string;
  email: string;
}

/**
 * Confirm the caller is signed in and has the `admin` role. Returns the
 * caller's id/email on success, or a typed error result on failure.
 *
 * RLS already restricts the privileged operations exposed in this file, but
 * we check explicitly so we can return friendly error messages and so the
 * service-role admin client (which bypasses RLS) never runs for a non-admin.
 */
async function requireAdmin(): Promise<
  { ok: true; admin: AuthorizedAdmin } | { ok: false; error: string }
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "You must be signed in." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single() as { data: { role: string } | null };

  if (
    !profile ||
    !ADMIN_ONLY.includes(profile.role as (typeof ADMIN_ONLY)[number])
  ) {
    return { ok: false, error: "Only admins can manage users." };
  }

  return {
    ok: true,
    admin: { userId: user.id, email: user.email ?? "" },
  };
}

function getInviteRedirectUrl(): string | undefined {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return undefined;
  return `${siteUrl.replace(/\/$/, "")}/admin/login`;
}

// =====================================================
// Schemas
// =====================================================

const roleSchema = z.enum(["admin", "staff"]);

const inviteSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  fullName: z
    .string()
    .trim()
    .max(120, "Name is too long")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  role: roleSchema,
});

const userIdSchema = z.string().uuid("Invalid user id");

// =====================================================
// Result types
// =====================================================

export type ActionResult<T = undefined> =
  | (T extends undefined ? { success: true } : { success: true; data: T })
  | { success: false; error: string };

// =====================================================
// listUsers
// =====================================================

export async function listUsers(): Promise<
  | { success: true; users: UserListItem[] }
  | { success: false; error: string }
> {
  const auth = await requireAdmin();
  if (!auth.ok) return { success: false, error: auth.error };

  const admin = createAdminClient();

  const { data: profiles, error: profilesError } = (await admin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })) as {
    data: Profile[] | null;
    error: Error | null;
  };

  if (profilesError || !profiles) {
    console.error("Error loading profiles:", profilesError);
    return { success: false, error: "Failed to load users." };
  }

  // Fetch up to 1000 auth users in a single page. The pharmacy admin team is
  // small enough that pagination is overkill; if this ever grows, swap to a
  // page loop.
  const { data: authList, error: authError } =
    await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (authError) {
    console.error("Error loading auth users:", authError);
    return { success: false, error: "Failed to load auth users." };
  }

  const authById = new Map(authList.users.map((u) => [u.id, u]));

  const users: UserListItem[] = profiles.map((profile) => {
    const authUser = authById.get(profile.id);
    const confirmedAt =
      authUser?.email_confirmed_at ?? authUser?.confirmed_at ?? null;
    const invitedAt = authUser?.invited_at ?? null;
    const lastSignInAt = authUser?.last_sign_in_at ?? null;

    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      role: profile.role,
      status: confirmedAt ? "active" : "pending",
      invitedAt,
      lastSignInAt,
      createdAt: profile.created_at,
    };
  });

  return { success: true, users };
}

// =====================================================
// inviteUser
// =====================================================

export async function inviteUser(input: {
  email: string;
  fullName?: string;
  role: UserRole;
}): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (!auth.ok) return { success: false, error: auth.error };

  const parsed = inviteSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid invitation",
    };
  }

  const { email, fullName, role } = parsed.data;
  const admin = createAdminClient();

  const { error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      invited_role: role,
      full_name: fullName,
    },
    redirectTo: getInviteRedirectUrl(),
  });

  if (error) {
    console.error("Error inviting user:", error);
    // Supabase returns a generic 422 when the email is already registered;
    // surface that as a friendlier message.
    const message =
      typeof error.message === "string" && error.message.length > 0
        ? error.message
        : "Failed to send invitation.";
    return { success: false, error: message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

// =====================================================
// resendInvitation
// =====================================================

export async function resendInvitation(userId: string): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (!auth.ok) return { success: false, error: auth.error };

  const idCheck = userIdSchema.safeParse(userId);
  if (!idCheck.success) {
    return { success: false, error: "Invalid user id." };
  }

  const admin = createAdminClient();

  const { data: target, error: lookupError } =
    await admin.auth.admin.getUserById(userId);

  if (lookupError || !target?.user) {
    return { success: false, error: "User not found." };
  }

  const email = target.user.email;
  if (!email) {
    return { success: false, error: "That user has no email on file." };
  }

  const confirmedAt =
    target.user.email_confirmed_at ?? target.user.confirmed_at ?? null;
  if (confirmedAt) {
    return {
      success: false,
      error: "That user has already accepted their invitation.",
    };
  }

  // Preserve the invited_role from the original invitation so re-sending
  // doesn't quietly downgrade a pending admin to staff.
  const metadata = target.user.user_metadata ?? {};
  const invitedRole =
    metadata.invited_role === "admin" || metadata.invited_role === "staff"
      ? metadata.invited_role
      : "staff";

  const { error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      invited_role: invitedRole,
      full_name: metadata.full_name,
    },
    redirectTo: getInviteRedirectUrl(),
  });

  if (error) {
    console.error("Error resending invitation:", error);
    return {
      success: false,
      error: error.message || "Failed to resend invitation.",
    };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

// =====================================================
// updateUserRole
// =====================================================

export async function updateUserRole(
  userId: string,
  newRole: UserRole
): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (!auth.ok) return { success: false, error: auth.error };

  const idCheck = userIdSchema.safeParse(userId);
  if (!idCheck.success) {
    return { success: false, error: "Invalid user id." };
  }

  const roleCheck = roleSchema.safeParse(newRole);
  if (!roleCheck.success) {
    return { success: false, error: "Invalid role." };
  }

  if (userId === auth.admin.userId) {
    return {
      success: false,
      error: "You cannot change your own role. Ask another admin to do it.",
    };
  }

  const admin = createAdminClient();

  const { error } = await (
    admin.from("profiles") as unknown as {
      update: (row: { role: UserRole }) => {
        eq: (col: string, val: string) => Promise<{ error: Error | null }>;
      };
    }
  )
    .update({ role: roleCheck.data })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role." };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

// =====================================================
// revokeUser
// =====================================================

export async function revokeUser(userId: string): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (!auth.ok) return { success: false, error: auth.error };

  const idCheck = userIdSchema.safeParse(userId);
  if (!idCheck.success) {
    return { success: false, error: "Invalid user id." };
  }

  if (userId === auth.admin.userId) {
    return {
      success: false,
      error: "You cannot revoke your own access.",
    };
  }

  const admin = createAdminClient();

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to revoke access." };
  }

  // profiles.id has ON DELETE CASCADE referencing auth.users, so the profile
  // row is removed automatically.

  revalidatePath("/admin/users");
  return { success: true };
}
