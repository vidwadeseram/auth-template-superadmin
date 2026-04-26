"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function PermissionsPage() {
  const { apiClient } = useAuth();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPermissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/v1/superadmin/permissions") as { data: string[] };
      setPermissions(res.data || []);
    } catch (err: unknown) {
      toast.error((err instanceof Error ? err.message : null) || "Failed to load permissions");
    } finally {
      setLoading(false);
    }
  }

  // Group permissions by resource
  const grouped = permissions.reduce<Record<string, string[]>>((acc, p) => {
    const [resource] = p.split(":");
    if (!acc[resource]) acc[resource] = [];
    acc[resource].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Permissions</h1>
        <Button onClick={loadPermissions} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>
      </div>
      {Object.keys(grouped).length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">No permissions loaded.</CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(grouped).map(([resource, perms]) => (
            <Card key={resource}>
              <CardHeader><CardTitle className="capitalize">{resource}</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">{perms.map((p) => <Badge key={p} variant="outline" className="text-xs">{p}</Badge>)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
