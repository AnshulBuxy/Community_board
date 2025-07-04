import React, { useState } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Gamepad2, 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  CheckCircle, 
  Star,
  Award,
  Target,
  Zap,
  Brain,
  Video,
  FileText,
  ExternalLink,
  MapPin,
  Live,
  History
} from 'lucide-react';

const LearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [eventFilter, setEventFilter] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');

  // Mock data for learning resources
  const quizzes = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Test your knowledge of React basics including components, props, and state',
      difficulty: 'Beginner',
      questions: 15,
      timeLimit: 20,
      completed: false,
      score: null,
      category: 'Frontend'
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Features',
      description: 'Advanced JavaScript concepts including arrow functions, destructuring, and async/await',
      difficulty: 'Intermediate',
      questions: 20,
      timeLimit: 25,
      completed: true,
      score: 85,
      category: 'JavaScript'
    },
    {
      id: '3',
      title: 'Python Data Structures',
      description: 'Master Python lists, dictionaries, sets, and tuples',
      difficulty: 'Beginner',
      questions: 12,
      timeLimit: 15,
      completed: true,
      score: 92,
      category: 'Python'
    }
  ];

  const games = [
    {
      id: '1',
      title: 'Code Combat',
      description: 'Learn programming through an interactive RPG adventure',
      type: 'Interactive',
      players: '1,234',
      rating: 4.8,
      category: 'Programming',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Algorithm Arena',
      description: 'Compete with others in solving algorithmic challenges',
      type: 'Competitive',
      players: '856',
      rating: 4.6,
      category: 'Algorithms',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'CSS Grid Garden',
      description: 'Master CSS Grid layout through fun gardening puzzles',
      type: 'Puzzle',
      players: '2,156',
      rating: 4.9,
      category: 'CSS',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const resources = [
    {
      id: '1',
      title: 'Complete React Course',
      type: 'Video Course',
      duration: '12 hours',
      level: 'Beginner to Advanced',
      rating: 4.9,
      students: '15,234',
      category: 'Frontend',
      thumbnail: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      type: 'Interactive Tutorial',
      duration: '8 hours',
      level: 'Intermediate',
      rating: 4.7,
      students: '8,567',
      category: 'Data Science',
      thumbnail: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'JavaScript Cheat Sheet',
      type: 'Reference',
      duration: 'Quick Reference',
      level: 'All Levels',
      rating: 4.8,
      students: '25,891',
      category: 'JavaScript',
      thumbnail: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const events = [
    {
      id: '1',
      title: 'React Workshop: Building Modern UIs',
      type: 'live',
      date: new Date(),
      duration: '2 hours',
      attendees: 156,
      maxAttendees: 200,
      instructor: 'Sarah Johnson',
      level: 'Intermediate',
      category: 'Frontend',
      description: 'Learn advanced React patterns and best practices for building scalable applications.'
    },
    {
      id: '2',
      title: 'Python Data Analysis Bootcamp',
      type: 'upcoming',
      date: new Date(Date.now() + 86400000), // Tomorrow
      duration: '3 hours',
      attendees: 89,
      maxAttendees: 150,
      instructor: 'Dr. Emily Watson',
      level: 'Beginner',
      category: 'Data Science',
      description: 'Introduction to data analysis using pandas, numpy, and matplotlib.'
    },
    {
      id: '3',
      title: 'JavaScript Fundamentals',
      type: 'upcoming',
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      duration: '1.5 hours',
      attendees: 234,
      maxAttendees: 300,
      instructor: 'Mike Chen',
      level: 'Beginner',
      category: 'JavaScript',
      description: 'Master the basics of JavaScript programming from scratch.'
    },
    {
      id: '4',
      title: 'Advanced TypeScript Patterns',
      type: 'past',
      date: new Date(Date.now() - 86400000), // Yesterday
      duration: '2.5 hours',
      attendees: 178,
      maxAttendees: 200,
      instructor: 'Alex Rodriguez',
      level: 'Advanced',
      category: 'TypeScript',
      description: 'Deep dive into advanced TypeScript features and design patterns.'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'live': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEventDate = (date: Date, type: string) => {
    if (type === 'live') return 'Live Now';
    
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const filteredEvents = events.filter(event => {
    if (eventFilter === 'all') return true;
    return event.type === eventFilter;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Quizzes</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Learning Hours</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Award className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <Brain className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Take a Quiz</h3>
          <p className="text-blue-100 text-sm mb-4">Test your knowledge and track your progress</p>
          <button 
            onClick={() => setActiveTab('quizzes')}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Start Quiz
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <Gamepad2 className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Play & Learn</h3>
          <p className="text-green-100 text-sm mb-4">Learn through interactive games and challenges</p>
          <button 
            onClick={() => setActiveTab('games')}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Play Now
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <Calendar className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Join Events</h3>
          <p className="text-purple-100 text-sm mb-4">Attend live workshops and learning sessions</p>
          <button 
            onClick={() => setActiveTab('events')}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            View Events
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Learning Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Completed "JavaScript ES6+ Features" quiz</p>
              <p className="text-xs text-gray-500">Score: 85% • 2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Play className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Started "Complete React Course"</p>
              <p className="text-xs text-gray-500">Progress: 25% • 1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Trophy className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Earned "Quiz Master" achievement</p>
              <p className="text-xs text-gray-500">Completed 5 quizzes with 80%+ score • 3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quizzes</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>JavaScript</option>
            <option>Python</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>
              </div>
              {quiz.completed && (
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Difficulty:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="font-medium">{quiz.questions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Time Limit:</span>
                <span className="font-medium">{quiz.timeLimit} min</span>
              </div>
              {quiz.completed && quiz.score && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Your Score:</span>
                  <span className="font-medium text-green-600">{quiz.score}%</span>
                </div>
              )}
            </div>

            <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              quiz.completed 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}>
              {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Games</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>Interactive</option>
            <option>Competitive</option>
            <option>Puzzle</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src={game.image} 
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{game.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{game.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Players:</span>
                  <span className="font-medium">{game.players}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{game.rating}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>Video Course</option>
            <option>Interactive Tutorial</option>
            <option>Reference</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  {resource.type}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{resource.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{resource.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium">{resource.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{resource.rating}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Access Resource
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Events</h2>
        <div className="flex gap-2">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {['all', 'live', 'upcoming', 'past'].map(filter => (
              <button
                key={filter}
                onClick={() => setEventFilter(filter as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  eventFilter === filter
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter === 'all' ? 'All Events' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type === 'live' && <Live className="h-3 w-3 inline mr-1" />}
                    {formatEventDate(event.date, event.type)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(event.level)}`}>
                    {event.level}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{event.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{event.attendees}/{event.maxAttendees}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{event.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{event.instructor}</span>
                  </div>
                </div>
              </div>
              
              <div className="ml-6">
                {event.type === 'live' && (
                  <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                    <Live className="h-4 w-4" />
                    Join Live
                  </button>
                )}
                {event.type === 'upcoming' && (
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Register
                  </button>
                )}
                {event.type === 'past' && (
                  <button className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <History className="h-4 w-4" />
                    View Recording
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'quizzes', label: 'Quizzes', icon: Brain },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
        <p className="text-gray-600">Enhance your skills through quizzes, games, resources, and live events.</p>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'quizzes' && renderQuizzes()}
      {activeTab === 'games' && renderGames()}
      {activeTab === 'resources' && renderResources()}
      {activeTab === 'events' && renderEvents()}
    </div>
  );
};

export default LearningSection;