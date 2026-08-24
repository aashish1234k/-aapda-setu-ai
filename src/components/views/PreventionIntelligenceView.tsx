import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { PreventionRecommendation } from '../../types/disaster';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  TreePine, 
  Building2, 
  FileText,
  Mountain
} from 'lucide-react';

export const PreventionIntelligenceView: React.FC = () => {
  const { preventionRecommendations } = useDisaster();
  const [selectedStudy, setSelectedStudy] = useState<PreventionRecommendation>(preventionRecommendations[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Prevention, Mitigation & Long-Term Policy Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Root Cause Vulnerability Diagnostics &bull; Eco-Engineering Interventions &bull; Structural Risk Reduction Projections
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-low font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Assisted Policy Formulation</span>
          </span>
        </div>
      </div>

      {/* Case Study Selector Ribbon */}
      <div className="flex flex-wrap gap-2">
        {preventionRecommendations.map((study) => (
          <button
            key={study.id}
            onClick={() => setSelectedStudy(study)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 ${
              selectedStudy.id === study.id
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500 shadow-md'
                : 'bg-command-900/80 text-slate-400 border-command-700 hover:bg-command-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{study.district} &bull; {study.vulnerabilityFactor.split('&')[0]}</span>
          </button>
        ))}
      </div>

      {/* Detailed Policy Diagnostic Study Card */}
      <div className="command-card p-6 border-emerald-500/40 space-y-6 bg-gradient-to-br from-command-900 via-command-900 to-emerald-950/20 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-command-700/80 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
              TARGET BASIN &bull; {selectedStudy.district}
            </span>
            <h2 className="text-lg font-black text-white font-mono mt-0.5">
              {selectedStudy.vulnerabilityFactor}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Agency: <strong className="text-slate-200">{selectedStudy.responsibleAgency}</strong>
          </span>
        </div>

        {/* Root Cause Analysis (Why is this area vulnerable?) */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Why This Area is Chronically Vulnerable (Root Cause Telemetry)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
            {selectedStudy.rootCauseAnalysis.map((cause, idx) => (
              <div key={idx} className="bg-command-950 p-3 rounded-xl border border-command-800 text-slate-300 flex items-start gap-2">
                <span className="text-rose-400 font-bold">&bull;</span>
                <span>{cause}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Mitigation Interventions (What should be done?) */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Recommended Engineering & Eco-Restoration Interventions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedStudy.recommendedInterventions.map((inv, idx) => (
              <div 
                key={idx}
                className="bg-command-950 p-4 rounded-xl border border-emerald-500/30 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold font-mono text-xs">
                      Option 0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>-{inv.projectedRiskReductionPercent}% Risk</span>
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white font-mono leading-snug">
                    {inv.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {inv.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-command-800 text-[10px] font-mono text-slate-400 flex justify-between">
                  <span>Cost: <strong className="text-white">₹{inv.estimatedCostCrores} Cr</strong></span>
                  <span>Duration: <strong className="text-amber-400">{inv.timeToImplementMonths} Months</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Policy Bylaws */}
        <div className="bg-command-950 p-4 rounded-xl border border-command-700 space-y-1 font-mono text-xs">
          <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Mandated Legislative & Administrative Policy Action
          </span>
          <p className="text-slate-200">
            {selectedStudy.policyActionRequired}
          </p>
        </div>
      </div>
    </div>
  );
};
