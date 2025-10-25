
import React from 'react';
import { type View } from '../types';

interface SideMenuProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const SideMenuIcon: React.FC<{ children: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ children, label, active = false, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center p-3 rounded-lg w-full transition-all duration-300 group ${active ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10'}`}>
    {children}
    <span className="text-xs mt-1 text-gray-400 group-hover:text-white transition-colors">{label}</span>
  </button>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform duration-300 group-hover:scale-110"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform duration-300 group-hover:scale-110"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M12 8v4l2 2"></path></svg>
);
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform duration-300 group-hover:scale-110"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.23l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.23l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const SideMenu: React.FC<SideMenuProps> = ({ currentView, onNavigate }) => {
  return (
    <aside className="w-20 bg-black/20 dark:bg-black/30 backdrop-blur-lg border-r border-white/10 p-2 opacity-0 fade-in">
      <div className="flex flex-col items-center space-y-4">
        <SideMenuIcon label="Home" active={currentView === 'HOME'} onClick={() => onNavigate('HOME')}>
          <HomeIcon />
        </SideMenuIcon>
        <SideMenuIcon label="History" active={currentView === 'HISTORY'} onClick={() => onNavigate('HISTORY')}>
          <HistoryIcon />
        </SideMenuIcon>
        <SideMenuIcon label="Settings" active={currentView === 'SETTINGS'} onClick={() => onNavigate('SETTINGS')}>
          <SettingsIcon />
        </SideMenuIcon>
      </div>
    </aside>
  );
};

export default SideMenu;
