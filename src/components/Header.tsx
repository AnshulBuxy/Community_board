import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Globe, User, ChevronDown, Eye, Bookmark, Award, Activity, Settings } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userType: 'admin' | 'user';
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange, userType, onLogout }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' }
  ];

  const profileMenuItems = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: Settings }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileMenuClick = (section: string) => {
    if (section === 'logout') {
      onLogout();
      return;
    }
    onSectionChange('profile');
    setShowProfileDropdown(false);
    localStorage.setItem('profileSection', section);
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setShowLanguageDropdown(false);
    // Here you would typically implement language switching logic
    console.log('Language changed to:', languageCode);
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Dashboard';
      case 'ai-agents': return 'AI Agents';
      case 'prompt-library': return 'Prompt Library';
      case 'discovery': return 'Discovery';
      case 'community': return 'Community';
      case 'learning': return 'Learning Hub';
      case 'settings': return 'Settings';
      default: return 'Sama';
    }
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left Section - Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{getSectionTitle()}</h1>
            {userType === 'admin' && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search across Sama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">{selectedLang?.nativeName}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2 max-h-80 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Select Language</p>
                  <p className="text-xs text-gray-500">Choose your preferred language</p>
                </div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                      selectedLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-sm text-gray-500">{language.name}</div>
                    </div>
                    {selectedLanguage === language.code && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onMouseEnter={() => setShowProfileDropdown(true)}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={`relative flex items-center gap-2 p-1 rounded-full transition-all duration-200 group ${
                activeSection === 'profile'
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
              }`}
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-all duration-200 ${
                showProfileDropdown ? 'rotate-180 opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </button>

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
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">You</p>
                        {userType === 'admin' && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">@you • {userType}</p>
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
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                          item.id === 'logout' 
                            ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${
                          item.id === 'logout' ? 'text-red-500' : 'text-gray-500'
                        }`} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* View Full Profile Button - Only show if not logout */}
                {userType !== 'admin' && (
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <button
                      onClick={() => {
                        onSectionChange('profile');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 mx-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">View Full Profile</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;