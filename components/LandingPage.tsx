import React from 'react';
import MindGradeLogo from './MindGradeLogo';
import { Icons } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 custom-scrollbar">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-4 animate-fade-in-down">
            <MindGradeLogo />
          </div>
          <div className="mb-8 animate-fade-in-down" style={{ animationDelay: '0.05s' }}>
             <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tighter">
                MindGrade
             </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Master Any Subject with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI-Powered Precision</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            MindGrade isn't just a quiz app. Our AI evaluates your <strong>logic, reasoning steps, and answers</strong> to provide professor-level feedback instantly.
          </p>
          <button 
            onClick={onGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Start Practicing Now
            <Icons.ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why MindGrade?</h2>
          <p className="text-slate-500 text-lg">The smartest way to prepare for Competitive Exams and build Concept Clarity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
              <Icons.BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">AI Logic Evaluation</h3>
            <p className="text-slate-600 leading-relaxed">
              We don't just check option A, B, C, or D. We analyze your written reasoning to ensure you understand the <em>concept</em>, not just the result.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
              <Icons.Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Competitive Exam Presets</h3>
            <p className="text-slate-600 leading-relaxed">
              One-click access to simulated exams for JEE Mains, CAT, IPMAT, and more. Featuring strict time limits and negative marking rules.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
              <Icons.Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Custom & Teacher Modes</h3>
            <p className="text-slate-600 leading-relaxed">
              Generate infinite questions on any specific topic, or use Teacher Mode to manually craft papers for your students.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} MindGrade AI. All rights reserved.
      </div>
    </div>
  );
};

export default LandingPage;