
import React from 'react';
import { UserProfile, Achievement } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../constants';
import Logo from './Logo';

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
  themeContext?: string;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, themeContext }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className={`${themeContext} p-8 rounded-[40px] border shadow-sm flex flex-col md:flex-row items-center gap-8`}>
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[40px] flex items-center justify-center text-white text-5xl font-black relative overflow-hidden shadow-xl shadow-blue-900/20">
          {user.name[0]}
          {user.provider && (
            <div className="absolute bottom-0 right-0 p-2 bg-white rounded-tl-xl border-t border-l border-slate-100">
               <i className={`fa-brands fa-${user.provider === 'phone' ? 'whatsapp' : user.provider} text-xs ${user.provider === 'google' ? 'text-red-500' : 'text-blue-500'}`}></i>
            </div>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight">{user.name}</h1>
          <p className="opacity-60 mb-4">{user.goal}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 text-sm font-bold shadow-sm backdrop-blur-md">
              Level {user.level}
            </div>
            <div className="px-5 py-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400 text-sm font-bold shadow-sm backdrop-blur-md">
              {user.xp} XP
            </div>
            <button 
              onClick={onLogout}
              className="px-5 py-2.5 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-400 text-sm font-bold hover:bg-rose-500/20 transition-all shadow-sm active:scale-95"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${themeContext} p-8 rounded-[40px] border shadow-sm`}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-trophy text-amber-500"></i>
            Conquistas
          </h2>
          <div className="space-y-4">
            {INITIAL_ACHIEVEMENTS.map(achievement => (
              <div key={achievement.id} className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${achievement.unlocked ? 'bg-white/5 border-white/10' : 'bg-transparent border-dashed border-white/10 opacity-30'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${achievement.unlocked ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}>
                  <i className={`fa-solid ${achievement.icon}`}></i>
                </div>
                <div>
                  <h3 className="font-bold tracking-tight">{achievement.title}</h3>
                  <p className="text-xs opacity-50 font-medium">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white flex flex-col justify-between shadow-2xl shadow-black/20 border border-white/5 relative overflow-hidden">
          <Logo size={200} className="absolute -bottom-20 -right-20 opacity-5 rotate-12 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-6 opacity-90 flex items-center gap-2">
              <Logo size={20} />
              Sobre o MindMap
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              O MindMap é um ecossistema inteligente desenhado para organizar seus pensamentos e potencializar seu aprendizado através de IA adaptativa.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Desenvolvedor</p>
                  <p className="font-bold">Helton Victor De Carvalho Almeida</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Contato</p>
                  <p className="font-bold">926422028</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center text-[10px] opacity-20 uppercase font-black tracking-[0.3em]">
            Obrigado por usar MindMap! © 2024 • Angola
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
