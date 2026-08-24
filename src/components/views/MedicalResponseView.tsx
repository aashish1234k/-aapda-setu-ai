import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { HospitalFacility } from '../../types/disaster';
import { 
  Stethoscope, 
  Bed, 
  Activity, 
  Truck, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Pill, 
  HeartHandshake,
  FileCheck2,
  Plus,
  Minus
} from 'lucide-react';

export const MedicalResponseView: React.FC = () => {
  const { hospitals, updateHospitalBeds, verifyCasualty } = useDisaster();
  const [selectedHospital, setSelectedHospital] = useState<HospitalFacility>(hospitals[0]);

  // Aggregations
  const totalBeds = hospitals.reduce((acc, h) => acc + h.totalBeds, 0);
  const availBeds = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);
  const totalIcu = hospitals.reduce((acc, h) => acc + h.icuTotal, 0);
  const availIcu = hospitals.reduce((acc, h) => acc + h.icuAvailable, 0);
  const totalAmbulances = hospitals.reduce((acc, h) => acc + h.activeAmbulances, 0);
  const availAmbulances = hospitals.reduce((acc, h) => acc + h.availableAmbulances, 0);

  const totalReported = hospitals.reduce((acc, h) => acc + h.casualtyTriage.reported, 0);
  const totalVerified = hospitals.reduce((acc, h) => acc + h.casualtyTriage.verified, 0);
  const totalUnderVerification = hospitals.reduce((acc, h) => acc + h.casualtyTriage.underVerification, 0);
  const totalReportedDeaths = hospitals.reduce((acc, h) => acc + h.casualtyTriage.deathsReported, 0);
  const totalVerifiedDeaths = hospitals.reduce((acc, h) => acc + h.casualtyTriage.deathsVerified, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-command-900/90 border border-command-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
              Medical Response, Hospital Bed Telemetry & Casualty Triage
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-Time ICU Bed Telemetry &bull; ALS Ambulance Fleet Tracking &bull; Certified Casualty Verification Audit
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-official font-mono text-cyan-300 border-cyan-500/40">
            <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Hospital HMS Telemetry Live</span>
          </span>
        </div>
      </div>

      {/* Strict Casualty Integrity Alert Ribbon */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-200 font-mono">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block uppercase tracking-wider text-[11px] mb-0.5">
            Government Casualty Reporting Protocol Mandate
          </strong>
          Casualties are strictly classified into <strong>Reported (Field Preliminary)</strong>, <strong>Under Verification</strong>, and <strong>Verified (Health Officer Confirmed)</strong>. Unverified casualty estimates are never presented as confirmed facts.
        </div>
      </div>

      {/* Top Medical Capacity Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="command-card p-4 border-cyan-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">General Hospital Beds</span>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-1">
            {availBeds} <span className="text-xs text-slate-400">/ {totalBeds}</span>
          </div>
          <span className="text-[10px] text-cyan-300 font-mono">Available for Inflow</span>
        </div>

        <div className="command-card p-4 border-rose-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">ICU / Ventilator Units</span>
          <div className="text-2xl font-black font-mono text-rose-400 mt-1">
            {availIcu} <span className="text-xs text-slate-400">/ {totalIcu}</span>
          </div>
          <span className="text-[10px] text-rose-300 font-mono">Critical Trauma Standby</span>
        </div>

        <div className="command-card p-4 border-emerald-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">108 ALS Ambulances</span>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            {availAmbulances} <span className="text-xs text-slate-400">/ {totalAmbulances}</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">Dispatched in Field</span>
        </div>

        <div className="command-card p-4 border-purple-500/40">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Casualty Verification Rate</span>
          <div className="text-2xl font-black font-mono text-purple-400 mt-1">
            {Math.round((totalVerified / (totalReported || 1)) * 100)}%
          </div>
          <span className="text-[10px] text-purple-300 font-mono">{totalVerified} Confirmed by MO</span>
        </div>
      </div>

      {/* Casualty Classification Ledger (Reported vs Verified vs Under Verification) */}
      <div className="command-card p-5 border-command-700/80 space-y-4">
        <div className="flex items-center justify-between border-b border-command-700/80 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-rose-400" />
              <span>Certified Casualty Triage & Verification Ledger</span>
            </h3>
            <p className="text-xs text-slate-400">
              Audit trail of patient admissions, critical interventions, and verified mortality records
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            SDMA Audited
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Box 1: Reported */}
          <div className="bg-command-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
            <span className="text-[10px] text-rose-400 font-bold uppercase block">
              1. Reported Casualties (Preliminary)
            </span>
            <div className="text-3xl font-black text-rose-300">
              {totalReported}
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Ingested from field volunteer reports, 112 emergency calls, and camp intake registers.
            </p>
            <div className="pt-2 border-t border-command-800 text-[10px] text-slate-400">
              Deaths Reported: <strong className="text-rose-400">{totalReportedDeaths}</strong>
            </div>
          </div>

          {/* Box 2: Under Verification */}
          <div className="bg-command-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
            <span className="text-[10px] text-amber-400 font-bold uppercase block">
              2. Under Verification (Inquest Stage)
            </span>
            <div className="text-3xl font-black text-amber-300">
              {totalUnderVerification}
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Referred for revenue inspector cross-matching, police panchnama, and hospital identity check.
            </p>
            <div className="pt-2 border-t border-command-800 text-[10px] text-slate-400">
              Average Verification Time: <strong className="text-amber-400">2.4 Hours</strong>
            </div>
          </div>

          {/* Box 3: Verified */}
          <div className="bg-command-950 p-4 rounded-xl border border-emerald-500/40 space-y-2 bg-emerald-950/20">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block">
              3. Verified Casualties (Confirmed Fact)
            </span>
            <div className="text-3xl font-black text-emerald-400">
              {totalVerified}
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Officially signed off by District Magistrate / Chief Medical Officer for compensation and medical relief.
            </p>
            <div className="pt-2 border-t border-command-800 text-[10px] text-slate-400">
              Deaths Verified: <strong className="text-emerald-400">{totalVerifiedDeaths}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Facilities Cards List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-cyan-400" />
          <span>Lifeline District Hospital Facilities & Inventory</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((hosp) => {
            const isSelected = selectedHospital.id === hosp.id;
            return (
              <div
                key={hosp.id}
                onClick={() => setSelectedHospital(hosp)}
                className={`command-card p-5 cursor-pointer transition-all space-y-4 ${
                  isSelected ? 'border-cyan-500/70 shadow-lg' : 'hover:border-command-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {hosp.district}, {hosp.state}
                    </span>
                    <h4 className="text-sm font-bold text-white font-mono mt-0.5">
                      {hosp.name}
                    </h4>
                  </div>
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/40">
                    {hosp.medicineStockStatus} Drug Stock
                  </span>
                </div>

                {/* Beds and ICU Stats */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-command-950 p-2 rounded-lg border border-command-800">
                    <span className="text-[10px] text-slate-500 block">General Beds</span>
                    <span className="font-bold text-cyan-400">{hosp.availableBeds} / {hosp.totalBeds}</span>
                  </div>
                  <div className="bg-command-950 p-2 rounded-lg border border-command-800">
                    <span className="text-[10px] text-slate-500 block">ICU / Vent</span>
                    <span className="font-bold text-rose-400">{hosp.icuAvailable} / {hosp.icuTotal}</span>
                  </div>
                  <div className="bg-command-950 p-2 rounded-lg border border-command-800">
                    <span className="text-[10px] text-slate-500 block">Ambulances</span>
                    <span className="font-bold text-emerald-400">{hosp.availableAmbulances} / {hosp.activeAmbulances}</span>
                  </div>
                </div>

                {/* Casualty Breakdown for this facility */}
                <div className="bg-command-950/70 p-3 rounded-xl border border-command-800 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Treated Patients: <strong className="text-white">{hosp.casualtyTriage.verified}</strong></span>
                    <span>Critical Treated: <strong className="text-rose-400">{hosp.casualtyTriage.criticalTreated}</strong></span>
                    <span>Referred: <strong className="text-amber-400">{hosp.casualtyTriage.referred}</strong></span>
                  </div>
                </div>

                {/* Audit Action Button (Demo / Medical Lead) */}
                <div className="pt-2 border-t border-command-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-slate-400">Chief Medical Officer Verification:</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      verifyCasualty(hosp.id, 0, 5, -5);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Confirm 5 Inquests</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
