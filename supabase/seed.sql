-- Sample content. Replace through the admin customizer once signed in.
insert into public.experiences (company, role, period_start, period_end, description, tech_stack, sort_order) values
  ('Sample Company A', 'Full-Stack Developer', '2023-01-01', null,
   'Build and maintain customer-facing web apps and internal APIs. Own features end to end, from schema design to deployment.',
   array['Next.js','TypeScript','Node.js','PostgreSQL'], 0),
  ('Sample Company B', 'Front-end Developer', '2021-06-01', '2022-12-31',
   'Implemented responsive UI from design specs and improved page performance across the product.',
   array['React','Tailwind CSS','REST'], 1);

insert into public.projects (title, summary, architecture, tech_stack, architecture_diagram, metrics, github_url, demo_url, sort_order) values
  ('Portfolio Terminal',
   'This site. A single-page portfolio with an admin customizer backed by Supabase.',
   'Next.js App Router renders sections on the server. Admin writes go through Server Actions guarded by Supabase Auth and row level security.',
   array['Next.js','TypeScript','Supabase','Tailwind CSS'],
   '{"nodes":[{"id":"client","label":"Browser"},{"id":"next","label":"Next.js"},{"id":"db","label":"Supabase"}],"edges":[{"from":"client","to":"next","label":"HTTPS"},{"from":"next","to":"db","label":"RLS"}]}',
   '[{"label":"Lighthouse Score","value":"98","trend":"up"},{"label":"First Load JS","value":"-35%","trend":"down"}]',
   'https://github.com/SSzSun/portfolio', null, 0);
