import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { electionSteps } from '../data/electionSteps';
import { translations } from '../data/translations';

export const Timeline: React.FC = () => {
  const { activeStep, setActiveStep, language } = useAppContext();
  const t = translations[language];

  return (
    <div className="flex-1 h-full p-8 md:p-12 overflow-y-auto relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 tracking-tight">
          {t.electionTimeline}
        </h2>

        <div className="relative border-l-2 border-border/80 ml-6 md:ml-8 space-y-10 pb-12">
          {electionSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative pl-10 md:pl-16 cursor-pointer group"
                onClick={() => setActiveStep(index)}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[21px] top-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-xl shadow-primary/40 scale-125'
                      : isPast
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary border border-border text-foreground/40 group-hover:border-primary/50'
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>

                {/* Content Card */}
                <div
                  className={`p-6 md:p-8 rounded-[1.5rem] transition-all duration-300 border ${
                    isActive
                      ? 'bg-card border-primary shadow-2xl shadow-primary/10'
                      : 'bg-transparent border-transparent hover:bg-secondary/50 hover:border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className={`text-xl md:text-2xl font-extrabold tracking-tight ${
                        isActive ? 'text-primary' : 'text-foreground/80 group-hover:text-foreground'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                      {t.step} {index + 1}
                    </span>
                  </div>
                  <p className="text-foreground/70 font-medium mb-4 text-lg">{step.shortDescription}</p>
                  
                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-foreground/80 leading-relaxed bg-secondary/80 p-5 md:p-6 rounded-2xl text-base font-medium shadow-inner mt-4 border border-border/50">
                      {step.detailedExplanation}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
