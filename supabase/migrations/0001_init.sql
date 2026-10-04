-- Portfolio schema: experiences, projects, site stats, admin allowlist.

-- Admin allowlist (checked by RLS through is_admin()).
create table public.admins (
  email text primary key
);
alter table public.admins enable row level security;
-- No policies: only service role / security definer functions can read it.

insert into public.admins (email) values ('jaruphat.kp@gmail.com');

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins a
    where a.email = (select auth.jwt() ->> 'email')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Shared updated_at trigger.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Work experiences.
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null check (char_length(company) between 1 and 120),
  role text not null check (char_length(role) between 1 and 120),
  period_start date not null,
  period_end date,
  description text not null default '' check (char_length(description) <= 4000),
  tech_stack text[] not null default '{}',
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint experiences_period_check check (period_end is null or period_end >= period_start)
);

create index experiences_visible_order_idx
  on public.experiences (is_visible, sort_order, period_start desc);

create trigger experiences_set_updated_at
  before update on public.experiences
  for each row execute function public.set_updated_at();

-- Projects.
-- architecture_diagram: { nodes: [{id,label}], edges: [{from,to,label?}] }
-- metrics: [{ label, value, trend: 'up' | 'down' }]
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  summary text not null default '' check (char_length(summary) <= 2000),
  architecture text not null default '' check (char_length(architecture) <= 4000),
  tech_stack text[] not null default '{}',
  architecture_diagram jsonb not null default '{"nodes":[],"edges":[]}'::jsonb,
  metrics jsonb not null default '[]'::jsonb,
  github_url text check (github_url is null or github_url ~ '^https?://'),
  demo_url text check (demo_url is null or demo_url ~ '^https?://'),
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_metrics_is_array check (jsonb_typeof(metrics) = 'array'),
  constraint projects_diagram_is_object check (jsonb_typeof(architecture_diagram) = 'object')
);

create index projects_visible_order_idx
  on public.projects (is_visible, sort_order, created_at desc);

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Site stats (visitor counter).
create table public.site_stats (
  key text primary key,
  value bigint not null default 0 check (value >= 0)
);
insert into public.site_stats (key, value) values ('total_visits', 0);

-- RLS
alter table public.experiences enable row level security;
alter table public.projects enable row level security;
alter table public.site_stats enable row level security;

-- Public reads only visible rows; admins read everything.
create policy "experiences_select" on public.experiences
  for select to anon, authenticated
  using (is_visible or (select public.is_admin()));

create policy "experiences_insert_admin" on public.experiences
  for insert to authenticated
  with check ((select public.is_admin()));

create policy "experiences_update_admin" on public.experiences
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "experiences_delete_admin" on public.experiences
  for delete to authenticated
  using ((select public.is_admin()));

create policy "projects_select" on public.projects
  for select to anon, authenticated
  using (is_visible or (select public.is_admin()));

create policy "projects_insert_admin" on public.projects
  for insert to authenticated
  with check ((select public.is_admin()));

create policy "projects_update_admin" on public.projects
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "projects_delete_admin" on public.projects
  for delete to authenticated
  using ((select public.is_admin()));

-- Stats are readable; writes only via increment_visit().
create policy "site_stats_select" on public.site_stats
  for select to anon, authenticated
  using (true);

create or replace function public.increment_visit()
returns bigint
language sql
volatile
security definer
set search_path = ''
as $$
  update public.site_stats
     set value = value + 1
   where key = 'total_visits'
  returning value;
$$;

revoke all on function public.increment_visit() from public;
grant execute on function public.increment_visit() to anon, authenticated;
