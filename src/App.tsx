import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LearningFlow } from './components/LearningFlow';
import { Timeline } from './components/Timeline';
import { Quiz } from './components/Quiz';
import { ChatAssistant } from './components/ChatAssistant';
import { Landing } from './components/Landing';

function App() {
  const [activeView, setActiveView] = useState<'landing' | 'learning' | 'timeline' | 'quiz'>('landing');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans">
      {activeView !== 'landing' && (
        <Sidebar activeView={activeView as any} setActiveView={setActiveView as any} />
      )}
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {activeView === 'landing' && <Landing onStart={() => setActiveView('learning')} />}
          {activeView === 'learning' && <LearningFlow />}
          {activeView === 'timeline' && <Timeline />}
          {activeView === 'quiz' && <Quiz />}
        </div>
      </main>

      {/* Right panel: Chat Assistant */}
      {activeView !== 'landing' && (
        <div className="w-[320px] border-l border-border bg-card shrink-0 flex flex-col shadow-2xl shadow-black/5 z-20">
          <ChatAssistant />
        </div>
      )}
    </div>
  );
}

export default App;
