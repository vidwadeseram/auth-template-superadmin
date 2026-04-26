"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  tenant_id?: string;
  tenant_name?: string;
  is_active: boolean;
  email_verified: boolean;
}

export default function AllUsersPage() {
  const { apiClient } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/v1/superadmin/users") as { data: User[] };
      setUsers(res.data || []);
    } catch (err: unknown) {
      toast.error((err instanceof Error ? err.message : null) || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  const filtered = users.filter((u) => !search || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Users</h1>
        <Button onClick={loadUsers} disabled={loading}>{loading ? "Loading..." : "Load Users"}</Button>
      </div>
      <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      <Card>
        <CardHeader><CardTitle>Platform Users</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr><th className="text-left p-3">Email</th><th className="text-left p-3">Name</th><th className="text-left p-3">Role</th><th className="text-left p-3">Tenant</th><th className="text-left p-3">Status</th><th className="text-left p-3">Actions</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="text-center p-8 text-muted-foreground">No users loaded.</td></tr>
                ) : filtered.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.first_name} {u.last_name}</td>
                    <td className="p-3"><Badge variant="secondary">{u.role}</Badge></td>
                    <td className="p-3">{u.tenant_name || "—"}</td>
                    <td className="p-3"><Badge variant={u.is_active ? "default" : "destructive"}>{u.is_active ? "Active" : "Inactive"}</Badge></td>
                    <td className="p-3"><Link href={`/users/${u.id}`} className="text-primary hover:underline text-sm">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
