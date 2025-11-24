import React, { useState } from 'react';
import { Eye, Activity, Wifi, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { MetricCardProps } from '../types';

interface ExtendedMetricCardProps extends MetricCardProps {
  isSelected: boolean;
  onClick: () => void;
}

const KPICard: React.FC<ExtendedMetricCardProps> = ({ title, value, trend, isPositive, icon: Icon, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`tech-panel p-4 rounded-sm flex flex-col justify-between h-28 relative overflow-hidden group transition-all cursor-pointer ${
      isSelected ? 'border-primary ring-1 ring-primary/50 bg-zinc-900' : 'hover:border-zinc-600 hover:bg-zinc-900/50'
    }`}
  >
    <div className="flex justify-between items-start z-10">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
            <Icon size={14} className={`transition-colors ${isSelected ? 'text-primary' : 'text-zinc-500'}`} />
            <h3 className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{title}</h3>
        </div>
        <div className={`text-2xl font-bold font-mono tracking-tight mt-1 transition-colors ${isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{value}</div>
      </div>
      <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono transition-colors ${
        isPositive 
            ? (isSelected ? 'text-black bg-primary' : 'text-primary bg-primary/10') 
            : 'text-warning bg-warning/10'
      }`}>
        {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        <span>{trend}</span>
      </div>
    </div>
    
    <div className="mt-auto z-10 w-full bg-zinc-800/50 h-px relative overflow-hidden">
        <div className={`h-full absolute left-0 top-0 transition-all duration-1000 ${isPositive ? 'bg-primary' : 'bg-warning'} ${isSelected ? 'w-full' : 'w-1/3 group-hover:w-2/3'}`}></div>
    </div>
  </div>
);

export const KPICards: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const metrics = [
    { title: "AI 识别精度", value: "95.63%", trend: "+2.4%", isPositive: true, icon: Eye },
    { title: "光谱健康度", value: "正常", trend: "100%", isPositive: true, icon: Activity },
    { title: "图传延迟", value: "32ms", trend: "-4ms", isPositive: true, icon: Wifi },
    { title: "避障状态", value: "工作中", trend: "高灵敏", isPositive: true, icon: ShieldCheck },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
      {metrics.map((metric, index) => (
        <KPICard 
          key={index} 
          {...metric} 
          isSelected={selectedIndex === index} 
          onClick={() => setSelectedIndex(index === selectedIndex ? null : index)} 
        />
      ))}
    </div>
  );
};