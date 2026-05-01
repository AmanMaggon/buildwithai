import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';

const questions = [
  {
    id: 1,
    question: 'Who announces the election dates in India?',
    options: ['The Prime Minister', 'The Election Commission of India', 'The President', 'The Supreme Court'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'What happens 48 hours before the polling day?',
    options: ['Results are declared', 'Campaigning stops', 'Nominations open', 'Voting begins'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Which machine is used alongside EVM for transparency?',
    options: ['VVPAT', 'CCTV', 'ATM', 'Scanner'],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: 'What is required along with nomination papers?',
    options: ['A degree certificate', 'An affidavit of assets and background', '10,000 votes', 'A party membership card'],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: 'Who declares the elected winner of a constituency?',
    options: ['The Returning Officer', 'The Chief Minister', 'The Media', 'The Police'],
    correctAnswer: 0,
  }
];

export const Quiz: React.FC = () => {
  const { language, setQuizScore } = useAppContext();
  const t = translations[language];
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      setQuizScore(score);
    }
  };

  const currentQ = questions[currentQIndex];

  if (isFinished) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <Trophy size={400} className="text-yellow-500 blur-3xl" />
        </div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-card p-12 md:p-16 rounded-[2.5rem] border border-border text-center max-w-lg w-full shadow-2xl shadow-primary/10 relative z-10"
        >
          <div className="w-28 h-28 bg-yellow-500/10 text-yellow-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner shadow-yellow-500/20">
            <Trophy size={56} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{t.quizCompleted}</h2>
          <p className="text-xl text-foreground/70 mb-10 font-medium">
            {t.youScored} <span className="text-primary font-bold text-2xl">{score}</span> {t.outOf} {questions.length}
          </p>
          
          <button
            onClick={() => {
              setCurrentQIndex(0);
              setScore(0);
              setIsFinished(false);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className="w-full bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
          >
            {t.retakeQuiz}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {t.knowledgeCheck}
          </h2>
          <span className="text-primary font-bold bg-primary/10 px-5 py-2 rounded-full text-sm tracking-wide">
            {currentQIndex + 1} / {questions.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border/80 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/5"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-10 tracking-tight leading-tight">
              {currentQ.question}
            </h3>

            <div className="space-y-4">
              {currentQ.options.map((opt, idx) => {
                const isCorrect = idx === currentQ.correctAnswer;
                const isSelected = idx === selectedOption;
                
                let btnClass = "border-border/80 hover:border-primary/50 bg-secondary/30 text-foreground";
                
                if (isAnswered) {
                  if (isCorrect) {
                    btnClass = "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 shadow-sm shadow-green-500/20";
                  } else if (isSelected) {
                    btnClass = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
                  } else {
                    btnClass = "border-border/50 bg-secondary/20 opacity-40";
                  }
                } else if (isSelected) {
                  btnClass = "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-left font-semibold text-lg ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={24} className="text-green-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={24} className="text-red-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 flex justify-end"
              >
                <button
                  onClick={handleNext}
                  className="group flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1"
                >
                  {currentQIndex === questions.length - 1 ? t.finish : t.nextQuestion}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
