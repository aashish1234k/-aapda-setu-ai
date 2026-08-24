import { 
  HazardRiskAssessment, 
  OfficialAlert, 
  Shelter, 
  HospitalFacility, 
  ReliefInventoryItem, 
  PriorityReliefZone, 
  InfrastructureDamageRecord, 
  PreventionRecommendation, 
  RoadSegment, 
  SOSRequest,
  RecoveryProgressData 
} from '../types/disaster';

export interface DistrictGeoData {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number]; // lat, lng
  population: number;
  activeHazard: string;
  riskScore: number;
  elevationMeters: number;
  riverBasin: string;
  annualRainfallMm: number;
}

export const INDIAN_DISTRICTS: DistrictGeoData[] = [
  {
    id: 'cachar_as',
    name: 'Cachar (Silchar)',
    state: 'Assam',
    coordinates: [24.8333, 92.7789],
    population: 1736617,
    activeHazard: 'Flood & Embankment Breach',
    riskScore: 86,
    elevationMeters: 22,
    riverBasin: 'Barak & Surma River System',
    annualRainfallMm: 3100
  },
  {
    id: 'kamrup_as',
    name: 'Kamrup Metropolitan (Guwahati)',
    state: 'Assam',
    coordinates: [26.1445, 91.7362],
    population: 1253938,
    activeHazard: 'Urban Flooding & Brahmaputra Surge',
    riskScore: 68,
    elevationMeters: 55,
    riverBasin: 'Brahmaputra Basin',
    annualRainfallMm: 2150
  },
  {
    id: 'puri_od',
    name: 'Puri',
    state: 'Odisha',
    coordinates: [19.8135, 85.8312],
    population: 1698730,
    activeHazard: 'Very Severe Cyclonic Storm "Varun"',
    riskScore: 82,
    elevationMeters: 4,
    riverBasin: 'Mahanadi Delta Coast',
    annualRainfallMm: 1450
  },
  {
    id: 'balasore_od',
    name: 'Balasore',
    state: 'Odisha',
    coordinates: [21.4934, 86.9135],
    population: 2317419,
    activeHazard: 'Storm Surge & Tidal Inundation',
    riskScore: 74,
    elevationMeters: 16,
    riverBasin: 'Subarnarekha River',
    annualRainfallMm: 1580
  },
  {
    id: 'chamoli_uk',
    name: 'Chamoli (Joshimath / Badrinath)',
    state: 'Uttarakhand',
    coordinates: [30.5562, 79.5667],
    population: 391605,
    activeHazard: 'Landslide, Slope Subsidence & Flash Flood',
    riskScore: 78,
    elevationMeters: 1890,
    riverBasin: 'Alaknanda River System',
    annualRainfallMm: 1230
  },
  {
    id: 'barmer_rj',
    name: 'Barmer',
    state: 'Rajasthan',
    coordinates: [25.7521, 71.3967],
    population: 2603751,
    activeHazard: 'Severe Heatwave (47.8°C) & Flash Drought',
    riskScore: 64,
    elevationMeters: 165,
    riverBasin: 'Luni River Basin',
    annualRainfallMm: 277
  },
  {
    id: 'east_delhi',
    name: 'East & North East Delhi',
    state: 'NCT of Delhi',
    coordinates: [28.6667, 77.2833],
    population: 2241624,
    activeHazard: 'Yamuna Floodplain Inundation & Urban Drain Backflow',
    riskScore: 71,
    elevationMeters: 213,
    riverBasin: 'Yamuna River Basin',
    annualRainfallMm: 790
  },
  {
    id: 'wayanad_kl',
    name: 'Wayanad (Meppadi)',
    state: 'Kerala',
    coordinates: [11.6854, 76.1320],
    population: 817420,
    activeHazard: 'Debris Flow & Intense Orographic Rain',
    riskScore: 84,
    elevationMeters: 750,
    riverBasin: 'Kabini & Chaliyar Basins',
    annualRainfallMm: 3400
  },
  {
    id: 'chennai_tn',
    name: 'Chennai Coastal Basin',
    state: 'Tamil Nadu',
    coordinates: [13.0827, 80.2707],
    population: 7088000,
    activeHazard: 'Northeast Monsoon Cloudburst & Micro-Basin Waterlogging',
    riskScore: 62,
    elevationMeters: 6,
    riverBasin: 'Adyar & Cooum River Basin',
    annualRainfallMm: 1400
  }
];

