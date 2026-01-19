"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  FolderOpen,
  Settings,
  Home
} from "lucide-react";
import type { UserRole } from "@/types/database";

interface AdminSidebarProps {
  userRole: UserRole;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, roles: ["admin", "editor", "author", "viewer"] },
  { name: "Posts", href: "/admin/posts", icon: FileText, roles: ["admin", "editor", "author"] },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen, roles: ["admin", "editor"] },
  { name: "Users", href: "/admin/users", icon: Users, roles: ["admin"] },
  { name: "Settings", href: "/admin/settings", icon: Settings, roles: ["admin"] },
];

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MVP</span>
          </div>
          <div>
            <p className="font-semibold text-sm">Mountain View</p>
            <p className="text-xs text-muted-foreground">Admin CMS</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          View Site
        </Link>
      </div>
    </aside>
  );
}
