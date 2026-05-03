import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, Volume2, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { electionSteps } from '../data/electionSteps';
import { translations } from '../data/translations';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export const ChatAssistant: React.FC = () => {
  const { activeStep, setActiveStep, language } = useAppContext();
  const t = translations[language];
  const currentStepData = electionSteps[activeStep];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: t.aiChatIntro,
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      const lowercaseInput = userMessage.text.toLowerCase();
      const stepContext = `${t.step} ${activeStep + 1}: ${currentStepData.title}`;

      if (lowercaseInput.includes('10') || lowercaseInput.includes('kid') || lowercaseInput.includes('child')) {
        aiText = `Think of "${stepContext}" like this: Imagine you and your friends are picking a team captain. ${currentStepData.shortDescription} It's just like that, but for the whole country!`;
      } else if (lowercaseInput.includes('simple') || lowercaseInput.includes('short') || lowercaseInput.includes('brief') || lowercaseInput.includes('सरल')) {
        aiText = `Simply put (${stepContext}): ${currentStepData.shortDescription}`;
      } else if (lowercaseInput.includes('detail') || lowercaseInput.includes('more') || lowercaseInput.includes('explain') || lowercaseInput.includes('विस्तार')) {
        aiText = `Here's a detailed breakdown of ${stepContext}: ${currentStepData.detailedExplanation}`;
      } else {
        aiText = `I see you're asking about ${stepContext}. ${currentStepData.shortDescription}`;
      }

      // Add continuity hint
      if (activeStep < electionSteps.length - 1 && !lowercaseInput.includes('10')) {
        const nextStepTitle = electionSteps[activeStep + 1].title;
        aiText += language === 'en' 
          ? ` Up next is: ${nextStepTitle}.` 
          : ` अगला चरण है: ${nextStepTitle}.`;
      }

      // Add conversational follow-up randomly (approx 40% of the time)
      if (Math.random() > 0.6 && !lowercaseInput.includes('simple')) {
        aiText += ` ${Math.random() > 0.5 ? t.followUpSimple : t.followUpNext}`;
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: aiText }]);
      setIsTyping(false);
    }, 1200);
  };

  const toggleListen = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please try using Google Chrome.");
      return;
    }

    if (isListening) return;

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInput(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          alert("Microphone access denied. Please grant microphone permissions in your browser settings to use voice input.");
        } else if (event.error === 'network') {
          // Many browsers (Brave, Firefox) or privacy extensions block Google's speech servers.
          // Instead of throwing an intrusive alert, we just log it and reset the state.
          console.warn("Network error during speech recognition. This is often caused by privacy blockers or using a non-Chrome browser.");
        }
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition", err);
      setIsListening(false);
      alert("Failed to access the microphone. Please ensure your browser supports voice input and permissions are granted.");
    }
  };

  const toggleSpeech = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
    
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-full bg-card relative">
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center gap-3 bg-secondary/30 backdrop-blur-md sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
          <Sparkles size={18} />
        </div>
        <div>
          <h3 className="font-extrabold text-sm tracking-tight">ElectraGuide AI</h3>
          <p className="text-xs text-foreground/50 font-medium">{t.chatContext}: {currentStepData.title}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm relative group ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-sm shadow-primary/20'
                    : 'bg-secondary border border-border/50 text-foreground rounded-tl-sm'
                }`}
              >
                {msg.text}
                
                {/* TTS Button for AI messages */}
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => toggleSpeech(msg.id, msg.text)}
                    className="absolute -right-8 bottom-0 p-1.5 rounded-full text-foreground/40 hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                    title={speakingMsgId === msg.id ? t.stopListen : t.listen}
                  >
                    {speakingMsgId === msg.id ? <Square size={14} className="fill-current text-red-500" /> : <Volume2 size={14} />}
                  </button>
                )}
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-foreground/40 mt-1.5 px-1">
                {msg.sender === 'user' ? t.you : t.ai}
              </span>
            </motion.div>
          ))}
          
          {/* Thinking State */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-start"
            >
              <div className="max-w-[85%] p-4 rounded-2xl bg-secondary border border-border/50 text-foreground rounded-tl-sm shadow-sm flex items-center gap-1.5">
                <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-foreground/40 mt-1.5 px-1">
                {t.thinking}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card/80 backdrop-blur-md flex flex-col gap-3">
        {/* Quick Action Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button 
            onClick={() => handleSend(t.explainSimply)}
            disabled={isTyping}
            className="whitespace-nowrap px-3 py-1.5 bg-secondary hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground/80 hover:text-primary text-xs font-semibold rounded-full transition-colors disabled:opacity-50"
          >
            {t.explainSimply}
          </button>
          <button 
            onClick={() => handleSend(t.explainDetail)}
            disabled={isTyping}
            className="whitespace-nowrap px-3 py-1.5 bg-secondary hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground/80 hover:text-primary text-xs font-semibold rounded-full transition-colors disabled:opacity-50"
          >
            {t.explainDetail}
          </button>
          <button 
            onClick={() => handleSend(t.explainKid)}
            disabled={isTyping}
            className="whitespace-nowrap px-3 py-1.5 bg-secondary hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground/80 hover:text-primary text-xs font-semibold rounded-full transition-colors disabled:opacity-50"
          >
            {t.explainKid}
          </button>
          
          {/* Navigation Controls */}
          {activeStep > 0 && (
            <button 
              onClick={() => setActiveStep(activeStep - 1)}
              disabled={isTyping}
              className="whitespace-nowrap px-3 py-1.5 bg-secondary/50 hover:bg-border border border-border text-foreground/70 text-xs font-semibold rounded-full transition-colors disabled:opacity-50"
            >
              ⬅️ {t.previous}
            </button>
          )}
          {activeStep < electionSteps.length - 1 && (
            <button 
              onClick={() => setActiveStep(activeStep + 1)}
              disabled={isTyping}
              className="whitespace-nowrap px-3 py-1.5 bg-secondary/50 hover:bg-border border border-border text-foreground/70 text-xs font-semibold rounded-full transition-colors disabled:opacity-50"
            >
              {t.nextStep} ➡️
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 bg-secondary/80 rounded-2xl p-2 border border-border focus-within:border-primary/50 focus-within:bg-secondary transition-all shadow-inner relative">
          {isListening && (
            <div className="absolute -top-8 left-2 bg-card border border-border text-xs font-bold px-3 py-1.5 rounded-full shadow-lg text-primary animate-bounce">
              {t.listening}
            </div>
          )}
          <button
            onClick={toggleListen}
            disabled={isTyping}
            className={`p-2.5 rounded-xl transition-colors ${
              isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20' : 'text-foreground/50 hover:bg-card hover:text-foreground hover:shadow-sm disabled:opacity-50'
            }`}
            title={t.useVoice}
          >
            <Mic size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
            placeholder={t.askSomething}
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 font-medium placeholder:text-foreground/40 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-primary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