export const INITIAL_HAZARDS: Record<string, HazardRiskAssessment> = {
  flood: {
    hazard: 'flood',
    displayName: 'Monsoon Riverine & Flash Flood',
    score: 86,
    level: 'Critical',
    trend: 'rising',
    summary: 'Barak and Brahmaputra rivers flowing 1.84m above extreme danger mark. Massive embankment distress at Bethukandi, Silchar.',
    affectedDistricts: ['Cachar (Silchar)', 'Kamrup Met', 'Karimganj', 'Hailakandi', 'Morigaon'],
    factors: [
      { name: 'Rainfall Intensity (24h)', weight: 30, value: 92, contribution: 27.6, unit: 'mm (188mm)', statusText: 'Extremely Heavy', description: 'Continuous catchment precipitation over 48h' },
      { name: 'River Water Level vs Danger Mark', weight: 25, value: 94, contribution: 23.5, unit: 'm (+1.84m)', statusText: 'Severe Spate', description: 'Gauges at Annapurna Ghat breaching all-time highs' },
      { name: 'Soil Saturation & Runoff Index', weight: 15, value: 88, contribution: 13.2, unit: '% (91%)', statusText: 'Complete Saturation', description: 'Zero absorption capacity in alluvial floodplains' },
      { name: 'Low Elevation & Bowl Topography', weight: 10, value: 85, contribution: 8.5, unit: 'm AMSL (22m)', statusText: 'Vulnerable Bowl', description: 'Surrounded by higher hills leading to inward drainage' },
      { name: 'Historical Vulnerability Index', weight: 10, value: 90, contribution: 9.0, unit: 'Index (9.2/10)', statusText: 'Repeated Inundation', description: 'High flood recurrence history over last 20 years' },
      { name: '72-Hour IMD Forecast Trajectory', weight: 10, value: 82, contribution: 8.2, unit: 'Forecast', statusText: 'Widespread Rain', description: 'Monsoon trough active with moisture surge from Bay of Bengal' },
    ],
    suggestedAction: 'Immediate Stage-IV Evacuation to High Ground & Relief Camp mobilization. Deploy NDRF 1st Bn Boat Units.',
    lastUpdated: '10 mins ago (Live IMD/CWC Feed)',
    confidence: 94.2
  },
  cyclone: {
    hazard: 'cyclone',
    displayName: 'Tropical Cyclone & Storm Surge',
    score: 76,
    level: 'High',
    trend: 'rising',
    summary: 'Very Severe Cyclonic Storm "Varun" tracking NW towards Odisha coast. Sustained wind 145 km/h, gusting 165 km/h.',
    affectedDistricts: ['Puri', 'Balasore', 'Jagatsinghpur', 'Kendrapara', 'Ganjam'],
    factors: [
      { name: 'Maximum Sustained Wind Speed', weight: 35, value: 84, contribution: 29.4, unit: 'km/h (145 km/h)', statusText: 'VSCS Category', description: 'Doppler Radar confirms compact eye formation' },
      { name: 'Projected Storm Surge Height', weight: 25, value: 78, contribution: 19.5, unit: 'm (3.8m surge)', statusText: 'Dangerous Inundation', description: 'Astronomical high tide coinciding with landfall' },
      { name: 'Coastal Elevation & Ingress Vulnerability', weight: 15, value: 70, contribution: 10.5, unit: 'm (3-6m)', statusText: 'Low Coastal Zone', description: 'Flat delta coastline without natural reef barrier' },
      { name: 'Pre-Landfall Feeder Bands (Rain)', weight: 15, value: 75, contribution: 11.25, unit: 'mm/h (35mm/h)', statusText: 'Intense Downpour', description: 'Heavy squalls disrupting power & road mobility' },
      { name: 'Structural Kutcha House Density', weight: 10, value: 80, contribution: 8.0, unit: '% (42%)', statusText: 'High Vulnerability', description: 'High thatched/tin roof residential exposure' },
    ],
    suggestedAction: 'Enact Mandatory 5km Coastal Evacuation into Multi-Purpose Cyclone Shelters (MPCS). Suspend sea operations.',
    lastUpdated: '15 mins ago (IMD Cyclone Warning Center)',
    confidence: 91.8
  },
  landslide: {
    hazard: 'landslide',
    displayName: 'Hill Slope Subsidence & Debris Flow',
    score: 81,
    level: 'Critical',
    trend: 'rising',
    summary: 'Active slope movement detected along NH-07 Joshimath-Helang corridor and Meppadi hill slope. High pore water pressure.',
    affectedDistricts: ['Chamoli', 'Rudraprayag', 'Pithoragarh', 'Wayanad', 'Idukki'],
    factors: [
      { name: 'Antecedent Rainfall (72h Cumulative)', weight: 35, value: 88, contribution: 30.8, unit: 'mm (295mm)', statusText: 'Threshold Exceeded', description: 'Pore water pressure exceeds critical shear strength' },
      { name: 'Slope Gradient & Geological Fractures', weight: 25, value: 85, contribution: 21.25, unit: 'degrees (48°)', statusText: 'Steep Unstable Slope', description: 'Pre-existing tectonic shear zones in Lesser Himalayas' },
      { name: 'Vegetation Cover & Tree Loss', weight: 15, value: 72, contribution: 10.8, unit: '% Loss', statusText: 'Reduced Root Grip', description: 'Road widening cutting toe-slope stability' },
      { name: 'Seismic Micro-Tremor Activity', weight: 15, value: 65, contribution: 9.75, unit: 'M (2.4 micro)', statusText: 'Minor Shaking', description: 'Local micro-seismicity loosening weathered regolith' },
      { name: 'Human Settlement on Slope Terrace', weight: 10, value: 82, contribution: 8.2, unit: 'Density', statusText: 'High Exposure', description: 'Heavy multi-story load on uncompacted glacial till' },
    ],
    suggestedAction: 'Halt all vehicular traffic on NH-07. Evacuate 450 hillside families to Lower Helang Safe Camp.',
    lastUpdated: '22 mins ago (GSI & Wadia Institute)',
    confidence: 89.4
  },
  heatwave: {
    hazard: 'heatwave',
    displayName: 'Extreme Heatwave & Wet-Bulb Stress',
    score: 64,
    level: 'High',
    trend: 'stable',
    summary: 'Severe heatwave conditions with maximum temperatures hovering at 47.8°C. Wet-bulb index reaching 31.2°C.',
    affectedDistricts: ['Barmer', 'Churu', 'Bikaner', 'Nagaur', 'Kachchh'],
    factors: [
      { name: 'Max Ambient Air Temp', weight: 40, value: 75, contribution: 30.0, unit: '°C (47.8°C)', statusText: 'Severe Heatwave', description: '5.4°C above climatological normal for 4th consecutive day' },
      { name: 'Wet-Bulb Temperature & Humidity Stress', weight: 25, value: 60, contribution: 15.0, unit: '°C (31.2°C)', statusText: 'High Physiological Risk', description: 'Reduced evaporative cooling capacity for outdoor workers' },
      { name: 'Urban Heat Island & Thermal Inversion', weight: 20, value: 55, contribution: 11.0, unit: 'Thermal Index', statusText: 'Elevated Night Temps', description: 'Night minimums remaining above 32.5°C' },
      { name: 'Potable Water Distribution Deficit', weight: 15, value: 58, contribution: 8.7, unit: '% deficit', statusText: 'Water Scarcity', description: 'Groundwater depletion in rural hamlets' },
    ],
    suggestedAction: 'Issue Red Heat Warning. Enforce mandatory mid-day outdoor work ban (11 AM - 4 PM) and deploy water tankers.',
    lastUpdated: '1 hour ago (IMD Climate Center)',
    confidence: 96.0
  },
  drought: {
    hazard: 'drought',
    displayName: 'Agricultural & Hydrological Drought',
    score: 52,
    level: 'Moderate',
    trend: 'stable',
    summary: 'Standardized Precipitation Index (SPI) shows moderate moisture deficit. Reservoir storage at 38% capacity.',
    affectedDistricts: ['Marathwada', 'Rayalaseema', 'Barmer', 'Bundelkhand'],
    factors: [
      { name: 'Precipitation Deficit vs Long Period Avg', weight: 35, value: 58, contribution: 20.3, unit: '% (-42%)', statusText: 'Deficit Monsoon', description: 'Consecutive dry spells during critical kharif sowing' },
      { name: 'Reservoir Live Storage Capacity', weight: 30, value: 62, contribution: 18.6, unit: '% full (38%)', statusText: 'Below Normal', description: 'Central Water Commission reservoir telemetry' },
      { name: 'Normalized Difference Vegetation Index', weight: 20, value: 45, contribution: 9.0, unit: 'NDVI (0.24)', statusText: 'Crop Stress', description: 'Vegetation vigor anomaly captured via ISRO satellite' },
      { name: 'Groundwater Table Fall Depth', weight: 15, value: 48, contribution: 7.2, unit: 'm bgl (-4.2m)', statusText: 'Depleting Aquifer', description: 'Over-extraction for protective irrigation' },
    ],
    suggestedAction: 'Release emergency canal roster for standing crops. Arrange fodder depots and cattle camps.',
    lastUpdated: 'Today, 08:00 AM (Mahalanobis Crop Center)',
    confidence: 88.0
  },
  earthquake_hazard: {
    hazard: 'earthquake_hazard',
    displayName: 'Seismic Hazard & Structural Vulnerability',
    score: 72,
    level: 'High',
    trend: 'stable',
    summary: 'Zone V High-Hazard Seismic Assessment. Evaluates non-ductile masonry vulnerability and unreinforced structures. (Note: Not an earthquake prediction).',
    affectedDistricts: ['Chamoli', 'Kangra', 'Guwahati', 'Kutch', 'North Bihar'],
    factors: [
      { name: 'BIS Seismic Zone Classification', weight: 35, value: 90, contribution: 31.5, unit: 'Zone (V)', statusText: 'Maximum Hazard Zone', description: 'Peak Ground Acceleration (PGA) expected > 0.36g' },
      { name: 'Non-Engineered Masonry Exposure', weight: 25, value: 78, contribution: 19.5, unit: '% (68%)', statusText: 'High Vulnerability', description: 'Pre-code unreinforced stone and brick structures' },
      { name: 'Historical Fault Proximity (Main Central Thrust)', weight: 20, value: 82, contribution: 16.4, unit: 'km (< 8km)', statusText: 'Active Fault Trace', description: 'Active Himalayan deformation front' },
      { name: 'Soil Liquefaction Susceptibility', weight: 20, value: 62, contribution: 12.4, unit: 'Liquefaction Index', statusText: 'Moderate in Valley', description: 'Loose saturated alluvial deposits along riverbanks' },
    ],
    suggestedAction: 'Enforce structural audit of lifeline hospitals and schools. Audit retrofitting and preposition rescue equipment.',
    lastUpdated: 'Static Baseline (NDMA/NCS Seismic Hazard Microzonation)',
    confidence: 92.5
  },
  extreme_rainfall: {
    hazard: 'extreme_rainfall',
    displayName: 'Mesoscale Cloudburst & Extreme Rainfall',
    score: 88,
    level: 'Critical',
    trend: 'rising',
    summary: 'Doppler Weather Radar (DWR) indicates convective rainstorm cell delivering > 75mm/hour over localized sub-catchments.',
    affectedDistricts: ['Kamrup', 'Cachar', 'Wayanad', 'Dehradun', 'Mumbai Suburban'],
    factors: [
      { name: 'Radar Reflectivity (dBZ)', weight: 40, value: 92, contribution: 36.8, unit: 'dBZ (56 dBZ)', statusText: 'Severe Convective Cell', description: 'Heavy precipitation core with high vertical extent' },
      { name: 'Precipitable Water Content', weight: 25, value: 86, contribution: 21.5, unit: 'kg/m² (64 kg/m²)', statusText: 'Extreme Moisture Load', description: 'Atmospheric column saturated with monsoon moisture' },
      { name: 'Orographic Uplift Gradient', weight: 20, value: 85, contribution: 17.0, unit: 'Slope (Steep)', statusText: 'Forced Ascent', description: 'Moist winds forced up steep mountain terrain' },
      { name: 'Storm Translation Speed (Stagnancy)', weight: 15, value: 82, contribution: 12.3, unit: 'km/h (< 10km/h)', statusText: 'Nearly Stationary', description: 'Prolonged downpour concentrated over single micro-basin' },
    ],
    suggestedAction: 'Issue Instant Hyperlocal Flash Flood Warning. Advise citizens to vacate low-lying basements and riverbanks.',
    lastUpdated: '5 mins ago (IMD DWR Nowcast)',
    confidence: 95.5
  },
  urban_flooding: {
    hazard: 'urban_flooding',
    displayName: 'Urban Drainage Inundation & Sump Overload',
    score: 79,
    level: 'High',
    trend: 'rising',
    summary: 'Impervious urban surface runoff overwhelmed storm drainage trunk lines. Severe waterlogging at 14 arterial junctions.',
    affectedDistricts: ['Guwahati', 'East Delhi', 'Chennai', 'Bengaluru Urban', 'Mumbai'],
    factors: [
      { name: 'Impervious Surface Ratio', weight: 30, value: 88, contribution: 26.4, unit: '% (84%)', statusText: 'Near-Total Paving', description: 'Loss of natural retention ponds, wetlands and open soil' },
      { name: 'Storm Drain Capacity vs Inflow', weight: 30, value: 82, contribution: 24.6, unit: 'Surplus Inflow (220%)', statusText: 'Critical Choke', description: 'Trunk drains silted and throttled at outfalls' },
      { name: 'Tidal / River Backflow at Outfall Gates', weight: 20, value: 75, contribution: 15.0, unit: 'High Outfall Head', statusText: 'Sluice Gates Shut', description: 'River flood stage preventing gravity outfall discharge' },
      { name: 'Sub-Underpass & Low Ward Exposure', weight: 20, value: 70, contribution: 14.0, unit: '14 Critical Points', statusText: 'High Risk', description: 'Vehicles and electrical substations exposed to flooding' },
    ],
    suggestedAction: 'Deploy high-capacity dewatering pumps (500 HP). Divert arterial traffic away from underpasses.',
    lastUpdated: '12 mins ago (Municipal SCADA Sensors)',
    confidence: 90.0
  },
  lightning_storm: {
    hazard: 'lightning_storm',
    displayName: 'Severe Thunderstorm & High-Density Lightning',
    score: 65,
    level: 'High',
    trend: 'declining',
    summary: 'DAMINI / IITM sensor network detects 480 cloud-to-ground strikes within 25km radius over last 30 minutes.',
    affectedDistricts: ['Kamrup', 'Cachar', 'Mayurbhanj', 'Ranchi', 'Gaya'],
    factors: [
      { name: 'Cloud-to-Ground Strike Frequency', weight: 45, value: 72, contribution: 32.4, unit: 'strikes/min (16/min)', statusText: 'Intense Activity', description: 'High electrical charge gradient in cumulonimbus anvil' },
      { name: 'Convective Available Potential Energy (CAPE)', weight: 30, value: 68, contribution: 20.4, unit: 'J/kg (2850 J/kg)', statusText: 'High Instability', description: 'Strong atmospheric updrafts driving charge separation' },
      { name: 'Open Field / Farm Labor Exposure', weight: 25, value: 62, contribution: 15.5, unit: 'Vulnerability %', statusText: 'Outdoor Population', description: 'High agricultural presence in open paddy fields' },
    ],
    suggestedAction: 'Broadcast Damini alert to rural panchayats: Take immediate indoor shelter; avoid trees and electric poles.',
    lastUpdated: '8 mins ago (IITM Lightning Network)',
    confidence: 93.0
  }
};

