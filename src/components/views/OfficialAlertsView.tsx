import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { OfficialAlert } from '../../types/disaster';
import { 
  BellRing, 
  ShieldAlert, 
  Radio, 
  Volume2, 
  MessageSquare, 
  Smartphone, 
  Globe, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Building2,
  Navigation
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../data/translations';

export const OfficialAlertsView: React.FC = () => {
  const { 
    alerts, 
    publishOfficialAlert, 
    language, 
    setLanguage, 
    selectedDistrict, 
    shelters, 
    setActiveTab 
  } = useDisaster();

  const [selectedAlert, setSelectedAlert] = useState<OfficialAlert>(alerts[0] || {} as OfficialAlert);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [broadcastTargetDist, setBroadcastTargetDist] = useState<string>(selectedDistrict.name);
  const [broadcastRadius, setBroadcastRadius] = useState<number>(35);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customAction, setCustomAction] = useState<string>('');

  const nearestShelter = shelters[0];

  const handlePlayVoiceAlert = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;

    publishOfficialAlert({
      hazard: 'flood',
      title: customTitle,
      severity: 'Critical',
      issuingAuthority: 'State Emergency Operations Center (SEOC) & NDMA',
      sourceProtocol: 'CAP-v1.2',
      location: broadcastTargetDist,
      state: selectedDistrict.state,
      coordinates: selectedDistrict.coordinates,
      radiusKm: broadcastRadius,
      validUntil: 'Next 24 Hours',
      recommendedAction: customAction || 'Move to higher ground and designated shelter immediately.',
      instructions: [
        'Secure emergency drinking water and medicines.',
        'Follow designated green evacuation corridors.'
      ],
      broadcastChannels: ['CAP', 'SACHET', 'SMS', 'Voice', 'App_Push', 'Siren']
    });

    setCustomTitle('');
    setCustomAction('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Official Government Alerts & Citizen Warning System
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Compliant with NDMA SACHET (CAP-v1.2) &bull; Multi-Lingual Broadcast &bull; Hyperlocal Geo-fencing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-official">
            <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            <span>NDMA SACHET CAP Integrated</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Official Alerts Feed */}
        <div className="command-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono">
              Active Official Alerts ({alerts.length})
            </h3>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              Government Verified
            </span>
          </div>

          <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            {alerts.map((al) => {
              const isSelected = selectedAlert.id === al.id;
              return (
                <div
                  key={al.id}
                  onClick={() => setSelectedAlert(al)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected 
                      ? 'bg-rose-950/40 border-rose-500 shadow-md' 
                      : 'bg-command-950/80 border-command-800 hover:border-command-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="badge-official text-[9px]">
                      {al.sourceProtocol}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      al.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    }`}>
                      {al.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">
                    {al.title}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> {al.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {al.timestamp.split(' ')[1]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right Columns: Detailed Alert Card & Citizen Multi-Lingual Broadcast Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Alert Card */}
          {selectedAlert.id && (
            <div className="command-card p-5 border-rose-500/40 space-y-4 bg-gradient-to-br from-command-900 to-command-950">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-command-700/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="badge-official">
                      Official Government Alert
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {selectedAlert.id}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white font-mono mt-1">
                    {selectedAlert.title}
                  </h2>
                </div>

                {/* Voice Alert Button */}
                <button
                  onClick={() => handlePlayVoiceAlert(`${selectedAlert.title}. ${selectedAlert.recommendedAction}`)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border flex items-center gap-2 transition-all ${
                    isPlayingAudio 
                      ? 'bg-rose-600 text-white border-rose-400 animate-pulse' 
                      : 'bg-command-800 hover:bg-command-700 text-rose-300 border-rose-500/40'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-rose-400" />
                  <span>{isPlayingAudio ? 'Broadcasting Audio...' : 'Play Voice Alert'}</span>
                </button>
              </div>

              {/* Alert Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-command-950 p-2.5 rounded-lg border border-command-800">
                  <span className="text-[10px] text-slate-500 block">Issuing Authority</span>
                  <span className="font-bold text-slate-200 truncate block">{selectedAlert.issuingAuthority}</span>
                </div>
                <div className="bg-command-950 p-2.5 rounded-lg border border-command-800">
                  <span className="text-[10px] text-slate-500 block">Target Location</span>
                  <span className="font-bold text-slate-200">{selectedAlert.location}</span>
                </div>
                <div className="bg-command-950 p-2.5 rounded-lg border border-command-800">
                  <span className="text-[10px] text-slate-500 block">Radius Covered</span>
                  <span className="font-bold text-slate-200">{selectedAlert.radiusKm} km Buffer</span>
                </div>
                <div className="bg-command-950 p-2.5 rounded-lg border border-command-800">
                  <span className="text-[10px] text-slate-500 block">Valid Until</span>
                  <span className="font-bold text-amber-400">{selectedAlert.validUntil}</span>
                </div>
              </div>

              {/* Recommended Action Box */}
              <div className="bg-rose-950/50 border border-rose-500/50 rounded-xl p-4 space-y-1.5">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> Directive for General Public
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {selectedAlert.recommendedAction}
                </p>
              </div>

              {/* Safety Instructions */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">
                  Actionable Emergency Instructions:
                </h4>
                <div className="space-y-1.5">
                  {selectedAlert.instructions?.map((inst, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-command-950 p-2 rounded-lg border border-command-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hyperlocal Nearest Shelter Widget */}
              <div className="bg-command-950 p-4 rounded-xl border border-command-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Nearest Evacuation Shelter</span>
                    <h5 className="text-xs font-bold text-white">{nearestShelter.name}</h5>
                    <p className="text-[11px] text-emerald-400 font-mono">
                      Distance: <strong>{nearestShelter.distanceKm} km</strong> &bull; Approx 14 mins walk &bull; {nearestShelter.available} Beds Available
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('shelters')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate Route</span>
                </button>
              </div>
            </div>
          )}

          {/* Citizen Broadcast Delivery Simulator (SMS / Push / Voice) */}
          <div className="command-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Citizen Push & SMS Alert Simulator (8 Indian Languages)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Preview how the emergency alert formats for citizen mobile devices
                </p>
              </div>

              <div className="flex items-center gap-1">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="bg-command-950 border border-command-700 text-xs font-mono text-slate-200 rounded-lg px-2.5 py-1"
                >
                  {SUPPORTED_LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.nativeLabel} ({l.label})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Push Notification Mockup Card */}
            <div className="bg-gradient-to-br from-command-950 to-command-900 border border-command-700 rounded-2xl p-4 shadow-xl max-w-lg mx-auto space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-command-800 pb-2">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span>EMERGENCY BROADCAST &bull; NDMA SACHET</span>
                </div>
                <span>Just Now</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-black text-rose-300 font-mono uppercase">
                  {selectedAlert.title || 'CRITICAL FLOOD WARNING'}
                </h4>
                <p className="text-xs text-white leading-relaxed">
                  {selectedAlert.recommendedAction || 'Move to higher ground immediately. Evacuate low-lying wards.'}
                </p>
              </div>

              <div className="bg-command-900/90 p-2.5 rounded-xl border border-command-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300">Nearest Shelter: <strong>Govt School (1.8km)</strong></span>
                <span className="text-emerald-400 font-bold">ETA: 14 mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
