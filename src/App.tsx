import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CommunitySection from './components/CommunitySection';
import DashboardSection from './components/DashboardSection';
import LearningSection from './components/LearningSection';
import PlaceholderSection from './components/PlaceholderSection';
import MyProfile from './components/MyProfile';
import { User } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'user'>('user');
  const [activeSection, setActiveSection] = useState('dashboard');

  const currentUser: User = {
    id: 'current-user',
    name: 'You',
    username: 'you',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'student',
    isOnline: true,
    skills: ['react', 'javascript'],
    rating: 4.0,
    availability: 'available'
  };

  const handleLogin = (type: 'admin' | 'user') => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('user');
    setActiveSection('dashboard');
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'community':
        return <CommunitySection currentUser={currentUser} />;
      case 'learning':
        return <LearningSection />;
      case 'profile':
        return <MyProfile currentUser={currentUser} />;
      case 'ai-agents':
      case 'prompt-library':
      case 'discovery':
      case 'settings':
        return <PlaceholderSection section={activeSection} />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        userType={userType}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          userType={userType}
          onLogout={handleLogout}
        />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default App;