export const INITIAL_OFFICIAL_ALERTS: OfficialAlert[] = [
  {
    id: 'CAP-IN-AS-2026-0824-001',
    hazard: 'flood',
    title: 'RED ALERT: Extreme Riverine Flooding & Embankment Breach in Cachar',
    severity: 'Critical',
    issuingAuthority: 'National Disaster Management Authority (NDMA) / Assam SDMA',
    sourceProtocol: 'CAP-v1.2',
    location: 'Silchar & Cachar District',
    state: 'Assam',
    coordinates: [24.8333, 92.7789],
    radiusKm: 35,
    timestamp: '2026-08-24 13:30 IST',
    validUntil: '2026-08-25 18:00 IST',
    recommendedAction: 'Mandatory evacuation of low-lying wards. Move immediately to notified government relief shelters.',
    isOfficial: true,
    instructions: [
      'Turn off main electricity switches and gas valves before leaving home.',
      'Do not attempt to wade, drive or swim through flowing floodwater.',
      'Keep emergency go-bag (medicines, documents, torch, drinking water) with you.',
      'Follow marked green evacuation corridors to Government Higher Secondary School Shelter.'
    ],
    broadcastChannels: ['CAP', 'SACHET', 'SMS', 'Voice', 'App_Push', 'Siren']
  },
  {
    id: 'CAP-IN-OD-2026-0824-002',
    hazard: 'cyclone',
    title: 'ORANGE WARNING: Cyclonic Storm "Varun" Approaching Puri Coast',
    severity: 'High',
    issuingAuthority: 'India Meteorological Department (IMD) / Odisha SDMA (OSDMA)',
    sourceProtocol: 'SACHET',
    location: 'Puri & Coastal Odisha',
    state: 'Odisha',
    coordinates: [19.8135, 85.8312],
    radiusKm: 50,
    timestamp: '2026-08-24 12:45 IST',
    validUntil: '2026-08-26 06:00 IST',
    recommendedAction: 'Total suspension of fishing operations. Shift vulnerable coastal populations to Multi-Purpose Cyclone Shelters.',
    isOfficial: true,
    instructions: [
      'Board up glass windows and secure loose rooftop sheets.',
      'Charge communication devices and power banks fully.',
      'Stay away from old trees, transmission towers, and high-tension lines.'
    ],
    broadcastChannels: ['CAP', 'SACHET', 'SMS', 'App_Push']
  },
  {
    id: 'CAP-IN-UK-2026-0824-003',
    hazard: 'landslide',
    title: 'FLASH FLOOD & LANDSLIDE WARNING: Joshimath-Helang Axis',
    severity: 'High',
    issuingAuthority: 'Uttarakhand State Disaster Management Authority (USDMA)',
    sourceProtocol: 'CAP-v1.2',
    location: 'Chamoli District',
    state: 'Uttarakhand',
    coordinates: [30.5562, 79.5667],
    radiusKm: 25,
    timestamp: '2026-08-24 11:15 IST',
    validUntil: '2026-08-25 12:00 IST',
    recommendedAction: 'All pilgrimage & heavy vehicle movement halted on Badrinath National Highway NH-07.',
    isOfficial: true,
    instructions: [
      'Stay alert to sudden muddy stream surges, rattling boulders, or unusual ground cracks.',
      'Relocate from toe-slope settlements to designated safe camp.'
    ],
    broadcastChannels: ['SMS', 'Voice', 'App_Push']
  }
];

