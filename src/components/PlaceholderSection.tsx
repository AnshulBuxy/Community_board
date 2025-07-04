import React from 'react';
import { Bot, BookOpen, Search, Settings } from 'lucide-react';

interface PlaceholderSectionProps {
  section: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ section }) => {
  const getIcon = () => {
    switch (section) {
      case 'ai-agents':
        return Bot;
      case 'prompt-library':
        return BookOpen;
      case 'discovery':
        return Search;
      case 'settings':
        return Settings;
      default:
        return BookOpen;
    }
  };

  const getTitle = () => {
    switch (section) {
      case 'ai-agents':
        return 'AI Agents';
      case 'prompt-library':
        return 'Prompt Library';
      case 'discovery':
        return 'Discovery';
      case 'settings':
        return 'Settings';
      default:
        return 'Coming Soon';
    }
  };

  const getDescription = () => {
    switch (section) {
      case 'ai-agents':
        return 'Manage and interact with AI agents to enhance your learning experience.';
      case 'prompt-library':
        return 'Access a curated collection of prompts for various learning scenarios.';
      case 'discovery':
        return 'Discover new learning opportunities, courses, and resources.';
      case 'settings':
        return 'Customize your preferences and manage your account settings.';
      default:
        return 'This section is under development.';
    }
  };

  const Icon = getIcon();

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{getTitle()}</h1>
        <p className="text-gray-600 mb-8">{getDescription()}</p>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-500 text-sm">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderSection;