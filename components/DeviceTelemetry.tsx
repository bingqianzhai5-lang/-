import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Cpu, RotateCw, Box, Layers, Zap, Loader2 } from 'lucide-react';

export const DeviceTelemetry: React.FC = () => {
  const [viewMode, setViewMode] = useState<'standard' | 'wireframe' | 'layers'>('standard');
  const [isDiagnosticsRunning, setIsDiagnosticsRunning] = useState(false);
  const [activeSection, setActiveSection] = useState<'link' | 'battery' | null>('link');
  
  // Dynamic State for "Live" feel
  const [motorLoads, setMotorLoads] = useState([75, 82, 68, 70]);
  const [signalDbm, setSignalDbm] = useState(-42);

  const runDiagnostics = () => {
    setIsDiagnosticsRunning(true);
    setTimeout(() => {
        setIsDiagnosticsRunning(false);
    }, 2000);
  };

  // Simulate real-time motor load fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
        setMotorLoads(prev => prev.map(val => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2 variation
            return Math.min(Math.max(val + change, 50), 95); // clamp between 50 and 95
        }));
    }, 200); // Fast updates for jittery engine feel

    const signalInterval = setInterval(() => {
        setSignalDbm(prev => {
            const change = Math.floor(Math.random() * 3) - 1;
            return Math.min(Math.max(prev + change, -60), -30);
        });
    }, 1000);

    return () => {
        clearInterval(interval);
        clearInterval(signalInterval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* 3D Model Viewer */}
      <div className="tech-panel p-0 rounded-sm flex-col relative overflow-hidden group h-48 sm:h-56 shrink-0 transition-all hover:border-zinc-600">
        <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
          <h3 className="text-white font-bold text-[10px] flex items-center gap-2 uppercase tracking-wider">
            <Cpu size={12} className="text-primary animate-pulse" />
            设备姿态实时反馈
          </h3>
          <div className="flex gap-2">
             <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded-full border border-zinc-800">
                <span className={`w-1 h-1 rounded-full ${viewMode === 'standard' ? 'bg-primary animate-pulse' : 'bg-blue-500'}`}></span>
                <span className="text-[9px] text-zinc-300 font-mono">
                    {viewMode === 'standard' ? '在线' : viewMode === 'wireframe' ? '线框' : '图层'}
                </span>
             </div>
          </div>
        </div>
        
        {/* Model Interaction Layer */}
        <div className={`flex-1 relative bg-surface-light/30 group cursor-crosshair overflow-hidden transition-all duration-300 ${viewMode === 'wireframe' ? 'bg-black' : ''}`}>
             {/* Abstract Drone Representation */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 relative transition-transform duration-500 hover:scale-110 ${viewMode === 'wireframe' ? 'opacity-50' : 'opacity-90'}`}>
                     <img 
                        src="https://picsum.photos/400/400" 
                        alt="Drone Model" 
                        className={`w-full h-full object-contain mix-blend-screen transition-all duration-300 ${
                            viewMode === 'wireframe' ? 'grayscale contrast-200 invert' : 
                            viewMode === 'layers' ? 'sepia blur-[1px]' : 
                            'grayscale contrast-125'
                        }`}
                     />
                     {viewMode === 'standard' && (
                        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-[scan_3s_linear_infinite]"></div>
                     )}
                     {viewMode === 'wireframe' && (
                        <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping"></div>
                     )}
                </div>
             </div>
             
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

             <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-20">
                <button 
                    onClick={() => setViewMode('standard')}
                    className={`p-1.5 border rounded-sm transition-colors ${viewMode === 'standard' ? 'bg-primary text-black border-primary' : 'bg-zinc-900/90 text-zinc-400 hover:text-white border-zinc-700'}`} 
                    title="重置视图"
                >
                    <RotateCw size={12} />
                </button>
                <button 
                    onClick={() => setViewMode('wireframe')}
                    className={`p-1.5 border rounded-sm transition-colors ${viewMode === 'wireframe' ? 'bg-primary text-black border-primary' : 'bg-zinc-900/90 text-zinc-400 hover:text-white border-zinc-700'}`} 
                    title="线框模式"
                >
                    <Box size={12} />
                </button>
                <button 
                    onClick={() => setViewMode('layers')}
                    className={`p-1.5 border rounded-sm transition-colors ${viewMode === 'layers' ? 'bg-primary text-black border-primary' : 'bg-zinc-900/90 text-zinc-400 hover:text-white border-zinc-700'}`} 
                    title="图层"
                >
                    <Layers size={12} />
                </button>
             </div>
        </div>
        
        <div className="p-2 bg-surface border-t border-border grid grid-cols-3 gap-px bg-zinc-800">
            {[
                { label: '俯仰 (PITCH)', val: '-0.5°' },
                { label: '横滚 (ROLL)', val: '2.1°' },
                { label: '偏航 (YAW)', val: '115°' }
            ].map((item) => (
                <div key={item.label} className="bg-surface flex flex-col items-center py-1 hover:bg-zinc-900 transition-colors cursor-col-resize select-none active:bg-zinc-800 group/item">
                    <span className="text-[9px] text-zinc-600 font-bold">{item.label}</span>
                    <span className="text-[10px] text-zinc-200 font-mono group-hover/item:text-primary transition-colors">{item.val}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Connection Stats */}
      <div className="tech-panel p-3 rounded-sm flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">链路与能源</h4>
            <button 
                onClick={runDiagnostics}
                disabled={isDiagnosticsRunning}
                className="text-[9px] text-primary hover:underline cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
                {isDiagnosticsRunning && <Loader2 size={8} className="animate-spin" />}
                {isDiagnosticsRunning ? '诊断中...' : '运行诊断'}
            </button>
        </div>
        
        <div className="space-y-3 mb-4">
            <div 
                onClick={() => setActiveSection(activeSection === 'link' ? null : 'link')}
                className={`flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-sm transition-colors border ${activeSection === 'link' ? 'bg-zinc-800/50 border-zinc-700' : 'border-transparent hover:bg-zinc-900/50'}`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-sm bg-zinc-900 border transition-colors ${activeSection === 'link' ? 'border-primary/50 text-primary' : 'border-zinc-800 text-zinc-400'}`}><Wifi size={14} /></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-zinc-300 font-medium">OcuSync 3.0</span>
                        <span className="text-[10px] text-zinc-600 font-mono">CH. 144 / 5.8G</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-mono text-primary font-bold">{signalDbm} dBm</div>
                    <div className="w-12 h-1 bg-zinc-800 rounded-sm mt-1 overflow-hidden">
                        <div 
                            style={{ width: `${100 + signalDbm}%` }} 
                            className="h-full bg-primary transition-all duration-500"
                        ></div>
                    </div>
                </div>
            </div>
            
            <div className="h-px bg-zinc-800 w-full"></div>

            <div 
                onClick={() => setActiveSection(activeSection === 'battery' ? null : 'battery')}
                className={`flex flex-col gap-1 group cursor-pointer p-2 -mx-2 rounded-sm transition-colors border ${activeSection === 'battery' ? 'bg-zinc-800/50 border-zinc-700' : 'border-transparent hover:bg-zinc-900/50'}`}
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-sm bg-zinc-900 border transition-colors ${activeSection === 'battery' ? 'border-warning/50 text-warning' : 'border-zinc-800 text-zinc-400'}`}><Battery size={14} /></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-zinc-300 font-medium">TB60 智能电池</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-600 font-mono">22.4V</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-mono text-white font-bold">82%</div>
                    </div>
                </div>
                <div className="w-full bg-zinc-900 h-1.5 mt-1 rounded-sm overflow-hidden border border-zinc-800">
                    <div className="bg-gradient-to-r from-warning to-yellow-500 h-full w-[82%] relative">
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/50 animate-[scanline_2s_linear_infinite]"></div>
                    </div>
                </div>
                {activeSection === 'battery' && (
                     <div className="flex justify-between text-[9px] text-zinc-400 font-mono pt-2 animate-in slide-in-from-top-1 fade-in duration-200">
                        <span>剩余时间: 18m 30s</span>
                        <span>温度: 32°C</span>
                        <span className="text-primary">状态: 良好</span>
                    </div>
                )}
            </div>
        </div>

        {/* Motor Status */}
        <div className="mt-auto bg-zinc-900/30 border border-zinc-800 rounded-sm p-2 group hover:border-zinc-700 transition-colors">
            <h5 className="text-[9px] text-zinc-500 uppercase font-bold mb-2 flex items-center gap-1"><Zap size={10}/> 电机负载 (Motor Load)</h5>
            <div className="grid grid-cols-4 gap-2 h-12">
                {motorLoads.map((load, i) => (
                    <div key={i} className="flex flex-col justify-end items-center gap-1 h-full cursor-help" title={`Motor ${i+1}: ${load}%`}>
                        <div className="w-full bg-zinc-800 rounded-[1px] relative flex-1 overflow-hidden">
                            <div 
                                style={{ height: `${load}%` }} 
                                className={`absolute bottom-0 w-full rounded-[1px] transition-all duration-200 group-hover:opacity-80 ${load > 80 ? 'bg-orange-500' : 'bg-primary/70'}`}
                            ></div>
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500">M{i+1}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};