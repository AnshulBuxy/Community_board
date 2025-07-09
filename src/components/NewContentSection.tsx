import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, Trophy, FileText, Play, Pause, Edit, Eye, BarChart3 } from 'lucide-react';
import CreateQuizPage from './CreateQuizPage';
import QuizDetailsPage from './QuizDetailsPage';
import QuizLeaderboardPage from './QuizLeaderboardPage';

interface Quiz {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  startDate: Date;
  status: 'draft' | 'scheduled' | 'live' | 'completed';
  questions: number;
  registrations: number;
  participants: number;
  createdAt: Date;
  createdBy: string;
  targetAudience: 'all' | 'organization';
}

const NewContentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [quizTab, setQuizTab] = useState('live');
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Mock quiz data
  const [quizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'React Fundamentals Quiz',
      description: 'Test your knowledge of React hooks, components, and state management.',
      tags: ['React', 'JavaScript', 'Frontend'],
      difficulty: 'medium',
      duration: 30,
      startDate: new Date(),
      status: 'live',
      questions: 20,
      registrations: 234,
      participants: 189,
      createdAt: new Date(Date.now() - 86400000),
      createdBy: 'Admin',
      targetAudience: 'all'
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Challenge',
      description: 'Advanced JavaScript concepts including async/await, destructuring, and modules.',
      tags: ['JavaScript', 'ES6', 'Advanced'],
      difficulty: 'hard',
      duration: 45,
      startDate: new Date(Date.now() + 86400000),
      status: 'scheduled',
      questions: 25,
      registrations: 156,
      participants: 0,
      createdAt: new Date(Date.now() - 172800000),
      createdBy: 'Admin',
      targetAudience: 'organization'
    },
    {
      id: '3',
      title: 'Python Basics Quiz',
      description: 'Fundamental Python concepts for beginners.',
      tags: ['Python', 'Basics', 'Programming'],
      difficulty: 'easy',
      duration: 25,
      startDate: new Date(Date.now() - 172800000),
      status: 'completed',
      questions: 15,
      registrations: 445,
      participants: 398,
      createdAt: new Date(Date.now() - 259200000),
      createdBy: 'Admin',
      targetAudience: 'all'
    },
    {
      id: '4',
      title: 'Node.js Backend Development',
      description: 'Server-side JavaScript with Express and databases.',
      tags: ['Node.js', 'Backend', 'Express'],
      difficulty: 'medium',
      duration: 40,
      startDate: new Date(Date.now() + 172800000),
      status: 'draft',
      questions: 18,
      registrations: 0,
      participants: 0,
      createdAt: new Date(Date.now() - 86400000),
      createdBy: 'Admin',
      targetAudience: 'all'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800 border-red-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredQuizzes = () => {
    return quizzes.filter(quiz => quiz.status === quizTab);
  };

  const handleQuizClick = (quiz: Quiz) => {
    if (quiz.status === 'live' || quiz.status === 'completed') {
      setSelectedQuiz(quiz);
      setShowLeaderboard(true);
    } else {
      setSelectedQuiz(quiz);
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setShowCreateQuiz(false);
    setShowLeaderboard(false);
  };

  // Show create quiz page
  if (showCreateQuiz) {
    return <CreateQuizPage onBack={handleBackToQuizzes} />;
  }

  // Show quiz details page
  if (selectedQuiz && !showLeaderboard) {
    return <QuizDetailsPage quiz={selectedQuiz} onBack={handleBackToQuizzes} />;
  }

  // Show leaderboard page
  if (selectedQuiz && showLeaderboard) {
    return <QuizLeaderboardPage quiz={selectedQuiz} onBack={handleBackToQuizzes} />;
  }

  const renderQuizCard = (quiz: Quiz) => (
    <div key={quiz.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(quiz.status)}`}>
              {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{quiz.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {quiz.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{quiz.duration} minutes</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>{quiz.questions} questions</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{quiz.registrations} registered</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(quiz.startDate)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
          {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
        </span>
        
        <div className="flex gap-2">
          {quiz.status === 'live' || quiz.status === 'completed' ? (
            <button
              onClick={() => handleQuizClick(quiz)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              <BarChart3 className="h-3 w-3" />
              Leaderboard
            </button>
          ) : (
            <button
              onClick={() => handleQuizClick(quiz)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-colors duration-200"
            >
              <Eye className="h-3 w-3" />
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderQuizzes = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quiz Management</h2>
        <button
          onClick={() => setShowCreateQuiz(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          Create Quiz
        </button>
      </div>

      {/* Quiz Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex space-x-1">
          {['live', 'scheduled', 'completed', 'draft'].map(tab => (
            <button
              key={tab}
              onClick={() => setQuizTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                quizTab === tab
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab === 'live' && <Play className="h-4 w-4" />}
              {tab === 'scheduled' && <Calendar className="h-4 w-4" />}
              {tab === 'completed' && <Trophy className="h-4 w-4" />}
              {tab === 'draft' && <FileText className="h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">
                {getFilteredQuizzes().length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredQuizzes().map(renderQuizCard)}
      </div>

      {getFilteredQuizzes().length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No {quizTab} quizzes found</p>
          <p className="text-gray-400 text-sm mt-2">
            {quizTab === 'draft' ? 'Create your first quiz to get started' : `No ${quizTab} quizzes at the moment`}
          </p>
        </div>
      )}
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200">
          <Plus className="h-4 w-4" />
          Add Resource
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Resource Management Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          This section will allow you to manage learning resources, documents, and materials for your organization.
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
        <p className="text-gray-600">Create and manage quizzes and learning resources for your organization</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'quizzes'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Trophy className="h-5 w-5" />
            Quizzes
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'resources'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <FileText className="h-5 w-5" />
            Resources
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'quizzes' && renderQuizzes()}
      {activeTab === 'resources' && renderResources()}
    </div>
  );
};

export default NewContentSection;