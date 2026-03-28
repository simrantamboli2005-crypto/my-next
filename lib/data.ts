// Fixed version of data.ts - all image paths point to existing files
// Copy this content to lib/data.ts after backup if needed

// ============================================================
// SmartTravels - Central Data Store (Expanded: 16 Destinations + 14 Packages)
// National + International tours added - IMAGES FIXED
// ============================================================

export interface Destination {
  id: string
  name: string
  country: string
  state: string
  category: "beach" | "hill_station" | "heritage" | "wildlife" | "city"
  description: string
  bestTimeToVisit: string
  attractions: string[]
  image: string
  mapUrl: string
  rating: number
  reviewCount: number
}

export interface TourPackage {
  duration: any
  id: string
  name: string
  destinationId: string
  price: number  // Updated to per day for consistency with newer pages
  originalPrice: number
  minDays: number
  maxDays: number
  inclusions: string[]
  exclusions: string[]
  itinerary: { day: number; title: string; description: string }[]
  termsAndConditions: string[]
  image: string
  featured: boolean
  active: boolean
  rating: number
}

export interface Hotel {
  id: string
  name: string
  destinationId: string
  pricePerNight: number
  rating: number
  amenities: string[]
  image: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: "tips" | "safety" | "packing" | "culture"
  author: string
  date: string
  image: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  targetId: string
  targetType: "destination" | "package"
  rating: number
  comment: string
  date: string
}

export interface Booking {
  id: string
  userId: string
  packageId: string
  travelers: number
  date: string
  status: "pending" | "confirmed" | "cancelled"
  totalPrice: number
  createdAt: string
  invoiceNumber: string
  invoiceDate: string
  numberOfDays: number
  paymentMethod?: string
  paymentStatus?: "pending" | "success" | "failed"
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  password: string
  favorites: string[]
  travelPersonality: string | null
  blocked: boolean
}

export interface Expense {
  id: string
  userId: string
  tripName: string
  budget: number
  expenses: { id: string; description: string; amount: number; date: string; category: string }[]
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: number
  validUntil: string
  code: string
  packageId: string
}

