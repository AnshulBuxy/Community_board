import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Search, 
  Users, 
  GraduationCap,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, className = '' }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
    { icon: Bot, label: 'AI Agents', key: 'agents' },
    { icon: Search, label: 'Discovery', key: 'discovery' },
    { icon: Users, label: 'Community', key: 'community' },
    { icon: GraduationCap, label: 'Learning', key: 'learning' },
  ];

  return (
    <div className={`w-72 bg-gray-900 text-white h-screen flex flex-col ${className}`}>
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-gray-900 font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Sama</h1>
            <p className="text-gray-400 text-sm">Empower</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;
          return (
            <button
              key={index}
              onClick={() => onSectionChange(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">U</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">User Profile</p>
            <p className="text-xs text-gray-400">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
