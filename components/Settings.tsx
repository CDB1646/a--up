
import React from 'react';
import { type Theme } from '../types';

interface SettingsProps {
    theme: Theme;
    toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col space-y-6 opacity-0 fade-in fade-in-delay-2">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Settings</h2>
        <div className="w-full p-6 sm:p-8 bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Appearance</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode.</p>
                </div>
                <button 
                    onClick={toggleTheme} 
                    className="p-2 px-4 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center gap-2 text-sm font-medium"
                >
                    <span className="material-icons-outlined text-xl">
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                    <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Settings;