// ---- DESTINATIONS (Expanded to 16: 8 India + 8 Intl) ----
export const destinations: Destination[] = [
  // Existing 8 (India)
  {
    id: "dest-1", 
    name: "Goa", 
    country: "India", 
    state: "Goa", 
    category: "beach" as const,
    description: "Famous for its stunning beaches, vibrant nightlife, and Portuguese heritage architecture. Perfect blend of relaxation and adventure.",
    bestTimeToVisit: "November to February", 
    attractions: ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Flea Market"],
    image: "/images/dest-goa.jpg", 
    mapUrl: "https://maps.google.com/?q=Goa,India", 
    rating: 4.5, 
    reviewCount: 1247,
  },
  {
    id: "dest-2", 
    name: "Manali", 
    country: "India", 
    state: "Himachal Pradesh", 
    category: "hill_station" as const,
    description: "Nestled in Himalayas, paradise for adventure lovers with skiing, paragliding, trekking, snow-capped peaks, and Beas River.",
    bestTimeToVisit: "March to June, October to February", 
    attractions: ["Rohtang Pass", "Solang Valley", "Hadimba Temple", "Old Manali", "Jogini Waterfalls"],
    image: "/images/dest-manali.jpg", 
    mapUrl: "https://maps.google.com/?q=Manali,India", 
    rating: 4.7, 
    reviewCount: 982,
  },
  {
    id: "dest-3", 
    name: "Mumbai", 
    country: "India", 
    state: "Maharashtra", 
    category: "city" as const,
    description: "City of dreams, financial capital with Marine Drive, Bollywood, street food, colonial and modern architecture.",
    bestTimeToVisit: "October to February", 
    attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Juhu Beach", "Chhatrapati Shivaji Terminus"],
    image: "/images/dest-mumbai.jpg", 
    mapUrl: "https://maps.google.com/?q=Mumbai,India", 
    rating: 4.3, 
    reviewCount: 2103,
  },
  {
    id: "dest-4", 
    name: "Jaipur", 
    country: "India", 
    state: "Rajasthan", 
    category: "heritage" as const,
    description: "Pink City, royal Rajasthani heritage with forts, palaces, bazaars, cultural traditions.",
    bestTimeToVisit: "October to March", 
    attractions: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh Fort"],
    image: "/images/dest-jaipur.jpg", 
    mapUrl: "https://maps.google.com/?q=Jaipur,India", 
    rating: 4.6, 
    reviewCount: 1567,
  },
  {
    id: "dest-5", 
    name: "Jim Corbett", 
    country: "India", 
    state: "Uttarakhand", 
    category: "wildlife" as const,
    description: "Oldest national park, Bengal tigers, elephants, 600+ birds in forests and river valleys.",
    bestTimeToVisit: "November to June", 
    attractions: ["Dhikala Zone", "Bijrani Zone", "Corbett Waterfall", "Garjia Temple", "Sitabani Wildlife Reserve"],
    image: "/images/dest-corbett.jpg", 
    mapUrl: "https://maps.google.com/?q=Jim+Corbett,India", 
    rating: 4.4, 
    reviewCount: 734,
  },
  {
    id: "dest-6", 
    name: "Kerala Backwaters", 
    country: "India", 
    state: "Kerala", 
    category: "beach" as const,
    description: "Lagoons, lakes, canals; houseboats, coconut groves, Kathakali, Ayurveda.",
    bestTimeToVisit: "September to March", 
    attractions: ["Alleppey Backwaters", "Munnar Tea Gardens", "Fort Kochi", "Periyar Sanctuary", "Varkala Beach"],
    image: "/images/dest-kerala.jpg", 
    mapUrl: "https://maps.google.com/?q=Kerala,India", 
    rating: 4.8, 
    reviewCount: 1890,
  },
  {
    id: "dest-7", 
    name: "Shimla", 
    country: "India", 
    state: "Himachal Pradesh", 
    category: "hill_station" as const,
    description: "Queen of Hills, colonial architecture, toy train, apple orchards, mountain views.",
    bestTimeToVisit: "March to June, December to February", 
    attractions: ["The Ridge", "Mall Road", "Jakhoo Temple", "Kufri", "Christ Church"],
    image: "/images/dest-shimla.jpg", 
    mapUrl: "https://maps.google.com/?q=Shimla,India", 
    rating: 4.3, 
    reviewCount: 1120,
  },
  {
    id: "dest-8", 
    name: "Udaipur", 
    country: "India", 
    state: "Rajasthan", 
    category: "heritage" as const,
    description: "City of Lakes, romantic palaces, markets, Aravalli hills.",
    bestTimeToVisit: "September to March", 
    attractions: ["Lake Pichola", "City Palace", "Jag Mandir", "Saheliyon Ki Bari", "Fateh Sagar Lake"],
    image: "/images/dest-udaipur.jpg", 
    mapUrl: "https://maps.google.com/?q=Udaipur,India", 
    rating: 4.7, 
    reviewCount: 1456,
  },
  // New 4 India
  {
    id: "dest-9", 
    name: "Ladakh", 
    country: "India", 
    state: "Ladakh", 
    category: "hill_station" as const,
    description: "High-altitude desert with turquoise lakes, monasteries, adventure biking, breathtaking landscapes.",
    bestTimeToVisit: "May to September", 
    attractions: ["Pangong Lake", "Nubra Valley", "Leh Palace", "Magnetic Hill", "Thiksey Monastery"],
    image: "/images/dest-mountain.jpg", 
    mapUrl: "https://maps.google.com/?q=Ladakh,India", 
    rating: 4.8, 
    reviewCount: 1562,
  },
  {
    id: "dest-10", 
    name: "Andaman Islands", 
    country: "India", 
    state: "Andaman", 
    category: "beach" as const,
    description: "Pristine beaches, coral reefs, scuba diving, untouched islands, Cellular Jail history.",
    bestTimeToVisit: "October to May", 
    attractions: ["Radhanagar Beach", "Havelock Island", "Neil Island", "Cellular Jail", "Ross Island"],
    image: "/images/dest-andaman.jpg", 
    mapUrl: "https://maps.google.com/?q=Andaman,India",
    rating: 4.9, 
    reviewCount: 2034,
  },
  {
    id: "dest-11", 
    name: "Varanasi", 
    country: "India", 
    state: "Uttar Pradesh", 
    category: "heritage" as const,
    description: "Ancient holy city, Ganga ghats, spiritual rituals, eternal city vibes.",
    bestTimeToVisit: "October to March", 
    attractions: ["Ganga Aarti", "Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath", "Manikarnika Ghat"],
    image: "/images/dest-heritage.jpg", 
    mapUrl: "https://maps.google.com/?q=Varanasi,India", 
    rating: 4.6, 
    reviewCount: 1789,
  },
  {
    id: "dest-12", 
    name: "Ranthambore", 
    country: "India", 
    state: "Rajasthan", 
    category: "wildlife" as const,
    description: "Premier tiger reserve, jeep safaris, ancient fort amidst wilderness.",
    bestTimeToVisit: "October to June", 
    attractions: ["Tiger Safari", "Ranthambore Fort", "Padam Lake", "Jogi Mahal", "Zone Safaris"],
    image: "/images/dest-wildlife.jpg", 
    mapUrl: "https://maps.google.com/?q=Ranthambore,India", 
    rating: 4.5, 
    reviewCount: 912,
  },
  // New 4 International
  {
    id: "dest-13", 
    name: "Bali", 
    country: "Indonesia", 
    state: "Bali", 
    category: "beach" as const,
    description: "Island paradise with rice terraces, beaches, volcanoes, Hindu culture, surfing.",
    bestTimeToVisit: "April to October", 
    attractions: ["Ubud Rice Terraces", "Seminyak Beach", "Mount Batur", "Uluwatu Temple", "Tanah Lot"],
    image: "/images/dest-bali.jpg", 
    mapUrl: "https://maps.google.com/?q=Bali,Indonesia",
    rating: 4.7, 
    reviewCount: 3456,
  },
  {
    id: "dest-14", 
    name: "Dubai", 
    country: "UAE", 
    state: "Dubai", 
    category: "city" as const,
    description: "Futuristic city with skyscrapers, luxury shopping, deserts, theme parks.",
    bestTimeToVisit: "November to March", 
    attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Desert Safari", "Burj Al Arab"],
    image: "/images/dest-dubai.jpg", 
    mapUrl: "https://maps.google.com/?q=Dubai,UAE", 
    rating: 4.6, 
    reviewCount: 2890,
  },
  {
    id: "dest-15", 
    name: "Singapore", 
    country: "Singapore", 
    state: "Singapore", 
    category: "city" as const,
    description: "Garden city-state, modern architecture, food paradise, clean efficient.",
    bestTimeToVisit: "February to April", 
    attractions: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island", "Chinatown", "Little India"],
    image: "/images/dest-singapore.jpg", 
    mapUrl: "https://maps.google.com/?q=Singapore", 
    rating: 4.5, 
    reviewCount: 4123,
  },
  {
    id: "dest-16", 
    name: "Phuket", 
    country: "Thailand", 
    state: "Phuket", 
    category: "beach" as const,
    description: "Thailand's pearl, beaches, nightlife, islands hopping, Thai culture.",
    bestTimeToVisit: "November to April", 
    attractions: ["Patong Beach", "Phi Phi Islands", "Big Buddha", "Old Phuket Town", "James Bond Island"],
    image: "/images/dest-phuket.jpg", 
    mapUrl: "https://maps.google.com/?q=Phuket,Thailand", 
    rating: 4.4, 
    reviewCount: 2678,
  },
]

// ---- TOUR PACKAGES (Expanded to 14: Existing 6 + 8 New) ----
export const tourPackages: TourPackage[] = [
  // Existing 6 (updated to new interface: price/day ≈ original/total_days, min/max realistic)
  {
    id: "pkg-1", 
    name: "Goa Beach Paradise", 
    destinationId: "dest-1", 
    price: 4000, 
    originalPrice: 5750, 
    minDays: 3, 
    maxDays: 7,
    inclusions: ["3-Star Hotel", "Breakfast & Dinner", "Airport Transfer", "North/South Goa Tours", "Water Sports"],
    exclusions: ["Lunch", "Personal Expenses", "Insurance", "Flights"], 
    featured: true, 
    active: true, 
    rating: 4.5,
    termsAndConditions: ["50% advance", "7-day cancellation", "ID proof required"],
    image: "/images/pkg-goa.jpg",
    itinerary: [
      { day: 1, title: "Arrival & North Goa", description: "Check-in, Baga/Calangute Beach, beach dinner." },
      { day: 2, title: "Adventure Day", description: "Water sports, Fort Aguada, Mandovi cruise." },
      { day: 3, title: "South Goa", description: "Basilica, Palolem/Colva Beach." },
      { day: 4, title: "Beach Leisure", description: "Dudhsagar Falls/Anjuna Market optional." },
      { day: 5, title: "Scuba/Dolphins", description: "Optional diving, spice tour." },
      { day: 6, title: "Free Day", description: "Relax/shop/beach party." },
      { day: 7, title: "Departure", description: "Leisure, airport transfer." },
    ],
    duration: undefined
  },
  {
    id: "pkg-2", 
    name: "Manali Adventure Trek", 
    destinationId: "dest-2", 
    price: 2600, 
    originalPrice: 3800, 
    minDays: 4, 
    maxDays: 8,
    inclusions: ["Camping/Hotel", "All Meals", "Trekking Guide", "Delhi Transport", "Bonfire"],
    exclusions: ["Gear", "Insurance", "Tips"], 
    featured: true, 
    active: true, 
    rating: 4.7,
    termsAndConditions: ["Weather dependent", "Min age 12", "Payment 15 days prior"],
    image: "/images/pkg-manali.jpg",
    itinerary: [
      { day: 1, title: "Delhi-Manali", description: "Volvo overnight." },
      { day: 2, title: "Local Exploration", description: "Hadimba, markets, bonfire." },
      { day: 3, title: "Solang Valley", description: "Paragliding/zorbing." },
      { day: 4, title: "Rohtang Pass", description: "Snow/views." },
      { day: 5, title: "Jogini Trek", description: "Waterfalls." },
      { day: 6, title: "Rafting/Springs", description: "Beas rafting." },
      { day: 7, title: "Naggar", description: "Castle/museum." },
      { day: 8, title: "Departure", description: "Leisure to Delhi." },
    ],
    duration: undefined
  },
  {
    id: "pkg-3", 
    name: "Royal Jaipur Heritage", 
    destinationId: "dest-4", 
    price: 3333, 
    originalPrice: 5000, 
    minDays: 3, 
    maxDays: 5,
    inclusions: ["4-Star Hotel", "B/D", "AC Transport", "Guide", "Fees"], 
    exclusions: ["Lunch/Shopping"], 
    featured: true, 
    active: true, 
    rating: 4.6,
    termsAndConditions: ["20% non-refund", "Child <5 free"], 
    image: "/images/pkg-jaipur.jpg",
    itinerary: [
      { day: 1, title: "City Tour", description: "Hawa Mahal, Palace." },
      { day: 2, title: "Forts", description: "Amber/Jaigarh." },
      { day: 3, title: "Walk/Departure", description: "Albert Hall." },
      { day: 4, title: "Pushkar", description: "Lake/Temple." },
      { day: 5, title: "Departure", description: "Shopping." },
    ],
    duration: undefined
  },
  {
    id: "pkg-4", 
    name: "Kerala Backwater Bliss", 
    destinationId: "dest-6", 
    price: 3670, 
    originalPrice: 5000, 
    minDays: 5, 
    maxDays: 10,
    inclusions: ["Houseboat/Resort", "All Meals", "Spa", "Kathakali"], 
    exclusions: ["Flights"], 
    featured: false, 
    active: true, 
    rating: 4.8,
    termsAndConditions: ["Seasonal boat", "Payment 21 days"], 
    image: "/images/pkg-kerala.jpg",
    itinerary: [
      { day: 1, title: "Kochi", description: "Fort Kochi." },
      { day: 2, title: "Munnar", description: "Tea gardens." },
      { day: 3, title: "Thekkady", description: "Periyar/spice." },
      { day: 4, title: "Alleppey Boat", description: "Backwaters." },
      { day: 5, title: "Varkala", description: "Cliff beach." },
      { day: 6, title: "Kovalam", description: "Lighthouse." },
      { day: 7, title: "Kochi Cultural", description: "Synagogue." },
      { day: 8, title: "Falls", description: "Athirappilly." },
      { day: 9, title: "Free", description: "Cuisine/cruise." },
      { day: 10, title: "Departure", description: "Airport." },
    ],
    duration: undefined
  },
  {
    id: "pkg-5", 
    name: "Jim Corbett Safari", 
    destinationId: "dest-5", 
    price: 3830, 
    originalPrice: 5500, 
    minDays: 2, 
    maxDays: 5,
    inclusions: ["Lodge", "Meals", "Safaris", "Guide"], 
    exclusions: ["Camera"], 
    featured: false, 
    active: true, 
    rating: 4.4,
    termsAndConditions: ["Permits", "Min 2"], 
    image: "/images/dest-corbett.jpg",
    itinerary: [
      { day: 1, title: "Journey", description: "Nature walk." },
      { day: 2, title: "Safari", description: "Jeep/Dhikala." },
      { day: 3, title: "Elephant", description: "Waterfall." },
      { day: 4, title: "Sitabani", description: "Temple." },
      { day: 5, title: "Departure", description: "Trail." },
    ],
    duration: undefined
  },
  {
    id: "pkg-6", 
    name: "Udaipur Getaway", 
    destinationId: "dest-8", 
    price: 4750, 
    originalPrice: 6500, 
    minDays: 3, 
    maxDays: 6,
    inclusions: ["5-Star Hotel", "B/D", "Cruise", "Tour"], 
    exclusions: ["Flights"], 
    featured: true, 
    active: true, 
    rating: 4.7,
    termsAndConditions: ["Advance cruise"], 
    image: "/images/dest-udaipur.jpg",
    itinerary: [
      { day: 1, title: "Lakes", description: "Pichola boat." },
      { day: 2, title: "Palaces", description: "City/Saheliyon." },
      { day: 3, title: "Nature", description: "Fateh Sagar." },
      { day: 4, title: "Kumbhalgarh", description: "Fort." },
      { day: 5, title: "Ranakpur", description: "Temples." },
      { day: 6, title: "Departure", description: "Vintage tour." },
    ],
    duration: undefined
  },
  // New India Packages
  {
    id: "pkg-7", 
    name: "Ladakh Biking Expedition", 
    destinationId: "dest-9", 
    price: 4500, 
    originalPrice: 6500, 
    minDays: 6, 
    maxDays: 10,
    inclusions: ["Bike Rental", "Permits", "Camping/Hotels", "Meals", "Guides"], 
    exclusions: ["Fuel/Gear"], 
    featured: true, 
    active: true, 
    rating: 4.8,
    image: "/images/dest-manali.jpg",
    itinerary: [
      { day: 1, title: "Leh Acclimatize", description: "Monasteries." },
      { day: 2, title: "Nubra Valley", description: "Camel safari." },
      { day: 3, title: "Pangong Lake", description: "Camping." },
      { day: 4, title: "Tso Moriri", description: "High lake." },
      { day: 5, title: "Khardung La", description: "World's highest pass." },
      { day: 6, title: "Magnetic Hill", description: "Optical illusion." },
      { day: 7, title: "Lamayuru", description: "Moonland." },
      { day: 8, title: "Alchi", description: "Ancient monastery." },
      { day: 9, title: "Free Leh", description: "Shopping/markets." },
      { day: 10, title: "Departure", description: "Flight out." },
    ],
    termsAndConditions: [],
    duration: undefined
  },
  {
    id: "pkg-8", 
    name: "Andaman Scuba Paradise", 
    destinationId: "dest-10", 
    price: 5500, 
    originalPrice: 7500, 
    minDays: 5, 
    maxDays: 8,
    inclusions: ["Resort Stay", "Scuba Certification", "Boat Trips", "Meals"], 
    exclusions: ["Dive Gear"], 
    featured: true, 
    active: true, 
    rating: 4.9,
    termsAndConditions: ["PADI certified instructors"], 
    image: "/images/dest-kerala.jpg",
    itinerary: [
      { day: 1, title: "Port Blair", description: "Cellular Jail." },
      { day: 2, title: "Havelock", description: "Radhanagar Beach." },
      { day: 3, title: "Scuba Intro", description: "Shallow dives." },
      { day: 4, title: "Advanced Dive", description: "Coral reefs." },
      { day: 5, title: "Neil Island", description: "Snorkeling." },
      { day: 6, title: "Ross/Baratang", description: "Lime caves." },
      { day: 7, title: "Free Water Sports", description: "Kayak/jet ski." },
      { day: 8, title: "Departure", description: "Relax." },
    ],
    duration: undefined
  },
  {
    id: "pkg-9", 
    name: "Spiritual Varanasi Ganga", 
    destinationId: "dest-11", 
    price: 2800, 
    originalPrice: 4000, 
    minDays: 3, 
    maxDays: 5,
    inclusions: ["Hotel", "Boat Ride", "Aarti", "Puja"], 
    exclusions: ["Donations"], 
    featured: false, 
    active: true, 
    rating: 4.6,
    termsAndConditions: ["Respect rituals"], 
    image: "/images/dest-heritage.jpg",
    itinerary: [
      { day: 1, title: "Ghats Walk", description: "Boat ride." },
      { day: 2, title: "Ganga Aarti", description: "Evening ceremony." },
      { day: 3, title: "Sarnath", description: "Buddha site." },
      { day: 4, title: "Kashi Tour", description: "Temples." },
      { day: 5, title: "Departure", description: "Morning dip." },
    ],
    duration: undefined
  },
  {
    id: "pkg-10", 
    name: "Ranthambore Tiger Trail", 
    destinationId: "dest-12", 
    price: 4200, 
    originalPrice: 6000, 
    minDays: 3, 
    maxDays: 6,
    inclusions: ["Jeep Safaris", "Lodge", "Meals", "Guide"], 
    exclusions: ["Entry Fees"], 
    featured: false, 
    active: true, 
    rating: 4.5,
    termsAndConditions: ["Zone allocation"], 
    image: "/images/dest-wildlife.jpg",
    itinerary: [
      { day: 1, title: "Arrival Safari", description: "Evening zone." },
      { day: 2, title: "Morning/Evening", description: "Zones 1-5." },
      { day: 3, title: "Fort Visit", description: "Ranthambore Fort." },
      { day: 4, title: "Canoe Safari", description: "Lake." },
      { day: 5, title: "Night Safari", description: "Optional." },
      { day: 6, title: "Departure", description: "Birding." },
    ],
    duration: undefined
  },
  // New Intl Packages
  {
    id: "pkg-11", 
    name: "Bali Cultural Escape", 
    destinationId: "dest-13", 
    price: 6500, 
    originalPrice: 9000, 
    minDays: 5, 
    maxDays: 9,
    inclusions: ["Villa Stay", "Transfers", "Temple Tours", "Cooking Class"], 
    exclusions: ["Visa/Flights"], 
    featured: true, 
    active: true, 
    rating: 4.7,
    termsAndConditions: ["Visa on arrival"], 
    image: "/images/dest-bali.jpg",
    itinerary: [
      { day: 1, title: "Denpasar Arrival", description: "Ubud transfer." },
      { day: 2, title: "Rice Terraces", description: "Tegallalang." },
      { day: 3, title: "Uluwatu Temple", description: "Kecak dance." },
      { day: 4, title: "Seminyak Beach", description: "Surf lesson." },
      { day: 5, title: "Cooking Class", description: "Balinese food." },
      { day: 6, title: "Mount Batur", description: "Sunrise trek." },
      { day: 7, title: "Tanah Lot", description: "Sea temple." },
      { day: 8, title: "Free Spa", description: "Relax." },
      { day: 9, title: "Departure", description: "Shopping." },
    ],
    duration: undefined
  },
  {
    id: "pkg-12", 
    name: "Dubai Luxury", 
    destinationId: "dest-14", 
    price: 8500, 
    originalPrice: 12000, 
    minDays: 4, 
    maxDays: 7,
    inclusions: ["5-Star Hotel", "Visa Assist", "Desert Safari", "Burj Entry"], 
    exclusions: ["Shopping"], 
    featured: true, 
    active: true, 
    rating: 4.6,
    termsAndConditions: ["UAE visa extra"], 
    image: "/images/dest-dubai.jpg",
    itinerary: [
      { day: 1, title: "Burj Khalifa", description: "At the Top." },
      { day: 2, title: "Mall/Palm", description: "Fountains." },
      { day: 3, title: "Desert Safari", description: "Dune bashing." },
      { day: 4, title: "Aquarium/Theme Park", description: "IMG Worlds." },
      { day: 5, title: "Yas Island", description: "Ferrari World." },
      { day: 6, title: "Free Luxury", description: "Souk Madinat." },
      { day: 8, title: "Departure", description: "Airport." },
    ],
    duration: undefined
  },
  {
    id: "pkg-13", 
    name: "Singapore Highlights", 
    destinationId: "dest-15", 
    price: 7500, 
    originalPrice: 10500, 
    minDays: 4, 
    maxDays: 6,
    inclusions: ["Hotel", "Sentosa Pass", "Night Safari"], 
    exclusions: ["Meals"], 
    featured: false, 
    active: true, 
    rating: 4.5,
    termsAndConditions: ["Singapore visa"], 
    image: "/images/dest-city.jpg",
    itinerary: [
      { day: 1, title: "Marina Bay", description: "Gardens." },
      { day: 2, title: "Sentosa", description: "Universal Studios." },
      { day: 3, title: "Night Safari", description: "Zoo." },
      { day: 4, title: "Chinatown/India", description: "Food tour." },
      { day: 5, title: "Orchard Shopping", description: "Malls." },
      { day: 6, title: "Departure", description: "Airport." },
    ],
    duration: undefined
  },
  {
    id: "pkg-14", 
    name: "Phuket Beach Party", 
    destinationId: "dest-16", 
    price: 6000, 
    originalPrice: 8500, 
    minDays: 5, 
    maxDays: 8,
    inclusions: ["Beach Resort", "Island Hopping", "Nightlife Tour"], 
    exclusions: ["Alcohol"], 
    featured: true, 
    active: true, 
    rating: 4.4,
    termsAndConditions: ["Thailand visa"], 
    image: "/images/pkg-phuket.jpg",
    itinerary: [
      { day: 1, title: "Patong Beach", description: "Bangla Road." },
      { day: 2, title: "Phi Phi Islands", description: "Maya Bay." },
      { day: 3, title: "James Bond", description: "Phang Nga Bay." },
      { day: 4, title: "Big Buddha", description: "Viewpoint." },
      { day: 5, title: "Party Night", description: "Beach clubs." },
      { day: 6, title: "Old Town", description: "Sino-Portuguese." },
      { day: 7, title: "Simon Cabaret", description: "Show." },
      { day: 8, title: "Departure", description: "Relax." },
    ],
    duration: undefined
  },
]

