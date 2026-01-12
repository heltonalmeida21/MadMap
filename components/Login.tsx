
import React from 'react';
import Logo from './Logo';

interface LoginProps {
  onLogin: (provider: 'google' | 'facebook' | 'phone') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-blue-100 p-10 text-center border border-slate-100">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-blue-200">
          <Logo size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">MindMap</h1>
        <p className="text-slate-500 mb-2 font-medium">Organize sua mente, maximize seu aprendizado.</p>
        <p className="text-slate-400 text-sm mb-10 italic">Sua jornada rumo à excelência começa aqui.</p>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin('google')}
            className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
          >
            <i className="fa-brands fa-google text-red-500"></i>
            Entrar com Google
          </button>
          <button 
            onClick={() => onLogin('facebook')}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#1877F2] text-white rounded-2xl font-bold hover:bg-[#166fe5] transition-all active:scale-95 shadow-lg shadow-[#1877F2]/20"
          >
            <i className="fa-brands fa-facebook-f"></i>
            Entrar com Facebook
          </button>
          <button 
            onClick={() => onLogin('phone')}
            className="w-full flex items-center justify-center gap-3 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all active:scale-95"
          >
            <i className="fa-solid fa-phone"></i>
            Entrar com Telefone
          </button>
        </div>

        <p className="mt-10 text-xs text-slate-400 leading-relaxed px-4">
          Ao entrar, você concorda com nossos <span className="underline">Termos de Uso</span> e <span className="underline">Privacidade</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
