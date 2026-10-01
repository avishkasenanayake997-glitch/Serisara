# Serisara Database Migrations

This directory contains the complete database schema, triggers, RLS policies, and seed data for the Serisara platform.

## Migration Files Order

1. `001_initial_schema.sql` — Creates all 19 database tables with primary keys, foreign keys, and constraints.
2. `002_functions_triggers.sql` — Creates `handle_new_user` (syncs `auth.users` with `public.profiles`), `handle_updated_at` (automatic timestamp maintenance), and `handle_review_stats` (real-time recalculation of average ratings and review counts).
3. `003_indexes.sql` — Performance indexes for foreign keys, slugs, sorting, and Postgres GIN full-text search.
4. `004_rls_policies.sql` — Complete Row Level Security policies guaranteeing safe client access, public read permissions for published listings, and role-based permissions for managers and admins.
5. `005_seed_data.sql` — Initial seed data for Sri Lankan provinces, tourism categories, amenities, and rich sample listings (Sigiriya, Galle Fort, Nine Arches Bridge, Yala, Luxury Resorts, and Excursions).

## How to Apply on Supabase

### Option A: Supabase Dashboard SQL Editor (Fastest)
1. Open your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor** from the left navigation bar.
3. Paste and run each migration file sequentially from `001` through `005`.

### Option B: Supabase CLI
```bash
supabase db push
# or
supabase db reset
```
