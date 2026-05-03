import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { electionSteps } from '../data/electionSteps';
import { translations } from '../data/translations';

export const LearningFlow: React.FC = () => {
  const { activeStep, setActiveStep, language } = useAppContext();
  const t = translations[language];
  
  const step = electionSteps[activeStep];
  const Icon = step.icon;

  const nextStep = () => {
    if (activeStep < electionSteps.length - 1) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <div className="flex-1 h-full flex flex-col p-8 md:p-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mx-auto mb-12 relative z-10">
        <div className="flex justify-between mb-3">
          <span className="text-sm font-bold text-primary tracking-wide uppercase">
            {t.step} {activeStep + 1} {t.of} {electionSteps.length}
          </span>
        </div>
        <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((activeStep + 1) / electionSteps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-4xl mx-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-card shadow-2xl shadow-primary/5 border border-border/80 rounded-[2rem] p-10 md:p-16 w-full flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner shadow-primary/10">
              <Icon size={48} strokeWidth={1.5} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground">
              {step.title}
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/70 font-medium mb-10 max-w-2xl leading-relaxed">
              {step.shortDescription}
            </p>
            
            <div className="bg-secondary/50 p-8 md:p-10 rounded-3xl max-w-3xl text-left border border-border/50 shadow-inner">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
                {step.detailedExplanation}
              </p>
            </div>
            
            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest mt-8 opacity-70 animate-pulse">
              {t.swipeHint}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto mt-12 relative z-10">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary text-foreground/70 hover:text-foreground"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t.previous}
        </button>

        <button
          onClick={nextStep}
          disabled={activeStep === electionSteps.length - 1}
          className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 hover:shadow-primary/50"
        >
          {t.nextStep}
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
