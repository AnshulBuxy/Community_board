import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Eye, Bookmark, Award, Activity, Settings } from 'lucide-react';

interface NavigationHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ activeTab, onTabChange }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'community', label: 'Community Feed' },
    { id: 'discover', label: 'Discover Users' },
    { id: 'connections', label: 'My Connections' },
    { id: 'requests', label: 'My Requests' },
    { id: 'opportunities', label: 'Opportunities Board' }
  ];

  const profileMenuItems = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileMenuClick = (section: string) => {
    onTabChange('profile');
    setShowProfileDropdown(false);
    // Store the selected section for the profile component
    localStorage.setItem('profileSection', section);
  };

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
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onMouseEnter={() => setShowProfileDropdown(true)}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`relative flex items-center gap-2 p-1 rounded-full transition-all duration-200 group ${
              activeTab === 'profile'
                ? 'ring-2 ring-blue-500 ring-offset-2'
                : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
            }`}
          >
            {/* Circular Avatar */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {/* Online Status Indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            {/* Dropdown Arrow - only visible on hover */}
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-all duration-200 ${
              showProfileDropdown ? 'rotate-180 opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} />
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <div 
              className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              {/* Profile Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">You</p>
                    <p className="text-sm text-gray-500">@you</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {profileMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleProfileMenuClick(item.id)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 text-gray-700 hover:text-gray-900"
                    >
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* View Full Profile Button */}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <button
                  onClick={() => {
                    onTabChange('profile');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 mx-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">View Full Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationHeader;