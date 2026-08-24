import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserRole, 
  HazardType, 
  HazardRiskAssessment, 
  OfficialAlert, 
  Shelter, 
  HospitalFacility, 
  ReliefInventoryItem, 
  PriorityReliefZone, 
  InfrastructureDamageRecord, 
  RecoveryProgressData, 
  RecoveryDomainWeights,
  PreventionRecommendation, 
  RoadSegment, 
  SOSRequest, 
  SimulationState, 
  AuditLogEntry,
  RiskLevel 
} from '../types/disaster';
import { 
  INDIAN_DISTRICTS, 
  INITIAL_HAZARDS, 
  INITIAL_OFFICIAL_ALERTS, 
  INITIAL_SHELTERS, 
  INITIAL_HOSPITALS, 
  INITIAL_RELIEF_INVENTORY, 
  INITIAL_PRIORITY_ZONES, 
  INITIAL_DAMAGE_RECORDS, 
  INITIAL_RECOVERY_DATA, 
  INITIAL_PREVENTION_RECOMMENDATIONS, 
  INITIAL_ROAD_SEGMENTS, 
  INITIAL_SOS_REQUESTS,
  DistrictGeoData
} from '../data/indiaDisasterData';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface DisasterContextType {
  // Navigation & Role
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Language & Theme
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  isDark: boolean;
  toggleTheme: () => void;

  // Geographic & Hazard Selection
  selectedDistrict: DistrictGeoData;
  setSelectedDistrict: (district: DistrictGeoData) => void;
  selectedHazard: HazardType;
  setSelectedHazard: (hazard: HazardType) => void;
  districts: DistrictGeoData[];

  // Hazards & Risk Scoring
  hazards: Record<string, HazardRiskAssessment>;
  updateHazardFactor: (hazard: HazardType, factorIndex: number, newValue: number) => void;
  resetHazardFactors: (hazard: HazardType) => void;

  // Official Alerts
  alerts: OfficialAlert[];
  publishOfficialAlert: (alert: Omit<OfficialAlert, 'id' | 'timestamp' | 'isOfficial'>) => void;

  // SOS & Emergency Coordination
  sosRequests: SOSRequest[];
  activeSosId: string | null;
  setActiveSosId: (id: string | null) => void;
  createSosRequest: (request: {
    senderName: string;
    phone: string;
    category: SOSRequest['category'];
    severity: SOSRequest['severity'];
    locationName: string;
    coordinates: [number, number];
    peopleCount: number;
    specialNeeds: string;
  }) => string;
  updateSosStatus: (id: string, status: SOSRequest['status'], assignedUnit?: string) => void;
  addSosMessage: (id: string, text: string, sender: 'citizen' | 'responder' | 'system') => void;

  // Shelters & Hospitals
  shelters: Shelter[];
  updateShelterOccupancy: (id: string, occupied: number) => void;
  hospitals: HospitalFacility[];
  updateHospitalBeds: (id: string, availableBeds: number, availableIcu: number) => void;
  verifyCasualty: (hospitalId: string, reportedDelta: number, verifiedDelta: number, underVerificationDelta: number) => void;

  // Relief & Logistics
  reliefInventory: ReliefInventoryItem[];
  distributeRelief: (itemId: string, quantity: number) => void;
  priorityZones: PriorityReliefZone[];

  // Damage & Recovery
  damageRecords: InfrastructureDamageRecord[];
  updateDamageProgress: (id: string, progress: number) => void;
  recoveryData: RecoveryProgressData;
  updateRecoveryWeights: (weights: Partial<RecoveryDomainWeights>) => void;
  preventionRecommendations: PreventionRecommendation[];
  roadSegments: RoadSegment[];
  toggleRoadStatus: (id: string, newStatus: RoadSegment['status']) => void;

  // Simulation Engine
  simulation: SimulationState;
  startSimulation: () => void;
  pauseSimulation: () => void;
  stepSimulation: (stageNumber: number) => void;
  resetSimulation: () => void;
  setSimulationSpeed: (speed: number) => void;

  // Audit Logs
  auditLogs: AuditLogEntry[];
  addAuditLog: (action: string, targetResource: string, details: string) => void;
}

