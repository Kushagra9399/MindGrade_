import React from 'react';
import { Question, UserResponse } from '../types';
import { Icons } from '../constants';
import MathRenderer from './MathRenderer';

interface QuizCardProps {
  question: Question;
  response?: UserResponse;
  onOptionSelect: (optionId: string) => void;
  onReasonChange: (reason: string) => void;
  questionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
  isMarked: boolean;
  onToggleMark: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  response,
  onOptionSelect,
  onReasonChange,
  questionIndex,
  totalQuestions,
  onNext,
  onPrev,
  isMarked,
  onToggleMark
}) => {
  const currentReason = response?.reasoning || "";
  const currentSelection = response?.selectedOptionId || "";

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Question Header Bar */}
      <div className="flex-none px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">Question {questionIndex + 1}</h2>
            <span className="text-slate-400 text-sm font-medium hidden sm:inline-block">/ {totalQuestions}</span>
        </div>
        <div className="flex items-center space-x-3">
             <button 
                onClick={onToggleMark}
                className={`flex items-center text-sm px-4 py-2 rounded-lg transition-colors font-semibold border
                   ${isMarked 
                     ? 'bg-orange-100 text-orange-700 border-orange-200' 
                     : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                   }`}
             >
                <Icons.AlertCircle className={`w-4 h-4 mr-2 ${isMarked ? 'fill-orange-700' : ''}`} />
                {isMarked ? "Marked for Review" : "Mark for Review"}
             </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto">
            {/* Question Text */}
            <div className="mb-8 p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-xl md:text-2xl font-medium text-slate-800 leading-loose">
                <MathRenderer text={question.text} />
            </div>
            </div>

            {/* Options Grid */}
            <div className="space-y-4 mb-10">
            {question.options.map((option) => (
                <button
                key={option.id}
                onClick={() => onOptionSelect(option.id)}
                className={`
                    w-full relative p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center group
                    ${currentSelection === option.id 
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }
                `}
                >
                <div className={`
                    w-8 h-8 rounded-full border-2 mr-5 flex items-center justify-center flex-shrink-0 transition-colors
                    ${currentSelection === option.id 
                    ? 'border-indigo-600 bg-indigo-600' 
                    : 'border-slate-300 group-hover:border-indigo-400'
                    }
                `}>
                    {currentSelection === option.id && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
                <span className={`text-lg md:text-xl font-medium leading-relaxed ${currentSelection === option.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                    <MathRenderer text={option.text} inline />
                </span>
                </button>
            ))}
            </div>

            {/* Reasoning Input */}
            <div className="mb-8">
            <label className="block text-lg font-bold text-slate-800 mb-2 flex items-center">
                <Icons.BrainCircuit className="w-6 h-6 mr-2 text-indigo-500" />
                Reasoning Logic
            </label>
            <p className="text-sm text-slate-500 mb-3">Explain the steps you took to arrive at your answer.</p>
            <textarea
                value={currentReason}
                onChange={(e) => onReasonChange(e.target.value)}
                placeholder="Type your reasoning here... (LaTeX $...$ supported)"
                className="w-full h-48 p-5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all resize-none text-slate-700 placeholder-slate-400 bg-white shadow-inner text-lg font-sans leading-relaxed"
            />
            </div>
        </div>
      </div>
      
       {/* Footer Navigation */}
       <div className="flex-none px-6 py-4 bg-white border-t border-slate-200 flex justify-between items-center z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
          <button 
            onClick={onPrev}
            disabled={questionIndex === 0}
            className={`flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide
              ${questionIndex === 0 
                ? 'text-slate-300 bg-slate-100 cursor-not-allowed' 
                : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400'
              }
            `}
          >
            <Icons.ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <button 
            onClick={onNext}
            className="flex items-center justify-center px-10 py-3 rounded-xl text-sm font-bold uppercase tracking-wide bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transition-all"
          >
            {questionIndex === totalQuestions - 1 ? 'Finish Section' : 'Save & Next'}
            {questionIndex !== totalQuestions - 1 && <Icons.ChevronRight className="w-4 h-4 ml-2" />}
          </button>
        </div>
    </div>
  );
};

export default QuizCard;