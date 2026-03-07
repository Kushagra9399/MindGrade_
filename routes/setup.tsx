import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import QuizSetup from '../components/QuizSetup';
import { useQuizStore } from '../store/quizStore';
import { generateQuiz } from '../services/apiService';
import { Question, MarkingScheme } from '../types';

export const setupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/setup',
  component: Setup,
});

function Setup() {
  const navigate = useNavigate();
  const { setMarkingScheme, initializeQuiz, setErrorMsg } = useQuizStore();

  const handleStartAI = async (config: any) => {
    setMarkingScheme(config.markingScheme);
    navigate({ to: '/generating' });
    setErrorMsg("");
    try {
      const generatedQuestions = await generateQuiz(config.topic, config.difficulty, config.questionCount, config.classLevel);
      initializeQuiz(generatedQuestions, config.timeLimit);
      navigate({ to: '/quiz' });
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate quiz. Please check your API Key or try again.");
      navigate({ to: '/error' });
    }
  };

  const handleStartManual = (manualQuestions: Question[], scheme: MarkingScheme, limit: number) => {
    setMarkingScheme(scheme);
    initializeQuiz(manualQuestions, limit);
    navigate({ to: '/quiz' });
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex items-start justify-center bg-slate-50/50 pt-8 md:pt-12">
      <QuizSetup onStartAI={handleStartAI} onStartManual={handleStartManual} />
    </div>
  );
}
