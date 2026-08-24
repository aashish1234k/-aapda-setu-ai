import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { DistrictGeoData } from '../../data/indiaDisasterData';
import { 
  Layers, 
  MapPin, 
  Building2, 
  Stethoscope, 
  LifeBuoy, 
  AlertTriangle, 
  Navigation, 
  Radio, 
  ShieldAlert, 
  Eye, 
  Info,
  Maximize2,
  Minimize2,
  CheckCircle,
  Truck,
  Flame,
  CloudRain,
  Wind
} from 'lucide-react';

interface InteractiveIndiaMapProps {
  heightClass?: string;
  showHotspotDetails?: boolean;
}

export const InteractiveIndiaMap: React.FC<InteractiveIndiaMapProps> = ({ 
  heightClass = "h-[580px]",
  showHotspotDetails = true 
}) => {
  const { 
    districts, 
    selectedDistrict, 
    setSelectedDistrict, 
    shelters, 
    hospitals, 
    sosRequests, 
    roadSegments, 
    hazards, 
    selectedHazard,
    setActiveTab
  } = useDisaster();

  // Layer filter toggles
  const [layers, setLayers] = useState({
    hazards: true,
    radar: true,
    shelters: true,
    hospitals: true,
    responders: true,
    roads: true,
  });

  const [activeZoneDetail, setActiveZoneDetail] = useState<DistrictGeoData | null>(selectedDistrict);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Convert lat/lng roughly to SVG coordinate space for India view
  // Lat: 8 to 36 N -> Y: 85% to 15%
  // Lng: 68 to 96 E -> X: 15% to 88%
  const getCoordinatesPct = (lat: number, lng: number): { x: number; y: number } => {
    const minLat = 7.0;
    const maxLat = 36.5;
    const minLng = 68.0;
    const maxLng = 97.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 82 + 10;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 82 + 8;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className={`relative w-full ${heightClass} bg-command-950 rounded-2xl border border-command-700/80 overflow-hidden flex flex-col md:flex-row shadow-2xl`}>
      {/* Map Canvas Area */}
      <div className="relative flex-1 bg-[#070d18] overflow-hidden">
        {/* Background Grid & Radar Sweep */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e3046_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute -top-32 -left-32 w-96 h-96 radar-sweep-effect pointer-events-none opacity-30" />

        {/* Tactical Legend Ribbon */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 bg-command-900/90 backdrop-blur-md p-1.5 rounded-xl border border-command-700/70 text-[11px] font-mono shadow-lg">
          <span className="text-slate-400 font-bold px-1.5 flex items-center gap-1">
            <Radio className="w-3 h-3 text-rose-500 animate-pulse" /> GIS FEED:
          </span>
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Critical Zone (&gt;80)
          </span>
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> High Risk (61-80)
          </span>
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Moderate (31-60)
          </span>
        </div>

        {/* Layer Toggle Quick Bar */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-command-900/90 backdrop-blur-md p-1.5 rounded-xl border border-command-700/70 text-xs shadow-lg">
          <button
            onClick={() => toggleLayer('hazards')}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
              layers.hazards ? 'bg-rose-600/30 text-rose-300 border border-rose-500/50' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Hazards"
          >
            Hazards
          </button>
          <button
            onClick={() => toggleLayer('radar')}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
              layers.radar ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Radar Overlay"
          >
            Radar
          </button>
          <button
            onClick={() => toggleLayer('shelters')}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
              layers.shelters ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Shelters"
          >
            Shelters
          </button>
          <button
            onClick={() => toggleLayer('hospitals')}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
              layers.hospitals ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/50' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Hospitals"
          >
            Medical
          </button>
          <button
            onClick={() => toggleLayer('roads')}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
              layers.roads ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Road Arteries"
          >
            Roads
          </button>
        </div>

        {/* SVG India Map Layer */}
        <svg 
          viewBox="0 0 800 800" 
          className="w-full h-full object-contain select-none"
        >
          {/* India Boundary Polygon Rough Stylized Outline */}
          <path
            d="M 280,100 L 340,90 L 380,120 L 400,160 L 480,180 L 520,160 L 580,180 L 640,190 L 720,220 L 740,260 L 680,290 L 640,320 L 580,310 L 540,360 L 520,440 L 480,520 L 440,620 L 420,700 L 400,740 L 380,720 L 340,600 L 300,500 L 260,420 L 220,380 L 200,320 L 220,240 L 260,180 Z"
            fill="#0b1726"
            stroke="#1e3a5f"
            strokeWidth="2"
            className="filter drop-shadow-[0_0_15px_rgba(30,58,95,0.4)]"
          />

          {/* Major River Basins (Ganga, Brahmaputra, Mahanadi, Barak) */}
          <path
            d="M 330,220 Q 420,240 500,280 T 560,330"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2"
            strokeDasharray="4,4"
            className="opacity-60"
          />
          <path
            d="M 600,200 Q 660,220 720,250 T 680,290"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            className="opacity-75"
          />

          {/* Radar Reflectivity Inundation Buffers */}
          {layers.radar && (
            <>
              {/* Assam Flood Radar Buffer */}
              <circle
                cx="670"
                cy="285"
                r="45"
                fill="rgba(239, 68, 68, 0.25)"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                className="animate-pulse"
              />
              <circle
                cx="670"
                cy="285"
                r="25"
                fill="rgba(239, 68, 68, 0.45)"
              />

              {/* Odisha Cyclone Wind Cone Buffer */}
              <circle
                cx="540"
                cy="440"
                r="55"
                fill="rgba(249, 115, 22, 0.2)"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            </>
          )}

          {/* Road Network Lines */}
          {layers.roads && roadSegments.map((rd) => {
            const coord1 = getCoordinatesPct(rd.coordinates[0][0], rd.coordinates[0][1]);
            const coord2 = getCoordinatesPct(rd.coordinates[1][0], rd.coordinates[1][1]);
            const x1 = (coord1.x / 100) * 800;
            const y1 = (coord1.y / 100) * 800;
            const x2 = (coord2.x / 100) * 800;
            const y2 = (coord2.y / 100) * 800;
            const isBlocked = rd.status === 'Waterlogged' || rd.status === 'Bridge_Collapsed' || rd.status === 'Debris_Blocked';

            return (
              <g key={rd.id}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isBlocked ? '#ef4444' : '#10b981'}
                  strokeWidth="3.5"
                  strokeDasharray={isBlocked ? '6,4' : undefined}
                />
              </g>
            );
          })}

          {/* District Nodes & Pins */}
          {districts.map((dist) => {
            const { x, y } = getCoordinatesPct(dist.coordinates[0], dist.coordinates[1]);
            const svgX = (x / 100) * 800;
            const svgY = (y / 100) * 800;
            const isSelected = selectedDistrict.id === dist.id;
            const isCritical = dist.riskScore >= 80;
            const isHigh = dist.riskScore >= 60 && dist.riskScore < 80;

            const pinColor = isCritical ? '#ef4444' : isHigh ? '#f97316' : '#eab308';

            return (
              <g 
                key={dist.id}
                className="cursor-pointer group"
                onClick={() => {
                  setSelectedDistrict(dist);
                  setActiveZoneDetail(dist);
                }}
              >
                {/* Pulsing ring for critical nodes */}
                {isCritical && (
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r={isSelected ? "22" : "16"}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Core Node Circle */}
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={isSelected ? "11" : "8"}
                  fill={pinColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                  className="filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all group-hover:scale-125"
                />

                {/* District Label */}
                <text
                  x={svgX + 14}
                  y={svgY + 4}
                  fill={isSelected ? '#ffffff' : '#94a3b8'}
                  fontSize={isSelected ? "13" : "11"}
                  fontFamily="monospace"
                  fontWeight={isSelected ? "bold" : "600"}
                  className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                >
                  {dist.name.split(' ')[0]} ({dist.riskScore})
                </text>
              </g>
            );
          })}

          {/* Shelters Icons */}
          {layers.shelters && shelters.map((sh) => {
            const { x, y } = getCoordinatesPct(sh.coordinates[0], sh.coordinates[1]);
            const svgX = (x / 100) * 800;
            const svgY = (y / 100) * 800;
            return (
              <g key={sh.id} transform={`translate(${svgX - 6}, ${svgY - 14})`}>
                <rect width="12" height="12" rx="2" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                <text x="6" y="9" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">S</text>
              </g>
            );
          })}

          {/* Hospitals Icons */}
          {layers.hospitals && hospitals.map((hosp) => {
            const { x, y } = getCoordinatesPct(hosp.coordinates[0], hosp.coordinates[1]);
            const svgX = (x / 100) * 800;
            const svgY = (y / 100) * 800;
            return (
              <g key={hosp.id} transform={`translate(${svgX - 6}, ${svgY - 14})`}>
                <circle cx="6" cy="6" r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="1" />
                <text x="6" y="9" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">+</text>
              </g>
            );
          })}
        </svg>

        {/* Bottom Quick District Switcher Pills */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {districts.map((dist) => (
            <button
              key={dist.id}
              onClick={() => {
                setSelectedDistrict(dist);
                setActiveZoneDetail(dist);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shadow-md ${
                selectedDistrict.id === dist.id
                  ? 'bg-rose-600 text-white border-rose-400 scale-105'
                  : 'bg-command-900/90 text-slate-300 border-command-700/80 hover:bg-command-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dist.riskScore >= 80 ? 'bg-rose-400' : dist.riskScore >= 60 ? 'bg-amber-400' : 'bg-yellow-400'}`} />
              <span>{dist.name}</span>
              <span className="text-[10px] opacity-80">[{dist.riskScore}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right-Side Hotspot Intelligence Panel */}
      {showHotspotDetails && activeZoneDetail && (
        <div className="w-full md:w-80 bg-command-900 border-t md:border-t-0 md:border-l border-command-700/80 p-4 flex flex-col justify-between overflow-y-auto z-20">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Inspected Risk Hotspot
                </span>
                <h3 className="text-base font-bold text-white font-mono leading-tight">
                  {activeZoneDetail.name}
                </h3>
                <p className="text-xs text-slate-400">{activeZoneDetail.state}</p>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black border ${
                activeZoneDetail.riskScore >= 80 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' 
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              }`}>
                {activeZoneDetail.riskScore}/100
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-command-950 p-2 rounded-lg border border-command-800">
                <span className="text-[10px] text-slate-500 block">Population</span>
                <span className="font-bold text-slate-200">{activeZoneDetail.population.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-command-950 p-2 rounded-lg border border-command-800">
                <span className="text-[10px] text-slate-500 block">Elevation AMSL</span>
                <span className="font-bold text-slate-200">{activeZoneDetail.elevationMeters} m</span>
              </div>
            </div>

            {/* Active Hazard Tag */}
            <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-2.5 space-y-1">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-400" /> Active Hazard
              </span>
              <p className="text-xs font-semibold text-slate-200">
                {activeZoneDetail.activeHazard}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                Basin: {activeZoneDetail.riverBasin}
              </p>
            </div>

            {/* Real-time Sector Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                <span>Nearest Active Shelter:</span>
                <strong className="text-emerald-400">1.8 km (Govt School)</strong>
              </div>
              <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                <span>Hospital Beds Open:</span>
                <strong className="text-cyan-400">140 / 1,170 Available</strong>
              </div>
              <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                <span>Road Status:</span>
                <strong className="text-rose-400">NH-37 Bridge Severed</strong>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-3 border-t border-command-800">
            <button
              onClick={() => setActiveTab('sos')}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>Deploy SAR Responders</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('prediction')}
                className="py-1.5 px-2 rounded-lg bg-command-800 hover:bg-command-700 text-slate-200 text-xs font-semibold border border-command-700 text-center"
              >
                AI Risk Detail
              </button>
              <button
                onClick={() => setActiveTab('shelters')}
                className="py-1.5 px-2 rounded-lg bg-command-800 hover:bg-command-700 text-slate-200 text-xs font-semibold border border-command-700 text-center"
              >
                Shelter Routing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
