import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { HazardType } from '../../types/disaster';
import { InteractiveIndiaMap } from '../map/InteractiveIndiaMap';
import { 
  ShieldAlert, 
  Cpu, 
  BellRing, 
  LifeBuoy, 
  Stethoscope, 
  TrendingUp, 
  ShieldCheck, 
  Play, 
  ArrowRight, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Boxes, 
  Users, 
  HeartHandshake,
  Activity,
  Flame,
  CloudRain,
  Wind
} from 'lucide-react';

interface HomeLandingViewProps {
  onOpenSimulation: () => void;
}

export const HomeLandingView: React.FC<HomeLandingViewProps> = ({ onOpenSimulation }) => {
  const { 
    setActiveTab, 
    hazards, 
    selectedHazard, 
    setSelectedHazard, 
    recoveryData, 
    t, 
    alerts, 
    sosRequests, 
    shelters, 
    hospitals 
  } = useDisaster();

  const totalAtRisk = 485000;
  const totalRescued = 18450;
  const totalSheltersActive = shelters.filter(s => s.status === 'Active' || s.status === 'Full').length;
  const totalBedsAvail = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);

  const lifecycleSteps = [
    {
      step: '1. PREDICT',
      title: 'AI Multi-Hazard Risk Scoring',
      desc: 'Real-time multi-variable scoring (0-100) across 8 hazards with explainable factor breakdown.',
      icon: Cpu,
      tab: 'prediction',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      step: '2. PREPARE',
      title: 'Shelters & Resource Readiness',
      desc: 'Live tracking of shelter bed capacity, water, rations, backup power, and special needs access.',
      icon: Building2,
      tab: 'shelters',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      step: '3. ALERT',
      title: 'Hyperlocal NDMA SACHET Warnings',
      desc: 'Common Alerting Protocol (CAP) broadcasts with geo-fencing, 8-language SMS, and voice sirens.',
      icon: BellRing,
      tab: 'alerts',
      color: 'from-amber-600 to-orange-600'
    },
    {
      step: '4. RESPOND',
      title: 'Citizen SOS & Incident Command',
      desc: 'One-click GPS-tagged emergency beacons with automated NDRF/SDRF unit dispatch routing.',
      icon: LifeBuoy,
      tab: 'sos',
      color: 'from-rose-600 to-red-600'
    },
    {
      step: '5. RESCUE',
      title: 'Casualty Triage & Hospital Care',
      desc: 'Strict Reported vs Verified casualty auditing, ICU bed telemetry, and ambulance tracking.',
      icon: Stethoscope,
      tab: 'medical',
      color: 'from-cyan-600 to-blue-600'
    },
    {
      step: '6. RECOVER',
      title: 'Dynamic Weighted Recovery Score',
      desc: 'Mathematical composite recovery index across infrastructure, roads, relief, and healthcare.',
      icon: TrendingUp,
      tab: 'recovery',
      color: 'from-purple-600 to-violet-600'
    },
    {
      step: '7. PREVENT',
      title: 'AI Mitigation & Urban Planning',
      desc: 'Root cause vulnerability intelligence recommending engineering and policy risk reductions.',
      icon: ShieldCheck,
      tab: 'prevention',
      color: 'from-emerald-600 to-green-600'
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-command-900 via-command-900/90 to-command-950 border border-command-700/80 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Government Complement Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-command-800/90 border border-command-600 text-xs font-mono text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-300">AapdaSetu AI Core Engine</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400">Complements NDMA SACHET, IMD & SDMA Systems</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight leading-tight">
            Integrated Multi-Hazard <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500">
              Disaster Decision & Recovery Platform
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Connecting real-time hazard prediction, shelter readiness, hyperlocal alerts, emergency SOS dispatch, hospital casualty verification, satellite damage assessment, and dynamic recovery tracking in one unified national system.
          </p>

          {/* Core Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold text-sm shadow-xl shadow-rose-950/60 border border-rose-400/40 flex items-center gap-2 glow-red transition-all"
            >
              <Activity className="w-4 h-4" />
              <span>Launch Executive Command Center</span>
            </button>

            <button
              onClick={onOpenSimulation}
              className="px-5 py-3 rounded-xl bg-command-800 hover:bg-command-700 text-amber-300 font-bold text-sm border border-amber-500/40 flex items-center gap-2 shadow-lg transition-all"
            >
              <Play className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Run Live 5-Stage Simulation</span>
            </button>

            <button
              onClick={() => setActiveTab('sos')}
              className="px-5 py-3 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-300 font-bold text-sm border border-rose-500/50 flex items-center gap-2 transition-all"
            >
              <LifeBuoy className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Citizen Emergency SOS</span>
            </button>
          </div>
        </div>

        {/* Live National Threat Strip */}
        <div className="mt-8 pt-6 border-t border-command-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-command-950/80 p-3 rounded-xl border border-command-800">
            <span className="text-slate-500 block text-[10px] uppercase">Active Critical Incidents</span>
            <span className="text-xl font-bold text-rose-400">14 Active</span>
          </div>
          <div className="bg-command-950/80 p-3 rounded-xl border border-command-800">
            <span className="text-slate-500 block text-[10px] uppercase">Citizens Rescued</span>
            <span className="text-xl font-bold text-emerald-400">{totalRescued.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-command-950/80 p-3 rounded-xl border border-command-800">
            <span className="text-slate-500 block text-[10px] uppercase">Shelters Active</span>
            <span className="text-xl font-bold text-cyan-400">{totalSheltersActive} Open ({totalBedsAvail} Beds)</span>
          </div>
          <div className="bg-command-950/80 p-3 rounded-xl border border-command-800">
            <span className="text-slate-500 block text-[10px] uppercase">Dynamic Recovery Score</span>
            <span className="text-xl font-bold text-amber-400">{recoveryData.overallScore}% Restored</span>
          </div>
        </div>
      </section>

      {/* 7-Step Lifecycle USP Showcase */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
            Full Disaster Lifecycle Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">
            Predict &rarr; Prepare &rarr; Alert &rarr; Respond &rarr; Rescue &rarr; Recover &rarr; Prevent
          </h2>
          <p className="text-xs text-slate-400">
            Click any phase to navigate directly into its dedicated decision-support module
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {lifecycleSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                onClick={() => setActiveTab(step.tab)}
                className="command-card command-card-hover p-4 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 transition-all"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-command-800 to-command-700 border border-command-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-rose-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-400 block uppercase">
                    {step.step}
                  </span>
                  <h3 className="text-xs font-bold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-command-800 flex items-center justify-between text-[10px] font-mono text-slate-400 group-hover:text-rose-300">
                  <span>Open Module</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive GIS Map & Hotspot Radar Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h2 className="text-xl font-bold text-white font-mono">
                Live National Multi-Hazard GIS Map
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Interactive vector telemetry across active flood polygons, cyclone cones, shelters, hospitals, and road blockages.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('gis_map')}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-command-800 hover:bg-command-700 text-xs font-bold text-slate-200 border border-command-700 flex items-center gap-1.5"
          >
            <span>Full Screen GIS Viewer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <InteractiveIndiaMap heightClass="h-[520px]" />
      </section>

      {/* Multi-Hazard Live Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              Active Hazard Risk Assessments
            </h2>
            <p className="text-xs text-slate-400">
              Calculated dynamically via AapdaSetu AI Multi-Hazard Composite Scorer
            </p>
          </div>
          <button
            onClick={() => setActiveTab('prediction')}
            className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1"
          >
            <span>Adjust AI Risk Sliders &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(hazards).slice(0, 4).map(([key, haz]) => (
            <div
              key={key}
              onClick={() => {
                setSelectedHazard(key as HazardType);
                setActiveTab('prediction');
              }}
              className={`command-card p-4 cursor-pointer hover:border-rose-500/60 transition-all ${
                haz.level === 'Critical' ? 'border-rose-500/40 bg-gradient-to-b from-rose-950/30 to-command-900' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-300">
                  {haz.displayName}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  haz.level === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' :
                  haz.level === 'High' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' :
                  'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                }`}>
                  {haz.level}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black font-mono text-white">
                  {haz.score}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ 100 Risk Score</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-command-950 rounded-full h-2 mb-3 overflow-hidden border border-command-800">
                <div 
                  className={`h-full rounded-full ${
                    haz.level === 'Critical' ? 'bg-rose-500' :
                    haz.level === 'High' ? 'bg-amber-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${haz.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {haz.summary}
              </p>

              <div className="pt-2 border-t border-command-800 flex items-center justify-between text-[10px] font-mono text-rose-400">
                <span>Explain contributing factors</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Citizen Action & SOS Emergency Banner */}
      <section className="bg-gradient-to-r from-rose-950/70 via-command-900 to-amber-950/70 border border-rose-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
            <h3 className="text-lg font-bold text-white font-mono">
              Are you or someone near you trapped or in immediate danger?
            </h3>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Trigger an instant GPS-tagged emergency SOS beacon. Your ticket is routed directly to the nearest NDRF/SDRF boat unit and District Emergency Operations Center.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('sos')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 text-white font-black text-sm shadow-xl shadow-rose-950/80 border border-rose-400/50 glow-red animate-pulse"
          >
            TRIGGER SOS NOW
          </button>
          <button
            onClick={() => setActiveTab('shelters')}
            className="px-4 py-3 rounded-xl bg-command-800 hover:bg-command-700 text-slate-200 font-bold text-xs border border-command-600"
          >
            Find Nearest Shelter
          </button>
        </div>
      </section>
    </div>
  );
};
