import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { SOSRequest } from '../../types/disaster';
import { 
  LifeBuoy, 
  MapPin, 
  BatteryCharging, 
  Phone, 
  Send, 
  User, 
  CheckCircle2, 
  Clock, 
  Navigation, 
  AlertOctagon, 
  ShieldAlert, 
  Flame, 
  CloudRain, 
  Mountain, 
  HelpCircle,
  Radio,
  Sparkles,
  Users
} from 'lucide-react';

export const CitizenSosView: React.FC = () => {
  const { 
    sosRequests, 
    activeSosId, 
    setActiveSosId, 
    createSosRequest, 
    updateSosStatus, 
    addSosMessage,
    selectedDistrict 
  } = useDisaster();

  // Form State
  const [senderName, setSenderName] = useState<string>('Priya Sharma');
  const [phone, setPhone] = useState<string>('+91 98765-43210');
  const [category, setCategory] = useState<SOSRequest['category']>('Trapped');
  const [severity, setSeverity] = useState<SOSRequest['severity']>('Critical');
  const [locationName, setLocationName] = useState<string>('Public School Road, Silchar Ward 4');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [specialNeeds, setSpecialNeeds] = useState<string>('Elderly person with asthma inhaler requirement');
  const [chatInput, setChatInput] = useState<string>('');

  // Active SOS
  const activeTicket = sosRequests.find(s => s.id === activeSosId) || sosRequests[0];

  const categories: { id: SOSRequest['category']; label: string; icon: any }[] = [
    { id: 'Trapped', label: 'Trapped on Roof / Building', icon: AlertOctagon },
    { id: 'Medical', label: 'Critical Medical Emergency', icon: LifeBuoy },
    { id: 'Flood', label: 'Flood Surge Ingress', icon: CloudRain },
    { id: 'Landslide', label: 'Landslide Debris Flow', icon: Mountain },
    { id: 'Fire', label: 'Electrical / LPG Fire', icon: Flame },
    { id: 'Missing_Person', label: 'Missing Family Member', icon: Users },
    { id: 'Elderly_Assistance', label: 'Elderly / Disabled Support', icon: User },
    { id: 'Other', label: 'Other Urgent Distress', icon: HelpCircle },
  ];

  const handleTriggerSos = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = createSosRequest({
      senderName,
      phone,
      category,
      severity,
      locationName,
      coordinates: selectedDistrict.coordinates,
      peopleCount,
      specialNeeds
    });
    setActiveSosId(newId);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !activeTicket) return;
    addSosMessage(activeTicket.id, chatInput, 'citizen');
    setChatInput('');

    // Simulate Responder response
    setTimeout(() => {
      addSosMessage(
        activeTicket.id, 
        `NDRF Control: Copy that. Rescue unit is 800 meters out. Keep whistle/torch signaling active.`, 
        'responder'
      );
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Citizen Emergency SOS & Rescue Coordination
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Instant GPS Coordinate Lock &bull; Live NDRF Marine Unit Assignment &bull; Real-Time Responder Comms
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-critical">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SAR Telemetry Active</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: One-Click SOS Emergency Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="command-card p-5 border-rose-500/50 bg-gradient-to-b from-rose-950/40 via-command-900 to-command-950 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-command-700 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <h2 className="text-base font-black text-white font-mono">
                  Trigger New Emergency Beacon
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                GPS Locked: &plusmn;4m
              </span>
            </div>

            <form onSubmit={handleTriggerSos} className="space-y-3.5">
              {/* Category Picker */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                  Select Emergency Distress Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => {
                    const Icon = c.icon;
                    const isSelected = category === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs transition-all ${
                          isSelected 
                            ? 'bg-rose-600 text-white border-rose-400 font-bold shadow-md' 
                            : 'bg-command-950 text-slate-300 border-command-700/80 hover:bg-command-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Citizen Details */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location & Count */}
              <div className="space-y-1 text-xs font-mono">
                <label className="text-[10px] text-slate-400 block">Hyperlocal Landmark / Location</label>
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-rose-500 focus:outline-none"
                  placeholder="e.g. House No 42, 2nd Floor, Near Water Tank"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">People Stranded</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(parseInt(e.target.value) || 1)}
                    className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Distress Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-rose-500 focus:outline-none"
                  >
                    <option value="Critical">Critical (Immediate Danger)</option>
                    <option value="High">High (Water Rising)</option>
                    <option value="Moderate">Moderate (Stranded/Supplies Needed)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <label className="text-[10px] text-slate-400 block">Special Needs / Vulnerabilities</label>
                <input
                  type="text"
                  value={specialNeeds}
                  onChange={(e) => setSpecialNeeds(e.target.value)}
                  className="w-full bg-command-950 border border-command-700 rounded-lg p-2 text-white focus:border-rose-500 focus:outline-none"
                  placeholder="e.g. Infants, elderly, diabetic medicines, oxygen..."
                />
              </div>

              {/* Big Red SOS Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-600 text-white font-black font-mono text-base tracking-wider shadow-2xl shadow-rose-950/80 border border-rose-400/60 glow-red active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <LifeBuoy className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>BROADCAST EMERGENCY SOS</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Active Live SOS Tracker & Two-Way Comms (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeTicket ? (
            <div className="command-card p-5 border-rose-500/40 space-y-5">
              {/* Ticket Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-command-700/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40">
                      TICKET #{activeTicket.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Logged at {activeTicket.timestamp}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-mono mt-1">
                    {activeTicket.category} Distress &bull; {activeTicket.peopleCount} Stranded Citizens
                  </h3>
                </div>

                <div className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border flex items-center gap-1.5 ${
                  activeTicket.status === 'Rescued' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                  activeTicket.status === 'En_Route' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse' :
                  'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  <Radio className="w-3.5 h-3.5" />
                  <span>Status: {activeTicket.status}</span>
                </div>
              </div>

              {/* Responder Assignment Card */}
              <div className="bg-command-950 p-4 rounded-xl border border-command-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">Assigned Rescue Unit</span>
                  <span className="font-bold text-cyan-400">{activeTicket.assignedUnit || 'Dispatching Unit...'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Estimated Rescue ETA</span>
                  <span className="font-bold text-amber-400 text-sm">
                    {activeTicket.responderEtaMinutes ? `${activeTicket.responderEtaMinutes} Minutes` : 'On Scene'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Citizen Device Battery</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <BatteryCharging className="w-3.5 h-3.5" /> {activeTicket.batteryLevel}% Telemetry
                  </span>
                </div>
              </div>

              {/* Distress Details Box */}
              <div className="bg-command-950/60 p-3.5 rounded-xl border border-command-800 text-xs space-y-1 font-mono">
                <div className="text-slate-400">
                  <strong className="text-slate-200">Location:</strong> {activeTicket.locationName}
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-200">Caller:</strong> {activeTicket.senderName} ({activeTicket.phone})
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-200">Special Requirements:</strong> {activeTicket.specialNeeds}
                </div>
              </div>

              {/* Real-time Two-Way Comms Terminal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                  <span>Direct Encrypted Two-Way Field Comms</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Live Relay
                  </span>
                </div>

                <div className="bg-[#070d18] border border-command-800 rounded-xl p-3 h-52 overflow-y-auto space-y-2.5">
                  {activeTicket.messages?.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`flex flex-col ${msg.sender === 'citizen' ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[9px] font-mono text-slate-500 mb-0.5">
                        {msg.sender === 'citizen' ? 'Citizen' : msg.sender === 'responder' ? 'NDRF Boat 04' : 'National Dispatch System'} &bull; {msg.time}
                      </span>
                      <div className={`p-2.5 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                        msg.sender === 'citizen' 
                          ? 'bg-rose-600 text-white rounded-tr-none' 
                          : msg.sender === 'responder' 
                            ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-500/40 rounded-tl-none' 
                            : 'bg-command-900 text-slate-300 border border-command-700 rounded-tl-none font-mono text-[11px]'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comms Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Send status update to NDRF responder..."
                    className="flex-1 bg-command-950 border border-command-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-bold font-mono transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Status Updater for Demo / Authority */}
              <div className="pt-3 border-t border-command-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400">Responder Controls (Demo):</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateSosStatus(activeTicket.id, 'Assigned')}
                    className="px-2.5 py-1 rounded bg-command-800 hover:bg-command-700 text-[10px] font-mono text-slate-300"
                  >
                    Assign Unit
                  </button>
                  <button
                    onClick={() => updateSosStatus(activeTicket.id, 'En_Route')}
                    className="px-2.5 py-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-[10px] font-mono text-blue-300 border border-blue-500/40"
                  >
                    En Route
                  </button>
                  <button
                    onClick={() => updateSosStatus(activeTicket.id, 'Rescued')}
                    className="px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-[10px] font-mono text-emerald-300 border border-emerald-500/40 font-bold"
                  >
                    Mark Rescued
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="command-card p-12 text-center text-slate-400 space-y-2">
              <LifeBuoy className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-mono text-sm">No Active SOS Ticket Selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
