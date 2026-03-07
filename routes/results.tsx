import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import ResultsView from '../components/ResultsView';
import { useQuizStore } from '../store/quizStore';
import { useEffect } from 'react';

export const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results',
  component: Results,
});

function Results() {
  const navigate = useNavigate();
  const { quizResult, questions, userResponses, markingScheme, resetQuiz } = useQuizStore();

  useEffect(() => {
    if (!quizResult) {
      navigate({ to: '/setup' });
    }
  }, [quizResult, navigate]);

  if (!quizResult) return null;

  const handleRestart = () => {
    resetQuiz();
    navigate({ to: '/setup' });
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
      <ResultsView 
        result={quizResult} 
        questions={questions} 
        userResponses={userResponses} 
        markingScheme={markingScheme}
        onRestart={handleRestart}
      />
    </div>
  );
}