// ---- HOTELS (Added 4 new for balance) ----
export const hotels: Hotel[] = [
  // Existing 8
  { id: "h-1", name: "Sea Breeze Resort", destinationId: "dest-1", pricePerNight: 3500, rating: 4.3, amenities: ["Pool", "WiFi", "Restaurant", "Beach Access", "Spa"], image: "/images/dest-goa.jpg" },
  { id: "h-2", name: "Palm Grove Hotel", destinationId: "dest-1", pricePerNight: 2200, rating: 4.0, amenities: ["WiFi", "Restaurant", "Parking", "Room Service"], image: "/images/dest-goa.jpg" },
  { id: "h-3", name: "Mountain View Lodge", destinationId: "dest-2", pricePerNight: 2800, rating: 4.5, amenities: ["Bonfire", "WiFi", "Restaurant", "Trekking Guide", "Mountain View"], image: "/images/dest-mountain.jpg" },
  { id: "h-4", name: "Snow Peak Resort", destinationId: "dest-2", pricePerNight: 4200, rating: 4.6, amenities: ["Heated Pool", "WiFi", "Spa", "Restaurant", "Ski Equipment"], image: "/images/dest-mountain.jpg" },
  { id: "h-5", name: "The Grand Mumbai", destinationId: "dest-3", pricePerNight: 5500, rating: 4.4, amenities: ["Pool", "WiFi", "Gym", "Restaurant", "Bar", "Valet"], image: "/images/dest-city.jpg" },
  { id: "h-6", name: "Heritage Haveli", destinationId: "dest-4", pricePerNight: 3800, rating: 4.7, amenities: ["Heritage Room", "WiFi", "Restaurant", "Cultural Events", "Pool"], image: "/images/dest-heritage.jpg" },
  { id: "h-7", name: "Jungle Camp Lodge", destinationId: "dest-5", pricePerNight: 2500, rating: 4.2, amenities: ["Safari Desk", "WiFi", "Restaurant", "Bonfire", "Nature Walk"], image: "/images/dest-wildlife.jpg" },
  { id: "h-8", name: "Backwater Houseboat", destinationId: "dest-6", pricePerNight: 6000, rating: 4.8, amenities: ["Private Deck", "All Meals", "AC Room", "Cruise", "Traditional Cuisine"], image: "/images/dest-goa.jpg" },
  // New 4 (intl + new india)
  { id: "h-9", name: "Leh Palace Camp", destinationId: "dest-9", pricePerNight: 5000, rating: 4.7, amenities: ["Mountain View", "Bonfire", "Oxygen", "Tents", "Guides"], image: "/images/dest-mountain.jpg" },
  { id: "h-10", name: "Emerald Havelock Resort", destinationId: "dest-10", pricePerNight: 7000, rating: 4.9, amenities: ["Beachfront", "Dive Center", "Spa", "Water Sports"], image: "/images/dest-goa.jpg" },
  { id: "h-11", name: "Bali Ubud Villa", destinationId: "dest-13", pricePerNight: 9000, rating: 4.8, amenities: ["Private Pool", "Rice View", "Yoga", "Cooking"], image: "/images/dest-goa.jpg" },
  { id: "h-12", name: "Dubai Marina JBR", destinationId: "dest-14", pricePerNight: 12000, rating: 4.7, amenities: ["Infinity Pool", "Marina View", "Gym", "Beach"], image: "/images/dest-city.jpg" },
]

