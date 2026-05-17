# Mountain View Pharmacy

Marketing site + a small admin (blog posts and media) for Mountain View Pharmacy.
Built with Next.js 15, Supabase (Auth + Postgres + Storage), TipTap (rich text),
Resend (transactional email), and Cloudflare Turnstile (bot protection).

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Auth + DB + Storage**: Supabase
- **Email**: Resend (public form submissions are emailed to the pharmacy)
- **Bot protection**: Cloudflare Turnstile on public forms + login rate limiting
- **UI**: Tailwind CSS + Radix UI + shadcn-style components

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in secrets
npm run dev
```

The app expects a Supabase project with the migrations under `supabase/migrations/`
applied in order. See [Supabase setup](#supabase-setup) below.

## Environment variables

Copy `.env.local.example` to `.env.local`. All variables are required.

| Variable | Where to get it | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings | Browser + server Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings | Browser + server Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings | Server-only privileged client |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile dashboard | Renders the widget on public forms |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile dashboard | Server-side token verification |
| `RESEND_API_KEY` | Resend dashboard -> API Keys | Sends form-submission emails |
| `RESEND_FROM_EMAIL` | A verified domain in Resend | The `From:` on outgoing email |
| `PHARMACY_CONTACT_EMAIL` | Whatever inbox the pharmacy reads | Where form submissions land |

`SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed to the browser. Only put it in
server environments and `.env.local` (which is gitignored).

## Admin dashboard

`/admin` is gated by Supabase Auth. Two roles are recognized:

- `admin` &mdash; full access. Reserved for owners.
- `staff` &mdash; full access to posts and media. Cannot manage users.

Both roles can:

- Sign in at `/admin/login`
- View the dashboard
- Create / edit / publish blog posts
- Create new categories inline from the post editor
- Upload, browse, and delete media

User management (creating staff accounts, promoting people to admin) is done
from the Supabase dashboard &mdash; there's intentionally no in-app UI for it.

### Defense in depth

Every `/admin/*` request is checked at three layers:

1. **Middleware** (`src/lib/supabase/middleware.ts`) refreshes the Supabase
   session and redirects unauthenticated users to `/admin/login`. It also
   blocks any role other than `admin` or `staff`.
2. **Server-side layout** (`src/app/admin/(dashboard)/layout.tsx`)
   re-validates the session and role.
3. **Row Level Security** in Postgres (`supabase/migrations/`) ensures that
   even with a compromised JWT the only writes possible are the ones a
   logged-in `admin` or `staff` user is allowed to make.

Admin responses also send `Cache-Control: private, no-store` and
`X-Robots-Tag: noindex, nofollow` (configured in `next.config.ts`), and
`/admin` is disallowed in `public/robots.txt`.

## Supabase setup

### One-time

1. Apply migrations in `supabase/migrations/` in order. The simplest path is
   the Supabase Dashboard SQL Editor &mdash; paste each file and run it.
   `00008_simplify_roles_and_drop_submissions.sql` is the most recent and
   collapses roles to `admin`/`staff`, drops the unused `form_submissions`
   table, and tightens RLS.
2. **Disable public signups.** Supabase Dashboard -> Authentication ->
   Providers -> Email -> uncheck "Enable signups". Without this, anyone could
   create an `auth.users` row, which would automatically get a `staff`
   profile via the `handle_new_user` trigger.
3. **Enable leaked-password protection.** Authentication -> Policies ->
   "Enable leaked password protection".
4. (Optional but recommended) Configure SMTP or use Supabase's default sender
   so invitation emails actually deliver.

### Inviting a user

1. Authentication -> Users -> "Invite user".
2. Enter the address. Supabase emails them a link to set a password.
3. When they accept, a `profiles` row is auto-created with role `staff`.

### Promoting someone to admin

Run in SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'owner@mtviewpharmacy.com';
```

(`role` must be exactly `admin` or `staff`; the CHECK constraint enforces this.)

## Public forms

The contact, prescription transfer, and medical-kit forms call server actions
in `src/app/actions/form-submissions.ts`. Each action:

1. Rate-limits the submitter's IP (5 / 15 minutes per form type).
2. Verifies the Cloudflare Turnstile token.
3. Validates input with Zod.
4. Sends an HTML + text email via Resend to `PHARMACY_CONTACT_EMAIL`, with
   `Reply-To` set to the submitter so staff can reply directly.

There is no database write &mdash; submissions live only in the pharmacy inbox.

## Production checklist

- [ ] All env vars set in the hosting provider (Vercel, Render, etc.).
- [ ] Supabase: signups disabled, leaked-password protection on.
- [ ] Resend: `RESEND_FROM_EMAIL` uses a verified domain (DKIM + SPF + return-path
      records added).
- [ ] Cloudflare Turnstile: site key + secret are for the production domain.
- [ ] **Replace the in-memory login + form rate limiter with Vercel KV or
      Upstash Redis.** The current implementation lives in
      `src/lib/supabase/middleware.ts` and `src/app/actions/form-submissions.ts`
      and resets on every cold start, which makes it unreliable on
      serverless. Look for the `TODO` comments.
- [ ] Verify `/admin` is gated when logged out (browser test).
- [ ] Verify `npm run build` finishes with zero errors and zero warnings.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (also typechecks + lints) |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint only |
| `npm run migrate` | Seeds posts (legacy import script) |
