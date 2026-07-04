-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- After running, go to Project Settings → Data API → "Exposed schemas" and add
-- `next_auth` to the list (alongside the default `public`) — @auth/supabase-adapter
-- talks to Postgres through Supabase's REST API, which only sees schemas you expose.

-- ── NextAuth (Auth.js) adapter tables ───────────────────────────────────────
-- Matches the schema @auth/supabase-adapter expects (db.schema = "next_auth").
create schema if not exists next_auth;

create table if not exists next_auth.users (
  id uuid not null default gen_random_uuid(),
  name text,
  email text,
  "emailVerified" timestamptz,
  image text,
  primary key (id)
);

create table if not exists next_auth.sessions (
  id uuid not null default gen_random_uuid(),
  "sessionToken" text not null,
  "userId" uuid not null references next_auth.users(id) on delete cascade,
  expires timestamptz not null,
  primary key (id),
  unique ("sessionToken")
);

create table if not exists next_auth.accounts (
  id uuid not null default gen_random_uuid(),
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  "userId" uuid not null references next_auth.users(id) on delete cascade,
  primary key (id),
  unique (provider, "providerAccountId")
);

create table if not exists next_auth.verification_tokens (
  id uuid not null default gen_random_uuid(),
  identifier text not null,
  token text not null,
  expires timestamptz not null,
  primary key (id),
  unique (token),
  unique (identifier, token)
);

-- Unlike `public`, a custom schema has no default grants for the API roles
-- PostgREST uses — without these, every request 403s with "permission denied
-- for schema next_auth" even after the schema is exposed in the dashboard.
grant usage on schema next_auth to anon, authenticated, service_role;
grant all on all tables in schema next_auth to anon, authenticated, service_role;
alter default privileges in schema next_auth
  grant all on tables to anon, authenticated, service_role;

-- ── App tables (public schema) ──────────────────────────────────────────────

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  key text not null unique,
  status text not null default 'active', -- 'active' | 'revoked'
  activated_devices int not null default 0,
  max_activations int not null default 3,
  created_at timestamptz not null default now()
);

-- One-time deep-link activation tokens (short-lived, single-use).
create table if not exists public.activation_tokens (
  token text primary key,
  license_id uuid not null references public.licenses(id) on delete cascade,
  used boolean not null default false,
  created_at timestamptz not null default now()
);
