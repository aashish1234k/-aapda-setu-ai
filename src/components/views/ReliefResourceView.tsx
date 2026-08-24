import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Boxes, 
  Truck, 
  Sparkles, 
  Droplets, 
  Utensils, 
  ShieldCheck, 
  Zap, 
  LifeBuoy, 
  AlertTriangle, 
  CheckCircle2, 
  Send,
  Plus
} from 'lucide-react';

export const ReliefResourceView: React.FC = () => {
  const { reliefInventory, distributeRelief, priorityZones } = useDisaster();
  const [selectedZone, setSelectedZone] = useState(priorityZones[0]);

  // Aggregations
  const totalItemsRequired = reliefInventory.reduce((acc, i) => acc + i.required, 0);
  const totalItemsDistributed = reliefInventory.reduce((acc, i) => acc + i.distributed, 0);
  const overallReliefPercent = Math.round((totalItemsDistributed / totalItemsRequired) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Emergency Relief & Resource Supply Chain
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            AI-Driven Supply Prioritization &bull; Warehouse Stock Telemetry &bull; Convoy Logistics Tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-low font-mono">
            <Truck className="w-3.5 h-3.5" />
            <span>{overallReliefPercent}% Aggregate Relief Dispatched</span>
          </span>
        </div>
      </div>

      {/* AI Supply Chain Prioritizer Recommendation Box */}
      <div className="command-card p-5 border-amber-500/50 bg-gradient-to-br from-command-900 via-amber-950/20 to-command-950 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-command-700/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI RESOURCE OPTIMIZATION ENGINE
              </span>
              <span className="text-[10px] font-mono text-slate-400">Optimization Model: Maximize Lives Sustained / Hour</span>
            </div>
            <h2 className="text-base font-bold text-white font-mono mt-1">
              Top Priority Drop Zone: {selectedZone.zoneName} ({selectedZone.district})
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-slate-400 block">Critical Relief Deficit</span>
            <span className="text-base font-black font-mono text-rose-400">
              {selectedZone.reliefDeficitRatio}% Shortage
            </span>
          </div>
        </div>

        {/* AI Algorithmic Rationale */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">
            Algorithmic Prioritization Rationale:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
            {selectedZone.aiRationale.map((rat, idx) => (
              <div key={idx} className="bg-command-950 p-2.5 rounded-lg border border-command-800 flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{rat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Supplies to Pack */}
        <div className="bg-command-950/80 p-3.5 rounded-xl border border-command-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Recommended Payload:</span>
            {selectedZone.recommendedSupplies.map((sup, idx) => (
              <span key={idx} className="bg-command-800 text-slate-200 px-2 py-1 rounded border border-command-700">
                {sup.item}: <strong>{sup.quantity}</strong>
              </span>
            ))}
          </div>

          <button
            onClick={() => {
              distributeRelief('REL-01', 3500);
              distributeRelief('REL-02', 12000);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Dispatch Relief Convoy Now</span>
          </button>
        </div>
      </div>

      {/* Warehouse Inventory Stock Table */}
      <div className="command-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Boxes className="w-4 h-4 text-emerald-400" />
              <span>National Disaster Warehouse Inventory Telemetry</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live tracking of emergency food, water, medical kits, and rescue gear
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-command-700/80 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Available</th>
                <th className="py-2.5 px-3 text-right">Allocated</th>
                <th className="py-2.5 px-3 text-right">Distributed</th>
                <th className="py-2.5 px-3 text-right">Fulfillment %</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-command-800">
              {reliefInventory.map((item) => {
                const fulfillPct = Math.round((item.distributed / item.required) * 100);
                const isLow = item.available <= item.reorderLevel;

                return (
                  <tr key={item.id} className="hover:bg-command-850/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-200">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {isLow && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px]">
                            LOW STOCK
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{item.category}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400">
                      {item.available.toLocaleString()} {item.unit}
                    </td>
                    <td className="py-3 px-3 text-right text-amber-400">
                      {item.allocated.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right text-cyan-400">
                      {item.distributed.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-command-950 rounded-full h-1.5 overflow-hidden border border-command-700">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${fulfillPct}%` }}
                          />
                        </div>
                        <span className="w-8 font-bold text-slate-300">{fulfillPct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => distributeRelief(item.id, 1000)}
                        className="px-2.5 py-1 rounded-lg bg-command-800 hover:bg-emerald-600/40 text-slate-300 hover:text-emerald-300 border border-command-700 text-[10px] font-bold"
                      >
                        +1K Drop
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
