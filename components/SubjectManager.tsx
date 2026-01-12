
import React, { useState } from 'react';
import { Subject, Difficulty } from '../types';
import { COLORS } from '../constants';

interface SubjectManagerProps {
  subjects: Subject[];
  onAdd: (subject: Subject) => void;
  onDelete: (id: string) => void;
  themeContext?: string;
}

const SubjectManager: React.FC<SubjectManagerProps> = ({ subjects, onAdd, onDelete, themeContext }) => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [priority, setPriority] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name,
      difficulty,
      priority,
      color: COLORS[subjects.length % COLORS.length]
    };
    onAdd(newSubject);
    setName('');
  };

  const isDark = themeContext?.includes('bg-white/10');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className={`${themeContext || 'bg-white'} p-8 rounded-[32px] shadow-sm border`}>
        <h2 className="text-xl font-bold mb-6">Nova Matéria</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Nome da Matéria</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-5 py-3 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
              placeholder="Ex: Cálculo, Marketing, Anatomia..."
            />
          </div>
          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Dificuldade</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className={`w-full px-5 py-3 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none ${
                isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value={Difficulty.EASY}>Fácil</option>
              <option value={Difficulty.MEDIUM}>Média</option>
              <option value={Difficulty.HARD}>Difícil</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id} className={`${themeContext || 'bg-white'} p-6 rounded-[32px] border shadow-sm relative overflow-hidden group hover:border-indigo-500/50 transition-all`}>
            <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: sub.color }}></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg tracking-tight">{sub.name}</h3>
              <button 
                onClick={() => onDelete(sub.id)}
                className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <div className="flex gap-2">
              <span className={`text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-wider ${
                isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'
              }`}>
                {Difficulty[sub.difficulty]}
              </span>
              <span className={`text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-wider ${
                isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
              }`}>
                Prioridade: {sub.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectManager;
