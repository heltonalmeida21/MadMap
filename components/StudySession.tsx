
import React, { useState, useEffect, useRef } from 'react';
import { Subject, StudySession as IStudySession } from '../types';

interface StudySessionProps {
  subject: Subject;
  session: IStudySession;
  onComplete: (actualMinutes: number, focusScore: number, notes: string) => void;
  onCancel: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ subject, session, onComplete, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(session.plannedMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [notes, setNotes] = useState('');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    const actualMinutes = Math.floor((session.plannedMinutes * 60 - timeLeft) / 60);
    const focusScore = 0.95; // Simulated
    onComplete(actualMinutes, focusScore, notes);
  };

  const progress = ((session.plannedMinutes * 60 - timeLeft) / (session.plannedMinutes * 60)) * 100;

  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col p-6 text-white md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: subject.color }}></div>
            <h2 className="text-xl font-bold tracking-tight">{subject.name} Session</h2>
          </div>
          <button 
            onClick={onCancel}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center gap-12">
          {/* Timer Display */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
             <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="283%" strokeDashoffset={`${283 - (2.83 * progress)}%`} className="text-indigo-500 transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl md:text-8xl font-black font-mono">{formatTime(timeLeft)}</span>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-400 mt-2">Time Remaining</span>
              </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all shadow-xl ${isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
              >
                <i className={`fa-solid ${isActive ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button 
                onClick={handleFinish}
                className="px-8 h-20 rounded-full bg-white text-slate-900 font-bold text-xl hover:bg-slate-100 transition-all shadow-xl active:scale-95"
              >
                Finish Early
              </button>
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-center">
              Stay focused! Put your phone away and minimize distractions.
            </p>
          </div>
        </main>

        <footer className="mt-12">
          <label className="block text-sm font-bold text-slate-400 uppercase mb-3">Quick Session Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-32 resize-none"
            placeholder="Key concepts, difficult parts, or what to review next..."
          />
        </footer>
      </div>
    </div>
  );
};

export default StudySession;
