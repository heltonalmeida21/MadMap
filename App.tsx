
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SubjectManager from './components/SubjectManager';
import StudySession from './components/StudySession';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import Login from './components/Login';
import Settings from './components/Settings';
import AIPopular from './components/AIPopular';
import { Subject, StudySession as IStudySession, UserProfile, Difficulty, AppSettings, AppLanguage, AppBackground } from './types';
import { COLORS } from './constants';
import { generateStudyPlan } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('mindmap_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('mindmap_settings');
    return saved ? JSON.parse(saved) : {
      language: AppLanguage.PORTUGUESE,
      background: AppBackground.LIGHT
    };
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('mindmap_subjects');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Matemática', difficulty: Difficulty.HARD, priority: 5, color: COLORS[0] },
      { id: '2', name: 'Física', difficulty: Difficulty.MEDIUM, priority: 4, color: COLORS[1] },
      { id: '3', name: 'Desenvolvimento de Software', difficulty: Difficulty.MEDIUM, priority: 3, color: COLORS[2] },
    ];
  });

  const [sessions, setSessions] = useState<IStudySession[]>(() => {
    const saved = localStorage.getItem('mindmap_sessions');
    if (saved) return JSON.parse(saved);
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    return [
      { id: 'h1', subjectId: '1', plannedMinutes: 60, actualMinutes: 55, date: yesterday, focusScore: 0.9, completed: true, notes: 'Progresso excelente' },
      { id: 'h2', subjectId: '2', plannedMinutes: 45, actualMinutes: 40, date: yesterday, focusScore: 0.85, completed: true, notes: 'Física desafiadora' },
      { id: 's1', subjectId: '1', plannedMinutes: 50, actualMinutes: 0, date: today, focusScore: 0, completed: false, notes: '' },
      { id: 's2', subjectId: '2', plannedMinutes: 40, actualMinutes: 0, date: today, focusScore: 0, completed: false, notes: '' },
      { id: 's3', subjectId: '3', plannedMinutes: 30, actualMinutes: 0, date: today, focusScore: 0, completed: false, notes: '' },
    ];
  });

  const [activeSession, setActiveSession] = useState<IStudySession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Persistence
  useEffect(() => {
    if (user) localStorage.setItem('mindmap_user', JSON.stringify(user));
    else localStorage.removeItem('mindmap_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mindmap_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('mindmap_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('mindmap_settings', JSON.stringify(settings));
  }, [settings]);

  const handleLogin = (provider: 'google' | 'facebook' | 'phone') => {
    setUser({
      id: 'mock-id',
      name: 'Helton Almeida',
      email: 'helton@example.com',
      goal: 'Exame de Engenharia',
      xp: 1240,
      level: 8,
      streak: 5,
      dailyMinutesGoal: 120,
      provider
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAiGenerate = async () => {
    if (!user) return;
    setIsGenerating(true);
    try {
      const plan = await generateStudyPlan(subjects, user.dailyMinutesGoal);
      const newSessions: IStudySession[] = plan.map(p => ({
        id: crypto.randomUUID(),
        subjectId: p.subjectId!,
        plannedMinutes: p.plannedMinutes!,
        actualMinutes: 0,
        date: p.date!,
        focusScore: 0,
        completed: false,
        notes: p.notes || ''
      }));
      setSessions(prev => [...prev.filter(s => s.completed), ...newSessions]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const addSubject = (sub: Subject) => setSubjects([...subjects, sub]);
  const deleteSubject = (id: string) => setSubjects(subjects.filter(s => s.id !== id));

  const startNextSession = () => {
    const next = sessions.find(s => !s.completed);
    if (next) setActiveSession(next);
  };

  const completeSession = (actualMinutes: number, focusScore: number, notes: string) => {
    if (!activeSession) return;
    setSessions(prev => prev.map(s => 
      s.id === activeSession.id 
        ? { ...s, actualMinutes, focusScore, notes, completed: true } 
        : s
    ));
    // XP Logic
    if (user) {
      const addedXp = Math.floor(actualMinutes / 5);
      setUser({ ...user, xp: user.xp + addedXp });
    }
    setActiveSession(null);
  };

  // Dynamic Background Styles
  const getBackgroundClass = () => {
    switch (settings.background) {
      case AppBackground.DARK: return 'bg-slate-900 text-slate-100';
      case AppBackground.BLUE: return 'bg-blue-900 text-blue-50';
      case AppBackground.GRADIENT: return 'bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 text-white';
      default: return 'bg-slate-50 text-slate-900';
    }
  };

  const getCardClass = () => {
    if (settings.background === AppBackground.LIGHT) return 'bg-white border-slate-200';
    return 'bg-white/10 backdrop-blur-lg border-white/10 text-white';
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className={`flex flex-col md:flex-row min-h-screen transition-all duration-500 ${getBackgroundClass()}`}>
        <Sidebar settings={settings} />
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                user={user} 
                subjects={subjects} 
                sessions={sessions} 
                onStartStudy={startNextSession}
                themeContext={getCardClass()}
              />
            } />
            <Route path="/subjects" element={
              <SubjectManager 
                subjects={subjects} 
                onAdd={addSubject} 
                onDelete={deleteSubject}
                themeContext={getCardClass()}
              />
            } />
            <Route path="/planner" element={
              <div className="max-w-4xl mx-auto space-y-6">
                 <div className="flex items-center justify-between">
                   <h1 className="text-2xl font-bold">Cronograma Inteligente</h1>
                   <button 
                     onClick={handleAiGenerate}
                     disabled={isGenerating}
                     className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                   >
                     <i className={`fa-solid ${isGenerating ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                     {isGenerating ? 'Otimizando...' : 'Gerar com IA'}
                   </button>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-4">
                   {sessions.filter(s => !s.completed).length === 0 && (
                     <div className={`${getCardClass()} p-16 rounded-[32px] border text-center`}>
                        <div className="w-20 h-20 bg-slate-500/10 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                          <i className="fa-solid fa-calendar-check text-4xl"></i>
                        </div>
                        <p className="opacity-70 font-medium">Seu cronograma está vazio. Use a IA para gerar novas sessões!</p>
                     </div>
                   )}
                   {sessions.filter(s => !s.completed).map(s => {
                     const sub = subjects.find(sub => sub.id === s.subjectId);
                     return (
                       <div key={s.id} className={`${getCardClass()} p-6 rounded-[32px] border flex items-center justify-between shadow-sm hover:border-blue-400/50 transition-all group`}>
                         <div className="flex items-center gap-6">
                           <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-slate-900/10" style={{ backgroundColor: sub?.color || '#ccc' }}>
                             <i className="fa-solid fa-book-open"></i>
                           </div>
                           <div>
                             <h3 className="font-black text-xl tracking-tight">{sub?.name}</h3>
                             <div className="flex items-center gap-4 text-xs opacity-60 font-bold mt-1 uppercase tracking-wider">
                               <span className="flex items-center gap-1.5"><i className="fa-solid fa-calendar"></i> {s.date}</span>
                               <span className="flex items-center gap-1.5"><i className="fa-solid fa-clock"></i> {s.plannedMinutes} min</span>
                             </div>
                           </div>
                         </div>
                         <button 
                           onClick={() => setActiveSession(s)}
                           className="w-12 h-12 rounded-full bg-white/10 text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-inner active:scale-90"
                         >
                           <i className="fa-solid fa-play ml-1"></i>
                         </button>
                       </div>
                     )
                   })}
                 </div>

                 {sessions.filter(s => s.completed).length > 0 && (
                   <div className="mt-12">
                     <h2 className="text-xs font-black opacity-40 uppercase tracking-[0.2em] mb-6">Sessões Concluídas</h2>
                     <div className="grid grid-cols-1 gap-4 opacity-70">
                       {sessions.filter(s => s.completed).slice(-5).map(s => {
                         const sub = subjects.find(sub => sub.id === s.subjectId);
                         return (
                           <div key={s.id} className={`${getCardClass()} p-5 rounded-2xl border flex items-center justify-between`}>
                             <div className="flex items-center gap-4">
                               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sub?.color }}></div>
                               <span className="font-bold tracking-tight">{sub?.name}</span>
                             </div>
                             <div className="flex items-center gap-4">
                               <span className="text-[10px] font-black opacity-50 uppercase">{s.actualMinutes} min estudados</span>
                               <i className="fa-solid fa-circle-check text-emerald-500 text-xl"></i>
                             </div>
                           </div>
                         )
                       })}
                     </div>
                   </div>
                 )}
              </div>
            } />
            <Route path="/analytics" element={
              <Analytics subjects={subjects} sessions={sessions} themeContext={getCardClass()} />
            } />
            <Route path="/profile" element={
              <Profile user={user} onLogout={handleLogout} themeContext={getCardClass()} />
            } />
            <Route path="/settings" element={
              <Settings settings={settings} onUpdateSettings={setSettings} />
            } />
            <Route path="/ai-popular" element={
              <AIPopular themeContext={getCardClass()} />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {activeSession && (
          <StudySession 
            subject={subjects.find(s => s.id === activeSession.subjectId)!}
            session={activeSession}
            onComplete={completeSession}
            onCancel={() => setActiveSession(null)}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
