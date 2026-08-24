import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Settings, 
  ShieldCheck, 
  PlusCircle, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Sliders, 
  Navigation, 
  Radio, 
  Send,
  Database
} from 'lucide-react';
import { HazardType, RiskLevel } from '../../types/disaster';

export const AdminManagementView: React.FC = () => {
  const { 
    auditLogs, 
    addAuditLog, 
    publishOfficialAlert, 
    roadSegments, 
    toggleRoadStatus, 
    selectedDistrict 
  } = useDisaster();

  // Create Incident State
  const [incTitle, setIncTitle] = useState<string>('Flash Flood Surge in Sonai Sub-Division');
  const [incHazard, setIncHazard] = useState<HazardType>('flood');
  const [incSeverity, setIncSeverity] = useState<RiskLevel>('Critical');
  const [incAction, setIncAction] = useState<string>('Enact immediate high-ground evacuation of Sonai circle.');

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    publishOfficialAlert({
      hazard: incHazard,
      title: incTitle,
      severity: incSeverity,
      issuingAuthority: 'District Disaster Management Authority (DDMA)',
      sourceProtocol: 'CAP-v1.2',
      location: selectedDistrict.name,
      state: selectedDistrict.state,
      coordinates: selectedDistrict.coordinates,
      radiusKm: 20,
      validUntil: 'Next 24h',
      recommendedAction: incAction,
      instructions: [
        'Move to notified community relief shelters.',
        'Follow designated green evacuation corridors.'
      ],
      broadcastChannels: ['CAP', 'SACHET', 'SMS', 'Voice', 'App_Push']
    });
    setIncTitle('');
    setIncAction('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Command Administration & Cryptographic Audit Trail
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Official Incident Authority Controls &bull; Road Network Toggles &bull; Tamper-Evident Action Logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-official font-mono text-blue-300 border-blue-500/40">
            <Database className="w-3.5 h-3.5" />
            <span>PostgreSQL & CAP 1.2 Ready</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Create Incident Form */}
        <div className="command-card p-5 border-blue-500/40 space-y-4">
          <div className="flex items-center gap-2 border-b border-command-700 pb-3">
            <PlusCircle className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white font-mono">
              Declare Incident & Broadcast CAP Alert
            </h2>
          </div>

          <form onSubmit={handleCreateIncident} className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Incident Headline / Title</label>
              <input
                type="text"
                required
                value={incTitle}
                onChange={(e) => setIncTitle(e.target.value)}
                className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Hazard Category</label>
                <select
                  value={incHazard}
                  onChange={(e) => setIncHazard(e.target.value as any)}
                  className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="flood">Flood</option>
                  <option value="cyclone">Cyclone</option>
                  <option value="landslide">Landslide</option>
                  <option value="extreme_rainfall">Extreme Rainfall</option>
                  <option value="urban_flooding">Urban Flooding</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Severity Level</label>
                <select
                  value={incSeverity}
                  onChange={(e) => setIncSeverity(e.target.value as any)}
                  className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="Critical">Critical (Stage IV)</option>
                  <option value="High">High (Stage III)</option>
                  <option value="Moderate">Moderate (Stage II)</option>
                  <option value="Low">Low (Stage I)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Recommended Public Directive</label>
              <textarea
                rows={3}
                required
                value={incAction}
                onChange={(e) => setIncAction(e.target.value)}
                className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Official Directive</span>
            </button>
          </form>
        </div>

        {/* Center Column: Road Closure & Traffic Operations */}
        <div className="command-card p-5 border-command-700/80 space-y-4">
          <div className="flex items-center gap-2 border-b border-command-700 pb-3">
            <Navigation className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white font-mono">
              Road Corridors & Blockage Toggles
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {roadSegments.map((rd) => (
              <div key={rd.id} className="bg-command-950 p-3 rounded-xl border border-command-800 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">{rd.name}</h4>
                    <span className="text-[10px] text-slate-400 block">
                      {rd.from} &rarr; {rd.to}
                    </span>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                    rd.status === 'Open' || rd.status === 'Restored' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {rd.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    onClick={() => toggleRoadStatus(rd.id, 'Waterlogged')}
                    className="px-2 py-1 rounded bg-command-800 hover:bg-command-700 text-[10px] text-slate-300"
                  >
                    Mark Waterlogged
                  </button>
                  <button
                    onClick={() => toggleRoadStatus(rd.id, 'Bridge_Collapsed')}
                    className="px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900 text-[10px] text-rose-300 border border-rose-500/40"
                  >
                    Bridge Down
                  </button>
                  <button
                    onClick={() => toggleRoadStatus(rd.id, 'Restored')}
                    className="px-2 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900 text-[10px] text-emerald-300 border border-emerald-500/40 font-bold"
                  >
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Immutable Audit Trail Log */}
        <div className="command-card p-5 border-command-700/80 space-y-4">
          <div className="flex items-center justify-between border-b border-command-700 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white font-mono">
                Immutable Audit Trail
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{auditLogs.length} Entries</span>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 font-mono text-[11px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="bg-command-950 p-2.5 rounded-lg border border-command-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-bold text-rose-300 text-[10px]">{log.action}</span>
                  <span className="text-[10px]">{log.timestamp}</span>
                </div>
                <p className="text-slate-200 text-[11px] leading-tight">{log.details}</p>
                <div className="flex justify-between text-[9px] text-slate-500 pt-0.5">
                  <span>Role: {log.userRole.toUpperCase()}</span>
                  <span>{log.ipHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
