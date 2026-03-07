import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import QuizCard from '../components/QuizCard';
import QuestionNavigation from '../components/QuestionNavigation';
import { useQuizStore } from '../store/quizStore';
import { useEffect } from 'react';
import { evaluateQuiz } from '../services/apiService';

export const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz',
  component: Quiz,
});

function Quiz() {
  const navigate = useNavigate();
  const { 
    questions, 
    userResponses, 
    currentQuestionIndex, 
    setCurrentQuestionIndex,
    setUserResponses,
    visitedIndices,
    setVisitedIndices,
    markedIndices,
    setMarkedIndices,
    markingScheme,
    setQuizResult,
    setErrorMsg,
    showMobileNav,
    setShowMobileNav
  } = useQuizStore();

  useEffect(() => {
    if (questions.length === 0) {
      navigate({ to: '/setup' });
    }
  }, [questions, navigate]);

  if (questions.length === 0) return null;

  const handleOptionSelect = (optionId: string) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestionIndex].selectedOptionId = optionId;
    setUserResponses(updatedResponses);
  };

  const handleReasonChange = (reason: string) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestionIndex].reasoning = reason;
    setUserResponses(updatedResponses);
  };

  const markVisited = (idx: number) => {
    setVisitedIndices(prev => prev.includes(idx) ? prev : [...prev, idx]);
  };

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

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      markVisited(nextIdx);
    } else {
      submitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      markVisited(prevIdx);
    }
  };
  
  const handleNavigate = (index: number) => {
    setCurrentQuestionIndex(index);
    markVisited(index);
    setShowMobileNav(false);
  };

  const handleToggleMark = () => {
    setMarkedIndices(prev => {
        if (prev.includes(currentQuestionIndex)) {
            return prev.filter(i => i !== currentQuestionIndex);
        } else {
            return [...prev, currentQuestionIndex];
        }
    });
  };

  return (
    <>
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100">
        <QuizCard 
            question={questions[currentQuestionIndex]}
            response={userResponses[currentQuestionIndex]}
            onOptionSelect={handleOptionSelect}
            onReasonChange={handleReasonChange}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onNext={handleNext}
            onPrev={handlePrev}
            isMarked={markedIndices.includes(currentQuestionIndex)}
            onToggleMark={handleToggleMark}
        />
      </div>
      
      <div className={`
        fixed inset-y-0 right-0 w-80 transform transition-transform duration-300 ease-in-out z-40 lg:relative lg:transform-none lg:w-80 flex-none
        ${showMobileNav ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <QuestionNavigation 
            totalQuestions={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            visitedIndices={visitedIndices}
            markedIndices={markedIndices}
            userResponses={userResponses.reduce((acc, curr, idx) => ({ ...acc, [idx]: !!curr.selectedOptionId }), {})}
            onNavigate={handleNavigate}
            onSubmit={submitQuiz}
        />
      </div>
      
      {showMobileNav && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setShowMobileNav(false)}
        />
      )}
    </>
  );
}
