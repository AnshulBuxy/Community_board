import React from 'react';

// Icons specific to the Dashboard component
const PlayCircleIcon = () => (
  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197 2.132A1 1 0 0110 13.82V10.18a1 1 0 011.555-.832l3.197 2.132a1 1 0 010 1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const ChevronRightIcon = () => (
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
);

// Placeholder icons for the "Explore Sama's Four Pillars" section (assuming they're also used elsewhere in App.js nav)
// In a true multi-file setup, you'd import these from a common Icons.js or redefine them here if exclusive.
const AIAgentsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.007-.456a1 1 0 11-.662-1.822l.46-1.503L15.346 8.35a2 2 0 00-1.488-.868l-2.052-.338c-.147-.024-.297-.035-.45-.035C8.901 7.45 6 10.352 6 14c0 3.647 2.901 6.55 6.55 6.55c.153 0 .303-.011.45-.035l2.052-.338a2 2 0 001.488-.868l.46-1.503a1 1 0 11.662-1.822l2.007-.456a2 2 0 001.022-.547zM10 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"></path></svg>
);
const PromptLibraryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
);
const DiscoveryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);
const CommunityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m10-2h4v2h-4m-7-2h-4v2h4m3.5-3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM12 6H9m3 0a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2V6z"></path></svg>
);

function Dashboard() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome to Sama Empower Engine</h2>
        <p className="text-lg opacity-90 mb-4">Transform your laptop into a personalized tool for learning, earning, and growth. Start your journey today!</p>
        <button className="bg-white text-blue-700 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-100 transition duration-300 ease-in-out flex items-center">
          <PlayCircleIcon /> Start Discovery Quiz
        </button>
      </div>

      {/* Your Progress Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Your Progress</h3>
          <span className="text-blue-600 text-sm font-medium cursor-pointer">Complete Profile</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Profile: 65% complete</span>
          <span>Next: Add your skills</span>
        </div>
      </div>

      {/* Explore Sama's Four Pillars Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Explore Sama's Four Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar Card 1: Purpose-Driven Agents */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-start">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
              <AIAgentsIcon /> {/* Reusing the AI Agents icon for illustration */}
            </div>
            <h4 className="font-bold text-lg mb-1">Purpose-Driven Agents</h4>
            <p className="text-sm text-gray-600 mb-4">Build custom AI tools for your goals and projects</p>
            <a href="#" className="text-blue-600 text-sm font-medium flex items-center hover:underline">
              Explore <ChevronRightIcon />
            </a>
          </div>

          {/* Pillar Card 2: Prompt Library */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-start">
            <div className="p-3 bg-green-100 text-green-600 rounded-full mb-3">
              <PromptLibraryIcon />
            </div>
            <h4 className="font-bold text-lg mb-1">Prompt Library</h4>
            <p className="text-sm text-gray-600 mb-4">Access curated AI prompts for learning and work</p>
            <a href="#" className="text-green-600 text-sm font-medium flex items-center hover:underline">
              Explore <ChevronRightIcon />
            </a>
          </div>

          {/* Pillar Card 3: Discovery Engine */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-start">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full mb-3">
              <DiscoveryIcon />
            </div>
            <h4 className="font-bold text-lg mb-1">Discovery Engine</h4>
            <p className="text-sm text-gray-600 mb-4">Find pathways aligned with your skills and goals</p>
            <a href="#" className="text-yellow-600 text-sm font-medium flex items-center hover:underline">
              Explore <ChevronRightIcon />
            </a>
          </div>

          {/* Pillar Card 4: Peer Network */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-start">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-3">
              <CommunityIcon />
            </div>
            <h4 className="font-bold text-lg mb-1">Peer Network</h4>
            <p className="text-sm text-gray-600 mb-4">Connect with mentors and peers in your community</p>
            <a href="#" className="text-purple-600 text-sm font-medium flex items-center hover:underline">
              Explore <ChevronRightIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recommendation Card 1: Create Your First AI Agent */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-start">
            <div className="text-xl mb-2">✨</div>
            <h4 className="font-bold text-lg mb-1">Create Your First AI Agent</h4>
            <p className="text-sm text-gray-600 mb-3">Learn how to build a custom AI Assistant for your specific needs.</p>
            <div className="text-xs text-gray-500 mb-4">
              <span>Tutorial • 10 min</span>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Recommendation Card 2: Freelancing Opportunities */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-start">
            <div className="text-xl mb-2">💡</div>
            <h4 className="font-bold text-lg mb-1">Freelancing Opportunities</h4>
            <p className="text-sm text-gray-600 mb-3">Discover how to earn income through online freelance platforms.</p>
            <div className="text-xs text-gray-500 mb-4">
              <span>Guide • 15 min</span>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Recommendation Card 3: Digital Marketing Basics */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-start">
            <div className="text-xl mb-2">📚</div>
            <h4 className="font-bold text-lg mb-1">Digital Marketing Basics</h4>
            <p className="text-sm text-gray-600 mb-3">Learn fundamental skills to market products and services online.</p>
            <div className="text-xs text-gray-500 mb-4">
              <span>Course • 3 hrs</span>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
