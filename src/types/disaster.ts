export type UserRole = 
  | 'citizen' 
  | 'authority' 
  | 'responder' 
  | 'medical' 
  | 'relief' 
  | 'admin';

export type HazardType = 
  | 'flood' 
  | 'cyclone' 
  | 'landslide' 
  | 'heatwave' 
  | 'drought' 
  | 'earthquake_hazard' 
  | 'extreme_rainfall' 
  | 'urban_flooding' 
  | 'lightning_storm';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export type IncidentStatus = 
  | 'Reported' 
  | 'Verified' 
  | 'SAR_Active' 
  | 'Medical_Transfer' 
  | 'Relief_Deployed' 
  | 'Recovery_Active' 
  | 'Resolved';

export interface ContributingFactor {
  name: string;
  weight: number; // percentage e.g. 30
  value: number; // 0-100 current reading
  contribution: number; // calculated points added
  unit: string;
  statusText: string;
  description: string;
}

export interface HazardRiskAssessment {
  hazard: HazardType;
  displayName: string;
  score: number; // 0-100
  level: RiskLevel;
  trend: 'rising' | 'stable' | 'declining';
  summary: string;
  affectedDistricts: string[];
  factors: ContributingFactor[];
  suggestedAction: string;
  lastUpdated: string;
  confidence: number;
}

export interface OfficialAlert {
  id: string;
  hazard: HazardType;
  title: string;
  severity: RiskLevel;
  issuingAuthority: string; // e.g. "NDMA / IMD National Disaster Alert"
  sourceProtocol: 'CAP-v1.2' | 'SACHET' | 'IMD-NOWCAST';
  location: string;
  state: string;
  coordinates: [number, number];
  radiusKm: number;
  timestamp: string;
  validUntil: string;
  recommendedAction: string;
  isOfficial: true;
  instructions: string[];
  broadcastChannels: ('SMS' | 'Voice' | 'CAP' | 'SACHET' | 'App_Push' | 'Siren')[];
}

export interface SOSRequest {
  id: string; // e.g. "AS-2026-00142"
  timestamp: string;
  senderName: string;
  phone: string;
  category: 'Trapped' | 'Medical' | 'Fire' | 'Flood' | 'Landslide' | 'Missing_Person' | 'Elderly_Assistance' | 'Other';
  severity: 'Critical' | 'High' | 'Moderate';
  locationName: string;
  coordinates: [number, number];
  peopleCount: number;
  specialNeeds: string;
  batteryLevel: number;
  status: 'Pending' | 'Assigned' | 'En_Route' | 'On_Scene' | 'Rescued' | 'Transferred_Hospital' | 'Resolved';
  assignedUnit?: string;
  responderEtaMinutes?: number;
  responderPhone?: string;
  responderLocation?: [number, number];
  messages?: { sender: 'citizen' | 'responder' | 'system'; text: string; time: string }[];
}

export interface Shelter {
  id: string;
  name: string;
  type: 'School' | 'Community_Hall' | 'Cyclone_Center' | 'Stadium' | 'Relief_Camp';
  district: string;
  state: string;
  coordinates: [number, number];
  capacity: number;
  occupied: number;
  available: number;
  distanceKm: number;
  status: 'Active' | 'Full' | 'Available' | 'Standby' | 'Closed';
  supplies: {
    foodAvailability: 'Abundant' | 'Adequate' | 'Critical_Low';
    waterAvailability: 'Abundant' | 'Adequate' | 'Critical_Low';
    medicalSupport: boolean;
    powerBackup: boolean;
    internetConnectivity: boolean;
    wheelchairAccessible: boolean;
    childCareSafeSpace: boolean;
    generatorFuelHours: number;
  };
  contactPerson: string;
  contactPhone: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  district: string;
  state: string;
  coordinates: [number, number];
  totalBeds: number;
  availableBeds: number;
  icuTotal: number;
  icuAvailable: number;
  emergencyTotal: number;
  emergencyAvailable: number;
  oxygenCylinderStock: number;
  activeAmbulances: number;
  availableAmbulances: number;
  medicalTeamsOnDuty: number;
  medicineStockStatus: 'Good' | 'Adequate' | 'Critical_Shortage';
  casualtyTriage: {
    reported: number;
    underVerification: number;
    verified: number;
    criticalTreated: number;
    referred: number;
    deathsReported: number;
    deathsVerified: number;
  };
}

