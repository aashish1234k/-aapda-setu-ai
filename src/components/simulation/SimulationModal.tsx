import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  FastForward, 
  Radio, 
  CheckCircle2, 
  CloudRain, 
  AlertOctagon, 
  LifeBuoy, 
  Building2, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose }) => {
  const { 
    simulation, 
    startSimulation, 
    pauseSimulation, 
    stepSimulation, 
    resetSimulation, 
    setSimulationSpeed,
    setActiveTab
  } = useDisaster();

  if (!isOpen) return null;

  const stages = [
    {
      number: 1,
      title: 'Cloudburst & Risk Surge',
      shortTitle: 'Rainfall Spike',
      icon: CloudRain,
      summary: 'Upstream precipitation exceeds 180mm. Multi-hazard risk score spikes from 52 to 86 (Critical).',
      targetTab: 'prediction'
    },
    {
      number: 2,
      title: 'Breach & NDMA Alert',
      shortTitle: 'CAP Alert',
      icon: AlertOctagon,
      summary: 'River dyke fails at Bethukandi. National SACHET CAP-v1.2 Level-IV Red Alert broadcasted.',
      targetTab: 'alerts'
    },
    {
      number: 3,
      title: 'SOS Surge & NDRF SAR',
      shortTitle: 'Citizen SOS',
      icon: LifeBuoy,
      summary: 'Rooftop citizens trigger SOS beacons. NDRF Marine Units deployed; evacuation corridors mapped.',
      targetTab: 'sos'
    },
    {
      number: 4,
      title: 'Triage & AI Relief Dispatch',
      shortTitle: 'Medical & Relief',
      icon: Building2,
      summary: 'SMCH initiates casualty triage. AI Logistics Engine calculates priority relief drops for severed zones.',
      targetTab: 'relief'
    },
    {
      number: 5,
      title: 'Recovery & Prevention Policy',
      shortTitle: 'Recovery & Policy',
      icon: ShieldCheck,
      summary: 'Bailey bridge clears highway; Recovery Score rises to 85%. AI generates 3 long-term mitigation policies.',
      targetTab: 'recovery'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-command-900 border border-command-700/80 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-command-950 via-rose-950/60 to-command-950 border-b border-command-700/80 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">
                  Interactive Multi-Hazard Disaster Simulation
                </h3>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-500/40 font-bold">
                  Stage {simulation.currentStage} of 5
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live Scenario: <em>Assam Brahmaputra Basin Inundation & Severe Surge</em>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-command-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Stage Sequence Tracker */}
          <div className="grid grid-cols-5 gap-2">
            {stages.map((stg) => {
              const Icon = stg.icon;
              const isCurrent = simulation.currentStage === stg.number;
              const isPassed = simulation.currentStage > stg.number;
              return (
                <button
                  key={stg.number}
                  onClick={() => stepSimulation(stg.number)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                    isCurrent 
                      ? 'bg-rose-950/50 border-rose-500 shadow-lg shadow-rose-950/50' 
                      : isPassed 
                        ? 'bg-command-800/80 border-emerald-500/50 text-slate-300' 
                        : 'bg-command-950/60 border-command-800 text-slate-500 hover:border-command-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-rose-400' : isPassed ? 'text-emerald-400' : 'text-slate-500'}`}>
                      0{stg.number}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-rose-400 animate-bounce' : 'text-slate-500'}`} />
                    )}
                  </div>
                  <div className="font-bold text-[11px] leading-tight text-slate-200">
                    {stg.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Stage Narration & Telemetry Card */}
          <div className="command-card p-4 border-rose-500/30 bg-gradient-to-br from-command-900 to-command-950">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                  Active Simulation Event
                </span>
                <h4 className="text-sm font-bold text-white font-mono mt-0.5">
                  {simulation.stageName}
                </h4>
              </div>
              <button
                onClick={() => {
                  const target = stages[simulation.currentStage - 1].targetTab;
                  setActiveTab(target);
                  onClose();
                }}
                className="px-2.5 py-1 rounded-lg bg-command-800 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold border border-rose-500/40 flex items-center gap-1 transition-all"
              >
                <span>View Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {simulation.stageDescription}
            </p>

            {/* Event Narration Steps */}
            <div className="bg-command-950/80 rounded-lg p-3 border border-command-800 space-y-1.5 font-mono text-[11px]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                Live Telemetry & State Mutations:
              </div>
              {simulation.narration.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-rose-400 font-bold">&bull;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Playback Controls & Speed Options */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {simulation.isPlaying ? (
                <button
                  onClick={pauseSimulation}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/50 transition-all"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Simulation</span>
                </button>
              ) : (
                <button
                  onClick={startSimulation}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950/50 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{simulation.isActive ? 'Resume Simulation' : 'Run Full Scenario'}</span>
                </button>
              )}

              <button
                onClick={() => stepSimulation(simulation.currentStage - 1)}
                disabled={simulation.currentStage <= 1}
                className="p-2 rounded-xl bg-command-800 hover:bg-command-700 disabled:opacity-40 text-slate-300 border border-command-700"
                title="Previous Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => stepSimulation(simulation.currentStage + 1)}
                disabled={simulation.currentStage >= 5}
                className="p-2 rounded-xl bg-command-800 hover:bg-command-700 disabled:opacity-40 text-slate-300 border border-command-700"
                title="Next Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={resetSimulation}
                className="p-2 rounded-xl bg-command-800 hover:bg-command-700 text-slate-300 border border-command-700"
                title="Reset to Initial Baseline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-1.5 bg-command-950 p-1 rounded-xl border border-command-800 text-xs font-mono">
              <span className="text-[10px] text-slate-400 px-2">Speed:</span>
              {[1, 2, 5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSimulationSpeed(spd)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    simulation.speed === spd 
                      ? 'bg-rose-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
