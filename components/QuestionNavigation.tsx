import React from 'react';
import { Icons } from '../constants';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  visitedIndices: number[];
  markedIndices: number[];
  userResponses: { [key: number]: boolean }; 
  onNavigate: (index: number) => void;
  onSubmit: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentQuestionIndex,
  visitedIndices,
  markedIndices,
  userResponses,
  onNavigate,
  onSubmit
}) => {
  const answeredCount = Object.values(userResponses).filter(Boolean).length;
  const markedCount = markedIndices.length;
  const notVisitedCount = totalQuestions - visitedIndices.length;

  return (
    <div className="bg-white h-full flex flex-col border-l border-slate-200 shadow-xl z-20">
      {/* Header */}
      <div className="p-4 bg-slate-100 border-b border-slate-200">
         <h3 className="font-bold text-slate-800 flex items-center">
            <Icons.BrainCircuit className="w-5 h-5 mr-2 text-indigo-600" />
            Question Palette
         </h3>
      </div>

      {/* Legend - Compact */}
      <div className="p-4 grid grid-cols-2 gap-2 text-[10px] md:text-xs text-slate-600 border-b border-slate-100 bg-white">
        <div className="flex items-center">
             <div className="w-3 h-3 bg-green-500 rounded-sm mr-1.5 shadow-sm"></div>
             <span>Answered ({answeredCount})</span>
        </div>
        <div className="flex items-center">
             <div className="w-3 h-3 bg-red-500 rounded-sm mr-1.5 shadow-sm"></div>
             <span>Not Answered</span>
        </div>
        <div className="flex items-center">
             <div className="w-3 h-3 bg-orange-400 rounded-full mr-1.5 shadow-sm"></div>
             <span>Review ({markedCount})</span>
        </div>
        <div className="flex items-center">
             <div className="w-3 h-3 bg-slate-200 rounded-sm mr-1.5 shadow-sm"></div>
             <span>Not Visited ({notVisitedCount})</span>
        </div>
      </div>
      
      {/* Grid */}
      <div className="flex-grow overflow-y-auto p-4 custom-scrollbar bg-slate-50">
        <div className="grid grid-cols-4 gap-3 content-start">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const isAnswered = userResponses[idx];
            const isVisited = visitedIndices.includes(idx);
            const isMarked = markedIndices.includes(idx);
            const isCurrent = currentQuestionIndex === idx;

            // CBT Style Coloring logic
            let bgClass = "bg-slate-200 text-slate-600 border-slate-300"; // Default Not Visited (Grey)
            
            if (isAnswered) {
                bgClass = "bg-green-500 text-white border-green-600 shadow-sm"; // Answered (Green)
            } else if (isVisited) {
                bgClass = "bg-red-500 text-white border-red-600 shadow-sm"; // Visited (Red)
            }

            // Mark overrides color shape in some systems, here we stick to color but add a ring
            if (isMarked) {
               // Usually marked is purple or orange. Let's use Orange circle style or overlay.
               // If answered and marked -> Green with orange ring? 
               // Let's prioritize Marked status visually for the "Marked" requirement
               if (!isAnswered) {
                  bgClass = "bg-orange-400 text-white border-orange-500 shadow-sm";
               }
            }

            const currentRing = isCurrent ? "ring-2 ring-indigo-600 ring-offset-2 z-10 scale-105" : "";
            const markedIndicator = isMarked && isAnswered ? (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-white"></div>
            ) : null;

            return (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`
                  relative h-10 w-full rounded-md font-bold text-sm border transition-all flex items-center justify-center
                  ${bgClass} ${currentRing} hover:opacity-90
                `}
              >
                {idx + 1}
                {markedIndicator}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-[-5px_0_15px_rgba(0,0,0,0.05)]">
        <button
          onClick={onSubmit}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default QuestionNavigation;