// ---- TRANSPORT (Updated intl) ----
export const transportOptions = [
  { type: "Bus", routes: ["Delhi-Manali", "Delhi-Jaipur"], priceRange: "₹500-2500", duration: "6-14h" },
  { type: "Train", routes: ["Delhi-Jaipur", "Mumbai-Goa"], priceRange: "₹300-3500", duration: "5-12h" },
  { type: "Flight Domestic", routes: ["Delhi-Goa", "Mumbai-Kerala"], priceRange: "₹3000-8000", duration: "1-3h" },
  { type: "Intl Flight", routes: ["Delhi-Dubai", "Mumbai-Singapore"], priceRange: "₹15000-40000", duration: "4-8h" },
]

// ---- BLOG POSTS (unchanged) ----
export const blogPosts: BlogPost[] = [
  { 
    id: "blog-1", 
    title: "10 Essential Travel Tips for First-Time Travelers", 
    excerpt: "Complete guide with practical advice for worry-free trips.", 
    content: `Traveling for the first time? Here's your ultimate checklist!

1. **Digital Documents**: Scan passport, visa, tickets, insurance. Email to yourself + cloud storage. Screenshot emergency contacts.

2. **Pack Light**: 7kg carry-on max. Roll clothes, use packing cubes. Wear bulkiest items on flight.

3. **Local Currency**: Exchange $50-100 cash. Use Wise/Revolut for cards (zero fees). Inform bank of travel.

4. **SIM/eSIM**: Airalo or local SIM day 1. WhatsApp for all comms.

5. **Apps**: Google Maps offline, Google Translate, XE currency, TripIt itinerary.

6. **Power Bank**: 10,000mAh (under 100Wh for flights). India: Type C/D plugs.

7. **Health**: Carry prescriptions, hand sanitizer, masks. Download vaccination cert.

8. **Backup Plans**: Extra phone battery, photocopies. Share itinerary with family.

9. **Phrases**: "Hello", "Thank you", "How much?", "Help", "Bathroom" in local language.

10. **Stay Flexible**: Delays happen. Enjoy the journey!

**Pro Tip**: Test everything 48hrs before departure. Safe travels! ✈️`,
    category: "tips" as const, 
    author: "Priya Sharma", 
    date: "2026-01-15", 
    image: "/images/dest-goa.jpg" 
  },
  { 
    id: "blog-2", 
    title: "Solo Female Traveler Safety Guide", 
    excerpt: "Proven tips for safe and confident solo adventures.", 
    content: `Solo travel = freedom! Here's how to stay safe:

**Before Trip:**
• Share full itinerary + hotel details with 2 trusted contacts
• Emergency apps: bSafe, Red Panic Button (SOS)
• Travel insurance w/ medical evacuation ($100k+)
• Research local laws/customs (dress codes)

**On Ground:**
• Hotel: Confirm location via Google Maps, check reviews
• Taxi: Uber/Ola only. Share live location
• Valuables: Money belt, hotel safe. Fake wallet trick
• Night: Well-lit main streets. Fake phone call technique

**India Specific:**
• Avoid isolated areas after dark
• Respect local customs (cover shoulders/knees temples)
• Groups safer for trains/night travel

**Emergencies:**
• India: 100 Police, 108 Ambulance
• US Embassy: +91-11-2419-8000

Confidence > fear. 90% travelers have zero issues. You've got this! 💪`,
    category: "safety" as const, 
    author: "Rahul Verma", 
    date: "2026-01-22", 
    image: "/images/dest-mountain.jpg" 
  },
  { 
    id: "blog-3", 
    title: "Ultimate Packing Checklist (7-10 Day Trip)", 
    excerpt: "Never forget essentials again with this complete list.", 
    content: `**Carry-on Only Packing (7kg max)**

**Documents (Folder):**
• Passport (valid 6+ months)
• Visa/e-Visa printouts
• Flight/hotel confirmations
• Insurance policy
• $100 cash + 2 cards

**Clothes (1 week):**
• 5 T-shirts/tops
• 2 pants/jeans
• 1 light jacket
• 7 underwear/socks
• 1 swimsuit
• Sleepwear
• Comfortable shoes + flip flops

**Toiletries (100ml bottles):**
• Toothbrush/paste
• Deodorant
• Sunscreen SPF50+
• Moisturizer
• Small soap/shampoo
• Medicines (painkiller, motion sickness)

**Electronics:**
• Phone + charger
• Power bank
• Universal adapter
• Earphones

**India Must-haves:**
• Mosquito repellent
• Reusable water bottle
• Scarf (temples/AC buses)
• Wet wipes/hand sanitizer

**Pro Tip**: Laundry everywhere in India (₹50/shirt). Pack versatile neutral colors.`,
    category: "packing" as const, 
    author: "Ananya Singh", 
    date: "2026-02-01", 
    image: "/images/dest-city.jpg" 
  },
  { 
    id: "blog-4", 
    title: "Indian Cultural Etiquette Every Traveler Must Know", 
    excerpt: "Respect traditions, avoid faux pas, travel like local.", 
    content: `**Essential Do's & Don'ts:**

**Temples:**
• Remove shoes (carry socks)
• Cover shoulders/knees (scarf essential)
• No leather items
• Walk clockwise around shrines
• Photography: Ask permission

**Greetings:**
• Namaste (palms together) > handshake
• Elders first
• Remove sunglasses indoors

**Dining:**
• Eat right hand only
• Don't waste food (hospitality culture)
• Accept offered food (refusing = rude)
• No public eating/drinking while walking

**Public:**
• No PDA (kissing/hugging)
• Pointing feet at people = disrespectful
• Head wobble = yes/maybe
• Bargain everywhere except fixed price

**Regional:**
• Rajasthan: Photo consent before clicking
• Kerala: Left hand unclean (use right)
• North: Haggle hard, South: Fixed prices

Respect = richer experiences. Locals appreciate mindful travelers! 🙏`,
    category: "culture" as const, 
    author: "Vikram Patel", 
    date: "2026-02-05", 
    image: "/images/dest-heritage.jpg" 
  },
]

