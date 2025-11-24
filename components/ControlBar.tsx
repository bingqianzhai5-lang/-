import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Share2, Target, Check, RefreshCw } from 'lucide-react';

export const ControlBar: React.FC = () => {
  const [dateOpen, setDateOpen] = useState(false);
  const [droneOpen, setDroneOpen] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState('ALPHA-07');
  const [selectedRange, setSelectedRange] = useState('2023.10.14 - 2023.10.21');

  const drones = ['ALPHA-07', 'BRAVO-02', 'CHARLIE-09', 'DELTA-04'];
  const ranges = ['今天', '过去 7 天', '过去 30 天', '自定义范围'];

  return (
    <div className="h-10 border-b border-border bg-background px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 z-40 relative">
      <div className="flex items-center gap-2 h-full">
        {/* Date Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDateOpen(!dateOpen)}
            className={`flex items-center gap-2 px-3 py-1 rounded-sm border text-xs cursor-pointer transition-all ${dateOpen ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-surface border-border text-zinc-400 hover:text-white hover:border-zinc-600'}`}
          >
            <Calendar size={13} />
            <span className="font-mono pt-0.5">{selectedRange}</span>
            <ChevronDown size={12} className={`opacity-50 transition-transform ${dateOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {dateOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-zinc-900 border border-zinc-700 rounded-sm shadow-xl z-50 flex flex-col py-1">
               {ranges.map(range => (
                 <button 
                  key={range}
                  onClick={() => { setSelectedRange(range === '过去 7 天' ? '2023.10.14 - 2023.10.21' : range); setDateOpen(false); }}
                  className="text-left px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                 >
                   {range}
                 </button>
               ))}
               <div className="h-px bg-zinc-800 my-1"></div>
               <div className="px-3 py-1 text-[10px] text-zinc-600 uppercase">历史归档</div>
            </div>
          )}
        </div>
        
        <div className="h-4 w-px bg-zinc-800 hidden sm:block"></div>
        
        {/* Drone Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDroneOpen(!droneOpen)}
            className={`flex items-center gap-2 px-3 py-1 rounded-sm border text-xs cursor-pointer transition-all ${droneOpen ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-surface border-border text-zinc-300 hover:text-white hover:border-zinc-600'}`}
          >
            <Target size={13} className={droneOpen ? 'text-white' : 'text-primary'} />
            <span className="pt-0.5 font-medium">无人机编队: {selectedDrone}</span>
            <ChevronDown size={12} className={`opacity-50 transition-transform ${droneOpen ? 'rotate-180' : ''}`} />
          </button>

          {droneOpen && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-zinc-900 border border-zinc-700 rounded-sm shadow-xl z-50 flex flex-col py-1">
              <div className="px-3 py-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">选择机组</div>
              {drones.map(drone => (
                <button 
                  key={drone}
                  onClick={() => { setSelectedDrone(drone); setDroneOpen(false); }}
                  className="flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white group"
                >
                  <span className="font-mono">{drone}</span>
                  {selectedDrone === drone && <Check size={12} className="text-primary" />}
                </button>
              ))}
              <div className="h-px bg-zinc-800 my-1"></div>
              <button className="flex items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-primary/10 transition-colors text-left w-full">
                <RefreshCw size={12} />
                扫描新设备
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700">
          <Share2 size={14} />
        </button>
        <button className="bg-zinc-100 hover:bg-white text-black text-xs font-bold px-3 py-1 rounded-sm flex items-center gap-2 transition-colors active:translate-y-px relative">
          <Download size={13} />
          <span>导出数据</span>
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </button>
      </div>
      
      {/* Date Dropdown Overlay for clicking outside (simplified) */}
      {(dateOpen || droneOpen) && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setDateOpen(false); setDroneOpen(false); }} />
      )}
    </div>
  );
};