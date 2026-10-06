import { propertyImages, getImage, getMultipleImages } from './localImages';

export const DESTINATIONS = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    count: '1,200+ stays',
    popularFor: 'Bandra West, BKC & Marine Drive',
    avgPrice: 4800,
    rating: 4.93,
    weather: '28°C • Pleasant Coastal Breeze',
    airport: 'Chhatrapati Shivaji Maharaj Intl (BOM) — 25 mins',
    tagline: 'India’s Financial Powerhouse & Coastal Lifestyle Capital',
    overview: 'From the bustling trading floors of Bandra Kurla Complex (BKC) to the sunset promenades of Carter Road and colonial charm of South Mumbai, our residences are curated for corporate titans, founders, and discerning travelers.',
    corporateHubs: ['Bandra Kurla Complex (BKC)', 'Lower Parel / Worli', 'Andheri East SEEPZ', 'Nariman Point'],
    neighborhoods: [
      {
        name: 'Bandra West & Carter Rd',
        vibe: 'Seaside Promenade, Cafes & Art',
        commute: '15 mins to BKC via Sea Link',
        highlight: 'Trendy lifestyle, seaside walking tracks, premier dining'
      },
      {
        name: 'Bandra Kurla Complex (BKC)',
        vibe: 'Financial District & MNC HQs',
        commute: 'Walking distance to top banks & consulates',
        highlight: 'Jio World Convention Centre, luxury dining, corporate boardrooms'
      },
      {
        name: 'South Mumbai & Marine Drive',
        vibe: 'Heritage Art Deco & Diplomatic Hub',
        commute: '20 mins via Coastal Road',
        highlight: 'Queen’s Necklace, Gateway of India, heritage clubs'
      }
    ],
    faqs: [
      {
        q: 'Are properties in Mumbai GST-compliant for corporate tax write-offs?',
        a: 'Yes, 100% of our Mumbai executive residences provide automated GST invoices featuring your company name and GSTIN number immediately upon booking confirmation.'
      },
      {
        q: 'How fast is the Wi-Fi in Mumbai business stays?',
        a: 'All our serviced apartments in Mumbai feature dual-band enterprise fiber internet with minimum guaranteed speeds of 300 to 500 Mbps, alongside backup Wi-Fi dongles.'
      },
      {
        q: 'Can I arrange airport pickup from Mumbai Airport (BOM)?',
        a: 'Yes, our 24/7 dedicated city concierge provides luxury chauffeured airport transfers from both Terminal 2 (international/domestic) and Terminal 1.'
      },
      {
        q: 'Is housekeeping included for extended stays in Mumbai?',
        a: 'Daily professional housekeeping, fresh linen rotations every 3 days, and optional laundry services are complimentary across all serviced apartments.'
      }
    ],
    images: propertyImages.length > 0 ? [
      getImage(0),
      getImage(1),
      getImage(2),
      getImage(3)
    ] : [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    count: '950+ stays',
    popularFor: 'Indiranagar, Koramangala & Whitefield',
    avgPrice: 3800,
    rating: 4.91,
    weather: '24°C • Cool Garden City Climate',
    airport: 'Kempegowda International Airport (BLR) — 45 mins via expressway',
    tagline: 'Silicon Valley of India & Garden City Innovation Hub',
    overview: 'Stay in modern tech-enabled studios and serene garden villas surrounded by top AI labs, venture capital offices, microbreweries, and verdant tree-lined boulevards.',
    corporateHubs: ['Outer Ring Road (ORR)', 'Whitefield EPIP Zone', 'Electronic City', 'Manyata Tech Park'],
    neighborhoods: [
      {
        name: 'Indiranagar (100ft Rd)',
        vibe: 'Startup Hub, Cafes & Boutique Dining',
        commute: '15 mins to MG Road & CBD',
        highlight: 'Co-working spaces, artisan bakeries, vibrant social scene'
      },
      {
        name: 'Whitefield & ITPL',
        vibe: 'Tech Parks & Gated Villa Communities',
        commute: 'Minutes from major IT parks',
        highlight: 'Spacious high-rise lofts, quiet family neighborhoods, EV hubs'
      },
      {
        name: 'Koramangala 4th Block',
        vibe: 'Founder Network & VC Alley',
        commute: 'Quick access to ORR & CBD',
        highlight: 'Innovation incubators, quiet green lanes, top global cuisines'
      }
    ],
    faqs: [
      {
        q: 'Do residences have power backup for remote work in Bengaluru?',
        a: 'Yes, all residences feature 100% full DG power backup covering air conditioning, Wi-Fi routers, workstation setups, and kitchen appliances.'
      },
      {
        q: 'Are weekly and monthly corporate discounts available in Bengaluru?',
        a: 'Yes, extended corporate stays receive automatic 15% to 30% volume discounts with flexible week-to-week renewal terms.'
      },
      {
        q: 'Can I host client meetings or team scrums inside the apartments?',
        a: 'Select business residences offer 6-person boardroom dining tables, high-definition smart projection monitors, and quiet acoustic insulation.'
      }
    ],
    images: propertyImages.length > 0 ? [
      getImage(4),
      getImage(5),
      getImage(6),
      getImage(7)
    ] : [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    state: 'Delhi / Haryana',
    country: 'India',
    count: '1,100+ stays',
    popularFor: 'DLF Cyber City, Golf Course Rd & South Delhi',
    avgPrice: 4200,
    rating: 4.89,
    weather: '26°C • Clear Skies & Pleasant Evening',
    airport: 'Indira Gandhi Intl Airport (DEL) — 15 mins to Aerocity / Gurgaon',
    tagline: 'Capital Power Corridor, Cyber Hubs & Diplomatic Enclaves',
    overview: 'From architectural penthouses in DLF Cyber City and Golf Course Road to diplomatic suites in South Delhi, experience premier connectivity, state-of-the-art air purification, and rapid metro access.',
    corporateHubs: ['DLF Cyber City & CyberHub', 'Golf Course Extension Rd', 'Aerocity Hospitality District', 'Connaught Place'],
    neighborhoods: [
      {
        name: 'DLF Cyber City (Gurgaon)',
        vibe: 'Fortune 500 Towers & CyberHub Dining',
        commute: 'Connected via Rapid Metro',
        highlight: 'Walking access to global corporate headquarters and fine dining'
      },
      {
        name: 'Golf Course Road (Gurgaon)',
        vibe: 'Ultra-Luxury High-Rises & Golf Greens',
        commute: 'Direct signal-free expressway',
        highlight: 'Diplomatic standards, exclusive security, sprawling clubhouses'
      },
      {
        name: 'South Delhi & Aerocity',
        vibe: 'Diplomatic Enclaves & Airport Transit Hub',
        commute: '8 mins to DEL Airport',
        highlight: 'Quiet tree-lined avenues, luxury retail at Worldmark, heritage parks'
      }
    ],
    faqs: [
      {
        q: 'Are medical-grade air purifiers provided in Delhi NCR homes?',
        a: 'Yes, every bedroom and living space is fitted with certified HEPA H13 air purification systems maintaining indoor AQI below 25 year-round.'
      },
      {
        q: 'How close are residences to DLF Cyber City and Aerocity?',
        a: 'Our Gurgaon properties are within 5 to 10 minutes walking or driving distance to Cyber City towers and Rapid Metro stations.'
      },
      {
        q: 'Is secure covered parking available for visiting executives?',
        a: 'All listings include allocated basement or multi-level covered parking spots with 24/7 CCTV surveillance and EV charging.'
      }
    ],
    images: propertyImages.length > 0 ? [
      getImage(8),
      getImage(9),
      getImage(10),
      getImage(11)
    ] : [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    count: '820+ stays',
    popularFor: 'Candolim, Anjuna & Luxury Beachfront Villas',
    avgPrice: 6500,
    rating: 4.96,
    weather: '29°C • Tropical Sun & Gentle Sea Wind',
    airport: 'Manohar Intl Airport (MOPA) / Dabolim (GOI)',
    tagline: 'Coastal Paradise, Portuguese Heritage & Luxury Pool Villas',
    overview: 'Escape to private ocean-cliff estates, restored Portuguese heritage villas, and tranquil coconut grove sanctuaries with private swimming pools, high-speed Starlink Wi-Fi, and private chefs.',
    corporateHubs: ['Panaji City Centre', 'North Goa Workation Hub', 'Candolim Coastal Corridor'],
    neighborhoods: [
      {
        name: 'Vagator & Ozran Cliff',
        vibe: 'Sunset Oceanfront, Hillside Villas & Chic Bars',
        commute: '10 mins to Anjuna Beach',
        highlight: 'Dramatic cliff views, infinity pools, beach club access'
      },
      {
        name: 'Candolim & Sinquerim',
        vibe: 'Golden Sandy Coast & Portuguese Forts',
        commute: '25 mins to Panjim capital',
        highlight: 'Calm water swimming, water sports, historic Fort Aguada'
      },
      {
        name: 'Assagao & Anjuna',
        vibe: 'Heritage Mansions, Fashion Boutiques & Organic Cafes',
        commute: '15 mins to coastal beaches',
        highlight: 'Cobblestone streets, high-end culinary hotspots, peaceful greenery'
      }
    ],
    faqs: [
      {
        q: 'Are private chefs and butler service available at Goa villas?',
        a: 'Yes, our concierge can assign dedicated private chefs for Goan, Continental, or custom gourmet dietary requirements.'
      },
      {
        q: 'Is reliable high-speed internet available for workations in Goa?',
        a: 'All our curated Goa villas are equipped with dual fiber broadband connections or high-speed Starlink satellite setups.'
      },
      {
        q: 'Are private swimming pools serviced daily?',
        a: 'Yes, pool technicians sanitize and inspect water clarity every single morning before 8:00 AM.'
      }
    ],
    images: propertyImages.length > 0 ? [
      getImage(12),
      getImage(13),
      getImage(14),
      getImage(15)
    ] : [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    count: '800+ stays',
    popularFor: 'Downtown, Marina & Palm Jumeirah',
    avgPrice: 8900,
    rating: 4.95,
    weather: '31°C • Sunny Luxury Sky & Warm Sea',
    airport: 'Dubai International Airport (DXB) — 15 mins to Downtown',
    tagline: 'Futuristic Skyscrapers, Desert Glamour & Global Commerce',
    overview: 'Spectacular skyline residences facing the Burj Khalifa, waterfront apartments in Dubai Marina, and iconic Palm Jumeirah beachfront retreats featuring VIP concierge services and five-star resort amenities.',
    corporateHubs: ['DIFC (Dubai International Financial Centre)', 'Business Bay', 'Dubai Media City', 'Downtown Dubai'],
    neighborhoods: [
      {
        name: 'Downtown Dubai & Burj Khalifa',
        vibe: 'Iconic Towers, Dubai Mall & Fountain Views',
        commute: '5 mins to DIFC financial hub',
        highlight: 'Front-row fountain views, Opera district, luxury fashion boulevard'
      },
      {
        name: 'Palm Jumeirah',
        vibe: 'Private Beachfront, Beach Clubs & Yachts',
        commute: '20 mins to Downtown',
        highlight: 'Private beach access, world-class restaurants, skyline views'
      },
      {
        name: 'Dubai Marina & JBR',
        vibe: 'Waterfront Boardwalk, Yacht Pier & Cafes',
        commute: 'Connected to Dubai Metro & Tram',
        highlight: 'Marina promenade jogging tracks, beach walk, rooftop sunset lounges'
      }
    ],
    faqs: [
      {
        q: 'Are properties licensed by the Dubai Department of Economy and Tourism (DET)?',
        a: 'Yes, 100% of our Dubai residences hold official DET Holiday Home holiday permits and comply with strict UAE quality standards.'
      },
      {
        q: 'Is chauffeur service and airport transfer included in Dubai?',
        a: 'Complimentary private airport transfer in executive sedans (Mercedes S-Class / BMW 7 Series) is included for stays over 5 nights.'
      },
      {
        q: 'Can corporate entities in UAE or internationally receive VAT invoices?',
        a: 'Yes, all Dubai bookings generate official FTA-compliant VAT tax invoices.'
      }
    ],
    images: propertyImages.length > 0 ? [
      getImage(16),
      getImage(17),
      getImage(18),
      getImage(19)
    ] : [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'london',
    name: 'London',
    state: 'Greater London',
    country: 'United Kingdom',
    count: '1,050+ stays',
    popularFor: 'Canary Wharf, Kensington & Mayfair',
    avgPrice: 11200,
    rating: 4.94,
    weather: '18°C • Crisp Autumn Sunshine',
    airport: 'London Heathrow (LHR) / London City Airport (LCY)',
    tagline: 'Historic Royalty, Financial District Panoramas & Timeless Elegance',
    overview: 'Experience the best of London living with high-rise executive lofts in Canary Wharf overlooking the River Thames, classic Victorian townhomes in Kensington, and historic luxury suites in Mayfair.',
    corporateHubs: ['Canary Wharf Financial District', 'The City of London (Square Mile)', 'Mayfair Hedge Fund Hub', 'Shoreditch Silicon Roundabout'],
    neighborhoods: [
      {
        name: 'Canary Wharf & Docklands',
        vibe: 'Financial Capital, Glass Towers & River Panoramas',
        commute: 'Elizabeth Line: 12 mins to West End',
        highlight: 'High-speed transit, river cruises, premier retail malls'
      },
      {
        name: 'Kensington & Chelsea',
        vibe: 'Royal Parks, Museums & Victorian Architecture',
        commute: 'Direct Piccadilly & District lines',
        highlight: 'Hyde Park strolls, boutique cafes, peaceful private gardens'
      },
      {
        name: 'Mayfair & West End',
        vibe: 'Historic Private Clubs, Art Galleries & Savile Row',
        commute: 'Walking distance to Oxford Circus & Green Park',
        highlight: 'Michelin-starred dining, luxury fashion, diplomatic embassies'
      }
    ],
    faqs: [
      {
        q: 'Are London apartments within walking distance of the Underground?',
        a: 'Yes, all our London apartments are within a 3 to 6 minute stroll of Underground or Elizabeth Line stations.'
      },
      {
        q: 'Is central heating and high-speed Wi-Fi guaranteed?',
        a: 'All residences feature modern smart thermostats, ultrafast fiber connections (up to 1 Gbps), and double-glazed acoustic windows.'
      },
      {
        q: 'Can international companies pay in GBP, USD, or INR?',
        a: 'Yes, our platform supports multi-currency payments with zero foreign exchange markup and instant corporate VAT receipts.'
      }
    ],
    images: propertyImages.length > 0 ? [
      getImage(20),
      getImage(21),
      getImage(22),
      getImage(23)
    ] : [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
    ]
  }
];
