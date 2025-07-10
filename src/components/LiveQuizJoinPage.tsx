import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  FileText, 
  Calendar, 
  Play, 
  CheckCircle, 
  Trophy,
  Star,
  Timer,
  Target,
  Award,
  BarChart3,
  AlertCircle
} from 'lucide-react';

interface LiveQuizJoinPageProps {
  quiz: any;
  onBack: () => void;
  onJoinQuiz: () => void;
}

const LiveQuizJoinPage: React.FC<LiveQuizJoinPageProps> = ({ quiz, onBack, onJoinQuiz }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleJoin = () => {
    setShowJoinModal(false);
    onJoinQuiz();
  };

  const JoinModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <Play className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Join Live Quiz</h3>
            <p className="text-sm text-gray-600">Ready to start the quiz?</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">{quiz.title}</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              <span>Window closes in 23h 45m</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Quiz Duration: 1 hour</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{quiz.questions} questions</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center gap-2 text-indigo-800">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium text-sm">Quiz is live! Join now to participate.</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowJoinModal(false)}
            className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
          >
            Join Quiz
          </button>
        </div>
      </div>
    </div>
  );

  const renderLiveQuizLeaderboard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-900">Current Leaderboard</h3>
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">LIVE</span>
      </div>
      
      <div className="space-y-3">
        {[
          { rank: 1, name: 'Sarah Wilson', score: 85, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
          { rank: 2, name: 'Mike Chen', score: 82, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150' },
          { rank: 3, name: 'Emily Davis', score: 78, avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150' },
          { rank: 4, name: 'Alex Rodriguez', score: 75, avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150' },
          { rank: 5, name: 'Jennifer Liu', score: 72, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' }
        ].map((entry) => (
          <div key={entry.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">
              {entry.rank}
            </div>
            <img
              src={entry.avatar}
              alt={entry.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{entry.name}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600">{entry.score}%</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200">
        <BarChart3 className="h-4 w-4" />
        View Full Leaderboard
      </button>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quizzes
        </button>
      </div>

      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 border border-white border-opacity-30">
              LIVE NOW
            </span>
          </div>
          <p className="text-red-100 mb-4">{quiz.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Timer className="h-4 w-4" />
                <span className="text-sm">Time Window Remaining</span>
              </div>
              <div className="text-xl font-bold">23h 45m</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Quiz Duration</span>
              </div>
              <div className="text-xl font-bold">1 hour</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4" />
                <span className="text-sm">Questions</span>
              </div>
              <div className="text-xl font-bold">{quiz.questions}</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">Participants</span>
              </div>
              <div className="text-xl font-bold">{quiz.participants}</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4" />
                <span className="text-sm">Difficulty</span>
              </div>
              <div className="text-lg font-bold capitalize">{quiz.difficulty}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quiz Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Quiz Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {quiz.category}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty Level</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{quiz.description}</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-red-800 mb-2">Live Quiz Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-700">Window Remaining</span>
                    </div>
                    <div className="text-2xl font-bold text-red-800">23h 45m</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-700">Quiz Duration</span>
                    </div>
                    <div className="text-2xl font-bold text-red-800">1 hour</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Quiz Instructions</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <p>Join the quiz immediately to start answering questions.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <p>Answer questions as quickly and accurately as possible.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <p>Your score will be calculated based on correctness and speed.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                <p>Watch the leaderboard update in real-time as you progress.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join Quiz Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Live Quiz</h3>
            
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-indigo-800">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-sm">Quiz is live now!</span>
                </div>
                <div className="text-xs text-indigo-600 mt-1">
                  Window closes in 23h 45m
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  Unlimited
                </div>
                <div className="text-sm text-gray-600">participants allowed</div>
              </div>
              
              <button
                onClick={() => setShowJoinModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors duration-200"
              >
                <Play className="h-5 w-5" />
                Join Quiz Now
              </button>
            </div>
          </div>

          {/* Live Quiz Leaderboard */}
          {renderLiveQuizLeaderboard()}

          {/* Quiz Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-medium">{quiz.questions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{quiz.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Participants:</span>
                <span className="font-medium">{quiz.participants}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Window:</span>
                <span className="font-medium">1 day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && <JoinModal />}
    </div>
  );
};

export default LiveQuizJoinPage;