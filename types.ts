export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId?: string; 
  correctReasoning?: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptionId: string;
  reasoning: string;
}

export interface MarkingScheme {
  answerPoints: number;
  reasonPoints: number;
  negativeMarking: number; // Deducted if answer is wrong
}

export interface QuizConfig {
  topic: string;
  difficulty: string;
  classLevel: string;
  questionCount: number;
  timeLimit: number; // in minutes
  markingScheme: MarkingScheme;
}

export interface ExamPreset {
  id: string;
  name: string;
  description: string;
  topic: string;
  difficulty: string;
  questionCount: number;
  timeLimit: number;
  markingScheme: MarkingScheme;
}

export interface QuestionEvaluation {
  questionId: string;
  answerScore: number;
  reasonScore: number;
  totalScore: number;
  isAnswerCorrect: boolean;
  reasonFeedback: string;
  correctReasoning: string;
  correctOptionId: string;
}

export interface QuizResult {
  evaluations: QuestionEvaluation[];
  totalScore: number;
  maxScore: number;
  summary: string;
}

export enum AppState {
  HOME = 'HOME',
  WELCOME = 'WELCOME',
  GENERATING = 'GENERATING',
  QUIZ = 'QUIZ',
  SUBMITTING = 'SUBMITTING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}