const DisasterContext = createContext<DisasterContextType | undefined>(undefined);

export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization
  const [currentRole, setRoleState] = useState<UserRole>('authority');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isDark, setIsDark] = useState<boolean>(true);

  const [districts] = useState<DistrictGeoData[]>(INDIAN_DISTRICTS);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictGeoData>(INDIAN_DISTRICTS[0]);
  const [selectedHazard, setSelectedHazard] = useState<HazardType>('flood');

  const [hazards, setHazards] = useState<Record<string, HazardRiskAssessment>>(INITIAL_HAZARDS);
  const [alerts, setAlerts] = useState<OfficialAlert[]>(INITIAL_OFFICIAL_ALERTS);
  const [sosRequests, setSosRequests] = useState<SOSRequest[]>(INITIAL_SOS_REQUESTS);
  const [activeSosId, setActiveSosId] = useState<string | null>('AS-2026-00142');

  const [shelters, setShelters] = useState<Shelter[]>(INITIAL_SHELTERS);
  const [hospitals, setHospitals] = useState<HospitalFacility[]>(INITIAL_HOSPITALS);
  const [reliefInventory, setReliefInventory] = useState<ReliefInventoryItem[]>(INITIAL_RELIEF_INVENTORY);
  const [priorityZones, setPriorityZones] = useState<PriorityReliefZone[]>(INITIAL_PRIORITY_ZONES);
  const [damageRecords, setDamageRecords] = useState<InfrastructureDamageRecord[]>(INITIAL_DAMAGE_RECORDS);
  const [recoveryData, setRecoveryData] = useState<RecoveryProgressData>(INITIAL_RECOVERY_DATA);
  const [preventionRecommendations] = useState<PreventionRecommendation[]>(INITIAL_PREVENTION_RECOMMENDATIONS);
  const [roadSegments, setRoadSegments] = useState<RoadSegment[]>(INITIAL_ROAD_SEGMENTS);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'LOG-001',
      timestamp: '2026-08-24 13:30:15 IST',
      userRole: 'admin',
      action: 'ISSUED_CAP_ALERT',
      targetResource: 'CAP-IN-AS-2026-0824-001',
      details: 'Dispatched Level-IV Red Alert across 35km Cachar radius',
      ipHash: 'sha256-8a9f...e102'
    },
    {
      id: 'LOG-002',
      timestamp: '2026-08-24 13:43:02 IST',
      userRole: 'responder',
      action: 'ASSIGNED_SAR_UNIT',
      targetResource: 'AS-2026-00142',
      details: 'NDRF 1st Bn Boat 04 assigned to Public School Road trapped family',
      ipHash: 'sha256-4c3d...b891'
    }
  ]);

  const [simulation, setSimulation] = useState<SimulationState>({
    isActive: false,
    currentStage: 1,
    stageName: 'Stage 1: Pre-Monsoon Catchment Downpour',
    stageDescription: 'Catchment precipitation accelerates over Barak Basin. River water levels rise at Annapurna Ghat.',
    isPlaying: false,
    speed: 1,
    narration: [
      'Radar sensors indicate cloudburst core approaching Cachar catchment.',
      'Rainfall intensity exceeds 65 mm/hour in upstream catchments.',
      'AI Risk Prediction Engine recalculates composite flood hazard from 52 to 86 (Critical).'
    ]
  });

  // Translation helper
  const t = useCallback((key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  }, [language]);

  // Theme toggle
  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Add audit log
  const addAuditLog = useCallback((action: string, targetResource: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString() + ' IST',
      userRole: currentRole,
      action,
      targetResource,
      details,
      ipHash: 'sha256-' + Math.random().toString(36).substring(2, 10)
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  }, [currentRole]);

  // Role Switcher with logging
  const setRole = (role: UserRole) => {
    setRoleState(role);
    addAuditLog('ROLE_SWITCHED', `Role: ${role.toUpperCase()}`, `User switched active view to ${role}`);
  };

  // Recalculate Risk Score
  const updateHazardFactor = (hazardKey: HazardType, factorIndex: number, newValue: number) => {
    setHazards(prev => {
      const currentHazard = prev[hazardKey];
      if (!currentHazard) return prev;

      const updatedFactors = currentHazard.factors.map((f, idx) => {
        if (idx === factorIndex) {
          const clampedVal = Math.max(0, Math.min(100, newValue));
          const contribution = (clampedVal * f.weight) / 100;
          return { ...f, value: clampedVal, contribution };
        }
        return f;
      });

      const totalScore = Math.round(updatedFactors.reduce((acc, f) => acc + f.contribution, 0));
      let level: RiskLevel = 'Low';
      if (totalScore > 80) level = 'Critical';
      else if (totalScore > 60) level = 'High';
      else if (totalScore > 30) level = 'Moderate';

      return {
        ...prev,
        [hazardKey]: {
          ...currentHazard,
          score: totalScore,
          level,
          factors: updatedFactors,
          lastUpdated: 'Just now (Interactive Recalculation)'
        }
      };
    });
  };

  const resetHazardFactors = (hazardKey: HazardType) => {
    setHazards(prev => ({
      ...prev,
      [hazardKey]: INITIAL_HAZARDS[hazardKey]
    }));
  };

  // Dynamic Recovery Score Calculator
  const computeOverallRecovery = (domains: RecoveryProgressData['domains'], weights: RecoveryDomainWeights): number => {
    const raw = (
      domains.infrastructure * weights.infrastructure +
      domains.healthcare * weights.healthcare +
      domains.roadConnectivity * weights.roadConnectivity +
      domains.reliefDistribution * weights.reliefDistribution
    );
    return Math.round(raw);
  };

  const updateRecoveryWeights = (newWeights: Partial<RecoveryDomainWeights>) => {
    setRecoveryData(prev => {
      const mergedWeights = { ...prev.weights, ...newWeights };
      const score = computeOverallRecovery(prev.domains, mergedWeights);
      return {
        ...prev,
        weights: mergedWeights,
        overallScore: score
      };
    });
    addAuditLog('UPDATED_RECOVERY_WEIGHTS', 'Recovery Algorithm', 'Modified domain weight coefficients');
  };

  // SOS Creation
  const createSosRequest = (req: {
    senderName: string;
    phone: string;
    category: SOSRequest['category'];
    severity: SOSRequest['severity'];
    locationName: string;
    coordinates: [number, number];
    peopleCount: number;
    specialNeeds: string;
  }): string => {
    const id = `AS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq: SOSRequest = {
      ...req,
      id,
      timestamp: new Date().toLocaleTimeString() + ' IST',
      batteryLevel: Math.floor(25 + Math.random() * 60),
      status: 'Pending',
      messages: [
        { sender: 'citizen', text: `Emergency request for ${req.category} (${req.peopleCount} people). ${req.specialNeeds}`, time: new Date().toLocaleTimeString() },
        { sender: 'system', text: 'SOS Logged into National Dispatch Queue. Locating nearest rescue unit.', time: new Date().toLocaleTimeString() }
      ]
    };
    setSosRequests(prev => [newReq, ...prev]);
    setActiveSosId(id);
    addAuditLog('CREATED_SOS', id, `Citizen SOS logged: ${req.category} at ${req.locationName}`);
    return id;
  };

  const updateSosStatus = (id: string, status: SOSRequest['status'], assignedUnit?: string) => {
    setSosRequests(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          assignedUnit: assignedUnit || item.assignedUnit || 'NDRF Quick Response Team #2',
          responderEtaMinutes: status === 'Assigned' ? 8 : status === 'En_Route' ? 4 : 0
        };
      }
      return item;
    }));
    addAuditLog('UPDATED_SOS_STATUS', id, `Status changed to ${status}${assignedUnit ? ' -> ' + assignedUnit : ''}`);
  };

  const addSosMessage = (id: string, text: string, sender: 'citizen' | 'responder' | 'system') => {
    setSosRequests(prev => prev.map(item => {
      if (item.id === id) {
        const msgs = item.messages || [];
        return {
          ...item,
          messages: [...msgs, { sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        };
      }
      return item;
    }));
  };

  // Official Alerts
  const publishOfficialAlert = (alertData: Omit<OfficialAlert, 'id' | 'timestamp' | 'isOfficial'>) => {
    const newAlert: OfficialAlert = {
      ...alertData,
      id: `CAP-IN-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleTimeString() + ' IST',
      isOfficial: true
    };
    setAlerts(prev => [newAlert, ...prev]);
    addAuditLog('PUBLISHED_OFFICIAL_ALERT', newAlert.id, `Alert broadcast: ${newAlert.title}`);
  };

  // Shelters & Hospitals
  const updateShelterOccupancy = (id: string, occupied: number) => {
    setShelters(prev => prev.map(s => {
      if (s.id === id) {
        const newOccupied = Math.min(s.capacity, Math.max(0, occupied));
        const available = s.capacity - newOccupied;
        const status = available === 0 ? 'Full' : 'Active';
        return { ...s, occupied: newOccupied, available, status };
      }
      return s;
    }));
    addAuditLog('SHELTER_UPDATE', id, `Updated occupancy to ${occupied}`);
  };

  const updateHospitalBeds = (id: string, availableBeds: number, availableIcu: number) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === id) {
        return { ...h, availableBeds, icuAvailable: availableIcu };
      }
      return h;
    }));
    addAuditLog('HOSPITAL_BED_UPDATE', id, `Available beds: ${availableBeds}, ICU: ${availableIcu}`);
  };

  const verifyCasualty = (hospitalId: string, reportedDelta: number, verifiedDelta: number, underVerificationDelta: number) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === hospitalId) {
        const triage = h.casualtyTriage;
        return {
          ...h,
          casualtyTriage: {
            ...triage,
            reported: Math.max(0, triage.reported + reportedDelta),
            verified: Math.max(0, triage.verified + verifiedDelta),
            underVerification: Math.max(0, triage.underVerification + underVerificationDelta),
            deathsVerified: Math.max(0, triage.deathsVerified + (verifiedDelta > 0 && reportedDelta === 0 ? 1 : 0))
          }
        };
      }
      return h;
    }));
    addAuditLog('CASUALTY_VERIFICATION', hospitalId, `Verified casualty change: Verified +${verifiedDelta}, UnderVer +${underVerificationDelta}`);
  };

  // Relief Inventory
  const distributeRelief = (itemId: string, quantity: number) => {
    setReliefInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const newDistributed = item.distributed + quantity;
        const newAvailable = Math.max(0, item.available - quantity);
        return { ...item, distributed: newDistributed, available: newAvailable };
      }
      return item;
    }));
    addAuditLog('RELIEF_DISTRIBUTED', itemId, `Dispatched ${quantity} units`);
  };

  // Damage & Road
  const updateDamageProgress = (id: string, progress: number) => {
    setDamageRecords(prev => prev.map(rec => {
      if (rec.id === id) {
        const status = progress >= 100 ? 'Restored' : 'Work_In_Progress';
        return { ...rec, progressPercentage: progress, status };
      }
      return rec;
    }));
    addAuditLog('DAMAGE_PROGRESS_UPDATE', id, `Updated restoration progress to ${progress}%`);
  };

  const toggleRoadStatus = (id: string, newStatus: RoadSegment['status']) => {
    setRoadSegments(prev => prev.map(rd => {
      if (rd.id === id) {
        return { ...rd, status: newStatus, lastUpdated: 'Just now' };
      }
      return rd;
    }));
    addAuditLog('ROAD_STATUS_TOGGLED', id, `Road status updated to ${newStatus}`);
  };

  // 5-STAGE DISASTER SIMULATION ENGINE
  const stepSimulation = (stage: number) => {
    const clampedStage = Math.max(1, Math.min(5, stage));
    let stageName = '';
    let stageDescription = '';
    let narration: string[] = [];

    switch (clampedStage) {
      case 1:
        stageName = 'Stage 1: Pre-Monsoon Cloudburst & Upstream Influx';
        stageDescription = 'Catchment rainfall exceeds 180mm. River gauge at Annapurna Ghat spikes +1.84m over danger mark.';
        narration = [
          'IMD Doppler Radar detects extreme convective precipitation core.',
          'AI Multi-Hazard Risk Scorer elevates Cachar Flood Risk to 86/100 (Critical).',
          'Explainability factors: Rainfall contribution (+27.6), River gauge (+23.5).'
        ];
        // Mutate flood hazard to critical
        updateHazardFactor('flood', 0, 95);
        updateHazardFactor('flood', 1, 98);
        break;

      case 2:
        stageName = 'Stage 2: Dyke Breach & NDMA SACHET Emergency Alert';
        stageDescription = 'Bethukandi embankment experiences severe piping distress. National SACHET Level-IV Red Alert is triggered.';
        narration = [
          'Automated satellite SAR detection confirms 142 sq km inundation polygon.',
          'Official NDMA SACHET Red Alert broadcasted to 450,000 citizens across Cachar.',
          'Hyperlocal sirens, SMS and multi-lingual voice alerts activated.'
        ];
        publishOfficialAlert({
          hazard: 'flood',
          title: 'EMERGENCY RED ALERT: Bethukandi Embankment Breach in Silchar',
          severity: 'Critical',
          issuingAuthority: 'NDMA / Assam SDMA State Emergency Operations Center',
          sourceProtocol: 'CAP-v1.2',
          location: 'Silchar Urban & Sub-urban Wards',
          state: 'Assam',
          coordinates: [24.8333, 92.7789],
          radiusKm: 25,
          validUntil: '2026-08-25 23:59 IST',
          recommendedAction: 'Immediate high-ground evacuation. Avoid all ground-floor structures.',
          instructions: [
            'Turn off circuit breakers and gas mains immediately.',
            'Proceed to Silchar Govt Higher Secondary School Shelter.',
            'Call 112 or use AapdaSetu SOS if trapped.'
          ],
          broadcastChannels: ['CAP', 'SACHET', 'SMS', 'Voice', 'App_Push', 'Siren']
        });
        break;

      case 3:
        stageName = 'Stage 3: Citizen SOS Avalanche & NDRF Tactical SAR';
        stageDescription = 'Multiple families stranded on rooftops. Live SOS queue generates tickets and assigns rescue marine units.';
        narration = [
          'Over 140 SOS emergency beacons captured via mobile GPS telemetry.',
          'NDRF 1st Battalion Marine Boat Unit-04 deployed to Public School Road.',
          'Safe evacuation routes calculated dynamically, avoiding collapsed NH-37 bridge.'
        ];
        updateSosStatus('AS-2026-00142', 'En_Route', 'NDRF 1st Bn Marine Unit 4');
        updateShelterOccupancy('SH-AS-01', 590);
        toggleRoadStatus('RD-01', 'Waterlogged');
        toggleRoadStatus('RD-02', 'Bridge_Collapsed');
        break;

      case 4:
        stageName = 'Stage 4: Hospital Triage & AI Relief Optimization';
        stageDescription = 'Civil Hospital sets up flood casualty triage. AI Logistics Engine directs priority relief convoys.';
        narration = [
          'SMCH & Civil Hospital intake 218 flood-affected patients with strict verification.',
          'AI Allocation Engine prioritizes Bethukandi Fringe (68% deficit) for emergency airdrops.',
          '45,000 drinking water pouches and 12,000 MRE food packets dispatched.'
        ];
        verifyCasualty('HOSP-AS-01', 30, 20, 10);
        distributeRelief('REL-01', 12000);
        distributeRelief('REL-02', 35000);
        break;

      case 5:
        stageName = 'Stage 5: Road Clearance, Dynamic Recovery & Long-term Prevention';
        stageDescription = 'High-capacity dewatering pumps deployed. Road connectivity restored. AI generates 3 structural prevention policies.';
        narration = [
          'Bailey bridge installed on NH-37; arterial connectivity restored to 84%.',
          'Dynamic Recovery Score advances from 48% to 74% across 4 weighted domains.',
          'AI Prevention Engine issues 3 mitigation recommendations: Geo-textile embankment & SCADA sluice gates.'
        ];
        toggleRoadStatus('RD-01', 'Restored');
        toggleRoadStatus('RD-02', 'Restored');
        updateDamageProgress('DMG-02', 82);
        updateDamageProgress('DMG-04', 90);
        setRecoveryData(prev => ({
          ...prev,
          domains: {
            infrastructure: 84,
            healthcare: 88,
            roadConnectivity: 78,
            reliefDistribution: 92
          },
          overallScore: 85,
          roadsRestoredKm: 160
        }));
        break;
    }

    setSimulation(prev => ({
      ...prev,
      isActive: true,
      currentStage: clampedStage,
      stageName,
      stageDescription,
      narration
    }));

    addAuditLog('SIMULATION_STAGE', `Stage ${clampedStage}`, stageName);
  };

  const startSimulation = () => {
    setSimulation(prev => ({ ...prev, isActive: true, isPlaying: true }));
    stepSimulation(1);
  };

  const pauseSimulation = () => {
    setSimulation(prev => ({ ...prev, isPlaying: false }));
  };

  const resetSimulation = () => {
    setSimulation({
      isActive: false,
      currentStage: 1,
      stageName: 'Stage 1: Pre-Monsoon Catchment Downpour',
      stageDescription: 'Catchment precipitation accelerates over Barak Basin.',
      isPlaying: false,
      speed: 1,
      narration: ['Simulation reset to baseline conditions.']
    });
    setHazards(INITIAL_HAZARDS);
    setAlerts(INITIAL_OFFICIAL_ALERTS);
    setShelters(INITIAL_SHELTERS);
    setHospitals(INITIAL_HOSPITALS);
    setReliefInventory(INITIAL_RELIEF_INVENTORY);
    setRecoveryData(INITIAL_RECOVERY_DATA);
    setDamageRecords(INITIAL_DAMAGE_RECORDS);
    setRoadSegments(INITIAL_ROAD_SEGMENTS);
    addAuditLog('SIMULATION_RESET', 'All Systems', 'Reset to initial baseline data');
  };

  const setSimulationSpeed = (speed: number) => {
    setSimulation(prev => ({ ...prev, speed }));
  };

  // Auto-play timer for simulation
  useEffect(() => {
    let timer: any;
    if (simulation.isActive && simulation.isPlaying) {
      const intervalMs = (6000 / simulation.speed);
      timer = setInterval(() => {
        setSimulation(prev => {
          if (prev.currentStage < 5) {
            const nextStage = prev.currentStage + 1;
            stepSimulation(nextStage);
            return { ...prev, currentStage: nextStage };
          } else {
            return { ...prev, isPlaying: false };
          }
        });
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [simulation.isActive, simulation.isPlaying, simulation.speed]);

  return (
    <DisasterContext.Provider
      value={{
        currentRole,
        setRole,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
        isDark,
        toggleTheme,
        selectedDistrict,
        setSelectedDistrict,
        selectedHazard,
        setSelectedHazard,
        districts,
        hazards,
        updateHazardFactor,
        resetHazardFactors,
        alerts,
        publishOfficialAlert,
        sosRequests,
        activeSosId,
        setActiveSosId,
        createSosRequest,
        updateSosStatus,
        addSosMessage,
        shelters,
        updateShelterOccupancy,
        hospitals,
        updateHospitalBeds,
        verifyCasualty,
        reliefInventory,
        distributeRelief,
        priorityZones,
        damageRecords,
        updateDamageProgress,
        recoveryData,
        updateRecoveryWeights,
        preventionRecommendations,
        roadSegments,
        toggleRoadStatus,
        simulation,
        startSimulation,
        pauseSimulation,
        stepSimulation,
        resetSimulation,
        setSimulationSpeed,
        auditLogs,
        addAuditLog
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error('useDisaster must be used within a DisasterProvider');
  }
  return context;
};
