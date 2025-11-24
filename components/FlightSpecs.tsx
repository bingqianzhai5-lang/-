import React, { useState, useEffect } from 'react';
import { Aperture, Clock, Wind, Thermometer, MapPin, HardDrive, Settings2, Sliders, Signal, Zap, RefreshCcw } from 'lucide-react';

const SpecRow = ({ label, value, icon: Icon, active, onClick }: { label: string, value: string, icon: any, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0 px-2 -mx-2 rounded-sm transition-all group ${active ? 'bg-zinc-800 border-l-2 border-l-primary' : 'hover:bg-white/5 border-l-2 border-l-transparent'}`}
  >
    <div className="flex items-center gap-2">
        <Icon size={14} className={`transition-colors ${active ? 'text-primary' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
        <span className={`text-xs ${active ? 'text-zinc-200' : 'text-zinc-500'}`}>{label}</span>
    </div>
    <span className={`text-xs font-mono transition-colors ${active ? 'text-white font-bold' : 'text-zinc-200 group-hover:text-white'}`}>{value}</span>
  </button>
);

const BigStat = ({ label, value, sub, icon: Icon, alert, onClick }: { label: string, value: string, sub: string, icon: any, alert?: boolean, onClick?: () => void }) => (
    <div 
        onClick={onClick}
        className={`bg-zinc-900/50 border p-2.5 rounded-sm flex flex-col justify-between transition-all cursor-pointer group active:scale-95 select-none ${alert ? 'border-warning/30 bg-warning/5 hover:bg-warning/10' : 'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/30'}`}
    >
        <div className="flex justify-between items-start mb-1">
            <Icon size={14} className={alert ? 'text-warning' : 'text-zinc-600 group-hover:text-zinc-500'} />
            <span className={`text-[9px] font-mono ${alert ? 'text-warning' : 'text-zinc-500'}`}>{sub}</span>
        </div>
        <div>
            <div className={`text-lg font-mono font-bold leading-none mb-1 ${alert ? 'text-warning' : 'text-white'}`}>{value}</div>
            <div className={`text-[9px] uppercase font-bold ${alert ? 'text-warning/70' : 'text-zinc-600'}`}>{label}</div>
        </div>
    </div>
);

export const FlightSpecs: React.FC = () => {
  const [activeSpec, setActiveSpec] = useState('resolution');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [sdFormatting, setSdFormatting] = useState(false);
  
  // Live Data State
  const [windSpeed, setWindSpeed] = useState(8.4);
  const [temp, setTemp] = useState(24.5);
  const [signalHistory, setSignalHistory] = useState([40,50,45,60,70,55,40,35,50,65,80,75,60,50,45,55,60,70,85,60]);

  const toggleUnits = () => setUnitSystem(prev => prev === 'metric' ? 'imperial' : 'metric');

  const handleSdClick = () => {
      if(sdFormatting) return;
      setSdFormatting(true);
      setTimeout(() => setSdFormatting(false), 2000);
  };

  useEffect(() => {
    // Update Wind & Temp occasionally
    const envInterval = setInterval(() => {
        setWindSpeed(prev => parseFloat((prev + (Math.random() - 0.5)).toFixed(1)));
        setTemp(prev => parseFloat((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
    }, 2000);

    // Update Graph "Live" scroll
    const graphInterval = setInterval(() => {
        setSignalHistory(prev => {
            const nextVal = Math.floor(Math.random() * 40) + 40; // 40-80 range
            return [...prev.slice(1), nextVal];
        });
    }, 500);

    return () => {
        clearInterval(envInterval);
        clearInterval(graphInterval);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Camera Specs */}
      <div className="tech-panel p-3 rounded-sm">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2">
                <Settings2 size={12} />
                光学载荷参数
            </h3>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
        </div>
        
        <div className="flex flex-col gap-0.5">
            <SpecRow label="分辨率" value="4K UHD / 60FPS" icon={Aperture} active={activeSpec === 'resolution'} onClick={() => setActiveSpec('resolution')} />
            <SpecRow label="焦距 (EFL)" value="24mm F/2.8" icon={Aperture} active={activeSpec === 'focal'} onClick={() => setActiveSpec('focal')} />
            <SpecRow label="快门速度" value="1/2000s" icon={Aperture} active={activeSpec === 'shutter'} onClick={() => setActiveSpec('shutter')} />
            <SpecRow label="ISO 感光度" value="AUTO (100-3200)" icon={Aperture} active={activeSpec === 'iso'} onClick={() => setActiveSpec('iso')} />
        </div>
        
        <div 
            onClick={handleSdClick}
            className="mt-3 pt-3 border-t border-border flex items-center gap-3 cursor-pointer group hover:bg-zinc-900/30 -mx-1 px-1 rounded transition-colors"
        >
             {sdFormatting ? <RefreshCcw size={14} className="text-warning animate-spin" /> : <HardDrive size={14} className="text-zinc-500 group-hover:text-zinc-300" />}
             <div className="flex-1">
                 <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                     <span className="group-hover:text-zinc-300">{sdFormatting ? '格式化中...' : 'SD 卡 1'}</span>
                     <span className={`font-mono ${sdFormatting ? 'text-zinc-500' : 'text-primary'}`}>124GB 可用</span>
                 </div>
                 <div className="w-full bg-zinc-900 h-1 rounded-sm overflow-hidden">
                     <div className={`h-full w-[25%] transition-all duration-300 ${sdFormatting ? 'bg-warning w-full' : 'bg-blue-600'}`}></div>
                 </div>
             </div>
        </div>
      </div>

      {/* Flight Environment */}
      <div className="tech-panel p-3 rounded-sm flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-center">
            <h3 className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider">环境与续航</h3>
            <button onClick={toggleUnits} className="text-zinc-600 hover:text-white transition-colors" title="切换单位">
                <Sliders size={12} />
            </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
             <BigStat label="飞行时间" value="12:34" sub="T+" icon={Clock} />
             <BigStat label="剩余续航" value="18m" sub="剩余" icon={Clock} alert={false} />
             <BigStat 
                label="风速" 
                value={unitSystem === 'metric' ? windSpeed.toFixed(1) : (windSpeed * 1.94).toFixed(1)} 
                sub={unitSystem === 'metric' ? "m/s" : "kts"} 
                icon={Wind} 
                alert={windSpeed > 10}
                onClick={toggleUnits}
             />
             <BigStat 
                label="温度" 
                value={unitSystem === 'metric' ? temp.toFixed(1) : (temp * 1.8 + 32).toFixed(1)} 
                sub={unitSystem === 'metric' ? "°C" : "°F"} 
                icon={Thermometer}
                onClick={toggleUnits}
             />
        </div>

        {/* Richer Visualization Section */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-sm p-2 flex flex-col gap-3">
             {/* Battery Graph */}
             <div className="flex flex-col gap-1 cursor-crosshair group">
                <div className="flex justify-between items-center text-[9px] text-zinc-500 uppercase">
                    <span className="flex items-center gap-1 group-hover:text-white transition-colors"><Zap size={10}/> 功率消耗 (Power Draw)</span>
                    <span className="font-mono text-zinc-300">18.4A</span>
                </div>
                {/* Simulated Sparkline */}
                <div className="h-6 flex items-end justify-between gap-px">
                    {signalHistory.map((h, i) => (
                        <div key={i} style={{height: `${h}%`}} className={`w-full rounded-[1px] hover:opacity-80 transition-all duration-300 ${h > 75 ? 'bg-warning' : 'bg-zinc-700'}`}></div>
                    ))}
                </div>
             </div>

             {/* Signal Strength Histogram */}
             <div className="flex flex-col gap-1 border-t border-zinc-800 pt-2 cursor-help group">
                <div className="flex justify-between items-center text-[9px] text-zinc-500 uppercase">
                    <span className="flex items-center gap-1 group-hover:text-primary transition-colors"><Signal size={10}/> 信号质量 (Signal)</span>
                    <span className="font-mono text-primary group-hover:underline">-82dBm</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-primary w-[85%] group-hover:animate-pulse"></div>
                    <div className="h-full bg-zinc-600 w-[15%]"></div>
                </div>
             </div>
        </div>

        <div className="mt-auto bg-surface border border-border p-2 rounded-sm flex items-center justify-between cursor-pointer hover:border-zinc-600 transition-colors group active:bg-zinc-900">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-900 rounded-sm text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                    <MapPin size={14} />
                </div>
                <div>
                    <div className="text-[8px] uppercase text-zinc-500 font-bold group-hover:text-zinc-400">返航点 (HOME)</div>
                    <div className="text-white font-mono text-[10px]">Lat: 34.0522, Lon: -118.2437</div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-primary font-mono text-xs font-bold">450m</div>
                <div className="text-[8px] text-zinc-600">距离 (DIST)</div>
            </div>
        </div>
      </div>
    </div>
  );
};