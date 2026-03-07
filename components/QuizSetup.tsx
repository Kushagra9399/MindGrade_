import React, { useState } from 'react';
import { TOPICS, DIFFICULTY_LEVELS, CLASS_LEVELS, Icons, PRESET_EXAMS } from '../constants';
import { MarkingScheme, Question, QuizConfig, ExamPreset } from '../types';
import MindGradeLogo from './MindGradeLogo';
import ManualQuizBuilder from './ManualQuizBuilder';

interface QuizSetupProps {
  onStartAI: (config: QuizConfig) => void;
  onStartManual: (questions: Question[], scheme: MarkingScheme, timeLimit: number) => void;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartAI, onStartManual }) => {
  const [mode, setMode] = useState<'ai' | 'teacher' | 'exams'>('ai');
  
  // Changed to Set for multi-selection
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set([TOPICS[0]]));
  const [customTopic, setCustomTopic] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY_LEVELS[1]); 
  const [selectedClass, setSelectedClass] = useState("10");
  
  // Quiz Configuration
  const [questionCount, setQuestionCount] = useState(5);
  const [timeLimit, setTimeLimit] = useState(10); // minutes
  const [answerPoints, setAnswerPoints] = useState(4);
  const [reasonPoints, setReasonPoints] = useState(4);
  const [negativeMarking, setNegativeMarking] = useState(1);

  const toggleTopic = (topic: string) => {
    if (isCustomMode) {
      setIsCustomMode(false);
      setSelectedTopics(new Set([topic]));
      return;
    }

    const newSet = new Set(selectedTopics);
    if (newSet.has(topic)) {
      if (newSet.size > 1) newSet.delete(topic); // Prevent empty selection
    } else {
      newSet.add(topic);
    }
    setSelectedTopics(newSet);
  };

  const handleCustomMode = () => {
    setIsCustomMode(true);
    setSelectedTopics(new Set());
    setCustomTopic("");
  };

  const handleStartAI = () => {
    let finalTopicString = "";
    
    if (isCustomMode) {
       finalTopicString = customTopic.trim();
       if (!finalTopicString) {
          alert("Please enter a custom topic.");
          return;
       }
    } else {
       finalTopicString = Array.from(selectedTopics).join(", ");
    }

    onStartAI({
      topic: finalTopicString,
      difficulty: selectedDifficulty,
      classLevel: selectedClass,
      questionCount,
      timeLimit,
      markingScheme: { answerPoints, reasonPoints, negativeMarking }
    });
  };

  const handleStartExam = (preset: ExamPreset) => {
    onStartAI({
        topic: preset.topic,
        difficulty: preset.difficulty,
        classLevel: "12", // Default for exams
        questionCount: preset.questionCount,
        timeLimit: preset.timeLimit,
        markingScheme: preset.markingScheme
    });
  };

  // Render Logic
  const renderContent = () => {
      if (mode === 'teacher') {
        return (
            <div className="max-w-2xl mx-auto w-full animate-fade-in-up">
                <ManualQuizBuilder 
                onStartQuiz={(qs) => onStartManual(qs, { answerPoints, reasonPoints, negativeMarking }, timeLimit)}
                onCancel={() => setMode('ai')}
                />
                <div className="mt-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                            <Icons.Settings className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Exam Configuration</span>
                        </div>
                        
                        {/* Row 1: Time & Count */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Duration (mins)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="180"
                                        value={timeLimit}
                                        onChange={(e) => setTimeLimit(Math.max(1, parseInt(e.target.value) || 0))}
                                        className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                    />
                                    <span className="absolute right-3 top-2 text-xs text-slate-400 font-medium">min</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Question Count</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="50"
                                        value={questionCount}
                                        onChange={(e) => setQuestionCount(Math.max(1, parseInt(e.target.value) || 0))}
                                        className="w-full pl-3 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Marking Scheme */}
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Marking Scheme</label>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="block text-xs text-slate-500 mb-1">Correct Answer</label>
                                    <input 
                                        type="number" 
                                        min="0" 
                                        max="100"
                                        value={answerPoints}
                                        onChange={(e) => setAnswerPoints(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-full p-2 border border-slate-200 rounded text-center font-bold text-green-600 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-slate-500 mb-1">Reasoning</label>
                                    <input 
                                        type="number" 
                                        min="0" 
                                        max="100"
                                        value={reasonPoints}
                                        onChange={(e) => setReasonPoints(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-full p-2 border border-slate-200 rounded text-center font-bold text-indigo-600 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-red-500 mb-1">Negative Mark</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-2 font-bold text-red-600">-</span>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="100"
                                            value={negativeMarking}
                                            onChange={(e) => setNegativeMarking(Math.max(0, parseInt(e.target.value) || 0))}
                                            className="w-full p-2 pl-4 border border-red-100 bg-red-50 rounded text-center font-bold text-red-600 focus:border-red-300 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button 
                            onClick={() => setMode('ai')}
                            className="text-sm font-medium text-slate-500 hover:text-indigo-600 underline"
                        >
                            Back to AI Generator
                        </button>
                    </div>
                </div>
            </div>
        );
      }

      if (mode === 'exams') {
        return (
            <div className="space-y-4 animate-fade-in-up">
                <div className="grid grid-cols-1 gap-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {PRESET_EXAMS.map(exam => (
                        <div key={exam.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icons.Award className="w-16 h-16 text-indigo-600" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-800">{exam.name}</h3>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200`}>
                                        {exam.difficulty}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 pr-12">{exam.description}</p>
                                
                                <div className="flex items-center gap-4 mb-4 text-xs font-medium text-slate-600">
                                    <div className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                        <Icons.Clock className="w-3 h-3 mr-1.5 text-slate-400" />
                                        {exam.timeLimit} mins
                                    </div>
                                    <div className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                        <Icons.FileText className="w-3 h-3 mr-1.5 text-slate-400" />
                                        {exam.questionCount} Qs
                                    </div>
                                    <div className="flex items-center bg-green-50 px-2 py-1 rounded border border-green-100 text-green-700">
                                        <span className="font-bold mr-1">+{exam.markingScheme.answerPoints}</span> / <span className="text-red-600 ml-1">-{exam.markingScheme.negativeMarking}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleStartExam(exam)}
                                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-indigo-100"
                                >
                                    Start {exam.name}
                                    <Icons.ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      }

      // Default AI Mode
      return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                    <Icons.Settings className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Exam Configuration</span>
                </div>
                
                {/* Row 1: Time & Count */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Duration (mins)</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                min="1" 
                                max="180"
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                            />
                            <span className="absolute right-3 top-2 text-xs text-slate-400 font-medium">min</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Question Count</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                min="1" 
                                max="50"
                                value={questionCount}
                                onChange={(e) => setQuestionCount(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-full pl-3 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 2: Marking Scheme */}
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Marking Scheme</label>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-xs text-slate-500 mb-1">Correct Answer</label>
                            <input 
                                type="number" 
                                min="0" 
                                max="100"
                                value={answerPoints}
                                onChange={(e) => setAnswerPoints(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full p-2 border border-slate-200 rounded text-center font-bold text-green-600 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-slate-500 mb-1">Reasoning</label>
                            <input 
                                type="number" 
                                min="0" 
                                max="100"
                                value={reasonPoints}
                                onChange={(e) => setReasonPoints(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full p-2 border border-slate-200 rounded text-center font-bold text-indigo-600 focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-red-500 mb-1">Negative Mark</label>
                            <div className="relative">
                                <span className="absolute left-2 top-2 font-bold text-red-600">-</span>
                                <input 
                                    type="number" 
                                    min="0" 
                                    max="100"
                                    value={negativeMarking}
                                    onChange={(e) => setNegativeMarking(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full p-2 pl-4 border border-red-100 bg-red-50 rounded text-center font-bold text-red-600 focus:border-red-300 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                   Select Topics (Multi-select enabled)
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    {TOPICS.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`p-3 rounded-lg text-xs font-bold border transition-all truncate text-left relative overflow-hidden
                        ${selectedTopics.has(topic) && !isCustomMode
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                        }
                        `}
                    >
                        {topic}
                        {selectedTopics.has(topic) && !isCustomMode && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                        )}
                    </button>
                    ))}
                    <button
                        onClick={handleCustomMode}
                        className={`p-3 rounded-lg text-xs font-bold border transition-all truncate text-left
                        ${isCustomMode
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                        }
                        `}
                    >
                        Custom Domain...
                    </button>
                </div>
                {isCustomMode && (
                    <div className="animate-fade-in-down mb-4">
                        <input 
                            type="text" 
                            placeholder="Enter subjects (e.g. Physics, History of Art, WW2)"
                            value={customTopic}
                            onChange={(e) => setCustomTopic(e.target.value)}
                            className="w-full p-3 border-2 border-indigo-100 rounded-lg focus:border-indigo-500 outline-none text-slate-700 font-medium"
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {/* Difficulty & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Difficulty</label>
                    <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                        {DIFFICULTY_LEVELS.map((level) => (
                        <button
                            key={level}
                            onClick={() => setSelectedDifficulty(level)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all
                            ${selectedDifficulty === level 
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                                : 'text-slate-500 hover:text-slate-700'
                            }
                            `}
                        >
                            {level}
                        </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Student Class</label>
                    <div className="relative">
                        <select 
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none"
                        >
                            {CLASS_LEVELS.map(c => (
                                <option key={c} value={c}>Grade {c}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-3 pointer-events-none">
                            <Icons.User className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleStartAI}
                className="w-full mt-4 bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 hover:translate-y-[-1px] transition-all flex items-center justify-center group"
            >
                Generate Mixed Test
                <Icons.ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 relative w-full">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4">
             <MindGradeLogo />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">MindGrade</h1>
        <p className="text-slate-500 mt-2 font-medium text-sm">AI-Powered Exam & Logic Evaluator</p>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8 border border-slate-200 relative">
        <button
            onClick={() => setMode('ai')}
            className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all z-10 ${mode === 'ai' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Custom AI
        </button>
        <button
            onClick={() => setMode('exams')}
             className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all z-10 ${mode === 'exams' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Comp. Exams
        </button>
        <button
            onClick={() => setMode('teacher')}
             className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all z-10 ${mode === 'teacher' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Teacher Mode
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default QuizSetup;