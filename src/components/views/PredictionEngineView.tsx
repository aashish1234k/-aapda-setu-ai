import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { HazardType, ContributingFactor } from '../../types/disaster';
import { 
  Cpu, 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  HelpCircle,
  CloudRain,
  Wind,
  Mountain,
  Flame,
  Droplets,
  Zap,
  Building,
  Activity
} from 'lucide-react';

export const PredictionEngineView: React.FC = () => {
  const { 
    hazards, 
    selectedHazard, 
    setSelectedHazard, 
    updateHazardFactor, 
    resetHazardFactors,
    selectedDistrict
  } = useDisaster();

  const currentHazard = hazards[selectedHazard] || hazards.flood;
  const [showExplainModal, setShowExplainModal] = useState<boolean>(false);

  const hazardIcons: Record<HazardType, any> = {
    flood: CloudRain,
    cyclone: Wind,
    landslide: Mountain,
    heatwave: Flame,
    drought: Droplets,
    earthquake_hazard: Activity,
    extreme_rainfall: CloudRain,
    urban_flooding: Building,
    lightning_storm: Zap,
  };

  const getScoreColor = (score: number) => {
    if (score >= 81) return { text: 'text-rose-400', bg: 'bg-rose-500', border: 'border-rose-500/50', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/50' };
    if (score >= 61) return { text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500/50', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/50' };
    if (score >= 31) return { text: 'text-yellow-400', bg: 'bg-yellow-500', border: 'border-yellow-500/50', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' };
    return { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/50', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' };
  };

  const colorTokens = getScoreColor(currentHazard.score);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              AI Multi-Hazard Risk Prediction Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Dynamic 0–100 Weighted Scorer &bull; Explainable Feature Attributions &bull; Multi-Hazard Telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => resetHazardFactors(selectedHazard)}
            className="px-3 py-1.5 rounded-xl bg-command-800 hover:bg-command-700 text-slate-300 hover:text-white border border-command-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>

          <button
            onClick={() => setShowExplainModal(!showExplainModal)}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/50 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Why this score?</span>
          </button>
        </div>
      </div>

      {/* Hazard Selector Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        {(Object.keys(hazards) as HazardType[]).map((hKey) => {
          const haz = hazards[hKey];
          const Icon = hazardIcons[hKey] || CloudRain;
          const isSelected = selectedHazard === hKey;
          const hazColor = getScoreColor(haz.score);

          return (
            <button
              key={hKey}
              onClick={() => setSelectedHazard(hKey)}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                isSelected 
                  ? 'bg-rose-950/50 border-rose-500 shadow-lg shadow-rose-950/40 scale-102' 
                  : 'bg-command-900/80 border-command-700/60 hover:bg-command-850 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-400' : 'text-slate-400'}`} />
                <span className={`text-[10px] font-mono font-black ${hazColor.text}`}>
                  {haz.score}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-200 line-clamp-1">
                {haz.displayName.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Score & Factor Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Composite Gauge & AI Summary */}
        <div className="command-card p-5 space-y-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Active Hazard Assessment
            </span>
            <h2 className="text-lg font-bold text-white font-mono mt-0.5">
              {currentHazard.displayName}
            </h2>
            <p className="text-xs text-slate-400">
              Target District: <strong className="text-slate-200">{selectedDistrict.name}</strong>
            </p>
          </div>

          {/* Big Score Gauge Box */}
          <div className={`p-6 rounded-2xl bg-command-950 border ${colorTokens.border} flex flex-col items-center justify-center text-center space-y-2 shadow-xl`}>
            <span className="text-xs font-mono uppercase text-slate-400">AI Risk Score</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-6xl font-black font-mono tracking-tight ${colorTokens.text}`}>
                {currentHazard.score}
              </span>
              <span className="text-xl font-mono text-slate-500">/ 100</span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold border ${colorTokens.badge}`}>
              Level: {currentHazard.level.toUpperCase()}
            </div>

            <div className="w-full bg-command-900 rounded-full h-3 mt-3 overflow-hidden border border-command-700">
              <div 
                className={`h-full transition-all duration-300 ${colorTokens.bg}`}
                style={{ width: `${currentHazard.score}%` }}
              />
            </div>

            <div className="flex justify-between w-full text-[10px] font-mono text-slate-500 pt-1">
              <span>0 (Low)</span>
              <span>30 (Mod)</span>
              <span>60 (High)</span>
              <span>80 (Critical)</span>
            </div>
          </div>

          {/* AI Synthesis Summary */}
          <div className="space-y-2 text-xs">
            <h4 className="font-mono font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-rose-400" />
              <span>AI Diagnostic Assessment</span>
            </h4>
            <p className="text-slate-300 leading-relaxed bg-command-950 p-3 rounded-xl border border-command-800 text-[11px]">
              {currentHazard.summary}
            </p>
          </div>

          {/* Suggested Response Directive */}
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" /> Recommended Directive
            </span>
            <p className="text-xs text-slate-200 font-medium">
              {currentHazard.suggestedAction}
            </p>
          </div>

          {/* Special Safety Note for Earthquake Hazard */}
          {selectedHazard === 'earthquake_hazard' && (
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-2.5 text-[11px] text-amber-200">
              <strong>Mandatory Safety Guardrail:</strong> Earthquake score represents seismic hazard zoning, structural masonry vulnerability, and historical fault proximity. It does not claim short-term time/location prediction.
            </div>
          )}
        </div>

        {/* Right Col: Interactive Feature Sliders & Factor Attributions */}
        <div className="lg:col-span-2 command-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4 text-rose-400" />
                <span>Contributing Factors & Real-Time Slider Tuning</span>
              </h3>
              <p className="text-xs text-slate-400">
                Drag any parameter slider below to simulate extreme weather changes and watch the score recalculate live.
              </p>
            </div>
          </div>

          {/* Sliders List */}
          <div className="space-y-3.5">
            {currentHazard.factors.map((factor: ContributingFactor, idx: number) => {
              return (
                <div 
                  key={factor.name}
                  className="bg-command-950/80 p-3.5 rounded-xl border border-command-800 space-y-2 hover:border-command-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-mono">
                          {factor.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-command-800 px-1.5 py-0.2 rounded border border-command-700">
                          Weight: {factor.weight}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {factor.description}
                      </p>
                    </div>

                    <div className="text-right flex items-baseline sm:flex-col sm:items-end gap-1.5 sm:gap-0">
                      <span className="text-xs font-bold font-mono text-rose-400">
                        +{factor.contribution.toFixed(1)} pts
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Reading: {factor.unit}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Range Slider */}
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={factor.value}
                      onChange={(e) => updateHazardFactor(selectedHazard, idx, parseInt(e.target.value))}
                      className="w-full h-2 bg-command-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <span className="text-xs font-mono font-bold text-white w-10 text-right">
                      {factor.value}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mathematical Formula Footnote */}
          <div className="bg-command-950 p-3 rounded-xl border border-command-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>
              Composite Formula: <strong className="text-slate-200">Risk Score = &Sigma; (Factor Value &times; Weight %)</strong>
            </span>
            <span className="text-emerald-400 font-bold">
              Total Points: {currentHazard.score}/100
            </span>
          </div>
        </div>
      </div>

      {/* "Why This Score?" Explainability Modal */}
      {showExplainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-command-900 border border-command-700 rounded-2xl shadow-2xl w-full max-w-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-command-700/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white font-mono">
                  Transparent AI Explainability Breakdown
                </h3>
              </div>
              <button 
                onClick={() => setShowExplainModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-300">
              For complete judge transparency and auditability, each disaster score is computed deterministically from underlying sensor telemetry, geospatial elevation rasters, and calibrated meteorological weights:
            </p>

            <div className="space-y-2 font-mono text-xs">
              {currentHazard.factors.map(f => (
                <div key={f.name} className="flex items-center justify-between bg-command-950 p-2.5 rounded-lg border border-command-800">
                  <div>
                    <span className="font-bold text-white">{f.name}</span>
                    <span className="text-[10px] text-slate-400 block">{f.statusText} ({f.unit})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-rose-400 font-bold">+{f.contribution.toFixed(1)} pts</span>
                    <span className="text-[10px] text-slate-500 block">({f.weight}% weight)</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-2.5 bg-rose-950/40 rounded-lg border border-rose-500/40 font-bold">
                <span className="text-white">TOTAL COMPOSITE RISK:</span>
                <span className="text-rose-300 text-sm">{currentHazard.score} / 100 ({currentHazard.level})</span>
              </div>
            </div>

            <button
              onClick={() => setShowExplainModal(false)}
              className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
