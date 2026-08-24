import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  TrendingUp, 
  Settings2, 
  Building2, 
  Stethoscope, 
  Navigation, 
  Boxes, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  ShieldCheck,
  Sparkles,
  Sliders
} from 'lucide-react';

export const RecoveryDashboardView: React.FC = () => {
  const { recoveryData, updateRecoveryWeights } = useDisaster();

  const [showWeightModal, setShowWeightModal] = useState<boolean>(false);
  const [infraWeight, setInfraWeight] = useState<number>(recoveryData.weights.infrastructure * 100);
  const [healthWeight, setHealthWeight] = useState<number>(recoveryData.weights.healthcare * 100);
  const [roadWeight, setRoadWeight] = useState<number>(recoveryData.weights.roadConnectivity * 100);
  const [reliefWeight, setReliefWeight] = useState<number>(recoveryData.weights.reliefDistribution * 100);

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    const sum = infraWeight + healthWeight + roadWeight + reliefWeight;
    if (sum === 0) return;

    updateRecoveryWeights({
      infrastructure: infraWeight / 100,
      healthcare: healthWeight / 100,
      roadConnectivity: roadWeight / 100,
      reliefDistribution: reliefWeight / 100,
    });
    setShowWeightModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Dynamic Post-Disaster Recovery & Reconstruction Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Central AapdaSetu USP &bull; Mathematically Derived Resilience Index &bull; Day 0 to Day 30 Milestones
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWeightModal(true)}
            className="px-3.5 py-2 rounded-xl bg-command-800 hover:bg-command-700 text-slate-200 border border-command-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <Settings2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Configure Domain Weights</span>
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="command-card p-6 border-purple-500/50 bg-gradient-to-br from-command-900 via-purple-950/20 to-command-950 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Big Composite Gauge */}
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full bg-command-950 border-4 border-purple-500/50 flex flex-col items-center justify-center shadow-xl shadow-purple-950/50">
              <span className="text-3xl font-black font-mono text-purple-300">
                {recoveryData.overallScore}%
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Recovery Index
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40">
                  REAL-TIME DYNAMIC COMPUTATION
                </span>
                <span className="text-[10px] font-mono text-slate-400">Target Normalcy: 85%</span>
              </div>
              <h2 className="text-lg font-bold text-white font-mono">
                Bharat Post-Disaster Rehabilitation Telemetry
              </h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Calculated dynamically from 4 underlying operational domains: Infrastructure ({(recoveryData.weights.infrastructure*100).toFixed(0)}%), Healthcare ({(recoveryData.weights.healthcare*100).toFixed(0)}%), Road Arteries ({(recoveryData.weights.roadConnectivity*100).toFixed(0)}%), and Relief Logistics ({(recoveryData.weights.reliefDistribution*100).toFixed(0)}%).
              </p>
            </div>
          </div>

          {/* Quick Normalcy Counter */}
          <div className="bg-command-950 p-4 rounded-xl border border-command-800 space-y-2 text-xs font-mono min-w-[240px]">
            <div className="flex justify-between text-slate-400">
              <span>Affected Population:</span>
              <strong className="text-white">{recoveryData.affectedPopulationTotal.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Restored to Normalcy:</span>
              <strong className="text-emerald-400">{recoveryData.populationRestoredNormalcy.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Roads Restored:</span>
              <strong className="text-cyan-400">{recoveryData.roadsRestoredKm} / {recoveryData.roadsDamagedKm} km</strong>
            </div>
          </div>
        </div>

        {/* 4 Domain Sub-Score Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Domain 1: Infrastructure */}
          <div className="bg-command-950 p-4 rounded-xl border border-command-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" /> Infrastructure
              </span>
              <span className="text-blue-400 font-bold">{recoveryData.domains.infrastructure}%</span>
            </div>
            <div className="w-full bg-command-900 rounded-full h-2 overflow-hidden border border-command-700">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${recoveryData.domains.infrastructure}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">Weight: {(recoveryData.weights.infrastructure*100).toFixed(0)}% contribution</span>
          </div>

          {/* Domain 2: Healthcare */}
          <div className="bg-command-950 p-4 rounded-xl border border-command-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-cyan-400" /> Healthcare
              </span>
              <span className="text-cyan-400 font-bold">{recoveryData.domains.healthcare}%</span>
            </div>
            <div className="w-full bg-command-900 rounded-full h-2 overflow-hidden border border-command-700">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${recoveryData.domains.healthcare}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">Weight: {(recoveryData.weights.healthcare*100).toFixed(0)}% contribution</span>
          </div>

          {/* Domain 3: Road Connectivity */}
          <div className="bg-command-950 p-4 rounded-xl border border-command-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-400" /> Road Arteries
              </span>
              <span className="text-amber-400 font-bold">{recoveryData.domains.roadConnectivity}%</span>
            </div>
            <div className="w-full bg-command-900 rounded-full h-2 overflow-hidden border border-command-700">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${recoveryData.domains.roadConnectivity}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">Weight: {(recoveryData.weights.roadConnectivity*100).toFixed(0)}% contribution</span>
          </div>

          {/* Domain 4: Relief Distribution */}
          <div className="bg-command-950 p-4 rounded-xl border border-command-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-emerald-400" /> Relief Supply
              </span>
              <span className="text-emerald-400 font-bold">{recoveryData.domains.reliefDistribution}%</span>
            </div>
            <div className="w-full bg-command-900 rounded-full h-2 overflow-hidden border border-command-700">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${recoveryData.domains.reliefDistribution}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">Weight: {(recoveryData.weights.reliefDistribution*100).toFixed(0)}% contribution</span>
          </div>
        </div>
      </div>

      {/* Day 0 to Day 30 Recovery Timeline */}
      <div className="command-card p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-command-700/80 pb-3">
          <div>
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Day 0 to Day 30 Disaster Recovery Milestones</span>
            </h3>
            <p className="text-xs text-slate-400">
              Standard operating rehabilitation roadmap from initial strike to permanent reconstruction
            </p>
          </div>
          <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/30">
            Phase IV: Road & Power Stabilization
          </span>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {recoveryData.milestones.map((m, idx) => (
            <div 
              key={m.dayLabel}
              className="bg-command-950 p-4 rounded-xl border border-command-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-command-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="px-2.5 py-1 rounded-lg bg-command-800 text-purple-300 font-mono font-bold text-xs border border-command-700 flex-shrink-0">
                  {m.dayLabel}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white font-mono">{m.phaseTitle}</h4>
                    {m.status === 'completed' && (
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-1.5 py-0.2 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                    {m.status === 'in_progress' && (
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono px-1.5 py-0.2 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" /> In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>

              {/* Progress meter */}
              <div className="flex items-center gap-3 min-w-[180px] font-mono text-xs">
                <div className="w-full bg-command-900 rounded-full h-2 overflow-hidden border border-command-700">
                  <div 
                    className={`h-full rounded-full ${m.progress === 100 ? 'bg-emerald-500' : 'bg-purple-500'}`} 
                    style={{ width: `${m.progress}%` }} 
                  />
                </div>
                <span className="font-bold text-slate-300 w-10 text-right">{m.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configurable Domain Weights Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-command-900 border border-command-700 rounded-2xl shadow-2xl w-full max-w-md p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-command-700/80 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Configure Recovery Weight Coefficients
                </h3>
              </div>
              <button 
                onClick={() => setShowWeightModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Customize the mathematical formula weights used to compute the composite Recovery Score:
            </p>

            <form onSubmit={handleSaveWeights} className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Infrastructure Weight:</span>
                  <strong className="text-blue-400">{infraWeight}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={infraWeight}
                  onChange={(e) => setInfraWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-command-950 rounded appearance-none accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Healthcare Stabilization Weight:</span>
                  <strong className="text-cyan-400">{healthWeight}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={healthWeight}
                  onChange={(e) => setHealthWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-command-950 rounded appearance-none accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Road Connectivity Weight:</span>
                  <strong className="text-amber-400">{roadWeight}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={roadWeight}
                  onChange={(e) => setRoadWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-command-950 rounded appearance-none accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Relief Distribution Weight:</span>
                  <strong className="text-emerald-400">{reliefWeight}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reliefWeight}
                  onChange={(e) => setReliefWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-command-950 rounded appearance-none accent-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs mt-2"
              >
                Save & Recalculate Recovery Score
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
