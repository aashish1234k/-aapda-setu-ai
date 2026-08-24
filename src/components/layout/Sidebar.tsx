import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  LayoutDashboard, 
  Map, 
  Cpu, 
  BellRing, 
  LifeBuoy, 
  Home, 
  Building2, 
  Stethoscope, 
  Boxes, 
  ScanEye, 
  TrendingUp, 
  ShieldCheck, 
  Settings, 
  Layers,
  ChevronRight,
  Flame,
  Radio
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, currentRole, alerts, sosRequests, simulation } = useDisaster();

  const criticalAlertsCount = alerts.filter(a => a.severity === 'Critical').length;
  const pendingSosCount = sosRequests.filter(s => s.status === 'Pending' || s.status === 'Assigned').length;

  const navItems = [
    { id: 'landing', label: 'Portal Overview', icon: Home, section: 'main' },
    { id: 'dashboard', label: 'Executive Command', icon: LayoutDashboard, section: 'main', badge: 'Live' },
    { id: 'gis_map', label: 'Live GIS Map', icon: Map, section: 'main' },
    { id: 'prediction', label: 'AI Risk Engine', icon: Cpu, section: 'main', highlight: true },
    { id: 'alerts', label: 'Official Alerts', icon: BellRing, section: 'operations', count: criticalAlertsCount, countColor: 'bg-rose-500' },
    { id: 'sos', label: 'Citizen SOS & SAR', icon: LifeBuoy, section: 'operations', count: pendingSosCount, countColor: 'bg-red-600 animate-pulse' },
    { id: 'shelters', label: 'Evacuation & Shelters', icon: Building2, section: 'operations' },
    { id: 'medical', label: 'Medical Response & ICU', icon: Stethoscope, section: 'operations' },
    { id: 'relief', label: 'Relief Logistics & AI', icon: Boxes, section: 'operations' },
    { id: 'damage', label: 'Satellite Damage Scan', icon: ScanEye, section: 'recovery' },
    { id: 'recovery', label: 'Dynamic Recovery Score', icon: TrendingUp, section: 'recovery', highlight: true },
    { id: 'prevention', label: 'Prevention & Policy', icon: ShieldCheck, section: 'recovery' },
    { id: 'admin', label: 'Admin & Audit Trail', icon: Settings, section: 'system' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-command-900/95 border-r border-command-700/70 p-3 flex flex-col justify-between overflow-y-auto backdrop-blur-md transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-4">
          {/* Quick Simulation Banner if Active */}
          {simulation.isActive && (
            <div className="bg-gradient-to-br from-amber-950/60 to-rose-950/60 border border-amber-500/40 rounded-xl p-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-amber-400 mb-1">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> SIMULATION ACTIVE
                </span>
                <span>Stage {simulation.currentStage}/5</span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                {simulation.stageName}
              </p>
            </div>
          )}

          {/* Navigation Sections */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Decision & Intelligence
            </div>
            {navItems.filter(item => item.section === 'main').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-rose-600/20 text-rose-300 border border-rose-500/50 shadow-md font-bold' 
                      : 'text-slate-300 hover:bg-command-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-1.5 py-0.2 rounded border border-emerald-500/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Emergency Operations
            </div>
            {navItems.filter(item => item.section === 'operations').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-rose-600/20 text-rose-300 border border-rose-500/50 shadow-md font-bold' 
                      : 'text-slate-300 hover:bg-command-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ${item.countColor || 'bg-rose-600'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Post-Disaster & Resilience
            </div>
            {navItems.filter(item => item.section === 'recovery').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-rose-600/20 text-rose-300 border border-rose-500/50 shadow-md font-bold' 
                      : 'text-slate-300 hover:bg-command-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono px-1.5 py-0.2 rounded border border-amber-500/40">
                      USP
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Governance & Audit
            </div>
            {navItems.filter(item => item.section === 'system').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-rose-600/20 text-rose-300 border border-rose-500/50 shadow-md font-bold' 
                      : 'text-slate-300 hover:bg-command-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom System Status Box */}
        <div className="pt-3 border-t border-command-700/60">
          <div className="bg-command-950/70 rounded-lg p-2 border border-command-800 text-[11px] font-mono space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span>ACTIVE ROLE:</span>
              <span className="font-bold text-rose-400 uppercase">{currentRole}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>NDMA SACHET:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span> Connected
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
