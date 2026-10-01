// ============================================================
// Accommodation Amenities
// ============================================================

export const AMENITIES = [
  // General
  { name: 'WiFi', icon: 'wifi', category: 'General' },
  { name: 'Parking', icon: 'car', category: 'General' },
  { name: 'Airport Shuttle', icon: 'plane', category: 'General' },
  { name: 'Reception 24/7', icon: 'clock', category: 'General' },
  { name: 'Luggage Storage', icon: 'briefcase', category: 'General' },
  { name: 'Concierge', icon: 'bell', category: 'General' },
  // Room
  { name: 'Air Conditioning', icon: 'snowflake', category: 'Room' },
  { name: 'TV', icon: 'tv', category: 'Room' },
  { name: 'Mini Bar', icon: 'wine', category: 'Room' },
  { name: 'Safe', icon: 'lock', category: 'Room' },
  { name: 'Balcony', icon: 'door-open', category: 'Room' },
  { name: 'Ocean View', icon: 'sunset', category: 'Room' },
  { name: 'Kitchen', icon: 'cooking-pot', category: 'Room' },
  { name: 'Hot Water', icon: 'thermometer', category: 'Room' },
  // Recreation
  { name: 'Swimming Pool', icon: 'waves', category: 'Recreation' },
  { name: 'Gym', icon: 'dumbbell', category: 'Recreation' },
  { name: 'Spa', icon: 'heart', category: 'Recreation' },
  { name: 'Beach Access', icon: 'umbrella', category: 'Recreation' },
  { name: 'Garden', icon: 'flower', category: 'Recreation' },
  { name: 'BBQ Area', icon: 'flame', category: 'Recreation' },
  // Dining
  { name: 'Restaurant', icon: 'utensils', category: 'Dining' },
  { name: 'Bar', icon: 'beer', category: 'Dining' },
  { name: 'Room Service', icon: 'concierge-bell', category: 'Dining' },
  { name: 'Breakfast Included', icon: 'coffee', category: 'Dining' },
  // Family
  { name: 'Family Rooms', icon: 'users', category: 'Family' },
  { name: 'Pet Friendly', icon: 'paw-print', category: 'Family' },
  { name: 'Babysitting', icon: 'baby', category: 'Family' },
] as const;