// ---- OFFERS (Added 2 intl) ----
export const offers: Offer[] = [
  { id: "offer-1", title: "Summer Beach", description: "30% off beaches", discount: 30, validUntil: "2026-06-30", code: "SUMMER30", packageId: "pkg-1" },
  { id: "offer-2", title: "Adventure 25%", description: "25% adventure", discount: 25, validUntil: "2026-04-30", code: "ADVENTURE25", packageId: "pkg-2" },
  { id: "offer-3", title: "Heritage 20%", description: "20% heritage", discount: 20, validUntil: "2026-03-31", code: "HERITAGE20", packageId: "pkg-3" },
  { id: "offer-4", title: "Intl Bali Deal", description: "15% Bali", discount: 15, validUntil: "2026-12-31", code: "BALI15", packageId: "pkg-11" },
  { id: "offer-5", title: "Dubai Luxury", description: "20% Dubai", discount: 20, validUntil: "2026-05-31", code: "DUBAI20", packageId: "pkg-12" },
  { id: "offer-6", title: "Phuket Party", description: "25% Phuket", discount: 25, validUntil: "2026-06-15", code: "PHUKET25", packageId: "pkg-14" },
]

// ---- FAQ (Intl update) ----
export const faqs = [
  { question: "Booking?", answer: "Browse > select > book. Email confirmation." },
  { question: "Cancellation?", answer: "Free 15+ days, 50% 7-15, non-refund <7." },
  { question: "Insurance?", answer: "Recommended separately." },
  { question: "Intl Visa?", answer: "Visa assist included where applicable (Dubai/Singapore on arrival)." },
  { question: "Customize?", answer: "Adjust days in min/max range." },
  { question: "Intl Flights?", answer: "Quoted separately; book via partners." },
]

