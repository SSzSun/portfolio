-- Editable site copy (hero summary etc.), keyed by name.
create table public.site_content (
  key text primary key check (char_length(key) between 1 and 60),
  value text not null default '' check (char_length(value) <= 2000),
  updated_at timestamptz not null default now()
);

create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;

create policy "site_content_select" on public.site_content
  for select to anon, authenticated
  using (true);

create policy "site_content_insert_admin" on public.site_content
  for insert to authenticated
  with check ((select private.is_admin()));

create policy "site_content_update_admin" on public.site_content
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

insert into public.site_content (key, value) values (
  'summary',
  'Outstanding ability in Front-end and Back-end. In addition to strong technical skills, I excel in communication and collaboration within a team. I am enthusiastic, adaptable, open-minded, hardworking, a good team player, and capable of working effectively under pressure.'
);
