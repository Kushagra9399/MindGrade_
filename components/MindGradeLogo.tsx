import React, { useState } from 'react';

const MindGradeLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className={`relative cursor-pointer ${className}`} 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      <svg 
        viewBox="0 0 100 100" 
        className={`w-full h-full transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Outer Brain Shape */}
        <path 
          d="M50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 C85 30 70 15 50 15 Z" 
          fill="none" 
          stroke="url(#grad1)" 
          strokeWidth="3"
          className={hovered ? 'animate-pulse' : ''}
        />
        
        {/* Neural Nodes */}
        <circle cx="35" cy="40" r="4" fill="#4f46e5" className={`transition-all duration-300 ${hovered ? 'translate-y-[-2px]' : ''}`} />
        <circle cx="65" cy="40" r="4" fill="#9333ea" className={`transition-all duration-300 ${hovered ? 'translate-y-[-2px]' : ''}`} />
        <circle cx="50" cy="65" r="4" fill="#4f46e5" className={`transition-all duration-300 ${hovered ? 'translate-y-[2px]' : ''}`} />
        
        {/* Connections */}
        <line x1="35" y1="40" x2="65" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="35" y1="40" x2="50" y2="65" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="65" y1="40" x2="50" y2="65" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
        
        {/* Checkmark in center (symbolizing grade/check) */}
        <path 
          d="M40 50 L48 58 L60 42" 
          fill="none" 
          stroke={hovered ? "#ffffff" : "#4f46e5"} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />
        
        {/* Hover Sparkle */}
        {hovered && (
           <circle cx="75" cy="25" r="3" fill="#fbbf24" className="animate-ping" />
        )}
      </svg>
    </div>
  );
};

export default MindGradeLogo;