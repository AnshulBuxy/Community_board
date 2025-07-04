import React from 'react';
import { User } from 'lucide-react';

interface NavigationHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'community', label: 'Community Feed' },
    { id: 'discover', label: 'Discover Users' },
    { id: 'connections', label: 'My Connections' },
    { id: 'requests', label: 'My Requests' },
    { id: 'opportunities', label: 'Opportunities Board' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 mb-6">
      <div className="flex items-center justify-between p-2">
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Profile Icon */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'profile'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <User className="h-5 w-5" />
          <span>My Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default NavigationHeader;