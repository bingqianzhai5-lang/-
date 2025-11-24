import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlBar } from './components/ControlBar';
import { KPICards } from './components/KPICards';
import { DeviceTelemetry } from './components/DeviceTelemetry';
import { FlightSpecs } from './components/FlightSpecs';
import { LiveFeed } from './components/LiveFeed';
import { TablesView, AlertsView, NewsView } from './components/TabViews';
import { Server } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden font-sans">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-h-0 relative z-10">
        <ControlBar />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          <div className="flex flex-col gap-4 max-w-[1920px] mx-auto h-full">
            {/* Top KPI Row - Always visible or only on Dashboard? Usually always visible in Dashboards */}
            <KPICards />
            
            {/* Main Content Grid */}
            <div className="flex-1 flex flex-col min-h-[500px]">
                {activeTab === 'Dashboard' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
                    {/* Left Column: Device Telemetry (3/12) */}
                    <div className="lg:col-span-3 flex flex-col h-full overflow-hidden">
                        <DeviceTelemetry />
                    </div>
                    
                    {/* Center Column: Flight Data (3/12) */}
                    <div className="lg:col-span-3 flex flex-col h-full overflow-hidden">
                        <FlightSpecs />
                    </div>
                    
                    {/* Right Column: Live Feed (6/12) */}
                    <div className="lg:col-span-6 flex flex-col h-full overflow-hidden">
                        <LiveFeed />
                    </div>
                    </div>
                )}
                
                {activeTab === 'Tables' && <TablesView />}
                {activeTab === 'Alerts' && <AlertsView />}
                {activeTab === 'News' && <NewsView />}
            </div>
          </div>
        </div>

        {/* Global System Status Footer */}
        <div className="h-6 bg-surface border-t border-border flex items-center justify-between px-4 text-[9px] text-zinc-500 shrink-0 select-none">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> 系统在线 (SYSTEM_ONLINE)</span>
                <span className="font-mono">服务器 (SERVER): AWS-USE1-AG4</span>
                <span className="font-mono">延迟 (LATENCY): 24ms</span>
            </div>
            <div className="flex items-center gap-2">
                 <Server size={10} />
                 <span>v1.0.4-stable build.2209</span>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;