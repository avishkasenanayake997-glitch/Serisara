-- ============================================================
-- Serisara Database Schema Migration: 005_seed_data.sql
-- Description: Lookup data (provinces, categories, amenities) & sample records
-- ============================================================

-- 1. Seed Provinces & Key Regions
INSERT INTO public.regions (id, name, slug, description) VALUES
    ('11111111-1111-1111-1111-111111111001', 'Central Province', 'central-province', 'Heart of Sri Lanka featuring tea plantations, mist-covered mountains, and cultural heritage including Kandy, Nuwara Eliya, and Sigiriya.'),
    ('11111111-1111-1111-1111-111111111002', 'Southern Province', 'southern-province', 'Famed for golden beaches, colonial fortresses, surf spots, and marine life spanning Galle, Mirissa, and Yala.'),
    ('11111111-1111-1111-1111-111111111003', 'Western Province', 'western-province', 'The commercial hub featuring vibrant Colombo, coastal Negombo, lively street food, and modern art galleries.'),
    ('11111111-1111-1111-1111-111111111004', 'Uva Province', 'uva-province', 'Breathtaking valleys, Ella rock, waterfall cascades, and scenic mountain railway routes.'),
    ('11111111-1111-1111-1111-111111111005', 'North Central Province', 'north-central-province', 'The Cultural Triangle featuring ancient capitals Anuradhapura and Polonnaruwa with sacred stupas and reservoirs.'),
    ('11111111-1111-1111-1111-111111111006', 'Eastern Province', 'eastern-province', 'Pristine turquoise waters, world-renowned surf breaks at Arugam Bay, and tranquil beaches of Nilaveli and Passikudah.'),
    ('11111111-1111-1111-1111-111111111007', 'Northern Province', 'northern-province', 'Distinct Tamil culture, vibrant Hindu temples, pristine islands, and rich culinary traditions in Jaffna.'),
    ('11111111-1111-1111-1111-111111111008', 'North Western Province', 'north-western-province', 'Coconut estates, dolphin watching off Kalpitiya peninsula, and serene lagoons.'),
    ('11111111-1111-1111-1111-111111111009', 'Sabaragamuwa Province', 'sabaragamuwa-province', 'The City of Gems (Ratnapura), gateway to sacred Adam''s Peak (Sri Pada) and Sinharaja Rainforest.')
ON CONFLICT (slug) DO NOTHING;

-- 2. Seed Categories
INSERT INTO public.categories (id, name, slug, type, icon) VALUES
    ('22222222-2222-2222-2222-222222222001', 'Cultural & Heritage', 'cultural-heritage', 'both', 'landmark'),
    ('22222222-2222-2222-2222-222222222002', 'Beaches & Coastal', 'beaches-coastal', 'both', 'palmtree'),
    ('22222222-2222-2222-2222-222222222003', 'Wildlife & Safari', 'wildlife-safari', 'both', 'camera'),
    ('22222222-2222-2222-2222-222222222004', 'Hiking & Nature', 'hiking-nature', 'both', 'mountain'),
    ('22222222-2222-2222-2222-222222222005', 'Adventure & Water Sports', 'adventure-water-sports', 'experience', 'compass'),
    ('22222222-2222-2222-2222-222222222006', 'Tea Country & Hills', 'tea-country-hills', 'both', 'coffee'),
    ('22222222-2222-2222-2222-222222222007', 'Wellness & Ayurveda', 'wellness-ayurveda', 'both', 'sparkles')
ON CONFLICT (slug) DO NOTHING;

