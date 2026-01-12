
import React, { useMemo, useState, useEffect } from 'react';
import { Subject, StudySession, UserProfile } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { getStudyInsights } from '../services/geminiService';

interface DashboardProps {
  user: UserProfile;
  subjects: Subject[];
  sessions: StudySession[];
  onStartStudy: () => void;
  themeContext?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, subjects, sessions, onStartStudy, themeContext }) => {
  const [aiInsight, setAiInsight] = useState<string>("Analisando seus padrões de aprendizado...");

  useEffect(() => {
    const fetchInsight = async () => {
      const insight = await getStudyInsights(sessions, subjects);
      setAiInsight(insight);
    };
    fetchInsight();
  }, [sessions, subjects]);

  const nextSession = useMemo(() => {
    return sessions.find(s => !s.completed);
  }, [sessions]);

  const subjectForNextSession = useMemo(() => {
    return subjects.find(sub => sub.id === nextSession?.subjectId);
  }, [nextSession, subjects]);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    return days.map(day => {
      const daySessions = sessions.filter(s => s.date === day && s.completed);
      const totalMinutes = daySessions.reduce((acc, s) => acc + s.actualMinutes, 0);
      return {
        name: new Date(day).toLocaleDateString('pt-BR', { weekday: 'short' }),
        minutes: totalMinutes,
      };
    });
  }, [sessions]);

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bom dia, {user.name} 👋</h1>
          <p className="opacity-60 font-medium">Organize sua mente, maximize seu aprendizado hoje.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <i className="fa-solid fa-fire text-lg"></i>
            <span className="font-bold">{user.streak} Dias</span>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-500 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <i className="fa-solid fa-star text-lg"></i>
            <span className="font-bold">{user.xp} XP</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call to Action */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20 flex flex-col justify-between min-h-[300px]">
          <div className="relative z-10">
            <h2 className="text-sm font-medium opacity-80 mb-2 uppercase tracking-wider">Próxima Sessão</h2>
            <h3 className="text-4xl font-black mb-4 tracking-tight">{subjectForNextSession?.name || 'Nada planejado'}</h3>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                <i className="fa-solid fa-clock opacity-70"></i>
                <span className="text-lg font-semibold">{nextSession?.plannedMinutes || 0} min</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                <i className="fa-solid fa-bolt opacity-70"></i>
                <span className="text-lg font-semibold">Foco Máximo</span>
              </div>
            </div>
          </div>
          <div className="z-10 mt-auto">
            <button 
              onClick={onStartStudy}
              disabled={!nextSession}
              className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-lg shadow-black/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Iniciar Fluxo
            </button>
          </div>
          <i className="fa-solid fa-brain absolute -bottom-10 -right-10 text-[220px] opacity-10 rotate-12 pointer-events-none"></i>
        </div>

        {/* Daily Goal Progress */}
        <div className={`${themeContext} p-6 rounded-[40px] border shadow-sm flex flex-col items-center justify-center text-center`}>
          <h2 className="text-lg font-bold mb-6 w-full text-left">Foco Diário</h2>
          <div className="relative w-40 h-40 mb-4">
             <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" className="opacity-10" />
                <circle cx="80" cy="80" r="72" stroke="#3b82f6" strokeWidth="12" fill="transparent" strokeDasharray="452" strokeDashoffset={452 * (1 - 0.75)} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black">75%</span>
                <span className="text-[10px] uppercase font-bold opacity-40">Eficiência</span>
              </div>
          </div>
          <p className="text-sm opacity-60">
            Você produziu <span className="font-bold">90 min</span> hoje.<br/>
            Continue assim!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* AI Insights Card */}
         <div className={`${themeContext} p-6 rounded-[32px] border shadow-sm col-span-1 lg:col-span-1 border-l-4 border-l-blue-500`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h2 className="text-lg font-bold">Insights IA</h2>
          </div>
          <p className="text-sm opacity-80 leading-relaxed italic">
            "{aiInsight}"
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
             <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">MindMap AI Engine</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className={`${themeContext} p-6 rounded-[32px] border shadow-sm col-span-1 lg:col-span-2`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Volume de Aprendizado</h2>
            <div className="flex gap-2">
               <span className="w-3 h-3 bg-blue-500 rounded-full shadow-sm shadow-blue-500/40"></span>
               <span className="text-[10px] opacity-40 font-bold uppercase">Minutos estudados</span>
            </div>
          </div>
          <div className="h-64 min-h-[256px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12, opacity: 0.5}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12, opacity: 0.5}} />
                <Tooltip 
                  cursor={{fill: 'currentColor', opacity: 0.05}} 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff'}}
                />
                <Bar dataKey="minutes" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40}>
                   {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#60a5fa' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
