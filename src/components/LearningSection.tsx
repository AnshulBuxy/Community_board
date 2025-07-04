import React, { useState } from 'react';
import { BookOpen, Trophy, Gamepad2, Play, Clock, Users, Star, Award, Calendar, Timer, CheckCircle, PlayCircle, Eye } from 'lucide-react';

const LearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [quizFilter, setQuizFilter] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');

  // Mock data for quizzes with event organization
  const quizzes = [
    {
      id: '1',
      title: 'React Fundamentals Quiz',
      type: 'live',
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000), // 1 hour from now
      duration: '30 minutes',
      participants: 234,
      maxParticipants: 500,
      difficulty: 'Medium',
      questions: 20,
      category: 'React',
      description: 'Test your knowledge of React hooks, components, and state management.',
      status: 'live',
      registered: true
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Challenge',
      type: 'upcoming',
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      endTime: new Date(Date.now() + 90000000), // Tomorrow + 1 hour
      duration: '45 minutes',
      participants: 156,
      maxParticipants: 300,
      difficulty: 'Hard',
      questions: 25,
      category: 'JavaScript',
      description: 'Advanced JavaScript concepts including async/await, destructuring, and modules.',
      status: 'upcoming',
      registered: false
    },
    {
      id: '3',
      title: 'Python Basics Quiz',
      type: 'upcoming',
      startTime: new Date(Date.now() + 172800000), // 2 days from now
      endTime: new Date(Date.now() + 176400000), // 2 days + 1 hour
      duration: '25 minutes',
      participants: 89,
      maxParticipants: 200,
      difficulty: 'Easy',
      questions: 15,
      category: 'Python',
      description: 'Fundamental Python concepts for beginners.',
      status: 'upcoming',
      registered: true
    },
    {
      id: '4',
      title: 'CSS Grid & Flexbox Mastery',
      type: 'past',
      startTime: new Date(Date.now() - 172800000), // 2 days ago
      endTime: new Date(Date.now() - 169200000), // 2 days ago + 1 hour
      duration: '40 minutes',
      participants: 445,
      maxParticipants: 500,
      difficulty: 'Medium',
      questions: 18,
      category: 'CSS',
      description: 'Master modern CSS layout techniques.',
      status: 'past',
      registered: true,
      score: 85,
      rank: 23
    },
    {
      id: '5',
      title: 'Node.js Backend Quiz',
      type: 'past',
      startTime: new Date(Date.now() - 604800000), // 1 week ago
      endTime: new Date(Date.now() - 601200000), // 1 week ago + 1 hour
      duration: '35 minutes',
      participants: 312,
      maxParticipants: 400,
      difficulty: 'Hard',
      questions: 22,
      category: 'Node.js',
      description: 'Server-side JavaScript with Express and databases.',
      status: 'past',
      registered: true,
      score: 92,
      rank: 8
    }
  ];

  // Mock data for games
  const games = [
    {
      id: '1',
      title: 'Code Typing Race',
      description: 'Improve your typing speed with code snippets',
      difficulty: 'Easy',
      players: 1247,
      rating: 4.8,
      category: 'Typing',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Algorithm Puzzle',
      description: 'Solve algorithmic challenges step by step',
      difficulty: 'Medium',
      players: 892,
      rating: 4.6,
      category: 'Logic',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Debug Detective',
      description: 'Find and fix bugs in code snippets',
      difficulty: 'Hard',
      players: 634,
      rating: 4.7,
      category: 'Debugging',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  // Mock data for learning resources
  const resources = [
    {
      id: '1',
      title: 'Complete React Course',
      type: 'Course',
      duration: '12 hours',
      level: 'Beginner',
      rating: 4.9,
      students: 15420,
      instructor: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals',
      type: 'Tutorial',
      duration: '8 hours',
      level: 'Beginner',
      rating: 4.7,
      students: 23150,
      instructor: 'Mike Chen',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Advanced Python Programming',
      type: 'Course',
      duration: '20 hours',
      level: 'Advanced',
      rating: 4.8,
      students: 8930,
      instructor: 'Dr. Emily Watson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
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

  const filteredQuizzes = quizzes.filter(quiz => {
    if (quizFilter === 'all') return true;
    return quiz.type === quizFilter;
  });

  const renderQuizzes = () => (
    <div className="space-y-6">
      {/* Quiz Filter Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Interactive Quizzes</h2>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['all', 'live', 'upcoming', 'past'].map(filter => (
            <button
              key={filter}
              onClick={() => setQuizFilter(filter as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                quizFilter === filter
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQuizzes.map(quiz => (
          <div key={quiz.id} className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-all duration-200 ${
            quiz.type === 'live' ? 'border-red-200 bg-red-50' : 'border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{quiz.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(quiz.status)}`}>
                    {quiz.type === 'live' && <PlayCircle className="h-3 w-3 inline mr-1" />}
                    {formatStartTime(quiz.startTime, quiz.type)}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{quiz.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{quiz.questions} questions</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {quiz.category}
                  </span>
                </div>

                {/* Live Quiz Timer */}
                {quiz.type === 'live' && (
                  <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-red-800">
                      <Timer className="h-4 w-4" />
                      <span className="font-medium text-sm">{formatTimeRemaining(quiz.endTime)}</span>
                    </div>
                  </div>
                )}

                {/* Past Quiz Results */}
                {quiz.type === 'past' && quiz.score && (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">Rank: #{quiz.rank}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Score: {quiz.score}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {quiz.type === 'live' && (
                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Join Quiz
                </button>
              )}
              {quiz.type === 'upcoming' && !quiz.registered && (
                <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Register
                </button>
              )}
              {quiz.type === 'upcoming' && quiz.registered && (
                <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium cursor-default flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Registered
                </button>
              )}
              {quiz.type === 'past' && (
                <button className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Results
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Learning Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{game.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{game.players.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{game.rating}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  {game.category}
                </span>
              </div>
              
              <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                <Play className="h-4 w-4" />
                Play Game
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {resource.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.level)}`}>
                  {resource.level}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-3">By {resource.instructor}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{resource.students.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{resource.rating}</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4" />
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'quizzes', label: 'Quizzes', icon: Trophy },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'resources', label: 'Resources', icon: BookOpen }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
        <p className="text-gray-600">Enhance your skills through interactive quizzes, engaging games, and comprehensive learning resources.</p>
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
      {activeTab === 'quizzes' && renderQuizzes()}
      {activeTab === 'games' && renderGames()}
      {activeTab === 'resources' && renderResources()}
    </div>
  );
};

export default LearningSection;