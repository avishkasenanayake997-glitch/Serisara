-- ============================================================
-- Serisara Database Schema Migration: 004_rls_policies.sql
-- Description: Row Level Security (RLS) policies for all tables
-- ============================================================

-- 1. Enable RLS on all public tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Helper function to check role from auth JWT / profiles table
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS VARCHAR AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 2. Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (is_active = true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 3. Regions & Categories & Amenities (Public Read, Admin Write)
CREATE POLICY "Regions are viewable by everyone"
    ON public.regions FOR SELECT
    USING (true);

CREATE POLICY "Categories are viewable by everyone"
    ON public.categories FOR SELECT
    USING (true);

-- 4. Destinations policies
CREATE POLICY "Published destinations are viewable by everyone"
    ON public.destinations FOR SELECT
    USING (status = 'published' OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Managers and Admins can insert destinations"
    ON public.destinations FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin'));

CREATE POLICY "Managers and Admins can update destinations"
    ON public.destinations FOR UPDATE
    USING (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin'));

CREATE POLICY "Admins can delete destinations"
    ON public.destinations FOR DELETE
    USING (auth.uid() IS NOT NULL AND public.current_user_role() = 'admin');

CREATE POLICY "Destination images are viewable by everyone"
    ON public.destination_images FOR SELECT
    USING (true);

-- 5. Accommodations policies
CREATE POLICY "Published accommodations are viewable by everyone"
    ON public.accommodations FOR SELECT
    USING (status = 'published' OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Managers and Admins can insert accommodations"
    ON public.accommodations FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin'));

CREATE POLICY "Managers and Admins can update accommodations"
    ON public.accommodations FOR UPDATE
    USING (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin'));

CREATE POLICY "Admins can delete accommodations"
    ON public.accommodations FOR DELETE
    USING (auth.uid() IS NOT NULL AND public.current_user_role() = 'admin');

CREATE POLICY "Accommodation images are viewable by everyone"
    ON public.accommodation_images FOR SELECT
    USING (true);

CREATE POLICY "Amenities are viewable by everyone"
    ON public.amenities FOR SELECT
    USING (true);

CREATE POLICY "Accommodation amenities are viewable by everyone"
    ON public.accommodation_amenities FOR SELECT
    USING (true);

CREATE POLICY "Room types are viewable by everyone"
    ON public.room_types FOR SELECT
    USING (true);

-- 6. Experiences policies
CREATE POLICY "Published experiences are viewable by everyone"
    ON public.experiences FOR SELECT
    USING (status = 'published' OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Managers and Admins can insert experiences"
    ON public.experiences FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin'));

CREATE POLICY "Managers and Admins can update experiences"
    ON public.experiences FOR UPDATE
    USING (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin'));

CREATE POLICY "Admins can delete experiences"
    ON public.experiences FOR DELETE
    USING (auth.uid() IS NOT NULL AND public.current_user_role() = 'admin');

CREATE POLICY "Experience images are viewable by everyone"
    ON public.experience_images FOR SELECT
    USING (true);

-- 7. Reviews policies
CREATE POLICY "Published reviews are viewable by everyone"
    ON public.reviews FOR SELECT
    USING (status = 'published' OR auth.uid() = user_id OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Authenticated users can create reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
    ON public.reviews FOR UPDATE
    USING (auth.uid() = user_id OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Users can delete own reviews"
    ON public.reviews FOR DELETE
    USING (auth.uid() = user_id OR (auth.uid() IS NOT NULL AND public.current_user_role() = 'admin'));

-- 8. Favorites policies
CREATE POLICY "Users can view own favorites"
    ON public.favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
    ON public.favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
    ON public.favorites FOR DELETE
    USING (auth.uid() = user_id);

-- 9. Trips & Trip Items policies
CREATE POLICY "Users can view own trips"
    ON public.trips FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trips"
    ON public.trips FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips"
    ON public.trips FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips"
    ON public.trips FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view items of own trips"
    ON public.trip_items FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_items.trip_id AND trips.user_id = auth.uid()));

CREATE POLICY "Users can add items to own trips"
    ON public.trip_items FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_items.trip_id AND trips.user_id = auth.uid()));

CREATE POLICY "Users can update items in own trips"
    ON public.trip_items FOR UPDATE
    USING (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_items.trip_id AND trips.user_id = auth.uid()));

CREATE POLICY "Users can delete items from own trips"
    ON public.trip_items FOR DELETE
    USING (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_items.trip_id AND trips.user_id = auth.uid()));

-- 10. Bookings & Payments policies
CREATE POLICY "Users can view own bookings"
    ON public.bookings FOR SELECT
    USING (auth.uid() = user_id OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Users can create bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending bookings or Admins can update"
    ON public.bookings FOR UPDATE
    USING (auth.uid() = user_id OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Users can view own payments"
    ON public.payments FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.bookings WHERE bookings.id = payments.booking_id AND bookings.user_id = auth.uid()) OR (auth.uid() IS NOT NULL AND public.current_user_role() = 'admin'));

-- 11. Inquiries policies
CREATE POLICY "Users can view own inquiries or Admins/Managers can view all"
    ON public.inquiries FOR SELECT
    USING (auth.uid() = user_id OR (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin')));

CREATE POLICY "Anyone can submit an inquiry"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Managers and Admins can update inquiries"
    ON public.inquiries FOR UPDATE
    USING (auth.uid() IS NOT NULL AND public.current_user_role() IN ('manager', 'admin'));
