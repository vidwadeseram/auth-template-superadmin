"use client";

import { use, useState } from "react";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { apiClient } = useAuth();
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function loadTenant() {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/superadmin/tenants/${id}`) as { data: any };
      setTenant(res.data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load tenant");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tenant Details</h1>
        <Button onClick={loadTenant} disabled={loading}>{loading ? "Loading..." : "Load Details"}</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Tenant Information</CardTitle><CardDescription>Tenant ID: {id}</CardDescription></CardHeader>
        <CardContent>
          {tenant ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Name</p><p className="font-medium">{tenant.name}</p></div>
                <div><p className="text-sm text-muted-foreground">Slug</p><p className="font-medium"><code className="bg-muted px-1 rounded">{tenant.slug}</code></p></div>
                <div><p className="text-sm text-muted-foreground">Status</p><Badge variant={tenant.is_active ? "default" : "destructive"}>{tenant.is_active ? "Active" : "Inactive"}</Badge></div>
                <div><p className="text-sm text-muted-foreground">Created</p><p className="font-medium">{new Date(tenant.created_at).toLocaleDateString()}</p></div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Click &quot;Load Details&quot; to fetch tenant information.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
