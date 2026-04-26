"use client";

import { use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Details</h1>
      <Card>
        <CardHeader><CardTitle>User</CardTitle><CardDescription>ID: {id}</CardDescription></CardHeader>
        <CardContent><p className="text-muted-foreground">Connect your backend to view user details.</p></CardContent>
      </Card>
    </div>
  );
}