export const INITIAL_SHELTERS: Shelter[] = [
  {
    id: 'SH-AS-01',
    name: 'Silchar Govt Higher Secondary School Relief Camp',
    type: 'School',
    district: 'Cachar',
    state: 'Assam',
    coordinates: [24.8380, 92.7840],
    capacity: 650,
    occupied: 482,
    available: 168,
    distanceKm: 1.8,
    status: 'Active',
    supplies: {
      foodAvailability: 'Adequate',
      waterAvailability: 'Abundant',
      medicalSupport: true,
      powerBackup: true,
      internetConnectivity: true,
      wheelchairAccessible: true,
      childCareSafeSpace: true,
      generatorFuelHours: 36
    },
    contactPerson: 'Smt. R. Borah (Relief In-Charge)',
    contactPhone: '+91 94350-12845'
  },
  {
    id: 'SH-AS-02',
    name: 'District Indoor Sports Stadium Relief Hub',
    type: 'Stadium',
    district: 'Cachar',
    state: 'Assam',
    coordinates: [24.8210, 92.7915],
    capacity: 1200,
    occupied: 940,
    available: 260,
    distanceKm: 2.6,
    status: 'Active',
    supplies: {
      foodAvailability: 'Abundant',
      waterAvailability: 'Abundant',
      medicalSupport: true,
      powerBackup: true,
      internetConnectivity: true,
      wheelchairAccessible: true,
      childCareSafeSpace: true,
      generatorFuelHours: 48
    },
    contactPerson: 'Col. K. Das (NDRF Liaison)',
    contactPhone: '+91 94351-88210'
  },
  {
    id: 'SH-AS-03',
    name: 'Tarapur Community Hall Emergency Shelter',
    type: 'Community_Hall',
    district: 'Cachar',
    state: 'Assam',
    coordinates: [24.8450, 92.7680],
    capacity: 400,
    occupied: 395,
    available: 5,
    distanceKm: 3.4,
    status: 'Full',
    supplies: {
      foodAvailability: 'Adequate',
      waterAvailability: 'Critical_Low',
      medicalSupport: false,
      powerBackup: true,
      internetConnectivity: false,
      wheelchairAccessible: false,
      childCareSafeSpace: false,
      generatorFuelHours: 12
    },
    contactPerson: 'Shri B. Deb',
    contactPhone: '+91 94352-77190'
  },
  {
    id: 'SH-OD-01',
    name: 'Puri Multi-Purpose Cyclone Shelter (MPCS-04)',
    type: 'Cyclone_Center',
    district: 'Puri',
    state: 'Odisha',
    coordinates: [19.8250, 85.8450],
    capacity: 1500,
    occupied: 860,
    available: 640,
    distanceKm: 4.1,
    status: 'Active',
    supplies: {
      foodAvailability: 'Abundant',
      waterAvailability: 'Abundant',
      medicalSupport: true,
      powerBackup: true,
      internetConnectivity: true,
      wheelchairAccessible: true,
      childCareSafeSpace: true,
      generatorFuelHours: 72
    },
    contactPerson: 'Shri A. Mohanty (OSDMA)',
    contactPhone: '+91 94370-44912'
  }
];

