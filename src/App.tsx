import React, { useState } from 'react';
import { DisasterProvider, useDisaster } from './context/DisasterContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SimulationModal } from './components/simulation/SimulationModal';
import { AapdaAiChat } from './components/ai/AapdaAiChat';

// Views
import { HomeLandingView } from './components/views/HomeLandingView';
import { CommandDashboardView } from './components/views/CommandDashboardView';
import { PredictionEngineView } from './components/views/PredictionEngineView';
import { LiveGisMapView } from './components/views/LiveGisMapView';
import { OfficialAlertsView } from './components/views/OfficialAlertsView';
import { CitizenSosView } from './components/views/CitizenSosView';
import { EvacuationShelterView } from './components/views/EvacuationShelterView';
import { MedicalResponseView } from './components/views/MedicalResponseView';
import { ReliefResourceView } from './components/views/ReliefResourceView';
import { DamageAssessmentView } from './components/views/DamageAssessmentView';
import { RecoveryDashboardView } from './components/views/RecoveryDashboardView';
import { PreventionIntelligenceView } from './components/views/PreventionIntelligenceView';
import { RoleSpecificViews } from './components/views/RoleSpecificViews';
import { AdminManagementView } from './components/views/AdminManagementView';

const MainLayout: React.FC = () => {
  const { activeTab } = useDisaster();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSimulationOpen, setIsSimulationOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <HomeLandingView onOpenSimulation={() => setIsSimulationOpen(true)} />;
      case 'dashboard':
        return <CommandDashboardView />;
      case 'prediction':
        return <PredictionEngineView />;
      case 'gis_map':
        return <LiveGisMapView />;
      case 'alerts':
        return <OfficialAlertsView />;
      case 'sos':
        return <CitizenSosView />;
      case 'shelters':
        return <EvacuationShelterView />;
      case 'medical':
        return <MedicalResponseView />;
      case 'relief':
        return <ReliefResourceView />;
      case 'damage':
        return <DamageAssessmentView />;
      case 'recovery':
        return <RecoveryDashboardView />;
      case 'prevention':
        return <PreventionIntelligenceView />;
      case 'role_citizen':
      case 'role_responder':
      case 'role_medical':
      case 'role_relief':
        return <RoleSpecificViews />;
      case 'admin':
        return <AdminManagementView />;
      default:
        return <HomeLandingView onOpenSimulation={() => setIsSimulationOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-command-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar 
        onOpenSimulation={() => setIsSimulationOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-3 sm:px-6 gap-6 pt-4">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Dynamic View Content Area */}
        <main className="flex-1 min-w-0">
          {renderActiveView()}
        </main>
      </div>

      {/* Persistent Aapda AI Emergency Copilot */}
      <AapdaAiChat />

      {/* 5-Stage Live Simulation Modal */}
      <SimulationModal 
        isOpen={isSimulationOpen} 
        onClose={() => setIsSimulationOpen(false)} 
      />

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <DisasterProvider>
      <MainLayout />
    </DisasterProvider>
  );
}

export default App;
