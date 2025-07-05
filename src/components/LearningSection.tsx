import React, { useState } from 'react';
import { BookOpen, Trophy, Gamepad2, Play, Clock, Users, Star, Award, Calendar, Timer, CheckCircle, PlayCircle, Eye, Filter, ChevronDown } from 'lucide-react';

const LearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [quizFilter, setQuizFilter] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');
  
  // Game filters
  const [gameDifficultyFilter, setGameDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [gameCategoryFilter, setGameCategoryFilter] = useState<'all' | 'typing' | 'logic' | 'debugging' | 'coding'>('all');
  
  // Resource filters
  const [resourceLevelFilter, setResourceLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [resourceTypeFilter, setResourceTypeFilter] = useState<'all' | 'course' | 'tutorial' | 'workshop' | 'bootcamp'>('all');

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
      difficulty: 'easy',
      players: 1247,
      rating: 4.8,
      category: 'typing',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Algorithm Puzzle',
      description: 'Solve algorithmic challenges step by step',
      difficulty: 'medium',
      players: 892,
      rating: 4.6,
      category: 'logic',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Debug Detective',
      description: 'Find and fix bugs in code snippets',
      difficulty: 'hard',
      players: 634,
      rating: 4.7,
      category: 'debugging',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      title: 'JavaScript Memory Game',
      description: 'Test your JavaScript knowledge with memory challenges',
      difficulty: 'easy',
      players: 1523,
      rating: 4.5,
      category: 'coding',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '5',
      title: 'Python Code Builder',
      description: 'Build Python programs by arranging code blocks',
      difficulty: 'medium',
      players: 756,
      rating: 4.4,
      category: 'coding',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '6',
      title: 'SQL Query Master',
      description: 'Master database queries through interactive challenges',
      difficulty: 'hard',
      players: 423,
      rating: 4.9,
      category: 'logic',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  // Mock data for learning resources
  const resources = [
    {
      id: '1',
      title: 'Complete React Course',
      type: 'course',
      duration: '12 hours',
      level: 'beginner',
      rating: 4.9,
      students: 15420,
      instructor: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals',
      type: 'tutorial',
      duration: '8 hours',
      level: 'beginner',
      rating: 4.7,
      students: 23150,
      instructor: 'Mike Chen',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Advanced Python Programming',
      type: 'course',
      duration: '20 hours',
      level: 'advanced',
      rating: 4.8,
      students: 8930,
      instructor: 'Dr. Emily Watson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      title: 'Full Stack Development Bootcamp',
      type: 'bootcamp',
      duration: '16 weeks',
      level: 'intermediate',
      rating: 4.6,
      students: 5670,
      instructor: 'Alex Rodriguez',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '5',
      title: 'Data Science Workshop',
      type: 'workshop',
      duration: '6 hours',
      level: 'intermediate',
      rating: 4.5,
      students: 3240,
      instructor: 'Maria Garcia',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '6',
      title: 'Machine Learning Masterclass',
      type: 'course',
      duration: '25 hours',
      level: 'advanced',
      rating: 4.9,
      students: 7890,
      instructor: 'Dr. James Wilson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': 
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'medium': 
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': 
      case 'advanced': return 'bg-red-100 text-red-800';
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

  const filteredGames = games.filter(game => {
    if (gameDifficultyFilter !== 'all' && game.difficulty !== gameDifficultyFilter) return false;
    if (gameCategoryFilter !== 'all' && game.category !== gameCategoryFilter) return false;
    return true;
  });

  const filteredResources = resources.filter(resource => {
    if (resourceLevelFilter !== 'all' && resource.level !== resourceLevelFilter) return false;
    if (resourceTypeFilter !== 'all' && resource.type !== resourceTypeFilter) return false;
    return true;
  });

  // Filter Dropdown Component
  const FilterDropdown: React.FC<{
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }> = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[140px] justify-between"
        >
          <span className="text-sm font-medium text-gray-700">{label}: {options.find(opt => opt.value === value)?.label}</span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150 ${
                  value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

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

      {/* Quiz Cards - More Concise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredQuizzes.map(quiz => (
          <div key={quiz.id} className={`bg-white rounded-lg shadow-sm border-2 p-4 hover:shadow-md transition-all duration-200 ${
            quiz.type === 'live' ? 'border-red-200 bg-red-50' : 'border-gray-200'
          }`}>
            {/* Header - Compact */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">{quiz.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(quiz.status)}`}>
                    {quiz.type === 'live' && <PlayCircle className="h-3 w-3 inline mr-1" />}
                    {formatStartTime(quiz.startTime, quiz.type)}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {quiz.category}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Description - Shortened */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{quiz.description}</p>
            
            {/* Stats - Compact */}
            <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{quiz.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{quiz.participants}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>{quiz.questions}Q</span>
              </div>
            </div>

            {/* Live Quiz Timer - Compact */}
            {quiz.type === 'live' && (
              <div className="bg-red-100 border border-red-200 rounded-md p-2 mb-3">
                <div className="flex items-center gap-2 text-red-800">
                  <Timer className="h-3 w-3" />
                  <span className="font-medium text-xs">{formatTimeRemaining(quiz.endTime)}</span>
                </div>
              </div>
            )}

            {/* Past Quiz Results - Compact */}
            {quiz.type === 'past' && quiz.score && (
              <div className="bg-gray-100 border border-gray-200 rounded-md p-2 mb-3">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3 w-3 text-yellow-600" />
                    <span className="font-medium">#{quiz.rank}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-blue-600" />
                    <span className="font-medium">{quiz.score}%</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action Button - Compact */}
            <div className="mt-3">
              {quiz.type === 'live' && (
                <button className="w-full bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Join Quiz
                </button>
              )}
              {quiz.type === 'upcoming' && !quiz.registered && (
                <button className="w-full bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
                  Register
                </button>
              )}
              {quiz.type === 'upcoming' && quiz.registered && (
                <button className="w-full bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium cursor-default flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Registered
                </button>
              )}
              {quiz.type === 'past' && (
                <button className="w-full bg-gray-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
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
      {/* Games Header with Filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Games</h2>
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Filters:</span>
        </div>
      </div>

      {/* Game Filters */}
      <div className="flex flex-wrap gap-3 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <FilterDropdown
          label="Difficulty"
          value={gameDifficultyFilter}
          options={[
            { value: 'all', label: 'All Levels' },
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' }
          ]}
          onChange={(value) => setGameDifficultyFilter(value as any)}
        />
        
        <FilterDropdown
          label="Category"
          value={gameCategoryFilter}
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'typing', label: 'Typing' },
            { value: 'logic', label: 'Logic' },
            { value: 'debugging', label: 'Debugging' },
            { value: 'coding', label: 'Coding' }
          ]}
          onChange={(value) => setGameCategoryFilter(value as any)}
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredGames.length} of {games.length} games
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
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
                  {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
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
                  {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
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

      {filteredGames.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Gamepad2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No games found matching your filters</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      {/* Resources Header with Filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Filters:</span>
        </div>
      </div>

      {/* Resource Filters */}
      <div className="flex flex-wrap gap-3 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <FilterDropdown
          label="Level"
          value={resourceLevelFilter}
          options={[
            { value: 'all', label: 'All Levels' },
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' }
          ]}
          onChange={(value) => setResourceLevelFilter(value as any)}
        />
        
        <FilterDropdown
          label="Type"
          value={resourceTypeFilter}
          options={[
            { value: 'all', label: 'All Types' },
            { value: 'course', label: 'Course' },
            { value: 'tutorial', label: 'Tutorial' },
            { value: 'workshop', label: 'Workshop' },
            { value: 'bootcamp', label: 'Bootcamp' }
          ]}
          onChange={(value) => setResourceTypeFilter(value as any)}
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.level)}`}>
                  {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
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

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No resources found matching your filters</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filter criteria</p>
        </div>
      )}
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