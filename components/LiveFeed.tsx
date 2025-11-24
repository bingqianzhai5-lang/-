import React, { useState, useEffect } from 'react';
import { Maximize2, Crosshair, Target, Navigation, ZoomIn, ZoomOut, Aperture, Video, Camera, MoreHorizontal, Compass, Map, Activity, List, Layers } from 'lucide-react';
import { LogEntry } from '../types';

export const LiveFeed: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'VISIBLE' | 'THERMAL'>('VISIBLE');
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isRecording, setIsRecording] = useState(true);
  const [activeWaypoint, setActiveWaypoint] = useState<number | null>(4);
  const [mapType, setMapType] = useState<'SATELLITE' | 'TOPO'>('SATELLITE');
  
  // Live Data for HUD
  const [altitude, setAltitude] = useState(124);
  const [speed, setSpeed] = useState(12.5);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: '14:32:01', message: '系统初始化完成 (SYS_INIT_COMPLETE)', type: 'info' },
    { id: 2, timestamp: '14:32:05', message: '飞行路径已锁定 (PATH_LOCKED)', type: 'success' },
    { id: 3, timestamp: '14:32:15', message: '检测到风切变 (WIND_SHEAR)', type: 'warning' },
    { id: 4, timestamp: '14:32:20', message: 'AI 扫描开始: 扇区 4 (SECTOR_4)', type: 'info' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        '调整云台俯仰 (GIMBAL_PITCH)',
        '丢包率 (PACKET_LOSS) 0.01%',
        '返航点已更新 (HOME_POINT)',
        '正在扫描目标 B (SCAN_TARGET_B)',
        '电池温度正常 (BATT_TEMP_OK)'
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setLogs(prev => [...prev.slice(-4), { 
        id: Date.now(), 
        timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }), 
        message: randomMsg, 
        type: 'info' 
      }]);
    }, 3500);

    const hudInterval = setInterval(() => {
        setAltitude(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
        setSpeed(prev => parseFloat((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
    }, 500);

    return () => { 
        clearInterval(interval);
        clearInterval(hudInterval);
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Main Video Container */}
      <div className="tech-panel p-0 rounded-sm flex-1 relative overflow-hidden group border-zinc-800 flex flex-col min-h-[400px]">
        
        {/* Background Video */}
        <div className="absolute inset-0 bg-black transition-all duration-500">
          <img 
            src="https://picsum.photos/1200/800" 
            alt="Live Feed" 
            className={`w-full h-full object-cover transition-all duration-700 ${activeMode === 'THERMAL' ? 'grayscale invert contrast-150 brightness-110 blur-[1px]' : 'opacity-80'}`}
            style={{ transform: `scale(${zoomLevel})` }}
          />
          {/* Static Grids */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
          
          {/* Animated Scanning Line */}
          <div className="absolute inset-0 pointer-events-none opacity-20 animate-scanline bg-gradient-to-b from-transparent via-primary/50 to-transparent h-[10%]"></div>
          
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>
        </div>

        {/* --- HUD LAYOUT --- */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10 p-4 scan-overlay">
          
          {/* Top HUD Bar */}
          <div className="flex justify-between items-start pointer-events-auto">
             {/* Status Badge */}
             <div 
                onClick={() => setActiveMode(prev => prev === 'VISIBLE' ? 'THERMAL' : 'VISIBLE')}
                className="bg-black/80 backdrop-blur-md border border-zinc-700/50 px-3 py-2 rounded-sm flex gap-4 text-xs font-mono shadow-lg cursor-pointer hover:border-primary/50 transition-colors select-none"
             >
                 <div className="flex flex-col">
                     <span className="text-[9px] text-zinc-500 uppercase tracking-wider">模式 (Mode)</span>
                     <span className={`font-bold tracking-widest transition-colors ${activeMode === 'VISIBLE' ? 'text-primary' : 'text-orange-400'}`}>
                        {activeMode === 'VISIBLE' ? '可见光' : '热成像'}
                     </span>
                 </div>
                 <div className="w-px bg-zinc-700"></div>
                 <div className="flex flex-col">
                     <span className="text-[9px] text-zinc-500 uppercase tracking-wider">卫星数</span>
                     <span className="text-white flex items-center gap-1"><Navigation size={10} className="text-primary"/> 14</span>
                 </div>
                 <div className="w-px bg-zinc-700"></div>
                 <div className="flex flex-col">
                     <span className="text-[9px] text-zinc-500 uppercase tracking-wider">图传</span>
                     <span className="text-white">1080P/60</span>
                 </div>
             </div>

             {/* Recording Status */}
             {isRecording && (
                <div className="text-xs font-mono text-white bg-red-600/90 px-3 py-1 rounded-sm animate-pulse shadow-lg flex items-center gap-2 border border-red-500/50">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    录制中 00:14:22
                </div>
             )}
          </div>

          {/* Left Sidebar Overlay - Waypoints */}
          <div className="absolute left-4 top-20 bottom-32 w-48 hidden lg:flex flex-col gap-2 pointer-events-auto">
             <div className="bg-black/60 backdrop-blur-sm border-l-2 border-primary p-2">
                <h4 className="text-[10px] text-primary uppercase font-bold mb-2 flex items-center gap-1"><Map size={10} /> 任务航点 (Waypoints)</h4>
                <div className="space-y-2">
                   {[1, 2, 3].map((wp) => (
                      <div 
                        key={wp} 
                        onClick={() => setActiveWaypoint(wp)}
                        className={`flex items-center justify-between text-[10px] border-b border-white/10 pb-1 last:border-0 cursor-pointer hover:bg-white/5 p-1 rounded-sm transition-colors ${activeWaypoint === wp ? 'text-white font-bold' : 'text-zinc-300'}`}
                      >
                         <span>航点-0{wp}</span>
                         <span className={`font-mono ${activeWaypoint === wp ? 'text-primary' : 'text-zinc-500'}`}>
                             {activeWaypoint === wp ? '前往中' : '待执行'}
                         </span>
                      </div>
                   ))}
                   <div 
                        onClick={() => setActiveWaypoint(4)}
                        className={`flex items-center justify-between text-[10px] border-b border-white/10 pb-1 cursor-pointer p-1 rounded-sm ${activeWaypoint === 4 ? 'text-primary font-bold' : 'text-zinc-300'}`}
                    >
                      <span>航点-04</span>
                      <span className="font-mono animate-pulse">执行中</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Sidebar Overlay - Camera Params */}
          <div className="absolute right-4 top-20 bottom-32 w-12 hidden lg:flex flex-col items-center gap-4 py-4 bg-black/60 backdrop-blur-sm border border-white/5 rounded-full pointer-events-auto">
             <div className="flex flex-col items-center gap-1">
                 <span className="text-[8px] text-zinc-500">ISO</span>
                 <span className="text-[10px] text-white font-mono">200</span>
             </div>
             <div className="w-0.5 h-full bg-zinc-800 relative group cursor-ns-resize">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
             </div>
             <div className="flex flex-col items-center gap-1">
                 <span className="text-[8px] text-zinc-500">EV</span>
                 <span className="text-[10px] text-white font-mono">+0.5</span>
             </div>
          </div>

          {/* Center Reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-80 pointer-events-none">
             <div className="w-64 h-40 border-x border-white/20 relative transition-all duration-300 animate-pulse">
                 <div className="absolute top-1/2 left-0 w-4 h-px bg-white/50"></div>
                 <div className="absolute top-1/2 right-0 w-4 h-px bg-white/50"></div>
                 <div className="absolute top-0 left-1/2 h-4 w-px bg-white/50"></div>
                 <div className="absolute bottom-0 left-1/2 h-4 w-px bg-white/50"></div>
                 <Crosshair size={24} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors ${activeMode === 'THERMAL' ? 'text-orange-500' : 'text-primary'}`} />
                 
                 {/* Corner Data Stream */}
                 <div className="absolute -top-6 -left-2 text-[8px] font-mono text-primary/50 leading-none">
                    0x4F2A<br/>0x1B9C
                 </div>
                 <div className="absolute -bottom-6 -right-2 text-[8px] font-mono text-primary/50 leading-none text-right">
                    T_LOCK<br/>RDY
                 </div>
             </div>
          </div>

          {/* Bottom Cockpit Dashboard */}
          <div className="mt-auto w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-8 pb-0 px-0 flex items-end justify-between gap-2">
             
             {/* Left: Mini Map & Compass */}
             <div 
                onClick={() => setMapType(prev => prev === 'SATELLITE' ? 'TOPO' : 'SATELLITE')}
                className="w-1/4 h-32 bg-zinc-900/80 border-t border-r border-zinc-700 relative group/map overflow-hidden pointer-events-auto cursor-pointer"
             >
                 <img 
                    src={mapType === 'SATELLITE' ? "https://picsum.photos/300/300" : "https://picsum.photos/301/301"} 
                    className={`w-full h-full object-cover mix-blend-luminosity group-hover/map:opacity-100 transition-all duration-500 ${mapType === 'SATELLITE' ? 'opacity-60' : 'opacity-80 hue-rotate-180 invert'}`} 
                 />
                 {/* Radar Overlay */}
                 <div className="absolute inset-0 radar-gradient animate-radar-spin opacity-30 rounded-full scale-150"></div>
                 
                 <div className="absolute top-2 left-2 bg-black/50 px-1 text-[8px] text-white border border-white/20">
                     {mapType === 'SATELLITE' ? '卫星 (SAT)' : '地形 (TOPO)'}
                 </div>
                 <div className="absolute bottom-2 right-2 text-primary transition-transform duration-1000 group-hover/map:rotate-45"><Compass size={24} strokeWidth={1} /></div>
             </div>

             {/* Center: Flight Instruments */}
             <div className="flex-1 flex flex-col items-center justify-end pb-4">
                 <div className="flex gap-8 items-end mb-2">
                     <div className="flex flex-col items-center group">
                         <div className="text-3xl font-mono font-bold text-white leading-none group-hover:text-primary transition-colors">{altitude.toFixed(0)}<span className="text-sm text-zinc-500 ml-1">M</span></div>
                         <div className="h-1 w-16 bg-zinc-800 mt-1 rounded-full overflow-hidden relative">
                             <div style={{width: '75%'}} className="h-full bg-primary absolute left-0 top-0 transition-all duration-300"></div>
                         </div>
                         <span className="text-[9px] text-zinc-500 mt-1 tracking-widest">高度 (ALT)</span>
                     </div>
                     
                     <div className="w-px h-12 bg-zinc-800"></div>

                     <div className="flex flex-col items-center group">
                         <div className="text-3xl font-mono font-bold text-white leading-none group-hover:text-blue-500 transition-colors">{speed.toFixed(1)}<span className="text-sm text-zinc-500 ml-1">M/S</span></div>
                         <div className="h-1 w-16 bg-zinc-800 mt-1 rounded-full overflow-hidden relative">
                             <div style={{width: '50%'}} className="h-full bg-blue-500 absolute left-0 top-0 transition-all duration-300"></div>
                         </div>
                         <span className="text-[9px] text-zinc-500 mt-1 tracking-widest">速度 (SPD)</span>
                     </div>
                 </div>

                 {/* Video Controls Toolbar */}
                 <div className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-700 rounded-full px-4 py-1.5 pointer-events-auto shadow-lg backdrop-blur-sm hover:border-zinc-500 transition-colors">
                    <button onClick={() => setIsRecording(!isRecording)} className={`p-1.5 rounded-full transition-colors ${isRecording ? 'text-red-500 bg-red-500/10' : 'text-zinc-400 hover:text-white'}`}><Video size={14} /></button>
                    <button className="p-1.5 text-zinc-400 hover:text-white transition-colors active:scale-95"><Camera size={14} /></button>
                    <div className="w-px h-3 bg-zinc-700"></div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))} className="text-zinc-400 hover:text-white transition-colors"><ZoomOut size={14} /></button>
                        <span className="text-[10px] font-mono text-zinc-300 w-6 text-center select-none">{zoomLevel.toFixed(1)}x</span>
                        <button onClick={() => setZoomLevel(Math.min(4, zoomLevel + 0.5))} className="text-zinc-400 hover:text-white transition-colors"><ZoomIn size={14} /></button>
                    </div>
                 </div>
             </div>

             {/* Right: Live Logs */}
             <div className="w-1/4 h-32 bg-zinc-900/80 border-t border-l border-zinc-700 p-2 font-mono text-[9px] overflow-hidden flex flex-col pointer-events-auto relative hover:bg-zinc-900 transition-colors">
                 <div className="flex justify-between items-center border-b border-zinc-800 pb-1 mb-1">
                     <span className="text-zinc-400 flex items-center gap-1"><Activity size={10}/> 系统日志 (LOGS)</span>
                     <List size={10} className="text-zinc-600"/>
                 </div>
                 <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-hide">
                     {logs.map((log) => (
                         <div key={log.id} className="flex gap-2 animate-in slide-in-from-bottom-1 fade-in duration-300">
                             <span className="text-zinc-600 shrink-0">{log.timestamp}</span>
                             <span className={`truncate ${log.type === 'warning' ? 'text-warning' : log.type === 'success' ? 'text-primary' : 'text-zinc-300'}`}>
                                 {log.message}
                             </span>
                         </div>
                     ))}
                 </div>
                 <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none"></div>
             </div>
          </div>
        </div>

      </div>
      
    </div>
  );
};