export const INITIAL_HOSPITALS: HospitalFacility[] = [
  {
    id: 'HOSP-AS-01',
    name: 'Silchar Medical College & Hospital (SMCH)',
    district: 'Cachar',
    state: 'Assam',
    coordinates: [24.8140, 92.7980],
    totalBeds: 850,
    availableBeds: 114,
    icuTotal: 80,
    icuAvailable: 12,
    emergencyTotal: 60,
    emergencyAvailable: 9,
    oxygenCylinderStock: 280,
    activeAmbulances: 18,
    availableAmbulances: 4,
    medicalTeamsOnDuty: 24,
    medicineStockStatus: 'Adequate',
    casualtyTriage: {
      reported: 142,
      underVerification: 28,
      verified: 114,
      criticalTreated: 34,
      referred: 8,
      deathsReported: 7,
      deathsVerified: 4
    }
  },
  {
    id: 'HOSP-AS-02',
    name: 'Cachar Civil Hospital (SM Dev Hospital)',
    district: 'Cachar',
    state: 'Assam',
    coordinates: [24.8290, 92.7810],
    totalBeds: 320,
    availableBeds: 26,
    icuTotal: 25,
    icuAvailable: 2,
    emergencyTotal: 30,
    emergencyAvailable: 4,
    oxygenCylinderStock: 95,
    activeAmbulances: 8,
    availableAmbulances: 1,
    medicalTeamsOnDuty: 10,
    medicineStockStatus: 'Adequate',
    casualtyTriage: {
      reported: 76,
      underVerification: 14,
      verified: 62,
      criticalTreated: 18,
      referred: 12,
      deathsReported: 3,
      deathsVerified: 2
    }
  },
  {
    id: 'HOSP-OD-01',
    name: 'District Headquarter Hospital (DHH) Puri',
    district: 'Puri',
    state: 'Odisha',
    coordinates: [19.8190, 85.8280],
    totalBeds: 450,
    availableBeds: 185,
    icuTotal: 40,
    icuAvailable: 18,
    emergencyTotal: 45,
    emergencyAvailable: 22,
    oxygenCylinderStock: 320,
    activeAmbulances: 14,
    availableAmbulances: 8,
    medicalTeamsOnDuty: 16,
    medicineStockStatus: 'Good',
    casualtyTriage: {
      reported: 38,
      underVerification: 9,
      verified: 29,
      criticalTreated: 6,
      referred: 2,
      deathsReported: 1,
      deathsVerified: 1
    }
  }
];

