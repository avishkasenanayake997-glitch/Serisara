-- ============================================================
-- Serisara Database Schema Migration: 003_indexes.sql
-- Description: Indexes for search, filtering, and foreign key query performance
-- ============================================================

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON public.profiles(is_active);

-- Regions & Categories
CREATE INDEX IF NOT EXISTS idx_regions_slug ON public.regions(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_type ON public.categories(type);

-- Destinations
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON public.destinations(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_category ON public.destinations(category_id);
CREATE INDEX IF NOT EXISTS idx_destinations_region ON public.destinations(region_id);
CREATE INDEX IF NOT EXISTS idx_destinations_status ON public.destinations(status);
CREATE INDEX IF NOT EXISTS idx_destinations_is_featured ON public.destinations(is_featured);
CREATE INDEX IF NOT EXISTS idx_destinations_rating ON public.destinations(avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_destinations_search ON public.destinations USING gin(to_tsvector('english', name || ' ' || coalesce(short_description, '')));

-- Destination Images
CREATE INDEX IF NOT EXISTS idx_destination_images_dest_id ON public.destination_images(destination_id, sort_order);

-- Accommodations
CREATE INDEX IF NOT EXISTS idx_accommodations_slug ON public.accommodations(slug);
CREATE INDEX IF NOT EXISTS idx_accommodations_type ON public.accommodations(type);
CREATE INDEX IF NOT EXISTS idx_accommodations_region ON public.accommodations(region_id);
CREATE INDEX IF NOT EXISTS idx_accommodations_status ON public.accommodations(status);
CREATE INDEX IF NOT EXISTS idx_accommodations_price_min ON public.accommodations(price_min);
CREATE INDEX IF NOT EXISTS idx_accommodations_is_featured ON public.accommodations(is_featured);
CREATE INDEX IF NOT EXISTS idx_accommodations_rating ON public.accommodations(avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_accommodations_search ON public.accommodations USING gin(to_tsvector('english', name || ' ' || coalesce(short_description, '')));

-- Accommodation Images
CREATE INDEX IF NOT EXISTS idx_accommodation_images_acc_id ON public.accommodation_images(accommodation_id, sort_order);

-- Room Types
CREATE INDEX IF NOT EXISTS idx_room_types_accommodation_id ON public.room_types(accommodation_id);

-- Experiences
CREATE INDEX IF NOT EXISTS idx_experiences_slug ON public.experiences(slug);
CREATE INDEX IF NOT EXISTS idx_experiences_category ON public.experiences(category_id);
CREATE INDEX IF NOT EXISTS idx_experiences_region ON public.experiences(region_id);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON public.experiences(status);
CREATE INDEX IF NOT EXISTS idx_experiences_difficulty ON public.experiences(difficulty);
CREATE INDEX IF NOT EXISTS idx_experiences_price ON public.experiences(price_per_person);
CREATE INDEX IF NOT EXISTS idx_experiences_is_featured ON public.experiences(is_featured);
CREATE INDEX IF NOT EXISTS idx_experiences_rating ON public.experiences(avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_experiences_search ON public.experiences USING gin(to_tsvector('english', name || ' ' || coalesce(short_description, '')));

-- Experience Images
CREATE INDEX IF NOT EXISTS idx_experience_images_exp_id ON public.experience_images(experience_id, sort_order);

-- Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_reviewable ON public.reviews(reviewable_type, reviewable_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Favorites
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_favoritable ON public.favorites(favoritable_type, favoritable_id);

-- Trips & Trip Items
CREATE INDEX IF NOT EXISTS idx_trips_user ON public.trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trip_items_trip ON public.trip_items(trip_id, day_number, sort_order);

-- Bookings
CREATE INDEX IF NOT EXISTS idx_bookings_user ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_bookable ON public.bookings(booking_type, bookable_id);
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_pi ON public.bookings(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- Payments
CREATE INDEX IF NOT EXISTS idx_payments_booking ON public.payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_pi ON public.payments(stripe_payment_intent_id);

-- Inquiries
CREATE INDEX IF NOT EXISTS idx_inquiries_user ON public.inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_type ON public.inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
