export interface DestinationItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  region: string;
  regionSlug: string;
  shortDescription: string;
  description: string;
  featuredImageUrl: string;
  galleryImages: string[];
  latitude: number;
  longitude: number;
  address: string;
  bestTimeToVisit: string;
  entryFee: string;
  openingHours: string;
  practicalInfo: string;
  avgRating: number;
  reviewCount: number;
  isFeatured: boolean;
  tags: string[];
}

export interface AccommodationItem {
  id: string;
  name: string;
  slug: string;
  type: 'hotel' | 'villa' | 'homestay' | 'resort' | 'guesthouse' | 'hostel';
  region: string;
  regionSlug: string;
  address: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  description: string;
  featuredImageUrl: string;
  galleryImages: string[];
  priceMin: number;
  priceMax: number;
  starRating: number;
  avgRating: number;
  reviewCount: number;
  isFeatured: boolean;
  amenities: string[];
  roomTypes: Array<{
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    maxGuests: number;
    totalRooms: number;
    imageUrl?: string;
  }>;
}

export interface ExperienceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  region: string;
  regionSlug: string;
  address: string;
  latitude: number;
  longitude: number;
  durationHours: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  pricePerPerson: number;
  minParticipants: number;
  maxParticipants?: number;
  shortDescription: string;
  description: string;
  featuredImageUrl: string;
  galleryImages: string[];
  includedItems: string[];
  whatToBring: string[];
  schedule: string;
  avgRating: number;
  reviewCount: number;
  isFeatured: boolean;
}

