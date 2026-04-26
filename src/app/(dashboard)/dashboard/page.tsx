"use client";

import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuperadminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Dashboard</h1>
        <p className="text-muted-foreground">Manage the entire platform</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Tenants</CardTitle><CardDescription>Registered organizations</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold">—</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Users</CardTitle><CardDescription>Across all tenants</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold">—</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Roles</CardTitle><CardDescription>Platform-wide</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold">—</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Admin</CardTitle><CardDescription>Your role</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold">{user?.role || "superadmin"}</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
