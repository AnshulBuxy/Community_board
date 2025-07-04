import React, { useState } from 'react';
import { Trophy, Calendar, Clock, Users, Play, Star, Award, Target, Zap, Code, Timer, Medal, Crown, TrendingUp, Eye, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';

const LearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contests');
  const [contestFilter, setContestFilter] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');

  // Mock data for contests and events (like coding platforms)
  const contests = [
    {
      id: '1',
      title: 'Weekly Coding Challenge #47',
      type: 'live',
      startTime: new Date(),
      endTime: new Date(Date.now() + 7200000), // 2 hours from now
      duration: '2 hours',
      participants: 1247,
      maxParticipants: 2000,
      difficulty: 'Medium',
      problems: 4,
      prize: '$500',
      organizer: 'Sama Platform',
      category: 'Algorithm',
      description: 'Test your algorithmic skills with dynamic programming and graph theory problems.',
      status: 'live',
      registered: true
    },
    {
      id: '2',
      title: 'React Component Design Contest',
      type: 'upcoming',
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      endTime: new Date(Date.now() + 172800000), // Day after tomorrow
      duration: '24 hours',
      participants: 456,
      maxParticipants: 1000,
      difficulty: 'Hard',
      problems: 3,
      prize: '$1000',
      organizer: 'Frontend Masters',
      category: 'Frontend',
      description: 'Build innovative React components with modern design patterns and accessibility.',
      status: 'upcoming',
      registered: false
    },
    {
      id: '3',
      title: 'Python Data Science Sprint',
      type: 'upcoming',
      startTime: new Date(Date.now() + 259200000), // 3 days from now
      endTime: new Date(Date.now() + 345600000), // 4 days from now
      duration: '3 hours',
      participants: 789,
      maxParticipants: 1500,
      difficulty: 'Medium',
      problems: 5,
      prize: '$750',
      organizer: 'DataCamp',
      category: 'Data Science',
      description: 'Solve real-world data analysis problems using pandas, numpy, and machine learning.',
      status: 'upcoming',
      registered: true
    },
    {
      id: '4',
      title: 'JavaScript Fundamentals Battle',
      type: 'past',
      startTime: new Date(Date.now() - 172800000), // 2 days ago
      endTime: new Date(Date.now() - 86400000), // 1 day ago
      duration: '1.5 hours',
      participants: 2156,
      maxParticipants: 2500,
      difficulty: 'Easy',
      problems: 6,
      prize: '$300',
      organizer: 'JS Academy',
      category: 'JavaScript',
      description: 'Master JavaScript basics through practical coding challenges.',
      status: 'past',
      registered: true,
      rank: 45,
      score: 850
    },
    {
      id: '5',
      title: 'Advanced TypeScript Challenge',
      type: 'past',
      startTime: new Date(Date.now() - 604800000), // 1 week ago
      endTime: new Date(Date.now() - 518400000), // 6 days ago
      duration: '4 hours',
      participants: 892,
      maxParticipants: 1000,
      difficulty: 'Hard',
      problems: 3,
      prize: '$1200',
      organizer: 'TypeScript Pro',
      category: 'TypeScript',
      description: 'Deep dive into advanced TypeScript features and complex type manipulations.',
      status: 'past',
      registered: true,
      rank: 12,
      score: 1450
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', score: 2450, contests: 15, avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 2, name: 'Sarah Kim', score: 2380, contests: 18, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 3, name: 'Mike Rodriguez', score: 2290, contests: 12, avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 4, name: 'Emily Watson', score: 2180, contests: 20, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 5, name: 'David Park', score: 2050, contests: 14, avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150' }
  ];

  const practiceProblems = [
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Array',
      solved: true,
      attempts: 3,
      successRate: 85,
      tags: ['Hash Table', 'Array']
    },
    {
      id: '2',
      title: 'Binary Tree Traversal',
      difficulty: 'Medium',
      category: 'Tree',
      solved: false,
      attempts: 0,
      successRate: 62,
      tags: ['Tree', 'DFS', 'BFS']
    },
    {
      id: '3',
      title: 'Dynamic Programming - Fibonacci',
      difficulty: 'Medium',
      category: 'DP',
      solved: true,
      attempts: 5,
      successRate: 71,
      tags: ['Dynamic Programming', 'Recursion']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'past': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const formatStartTime = (startTime: Date, type: string) => {
    if (type === 'live') return 'Live Now';
    
    const now = new Date();
    const diff = startTime.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days > 0) return `In ${days} days`;
    
    return startTime.toLocaleDateString();
  };

  const filteredContests = contests.filter(contest => {
    if (contestFilter === 'all') return true;
    return contest.type === contestFilter;
  });

  const renderContests = () => (
    <div className="space-y-6">
      {/* Contest Filter Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Contests & Competitions</h2>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['all', 'live', 'upcoming', 'past'].map(filter => (
            <button
              key={filter}
              onClick={() => setContestFilter(filter as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                contestFilter === filter
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Contest Cards */}
      <div className="space-y-4">
        {filteredContests.map(contest => (
          <div key={contest.id} className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-all duration-200 ${
            contest.type === 'live' ? 'border-red-200 bg-red-50' : 'border-gray-200'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{contest.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(contest.status)}`}>
                    {contest.type === 'live' && <PlayCircle className="h-4 w-4 inline mr-1" />}
                    {formatStartTime(contest.startTime, contest.type)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(contest.difficulty)}`}>
                    {contest.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{contest.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{contest.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{contest.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{contest.problems} problems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{contest.prize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{contest.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{contest.organizer}</span>
                  </div>
                </div>

                {/* Live Contest Timer */}
                {contest.type === 'live' && (
                  <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-red-800">
                      <Timer className="h-4 w-4" />
                      <span className="font-medium">{formatTimeRemaining(contest.endTime)}</span>
                    </div>
                  </div>
                )}

                {/* Past Contest Results */}
                {contest.type === 'past' && contest.rank && (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Medal className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">Rank: #{contest.rank}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Score: {contest.score}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="ml-6 flex flex-col gap-2">
                {contest.type === 'live' && (
                  <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Join Contest
                  </button>
                )}
                {contest.type === 'upcoming' && !contest.registered && (
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Register Now
                  </button>
                )}
                {contest.type === 'upcoming' && contest.registered && (
                  <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium cursor-default flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Registered
                  </button>
                )}
                {contest.type === 'past' && (
                  <button className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    View Results
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Global Leaderboard</h2>
      
      {/* Current User Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Ranking</h3>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-blue-100 text-sm">Current Rank</p>
                <p className="text-2xl font-bold">#127</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Total Score</p>
                <p className="text-2xl font-bold">1,850</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Contests</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
          <Crown className="h-16 w-16 text-yellow-300" />
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
        <div className="space-y-3">
          {leaderboard.map(user => (
            <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-lg ${
              user.rank <= 3 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                user.rank === 1 ? 'bg-yellow-500 text-white' :
                user.rank === 2 ? 'bg-gray-400 text-white' :
                user.rank === 3 ? 'bg-orange-500 text-white' :
                'bg-gray-200 text-gray-700'
              }`}>
                {user.rank}
              </div>
              
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.contests} contests</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-900">{user.score.toLocaleString()}</p>
                <p className="text-sm text-gray-600">points</p>
              </div>
              
              {user.rank <= 3 && (
                <Crown className={`h-5 w-5 ${
                  user.rank === 1 ? 'text-yellow-500' :
                  user.rank === 2 ? 'text-gray-400' :
                  'text-orange-500'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Practice Problems</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Array</option>
            <option>Tree</option>
            <option>Dynamic Programming</option>
            <option>Graph</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Problem Set</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {practiceProblems.map(problem => (
            <div key={problem.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    problem.solved ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {problem.solved ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">{problem.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-sm text-gray-600">{problem.category}</span>
                      <span className="text-sm text-gray-600">• {problem.successRate}% success rate</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm text-gray-600">
                    {problem.attempts > 0 && (
                      <p>{problem.attempts} attempts</p>
                    )}
                  </div>
                  
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    problem.solved 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    {problem.solved ? 'Solve Again' : 'Solve'}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {problem.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'contests', label: 'Contests', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    { id: 'practice', label: 'Practice', icon: Code }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Coding Arena</h1>
        <p className="text-gray-600">Compete, practice, and improve your coding skills through contests and challenges.</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex space-x-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'contests' && renderContests()}
      {activeTab === 'leaderboard' && renderLeaderboard()}
      {activeTab === 'practice' && renderPractice()}
    </div>
  );
};

export default LearningSection;