export const SAMPLE_DESTINATIONS: DestinationItem[] = [
  {
    id: '44444444-4444-4444-4444-444444444001',
    name: 'Sigiriya Ancient Rock Fortress',
    slug: 'sigiriya-ancient-rock-fortress',
    category: 'UNESCO Heritage',
    categorySlug: 'heritage',
    region: 'Central Province',
    regionSlug: 'central-province',
    shortDescription: 'Colossal 5th-century rock citadel with celestial frescoes, mirror wall, and lion gate.',
    description:
      'Sigiriya, also hailed as the eighth wonder of the world, is an ancient palace and fortress complex built by King Kashyapa in the 5th century CE. Soaring 200 meters above the forested plains, visitors ascend through tiered water gardens, cantilevered boulders, and cliffside galleries boasting the world-famous Sigiriya frescoes before arriving at the monumental Lion Gate and sky palace ruins.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    ],
    latitude: 7.9570,
    longitude: 80.7603,
    address: 'Sigiriya, Matale District, Central Province',
    bestTimeToVisit: 'November to April (Early mornings recommended)',
    entryFee: 'USD 30 foreign adults / USD 15 children',
    openingHours: '6:30 AM – 5:30 PM daily (Ticket counter closes at 5:00 PM)',
    practicalInfo:
      'Wear sturdy footwear, sun hat, and bring at least 1.5 liters of drinking water. Beware of giant Asian hornets in the nesting areas; silence is strictly observed near signs.',
    avgRating: 4.9,
    reviewCount: 128,
    isFeatured: true,
    tags: ['UNESCO', 'Ancient Architecture', 'Hiking', 'Photography', 'Royalty'],
  },
  {
    id: '44444444-4444-4444-4444-444444444002',
    name: 'Galle Dutch Fort',
    slug: 'galle-dutch-fort',
    category: 'Colonial Heritage',
    categorySlug: 'heritage',
    region: 'Southern Province',
    regionSlug: 'southern-province',
    shortDescription: 'Oceanfront UNESCO colonial fortress brimming with boutique cafes, spice merchants, and ramparts.',
    description:
      'Founded by Portuguese sailors in 1588 and fortified extensively by the Dutch in the 17th century, Galle Fort is the best preserved fortified European city in South and Southeast Asia. The living fortress spans 130 acres on a seaside rocky peninsula, lined with neoclassical villas, artisan jeweler workshops, maritime museums, and coastal ramparts where locals gather at sunset.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    ],
    latitude: 6.0305,
    longitude: 80.2173,
    address: 'Church Street, Galle 80000, Southern Province',
    bestTimeToVisit: 'December to April',
    entryFee: 'Free entry to fort ramparts (individual museums have small entry fees)',
    openingHours: 'Open 24 hours (Boutique shops open 9:30 AM – 8:00 PM)',
    practicalInfo:
      'The rampart wall walk from the Flag Rock bastion to the lighthouse is best experienced between 5:00 PM and 6:30 PM for spectacular sunset views over the Indian Ocean.',
    avgRating: 4.8,
    reviewCount: 94,
    isFeatured: true,
    tags: ['UNESCO', 'Colonial', 'Ocean Views', 'Cafes', 'Shopping'],
  },
  {
    id: '44444444-4444-4444-4444-444444444003',
    name: 'Nine Arches Bridge, Ella',
    slug: 'nine-arches-bridge-ella',
    category: 'Highlands & Scenic Trains',
    categorySlug: 'mountain',
    region: 'Uva Province',
    regionSlug: 'uva-province',
    shortDescription: 'Magnificent colonial stone viaduct surrounded by emerald tea plantations and mountain mist.',
    description:
      'Built in 1921 under the British colonial administration, the Demodara Nine Arches Bridge (also called the Bridge in the Sky) is a marvel of early 20th-century railway engineering. Constructed entirely of solid brick, stone, and cement without a single piece of structural steel, it curves gracefully across a deep jungle ravine enveloped by lush Ceylon tea gardens.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    ],
    latitude: 6.8768,
    longitude: 81.0608,
    address: 'Demodara, Ella, Badulla District, Uva Province',
    bestTimeToVisit: 'Year-round (Best photography light between 9:00 AM – 11:30 AM)',
    entryFee: 'Free admission',
    openingHours: 'Open 24 hours (Train crossings approximately 4 to 6 times daily)',
    practicalInfo:
      'Reached via a scenic 20-minute trail walk through tea bushes from Ella town. Please heed railway whistles and stay off the tracks when trains are approaching.',
    avgRating: 4.9,
    reviewCount: 110,
    isFeatured: true,
    tags: ['Scenic Train', 'Tea Country', 'Photography', 'Nature', 'Iconic'],
  },
  {
    id: '44444444-4444-4444-4444-444444444004',
    name: 'Yala National Park Safari',
    slug: 'yala-national-park',
    category: 'Wildlife Sanctuary',
    categorySlug: 'wildlife',
    region: 'Southern Province',
    regionSlug: 'southern-province',
    shortDescription: 'Premier wildlife haven featuring one of the world highest leopard densities and wild elephants.',
    description:
      'Bordering the untamed Indian Ocean in southeastern Sri Lanka, Yala National Park is world-renowned for harboring an exceptional density of leopards (Panthera pardus kotiya). Across its 979 square kilometers of monsoon forests, coastal dunes, and fresh lagoons, you will also encounter majestic herds of Sri Lankan elephants, sloth bears, spotted deer, and mugger crocodiles.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    ],
    latitude: 6.3725,
    longitude: 81.5170,
    address: 'Palatupana Entrance, Yala, Southern Province',
    bestTimeToVisit: 'February to July (Dry season brings animals to waterholes)',
    entryFee: 'Approx USD 35 per foreign visitor + 4x4 safari jeep hire',
    openingHours: '6:00 AM – 6:00 PM daily (Morning session: 6:00 AM | Afternoon: 2:30 PM)',
    practicalInfo:
      'Book a reputable tracker and private 4x4 open-top safari jeep. Bring binoculars and long telephoto lenses. Strictly maintain silence when observing predators.',
    avgRating: 4.7,
    reviewCount: 85,
    isFeatured: true,
    tags: ['Leopards', 'Elephants', 'Safari', 'Wildlife', 'Birding'],
  },
  {
    id: '44444444-4444-4444-4444-444444444005',
    name: 'Temple of the Sacred Tooth Relic',
    slug: 'temple-of-the-sacred-tooth-relic',
    category: 'Sacred Temples',
    categorySlug: 'temple',
    region: 'Central Province',
    regionSlug: 'central-province',
    shortDescription: 'Venerated royal Buddhist temple housing the sacred tooth relic of Gautama Buddha.',
    description:
      'Located in the royal palace complex of the former Kingdom of Kandy, Sri Dalada Maligawa is Buddhism’s most sacred shrine in Sri Lanka. Surrounded by Kandy Lake and mist-draped hills, the temple features golden canopies, ancient drumming rituals (Thevava), and elaborately decorated chambers holding the golden casket of the tooth relic.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    ],
    latitude: 7.2936,
    longitude: 80.6413,
    address: 'Sri Dalada Veediya, Kandy 20000, Central Province',
    bestTimeToVisit: 'Year-round (Especially during Esala Perahera festival in July/August)',
    entryFee: 'LKR 2,000 / USD 7 for foreign adults',
    openingHours: '5:30 AM – 8:00 PM daily (Puja rituals: 5:30 AM, 9:30 AM, 6:30 PM)',
    practicalInfo:
      'Modest dress code required: shoulders and knees must be fully covered. White clothing is traditional. Shoes must be deposited at the temple entrance counter.',
    avgRating: 4.9,
    reviewCount: 142,
    isFeatured: false,
    tags: ['UNESCO', 'Sacred', 'Culture', 'Buddhist Shrine', 'Kandy'],
  },
  {
    id: '44444444-4444-4444-4444-444444444006',
    name: 'Mirissa Golden Beach & Coconut Tree Hill',
    slug: 'mirissa-beach-coconut-hill',
    category: 'Beaches & Coastal',
    categorySlug: 'beach',
    region: 'Southern Province',
    regionSlug: 'southern-province',
    shortDescription: 'Crescent-shaped tropical bay famous for surfing, seafood cafes, and palm-topped headlands.',
    description:
      'Mirissa is one of southern Sri Lanka’s most enchanting beach destinations. Fringed by swaying coconut palms, soft golden sands, and turquoise swells, it offers gentle bay swimming on one end and surf breaks on the other. At the eastern edge stands Coconut Tree Hill, a reddish cliff overlooking the Indian Ocean.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    ],
    latitude: 5.9450,
    longitude: 80.4578,
    address: 'Mirissa Coastal Highway, Southern Province',
    bestTimeToVisit: 'November to April',
    entryFee: 'Free beach access',
    openingHours: 'Open 24 hours',
    practicalInfo:
      'Visit Coconut Tree Hill early morning at sunrise to avoid the midday crowd and get clear lighting for photographs.',
    avgRating: 4.8,
    reviewCount: 79,
    isFeatured: false,
    tags: ['Beach', 'Sunset', 'Surfing', 'Seafood', 'Scenic'],
  },
];

