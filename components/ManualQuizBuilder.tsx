import React, { useState } from 'react';
import { Question, Option } from '../types';
import { Icons } from '../constants';

interface ManualQuizBuilderProps {
  onStartQuiz: (questions: Question[]) => void;
  onCancel: () => void;
}

const ManualQuizBuilder: React.FC<ManualQuizBuilderProps> = ({ onStartQuiz, onCancel }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentReason, setCurrentReason] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  
  const handleAddQuestion = () => {
    if (!currentText.trim() || !currentReason.trim() || options.some(o => !o.trim())) {
      alert("Please fill in all fields.");
      return;
    }

    const newOptions: Option[] = options.map((text, idx) => ({
      id: `opt-${Date.now()}-${idx}`,
      text: text.trim()
    }));

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: currentText.trim(),
      options: newOptions,
      correctOptionId: newOptions[correctIndex].id,
      correctReasoning: currentReason.trim()
    };

    setQuestions([...questions, newQuestion]);
    
    // Reset Form
    setCurrentText("");
    setCurrentReason("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleOptionChange = (idx: number, val: string) => {
    const newOpts = [...options];
    newOpts[idx] = val;
    setOptions(newOpts);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Teacher Mode: Question Editor</h2>
        <span className="text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          {questions.length} Question{questions.length !== 1 ? 's' : ''} Ready
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Form Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Question Text</label>
            <textarea
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              rows={2}
              placeholder="e.g. What is the derivative of x^2?"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((opt, idx) => (
              <div key={idx} className="relative">
                 <label className="block text-xs font-semibold text-slate-500 mb-1">
                   Option {String.fromCharCode(65 + idx)}
                   {correctIndex === idx && <span className="ml-2 text-green-600 font-bold">(Correct)</span>}
                 </label>
                 <div className="flex items-center">
                   <input
                     type="radio"
                     name="correctOption"
                     checked={correctIndex === idx}
                     onChange={() => setCorrectIndex(idx)}
                     className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mr-2 cursor-pointer"
                   />
                   <input
                     type="text"
                     value={opt}
                     onChange={(e) => handleOptionChange(idx, e.target.value)}
                     className={`w-full p-2 border rounded-lg outline-none transition-all ${correctIndex === idx ? 'border-green-300 bg-green-50' : 'border-slate-200 focus:border-indigo-400'}`}
                     placeholder={`Option ${idx + 1}`}
                   />
                 </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correct Reasoning Logic</label>
            <textarea
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              rows={3}
              placeholder="Explain why the answer is correct..."
              value={currentReason}
              onChange={(e) => setCurrentReason(e.target.value)}
            />
          </div>

          <button
            onClick={handleAddQuestion}
            className="w-full py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center justify-center"
          >
            <Icons.Plus className="w-4 h-4 mr-2" />
            Add Question to Quiz
          </button>
        </div>

        {/* Added Questions List */}
        {questions.length > 0 && (
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Questions Added</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-start">
                  <div>
                    <span className="font-bold text-xs text-slate-400 mr-2">#{idx + 1}</span>
                    <span className="text-sm font-medium text-slate-800 line-clamp-1">{q.text}</span>
                  </div>
                  <button onClick={() => handleRemoveQuestion(q.id)} className="text-red-400 hover:text-red-600">
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onStartQuiz(questions)}
            disabled={questions.length === 0}
            className={`flex-1 py-3 font-bold rounded-lg shadow-lg flex items-center justify-center transition-all ${
              questions.length === 0 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Launch Quiz <Icons.ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualQuizBuilder;