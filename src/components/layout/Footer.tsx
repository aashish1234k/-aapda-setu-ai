import React from 'react';
import { ShieldCheck, PhoneCall, Radio, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-command-950 border-t border-command-800 text-slate-400 text-xs mt-12">
      {/* Emergency Helpline Ribbon */}
      <div className="bg-gradient-to-r from-command-900 via-rose-950/40 to-command-900 border-b border-command-700/60 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-slate-200">
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span className="font-bold text-rose-300">NATIONAL EMERGENCY HELPLINES:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span>National Emergency: <strong className="text-white font-bold">112</strong></span>
            <span>Disaster Control: <strong className="text-amber-400 font-bold">1070 / 1078</strong></span>
            <span>Ambulance (ALS): <strong className="text-emerald-400 font-bold">108</strong></span>
            <span>NDRF HQ: <strong className="text-blue-400 font-bold">011-24363260</strong></span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-mono font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span>AapdaSetu AI Platform Architecture</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Integrated National Multi-Hazard Disaster Decision Support & Emergency Response Architecture connecting 
              <strong> Predict &bull; Prepare &bull; Alert &bull; Respond &bull; Rescue &bull; Recover &bull; Prevent</strong> across Indian States and Union Territories.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-emerald-400">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Engineered to ingest NDMA SACHET (CAP-v1.2) & IMD Open Weather Feeds</span>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-mono font-bold text-slate-200 uppercase tracking-wider mb-2">Data Attribution</h4>
            <ul className="space-y-1 text-slate-400">
              <li>&bull; India Meteorological Department (IMD)</li>
              <li>&bull; National Disaster Management Authority (NDMA)</li>
              <li>&bull; Central Water Commission (CWC)</li>
              <li>&bull; ISRO / NRSC Bhuvan Satellite Portal</li>
              <li>&bull; OpenStreetMap & OSRM Open Routing</li>
            </ul>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-mono font-bold text-slate-200 uppercase tracking-wider mb-2">Safety Disclaimers</h4>
            <ul className="space-y-1 text-slate-400 text-[11px]">
              <li>&bull; Complements official government warning authorities.</li>
              <li>&bull; Earthquake scores reflect seismic vulnerability & microzonation; not short-term predictions.</li>
              <li>&bull; Casualties are strictly segregated into Reported vs Verified records.</li>
            </ul>
          </div>
        </div>

        {/* Legal & Simulated Disclaimer Notice */}
        <div className="border-t border-command-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Simulated Demonstration Mode:</strong> All real-time scenarios, sensor readings, and satellite assessments are realistic simulations for decision-support evaluation.
            </span>
          </div>
          <div>
            &copy; 2026 AapdaSetu AI. Built for Smart India & Disaster Resilient Bharat.
          </div>
        </div>
      </div>
    </footer>
  );
};
