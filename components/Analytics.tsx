
import React, { useMemo } from 'react';
import { Subject, StudySession } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  subjects: Subject[];
  sessions: StudySession[];
  themeContext?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ subjects, sessions, themeContext }) => {
  const isDark = themeContext?.includes('bg-white/10');

  const pieData = useMemo(() => {
    return subjects.map(sub => {
      const total = sessions
        .filter(s => s.subjectId === sub.id && s.completed)
        .reduce((acc, s) => acc + s.actualMinutes, 0);
      return { name: sub.name, value: total, color: sub.color };
    }).filter(d => d.value > 0);
  }, [subjects, sessions]);

  const evolutionData = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      return d.toISOString().split('T')[0];
    });

    return days.map(day => {
      const daySessions = sessions.filter(s => s.date === day && s.completed);
      return {
        date: new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        minutes: daySessions.reduce((acc, s) => acc + s.actualMinutes, 0),
        focus: daySessions.length > 0 
          ? (daySessions.reduce((acc, s) => acc + s.focusScore, 0) / daySessions.length) * 100 
          : 0
      };
    });
  }, [sessions]);

  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-2xl font-bold">Análise de Desempenho</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${themeContext} p-8 rounded-[32px] border shadow-sm text-center`}>
          <span className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">Total Estudado</span>
          <p className="text-4xl font-black text-indigo-500 mt-2">
            {Math.floor(sessions.reduce((acc, s) => acc + s.actualMinutes, 0) / 60)}h {sessions.reduce((acc, s) => acc + s.actualMinutes, 0) % 60}m
          </p>
        </div>
        <div className={`${themeContext} p-8 rounded-[32px] border shadow-sm text-center`}>
          <span className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">Eficiência Média</span>
          <p className="text-4xl font-black text-emerald-500 mt-2">88%</p>
        </div>
        <div className={`${themeContext} p-8 rounded-[32px] border shadow-sm text-center`}>
          <span className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">Foco Médio</span>
          <p className="text-4xl font-black text-amber-500 mt-2">92%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolution Chart */}
        <div className={`${themeContext} p-8 rounded-[32px] border shadow-sm`}>
          <h3 className="text-lg font-bold mb-8">Evolução de Foco e Tempo</h3>
          <div className="h-[320px] min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-5" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 10, opacity: 0.5}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 10, opacity: 0.5}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff'}}
                />
                <Line type="monotone" dataKey="minutes" stroke="#6366f1" strokeWidth={4} dot={{r: 5, fill: '#6366f1', strokeWidth: 2, stroke: isDark ? '#1e293b' : '#fff'}} activeDot={{r: 8}} />
                <Line type="monotone" dataKey="focus" stroke="#f59e0b" strokeWidth={4} dot={{r: 5, fill: '#f59e0b', strokeWidth: 2, stroke: isDark ? '#1e293b' : '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-6 justify-center">
             <div className="flex items-center gap-2"><span className="w-4 h-1 bg-indigo-500 rounded-full"></span><span className="text-[10px] font-black opacity-50">MINUTOS</span></div>
             <div className="flex items-center gap-2"><span className="w-4 h-1 bg-amber-500 rounded-full"></span><span className="text-[10px] font-black opacity-50">FOCO %</span></div>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className={`${themeContext} p-8 rounded-[32px] border shadow-sm flex flex-col`}>
          <h3 className="text-lg font-bold mb-8">Distribuição por Matéria</h3>
          <div className="h-[320px] min-h-[320px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: d.color }}></div>
                <span className="text-[10px] font-black opacity-50 uppercase truncate tracking-wider">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