export const INITIAL_RELIEF_INVENTORY: ReliefInventoryItem[] = [
  { id: 'REL-01', name: 'Ready-to-Eat Food Packets (MRE / Poha / Biscuits)', category: 'Food', unit: 'Packets', available: 45000, allocated: 38000, distributed: 28400, required: 60000, reorderLevel: 15000 },
  { id: 'REL-02', name: 'Potable Drinking Water Pouches (500ml)', category: 'Water', unit: 'Pouches', available: 120000, allocated: 105000, distributed: 86000, required: 150000, reorderLevel: 30000 },
  { id: 'REL-03', name: 'Halogen Water Purification Tablets (100-pack)', category: 'Water', unit: 'Boxes', available: 8500, allocated: 6200, distributed: 5100, required: 12000, reorderLevel: 2500 },
  { id: 'REL-04', name: 'Emergency Trauma & Essential First Aid Kits', category: 'Medical', unit: 'Kits', available: 3200, allocated: 2800, distributed: 2150, required: 4500, reorderLevel: 800 },
  { id: 'REL-05', name: 'ORS & Anti-Diarrheal Medical Sachets', category: 'Medical', unit: 'Packs', available: 25000, allocated: 22000, distributed: 18400, required: 35000, reorderLevel: 6000 },
  { id: 'REL-06', name: 'Woolen Blankets & Thermal Mats', category: 'Shelter_Supplies', unit: 'Units', available: 14000, allocated: 11500, distributed: 9800, required: 18000, reorderLevel: 3500 },
  { id: 'REL-07', name: 'Family Emergency Waterproof Tarpaulin Tents', category: 'Shelter_Supplies', unit: 'Tents', available: 4200, allocated: 3600, distributed: 2900, required: 6000, reorderLevel: 1000 },
  { id: 'REL-08', name: 'Inflatable Motorized Rescue Boats (OED)', category: 'Rescue_Gear', unit: 'Boats', available: 48, allocated: 44, distributed: 44, required: 60, reorderLevel: 10 },
  { id: 'REL-09', name: 'Heavy-Duty Silent Diesel Generators (15 kVA)', category: 'Power_Fuel', unit: 'Units', available: 65, allocated: 58, distributed: 52, required: 80, reorderLevel: 15 },
  { id: 'REL-10', name: 'High-Density Diesel & Petrol Jerry Cans (20L)', category: 'Power_Fuel', unit: 'Cans', available: 1800, allocated: 1600, distributed: 1350, required: 2500, reorderLevel: 400 }
];

export const INITIAL_PRIORITY_ZONES: PriorityReliefZone[] = [
  {
    zoneName: 'Rangirkhari & Public School Road',
    district: 'Cachar',
    populationAffected: 14500,
    riskScore: 91,
    roadAccessStatus: 'Partially_Submerged',
    reliefDeficitRatio: 42,
    aiRationale: [
      'High density of elderly population and children trapped on first-floor roofs',
      'Water ingress height reaching 1.8 meters with power transformer submersions',
      'High-clearance 4x4 relief trucks and motorized dinghy access currently feasible',
      'Immediate requirement for baby food, chlorine tablets, and dry ration kits'
    ],
    recommendedSupplies: [
      { item: 'Food Packets', quantity: '3,500 units' },
      { item: 'Water Pouches', quantity: '12,000 pouches' },
      { item: 'First Aid & ORS', quantity: '800 kits' },
      { item: 'Rescue Boats', quantity: '4 units' }
    ]
  },
  {
    zoneName: 'Bethukandi Embankment Fringe Villages',
    district: 'Cachar',
    populationAffected: 22000,
    riskScore: 96,
    roadAccessStatus: 'Air_Drop_Only',
    reliefDeficitRatio: 68,
    aiRationale: [
      'Direct breach point of river dyke causing sudden current velocity (> 2.5 m/s)',
      'All connecting culverts severed; surface vehicular ingress completely blocked',
      'Drone reconnaissance identifies 120 stranded clusters requiring airdrop or heavy OBM boats',
      'Critical risk of waterborne infection outbreaks if clean water is delayed > 12h'
    ],
    recommendedSupplies: [
      { item: 'Air-droppable MRE Food', quantity: '6,000 units' },
      { item: 'Chlorine / Water Packs', quantity: '25,000 pouches' },
      { item: 'Life Jackets', quantity: '500 units' }
    ]
  },
  {
    zoneName: 'Tarapur Railway Colony & Station Road',
    district: 'Cachar',
    populationAffected: 9800,
    riskScore: 78,
    roadAccessStatus: '4x4_Only',
    reliefDeficitRatio: 28,
    aiRationale: [
      'Rail tracks partially submerged; track bed serves as makeshift dry refuge',
      'Relief camp established at Tarapur School nearing 99% capacity overload',
      'Requires immediate medical triage team for foot rot and fever cases'
    ],
    recommendedSupplies: [
      { item: 'Tarpaulin Tents', quantity: '400 units' },
      { item: 'Blankets', quantity: '1,200 units' },
      { item: 'Medical Team Mobile Unit', quantity: '2 teams' }
    ]
  }
];

