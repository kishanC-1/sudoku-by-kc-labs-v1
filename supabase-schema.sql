create table if not exists users (
  user_id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz,
  is_anonymous boolean not null default true,
  theme_preference text default 'system'
);

create table if not exists game_sessions (
  session_id uuid primary key default gen_random_uuid(),
  user_id uuid references users(user_id),
  puzzle_id text,
  difficulty text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer,
  mistakes_count integer default 0,
  hints_used integer default 0,
  notes_used integer default 0,
  completed boolean default false,
  abandoned boolean default false,
  completion_time_seconds integer
);

create table if not exists analytics_events (
  event_id uuid primary key default gen_random_uuid(),
  user_id uuid references users(user_id),
  session_id uuid references game_sessions(session_id),
  event_type text not null,
  page_path text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists puzzles (
  puzzle_id text primary key,
  difficulty text not null,
  initial_grid jsonb not null,
  solution_grid jsonb not null,
  is_daily boolean default false,
  daily_for_date date,
  created_at timestamptz not null default now()
);

create table if not exists content_posts (
  post_id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  category text,
  status text default 'published',
  seo_title text,
  seo_description text,
  published_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists admin_users (
  admin_id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role text default 'owner',
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists system_logs (
  log_id uuid primary key default gen_random_uuid(),
  level text not null,
  source text not null,
  message text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
