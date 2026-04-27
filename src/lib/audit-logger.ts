export interface AuditEntry {
  timestamp: string;
  action: string;
  details?: Record<string, unknown>;
  userAgent: string;
}

const STORAGE_KEY = "audit_log";

export function auditLog(action: string, details?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const entry: AuditEntry = {
    timestamp: new Date().toISOString(),
    action,
    details,
    userAgent: navigator.userAgent,
  };

  const existing = getAuditLog();
  existing.push(entry);

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // sessionStorage may be unavailable (e.g. private browsing quota exceeded)
  }
}

export function getAuditLog(): AuditEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AuditEntry[];
  } catch {
    return [];
  }
}

export function clearAuditLog(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
