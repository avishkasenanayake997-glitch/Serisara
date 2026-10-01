-- ============================================================
-- Serisara Database Schema Migration: 002_functions_triggers.sql
-- Description: Automated timestamp triggers, auth hooks, and rating stats
-- ============================================================

-- 1. Helper function for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_destinations_updated_at
    BEFORE UPDATE ON public.destinations
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_accommodations_updated_at
    BEFORE UPDATE ON public.accommodations
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_experiences_updated_at
    BEFORE UPDATE ON public.experiences
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_trips_updated_at
    BEFORE UPDATE ON public.trips
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- 2. Trigger function to create a profile automatically when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. Trigger function to recalculate avg_rating and review_count on reviewed entities
CREATE OR REPLACE FUNCTION public.handle_review_stats()
RETURNS TRIGGER AS $$
DECLARE
    target_type VARCHAR(20);
    target_id UUID;
    new_avg DECIMAL(3,2);
    new_count INTEGER;
BEGIN
    IF (TG_OP = 'DELETE') THEN
        target_type := OLD.reviewable_type;
        target_id := OLD.reviewable_id;
    ELSE
        target_type := NEW.reviewable_type;
        target_id := NEW.reviewable_id;
    END IF;

    -- Calculate aggregate stats for published reviews only
    SELECT
        COALESCE(ROUND(AVG(rating)::numeric, 2), 0.00),
        COUNT(*)
    INTO new_avg, new_count
    FROM public.reviews
    WHERE reviewable_type = target_type
      AND reviewable_id = target_id
      AND status = 'published';

    -- Update the corresponding entity
    IF target_type = 'destination' THEN
        UPDATE public.destinations
        SET avg_rating = new_avg, review_count = new_count
        WHERE id = target_id;
    ELSIF target_type = 'accommodation' THEN
        UPDATE public.accommodations
        SET avg_rating = new_avg, review_count = new_count
        WHERE id = target_id;
    ELSIF target_type = 'experience' THEN
        UPDATE public.experiences
        SET avg_rating = new_avg, review_count = new_count
        WHERE id = target_id;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_review_stats_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.handle_review_stats();
