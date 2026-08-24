import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  User, 
  LifeBuoy, 
  Building2, 
  Stethoscope, 
  Boxes, 
  ShieldAlert, 
  Radio, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Navigation,
  Send,
  Plus
} from 'lucide-react';

export const RoleSpecificViews: React.FC = () => {
  const { 
    currentRole, 
    sosRequests, 
    updateSosStatus, 
    shelters, 
    hospitals, 
    reliefInventory, 
    distributeRelief, 
    alerts, 
    setActiveTab,
    verifyCasualty
  } = useDisaster();

  /* =========================================================================
     1. CITIZEN VIEW
     ========================================================================= */
  if (currentRole === 'citizen') {
    const activeShelter = shelters[0];
    const topAlert = alerts[0];

    return (
      <div className="space-y-6 pb-12 max-w-4xl mx-auto">
        <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-mono">Citizen Emergency Portal</h1>
              <p className="text-xs text-slate-400 font-mono">Hyperlocal Alerts &bull; Nearest Safe Shelter &bull; Emergency Dispatch</p>
            </div>
          </div>
        </div>

        {/* Big SOS Trigger */}
        <div className="bg-gradient-to-br from-rose-950 via-command-900 to-command-950 border border-rose-500/50 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center mx-auto animate-pulse">
            <LifeBuoy className="w-10 h-10 text-rose-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white font-mono">Immediate Danger or Trapped?</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              Click below to broadcast your live GPS location to NDRF rescue teams and district emergency operators.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('sos')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 text-white font-black font-mono text-sm tracking-wider shadow-xl shadow-rose-950/80 border border-rose-400 glow-red active:scale-98 transition-all"
          >
            BROADCAST EMERGENCY SOS
          </button>
        </div>

        {/* Nearest Shelter Card */}
        <div className="command-card p-5 border-emerald-500/40 space-y-3">
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
            Nearest Safe Evacuation Camp
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-mono">{activeShelter.name}</h3>
              <p className="text-xs text-slate-400 font-mono">
                Distance: <strong className="text-emerald-400">{activeShelter.distanceKm} km</strong> &bull; {activeShelter.available} Beds Open
              </p>
            </div>
            <button
              onClick={() => setActiveTab('shelters')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate Walking Route</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. RESPONDER VIEW (NDRF / SDRF)
     ========================================================================= */
  if (currentRole === 'responder') {
    return (
      <div className="space-y-6 pb-12">
        <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-mono">NDRF & SDRF Responder Terminal</h1>
              <p className="text-xs text-slate-400 font-mono">Assigned Rescue Queue &bull; Tactical Boat Dispatch &bull; Victim Triage</p>
            </div>
          </div>
          <span className="badge-critical font-mono">Unit: NDRF 1st Bn Boat 04</span>
        </div>

        {/* Live Rescue Incident Queue */}
        <div className="command-card p-5 space-y-4">
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Active SAR Dispatch Incidents ({sosRequests.length})</span>
          </h2>

          <div className="space-y-3">
            {sosRequests.map((req) => (
              <div 
                key={req.id}
                className="bg-command-950 p-4 rounded-xl border border-command-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-400">#{req.id}</span>
                    <span className="px-2 py-0.2 rounded bg-command-800 text-slate-300">{req.category}</span>
                    <span className="text-amber-400 font-bold">{req.peopleCount} Citizens</span>
                  </div>
                  <p className="text-white font-semibold">{req.locationName}</p>
                  <p className="text-[11px] text-slate-400">{req.specialNeeds}</p>
                </div>

                {/* Status Toggles */}
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <button
                    onClick={() => updateSosStatus(req.id, 'En_Route')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40"
                  >
                    En Route
                  </button>
                  <button
                    onClick={() => updateSosStatus(req.id, 'On_Scene')}
                    className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40"
                  >
                    On Scene
                  </button>
                  <button
                    onClick={() => updateSosStatus(req.id, 'Rescued')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Mark Rescued
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     3. MEDICAL VIEW
     ========================================================================= */
  if (currentRole === 'medical') {
    const hosp = hospitals[0];
    return (
      <div className="space-y-6 pb-12">
        <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-mono">Hospital & Medical Lead Console</h1>
              <p className="text-xs text-slate-400 font-mono">Bed Admissions &bull; ICU Ventilator Triage &bull; Casualty Certification</p>
            </div>
          </div>
          <span className="badge-official font-mono text-cyan-300">{hosp.name.split(' ')[0]} Hub</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="command-card p-4 space-y-2">
            <span className="text-slate-400 text-[10px] uppercase">Available ICU Units</span>
            <div className="text-3xl font-black text-rose-400">{hosp.icuAvailable} / {hosp.icuTotal}</div>
            <span className="text-slate-400 text-[10px]">Standby for trauma intakes</span>
          </div>

          <div className="command-card p-4 space-y-2">
            <span className="text-slate-400 text-[10px] uppercase">Verified Casualties</span>
            <div className="text-3xl font-black text-emerald-400">{hosp.casualtyTriage.verified}</div>
            <span className="text-slate-400 text-[10px]">{hosp.casualtyTriage.underVerification} Under Inquest</span>
          </div>

          <div className="command-card p-4 space-y-2">
            <span className="text-slate-400 text-[10px] uppercase">Active 108 Ambulances</span>
            <div className="text-3xl font-black text-cyan-400">{hosp.availableAmbulances} / {hosp.activeAmbulances}</div>
            <span className="text-slate-400 text-[10px]">Deployable fleet</span>
          </div>
        </div>

        <div className="command-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-white font-mono">Chief Medical Officer Verification Portal</h3>
          <p className="text-xs text-slate-400 font-mono">
            Validate pending casualty inquest records to convert Reported cases into Verified medical statistics.
          </p>
          <button
            onClick={() => verifyCasualty(hosp.id, 0, 5, -5)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify & Certify 5 Inquest Records</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     4. RELIEF COORDINATOR VIEW
     ========================================================================= */
  if (currentRole === 'relief') {
    return (
      <div className="space-y-6 pb-12">
        <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <Boxes className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-mono">Relief & Resource Logistics Terminal</h1>
              <p className="text-xs text-slate-400 font-mono">Camp Supply Requisitions &bull; Warehouse Dispatches</p>
            </div>
          </div>
        </div>

        <div className="command-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">Warehouse Stock Rapid Dispatch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {reliefInventory.slice(0, 6).map((item) => (
              <div key={item.id} className="bg-command-950 p-3 rounded-xl border border-command-800 space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span>{item.name.split(' ')[0]}</span>
                  <span className="text-emerald-400">{item.available} {item.unit}</span>
                </div>
                <button
                  onClick={() => distributeRelief(item.id, 500)}
                  className="w-full py-1.5 rounded bg-command-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-[11px] font-bold transition-colors"
                >
                  Dispatch 500 {item.unit}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback to Authority / Admin overview
  return (
    <div className="command-card p-6 text-center space-y-3 font-mono">
      <h2 className="text-lg font-bold text-white">Select a specific role above to view tailored workflow</h2>
      <button
        onClick={() => setActiveTab('dashboard')}
        className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
      >
        Go to Executive Command Center
      </button>
    </div>
  );
};
