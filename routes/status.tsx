import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import LoadingSpinner from '../components/LoadingSpinner';

export const generatingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/generating',
  component: () => (
    <div className="w-full h-full flex items-center justify-center">
      <LoadingSpinner message="AI is crafting your exam paper..." />
    </div>
  ),
});

export const submittingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submitting',
  component: () => (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <LoadingSpinner message="Grading in progress..." />
    </div>
  ),
});

export const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/error',
  component: ErrorPage,
});

import { useQuizStore } from '../store/quizStore';
import { useNavigate } from '@tanstack/react-router';

function ErrorPage() {
  const { errorMsg, resetQuiz } = useQuizStore();
  const navigate = useNavigate();

  const handleRestart = () => {
    resetQuiz();
    navigate({ to: '/setup' });
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-red-600 mb-2">Error</h3>
          <p className="text-slate-600 mb-4">{errorMsg || "An unexpected error occurred."}</p>
          <button 
          onClick={handleRestart}
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 w-full font-bold"
          >
          Try Again
          </button>
      </div>
    </div>
  );
}
