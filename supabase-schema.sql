-- EMPLEORA - Esquema de base de datos para Supabase
-- Copia y pega esto en el SQL Editor de Supabase

-- 1. Categorías
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

insert into categories (name, slug) values
('Construcción y reformas', 'construccion'),
('Limpieza', 'limpieza'),
('Hostelería y turismo', 'hosteleria'),
('Transporte y conducción', 'transporte'),
('Logística y almacén', 'logistica'),
('Administración y oficina', 'administracion'),
('Comercio y ventas', 'comercio'),
('Atención al cliente', 'atencion'),
('Informática y tecnología', 'informatica'),
('Sanidad', 'sanidad'),
('Educación', 'educacion'),
('Mantenimiento y reparaciones', 'mantenimiento'),
('Agricultura y campo', 'agricultura'),
('Industria', 'industria'),
('Peluquería y estética', 'estetica'),
('Cuidado de personas', 'cuidado'),
('Marketing y comunicación', 'marketing'),
('Trabajo doméstico', 'domestico'),
('Otros sectores', 'otros')
on conflict do nothing;

-- 2. Perfiles de usuario
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- 3. Anuncios
create table if not exists ads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  profession text not null,
  category_id uuid references categories,
  province text,
  city text,
  description text not null,
  experience text,
  skills text,
  jornada text,
  disponibilidad text,
  contact_method text,
  contact_info text, -- solo visible para el dueño y admin
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'expired')),
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '30 days')
);

-- 4. Denuncias
create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid references ads on delete cascade,
  reporter_id uuid references auth.users,
  reason text,
  created_at timestamptz default now()
);

-- Políticas RLS (seguridad)
alter table profiles enable row level security;
alter table ads enable row level security;
alter table reports enable row level security;

-- Perfiles
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Anuncios: cualquiera puede ver los aprobados
create policy "Anyone can view approved ads" on ads for select using (status = 'approved');

-- Usuarios pueden ver sus propios anuncios
create policy "Users can view own ads" on ads for select using (auth.uid() = user_id);

-- Usuarios pueden crear anuncios
create policy "Users can insert own ads" on ads for insert with check (auth.uid() = user_id);

-- Usuarios pueden editar/eliminar sus propios anuncios
create policy "Users can update own ads" on ads for update using (auth.uid() = user_id);
create policy "Users can delete own ads" on ads for delete using (auth.uid() = user_id);

-- Admin puede ver y gestionar todo
create policy "Admins can do everything on ads" on ads for all using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- Denuncias
create policy "Users can create reports" on reports for insert with check (auth.uid() = reporter_id);
create policy "Admins can view reports" on reports for select using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);
