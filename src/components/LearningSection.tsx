import React, { useState } from 'react';
import { BookOpen, Clock, Trophy, Users, Play, Calendar } from 'lucide-react';
import LiveQuizJoinPage from './LiveQuizJoinPage';
import QuizTakingPage from './QuizTakingPage';
import UserQuizDetailPage from './UserQuizDetailPage';
import QuizLeaderboardPage from './QuizLeaderboardPage';

interface Quiz {
  id: string;
  title: string;
  type: 'live' | 'upcoming' | 'past' | 'completed';
  participants?: number;
  duration?: string;
  startTime?: string;
  registered?: boolean;
}

const LearningSection: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showLiveJoinPage, setShowLiveJoinPage] = useState(false);
  const [showUserQuizDetail, setShowUserQuizDetail] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showQuizTaking, setShowQuizTaking] = useState(false);

  // Sample quiz data
  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      type: 'live',
      participants: 45,
      duration: '30 min',
      startTime: 'Now'
    },
    {
      id: '2',
      title: 'JavaScript ES6+',
      type: 'upcoming',
      participants: 23,
      duration: '45 min',
      startTime: '2:00 PM',
      registered: true
    },
    {
      id: '3',
      title: 'CSS Grid Layout',
      type: 'past',
      participants: 67,
      duration: '25 min',
      startTime: 'Yesterday'
    },
    {
      id: '4',
      title: 'Node.js Basics',
      type: 'completed',
      participants: 34,
      duration: '40 min',
      startTime: 'Last week'
    }
  ];

  const handleQuizClick = (quiz: Quiz) => {
    if (quiz.type === 'live') {
      setSelectedQuiz(quiz);
      setShowLiveJoinPage(true);
    } else if (quiz.type === 'past' || quiz.type === 'completed') {
      setSelectedQuiz(quiz);
      setShowLeaderboard(true);
    } else {
      // For upcoming quizzes (both registered and unregistered), show detail page
      setSelectedQuiz(quiz);
      setShowUserQuizDetail(true);
    }
  };

  const handleBackToLearning = () => {
    setShowLiveJoinPage(false);
    setShowUserQuizDetail(false);
    setShowLeaderboard(false);
    setShowQuizTaking(false);
    setSelectedQuiz(null);
  };

  const handleStartQuiz = () => {
    setShowLiveJoinPage(false);
    setShowUserQuizDetail(false);
    setShowQuizTaking(true);
  };

  const getQuizIcon = (type: string) => {
    switch (type) {
      case 'live':
        return <Play className="w-5 h-5 text-red-500" />;
      case 'upcoming':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'past':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <BookOpen className="w-5 h-5 text-green-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (type: string) => {
    const badges = {
      live: 'bg-red-100 text-red-800 border-red-200',
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      past: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return badges[type as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (showLiveJoinPage && selectedQuiz) {
    return (
      <LiveQuizJoinPage
        quiz={selectedQuiz}
        onBack={handleBackToLearning}
        onStartQuiz={handleStartQuiz}
      />
    );
  }

  if (showQuizTaking && selectedQuiz) {
    return (
      <QuizTakingPage
        quiz={selectedQuiz}
        onBack={handleBackToLearning}
        onComplete={handleBackToLearning}
      />
    );
  }

  if (showUserQuizDetail && selectedQuiz) {
    return (
      <UserQuizDetailPage
        quiz={selectedQuiz}
        onBack={handleBackToLearning}
      />
    );
  }

  if (showLeaderboard && selectedQuiz) {
    return (
      <QuizLeaderboardPage
        quiz={selectedQuiz}
        onBack={handleBackToLearning}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
        <p className="text-gray-600">Join live quizzes, practice with past questions, and track your progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => handleQuizClick(quiz)}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getQuizIcon(quiz.type)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(quiz.type)}`}>
                  {quiz.type.charAt(0).toUpperCase() + quiz.type.slice(1)}
                </span>
              </div>
              {quiz.type === 'live' && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-600 font-medium">LIVE</span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{quiz.participants} participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{quiz.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{quiz.startTime}</span>
              </div>
            </div>

            {quiz.registered && quiz.type === 'upcoming' && (
              <div className="mt-4 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full inline-block">
                Registered
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Learn?</h2>
          <p className="text-gray-600 mb-6">
            Join our community of learners and test your knowledge with interactive quizzes
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Browse All Quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;