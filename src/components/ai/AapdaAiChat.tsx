import React, { useState, useRef, useEffect } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  AlertCircle, 
  User, 
  ChevronDown,
  CornerDownLeft,
  LifeBuoy
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  actionRecommendation?: { label: string; tab: string };
}

export const AapdaAiChat: React.FC = () => {
  const { 
    hazards, 
    shelters, 
    hospitals, 
    roadSegments, 
    priorityZones, 
    recoveryData, 
    selectedDistrict, 
    setActiveTab,
    alerts
  } = useDisaster();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Namaste. I am Aapda AI, your emergency decision-support copilot. I am connected to live telemetry from NDMA SACHET, IMD Radar, Hospital HMS, and GIS maps. How can I assist your operations?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    "What is the flood risk in Cachar?",
    "Where is the nearest safe shelter?",
    "Which hospital has available ICU beds?",
    "Which roads are currently blocked?",
    "Where should relief supplies be prioritized?",
    "Why is the recovery score 68%?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleVoiceSpeak = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const generateAnswer = (query: string): { text: string; action?: { label: string; tab: string } } => {
    const q = query.toLowerCase();

    if (q.includes('flood') || q.includes('risk') || q.includes('cachar') || q.includes('score')) {
      const f = hazards.flood;
      return {
        text: `Based on live IMD and CWC telemetry, Cachar District is under a CRITICAL Flood Risk of ${f.score}/100. Key contributing drivers include: 24h Rainfall at 188mm (+27.6 pts), River gauge 1.84m above extreme danger mark (+23.5 pts), and 91% soil runoff saturation (+13.2 pts). Stage-IV evacuation to high ground is actively advised.`,
        action: { label: 'Inspect AI Risk Breakdown', tab: 'prediction' }
      };
    }

    if (q.includes('shelter') || q.includes('evacuate') || q.includes('safe zone')) {
      const activeShelter = shelters.find(s => s.status === 'Active') || shelters[0];
      return {
        text: `The nearest active safe shelter is "${activeShelter.name}" (${activeShelter.distanceKm} km away). Capacity: ${activeShelter.capacity} persons (${activeShelter.available} beds currently available). It is equipped with potable water, generator power backup, and a medical triage desk.`,
        action: { label: 'View Evacuation Routing', tab: 'shelters' }
      };
    }

    if (q.includes('hospital') || q.includes('icu') || q.includes('bed') || q.includes('doctor')) {
      const totalAvailBeds = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);
      const totalAvailIcu = hospitals.reduce((acc, h) => acc + h.icuAvailable, 0);
      return {
        text: `Across operational facilities, there are ${totalAvailBeds} General Beds and ${totalAvailIcu} ICU Beds currently available. Silchar Medical College & Hospital (SMCH) has 114 general beds and 12 ICU units on standby with 18 active ALS ambulances in the field.`,
        action: { label: 'Open Hospital Response Hub', tab: 'medical' }
      };
    }

    if (q.includes('road') || q.includes('blocked') || q.includes('route') || q.includes('highway')) {
      const blocked = roadSegments.filter(r => r.status !== 'Open' && r.status !== 'Restored');
      const names = blocked.map(b => `${b.name} (${b.status})`).join(', ');
      return {
        text: `Caution: ${blocked.length} road arteries are currently impassable: ${names}. The recommended clear corridor from the DC Office to Medical College is via the Emergency Hospital Bypass Road.`,
        action: { label: 'View Live GIS Road Map', tab: 'gis_map' }
      };
    }

    if (q.includes('relief') || q.includes('food') || q.includes('water') || q.includes('priority')) {
      const topZone = priorityZones[0];
      return {
        text: `AI Resource Logistics recommends immediate dispatch priority to "${topZone.zoneName}" (Relief Deficit: ${topZone.reliefDeficitRatio}%). 22,000 citizens are stranded with vehicle access severed. Airdrops of MRE food packets and chlorine pouches are mobilized.`,
        action: { label: 'Manage Relief Logistics', tab: 'relief' }
      };
    }

    if (q.includes('recovery') || q.includes('formula') || q.includes('weights')) {
      return {
        text: `The Dynamic Recovery Score is currently ${recoveryData.overallScore}%. It is computed from: Infrastructure Restoration (30% weight: ${recoveryData.domains.infrastructure}%), Healthcare Stabilization (20% weight: ${recoveryData.domains.healthcare}%), Road Connectivity (25% weight: ${recoveryData.domains.roadConnectivity}%), and Relief Distribution (25% weight: ${recoveryData.domains.reliefDistribution}%).`,
        action: { label: 'Open Recovery Dashboard', tab: 'recovery' }
      };
    }

    return {
      text: `Aapda AI is tracking active disaster intelligence for ${selectedDistrict.name}. You can query real-time hazard scores, shelter vacancies, ICU availability, road closures, or dispatch SAR units directly through the command tabs.`,
      action: { label: 'Go to Command Center', tab: 'dashboard' }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const { text: responseText, action } = generateAnswer(text);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionRecommendation: action
      };
      setMessages(prev => [...prev, botMsg]);
      handleVoiceSpeak(responseText);
    }, 400);
  };

  return (
    <>
      {/* Floating Assistant Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-2xl shadow-rose-950/80 border border-rose-400/50 flex items-center gap-2 glow-red transition-all hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-command-950"></span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black font-mono leading-none">Aapda AI</span>
            <span className="text-[10px] text-amber-200 leading-none mt-0.5">Emergency Copilot</span>
          </div>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full sm:w-96 max-w-[calc(100vw-3rem)] h-[520px] bg-command-900 border border-command-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-command-950 via-rose-950/70 to-command-950 p-3.5 border-b border-command-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center">
                <Bot className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white font-mono leading-tight">Aapda AI</h4>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-1.5 py-0.2 rounded border border-emerald-500/40">
                    Live Telemetry
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                  Disaster Decision-Support Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (speechEnabled) window.speechSynthesis?.cancel();
                  setSpeechEnabled(!speechEnabled);
                }}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-white ${speechEnabled ? 'text-amber-400' : ''}`}
                title={speechEnabled ? "Mute Speech" : "Enable Speech"}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-command-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="bg-command-950/90 px-3 py-2 border-b border-command-800 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="whitespace-nowrap px-2 py-1 rounded-lg bg-command-800 hover:bg-rose-950/60 hover:border-rose-500/50 text-[11px] text-slate-300 hover:text-rose-300 border border-command-700/80 transition-all font-mono"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#080d16]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-rose-600/30 border border-rose-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                )}
                <div className={`max-w-[82%] space-y-1.5 ${
                  msg.sender === 'user' 
                    ? 'bg-rose-600 text-white rounded-2xl rounded-tr-sm p-2.5 text-xs shadow-md' 
                    : 'bg-command-900 border border-command-700/80 text-slate-200 rounded-2xl rounded-tl-sm p-3 text-xs shadow-md'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.actionRecommendation && (
                    <button
                      onClick={() => {
                        setActiveTab(msg.actionRecommendation!.tab);
                        setIsOpen(false);
                      }}
                      className="mt-2 w-full py-1 px-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-mono font-bold text-[10px] border border-rose-500/40 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-rose-400" />
                      <span>{msg.actionRecommendation.label} &rarr;</span>
                    </button>
                  )}
                  
                  <span className="text-[9px] text-slate-400 block text-right font-mono">
                    {msg.time}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-command-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-command-900 border-t border-command-700/80">
            <div className="flex items-center gap-1.5 bg-command-950 rounded-xl border border-command-700 p-1 pl-3 focus-within:border-rose-500 transition-colors">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Aapda AI regarding hazards, shelters, ICU beds..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="p-2 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 mt-1 font-mono">
              <span>Emergency Disclaimer: Consult 112 for direct dispatch</span>
              <span>v2.4 Grounded Telemetry</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
