"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tenants", label: "Tenants" },
  { href: "/users", label: "All Users" },
  { href: "/roles", label: "Roles" },
  { href: "/permissions", label: "Permissions" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Superadmin</h1>
        {user && <p className="text-sm text-muted-foreground truncate">{user.email}</p>}
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</p>
        {links.slice(0, 2).map((link) => (
          <Link key={link.href} href={link.href}
            className={cn("block px-3 py-2 rounded-md text-sm transition-colors",
              pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href)) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}>
            {link.label}
          </Link>
        ))}
        <Separator className="my-3" />
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Management</p>
        {links.slice(2).map((link) => (
          <Link key={link.href} href={link.href}
            className={cn("block px-3 py-2 rounded-md text-sm transition-colors",
              pathname.startsWith(link.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={() => logout()}>Sign out</Button>
      </div>
    </aside>
  );
}
