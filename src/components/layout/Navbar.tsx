import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { UserRole } from '../../types/disaster';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../data/translations';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Radio, 
  Play, 
  Globe, 
  UserCheck, 
  Moon, 
  Sun, 
  Flame, 
  LifeBuoy, 
  Activity,
  Menu
} from 'lucide-react';

interface NavbarProps {
  onOpenSimulation: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulation, onToggleSidebar }) => {
  const { 
    currentRole, 
    setRole, 
    language, 
    setLanguage, 
    t, 
    isDark, 
    toggleTheme, 
    setActiveTab,
    simulation,
    hazards,
    selectedHazard
  } = useDisaster();

  const activeHazardData = hazards[selectedHazard] || hazards.flood;

  const roleLabels: Record<UserRole, { title: string; color: string }> = {
    citizen: { title: 'Citizen Portal', color: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40' },
    authority: { title: 'DDMA / SDMA Authority', color: 'bg-rose-600/20 text-rose-300 border-rose-500/40' },
    responder: { title: 'NDRF / SDRF Responder', color: 'bg-amber-600/20 text-amber-300 border-amber-500/40' },
    medical: { title: 'Hospital / Medical Lead', color: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/40' },
    relief: { title: 'Relief Coordinator', color: 'bg-purple-600/20 text-purple-300 border-purple-500/40' },
    admin: { title: 'Command Administrator', color: 'bg-blue-600/20 text-blue-300 border-blue-500/40' }
  };

  return (
    <header className="sticky top-0 z-40 bg-command-900/95 backdrop-blur-md border-b border-command-700/70 shadow-lg">
      {/* Top Threat Ticker */}
      <div className="bg-gradient-to-r from-rose-950 via-command-900 to-amber-950/80 border-b border-rose-500/20 px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-mono font-bold text-rose-300 tracking-wide uppercase">LIVE THREAT:</span>
          <span className="text-slate-300 truncate">
            {activeHazardData.displayName} &mdash; <strong className="text-rose-400">Risk Score: {activeHazardData.score}/100 ({activeHazardData.level})</strong> &bull; Silchar, Cachar & Puri Coastal Corridor under Stage-IV Alert
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" /> NDMA SACHET LIVE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-300">IMD DWR NOWCAST: 54 dBZ</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Brand Logo & Complement Badge */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg bg-command-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-amber-600 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-950/50 group-hover:scale-105 transition-transform border border-rose-400/40">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-mono">AapdaSetu</span>
                <span className="bg-rose-500/20 text-rose-400 text-[11px] font-extrabold px-1.5 py-0.2 rounded border border-rose-500/30">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight leading-none hidden sm:block">
                National Multi-Hazard Decision Platform
              </p>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-command-700/60">
            <span className="text-[10px] font-semibold text-slate-400 bg-command-800/80 px-2 py-0.5 rounded border border-command-700/60 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              Complements NDMA SACHET &bull; IMD
            </span>
          </div>
        </div>

        {/* Center/Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Simulation Trigger */}
          <button
            onClick={onOpenSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md ${
              simulation.isActive 
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/60 animate-pulse' 
                : 'bg-command-800 hover:bg-command-700 text-slate-200 border border-command-600/70 hover:border-amber-400/50'
            }`}
            title="Run interactive 5-stage disaster simulation"
          >
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="hidden sm:inline">
              {simulation.isActive ? `Simulation (Stage ${simulation.currentStage}/5)` : 'Run Simulation'}
            </span>
            <span className="sm:hidden">Simulate</span>
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={() => setActiveTab('sos')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-extrabold text-xs shadow-lg shadow-rose-950/60 border border-rose-400/40 glow-red active:scale-95 transition-all"
          >
            <LifeBuoy className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>SOS</span>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative group">
            <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${roleLabels[currentRole].color}`}>
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{roleLabels[currentRole].title}</span>
              <span className="md:hidden capitalize">{currentRole}</span>
            </div>
            
            <div className="absolute right-0 mt-1 w-56 bg-command-900 border border-command-700 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-command-700/60 mb-1">
                Select Active User Role
              </div>
              {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setRole(role);
                    if (role === 'citizen') setActiveTab('sos');
                    else if (role === 'responder') setActiveTab('role_responder');
                    else if (role === 'medical') setActiveTab('medical');
                    else if (role === 'relief') setActiveTab('relief');
                    else if (role === 'admin') setActiveTab('admin');
                    else setActiveTab('dashboard');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    currentRole === role 
                      ? 'bg-command-700/80 text-white font-bold' 
                      : 'text-slate-300 hover:bg-command-800 hover:text-white'
                  }`}
                >
                  <span>{roleLabels[role].title}</span>
                  {currentRole === role && <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative group">
            <button 
              className="p-1.5 rounded-lg bg-command-800 text-slate-300 hover:text-white border border-command-700/60 flex items-center gap-1 text-xs"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="uppercase text-[11px] font-mono">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-command-900 border border-command-700 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50 max-h-64 overflow-y-auto">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as SupportedLanguage)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    language === lang.code ? 'bg-command-700 text-white font-bold' : 'text-slate-300 hover:bg-command-800'
                  }`}
                >
                  <span>{lang.nativeLabel}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-command-800 text-slate-300 hover:text-white border border-command-700/60"
            title={isDark ? "Switch to High Contrast Light Mode" : "Switch to Command Dark Mode"}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
