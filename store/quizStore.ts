import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, UserResponse, QuizResult, MarkingScheme } from '../types';

interface QuizState {
  questions: Question[];
  userResponses: UserResponse[];
  currentQuestionIndex: number;
  quizResult: QuizResult | null;
  markingScheme: MarkingScheme;
  timeLeft: number;
  visitedIndices: number[];
  markedIndices: number[];
  errorMsg: string;
  showMobileNav: boolean;

  // Actions
  setQuestions: (questions: Question[]) => void;
  setUserResponses: (responses: UserResponse[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setQuizResult: (result: QuizResult | null) => void;
  setMarkingScheme: (scheme: MarkingScheme) => void;
  setTimeLeft: (time: number | ((prev: number) => number)) => void;
  setVisitedIndices: (indices: number[] | ((prev: number[]) => number[])) => void;
  setMarkedIndices: (indices: number[] | ((prev: number[]) => number[])) => void;
  setErrorMsg: (msg: string) => void;
  setShowMobileNav: (show: boolean) => void;
  
  resetQuiz: () => void;
  initializeQuiz: (questions: Question[], timeLimitMinutes: number) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      questions: [],
      userResponses: [],
      currentQuestionIndex: 0,
      quizResult: null,
      markingScheme: { answerPoints: 4, reasonPoints: 4, negativeMarking: 1 },
      timeLeft: 0,
      visitedIndices: [0],
      markedIndices: [],
      errorMsg: "",
      showMobileNav: false,

      setQuestions: (questions) => set({ questions }),
      setUserResponses: (userResponses) => set({ userResponses }),
      setCurrentQuestionIndex: (currentQuestionIndex) => set({ currentQuestionIndex }),
      setQuizResult: (quizResult) => set({ quizResult }),
      setMarkingScheme: (markingScheme) => set({ markingScheme }),
      setTimeLeft: (time) => set((state) => ({ 
        timeLeft: typeof time === 'function' ? time(state.timeLeft) : time 
      })),
      setVisitedIndices: (indices) => set((state) => ({ 
        visitedIndices: typeof indices === 'function' ? indices(state.visitedIndices) : indices 
      })),
      setMarkedIndices: (indices) => set((state) => ({ 
        markedIndices: typeof indices === 'function' ? indices(state.markedIndices) : indices 
      })),
      setErrorMsg: (errorMsg) => set({ errorMsg }),
      setShowMobileNav: (showMobileNav) => set({ showMobileNav }),

      resetQuiz: () => set({
        questions: [],
        userResponses: [],
        currentQuestionIndex: 0,
        quizResult: null,
        timeLeft: 0,
        visitedIndices: [0],
        markedIndices: [],
        errorMsg: "",
        showMobileNav: false
      }),

      initializeQuiz: (qs, minutes) => set({
        questions: qs,
        userResponses: qs.map(q => ({
          questionId: q.id,
          selectedOptionId: "",
          reasoning: ""
        })),
        timeLeft: minutes * 60,
        visitedIndices: [0],
        markedIndices: [],
        currentQuestionIndex: 0,
        quizResult: null,
        errorMsg: "",
        showMobileNav: false
      })
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
