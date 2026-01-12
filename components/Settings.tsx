
import React from 'react';
import { AppSettings, AppLanguage, AppBackground } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings }) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateSettings({ ...settings, language: e.target.value as AppLanguage });
  };

  const handleBackgroundChange = (bg: AppBackground) => {
    onUpdateSettings({ ...settings, background: bg });
  };

  const themes = [
    { id: AppBackground.LIGHT, label: 'Claro', class: 'bg-white border-slate-200' },
    { id: AppBackground.DARK, label: 'Escuro', class: 'bg-slate-800 border-slate-700' },
    { id: AppBackground.BLUE, label: 'Azul', class: 'bg-indigo-600 border-indigo-500' },
    { id: AppBackground.GRADIENT, label: 'Gradiente', class: 'bg-gradient-to-br from-indigo-600 to-purple-600 border-transparent' },
  ];

  const languages = [
    { id: AppLanguage.PORTUGUESE, label: 'Português (BR)' },
    { id: AppLanguage.ENGLISH, label: 'English (US)' },
    { id: AppLanguage.SPANISH, label: 'Español (ES)' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language Selection */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <i className="fa-solid fa-language text-xl"></i>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Idioma</h2>
          </div>
          
          <select 
            value={settings.language}
            onChange={handleLanguageChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
          <p className="mt-4 text-sm text-slate-400">
            Selecione o idioma da interface do aplicativo.
          </p>
        </div>

        {/* Theme/Background Selection */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <i className="fa-solid fa-palette text-xl"></i>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Plano de Fundo</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => handleBackgroundChange(theme.id)}
                className={`relative group h-24 rounded-2xl border-2 transition-all overflow-hidden ${theme.class} ${
                  settings.background === theme.id ? 'ring-4 ring-indigo-500/30 border-indigo-500' : 'border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-bold text-sm ${
                    theme.id === AppBackground.LIGHT ? 'text-slate-800' : 'text-white'
                  }`}>
                    {theme.label}
                  </span>
                </div>
                {settings.background === theme.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-sm">
                    <i className="fa-solid fa-check text-[10px]"></i>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-8 rounded-[32px] border border-indigo-100">
        <h3 className="text-indigo-900 font-bold mb-2">Dica de Personalização</h3>
        <p className="text-indigo-700 text-sm">
          Escolher um plano de fundo mais escuro (Dark ou Blue) pode ajudar a reduzir o cansaço visual durante sessões de estudo noturnas.
        </p>
      </div>
    </div>
  );
};

export default Settings;
