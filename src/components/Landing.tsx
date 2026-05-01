import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';

type LandingProps = {
  onStart: () => void;
};

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-secondary to-background overflow-hidden relative">
      {/* Decorative background circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-center z-10"
      >
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-primary/40 mx-auto mb-8">
          E
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-foreground">
          {t.welcomeTo} <span className="text-primary">ElectraGuide</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/70 mb-12 leading-relaxed">
          {t.tagline}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={20} />
            {t.startLearning}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
        </motion.button>
      </motion.div>
    </div>
  );
};
