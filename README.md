# Auth Template — Superadmin Panel

Platform-level administration panel for managing all tenants, users, roles, and permissions across a multi-tenant auth system. Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

**Designed exclusively for multi-tenant backends.** Connects to `python-multi-tenant-auth-template` (port 8002), `rust-multi-tenant-auth-template` (port 8004), or `go-multi-tenant-auth-template` (port 8006).

## Features

- 📊 **Platform Dashboard** — Overview with tenant count, total users, roles, admin info
- 🏢 **Tenant Management** — List all tenants, view details (name, slug, plan, status, user count)
- 👥 **All Users** — Platform-wide user list with tenant association, role badges, status
- 🔑 **Roles** — Platform-wide role management with permission display
- 🛡️ **Permissions** — Grouped permission browser (grouped by resource: `users:read`, `users:write`, etc.)
- 📱 **Responsive Sidebar** — Platform + Management sections
- 🌗 **Dark Mode** — System/theme toggle

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** + **shadcn/ui**
- **@vidwadeseram/auth-ui-shared** — Shared API client + auth hooks
- **TanStack Query v5** — Server state management

## Getting Started

```bash
git clone https://github.com/vidwadeseram/auth-template-superadmin.git
cd auth-template-superadmin
npm install --legacy-peer-deps
```

### Configuration

Create `.env.local` pointing to a **multi-tenant** backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8002
```

| Backend | Port |
|---------|------|
| Python multi-tenant | 8002 |
| Rust multi-tenant | 8004 |
| Go multi-tenant | 8006 |

### Development

```bash
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/                 # Superadmin login
│   │   ├── forgot-password/       # Forgot password
│   │   └── reset-password/        # Reset password
│   ├── (dashboard)/
│   │   ├── dashboard/             # Platform overview
│   │   ├── tenants/               # All tenants + detail
│   │   ├── users/                 # All users + detail
│   │   ├── roles/                 # Platform roles
│   │   └── permissions/           # Permission browser
│   ├── layout.tsx
│   └── page.tsx                   # Redirect to /dashboard
├── components/
│   ├── auth-guard.tsx
│   ├── sidebar.tsx                # Platform + Management sections
│   ├── mobile-nav.tsx
│   ├── providers.tsx
│   └── ui/
└── lib/
    └── utils.ts
```

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Platform overview (tenants, users, roles counts) |
| `/tenants` | All tenant organizations |
| `/tenants/[id]` | Tenant detail with metadata |
| `/users` | All platform users with tenant association |
| `/users/[id]` | User detail |
| `/roles` | Platform-wide roles with permissions |
| `/permissions` | Permissions grouped by resource |
| `/login` | Superadmin login |

## API Endpoints Expected

The superadmin panel calls these endpoints (provided by multi-tenant backends):

| Endpoint | Description |
|----------|-------------|
| `GET /superadmin/tenants` | List all tenants |
| `GET /superadmin/tenants/:id` | Get tenant details |
| `GET /superadmin/users` | List all users (platform-wide) |
| `GET /superadmin/roles` | List platform roles |
| `GET /superadmin/permissions` | List all permissions |

## Related Repositories

### Frontend Templates
- [auth-ui-shared](https://github.com/vidwadeseram/auth-ui-shared) — Shared npm package
- [auth-template-landing](https://github.com/vidwadeseram/auth-template-landing) — Landing page
- [auth-template-client](https://github.com/vidwadeseram/auth-template-client) — User dashboard
- [auth-template-admin](https://github.com/vidwadeseram/auth-template-admin) — Admin panel

### Backend Templates
- [python-multi-tenant-auth-template](https://github.com/vidwadeseram/python-multi-tenant-auth-template)
- [rust-multi-tenant-auth-template](https://github.com/vidwadeseram/rust-multi-tenant-auth-template)
- [go-multi-tenant-auth-template](https://github.com/vidwadeseram/go-multi-tenant-auth-template)

## License

MIT