-- 3. Seed Amenities
INSERT INTO public.amenities (id, name, icon, category) VALUES
    ('33333333-3333-3333-3333-333333333001', 'High-Speed WiFi', 'wifi', 'General'),
    ('33333333-3333-3333-3333-333333333002', 'Swimming Pool', 'waves', 'Recreation'),
    ('33333333-3333-3333-3333-333333333003', 'Air Conditioning', 'wind', 'Room'),
    ('33333333-3333-3333-3333-333333333004', 'Ocean View', 'eye', 'Room'),
    ('33333333-3333-3333-3333-333333333005', 'Mountain View', 'mountain', 'Room'),
    ('33333333-3333-3333-3333-333333333006', 'Gourmet Restaurant', 'utensils', 'Dining'),
    ('33333333-3333-3333-3333-333333333007', 'Ayurvedic Spa', 'heart', 'Wellness'),
    ('33333333-3333-3333-3333-333333333008', 'Free Secure Parking', 'car', 'General'),
    ('33333333-3333-3333-3333-333333333009', 'Airport Shuttle', 'plane', 'Services'),
    ('33333333-3333-3333-3333-333333333010', 'Breakfast Included', 'coffee', 'Dining')
ON CONFLICT (name) DO NOTHING;

-- 4. Seed Destinations
INSERT INTO public.destinations (
    id, name, slug, description, short_description, category_id, region_id,
    latitude, longitude, address, best_time_to_visit, entry_fee,
    opening_hours, practical_info, featured_image_url, avg_rating, review_count, status, is_featured
) VALUES
(
    '44444444-4444-4444-4444-444444444001',
    'Sigiriya Ancient Rock Fortress',
    'sigiriya-ancient-rock-fortress',
    'Sigiriya, also known as the Lion Rock, is an ancient fortress and palace ruin situated in the northern Matale District. Rising nearly 200 meters above the surrounding forested plains, this UNESCO World Heritage Site features fifth-century water gardens, world-renowned frescoes of celestial maidens, and the colossal lion paw entrance built by King Kashyapa.',
    'UNESCO World Heritage rock citadel featuring 5th-century frescoes and panoramic vistas.',
    '22222222-2222-2222-2222-222222222001',
    '11111111-1111-1111-1111-111111111001',
    7.9570,
    80.7603,
    'Sigiriya, Matale District, Central Province',
    'November to April',
    'USD 30 for foreign adults, USD 15 for children',
    '6:30 AM – 5:30 PM daily (Ticket counters close at 5:00 PM)',
    'Wear comfortable walking shoes, a sun hat, and bring at least 1.5L of water. Climb early in the morning to beat the tropical midday heat.',
    'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    4.9,
    128,
    'published',
    true
),
(
    '44444444-4444-4444-4444-444444444002',
    'Galle Dutch Fort',
    'galle-dutch-fort',
    'The historic fortified city founded by Portuguese colonists in the 16th century and fortified extensively by the Dutch in the 17th century. Enclosed within formidable granite ramparts overlooking the Indian Ocean, Galle Fort is a living heritage site brimming with boutique villas, cobblestone alleys, spice shops, and European colonial architecture.',
    'Colonial living fort with ocean ramparts, boutique cafes, and cobbled lanes.',
    '22222222-2222-2222-2222-222222222001',
    '11111111-1111-1111-1111-111111111002',
    6.0305,
    80.2173,
    'Church Street, Galle 80000, Southern Province',
    'December to April',
    'Free entry to Fort ramparts (museums have small separate fees)',
    'Open 24 hours (Rampart walks best at sunset)',
    'Great destination for sunset strolls, artisanal gelato, and visiting the historic Galle Lighthouse.',
    'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    4.8,
    94,
    'published',
    true
),
(
    '44444444-4444-4444-4444-444444444003',
    'Nine Arches Bridge, Ella',
    'nine-arches-bridge-ella',
    'Commissioned during the British colonial era in 1921, the Bridge in the Sky is a magnificent stone viaduct tucked amidst the lush emerald tea estates of Ella. Built completely without steel reinforcement using solid brick and cement stone, visitors gather along the tea slopes to watch the scenic blue highland train roll across the arches.',
    'Iconic colonial stone railway viaduct surrounded by emerald tea plantations.',
    '22222222-2222-2222-2222-222222222006',
    '11111111-1111-1111-1111-111111111004',
    6.8768,
    81.0608,
    'Demodara, Ella, Badulla District, Uva Province',
    'Year-round, best morning light between 9:00 AM and 11:30 AM',
    'Free admission',
    'Open 24 hours (train crossings occur roughly 4 to 6 times daily)',
    'A short 20-minute jungle walk from Ella town. Respect railway safety signs and stay off the tracks when trains approach.',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    4.9,
    110,
    'published',
    true
),
(
    '44444444-4444-4444-4444-444444444004',
    'Yala National Park',
    'yala-national-park',
    'Yala National Park is Sri Lanka''s premier wildlife sanctuary, boasting one of the world''s highest leopard densities. Bordering the Indian Ocean, its diverse ecosystems range from dry thorny scrub jungle to monsoon forests, saltwater lagoons, and rocky granite outcrops harboring Sri Lankan elephants, sloth bears, and crocodiles.',
    'Renowned wildlife haven with highest leopard density and wild elephant herds.',
    '22222222-2222-2222-2222-222222222003',
    '11111111-1111-1111-1111-111111111002',
    6.3725,
    81.5170,
    'Palatupana, Yala, Southern Province',
    'February to June',
    'Park entry approx USD 35 per person + jeep hire',
    '6:00 AM – 6:00 PM (Morning safari departs 5:30 AM, Afternoon departs 2:30 PM)',
    'Book an experienced tracker and 4x4 safari jeep. Keep cameras with zoom lenses ready and never feed wild animals.',
    'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
    4.7,
    85,
    'published',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- 5. Seed Accommodations
INSERT INTO public.accommodations (
    id, name, slug, type, description, short_description, region_id,
    latitude, longitude, address, contact_email, contact_phone,
    price_min, price_max, star_rating, check_in_time, check_out_time,
    featured_image_url, avg_rating, review_count, status, is_featured
) VALUES
(
    '55555555-5555-5555-5555-555555555001',
    'The Fortress Resort & Spa',
    'the-fortress-resort-and-spa',
    'hotel',
    'Inspired by Galle''s Dutch Portuguese architecture, The Fortress Resort & Spa is a 5-star beachfront haven nestled along the golden shores of Koggala. Offering ultra-luxury suites with plunge pools, an Ayurvedic spa pavilion, and exquisite open-air dining facing the crashing ocean waves.',
    '5-star oceanfront luxury retreat near Galle with private plunge pools and spa.',
    '11111111-1111-1111-1111-111111111002',
    6.0028,
    80.3236,
    'Koggala, Habaraduwa, Galle District',
    'reservations@fortressresort.lk',
    '+94 91 438 9400',
    220.00,
    650.00,
    5,
    '14:00',
    '12:00',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    4.9,
    46,
    'published',
    true
),
(
    '55555555-5555-5555-5555-555555555002',
    '98 Acres Resort & Spa',
    '98-acres-resort-and-spa',
    'resort',
    'A scenic eco-luxury resort situated in Ella on a 98-acre tea estate. Crafted using recycled railway timber, rough stone, and thatched roofs, the chalets offer unobstructed panoramic vistas of Ella Gap and Little Adam''s Peak.',
    'Eco-luxury chalets nestled in an Ella tea estate with panoramic mountain views.',
    '11111111-1111-1111-1111-111111111004',
    6.8665,
    81.0601,
    'Greenland Estate, Ella, Badulla District',
    'info@resort98acres.com',
    '+94 57 205 0050',
    180.00,
    490.00,
    5,
    '14:00',
    '11:00',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    4.9,
    62,
    'published',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Room Types
INSERT INTO public.room_types (id, accommodation_id, name, description, price_per_night, max_guests, total_rooms) VALUES
    ('66666666-6666-6666-6666-666666666001', '55555555-5555-5555-5555-555555555001', 'Ocean View Suite', 'Spacious master bedroom with private balcony overlooking the Indian Ocean.', 250.00, 2, 10),
    ('66666666-6666-6666-6666-666666666002', '55555555-5555-5555-5555-555555555001', 'Fortress Plunge Pool Villa', 'Private ground floor pavilion with outdoor plunge pool and personal butler.', 520.00, 3, 4),
    ('66666666-6666-6666-6666-666666666003', '55555555-5555-5555-5555-555555555002', 'Deluxe Tea Chalet', 'Timber chalet overlooking tea carpets and morning mist over Ella Gap.', 210.00, 2, 12)
ON CONFLICT DO NOTHING;

-- Link Amenities to Accommodations
INSERT INTO public.accommodation_amenities (accommodation_id, amenity_id) VALUES
    ('55555555-5555-5555-5555-555555555001', '33333333-3333-3333-3333-333333333001'),
    ('55555555-5555-5555-5555-555555555001', '33333333-3333-3333-3333-333333333002'),
    ('55555555-5555-5555-5555-555555555001', '33333333-3333-3333-3333-333333333003'),
    ('55555555-5555-5555-5555-555555555001', '33333333-3333-3333-3333-333333333004'),
    ('55555555-5555-5555-5555-555555555001', '33333333-3333-3333-3333-333333333006'),
    ('55555555-5555-5555-5555-555555555001', '33333333-3333-3333-3333-333333333007'),
    ('55555555-5555-5555-5555-555555555002', '33333333-3333-3333-3333-333333333001'),
    ('55555555-5555-5555-5555-555555555002', '33333333-3333-3333-3333-333333333002'),
    ('55555555-5555-5555-5555-555555555002', '33333333-3333-3333-3333-333333333005'),
    ('55555555-5555-5555-5555-555555555002', '33333333-3333-3333-3333-333333333006')
ON CONFLICT DO NOTHING;

-- 6. Seed Experiences
INSERT INTO public.experiences (
    id, name, slug, description, short_description, category_id, region_id,
    latitude, longitude, address, duration_hours, difficulty, price_per_person,
    min_participants, max_participants, included_items, what_to_bring,
    schedule, featured_image_url, avg_rating, review_count, status, is_featured
) VALUES
(
    '77777777-7777-7777-7777-777777777001',
    'Mirissa Sunrise Whale & Dolphin Expedition',
    'mirissa-sunrise-whale-dolphin-expedition',
    'Embark on an ethical marine safari off the southern coast of Mirissa. The warm waters along Sri Lanka''s continental shelf attract majestic Blue Whales — the largest creatures to ever inhabit the earth — alongside Bryde''s whales, pods of spinner dolphins, and sea turtles.',
    'Witness majestic Blue Whales and playful dolphins with an experienced marine naturalist.',
    '22222222-2222-2222-2222-222222222003',
    '11111111-1111-1111-1111-111111111002',
    5.9450,
    80.4578,
    'Mirissa Harbour, Southern Province',
    4.5,
    'easy',
    65.00,
    1,
    25,
    'Life jackets, onboard light breakfast, fresh tropical fruit, bottled water, certified marine guide',
    'Sunscreen, motion sickness tablets if prone to sea sickness, sunglasses, binoculars/telephoto lens',
    'Daily departures at 6:30 AM from Mirissa Fishery Harbour',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    4.8,
    58,
    'published',
    true
),
(
    '77777777-7777-7777-7777-777777777002',
    'Ceylon Tea Masters Plucking & Tasting Journey',
    'ceylon-tea-masters-plucking-and-tasting-journey',
    'Walk through emerald hill slopes with a third-generation tea master in Nuwara Eliya. Learn the art of two leaves and a bud hand-plucking, visit a vintage 19th-century operational hydro-powered factory, and taste single-origin Orange Pekoes and Silver Tips.',
    'Hands-on tea plucking and professional cupping experience in the misty highlands.',
    '22222222-2222-2222-2222-222222222006',
    '11111111-1111-1111-1111-111111111001',
    6.9497,
    80.7891,
    'Nuwara Eliya Tea Valley, Central Province',
    3.0,
    'easy',
    40.00,
    2,
    12,
    'Traditional cane basket loan, factory tour, professional tea tasting session, 100g souvenir tea pouch',
    'Light sweater or cardigan, comfortable walking shoes',
    'Morning session: 9:30 AM | Afternoon session: 2:00 PM',
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    4.9,
    42,
    'published',
    true
)
ON CONFLICT (slug) DO NOTHING;
