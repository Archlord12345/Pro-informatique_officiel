-- Pro-Informatique: initialisation base Supabase
-- A executer dans SQL Editor Supabase

create extension if not exists pgcrypto;

-- Profils utilisateurs (base pour auth + role admin)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Publications media
create table if not exists public.media_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  type text not null default 'photo' check (type in ('photo', 'video', 'audio')),
  url text not null,
  drive_file_id text,
  published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Commentaires sur publications
create table if not exists public.media_comments (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references public.media_posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  message text not null,
  is_approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Traces visiteurs (analytics simple)
create table if not exists public.visitor_events (
  id bigserial primary key,
  event_name text not null,
  route text,
  session_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Logs chatbot
create table if not exists public.chat_messages (
  id bigserial primary key,
  session_id text,
  question text not null,
  answer text not null,
  model_name text,
  out_of_scope boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_media_posts_created_at on public.media_posts(created_at desc);
create index if not exists idx_media_comments_media_id on public.media_comments(media_id);
create index if not exists idx_media_comments_created_at on public.media_comments(created_at desc);
create index if not exists idx_visitor_events_created_at on public.visitor_events(created_at desc);
create index if not exists idx_chat_messages_created_at on public.chat_messages(created_at desc);

alter table public.profiles enable row level security;
alter table public.media_posts enable row level security;
alter table public.media_comments enable row level security;
alter table public.visitor_events enable row level security;
alter table public.chat_messages enable row level security;

-- Policies profiles
drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles
for select
using (auth.uid() = id or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles
for update
using (auth.uid() = id or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

-- Policies media_posts
drop policy if exists "media_posts_public_read" on public.media_posts;
create policy "media_posts_public_read"
on public.media_posts
for select
using (published = true);

drop policy if exists "media_posts_admin_write" on public.media_posts;
create policy "media_posts_admin_write"
on public.media_posts
for all
using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
))
with check (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

-- Policies comments
drop policy if exists "comments_public_read_approved" on public.media_comments;
create policy "comments_public_read_approved"
on public.media_comments
for select
using (is_approved = true);

drop policy if exists "comments_public_insert" on public.media_comments;
create policy "comments_public_insert"
on public.media_comments
for insert
with check (true);

drop policy if exists "comments_admin_manage" on public.media_comments;
create policy "comments_admin_manage"
on public.media_comments
for all
using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
))
with check (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

-- Policies visitor/chat logs (admin only)
drop policy if exists "visitor_events_admin_only" on public.visitor_events;
create policy "visitor_events_admin_only"
on public.visitor_events
for all
using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
))
with check (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

drop policy if exists "chat_messages_admin_only" on public.chat_messages;
create policy "chat_messages_admin_only"
on public.chat_messages
for all
using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
))
with check (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

-- Donnees initiales
insert into public.media_posts (title, summary, type, url, published)
values
  ('Atelier maintenance PC', 'Intervention complete sur poste bureautique.', 'photo', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80', true),
  ('Conception flyer evenementiel', 'Mise en page professionnelle et impression haute qualite.', 'photo', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80', true)
on conflict do nothing;
