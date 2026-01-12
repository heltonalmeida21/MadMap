
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppSettings, AppBackground } from '../types';
import Logo from './Logo';

interface SidebarProps {
  settings?: AppSettings;
}

const Sidebar: React.FC<SidebarProps> = ({ settings }) => {
  const location = useLocation();

  const isDark = settings?.background !== AppBackground.LIGHT;

  const navItems = [
    { path: '/', icon: 'fa-house', label: 'Início' },
    { path: '/planner', icon: 'fa-calendar-days', label: 'Planner' },
    { path: '/analytics', icon: 'fa-chart-line', label: 'Estatísticas' },
    { path: '/subjects', icon: 'fa-book', label: 'Matérias' },
    { path: '/ai-popular', icon: 'fa-microchip', label: 'IA Populares' },
    { path: '/profile', icon: 'fa-user', label: 'Perfil' },
    { path: '/settings', icon: 'fa-gear', label: 'Ajustes' },
  ];

  return (
    <aside className={`fixed bottom-0 left-0 w-full h-16 border-t flex items-center justify-around z-50 md:relative md:w-64 md:h-screen md:flex-col md:border-t-0 md:border-r md:p-6 transition-all ${
      isDark ? 'bg-slate-900/50 backdrop-blur-xl border-white/5' : 'bg-white border-slate-200'
    }`}>
      <div className="hidden md:flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Logo size={24} />
        </div>
        <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          MindMap
        </h1>
      </div>

      <nav className="flex-1 w-full flex md:flex-col gap-1.5 overflow-y-auto no-scrollbar pb-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 px-3 py-2 md:px-5 md:py-4 rounded-2xl transition-all ${
                isActive 
                  ? 'text-blue-500 md:bg-blue-500/10 font-bold' 
                  : `${isDark ? 'text-slate-500 hover:text-blue-400 hover:bg-white/5' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'}`
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg md:text-xl`}></i>
              <span className="text-[10px] md:text-sm tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={`hidden lg:block mt-auto p-5 rounded-[24px] border ${
        isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-fire text-orange-500 shadow-sm shadow-orange-500/20"></i>
            <span className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Streak</span>
          </div>
          <span className={`text-xs font-black ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>5 DIAS</span>
        </div>
        <div className="w-full bg-slate-200/20 h-2 rounded-full overflow-hidden">
          <div className="bg-orange-500 h-full w-[70%] rounded-full shadow-sm shadow-orange-500/40"></div>
        </div>
        <p className={`text-[10px] font-bold mt-3 uppercase tracking-widest text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Nível 8 • Mind Master
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