export interface ReliefInventoryItem {
  id: string;
  name: string;
  category: 'Food' | 'Water' | 'Medical' | 'Shelter_Supplies' | 'Rescue_Gear' | 'Power_Fuel';
  unit: string;
  available: number;
  allocated: number;
  distributed: number;
  required: number;
  reorderLevel: number;
}

export interface PriorityReliefZone {
  zoneName: string;
  district: string;
  populationAffected: number;
  riskScore: number;
  roadAccessStatus: 'Open' | 'Partially_Submerged' | '4x4_Only' | 'Air_Drop_Only';
  reliefDeficitRatio: number; // 0-100%
  aiRationale: string[];
  recommendedSupplies: { item: string; quantity: string }[];
}

export interface InfrastructureDamageRecord {
  id: string;
  sector: 'Buildings' | 'Roads_Highways' | 'Bridges' | 'Power_Grid' | 'Water_Supply' | 'Schools' | 'Hospitals' | 'Agriculture';
  estimatedDamagedUnits: number;
  confirmedDamagedUnits: number;
  underAssessmentUnits: number;
  unitLabel: string;
  estimatedCostCrores: number;
  status: 'Under_Assessment' | 'Tender_Issued' | 'Work_In_Progress' | 'Restored';
  progressPercentage: number;
}

export interface RecoveryDomainWeights {
  infrastructure: number; // e.g. 0.30
  healthcare: number;     // e.g. 0.20
  roadConnectivity: number; // e.g. 0.25
  reliefDistribution: number; // e.g. 0.25
}

export interface RecoveryProgressData {
  overallScore: number; // dynamically computed
  domains: {
    infrastructure: number; // 0-100%
    healthcare: number;     // 0-100%
    roadConnectivity: number; // 0-100%
    reliefDistribution: number; // 0-100%
  };
  weights: RecoveryDomainWeights;
  affectedPopulationTotal: number;
  populationRestoredNormalcy: number;
  roadsRestoredKm: number;
  roadsDamagedKm: number;
  activeSheltersRemaining: number;
  sheltersDecommissioned: number;
  milestones: {
    dayLabel: string;
    phaseTitle: string;
    description: string;
    progress: number;
    status: 'completed' | 'in_progress' | 'pending';
  }[];
}

export interface PreventionRecommendation {
  id: string;
  hazard: HazardType;
  district: string;
  vulnerabilityFactor: string; // e.g. "Floodplain Encroachment & Wetland Degradation"
  rootCauseAnalysis: string[];
  recommendedInterventions: {
    title: string;
    description: string;
    estimatedCostCrores: number;
    timeToImplementMonths: number;
    projectedRiskReductionPercent: number;
  }[];
  policyActionRequired: string;
  responsibleAgency: string;
}

export interface RoadSegment {
  id: string;
  name: string;
  from: string;
  to: string;
  coordinates: [[number, number], [number, number]];
  status: 'Open' | 'Waterlogged' | 'Debris_Blocked' | 'Bridge_Collapsed' | 'Restored';
  alternativeRoute?: string;
  lastUpdated: string;
}

export interface SimulationState {
  isActive: boolean;
  currentStage: number; // 1 to 5
  stageName: string;
  stageDescription: string;
  isPlaying: boolean;
  speed: number; // 1x, 2x, 5x
  narration: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userRole: UserRole;
  action: string;
  targetResource: string;
  details: string;
  ipHash: string;
}