export const SAMPLE_ACCOMMODATIONS: AccommodationItem[] = [
  {
    id: '55555555-5555-5555-5555-555555555001',
    name: 'The Fortress Resort & Spa',
    slug: 'the-fortress-resort-and-spa',
    type: 'hotel',
    region: 'Southern Province',
    regionSlug: 'southern-province',
    address: 'Koggala, Habaraduwa, Galle District',
    latitude: 6.0028,
    longitude: 80.3236,
    shortDescription: '5-star oceanfront luxury retreat near Galle with private plunge pool suites and Ayurvedic spa.',
    description:
      'Inspired by Galle’s historic Portuguese and Dutch fortresses, The Fortress Resort & Spa is a 5-star beachfront sanctuary overlooking the golden sands of Koggala. Featuring soaring arched corridors, open-air pavilions, a glass-tiled infinity pool facing ocean waves, and five distinct dining options serving fresh catch and Ceylon spices.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    ],
    priceMin: 220,
    priceMax: 650,
    starRating: 5,
    avgRating: 4.9,
    reviewCount: 46,
    isFeatured: true,
    amenities: ['High-Speed WiFi', 'Swimming Pool', 'Air Conditioning', 'Ocean View', 'Gourmet Restaurant', 'Ayurvedic Spa', 'Airport Shuttle'],
    roomTypes: [
      {
        id: '66666666-6666-6666-6666-666666666001',
        name: 'Ocean View Suite',
        description: 'Spacious master bedroom with private balcony overlooking the crashing Indian Ocean.',
        pricePerNight: 250,
        maxGuests: 2,
        totalRooms: 10,
      },
      {
        id: '66666666-6666-6666-6666-666666666002',
        name: 'Fortress Plunge Pool Villa',
        description: 'Private ground floor pavilion with outdoor plunge pool, jacuzzi, and dedicated butler.',
        pricePerNight: 520,
        maxGuests: 3,
        totalRooms: 4,
      },
    ],
  },
  {
    id: '55555555-5555-5555-5555-555555555002',
    name: '98 Acres Resort & Spa',
    slug: '98-acres-resort-and-spa',
    type: 'resort',
    region: 'Uva Province',
    regionSlug: 'uva-province',
    address: 'Greenland Estate, Ella, Badulla District',
    latitude: 6.8665,
    longitude: 81.0601,
    shortDescription: 'Eco-luxury chalets nestled on a 98-acre tea estate overlooking Ella Gap and Little Adam Peak.',
    description:
      'Crafted using recycled railway sleepers, local rough granite, and thatched roofs, 98 Acres Resort & Spa stands on a pristine tea plantation in Ella. Each luxury chalet commands dramatic, uninterrupted vistas of the famous Ella Gap and Little Adam’s Peak.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    ],
    priceMin: 180,
    priceMax: 490,
    starRating: 5,
    avgRating: 4.9,
    reviewCount: 62,
    isFeatured: true,
    amenities: ['High-Speed WiFi', 'Swimming Pool', 'Mountain View', 'Gourmet Restaurant', 'Ayurvedic Spa', 'Breakfast Included'],
    roomTypes: [
      {
        id: '66666666-6666-6666-6666-666666666003',
        name: 'Deluxe Tea Chalet',
        description: 'Timber chalet with private veranda overlooking misty morning clouds rolling through Ella Gap.',
        pricePerNight: 210,
        maxGuests: 2,
        totalRooms: 12,
      },
    ],
  },
  {
    id: '55555555-5555-5555-5555-555555555003',
    name: 'Villa Galle Horizon',
    slug: 'villa-galle-horizon',
    type: 'villa',
    region: 'Southern Province',
    regionSlug: 'southern-province',
    address: 'Thalpe Coastal Strip, Galle',
    latitude: 6.0125,
    longitude: 80.2780,
    shortDescription: 'Secluded 4-bedroom beachfront private villa with infinity pool and private chef.',
    description:
      'An architectural masterwork on Thalpe beach. Featuring floor-to-ceiling glass pavilions, lush tropical gardens, a 20-meter infinity pool stepping directly onto the sands, and a private chef catering authentic Sri Lankan curries and grilled jumbo prawns.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    ],
    priceMin: 380,
    priceMax: 900,
    starRating: 5,
    avgRating: 5.0,
    reviewCount: 28,
    isFeatured: false,
    amenities: ['High-Speed WiFi', 'Swimming Pool', 'Air Conditioning', 'Ocean View', 'Free Secure Parking'],
    roomTypes: [
      {
        id: '66666666-6666-6666-6666-666666666004',
        name: 'Entire 4-Bedroom Beachfront Villa',
        description: 'Exclusive private use of the entire villa, garden, and pool for up to 8 guests.',
        pricePerNight: 550,
        maxGuests: 8,
        totalRooms: 1,
      },
    ],
  },
];

