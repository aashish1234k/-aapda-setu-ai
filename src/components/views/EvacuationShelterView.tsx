import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { Shelter } from '../../types/disaster';
import { 
  Building2, 
  Navigation, 
  MapPin, 
  Users, 
  Droplets, 
  Utensils, 
  Zap, 
  Wifi, 
  Accessibility, 
  Baby, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  Plus, 
  Minus,
  Sparkles,
  ShieldCheck,
  Fuel
} from 'lucide-react';

export const EvacuationShelterView: React.FC = () => {
  const { shelters, updateShelterOccupancy, roadSegments } = useDisaster();

  const [selectedShelter, setSelectedShelter] = useState<Shelter>(shelters[0]);
  const [filterType, setFilterType] = useState<string>('all');

  // Aggregations
  const totalShelters = shelters.length;
  const activeShelters = shelters.filter(s => s.status === 'Active').length;
  const fullShelters = shelters.filter(s => s.status === 'Full').length;
  const totalCap = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalOcc = shelters.reduce((acc, s) => acc + s.occupied, 0);
  const totalAvail = totalCap - totalOcc;

  const filteredShelters = shelters.filter(s => {
    if (filterType === 'active') return s.status === 'Active';
    if (filterType === 'full') return s.status === 'Full';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Safe Evacuation Routing & Shelter Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Dynamic Safe-Corridor Navigation &bull; Live Bed Vacancy Telemetry &bull; Camp Amenities Audit
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-low font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>{totalAvail} Available Beds Nationwide</span>
          </span>
        </div>
      </div>

      {/* Shelter Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="command-card p-4 border-cyan-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Total Shelters Notified</span>
          <div className="text-2xl font-black font-mono text-white mt-1">{totalShelters}</div>
          <span className="text-[10px] text-cyan-300 font-mono">{totalCap.toLocaleString()} Capacity</span>
        </div>

        <div className="command-card p-4 border-emerald-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Active / Accepting</span>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{activeShelters}</div>
          <span className="text-[10px] text-emerald-300 font-mono">{totalAvail} Open Spaces</span>
        </div>

        <div className="command-card p-4 border-rose-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Full / Overload</span>
          <div className="text-2xl font-black font-mono text-rose-400 mt-1">{fullShelters}</div>
          <span className="text-[10px] text-rose-300 font-mono">Diverting to Sector Hubs</span>
        </div>

        <div className="command-card p-4 border-amber-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Overall Occupancy Rate</span>
          <div className="text-2xl font-black font-mono text-amber-400 mt-1">
            {Math.round((totalOcc / totalCap) * 100)}%
          </div>
          <span className="text-[10px] text-amber-300 font-mono">{totalOcc.toLocaleString()} Occupied</span>
        </div>
      </div>

      {/* Evacuation Route Planner Card */}
      <div className="command-card p-5 border-emerald-500/40 bg-gradient-to-br from-command-900 to-emerald-950/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-command-700/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                AI SAFE CORRIDOR NAVIGATOR
              </span>
              <span className="text-[10px] font-mono text-slate-400">Avoiding 3 Submerged Arteries</span>
            </div>
            <h2 className="text-base font-bold text-white font-mono mt-1">
              Recommended Route to {selectedShelter.name}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-400 block">Estimated Walking Travel Time</span>
            <span className="text-sm font-black font-mono text-emerald-400">
              14 Minutes &bull; {selectedShelter.distanceKm} km
            </span>
          </div>
        </div>

        {/* Route Steps Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-command-950 p-3 rounded-xl border border-command-800 space-y-1">
            <span className="text-rose-400 font-bold text-[10px] block">POINT A (YOUR GPS)</span>
            <span className="text-white font-semibold">Public School Road</span>
            <span className="text-[10px] text-slate-400 block">Elevation: 22m (Warning)</span>
          </div>
          <div className="bg-command-950 p-3 rounded-xl border border-command-800 space-y-1">
            <span className="text-emerald-400 font-bold text-[10px] block">TURN 1 (SAFE ELEVATION)</span>
            <span className="text-white font-semibold">Hospital Bypass Road</span>
            <span className="text-[10px] text-slate-400 block">Dry Ridgeline (Clear)</span>
          </div>
          <div className="bg-command-950 p-3 rounded-xl border border-command-800 space-y-1">
            <span className="text-emerald-400 font-bold text-[10px] block">TURN 2 (LIGHTED CORRIDOR)</span>
            <span className="text-white font-semibold">Tarapur High Ridge</span>
            <span className="text-[10px] text-slate-400 block">NDRF Volunteers Present</span>
          </div>
          <div className="bg-command-950 p-3 rounded-xl border border-emerald-500/50 space-y-1 bg-emerald-950/30">
            <span className="text-emerald-300 font-bold text-[10px] block">DESTINATION (SAFE ZONE)</span>
            <span className="text-white font-bold">{selectedShelter.name.split(' ')[0]} Shelter</span>
            <span className="text-[10px] text-emerald-400 block">{selectedShelter.available} Beds Open</span>
          </div>
        </div>
      </div>

      {/* Shelters Inventory Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Designated Relief Shelters & Essential Supplies Telemetry</span>
          </h3>

          <div className="flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg ${filterType === 'all' ? 'bg-command-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('active')}
              className={`px-2.5 py-1 rounded-lg ${filterType === 'active' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterType('full')}
              className={`px-2.5 py-1 rounded-lg ${filterType === 'full' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Full
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredShelters.map((sh) => {
            const isSelected = selectedShelter.id === sh.id;
            const occPct = Math.round((sh.occupied / sh.capacity) * 100);

            return (
              <div
                key={sh.id}
                onClick={() => setSelectedShelter(sh)}
                className={`command-card p-5 cursor-pointer transition-all space-y-4 ${
                  isSelected ? 'border-emerald-500/70 shadow-lg' : 'hover:border-command-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {sh.type} &bull; {sh.district}, {sh.state}
                    </span>
                    <h4 className="text-sm font-bold text-white font-mono mt-0.5">
                      {sh.name}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    sh.status === 'Full' ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  }`}>
                    {sh.status}
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Occupancy: <strong>{sh.occupied} / {sh.capacity}</strong></span>
                    <span className={sh.available === 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {sh.available} Beds Available ({occPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-command-950 rounded-full h-2 overflow-hidden border border-command-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${occPct >= 95 ? 'bg-rose-500' : occPct >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${occPct}%` }}
                    />
                  </div>
                </div>

                {/* Amenities Checklist Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                  <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                    sh.supplies.foodAvailability === 'Abundant' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  }`}>
                    <Utensils className="w-3 h-3" />
                    <span>Food: {sh.supplies.foodAvailability}</span>
                  </div>

                  <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                    sh.supplies.waterAvailability === 'Abundant' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                  }`}>
                    <Droplets className="w-3 h-3" />
                    <span>Water: {sh.supplies.waterAvailability}</span>
                  </div>

                  <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                    sh.supplies.powerBackup ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-command-950 border-command-800 text-slate-500'
                  }`}>
                    <Zap className="w-3 h-3" />
                    <span>Gen Fuel: {sh.supplies.generatorFuelHours}h</span>
                  </div>

                  <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                    sh.supplies.medicalSupport ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300' : 'bg-command-950 border-command-800 text-slate-500'
                  }`}>
                    <ShieldCheck className="w-3 h-3" />
                    <span>Medical Desk</span>
                  </div>
                </div>

                {/* Contact & Live Check-in Controls (for Camp In-Charge / Demo) */}
                <div className="pt-2 border-t border-command-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <Phone className="w-3 h-3 text-slate-500" />
                    <span>{sh.contactPerson}: <strong>{sh.contactPhone}</strong></span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateShelterOccupancy(sh.id, sh.occupied - 10);
                      }}
                      className="p-1 rounded bg-command-800 hover:bg-command-700 text-slate-300"
                      title="Check out 10 citizens"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateShelterOccupancy(sh.id, sh.occupied + 10);
                      }}
                      className="p-1 rounded bg-command-800 hover:bg-command-700 text-slate-300"
                      title="Check in 10 citizens"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