export const INITIAL_DAMAGE_RECORDS: InfrastructureDamageRecord[] = [
  { id: 'DMG-01', sector: 'Buildings', estimatedDamagedUnits: 14200, confirmedDamagedUnits: 8450, underAssessmentUnits: 5750, unitLabel: 'Houses / Structures', estimatedCostCrores: 142.5, status: 'Work_In_Progress', progressPercentage: 35 },
  { id: 'DMG-02', sector: 'Roads_Highways', estimatedDamagedUnits: 184, confirmedDamagedUnits: 122, underAssessmentUnits: 62, unitLabel: 'Kilometers of Road', estimatedCostCrores: 88.0, status: 'Work_In_Progress', progressPercentage: 54 },
  { id: 'DMG-03', sector: 'Bridges', estimatedDamagedUnits: 18, confirmedDamagedUnits: 12, underAssessmentUnits: 6, unitLabel: 'Bridges / Culverts', estimatedCostCrores: 64.2, status: 'Work_In_Progress', progressPercentage: 28 },
  { id: 'DMG-04', sector: 'Power_Grid', estimatedDamagedUnits: 340, confirmedDamagedUnits: 280, underAssessmentUnits: 60, unitLabel: 'Transformers & Feeders', estimatedCostCrores: 45.0, status: 'Work_In_Progress', progressPercentage: 68 },
  { id: 'DMG-05', sector: 'Water_Supply', estimatedDamagedUnits: 52, confirmedDamagedUnits: 38, underAssessmentUnits: 14, unitLabel: 'Piped Water Schemes', estimatedCostCrores: 31.8, status: 'Work_In_Progress', progressPercentage: 45 },
  { id: 'DMG-06', sector: 'Schools', estimatedDamagedUnits: 86, confirmedDamagedUnits: 64, underAssessmentUnits: 22, unitLabel: 'School Buildings', estimatedCostCrores: 24.0, status: 'Tender_Issued', progressPercentage: 22 },
  { id: 'DMG-07', sector: 'Hospitals', estimatedDamagedUnits: 12, confirmedDamagedUnits: 8, underAssessmentUnits: 4, unitLabel: 'PHC / CHC Centers', estimatedCostCrores: 18.5, status: 'Work_In_Progress', progressPercentage: 81 },
  { id: 'DMG-08', sector: 'Agriculture', estimatedDamagedUnits: 28500, confirmedDamagedUnits: 21000, underAssessmentUnits: 7500, unitLabel: 'Hectares of Crop Land', estimatedCostCrores: 195.0, status: 'Under_Assessment', progressPercentage: 15 }
];

export const INITIAL_RECOVERY_DATA: RecoveryProgressData = {
  overallScore: 68, // dynamically recalculates
  domains: {
    infrastructure: 72,
    healthcare: 81,
    roadConnectivity: 54,
    reliefDistribution: 76
  },
  weights: {
    infrastructure: 0.30,
    healthcare: 0.20,
    roadConnectivity: 0.25,
    reliefDistribution: 0.25
  },
  affectedPopulationTotal: 185000,
  populationRestoredNormalcy: 118400,
  roadsRestoredKm: 122,
  roadsDamagedKm: 184,
  activeSheltersRemaining: 18,
  sheltersDecommissioned: 14,
  milestones: [
    { dayLabel: 'Day 0', phaseTitle: 'Disaster Strike & Early Alert', description: 'Real-time warning issued, SAR triggered, emergency response activated.', progress: 100, status: 'completed' },
    { dayLabel: 'Day 1', phaseTitle: 'Search & Rescue Peak', description: 'NDRF/SDRF deployed, 4,200+ citizens evacuated from critical flood pockets.', progress: 100, status: 'completed' },
    { dayLabel: 'Day 2', phaseTitle: 'Emergency Relief & Camp Influx', description: 'All major relief camps operational with drinking water and cooked rations.', progress: 95, status: 'completed' },
    { dayLabel: 'Day 4', phaseTitle: 'Arterial Road & Power Restoration', description: 'Emergency Bailey bridge deployed on NH-37; 68% power feeder restoration.', progress: 65, status: 'in_progress' },
    { dayLabel: 'Day 7', phaseTitle: 'Hospital Stabilization & Disease Surveillance', description: 'Mobile health camps active; vector control and chlorine disinfection under way.', progress: 50, status: 'in_progress' },
    { dayLabel: 'Day 14', phaseTitle: 'De-inundation & Shelter Transition', description: 'High-power pumps clearing standing water; families transitioning back home.', progress: 30, status: 'in_progress' },
    { dayLabel: 'Day 30', phaseTitle: 'Permanent Reconstruction & Prevention Policy', description: 'Disbursement of crop compensation and structural flood mitigation upgrades.', progress: 15, status: 'pending' }
  ]
};

export const INITIAL_PREVENTION_RECOMMENDATIONS: PreventionRecommendation[] = [
  {
    id: 'PREV-01',
    hazard: 'flood',
    district: 'Cachar (Silchar)',
    vulnerabilityFactor: 'Siltation of Barak Riverbed & Sluice Gate Dysfunctions',
    rootCauseAnalysis: [
      'Unchecked catchment deforestation in upstream hills causing heavy sediment yield (4.2M tons/year)',
      'Encroachment of natural retention wetlands (Beels and Anua) due to rapid urban expansion',
      'Aging Bethukandi sluice gate lacking automated SCADA backflow prevention sensors',
      'Inadequate municipal storm drainage slope preventing gravity outfall during high river stage'
    ],
    recommendedInterventions: [
      {
        title: 'Construct 18.5 km Reinforced Geo-Textile River Embankment',
        description: 'Armored embankment with deep sheet piling along vulnerable river curves to withstand 100-year flood discharge.',
        estimatedCostCrores: 85.0,
        timeToImplementMonths: 14,
        projectedRiskReductionPercent: 42
      },
      {
        title: 'SCADA-Automated Sluice Gate System with 4000 HP Dewatering Station',
        description: 'Smart sensors that close sluice gates automatically when river rises and activate high-head centrifugal pumps.',
        estimatedCostCrores: 34.5,
        timeToImplementMonths: 8,
        projectedRiskReductionPercent: 28
      },
      {
        title: 'Wetland (Beel) Rejuvenation & Urban Canal Demarcation',
        description: 'Deepen 4 critical urban wetlands to restore 12 million cubic meters of natural flood sponge capacity.',
        estimatedCostCrores: 22.0,
        timeToImplementMonths: 12,
        projectedRiskReductionPercent: 19
      }
    ],
    policyActionRequired: 'Enforce strict 100m No-Construction Buffer along Barak Riverbank and notify wetland conservation zones.',
    responsibleAgency: 'Assam Water Resources Dept & Guwahati Metropolitan Development Authority'
  },
  {
    id: 'PREV-02',
    hazard: 'landslide',
    district: 'Chamoli (Joshimath)',
    vulnerabilityFactor: 'Slope Toe-Erosion, Saturated Seepage & Unregulated Construction',
    rootCauseAnalysis: [
      'Alaknanda river undercutting toe of ancient glacial moraine slope',
      'Absence of organized domestic wastewater and stormwater drainage resulting in underground piping/cavity erosion',
      'Multi-story commercial constructions exceeding bearing capacity of unstratified scree material'
    ],
    recommendedInterventions: [
      {
        title: 'Toe-Protection Reinforced Gabion Wall with Deep Rock Anchors',
        description: 'Construct 4.2 km flexible reinforced concrete and wire-mesh gabion revetments along river edge.',
        estimatedCostCrores: 48.0,
        timeToImplementMonths: 10,
        projectedRiskReductionPercent: 38
      },
      {
        title: 'Comprehensive Subsurface Horizontal Drainage System',
        description: 'Drill perforated horizontal drainage drains into hillside to relieve hydrostatic pore water pressure.',
        estimatedCostCrores: 18.0,
        timeToImplementMonths: 6,
        projectedRiskReductionPercent: 31
      }
    ],
    policyActionRequired: 'Mandate micro-zonation building code bylaws and moratorium on heavy construction in subsidence sectors.',
    responsibleAgency: 'Uttarakhand PWD & National Institute of Rock Mechanics'
  }
];

