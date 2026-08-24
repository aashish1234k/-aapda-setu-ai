import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { InfrastructureDamageRecord } from '../../types/disaster';
import { 
  ScanEye, 
  Building2, 
  Navigation, 
  Zap, 
  Droplets, 
  GraduationCap, 
  Stethoscope, 
  Sprout, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders,
  DollarSign
} from 'lucide-react';

export const DamageAssessmentView: React.FC = () => {
  const { damageRecords, updateDamageProgress } = useDisaster();

  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedRecord, setSelectedRecord] = useState<InfrastructureDamageRecord>(damageRecords[0]);

  // Aggregations
  const totalEstimatedCostCrores = damageRecords.reduce((acc, d) => acc + d.estimatedCostCrores, 0);

  const sectorIcons: Record<string, any> = {
    Buildings: Building2,
    Roads_Highways: Navigation,
    Bridges: Navigation,
    Power_Grid: Zap,
    Water_Supply: Droplets,
    Schools: GraduationCap,
    Hospitals: Stethoscope,
    Agriculture: Sprout,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ScanEye className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Infrastructure Damage Assessment & Satellite AI Scanner
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Optical & Synthetic Aperture Radar (SAR) Segmentation &bull; Structural Integrity Verification &bull; Restoration Estimates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-critical font-mono">
            <span>Est. Total Loss: ₹{totalEstimatedCostCrores.toFixed(1)} Crores</span>
          </span>
        </div>
      </div>

      {/* Interactive Before/After Satellite Comparison Slider UI */}
      <div className="command-card p-5 space-y-4 border-command-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-command-700/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                ISRO / RISAT-1A SAR TELEMETRY
              </span>
              <span className="text-[10px] font-mono text-slate-400">Sensor: Synthetic Aperture Radar (C-Band)</span>
            </div>
            <h2 className="text-base font-bold text-white font-mono mt-1">
              Before vs. After Satellite Inundation Scan (Silchar / Barak Valley)
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
            AI Segmentation Confidence: 94.8% (AI Estimate)
          </span>
        </div>

        {/* Interactive Image Comparison Slider Box */}
        <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden select-none border border-command-700 shadow-2xl bg-black">
          {/* AFTER Image (Background Layer) */}
          <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center overflow-hidden">
            {/* Visual simulation of flooded landscape */}
            <div className="w-full h-full relative bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_2px,transparent_2px)] [background-size:16px_16px]" />
              {/* Flooded Water Polygons */}
              <div className="absolute top-1/4 left-10 w-3/4 h-1/2 bg-blue-600/40 rounded-3xl blur-md border border-blue-400/50" />
              <div className="absolute top-1/3 left-24 w-1/2 h-1/3 bg-cyan-500/30 rounded-2xl blur-sm" />
              
              {/* AI Damage Bounding Boxes */}
              <div className="absolute top-16 left-20 border-2 border-rose-500 bg-rose-500/20 px-2 py-1 rounded text-[10px] font-mono font-bold text-rose-300">
                [AI: Breached Dykes (96% Conf)]
              </div>
              <div className="absolute bottom-20 right-32 border-2 border-amber-500 bg-amber-500/20 px-2 py-1 rounded text-[10px] font-mono font-bold text-amber-300">
                [AI: Submerged Highway NH-37]
              </div>
              <div className="absolute top-32 right-20 border-2 border-rose-500 bg-rose-500/20 px-2 py-1 rounded text-[10px] font-mono font-bold text-rose-300">
                [AI: 1,420 Structures Flooded]
              </div>

              <div className="absolute bottom-4 right-4 bg-rose-950/80 border border-rose-500 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-rose-300">
                AFTER: Inundation Detected (142.8 sq km)
              </div>
            </div>
          </div>

          {/* BEFORE Image (Clipped Overlay Layer) */}
          <div 
            className="absolute inset-0 overflow-hidden border-r-2 border-white"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="w-full h-full relative bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 min-w-[800px]">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10b981_2px,transparent_2px)] [background-size:20px_20px]" />
              {/* Dry river channel outline */}
              <div className="absolute top-1/3 left-12 w-2/3 h-12 bg-sky-900/60 rounded-full blur-xs border border-sky-600/40" />
              <div className="absolute bottom-4 left-4 bg-emerald-950/80 border border-emerald-500 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-emerald-300">
                BEFORE: Dry Baseline (2026-08-10)
              </div>
            </div>
          </div>

          {/* Slider Drag Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xs shadow-xl pointer-events-auto cursor-ew-resize">
              &harr;
            </div>
          </div>

          {/* Hidden range input for interactive dragging */}
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(parseInt(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
          />
        </div>

        {/* AI Estimation Footnote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 bg-command-950 p-3 rounded-xl border border-command-800">
          <span>
            Slide horizontally to inspect pre-disaster vs post-inundation boundary overlays.
          </span>
          <span className="text-amber-400">
            Source: National Remote Sensing Centre (NRSC) / Bhuvan
          </span>
        </div>
      </div>

      {/* Sector Damage Progress Table */}
      <div className="command-card p-5 space-y-4">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <Building2 className="w-4 h-4 text-rose-400" />
          <span>Sectoral Infrastructure Damage & Reconstruction Matrix</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {damageRecords.map((rec) => {
            const Icon = sectorIcons[rec.sector] || Building2;
            const isSelected = selectedRecord.id === rec.id;

            return (
              <div
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                className={`command-card p-4 cursor-pointer transition-all space-y-3 ${
                  isSelected ? 'border-rose-500/70 shadow-lg' : 'hover:border-command-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-command-800 border border-command-700 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-rose-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">
                        {rec.sector.replace('_', ' ')}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ₹{rec.estimatedCostCrores} Cr Estimated
                      </span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                    rec.status === 'Restored' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {rec.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Restoration:</span>
                    <strong className="text-rose-400">{rec.progressPercentage}% Complete</strong>
                  </div>
                  <div className="w-full bg-command-950 rounded-full h-1.5 overflow-hidden border border-command-800">
                    <div 
                      className="h-full bg-rose-500 rounded-full" 
                      style={{ width: `${rec.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex justify-between border-t border-command-800 pt-2">
                  <span>Damaged: <strong>{rec.confirmedDamagedUnits.toLocaleString()}</strong></span>
                  <span className="text-amber-400">{rec.underAssessmentUnits} In Audit</span>
                </div>

                {/* Progress updater for demo */}
                <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-400">
                  <span>Update Work:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateDamageProgress(rec.id, Math.min(100, rec.progressPercentage + 15));
                      }}
                      className="px-2 py-0.5 rounded bg-command-800 hover:bg-emerald-600/30 text-emerald-300 border border-command-700"
                    >
                      +15%
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
