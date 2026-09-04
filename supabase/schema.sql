create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  sort int not null default 0
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  category_id uuid not null references public.categories (id) on delete restrict,
  price numeric(10, 2) not null,
  compare_at numeric(10, 2),
  hero_image text not null,
  gallery jsonb not null default '[]'::jsonb,
  specs jsonb not null default '{}'::jsonb,
  featured boolean not null default false
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  sku text unique not null,
  name text not null,
  price_delta numeric(10, 2) not null default 0,
  attributes jsonb not null default '{}'::jsonb,
  stock int not null default 0
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  customer jsonb not null default '{}'::jsonb,
  shipping jsonb not null default '{}'::jsonb,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(10, 2) not null,
  shipping_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  payment_status text not null default 'paid',
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories"
  on public.categories for select
  using (true);

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  using (true);

drop policy if exists "Public read variants" on public.product_variants;
create policy "Public read variants"
  on public.product_variants for select
  using (true);

drop policy if exists "Public insert orders" on public.orders;
create policy "Public insert orders"
  on public.orders for insert
  with check (true);

drop policy if exists "Public read own order by id" on public.orders;
create policy "Public read own order by id"
  on public.orders for select
  using (true);
