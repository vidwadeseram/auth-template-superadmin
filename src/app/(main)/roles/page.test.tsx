import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@vidwadeseram/auth-ui-shared", () => ({
  useAuth: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn() },
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { useAuth } from "@vidwadeseram/auth-ui-shared";
import RolesPage from "@/app/(main)/roles/page";

const mockUseAuth = vi.mocked(useAuth);

describe("RolesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockUseAuth.mockReturnValue({
      apiClient: {
        get: vi.fn(() => new Promise(() => {})),
      },
    } as unknown as ReturnType<typeof useAuth>);

    render(<RolesPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders roles after successful fetch", async () => {
    const mockRoles = [
      { id: "1", name: "superadmin", description: "Super admin role", permissions: ["users:read", "users:write"] },
      { id: "2", name: "viewer", permissions: ["users:read"] },
    ];

    mockUseAuth.mockReturnValue({
      apiClient: {
        get: vi.fn().mockResolvedValue({ data: mockRoles }),
      },
    } as unknown as ReturnType<typeof useAuth>);

    render(<RolesPage />);

    await waitFor(() => {
      expect(screen.getByText("superadmin")).toBeInTheDocument();
    });

    expect(screen.getByText("viewer")).toBeInTheDocument();
    expect(screen.getByText("Super admin role")).toBeInTheDocument();
    expect(screen.getByText("2 perms")).toBeInTheDocument();
    expect(screen.getByText("1 perms")).toBeInTheDocument();
  });

  it("shows empty state when no roles returned", async () => {
    mockUseAuth.mockReturnValue({
      apiClient: {
        get: vi.fn().mockResolvedValue({ data: [] }),
      },
    } as unknown as ReturnType<typeof useAuth>);

    render(<RolesPage />);

    await waitFor(() => {
      expect(screen.getByText("No roles loaded.")).toBeInTheDocument();
    });
  });

  it("shows error toast on fetch failure", async () => {
    const { toast } = await import("sonner");
    mockUseAuth.mockReturnValue({
      apiClient: {
        get: vi.fn().mockRejectedValue(new Error("Network error")),
      },
    } as unknown as ReturnType<typeof useAuth>);

    render(<RolesPage />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Network error");
    });
  });

  it("refresh button triggers reload", async () => {
    const mockGet = vi.fn().mockResolvedValue({ data: [] });
    mockUseAuth.mockReturnValue({
      apiClient: { get: mockGet },
    } as unknown as ReturnType<typeof useAuth>);

    render(<RolesPage />);

    await waitFor(() => {
      expect(screen.getByText("Refresh")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Refresh"));

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledTimes(2);
    });
  });
});
