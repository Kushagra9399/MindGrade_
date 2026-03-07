import { createRootRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { useQuizStore } from '../store/quizStore';
import MindGradeLogo from '../components/MindGradeLogo';
import { useEffect } from 'react';
import { evaluateQuiz } from '../services/apiService';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    timeLeft, 
    setTimeLeft, 
    questions, 
    userResponses, 
    markingScheme, 
    setQuizResult, 
    setErrorMsg,
    resetQuiz,
    showMobileNav,
    setShowMobileNav
  } = useQuizStore();
  
  // Timer Effect
  useEffect(() => {
    let timer: number;
    if (location.pathname === '/quiz' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz(); // Auto submit
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [location.pathname, timeLeft]);

  const submitQuiz = async () => {
    navigate({ to: '/submitting' });
    try {
      const result = await evaluateQuiz(questions, userResponses, markingScheme);
      setQuizResult(result);
      navigate({ to: '/results' });
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to evaluate quiz. Please try again.");
      navigate({ to: '/error' });
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate({ to: '/' });
  };

  const isHome = location.pathname === '/';

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {!isHome && (
        <header className="bg-white border-b border-slate-200 flex-none z-30 shadow-sm relative">
          <div className="w-full px-4 h-16 flex items-center justify-between">
            <div 
              className="font-bold text-xl text-slate-900 tracking-tight flex items-center group cursor-pointer" 
              onClick={handleGoHome}
            >
              <div className="w-8 h-8 mr-2">
                <MindGradeLogo />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">MindGrade</span>
            </div>
            
            {location.pathname === '/quiz' && (
              <div className="flex items-center gap-4">
                <div className={`flex items-center font-mono font-bold text-lg px-3 py-1.5 rounded-lg border-2 shadow-sm transition-all ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-white text-slate-700 border-slate-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {formatTime(timeLeft)}
                </div>
                
                <button 
                  onClick={() => setShowMobileNav(!showMobileNav)}
                  className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
              </div>
            )}
          </div>
        </header>
      )}

      <main className="flex-grow flex overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}
