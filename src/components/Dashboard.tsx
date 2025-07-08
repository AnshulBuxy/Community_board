import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CommunitySection from './CommunitySection';
import DashboardSection from './DashboardSection';
import LearningSection from './LearningSection';
import PlaceholderSection from './PlaceholderSection';
import MyProfile from './MyProfile';
import { User } from '../types';

const Dashboard: React.FC = () => {
  const [userType, setUserType] = useState<'admin' | 'user'>('user');
  const [activeSection, setActiveSection] = useState('community');

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

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens here
    window.location.href = '/login';
  };

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
        return <CommunitySection currentUser={currentUser} />;
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

export default Dashboard;