import React from 'react';
import Link from 'next/link';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { ListingCard } from '../components/shared/listing-card';
import { ReviewCard } from '../components/shared/review-card';
import { Button, Badge } from '../components/ui';
import {
  Compass,
  Calendar,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Trees,
  Waves,
  Mountain,
} from 'lucide-react';

export default function HomePage() {
  const featuredDestinations = [
    {
      id: 'dest-001',
      type: 'destination' as const,
      title: 'Sigiriya Ancient Rock Fortress',
      slug: 'sigiriya-ancient-rock-fortress',
      imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      category: 'UNESCO Heritage',
      region: 'Central Province',
      rating: 4.9,
      reviewCount: 128,
      badge: 'Must Visit',
      isFeatured: true,
    },
    {
      id: 'dest-002',
      type: 'destination' as const,
      title: 'Galle Dutch Fort & Ocean Ramparts',
      slug: 'galle-dutch-fort',
      imageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
      category: 'Colonial History',
      region: 'Southern Province',
      rating: 4.8,
      reviewCount: 94,
      badge: 'Living Heritage',
      isFeatured: true,
    },
    {
      id: 'dest-003',
      type: 'destination' as const,
      title: 'Nine Arches Bridge & Tea Valleys',
      slug: 'nine-arches-bridge-ella',
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      category: 'Scenic Railways',
      region: 'Ella, Uva Province',
      rating: 4.9,
      reviewCount: 110,
      badge: 'Iconic',
      isFeatured: true,
    },
    {
      id: 'dest-004',
      type: 'destination' as const,
      title: 'Yala National Park Safari Reserve',
      slug: 'yala-national-park',
      imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
      category: 'Wildlife Sanctuary',
      region: 'Southern Province',
      rating: 4.7,
      reviewCount: 85,
      badge: 'Highest Leopard Density',
      isFeatured: true,
    },
  ];

  const featuredStays = [
    {
      id: 'stay-001',
      type: 'accommodation' as const,
      title: 'The Fortress Resort & Spa',
      slug: 'the-fortress-resort-and-spa',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      category: 'Beachfront Luxury',
      region: 'Koggala, Galle',
      rating: 4.9,
      reviewCount: 46,
      price: 250,
      pricePer: 'night',
      badge: '5-Star Resort',
      isFeatured: true,
    },
    {
      id: 'stay-002',
      type: 'accommodation' as const,
      title: '98 Acres Eco-Luxury Chalets',
      slug: '98-acres-resort-and-spa',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      category: 'Tea Estate Lodge',
      region: 'Ella Gap, Uva',
      rating: 4.9,
      reviewCount: 62,
      price: 210,
      pricePer: 'night',
      badge: 'Mountain Panorama',
      isFeatured: true,
    },
  ];

  const featuredExperiences = [
    {
      id: 'exp-001',
      type: 'experience' as const,
      title: 'Mirissa Sunrise Blue Whale Safari',
      slug: 'mirissa-sunrise-whale-dolphin-expedition',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      category: 'Marine Safari',
      region: 'Mirissa Coastal Bay',
      rating: 4.8,
      reviewCount: 58,
      price: 65,
      pricePer: 'person',
      badge: 'Naturalist Guided',
      isFeatured: true,
    },
    {
      id: 'exp-002',
      type: 'experience' as const,
      title: 'Ceylon Tea Plucking & Master Tasting',
      slug: 'ceylon-tea-masters-plucking-and-tasting-journey',
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      category: 'Highland Heritage',
      region: 'Nuwara Eliya',
      rating: 4.9,
      reviewCount: 42,
      price: 40,
      pricePer: 'person',
      badge: 'Hands-on',
      isFeatured: true,
    },
  ];

  const testimonials = [
    {
      id: 'rev-001',
      authorName: 'Sarah Jenkins',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: 'Visited September 2026',
      title: 'An unforgettable two-week journey across Sri Lanka',
      content:
        'Serisara made planning our family trip completely effortless. The day-by-day itinerary builder allowed us to connect our stay in Ella with a sunrise safari in Yala flawlessly.',
      isVerified: true,
    },
    {
      id: 'rev-002',
      authorName: 'Marcus Lindqvist',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: 'Visited August 2026',
      title: 'The blue whale expedition in Mirissa was breathtaking',
      content:
        'We were lucky enough to see two blue whales within an hour of leaving the harbour. The local guide recommended by Serisara was respectful and deeply knowledgeable.',
      isVerified: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-950 text-white min-h-[640px] lg:min-h-[720px] flex items-center">
        {/* Background Image with Dark Gradient Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-900/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ayubowan! Discover Sri Lanka — Wonder of Asia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Where Ancient Kingdoms Meet Tropical Horizons.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal max-w-2xl">
              Experience the magic of Ceylon. From the mist-shrouded tea hills of Ella to UNESCO rock citadels and secluded beach villas along the Indian Ocean.
            </p>

            {/* Quick Action Search Widget */}
            <div className="p-3 rounded-3xl bg-white/95 backdrop-blur-md border border-white/80 shadow-2xl shadow-black/40 text-stone-900">
              <form action="/search" method="GET" className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-4 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-stone-200">
                  <label htmlFor="search-input" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    What are you looking for?
                  </label>
                  <input
                    id="search-input"
                    type="text"
                    name="q"
                    placeholder="e.g. Sigiriya, Tea Villa, Whale Safari..."
                    className="w-full text-xs font-semibold text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
                  />
                </div>

                <div className="sm:col-span-4 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-stone-200">
                  <label htmlFor="region-select" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Province / Region
                  </label>
                  <select
                    id="region-select"
                    name="region"
                    className="w-full text-xs font-semibold text-stone-900 focus:outline-none bg-transparent"
                  >
                    <option value="">All Provinces & Coasts</option>
                    <option value="central-province">Central (Kandy, Nuwara Eliya)</option>
                    <option value="southern-province">Southern (Galle, Mirissa, Yala)</option>
                    <option value="uva-province">Uva (Ella, Badulla)</option>
                    <option value="western-province">Western (Colombo, Negombo)</option>
                    <option value="eastern-province">Eastern (Arugam Bay, Trinco)</option>
                  </select>
                </div>

                <div className="sm:col-span-4 px-2">
                  <Button type="submit" size="md" className="w-full py-3">
                    <Search className="w-4 h-4 mr-1.5" />
                    <span>Explore Island</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>150+ Handpicked Sights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Local Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Secure Stripe Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Ribbon */}
      <section className="bg-white border-b border-stone-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
            {[
              { label: 'UNESCO Heritage', icon: Mountain, href: '/destinations?category=cultural' },
              { label: 'Golden Beaches', icon: Waves, href: '/destinations?category=beach' },
              { label: 'Wildlife Safaris', icon: Trees, href: '/destinations?category=wildlife' },
              { label: 'Tea Highlands', icon: Mountain, href: '/destinations?region=central-province' },
              { label: 'Ocean Stays', icon: Waves, href: '/accommodations?type=villa' },
              { label: 'Eco Chalets', icon: Trees, href: '/accommodations?type=resort' },
              { label: 'Whale Watching', icon: Waves, href: '/experiences?category=whale-watching' },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-50 hover:bg-emerald-50 border border-stone-200/80 hover:border-emerald-200 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition-all shrink-0 hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{cat.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-1.5">
            <Badge variant="primary">ICONIC CEYLON</Badge>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight">
              Featured Island Destinations
            </h2>
            <p className="text-sm text-stone-500">
              Centuries-old rock fortresses, colonial fortified towns, and misty mountain passes.
            </p>
          </div>
          <Link href="/destinations" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800">
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((item) => (
            <ListingCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* Handpicked Accommodations & Experiences */}
      <section className="py-20 bg-stone-100 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Accommodations */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div className="space-y-1.5">
                <Badge variant="accent">BOUTIQUE & LUXURY</Badge>
                <h2 className="text-3xl font-black text-stone-900 tracking-tight">
                  Handpicked Stays & Ocean Lodges
                </h2>
                <p className="text-sm text-stone-500">
                  From secluded cliffside villas in Galle to eco chalets amidst Ella tea slopes.
                </p>
              </div>
              <Link href="/accommodations" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                <span>Browse All Stays</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredStays.map((item) => (
                <ListingCard key={item.id} {...item} />
              ))}
            </div>
          </div>

          {/* Curated Experiences */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div className="space-y-1.5">
                <Badge variant="secondary">UNFORGETTABLE MOMENTS</Badge>
                <h2 className="text-3xl font-black text-stone-900 tracking-tight">
                  Curated Island Activities & Tours
                </h2>
                <p className="text-sm text-stone-500">
                  Ethical whale watching expeditions and authentic artisan tea plucking masterclasses.
                </p>
              </div>
              <Link href="/experiences" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                <span>View All Experiences</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredExperiences.map((item) => (
                <ListingCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trip Planner CTA Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5" />
              <span>Smart Itinerary Builder</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Design your dream Sri Lanka itinerary in minutes.
            </h2>

            <p className="text-emerald-100 text-base leading-relaxed">
              Drag and drop your favorite temples, coastal hideaways, and wildlife safaris into a personalized day-by-day travel plan. Keep your routes, bookings, and timings all in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/trips">
                <Button size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold shadow-lg">
                  Start Planning Now
                </Button>
              </Link>
              <Link href="/map">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Explore On Interactive Map
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Background graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none flex items-center justify-end pr-12">
            <Compass className="w-96 h-96 text-white" />
          </div>
        </div>
      </section>

      {/* Traveler Testimonials */}
      <section className="py-20 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="primary">COMMUNITY REVIEWS</Badge>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight">
              Loved by Travelers Worldwide
            </h2>
            <p className="text-sm text-stone-500">
              Verified reviews from global tourists who explored Sri Lanka with Serisara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <ReviewCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