export const SAMPLE_EXPERIENCES: ExperienceItem[] = [
  {
    id: '77777777-7777-7777-7777-777777777001',
    name: 'Mirissa Sunrise Whale & Dolphin Expedition',
    slug: 'mirissa-sunrise-whale-dolphin-expedition',
    category: 'Marine Safari',
    categorySlug: 'whale-watching',
    region: 'Southern Province',
    regionSlug: 'southern-province',
    address: 'Mirissa Fishery Harbour, Southern Province',
    latitude: 5.9450,
    longitude: 80.4578,
    durationHours: 4.5,
    difficulty: 'easy',
    pricePerPerson: 65,
    minParticipants: 1,
    maxParticipants: 25,
    shortDescription: 'Witness majestic Blue Whales and playful spinner dolphins with a certified marine naturalist.',
    description:
      'Sri Lanka’s southern continental shelf drops thousands of meters into oceanic depths within just a few nautical miles of Mirissa, creating an unparalleled feeding habitat for Blue Whales — the largest animals on Earth. Sail with a licensed marine biologist team committed to international ethical whale watching guidelines.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ],
    includedItems: [
      'Certified marine naturalist guide',
      'Life jackets and certified safety equipment',
      'Breakfast box and fresh tropical fruits onboard',
      'Bottled drinking water and tea/coffee',
    ],
    whatToBring: [
      'Sunscreen and sunglasses',
      'Binoculars or camera with telephoto lens',
      'Motion sickness tablets if prone to seasickness',
    ],
    schedule: 'Daily departures at 6:30 AM from Mirissa Fishery Harbour',
    avgRating: 4.8,
    reviewCount: 58,
    isFeatured: true,
  },
  {
    id: '77777777-7777-7777-7777-777777777002',
    name: 'Ceylon Tea Masters Plucking & Tasting Journey',
    slug: 'ceylon-tea-masters-plucking-and-tasting-journey',
    category: 'Highland Heritage',
    categorySlug: 'tea-plantation',
    region: 'Central Province',
    regionSlug: 'central-province',
    address: 'Nuwara Eliya Tea Valley, Central Province',
    latitude: 6.9497,
    longitude: 80.7891,
    durationHours: 3.0,
    difficulty: 'easy',
    pricePerPerson: 40,
    minParticipants: 2,
    maxParticipants: 12,
    shortDescription: 'Hands-on tea plucking and professional cupping experience in the misty Nuwara Eliya highlands.',
    description:
      'Walk alongside experienced tea estate pickers through emerald hill slopes 1,800 meters above sea level. Learn the legendary technique of two leaves and a bud hand harvesting, tour an operating 19th-century colonial factory, and participate in a guided tea master tasting session.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    ],
    includedItems: [
      'Traditional tea plucking basket loan',
      'Operating factory tour with senior tea master',
      'Professional tea cupping session (5 single-origin teas)',
      '100g souvenir tin of Silver Tips Ceylon tea',
    ],
    whatToBring: [
      'Comfortable walking shoes',
      'Warm sweater or light rain jacket (highlands can be cool)',
    ],
    schedule: 'Morning session: 9:30 AM | Afternoon session: 2:00 PM',
    avgRating: 4.9,
    reviewCount: 42,
    isFeatured: true,
  },
];