export const INITIAL_ROAD_SEGMENTS: RoadSegment[] = [
  { id: 'RD-01', name: 'Silchar-Kumbhirgram Airport Road', from: 'Rangirkhari Junction', to: 'Airport Circle', coordinates: [[24.8333, 92.7789], [24.9125, 92.9780]], status: 'Waterlogged', alternativeRoute: 'Via Udharbond Bypass (Open)', lastUpdated: '15 mins ago' },
  { id: 'RD-02', name: 'NH-37 Badarpur-Silchar Highway', from: 'Badarpur Ghat', to: 'Silchar Bus Stand', coordinates: [[24.8950, 92.5780], [24.8333, 92.7789]], status: 'Bridge_Collapsed', alternativeRoute: 'Via Panchgram Ferry Service (Restricted)', lastUpdated: '25 mins ago' },
  { id: 'RD-03', name: 'Circuit House to Medical College Road', from: 'DC Office Complex', to: 'SMCH Campus', coordinates: [[24.8250, 92.7800], [24.8140, 92.7980]], status: 'Open', lastUpdated: '5 mins ago' },
  { id: 'RD-04', name: 'NH-07 Rishikesh-Badrinath Highway', from: 'Helang', to: 'Joshimath', coordinates: [[30.5200, 79.5100], [30.5562, 79.5667]], status: 'Debris_Blocked', alternativeRoute: 'Emergency Foot Track for Rescue Teams only', lastUpdated: '30 mins ago' }
];

export const INITIAL_SOS_REQUESTS: SOSRequest[] = [
  {
    id: 'AS-2026-00142',
    timestamp: '2026-08-24 13:42 IST',
    senderName: 'Debojit Choudhury',
    phone: '+91 98640-39211',
    category: 'Trapped',
    severity: 'Critical',
    locationName: 'House No 42, Lane 3, Public School Road, Silchar',
    coordinates: [24.8350, 92.7812],
    peopleCount: 5,
    specialNeeds: 'Includes 1 bedridden elderly person (78 yrs) and 1 infant (6 mos)',
    batteryLevel: 22,
    status: 'Assigned',
    assignedUnit: 'NDRF 1st Bn Rescue Boat Unit-04',
    responderEtaMinutes: 8,
    responderPhone: '+91 94350-99881',
    responderLocation: [24.8310, 92.7790],
    messages: [
      { sender: 'citizen', text: 'Water level reached 1st floor ceiling. We have moved to tin roof. Please send rescue boat urgently!', time: '13:42' },
      { sender: 'system', text: 'SOS Logged. Priority Critical. Dispatching nearest NDRF Marine unit.', time: '13:43' },
      { sender: 'responder', text: 'NDRF Boat 04 dispatched. We are 1.2km away entering Lane 3 with life vests. Stay visible.', time: '13:45' }
    ]
  },
  {
    id: 'AS-2026-00143',
    timestamp: '2026-08-24 13:38 IST',
    senderName: 'Manju Kalita',
    phone: '+91 94351-22904',
    category: 'Medical',
    severity: 'Critical',
    locationName: 'Near Tarapur Railway Colony Community Center',
    coordinates: [24.8420, 92.7695],
    peopleCount: 2,
    specialNeeds: 'Severe snakebite case (Viper suspected); patient turning pale',
    batteryLevel: 45,
    status: 'En_Route',
    assignedUnit: '108 Advanced Life Support Ambulance #12',
    responderEtaMinutes: 5,
    responderPhone: '+91 98642-11002',
    responderLocation: [24.8380, 92.7730],
    messages: [
      { sender: 'citizen', text: 'Patient bitten by snake while moving luggage through water. Breathing difficult.', time: '13:38' },
      { sender: 'system', text: 'Medical Priority Alert generated. Anti-venom unit dispatched from SMCH.', time: '13:39' },
      { sender: 'responder', text: 'Ambulance 12 approaching Tarapur bypass. Keep patient immobilized and calm.', time: '13:41' }
    ]
  },
  {
    id: 'AS-2026-00144',
    timestamp: '2026-08-24 13:15 IST',
    senderName: 'Kailash Singha',
    phone: '+91 94354-88320',
    category: 'Flood',
    severity: 'High',
    locationName: 'Meherpur Panchayat Office Roof',
    coordinates: [24.8210, 92.8020],
    peopleCount: 14,
    specialNeeds: 'Stranded without drinking water for 18 hours',
    batteryLevel: 14,
    status: 'Pending',
    messages: [
      { sender: 'citizen', text: '14 people on panchayat building roof. Flood current very fast. Need food and water.', time: '13:15' }
    ]
  }
];
