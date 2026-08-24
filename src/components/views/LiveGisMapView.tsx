import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { InteractiveIndiaMap } from '../map/InteractiveIndiaMap';
import { 
  Map, 
  Layers, 
  Radio, 
  AlertTriangle, 
  Navigation, 
  Building2, 
  Stethoscope, 
  LifeBuoy, 
  Filter 
} from 'lucide-react';

export const LiveGisMapView: React.FC = () => {
  const { selectedDistrict, setSelectedDistrict, districts, hazards, roadSegments, shelters, hospitals } = useDisaster();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Live National Disaster GIS Command Map
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Geospatial Multi-Hazard Inundation Polygons &bull; Evacuation Arteries &bull; Resource Fleet Tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>GIS Vector Stream Active</span>
          </span>
        </div>
      </div>

      {/* Full Size GIS Map */}
      <InteractiveIndiaMap heightClass="h-[640px]" showHotspotDetails={true} />

      {/* Bottom GIS Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="command-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Active Hazard Extents</span>
          </div>
          <p className="text-xs text-slate-300">
            Current radar buffer active in <strong>Cachar (142 sq km inundation)</strong> and <strong>Puri Coastal Corridor (55 km storm radius)</strong>.
          </p>
        </div>

        <div className="command-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
            <Building2 className="w-4 h-4" />
            <span>Shelter & Medical Geospatial Pins</span>
          </div>
          <p className="text-xs text-slate-300">
            <strong>{shelters.length} Shelters</strong> and <strong>{hospitals.length} Lifeline Hospitals</strong> mapped with live capacity and road access viability.
          </p>
        </div>

        <div className="command-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
            <Navigation className="w-4 h-4" />
            <span>Evacuation Network Status</span>
          </div>
          <p className="text-xs text-slate-300">
            <strong>{roadSegments.filter(r => r.status !== 'Open' && r.status !== 'Restored').length} Road Sections Severed</strong>. Alternative evacuation corridors illuminated in green.
          </p>
        </div>
      </div>
    </div>
  );
};
