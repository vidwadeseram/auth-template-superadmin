import { describe, it, expect, beforeEach } from "vitest";
import { auditLog, getAuditLog, clearAuditLog } from "@/lib/audit-logger";

describe("audit-logger", () => {
  beforeEach(() => {
    clearAuditLog();
  });

  it("starts with an empty log", () => {
    expect(getAuditLog()).toEqual([]);
  });

  it("logs an action with timestamp and userAgent", () => {
    auditLog("view_roles");
    const log = getAuditLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe("view_roles");
    expect(log[0].timestamp).toBeTruthy();
    expect(typeof log[0].userAgent).toBe("string");
    expect(log[0].details).toBeUndefined();
  });

  it("logs an action with details", () => {
    auditLog("view_user_detail", { userId: "abc-123" });
    const log = getAuditLog();
    expect(log[0].details).toEqual({ userId: "abc-123" });
  });

  it("accumulates multiple entries", () => {
    auditLog("view_roles");
    auditLog("view_permissions");
    auditLog("view_tenants");
    expect(getAuditLog()).toHaveLength(3);
    expect(getAuditLog().map((e) => e.action)).toEqual([
      "view_roles",
      "view_permissions",
      "view_tenants",
    ]);
  });

  it("clearAuditLog empties the log", () => {
    auditLog("view_users");
    clearAuditLog();
    expect(getAuditLog()).toEqual([]);
  });

  it("persists entries in sessionStorage", () => {
    auditLog("view_roles");
    const raw = sessionStorage.getItem("audit_log");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].action).toBe("view_roles");
  });
});
