
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 opacity-0 fade-in">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400 animate-pulse">
                <path d="M15 9V5C15 4.44772 14.5523 4 14 4H5C4.44772 4 4 4.44772 4 5V14C4 14.5523 4.44772 15 5 15H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12L15 15L18 12L21 15" stroke="url(#loader_paint0)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 15V20H13" stroke="url(#loader_paint1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                    <linearGradient id="loader_paint0" x1="12" y1="12" x2="21" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60A5FA"/>
                        <stop offset="1" stopColor="#A78BFA"/>
                    </linearGradient>
                    <linearGradient id="loader_paint1" x1="13" y1="15" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A78BFA"/>
                        <stop offset="1" stopColor="#C084FC"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
      </div>
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">Enhancing your image...</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">Our AI is working its magic. Please wait.</p>
    </div>
  );
};

export default Loader;
