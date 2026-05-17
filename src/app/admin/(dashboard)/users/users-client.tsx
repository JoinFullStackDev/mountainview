"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Mail, ShieldAlert, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  inviteUser,
  resendInvitation,
  revokeUser,
  updateUserRole,
} from "@/app/actions/users";
import type { UserListItem, UserRole } from "@/types/database";

interface UsersClientProps {
  currentUserId: string;
  initialUsers: UserListItem[];
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

export function UsersClient({ currentUserId, initialUsers }: UsersClientProps) {
  const router = useRouter();
  const [isInvitePending, startInviteTransition] = useTransition();
  const [isRowPending, startRowTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("staff");
  const [inviteError, setInviteError] = useState<string | null>(null);

  const [pendingActionId, setPendingActionId] = useState<string | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<UserListItem | null>(null);

  const handleInvite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInviteError(null);

    startInviteTransition(async () => {
      const result = await inviteUser({
        email,
        fullName: fullName.trim() || undefined,
        role: inviteRole,
      });

      if (!result.success) {
        setInviteError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(`Invitation sent to ${email}`);
      setEmail("");
      setFullName("");
      setInviteRole("staff");
      router.refresh();
    });
  };

  const handleRoleChange = (user: UserListItem, newRole: UserRole) => {
    if (user.role === newRole) return;
    setPendingActionId(user.id);
    startRowTransition(async () => {
      const result = await updateUserRole(user.id, newRole);
      setPendingActionId(null);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(
        `${user.email} is now ${newRole === "admin" ? "an admin" : "staff"}.`
      );
      router.refresh();
    });
  };

  const handleResend = (user: UserListItem) => {
    setPendingActionId(user.id);
    startRowTransition(async () => {
      const result = await resendInvitation(user.id);
      setPendingActionId(null);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(`Invitation re-sent to ${user.email}`);
      router.refresh();
    });
  };

  const handleRevoke = (user: UserListItem) => {
    setPendingActionId(user.id);
    startRowTransition(async () => {
      const result = await revokeUser(user.id);
      setPendingActionId(null);
      setRevokeTarget(null);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(`Access revoked for ${user.email}`);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Invite new admins or staff and manage existing access. Only admins
          can use this page.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite a user
          </CardTitle>
          <CardDescription>
            Sends an email invitation. The invitee will set their own password
            on first sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleInvite}
            className="grid gap-4 md:grid-cols-[1fr,1fr,160px,auto] md:items-end"
          >
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isInvitePending}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-name">Full name (optional)</Label>
              <Input
                id="invite-name"
                type="text"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isInvitePending}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as UserRole)}
                disabled={isInvitePending}
              >
                <SelectTrigger id="invite-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isInvitePending}>
              {isInvitePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send invite
                </>
              )}
            </Button>
          </form>
          {inviteError ? (
            <p className="mt-3 text-sm text-destructive">{inviteError}</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All users</CardTitle>
          <CardDescription>
            {initialUsers.length} user{initialUsers.length === 1 ? "" : "s"}{" "}
            with access to the admin area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-[140px]">Role</TableHead>
                <TableHead className="w-[110px]">Status</TableHead>
                <TableHead className="w-[180px]">Last sign-in</TableHead>
                <TableHead className="w-[220px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialUsers.map((user) => {
                const isSelf = user.id === currentUserId;
                const isRowBusy =
                  isRowPending && pendingActionId === user.id;

                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {user.email}
                        {isSelf ? (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.fullName ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(v) =>
                          handleRoleChange(user, v as UserRole)
                        }
                        disabled={isSelf || isRowBusy}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {user.status === "pending" ? (
                        <Badge variant="secondary">Pending</Badge>
                      ) : (
                        <Badge variant="default">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.status === "pending"
                        ? `Invited ${formatDate(user.invitedAt ?? user.createdAt)}`
                        : formatDate(user.lastSignInAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {user.status === "pending" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isRowBusy}
                            onClick={() => handleResend(user)}
                          >
                            {isRowBusy ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Resend"
                            )}
                          </Button>
                        ) : null}
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isSelf || isRowBusy}
                          onClick={() => setRevokeTarget(user)}
                        >
                          Revoke
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {initialUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    No users yet. Invite one above to get started.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={revokeTarget !== null}
        onOpenChange={(open) => {
          if (!open && !isRowPending) setRevokeTarget(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              Revoke access
            </DialogTitle>
            <DialogDescription>
              This permanently deletes the user account for{" "}
              <span className="font-semibold">{revokeTarget?.email}</span>.
              They will no longer be able to sign in to the admin area. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRevokeTarget(null)}
              disabled={isRowPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => revokeTarget && handleRevoke(revokeTarget)}
              disabled={isRowPending}
            >
              {isRowPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Revoking…
                </>
              ) : (
                "Revoke access"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
