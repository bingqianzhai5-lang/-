import React from 'react';
import { AlertTriangle, FileText, CheckCircle, Clock, Info, Filter, MoreHorizontal, Download } from 'lucide-react';

export const TablesView: React.FC = () => {
  const flights = [
    { id: 'FL-2023-001', drone: 'ALPHA-07', area: '扇区 A', duration: '45分', status: 'Completed', date: '2023-10-21' },
    { id: 'FL-2023-002', drone: 'BRAVO-02', area: '扇区 B', duration: '32分', status: 'In Progress', date: '2023-10-21' },
    { id: 'FL-2023-003', drone: 'ALPHA-07', area: '扇区 C', duration: '12分', status: 'Aborted', date: '2023-10-20' },
    { id: 'FL-2023-004', drone: 'CHARLIE-09', area: '扇区 A', duration: '55分', status: 'Completed', date: '2023-10-20' },
    { id: 'FL-2023-005', drone: 'DELTA-04', area: '边界区', duration: '22分', status: 'Completed', date: '2023-10-19' },
  ];

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex justify-between items-center tech-panel p-3 rounded-sm">
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-sm hover:bg-zinc-700"><Filter size={12}/> 筛选</button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-sm hover:bg-zinc-700"><Download size={12}/> 导出 CSV</button>
        </div>
        <span className="text-xs text-zinc-500">共计: 1,248 条记录</span>
      </div>
      
      <div className="tech-panel flex-1 rounded-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-zinc-900/50">
                <th className="p-3 text-xs font-medium text-zinc-400 font-mono uppercase">任务 ID (Mission ID)</th>
                <th className="p-3 text-xs font-medium text-zinc-400 font-mono uppercase">无人机单元</th>
                <th className="p-3 text-xs font-medium text-zinc-400 font-mono uppercase">目标区域</th>
                <th className="p-3 text-xs font-medium text-zinc-400 font-mono uppercase">时长</th>
                <th className="p-3 text-xs font-medium text-zinc-400 font-mono uppercase">状态</th>
                <th className="p-3 text-xs font-medium text-zinc-400 font-mono uppercase">日期</th>
                <th className="p-3 text-xs font-medium text-zinc-400 font-mono uppercase text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, i) => (
                <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="p-3 text-xs font-mono text-primary">{flight.id}</td>
                  <td className="p-3 text-xs text-zinc-300">{flight.drone}</td>
                  <td className="p-3 text-xs text-zinc-300">{flight.area}</td>
                  <td className="p-3 text-xs text-zinc-400 font-mono">{flight.duration}</td>
                  <td className="p-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                        flight.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                        flight.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                        'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {flight.status === 'Completed' ? '已完成' : flight.status === 'In Progress' ? '进行中' : '已中止'}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-zinc-500 font-mono">{flight.date}</td>
                  <td className="p-3 text-right">
                    <button className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-white"><MoreHorizontal size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AlertsView: React.FC = () => {
    const alerts = [
        { level: 'CRITICAL', msg: '3号电机过热 (Motor #3 Overheating)', time: '10:42 AM', code: 'ERR_MTR_03' },
        { level: 'WARNING', msg: '风速超过安全限制 (12m/s)', time: '10:15 AM', code: 'WARN_ENV_WIND' },
        { level: 'INFO', msg: '地面站固件更新可用', time: '09:30 AM', code: 'INFO_SYS_UPD' },
        { level: 'WARNING', msg: '4号扇区 GPS 信号衰减', time: '09:12 AM', code: 'WARN_NAV_GPS' },
    ];

    return (
        <div className="h-full tech-panel rounded-sm p-4 overflow-y-auto">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-warning"/> 系统警报日志</h2>
            <div className="space-y-2">
                {alerts.map((alert, i) => (
                    <div key={i} className={`p-4 rounded-sm border flex items-start justify-between ${
                        alert.level === 'CRITICAL' ? 'bg-red-900/10 border-red-900/30' : 
                        alert.level === 'WARNING' ? 'bg-orange-900/10 border-orange-900/30' : 
                        'bg-blue-900/10 border-blue-900/30'
                    }`}>
                        <div className="flex gap-4">
                            <div className={`mt-1 p-1.5 rounded-full ${
                                alert.level === 'CRITICAL' ? 'bg-red-500 text-black' : 
                                alert.level === 'WARNING' ? 'bg-orange-500 text-black' : 
                                'bg-blue-500 text-black'
                            }`}>
                                {alert.level === 'CRITICAL' ? <AlertTriangle size={16} fill="currentColor"/> : <Info size={16} />}
                            </div>
                            <div>
                                <h3 className={`text-sm font-bold ${
                                    alert.level === 'CRITICAL' ? 'text-red-400' : 
                                    alert.level === 'WARNING' ? 'text-orange-400' : 
                                    'text-blue-400'
                                }`}>{alert.msg}</h3>
                                <p className="text-xs text-zinc-500 mt-1 font-mono">{alert.code}</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono text-zinc-400">{alert.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const NewsView: React.FC = () => (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="tech-panel p-6 rounded-sm">
            <div className="flex items-center gap-2 text-primary mb-4">
                <FileText size={18} />
                <h2 className="font-bold">系统更新说明 v2.1.4</h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                更新包括针对低光环境的 AI 目标检测算法改进，降低 OcuSync 3.0 传输延迟，以及新增用于降噪的“静默模式”。
            </p>
            <ul className="list-disc list-inside text-xs text-zinc-500 space-y-2 font-mono">
                <li>修复 AG-4 Pro 云台漂移问题</li>
                <li>优化悬停时的电池使用</li>
                <li>增加自定义地图图层支持</li>
            </ul>
        </div>
        <div className="tech-panel p-6 rounded-sm bg-gradient-to-br from-zinc-900 to-black">
             <div className="flex items-center gap-2 text-zinc-300 mb-4">
                <CheckCircle size={18} />
                <h2 className="font-bold">维护计划</h2>
            </div>
            <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                    <div className="text-xs text-zinc-500 font-mono">10月25日, 02:00 UTC</div>
                    <div className="text-sm text-zinc-300 font-medium">服务器迁移</div>
                </div>
                <div className="border-l-2 border-zinc-700 pl-4 opacity-50">
                    <div className="text-xs text-zinc-500 font-mono">10月18日, 04:00 UTC</div>
                    <div className="text-sm text-zinc-300 font-medium">例行数据库备份</div>
                </div>
            </div>
        </div>
    </div>
);