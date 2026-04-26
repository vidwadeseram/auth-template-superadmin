"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Tenant {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  plan?: string;
  user_count?: number;
  created_at: string;
}

export default function TenantsPage() {
  const { apiClient } = useAuth();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function loadTenants() {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/v1/superadmin/tenants") as { data: Tenant[] };
      setTenants(res.data || []);
    } catch (err: unknown) {
      toast.error((err instanceof Error ? err.message : null) || "Failed to load tenants");
    } finally {
      setLoading(false);
    }
  }

  const filtered = tenants.filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Tenants</h1>
        <Button onClick={loadTenants} disabled={loading}>{loading ? "Loading..." : "Load Tenants"}</Button>
      </div>
      <Input placeholder="Search tenants..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      <Card>
        <CardHeader><CardTitle>Platform Tenants</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Slug</th><th className="text-left p-3">Plan</th><th className="text-left p-3">Status</th><th className="text-left p-3">Users</th><th className="text-left p-3">Actions</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="text-center p-8 text-muted-foreground">No tenants loaded.</td></tr>
                ) : filtered.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-3 font-medium">{t.name}</td>
                    <td className="p-3"><code className="text-xs bg-muted px-1 py-0.5 rounded">{t.slug}</code></td>
                    <td className="p-3"><Badge variant="outline">{t.plan || "—"}</Badge></td>
                    <td className="p-3"><Badge variant={t.is_active ? "default" : "destructive"}>{t.is_active ? "Active" : "Inactive"}</Badge></td>
                    <td className="p-3">{t.user_count ?? "—"}</td>
                    <td className="p-3"><Link href={`/tenants/${t.id}`} className="text-primary hover:underline text-sm">Manage</Link></td>
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
