import React from 'react';
import { ExamPreset } from './types';

// Simple SVG Icons as components
export const Icons = {
  CheckCircle: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })),
  XCircle: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), React.createElement("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), React.createElement("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  })),
  AlertCircle: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })),
  ChevronRight: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })),
  ChevronLeft: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  })),
  Save: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("path", {
    d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
  }), React.createElement("polyline", {
    points: "17 21 17 13 7 13 7 21"
  }), React.createElement("polyline", {
    points: "7 3 7 8 15 8"
  })),
  RefreshCw: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("path", {
    d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
  }), React.createElement("path", {
    d: "M21 3v5h-5"
  }), React.createElement("path", {
    d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
  }), React.createElement("path", {
    d: "M3 21v-5h5"
  })),
  Trash: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("polyline", { points: "3 6 5 6 21 6" }), React.createElement("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })),
  Plus: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" })),
  Settings: ({ className }: { className?: string }) => React.createElement("svg", {
     xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("circle", { cx: "12", cy: "12", r: "3" }), React.createElement("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })),
  BrainCircuit: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("path", { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }), React.createElement("path", { d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" }), React.createElement("path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" }), React.createElement("path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375" }), React.createElement("path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }), React.createElement("path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }), React.createElement("path", { d: "M19.938 10.5a4 4 0 0 1 .585.396" }), React.createElement("path", { d: "M6 18a4 4 0 0 1-1.938-1.5" }), React.createElement("path", { d: "M19.938 16.5A4 4 0 0 1 18 18" })),
  Award: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("circle", { cx: "12", cy: "8", r: "7" }), React.createElement("polyline", { points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88" })),
  Clock: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("circle", { cx: "12", cy: "12", r: "10" }), React.createElement("polyline", { points: "12 6 12 12 16 14" })),
  FileText: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }), React.createElement("polyline", { points: "14 2 14 8 20 8" })),
  User: ({ className }: { className?: string }) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, React.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), React.createElement("circle", { cx: "12", cy: "7", r: "4" })),
};

export const TOPICS = [
  "Logical Reasoning",
  "Quantitative Aptitude",
  "Algebra",
  "Geometry",
  "Calculus",
  "Trigonometry",
  "Probability",
  "Statistics"
];

export const DIFFICULTY_LEVELS = [
  "Easy",
  "Medium",
  "Hard"
];

export const CLASS_LEVELS = [
  "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

export const PRESET_EXAMS: ExamPreset[] = [
  {
    id: 'jee-mains',
    name: 'JEE Mains',
    description: 'Joint Entrance Examination. High-difficulty questions covering Physics, Chemistry, and Math.',
    topic: 'JEE Mains Mathematics & Physics',
    difficulty: 'Hard',
    questionCount: 25,
    timeLimit: 60,
    markingScheme: { answerPoints: 4, reasonPoints: 0, negativeMarking: 1 }
  },
  {
    id: 'cat',
    name: 'CAT (Quant)',
    description: 'Common Admission Test. Focus on advanced quantitative ability and logical reasoning.',
    topic: 'CAT Quantitative Aptitude',
    difficulty: 'Hard',
    questionCount: 20,
    timeLimit: 40,
    markingScheme: { answerPoints: 3, reasonPoints: 0, negativeMarking: 1 }
  },
  {
    id: 'ipmat',
    name: 'IPMAT Indore',
    description: 'Management Aptitude Test. Mix of short answers and MCQ focusing on higher math.',
    topic: 'IPMAT Quantitative Ability',
    difficulty: 'Medium',
    questionCount: 15,
    timeLimit: 40,
    markingScheme: { answerPoints: 4, reasonPoints: 0, negativeMarking: 1 }
  },
  {
    id: 'sat',
    name: 'SAT Math',
    description: 'Standardized test widely used for college admissions. Algebra and Problem Solving.',
    topic: 'SAT Mathematics',
    difficulty: 'Medium',
    questionCount: 20,
    timeLimit: 30,
    markingScheme: { answerPoints: 1, reasonPoints: 0, negativeMarking: 0 }
  }
];