
import React from 'react';

interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
}

const POPULAR_AIS: AITool[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'A IA mais avançada do Google para conversação, codificação e criatividade.',
    url: 'https://gemini.google.com/',
    icon: 'fa-google',
    color: 'bg-blue-500'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'O modelo de linguagem versátil da OpenAI para chat e resolução de problemas.',
    url: 'https://chat.openai.com/',
    icon: 'fa-robot',
    color: 'bg-emerald-600'
  },
  {
    id: 'midjourney',
    name: 'MidJourney',
    description: 'IA líder para geração de imagens artísticas e realistas a partir de texto.',
    url: 'https://www.midjourney.com/',
    icon: 'fa-image',
    color: 'bg-slate-700'
  },
  {
    id: 'claude',
    name: 'Claude AI',
    description: 'IA focada em segurança e conversas longas e detalhadas da Anthropic.',
    url: 'https://claude.ai/',
    icon: 'fa-ghost',
    color: 'bg-orange-600'
  },
  {
    id: 'dalle',
    name: 'DALL·E 3',
    description: 'O sistema da OpenAI que cria imagens realistas a partir de descrições.',
    url: 'https://openai.com/dall-e-3',
    icon: 'fa-palette',
    color: 'bg-purple-600'
  }
];

interface AIPopularProps {
  themeContext?: string;
}

const AIPopular: React.FC<AIPopularProps> = ({ themeContext }) => {
  const isDark = themeContext?.includes('bg-white/10');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">IA Populares</h1>
        <p className="opacity-60 text-sm">Aumente sua produtividade com as melhores ferramentas de IA do mercado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {POPULAR_AIS.map((ai) => (
          <div 
            key={ai.id} 
            className={`${themeContext || 'bg-white'} p-6 rounded-[32px] border shadow-sm hover:border-indigo-500 transition-all flex flex-col justify-between group`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 ${ai.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                <i className={`fa-solid ${ai.icon}`}></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg tracking-tight">{ai.name}</h3>
                <p className="text-sm opacity-60 leading-relaxed mt-1">
                  {ai.description}
                </p>
              </div>
            </div>
            
            <a 
              href={ai.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-md shadow-indigo-200/20"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              Acessar IA
            </a>
          </div>
        ))}
      </div>

      <div className={`${themeContext || 'bg-white'} p-8 rounded-[40px] border shadow-sm text-center`}>
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4">
          <i className="fa-solid fa-lightbulb text-2xl"></i>
        </div>
        <h3 className="font-bold text-xl mb-2">Sugira uma IA</h3>
        <p className="text-sm opacity-60 max-w-md mx-auto">
          Conhece alguma ferramenta indispensável que não está na lista? Entre em contato e ajude a comunidade!
        </p>
      </div>
    </div>
  );
};

export default AIPopular;
