import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Clock, HelpCircle, Sun, Moon, Languages } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { translations } from '../data/translations';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SidebarProps = {
  activeView: 'learning' | 'timeline' | 'quiz';
  setActiveView: (view: 'learning' | 'timeline' | 'quiz') => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { theme, toggleTheme, language, setLanguage } = useAppContext();
  const t = translations[language];

  const navItems = [
    { id: 'learning', label: t.learningMode, icon: BookOpen },
    { id: 'timeline', label: t.timeline, icon: Clock },
    { id: 'quiz', label: t.quizScore, icon: HelpCircle },
  ] as const;

  return (
    <div className="w-[280px] h-screen bg-card text-card-foreground border-r border-border p-6 flex flex-col justify-between shrink-0 shadow-lg shadow-black/5 z-10">
      <div>
        <div className="flex items-center gap-3 mb-6 pl-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            E
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">ElectraGuide</h1>
        </div>

        {/* Language Mode Indicator */}
        <div className="mb-8 pl-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/80 border border-border text-xs font-semibold text-foreground/70">
            {language === 'en' ? t.englishModeOn : t.hindiModeOn}
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-semibold text-sm",
                activeView === item.id 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "hover:bg-secondary text-foreground/70 hover:text-foreground"
              )}
            >
              <item.icon size={20} className={activeView === item.id ? "text-white" : "text-foreground/50"} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-secondary transition-colors text-foreground/70 font-semibold text-sm"
        >
          {theme === 'light' ? <Moon size={20} className="text-foreground/50" /> : <Sun size={20} className="text-foreground/50" />}
          {theme === 'light' ? t.darkMode : t.lightMode}
        </button>
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-secondary transition-colors text-foreground/70 font-semibold text-sm"
        >
          <Languages size={20} className="text-foreground/50" />
          {t.switchToHindi}
        </button>
      </div>
    </div>
  );
};