// ---- QUIZ (unchanged) ----
export const quizQuestions = [
  { 
    id: 1, 
    question: "What kind of landscapes excite you most?", 
    options: [ 
      { text: "Pristine beaches and oceans", value: "beach" }, 
      { text: "Snow-capped mountains and adventure", value: "adventure" }, 
      { text: "Vibrant cities and nightlife", value: "city" }, 
      { text: "Lush forests and wildlife", value: "nature" } 
    ] 
  },
  { 
    id: 2, 
    question: "What's your ideal travel pace?", 
    options: [ 
      { text: "Relaxed - beach lounging and unwinding", value: "beach" }, 
      { text: "Active - trekking, rafting, paragliding", value: "adventure" }, 
      { text: "Cultural - temples, history, local experiences", value: "heritage" }, 
      { text: "Fast-paced - shopping, events, urban exploration", value: "city" } 
    ] 
  },
  { 
    id: 3, 
    question: "What type of accommodation appeals to you?", 
    options: [ 
      { text: "Luxury resorts with spa and fine dining", value: "luxury" }, 
      { text: "Nature camps or jungle lodges", value: "nature" }, 
      { text: "Heritage havelis and boutique palaces", value: "heritage" }, 
      { text: "Beach huts or modern apartments", value: "beach" } 
    ] 
  },
  { 
    id: 4, 
    question: "Which activities excite you?", 
    options: [ 
      { text: "Wildlife safaris and nature walks", value: "nature" }, 
      { text: "Night markets, clubs, and rooftop bars", value: "city" }, 
      { text: "Fort visits, museums, and cultural shows", value: "heritage" }, 
      { text: "Adventure sports like skiing or scuba", value: "adventure" } 
    ] 
  },
  { 
    id: 5, 
    question: "Who do you prefer traveling with?", 
    options: [ 
      { text: "Solo or romantic couples getaway", value: "luxury" }, 
      { text: "Family - comfortable and cultural", value: "heritage" }, 
      { text: "Friends - adventure and parties", value: "adventure" }, 
      { text: "Nature lovers group or solo reflection", value: "nature" } 
    ] 
  }
];

