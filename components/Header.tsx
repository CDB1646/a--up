
import React from 'react';
import { type Theme, type View } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  onNavigate: (view: View) => void;
}

const AiIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
        <path d="M15 9V5C15 4.44772 14.5523 4 14 4H5C4.44772 4 4 4.44772 4 5V14C4 14.5523 4.44772 15 5 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12L15 15L18 12L21 15" stroke="url(#paint0_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 15V20H13" stroke="url(#paint1_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="12" y1="12" x2="21" y2="15" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA"/>
                <stop offset="1" stopColor="#A78BFA"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_2" x1="13" y1="15" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA"/>
                <stop offset="1" stopColor="#C084FC"/>
            </linearGradient>
        </defs>
    </svg>
)


const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onNavigate }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-white/10 opacity-0 fade-in fade-in-delay-1">
      <div className="flex items-center gap-3">
        <AiIcon />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white tracking-wider">
          AI Logo Enhancer
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
          <span className="material-icons-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
          <span className="material-icons-outlined">help_outline</span>
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
          <span className="material-icons-outlined">info_outline</span>
        </button>
         <button onClick={() => onNavigate('SETTINGS')} className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
          <span className="material-icons-outlined">settings</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
