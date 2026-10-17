/**
 * Mock Data Repository for Crowd & Safety Predictor
 *
 * NOTE: SAMPLE DATA - NOT VERIFIED REAL-WORLD INFORMATION.
 * Used strictly for prototyping and frontend evaluation.
 */

export const MOCK_PLACES = [
  // 1. Tourist Attraction - Victoria Memorial
  {
    id: 'victoria-memorial',
    name: 'Victoria Memorial & Gardens',
    category: 'Tourist Attraction',
    city: 'Kolkata',
    description: 'Iconic marble monument surrounded by 64 acres of landscaped gardens, reflecting pools, and historical galleries.',
    image: '/src/assets/images/hero_city_crowd_1792237288801.jpg',
    waitingTime: '25-40 mins',
    typicalCrowdIndex: 68,
    typicalCrowdLevel: 'moderate',
    safetyStatus: 'clear',
    emergencyContacts: {
      police: '100 / 033-2223-1111',
      ambulance: '102 / 033-2286-0000',
      fire: '101',
      localHelpDesk: '033-2223-1890 (Visitor Info Desk)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Ramps available at the north gate and main garden entrance. Ground floor galleries accessible.',
      parking: 'Designated barrier-free parking near Queen\'s Way entrance.',
      entryNotes: 'Security metal detectors installed at all 3 public turnstiles. Bags larger than 12x12 inches must be checked into cloakroom.',
    },
    verifiedIncidents: [
      {
        id: 'inc-vm-1',
        date: '2026-09-14',
        type: 'Minor Medical',
        summary: 'Heat exhaustion treated on-site by first-aid paramedic; recovered without hospital transfer.',
        status: 'Resolved',
      },
    ],
    notices: [
      {
        id: 'not-vm-1',
        title: 'Garden Walkway Maintenance along East Promenade',
        type: 'notice',
        severity: 'low',
        description: 'Paving repair in progress along eastern pool. Walkers are advised to follow directional detour signs.',
        source: 'Garden Heritage Trust',
        lastUpdated: '2026-10-12',
      },
    ],
    hourlyWeekday: [
      5, 5, 5, 6, 8, 14, 25, 34, 42, 48, 55, 62, 60, 58, 64, 72, 70, 65, 52, 38, 22, 12, 8, 5
    ],
    hourlyWeekend: [
      8, 8, 8, 10, 15, 24, 38, 52, 65, 74, 82, 88, 84, 82, 89, 94, 91, 85, 72, 54, 32, 18, 12, 8
    ],
  },

  // 2. Tourist Attraction - Qutub Minar Complex
  {
    id: 'qutub-minar',
    name: 'Qutub Minar Archaeological Complex',
    category: 'Tourist Attraction',
    city: 'New Delhi',
    description: 'UNESCO World Heritage minaret and medieval monuments featuring delicate sandstone engravings and open courtyards.',
    image: '/src/assets/images/hero_city_crowd_1792237288801.jpg',
    waitingTime: null, // Test "Not enough data"
    typicalCrowdIndex: 58,
    typicalCrowdLevel: 'moderate',
    safetyStatus: 'clear',
    emergencyContacts: {
      police: '112 / 011-2685-2345',
      ambulance: '102',
      fire: '101',
      localHelpDesk: '011-2664-3856 (ASI Help Booth)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Paved stone ramps provide level access to iron pillar perimeter and main ticketing plaza.',
      parking: 'Paid municipal parking 200m from north gate.',
      entryNotes: 'QR ticketing line separate from physical token counter to streamline entry.',
    },
    verifiedIncidents: [],
    notices: [
      {
        id: 'not-qm-1',
        title: 'Ticket Counter Digital Payment Requirement',
        type: 'advisory',
        severity: 'low',
        description: 'ASI encourages contactless UPI or online slot booking. Physical cash counter has limited operating hours.',
        source: 'Archaeological Survey of India',
        lastUpdated: '2026-10-05',
      },
    ],
    hourlyWeekday: [
      3, 3, 3, 5, 8, 12, 20, 32, 44, 52, 58, 60, 56, 54, 60, 65, 62, 50, 36, 20, 10, 6, 4, 3
    ],
    hourlyWeekend: [
      5, 5, 5, 8, 14, 22, 34, 50, 68, 76, 80, 84, 80, 78, 85, 88, 82, 70, 52, 30, 16, 10, 6, 4
    ],
  },

  // 3. Shopping Mall - Phoenix Marketcity Galleria
  {
    id: 'phoenix-marketcity',
    name: 'Phoenix Marketcity Galleria',
    category: 'Shopping Mall',
    city: 'Mumbai',
    description: 'Expansive multi-level retail, entertainment, and dining hub with cinema megaplex and indoor family amusement zone.',
    image: '/src/assets/images/place_modern_mall_1792237289565.jpg',
    waitingTime: '15-20 mins (Parking & Food Court)',
    typicalCrowdIndex: 78,
    typicalCrowdLevel: 'high',
    safetyStatus: 'caution',
    emergencyContacts: {
      police: '100 / 022-2500-1234',
      ambulance: '108',
      fire: '101',
      localHelpDesk: '022-6180-1100 (Central Concierge)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Elevators connect all 4 retail levels and 2 basement parking levels. Wheelchairs available free of charge at concierge desk.',
      parking: 'Level P1 features 18 dedicated accessibility bays adjacent to elevator banks.',
      entryNotes: 'Automated bag scanners at Gates 1, 3, and 5.',
    },
    verifiedIncidents: [
      {
        id: 'inc-pm-1',
        date: '2026-10-02',
        type: 'Crowd Congestion',
        summary: 'Temporary queue choke point on Level 3 escalator during festival discount launch; cleared after security redirected pedestrian flow.',
        status: 'Resolved',
      },
    ],
    notices: [
      {
        id: 'not-pm-1',
        title: 'Parking Level P2 Temporary Resurfacing',
        type: 'advisory',
        severity: 'medium',
        description: 'Bay C and D under resurfacing. Expect 15-minute weekend delays for 4-wheeler parking entry via LBS Marg Gate.',
        source: 'Mall Facilities Management',
        lastUpdated: '2026-10-15',
      },
    ],
    hourlyWeekday: [
      2, 2, 2, 2, 3, 5, 8, 12, 20, 32, 42, 54, 58, 56, 58, 64, 70, 76, 78, 70, 52, 32, 14, 5
    ],
    hourlyWeekend: [
      4, 3, 2, 2, 4, 6, 12, 20, 35, 52, 68, 80, 86, 85, 88, 92, 96, 98, 92, 82, 60, 38, 18, 8
    ],
  },

  // 4. Shopping Mall - Ambience Mall Promenade
  {
    id: 'ambience-mall',
    name: 'Ambience Mall Promenade',
    category: 'Shopping Mall',
    city: 'Gurugram',
    description: 'Kilometer-long shopping arcade housing flagship global fashion stores, ice skating rink, and diverse culinary terrace.',
    image: '/src/assets/images/place_modern_mall_1792237289565.jpg',
    waitingTime: '10-15 mins',
    typicalCrowdIndex: 62,
    typicalCrowdLevel: 'moderate',
    safetyStatus: 'clear',
    emergencyContacts: {
      police: '112 / 0124-235-0011',
      ambulance: '108',
      fire: '101',
      localHelpDesk: '0124-466-5555',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Spacious high-capacity elevators in 3 wings (East, Central, West). Braille-equipped control panels.',
      parking: 'Over 4,000 multi-level slots with digital guidance indicators.',
      entryNotes: 'Security checks on NH-48 and service road entrances.',
    },
    verifiedIncidents: [],
    notices: [],
    hourlyWeekday: [
      2, 2, 2, 2, 3, 4, 6, 10, 18, 28, 40, 50, 52, 50, 52, 58, 65, 72, 74, 66, 48, 28, 12, 4
    ],
    hourlyWeekend: [
      3, 2, 2, 2, 3, 6, 10, 18, 30, 48, 65, 76, 82, 80, 84, 89, 93, 91, 86, 74, 52, 30, 14, 6
    ],
  },

  // 5. Temple - Meenakshi Amman Heritage Temple
  {
    id: 'meenakshi-temple',
    name: 'Meenakshi Amman Heritage Temple',
    category: 'Temple',
    city: 'Madurai',
    description: 'Ancient Dravidian spiritual sanctuary famed for towering gopurams encrusted with thousands of stucco sculptures and the sacred Golden Lotus tank.',
    image: '/src/assets/images/place_historic_temple_1792237290040.jpg',
    waitingTime: '45-90 mins (Darshan Queue)',
    typicalCrowdIndex: 82,
    typicalCrowdLevel: 'high',
    safetyStatus: 'alert',
    emergencyContacts: {
      police: '100 / 0452-234-5678',
      ambulance: '108',
      fire: '101',
      localHelpDesk: '0452-234-4360 (Temple Devasthanam)',
    },
    accessibilityInfo: {
      wheelchairAccessible: false,
      rampsElevators: 'Historic stone door thresholds and narrow corridors restrict standard wheelchairs. Special assistance battery carts available at East Gate.',
      parking: 'Vehicle restrictions within 500m ring road around the temple gopurams.',
      entryNotes: 'Strict dress code enforced (traditional attire). Mobile phones and smart watches strictly prohibited inside inner sanctum lockers.',
    },
    verifiedIncidents: [
      {
        id: 'inc-ma-1',
        date: '2026-10-09',
        type: 'Queue Surge',
        summary: 'Festival eve evening rush created bottleneck at South Tower exit; temple marshals opened supplementary north corridors to disperse crowd.',
        status: 'Resolved',
      },
    ],
    notices: [
      {
        id: 'not-ma-1',
        title: 'Festival Darshan Route Restrictions',
        type: 'restriction',
        severity: 'high',
        description: 'Special puja schedules active between 5 PM and 9 PM. Free queue lines may experience over 90-minute holding intervals.',
        source: 'Madurai Temple Administration',
        lastUpdated: '2026-10-16',
      },
      {
        id: 'not-ma-2',
        title: 'Locker Facility Modernization',
        type: 'notice',
        severity: 'low',
        description: 'New automated electronic locker kiosks installed at East Tower entrance.',
        source: 'Municipal Tourism Board',
        lastUpdated: '2026-10-10',
      },
    ],
    hourlyWeekday: [
      12, 10, 8, 14, 45, 68, 75, 78, 65, 48, 30, 20, 18, 18, 32, 54, 72, 85, 88, 80, 55, 30, 20, 14
    ],
    hourlyWeekend: [
      18, 14, 12, 22, 60, 82, 88, 92, 80, 62, 40, 25, 20, 22, 48, 72, 88, 96, 98, 90, 70, 42, 25, 18
    ],
  },

  // 6. Temple - Somnath Maritime Temple
  {
    id: 'somnath-temple',
    name: 'Somnath Maritime Temple',
    category: 'Temple',
    city: 'Veraval',
    description: 'First among the twelve sacred Jyotirlingas, situated on the rugged shores of the Arabian Sea with fortified stone walls and sea-view promenade.',
    image: '/src/assets/images/place_historic_temple_1792237290040.jpg',
    waitingTime: '20-35 mins',
    typicalCrowdIndex: 48,
    typicalCrowdLevel: 'moderate',
    safetyStatus: 'clear',
    emergencyContacts: {
      police: '100 / 02876-231-200',
      ambulance: '108',
      fire: '101',
      localHelpDesk: '02876-231-212 (Somnath Trust)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Ramped approach from security pavilion directly to Sabha Mandap. Trust provides escorted wheelchairs.',
      parking: 'Shuttle buses connect large pilgrimage parking lots 1 km away.',
      entryNotes: 'Security baggage screening and cloaking required for electronics.',
    },
    verifiedIncidents: [],
    notices: [
      {
        id: 'not-st-1',
        title: 'Evening Light & Sound Show Timing',
        type: 'notice',
        severity: 'low',
        description: 'Light and Sound show begins at 8:00 PM. Promenade access temporarily regulated between 7:45 PM and 8:45 PM.',
        source: 'Shree Somnath Trust',
        lastUpdated: '2026-10-08',
      },
    ],
    hourlyWeekday: [
      8, 6, 5, 12, 38, 54, 60, 58, 48, 36, 28, 22, 20, 22, 30, 44, 58, 68, 70, 62, 40, 22, 14, 10
    ],
    hourlyWeekend: [
      10, 8, 6, 18, 48, 66, 74, 72, 62, 50, 38, 30, 26, 30, 42, 60, 76, 84, 85, 76, 55, 30, 18, 12
    ],
  },

  // 7. Park - Cubbon Park Botanical Enclave
  {
    id: 'cubbon-park',
    name: 'Cubbon Park Botanical Enclave',
    category: 'Park',
    city: 'Bengaluru',
    description: '300-acre green lung in the heart of Bangalore featuring over 6,000 indigenous trees, bamboo groves, rose gardens, and colonial pavilions.',
    image: '/src/assets/images/place_urban_park_1792237290525.jpg',
    waitingTime: null, // Open park, no wait
    typicalCrowdIndex: 34,
    typicalCrowdLevel: 'low',
    safetyStatus: 'clear',
    emergencyContacts: {
      police: '112 / 080-2294-2222 (Cubbon Park Police Station)',
      ambulance: '108',
      fire: '101',
      localHelpDesk: '080-2286-4444 (Horticulture Department)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Flat asphalt and graded gravel avenues suitable for strollers, wheelchairs, and recreational mobility chairs.',
      parking: 'Limited parking on King\'s Road and Queen\'s Road perimeters.',
      entryNotes: 'Motorized vehicle traffic banned inside the park on weekends and public holidays.',
    },
    verifiedIncidents: [],
    notices: [
      {
        id: 'not-cp-1',
        title: 'Weekend Vehicle Free Zone Enforcement',
        type: 'advisory',
        severity: 'low',
        description: 'All interior vehicular thoroughfares remain strictly pedestrian-only from Saturday 5 AM through Monday 6 AM.',
        source: 'Bengaluru Traffic Police & Horticulture Dept',
        lastUpdated: '2026-10-14',
      },
    ],
    hourlyWeekday: [
      4, 4, 5, 12, 38, 65, 58, 40, 22, 16, 14, 15, 16, 15, 18, 26, 38, 52, 45, 28, 14, 8, 6, 4
    ],
    hourlyWeekend: [
      6, 6, 8, 20, 52, 84, 88, 76, 55, 38, 30, 28, 26, 28, 36, 54, 72, 80, 68, 42, 20, 12, 8, 6
    ],
  },

  // 8. Park - Sanjay Gandhi National Nature Reserve
  {
    id: 'sanjay-gandhi-park',
    name: 'Sanjay Gandhi National Nature Reserve',
    category: 'Park',
    city: 'Mumbai',
    description: 'Dense protected deciduous forest within municipal boundaries, hosting ancient Kanheri Caves, biodiversity trails, and tranquil reservoir streams.',
    image: '/src/assets/images/place_urban_park_1792237290525.jpg',
    waitingTime: '15-30 mins (Kanheri Shuttle & Safari)',
    typicalCrowdIndex: 38,
    typicalCrowdLevel: 'low',
    safetyStatus: 'caution',
    emergencyContacts: {
      police: '100 / 022-2886-0360 (Borivali Station)',
      ambulance: '108',
      fire: '101',
      localHelpDesk: '022-2886-0389 (Forest Control Room)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Main entry zone and picnic gardens are accessible. Upper Kanheri Cave steps have uneven terrain requiring assistance.',
      parking: 'Large shaded parking inside gate. Electric golf carts run to core attractions.',
      entryNotes: 'Plastic carry bags prohibited. Forest gates close strictly at 5:30 PM for wildlife protection.',
    },
    verifiedIncidents: [
      {
        id: 'inc-sg-1',
        date: '2026-09-28',
        type: 'Wildlife Sighting',
        summary: 'Leopard movement tracked near trail 3; trail temporarily cordoned off as routine precaution.',
        status: 'Resolved',
      },
    ],
    notices: [
      {
        id: 'not-sg-1',
        title: 'Hiking Trail 4 Monsoon Overgrowth Clearance',
        type: 'advisory',
        severity: 'medium',
        description: 'Clearance work underway near upper stream. Visitors requested to stay on marked safari road.',
        source: 'Maharashtra Forest Department',
        lastUpdated: '2026-10-11',
      },
    ],
    hourlyWeekday: [
      2, 2, 2, 4, 10, 25, 36, 32, 26, 24, 25, 26, 24, 22, 24, 28, 34, 30, 18, 8, 4, 3, 2, 2
    ],
    hourlyWeekend: [
      3, 3, 3, 8, 22, 48, 64, 68, 62, 58, 56, 54, 52, 50, 55, 62, 60, 45, 22, 10, 5, 4, 3, 3
    ],
  },

  // 9. Railway Station - Chhatrapati Shivaji Maharaj Terminus (CSMT)
  {
    id: 'csmt-station',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    category: 'Railway Station',
    city: 'Mumbai',
    description: 'High-volume historic railway terminal and UNESCO architectural masterpiece handling over 3 million daily suburban and interstate commuters.',
    image: '/src/assets/images/hero_city_crowd_1792237288801.jpg',
    waitingTime: '5-12 mins (Ticket counter)',
    typicalCrowdIndex: 94,
    typicalCrowdLevel: 'high',
    safetyStatus: 'alert',
    emergencyContacts: {
      police: '1512 / 139 (Railway Protection Force)',
      ambulance: '108 / 022-2262-0125',
      fire: '101',
      localHelpDesk: '022-2262-1248 (Station Superintendent)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Subway underpass features functional lifts and tactile paving connecting Platforms 1 to 18.',
      parking: 'Pick-up and drop-off taxi bays on Dr. D.N. Road with dedicated mobility lane.',
      entryNotes: 'Intense commuter surge during weekday rush hours (8:30-11:00 AM & 5:30-8:30 PM). RPF patrols on every concourse.',
    },
    verifiedIncidents: [
      {
        id: 'inc-cs-1',
        date: '2026-10-14',
        type: 'Platform Overcrowding',
        summary: 'Delayed suburban fast service led to brief platform crowding on Platform 4; auxiliary trains dispatched within 12 minutes.',
        status: 'Resolved',
      },
    ],
    notices: [
      {
        id: 'not-cs-1',
        title: 'Platform 5 & 6 Footbridge Widening Work',
        type: 'restriction',
        severity: 'high',
        description: 'Middle bridge partially barricaded for structural upgrade. Commuters advised to utilize North Foot Over Bridge.',
        source: 'Central Railway Mumbai Division',
        lastUpdated: '2026-10-16',
      },
    ],
    hourlyWeekday: [
      22, 16, 12, 18, 35, 62, 85, 96, 99, 88, 72, 68, 65, 66, 75, 88, 98, 99, 94, 82, 68, 52, 40, 28
    ],
    hourlyWeekend: [
      18, 12, 10, 14, 25, 42, 58, 68, 74, 72, 66, 64, 62, 64, 70, 76, 82, 84, 80, 72, 58, 44, 32, 22
    ],
  },

  // 10. Railway Station - New Delhi Central Railway Hub
  {
    id: 'new-delhi-station',
    name: 'New Delhi Central Railway Hub',
    category: 'Railway Station',
    city: 'New Delhi',
    description: 'Major railway junction connecting Delhi to all interstate corridors with 16 platforms, airport express metro interchange, and dual side entries (Pahar Ganj & Ajmeri Gate).',
    image: '/src/assets/images/hero_city_crowd_1792237288801.jpg',
    waitingTime: '8-15 mins',
    typicalCrowdIndex: 88,
    typicalCrowdLevel: 'high',
    safetyStatus: 'caution',
    emergencyContacts: {
      police: '139 / 011-2334-0000',
      ambulance: '102 / 108',
      fire: '101',
      localHelpDesk: '011-2334-1234 (Ajmeri Gate Helpdesk)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Escalators and lifts operational on central skywalk connecting all platforms.',
      parking: 'Multi-level car parking at Ajmeri Gate side with direct metro skywalk connection.',
      entryNotes: 'Baggage scanners installed at all entry portals. Keep physical or digital ticket ready for concourse access.',
    },
    verifiedIncidents: [],
    notices: [
      {
        id: 'not-nd-1',
        title: 'Platform Redevelopment Phasing Notice',
        type: 'advisory',
        severity: 'medium',
        description: 'Platforms 12 and 13 undergoing overhead canopy maintenance. Platform announcements updated 30 minutes in advance.',
        source: 'Northern Railway Operations',
        lastUpdated: '2026-10-13',
      },
    ],
    hourlyWeekday: [
      30, 24, 20, 25, 42, 64, 82, 92, 94, 86, 75, 72, 70, 72, 78, 86, 92, 95, 92, 84, 70, 58, 46, 36
    ],
    hourlyWeekend: [
      26, 20, 16, 20, 36, 52, 70, 80, 84, 82, 76, 74, 72, 74, 78, 84, 88, 90, 86, 78, 64, 50, 40, 30
    ],
  },

  // 11. Public Event - City International Book Fair Grounds
  {
    id: 'book-fair-grounds',
    name: 'City International Book Fair Grounds',
    category: 'Public Event',
    city: 'Kolkata',
    description: 'Annual literary congregation pavilion featuring hundreds of publishers, open-air cultural stages, author signings, and festival food streets.',
    image: '/src/assets/images/hero_city_crowd_1792237288801.jpg',
    waitingTime: '20-45 mins (Entry gates & popular stalls)',
    typicalCrowdIndex: 72,
    typicalCrowdLevel: 'high',
    safetyStatus: 'caution',
    emergencyContacts: {
      police: '100 / 033-2335-9999 (Salt Lake Police)',
      ambulance: '102 / 108',
      fire: '101 (Mobile Fire Tender stationed at Gate 2)',
      localHelpDesk: '033-2335-8000 (Organizers Pavilion)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Fairgrounds are flat with wooden ramp overlays across cable trenches. Wheelchair assistance booth at Gate 1.',
      parking: 'Designated festival parking grounds with shuttle e-rickshaws to Gate 4.',
      entryNotes: 'Free public entry. Security screening at all 9 perimeter gates.',
    },
    verifiedIncidents: [
      {
        id: 'inc-bf-1',
        date: '2026-10-15',
        type: 'Lost Child (Reunited)',
        summary: 'Lost child reported at Central Stage; reunited with parents within 8 minutes via PA system.',
        status: 'Resolved',
      },
    ],
    notices: [
      {
        id: 'not-bf-1',
        title: 'Peak Evening Pedestrian Advisory',
        type: 'advisory',
        severity: 'medium',
        description: 'Heavy crowds expected between 4:30 PM and 8:30 PM. Attendees advised to use Gate 7 for faster departure.',
        source: 'Publishers & Booksellers Guild',
        lastUpdated: '2026-10-16',
      },
    ],
    hourlyWeekday: [
      0, 0, 0, 0, 0, 0, 0, 0, 8, 18, 34, 48, 54, 52, 56, 68, 78, 84, 82, 65, 30, 8, 2, 0
    ],
    hourlyWeekend: [
      0, 0, 0, 0, 0, 0, 0, 0, 12, 28, 52, 68, 76, 75, 80, 90, 96, 98, 92, 74, 38, 12, 3, 0
    ],
  },

  // 12. Public Event - Annual Cultural Flea & Artisan Festival
  {
    id: 'artisan-flea-festival',
    name: 'Annual Cultural Flea & Artisan Festival',
    category: 'Public Event',
    city: 'Pune',
    description: 'Weekend open-air community gathering with local craft makers, live acoustic performances, organic food kiosks, and pottery workshops.',
    image: '/src/assets/images/hero_city_crowd_1792237288801.jpg',
    waitingTime: null, // "Not enough data"
    typicalCrowdIndex: 45,
    typicalCrowdLevel: 'moderate',
    safetyStatus: 'clear',
    emergencyContacts: {
      police: '112 / 020-2612-3344',
      ambulance: '108',
      fire: '101',
      localHelpDesk: '020-2550-1000 (Festival Helpdesk)',
    },
    accessibilityInfo: {
      wheelchairAccessible: true,
      rampsElevators: 'Gently graded open lawns with firm rolled turf pathways.',
      parking: 'Adjoining college grounds utilized for paid valet and self-parking.',
      entryNotes: 'Tickets verifiable via digital QR code scanner.',
    },
    verifiedIncidents: [],
    notices: [
      {
        id: 'not-af-1',
        title: 'Acoustic Stage Sound Curfew',
        type: 'notice',
        severity: 'low',
        description: 'Live musical performances conclude promptly at 10:00 PM per municipal sound regulation.',
        source: 'Pune Municipal Corporation',
        lastUpdated: '2026-10-10',
      },
    ],
    hourlyWeekday: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 18, 24, 28, 26, 30, 42, 50, 56, 52, 38, 18, 5, 0, 0
    ],
    hourlyWeekend: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 32, 48, 58, 55, 60, 72, 82, 85, 78, 58, 28, 8, 0, 0
    ],
  },
];
