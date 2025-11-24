import React, { useState } from 'react';
import { Bell, Search, User, Hexagon, Plus, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="h-12 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-50 sticky top-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-primary animate-pulse">
            <Hexagon size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-bold tracking-widest text-sm leading-none font-sans">PLANT GUARD</h1>
            <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] leading-none mt-0.5">DOS SYSTEM V1.0</span>
          </div>
        </div>

        <div className="h-5 w-px bg-zinc-800 hidden md:block"></div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { en: 'Dashboard', zh: '仪表盘' },
            { en: 'Tables', zh: '数据表' },
            { en: 'Alerts', zh: '警报' },
            { en: 'News', zh: '资讯' }
          ].map((item) => (
            <button 
              key={item.en}
              onClick={() => onTabChange(item.en)}
              className={`px-4 py-1.5 rounded-sm text-xs font-medium transition-all relative overflow-hidden group ${
                activeTab === item.en
                  ? 'bg-zinc-800 text-white border-b-2 border-primary shadow-[0_4px_12px_rgba(0,0,0,0.5)]' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <span className="relative z-10">{item.zh}</span>
              {activeTab === item.en && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50"></div>
              )}
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-medium text-zinc-500 hover:text-white hover:bg-zinc-900 ml-2 border border-dashed border-zinc-800 hover:border-zinc-600 transition-colors active:scale-95">
            <Plus size={12} />
            <span>添加视图</span>
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className={`relative hidden lg:flex items-center transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-primary' : 'text-zinc-600'}`} size={14} />
          <input 
            type="text" 
            placeholder="搜索设备 ID / 任务代码..." 
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="h-8 w-full bg-surface border border-border rounded-sm pl-9 pr-4 text-xs text-white focus:outline-none focus:border-primary/50 placeholder:text-zinc-700 transition-all shadow-inner"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <span className="text-[10px] text-zinc-700 border border-zinc-800 rounded px-1 font-mono">⌘K</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 border-l border-border pl-4">
          <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm relative transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,230,118,0.5)] animate-pulse"></span>
          </button>
          
          <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors md:hidden">
            <Menu size={16} />
          </button>

          <div className="flex items-center gap-3 pl-2 cursor-pointer group hover:bg-zinc-900 py-1 px-2 rounded-sm transition-colors">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">Armand D.</div>
              <div className="text-[10px] text-primary font-mono">OP_LEVEL_3</div>
            </div>
            <div className="w-8 h-8 rounded-sm bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-primary/50 transition-colors overflow-hidden relative">
               <User size={14} className="text-zinc-400 group-hover:text-white relative z-10" />
               <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full border border-zinc-900 animate-pulse-fast z-20"></div>
            </div>
            <Settings size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};