import React from 'react';
import { Home, Bot, BookOpen, Search, Users, Settings, GraduationCap, FileText } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userType: 'admin' | 'user';
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, userType }) => {
  const userMenuItems = [
    // { id: 'dashboard', label: 'Dashboard', icon: Home },
    // { id: 'ai-agents', label: 'AI Agents', icon: Bot },
    // { id: 'prompt-library', label: 'Prompt Library', icon: BookOpen },
    // { id: 'discovery', label: 'Discovery', icon: Search },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: Home },
    { id: 'new-content', label: 'New Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const menuItems = userType === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${userType === 'admin' ? 'bg-purple-600' : 'bg-black'} rounded-full flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Sama</h1>
            <p className="text-sm text-gray-600">
              {userType === 'admin' ? 'Organization Admin' : 'Empower'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;