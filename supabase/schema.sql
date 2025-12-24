-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- PROFILES (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  role text default 'user', -- 'admin', 'user', 'affiliate'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- CONTACTS (CRM)
create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  name text not null,
  email text,
  phone text,
  company text,
  status text default 'New', -- 'New', 'Contacted', 'Qualified', 'Customer'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.contacts enable row level security;

create policy "Users can view their own contacts."
  on contacts for select
  using ( auth.uid() = owner_id );

create policy "Users can insert their own contacts."
  on contacts for insert
  with check ( auth.uid() = owner_id );

create policy "Users can update their own contacts."
  on contacts for update
  using ( auth.uid() = owner_id );

create policy "Users can delete their own contacts."
  on contacts for delete
  using ( auth.uid() = owner_id );

-- PIPELINE STAGES
create table public.pipeline_stages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed initial stages
insert into public.pipeline_stages (name, position) values
('Lead', 1),
('In Progress', 2),
('Negotiation', 3),
('Closed Won', 4),
('Closed Lost', 5);

alter table public.pipeline_stages enable row level security;
create policy "Stages are viewable by everyone." on pipeline_stages for select using (true);


-- DEALS (Sales Pipeline)
create table public.deals (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  contact_id uuid references public.contacts(id),
  stage_id uuid references public.pipeline_stages(id),
  title text not null,
  value decimal(12,2) default 0.00,
  expected_close_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.deals enable row level security;

create policy "Users can CRUD their own deals."
  on deals for all
  using ( auth.uid() = owner_id );

-- CAMPAIGNS (Email Marketing)
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  name text not null,
  subject text,
  content text,
  status text default 'Draft', -- 'Draft', 'Scheduled', 'Sent'
  sent_at timestamp with time zone,
  open_rate decimal(5,2) default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.campaigns enable row level security;

create policy "Users can CRUD their own campaigns."
  on campaigns for all
  using ( auth.uid() = owner_id );

-- AFFILIATES
create table public.affiliates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  referral_code text unique not null,
  commission_rate decimal(5,2) default 20.00, -- 20%
  total_earnings decimal(12,2) default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.affiliates enable row level security;

create policy "Users can view their own affiliate data."
  on affiliates for select
  using ( auth.uid() = user_id );

-- TRIGGER: Create Profile on User Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
