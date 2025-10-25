
import React from 'react';

const History: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-6 opacity-0 fade-in fade-in-delay-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Enhancement History</h2>
        <div className="w-full p-8 bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-lg text-gray-500 dark:text-gray-400">Your past enhancements will appear here.</p>
            <p className="text-sm text-gray-600 dark:text-gray-500 mt-2">Currently, history is not saved across sessions.</p>
        </div>
    </div>
  );
};

export default History;
