import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  AlertOctagon, 
  ShieldAlert, 
  Users, 
  LifeBuoy, 
  Stethoscope, 
  Building2, 
  Boxes, 
  TrendingUp, 
  Navigation, 
  CheckCircle2, 
  Radio, 
  Flame, 
  Clock,
  Filter,
  ArrowUpRight,
  Activity
} from 'lucide-react';

export const CommandDashboardView: React.FC = () => {
  const { 
    selectedDistrict, 
    setSelectedDistrict, 
    districts, 
    hazards, 
    shelters, 
    hospitals, 
    reliefInventory, 
    recoveryData, 
    sosRequests, 
    alerts,
    setActiveTab,
    verifyCasualty
  } = useDisaster();

  const [timeFilter, setTimeFilter] = useState<'24h' | '48h' | '7d'>('24h');

  // Aggregations
  const activeAlertsCount = alerts.length;
  const criticalAlertsCount = alerts.filter(a => a.severity === 'Critical').length;
  const totalReportedCasualties = hospitals.reduce((acc, h) => acc + h.casualtyTriage.reported, 0);
  const totalVerifiedCasualties = hospitals.reduce((acc, h) => acc + h.casualtyTriage.verified, 0);
  const totalUnderVerification = hospitals.reduce((acc, h) => acc + h.casualtyTriage.underVerification, 0);
  const totalReportedDeaths = hospitals.reduce((acc, h) => acc + h.casualtyTriage.deathsReported, 0);
  const totalVerifiedDeaths = hospitals.reduce((acc, h) => acc + h.casualtyTriage.deathsVerified, 0);

  const totalShelters = shelters.length;
  const totalShelterCap = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalShelterOcc = shelters.reduce((acc, s) => acc + s.occupied, 0);

  const totalHospitalBeds = hospitals.reduce((acc, h) => acc + h.totalBeds, 0);
  const availHospitalBeds = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);
  const availIcuBeds = hospitals.reduce((acc, h) => acc + h.icuAvailable, 0);

  // Chart Data: Incidents Velocity
  const incidentTrendData = [
    { time: '00:00', incidents: 3, critical: 1, waterLevel: 21.2 },
    { time: '04:00', incidents: 6, critical: 2, waterLevel: 21.8 },
    { time: '08:00', incidents: 12, critical: 5, waterLevel: 22.9 },
    { time: '12:00', incidents: 24, critical: 11, waterLevel: 24.2 },
    { time: '16:00', incidents: 38, critical: 18, waterLevel: 25.1 },
    { time: '20:00', incidents: 29, critical: 14, waterLevel: 24.8 },
    { time: 'Now', incidents: 14, critical: 8, waterLevel: 24.6 },
  ];

  // Chart Data: Casualty Triage Breakdown
  const casualtyTriageData = hospitals.map(h => ({
    name: h.name.split(' ')[0],
    Reported: h.casualtyTriage.reported,
    UnderVerification: h.casualtyTriage.underVerification,
    Verified: h.casualtyTriage.verified,
  }));

  // Chart Data: Rescue Velocity
  const rescueVelocityData = [
    { hour: 'T-12h', evacuated: 1400, inQueue: 800 },
    { hour: 'T-9h', evacuated: 3800, inQueue: 1600 },
    { hour: 'T-6h', evacuated: 8200, inQueue: 2400 },
    { hour: 'T-3h', evacuated: 14600, inQueue: 1100 },
    { hour: 'Current', evacuated: 18450, inQueue: 420 },
  ];

  // Chart Data: Relief Inventory Progress
  const reliefDistributionData = reliefInventory.map(item => ({
    name: item.name.split(' ')[0],
    Distributed: item.distributed,
    Allocated: item.allocated,
    Available: item.available,
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Command Bar & District Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-command-900/90 border border-command-700/80 p-4 rounded-2xl shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              National Executive Command Center
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time Disaster Coordination &bull; Operations Room Telemetry
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* District Selector */}
          <select
            value={selectedDistrict.id}
            onChange={(e) => {
              const d = districts.find(item => item.id === e.target.value);
              if (d) setSelectedDistrict(d);
            }}
            className="bg-command-950 border border-command-700 text-xs font-mono font-bold text-white rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
          >
            {districts.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} &bull; Score {d.riskScore}/100
              </option>
            ))}
          </select>

          {/* Time Filter */}
          <div className="flex items-center bg-command-950 p-1 rounded-xl border border-command-700 text-xs font-mono">
            {(['24h', '48h', '7d'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeFilter(t)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  timeFilter === t ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 12 Executive KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <div className="command-card p-3.5 border-rose-500/40 bg-gradient-to-b from-rose-950/30 to-command-900">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Active Incidents</span>
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-400 mt-1">14</div>
          <span className="text-[10px] text-rose-300 font-mono">8 Critical &bull; 6 High</span>
        </div>

        {/* KPI 2 */}
        <div className="command-card p-3.5 border-amber-500/40">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>People at Risk</span>
            <Users className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white mt-1">485K</div>
          <span className="text-[10px] text-amber-300 font-mono">Across 5 Districts</span>
        </div>

        {/* KPI 3 */}
        <div className="command-card p-3.5 border-emerald-500/40">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>People Rescued</span>
            <LifeBuoy className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">18,450</div>
          <span className="text-[10px] text-emerald-300 font-mono">NDRF &bull; SDRF Teams</span>
        </div>

        {/* KPI 4 */}
        <div className="command-card p-3.5 border-rose-500/40">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Casualties (Triage)</span>
            <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-black font-mono text-white mt-1">
            {totalVerifiedCasualties} <span className="text-xs text-slate-400">/ {totalReportedCasualties} Rep</span>
          </div>
          <span className="text-[10px] text-amber-400 font-mono">{totalUnderVerification} Under Verif.</span>
        </div>

        {/* KPI 5 */}
        <div className="command-card p-3.5 border-cyan-500/40">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Shelters Active</span>
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-1">
            {totalShelters} <span className="text-xs text-slate-400">({Math.round((totalShelterOcc/totalShelterCap)*100)}%)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">{totalShelterCap - totalShelterOcc} Beds Open</span>
        </div>

        {/* KPI 6 */}
        <div className="command-card p-3.5 border-purple-500/40">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Recovery Score</span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-400 mt-1">
            {recoveryData.overallScore}%
          </div>
          <span className="text-[10px] text-purple-300 font-mono">Dynamic Weighted</span>
        </div>
      </div>

      {/* Secondary Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs font-mono">
        <div className="bg-command-900/70 p-2.5 rounded-xl border border-command-700/60 flex items-center justify-between">
          <span className="text-slate-400">Deaths Verified:</span>
          <strong className="text-rose-400">{totalVerifiedDeaths} ({totalReportedDeaths} rep)</strong>
        </div>
        <div className="bg-command-900/70 p-2.5 rounded-xl border border-command-700/60 flex items-center justify-between">
          <span className="text-slate-400">Missing Persons:</span>
          <strong className="text-amber-400">32 Tracked</strong>
        </div>
        <div className="bg-command-900/70 p-2.5 rounded-xl border border-command-700/60 flex items-center justify-between">
          <span className="text-slate-400">Hospital ICU Open:</span>
          <strong className="text-cyan-400">{availIcuBeds} Beds</strong>
        </div>
        <div className="bg-command-900/70 p-2.5 rounded-xl border border-command-700/60 flex items-center justify-between">
          <span className="text-slate-400">Relief Fulfilled:</span>
          <strong className="text-emerald-400">74% Target</strong>
        </div>
        <div className="bg-command-900/70 p-2.5 rounded-xl border border-command-700/60 flex items-center justify-between">
          <span className="text-slate-400">Road Arteries:</span>
          <strong className="text-rose-400">3 Severed</strong>
        </div>
        <div className="bg-command-900/70 p-2.5 rounded-xl border border-command-700/60 flex items-center justify-between">
          <span className="text-slate-400">NDRF Boat Units:</span>
          <strong className="text-blue-400">44 Deployed</strong>
        </div>
      </div>

      {/* Primary Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Incident Surge & River Gauge Telemetry */}
        <div className="command-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-400" />
                <span>Incident Surge vs Water Level (24h)</span>
              </h3>
              <p className="text-[11px] text-slate-400">Hourly incident velocity correlated with river flood crest</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              Live SCADA
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentTrendData}>
                <defs>
                  <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b111b', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="incidents" stroke="#ef4444" fillOpacity={1} fill="url(#incGrad)" name="Total Incidents" />
                <Area type="monotone" dataKey="critical" stroke="#f97316" fillOpacity={1} fill="#f97316" name="Critical Incidents" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Casualty Auditing (Reported vs Verified vs Under Verification) */}
        <div className="command-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-cyan-400" />
                <span>Hospital Casualty Triage & Verification Audit</span>
              </h3>
              <p className="text-[11px] text-slate-400">Strict segregation of Reported, Under Verification & Confirmed records</p>
            </div>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              Audit Mandate
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={casualtyTriageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b111b', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Verified" fill="#10b981" name="Verified by Medical Officer" radius={[4, 4, 0, 0]} />
                <Bar dataKey="UnderVerification" fill="#f59e0b" name="Under Verification" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Reported" fill="#ef4444" name="Reported (Unverified)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 3: SAR Rescue Velocity */}
        <div className="command-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-emerald-400" />
                <span>NDRF / SDRF Rescue Throughput</span>
              </h3>
              <p className="text-[11px] text-slate-400">Cumulative citizens rescued vs pending trapped queue</p>
            </div>
            <button
              onClick={() => setActiveTab('sos')}
              className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300"
            >
              Open SAR Queue &rarr;
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rescueVelocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b111b', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="evacuated" stroke="#10b981" strokeWidth={3} name="Total Rescued" />
                <Line type="monotone" dataKey="inQueue" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" name="Pending Trapped" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 4: Relief Distribution Status */}
        <div className="command-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Boxes className="w-4 h-4 text-amber-400" />
                <span>Relief Supplies Deployment & Logistics</span>
              </h3>
              <p className="text-[11px] text-slate-400">Distributed vs allocated stock across camps and drop zones</p>
            </div>
            <button
              onClick={() => setActiveTab('relief')}
              className="text-[11px] font-mono text-amber-400 hover:text-amber-300"
            >
              Logistics Hub &rarr;
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reliefDistributionData.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b111b', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Distributed" fill="#10b981" name="Distributed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Allocated" fill="#f59e0b" name="Allocated in Transit" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live Incident Telemetry & Action Stream */}
      <div className="command-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Live Incident Stream & Dispatch Audit Ticker</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Auto-refreshing every 3s</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-command-700/80 text-slate-400 text-[10px] uppercase">
                <th className="py-2 px-3">Ticket ID</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Location</th>
                <th className="py-2 px-3">Severity</th>
                <th className="py-2 px-3">Assigned Unit</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-command-800">
              {sosRequests.map((req) => (
                <tr key={req.id} className="hover:bg-command-850/60 transition-colors">
                  <td className="py-2 px-3 font-bold text-rose-300">{req.id}</td>
                  <td className="py-2 px-3 text-slate-200">{req.category}</td>
                  <td className="py-2 px-3 text-slate-300 max-w-xs truncate">{req.locationName}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      req.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {req.severity}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-cyan-300">{req.assignedUnit || 'Pending Dispatch'}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.status === 'Rescued' ? 'bg-emerald-500/20 text-emerald-300' :
                      req.status === 'En_Route' ? 'bg-blue-500/20 text-blue-300 animate-pulse' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button
                      onClick={() => setActiveTab('sos')}
                      className="px-2 py-1 rounded bg-command-800 hover:bg-rose-600/30 text-rose-300 border border-command-700 text-[10px]"
                    >
                      Track &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