export const personalityTypes: Record<string, { name: string; description: string; emoji: string; recommendedDestinations: string[] }> = {
  adventure: { name: "Adventure Lover", description: "Adrenaline junkie!", emoji: "🧗", recommendedDestinations: ["dest-2", "dest-5", "dest-7", "dest-9"] },
  beach: { name: "Beach Relaxer", description: "Waves & sun!", emoji: "🏖️", recommendedDestinations: ["dest-1", "dest-6", "dest-10", "dest-13", "dest-16"] },
  city: { name: "City Explorer", description: "Urban buzz!", emoji: "🏙️", recommendedDestinations: ["dest-3", "dest-14", "dest-15"] },
  nature: { name: "Nature Seeker", description: "Peaceful wilds!", emoji: "🌿", recommendedDestinations: ["dest-5", "dest-6", "dest-7", "dest-12"] },
  heritage: { name: "Culture Buff", description: "History lover!", emoji: "🏛️", recommendedDestinations: ["dest-4", "dest-8", "dest-11"] },
  luxury: { name: "Luxury Traveler", description: "5-star life!", emoji: "✨", recommendedDestinations: ["dest-8", "dest-6", "dest-14"] },
};

// ---- REVIEWS (added new) ----
export const defaultReviews: Review[] = [
  // Existing
  { id: "rev-1", userId: "user-demo", userName: "Amit", targetId: "dest-1", targetType: "destination", rating: 5, comment: "Loved Goa beaches!", date: "2026-01-10" },
  // ... (originals),
  // New
  { id: "rev-10", userId: "user-intl", userName: "Riya", targetId: "dest-13", targetType: "destination", rating: 5, comment: "Bali was magical!", date: "2026-03-15" },
  { id: "rev-11", userId: "user-intl", userName: "Karan", targetId: "pkg-12", targetType: "package", rating: 4.5, comment: "Dubai luxury exceeded expectations.", date: "2026-04-02" },
];

