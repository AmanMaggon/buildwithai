import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type AppContextType = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  quizScore: number;
  setQuizScore: (score: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [quizScore, setQuizScore] = useState(0);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeStep,
        setActiveStep,
        language,
        setLanguage,
        theme,
        toggleTheme,
        quizScore,
        setQuizScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
