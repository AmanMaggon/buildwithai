import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { electionSteps } from '../data/electionSteps';
import { translations } from '../data/translations';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export const ChatAssistant: React.FC = () => {
  const { activeStep, language } = useAppContext();
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Enhanced Mock AI Response Logic with better intent detection
    setTimeout(() => {
      let aiText = '';
      const lowercaseInput = userMessage.text.toLowerCase();

      if (lowercaseInput.includes('10') || lowercaseInput.includes('kid') || lowercaseInput.includes('child')) {
        aiText = `Think of "${currentStepData.title}" like this: Imagine you and your friends are picking a team captain. ${currentStepData.shortDescription} It's just like that, but for the whole country!`;
      } else if (lowercaseInput.includes('simple') || lowercaseInput.includes('short') || lowercaseInput.includes('brief')) {
        aiText = `Simply put: ${currentStepData.shortDescription}`;
      } else if (lowercaseInput.includes('detail') || lowercaseInput.includes('more') || lowercaseInput.includes('explain')) {
        aiText = `Here's a detailed breakdown of ${currentStepData.title}: ${currentStepData.detailedExplanation}`;
      } else {
        aiText = `I see you're asking about ${currentStepData.title}. ${currentStepData.shortDescription} To learn more, you can ask me for details, or ask me to explain it simply!`;
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: aiText }]);
    }, 800);
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
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setInput(speechResult);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
          alert("Microphone access denied. Please grant microphone permissions to use voice input.");
        } else if (event.error === 'network') {
          alert("Network error occurred during speech recognition. Please check your connection.");
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-tr-sm shadow-primary/20'
                  : 'bg-secondary border border-border/50 text-foreground rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] font-medium text-foreground/40 mt-1.5 px-1">
              {msg.sender === 'user' ? t.you : t.ai}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-border bg-card/80 backdrop-blur-md">
        <div className="flex items-center gap-2 bg-secondary/80 rounded-2xl p-2 border border-border focus-within:border-primary/50 focus-within:bg-secondary transition-all shadow-inner">
          <button
            onClick={toggleListen}
            className={`p-2.5 rounded-xl transition-colors ${
              isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20' : 'text-foreground/50 hover:bg-card hover:text-foreground hover:shadow-sm'
            }`}
            title="Speech to Text"
          >
            <Mic size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.askSomething}
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 font-medium placeholder:text-foreground/40"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-primary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
