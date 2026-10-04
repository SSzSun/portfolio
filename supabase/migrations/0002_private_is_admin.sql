-- Move is_admin() out of the exposed API schema so it is not callable via /rest/v1/rpc.
-- Policies referencing it follow the function automatically.
create schema if not exists private;
grant usage on schema private to anon, authenticated;
alter function public.is_admin() set schema private;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;
