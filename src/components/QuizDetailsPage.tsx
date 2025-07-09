import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, Clock, FileText, Edit, Rocket, Eye, Building } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  startDate: Date;
  status: 'draft' | 'scheduled' | 'live' | 'completed';
  questions: number;
  registrations: number;
  participants: number;
  createdAt: Date;
  createdBy: string;
  targetAudience: 'all' | 'organization';
}

interface Registration {
  id: string;
  name: string;
  organization: string;
  registeredAt: Date;
}

interface QuizDetailsPageProps {
  quiz: Quiz;
  onBack: () => void;
}

const QuizDetailsPage: React.FC<QuizDetailsPageProps> = ({ quiz, onBack }) => {
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  
  // Mock registration data
  const [registrations] = useState<Registration[]>([
    {
      id: '1',
      name: 'John Smith',
      organization: 'Sama',
      registeredAt: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      organization: 'Navgurukul',
      registeredAt: new Date(Date.now() - 172800000)
    },
    {
      id: '3',
      name: 'Mike Chen',
      organization: 'Sama',
      registeredAt: new Date(Date.now() - 259200000)
    },
    {
      id: '4',
      name: 'Emily Davis',
      organization: 'Zuvy',
      registeredAt: new Date(Date.now() - 345600000)
    },
    {
      id: '5',
      name: 'Alex Rodriguez',
      organization: 'Sama',
      registeredAt: new Date(Date.now() - 432000000)
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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const handleLaunch = (audience: 'all' | 'organization') => {
    console.log('Launching quiz:', { quiz, audience });
    setShowLaunchModal(false);
    onBack();
  };

  const LaunchModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Rocket className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Launch Quiz</h3>
            <p className="text-sm text-gray-600">Choose your target audience</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">
          Who should have access to "{quiz.title}"?
        </p>
        
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleLaunch('all')}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Users className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">All Students</div>
              <div className="text-sm text-gray-600">Available to all registered students</div>
            </div>
          </button>
          
          <button
            onClick={() => handleLaunch('organization')}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Building className="h-5 w-5 text-purple-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Organization Students</div>
              <div className="text-sm text-gray-600">Available only to your organization students</div>
            </div>
          </button>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowLaunchModal(false)}
            className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
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
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(quiz.status)}`}>
                {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
              </span>
            </div>
            <p className="text-blue-100 mb-4">{quiz.description}</p>
            
            <div className="flex items-center gap-6 text-blue-100">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{quiz.duration} minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{quiz.questions} questions</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(quiz.startDate)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {quiz.status === 'draft' && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-medium transition-all duration-200">
                  <Edit className="h-4 w-4" />
                  Edit Quiz
                </button>
                <button
                  onClick={() => setShowLaunchModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
                >
                  <Rocket className="h-4 w-4" />
                  Launch Quiz
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quiz Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Information</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty Level</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Target Audience</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {quiz.targetAudience === 'all' ? 'All Students' : 'Organization Students'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {quiz.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{quiz.registrations}</div>
                <div className="text-sm text-gray-600">Registrations</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{quiz.participants}</div>
                <div className="text-sm text-gray-600">Participants</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{quiz.questions}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
            </div>
          </div>

          {/* Registrations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Registered Students ({registrations.length})</h2>
            </div>
            
            {registrations.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No registrations yet</p>
                <p className="text-gray-400 text-sm mt-2">Students will appear here once they register</p>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map(registration => (
                  <div key={registration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{registration.name}</h4>
                      <p className="text-sm text-gray-600">{registration.organization}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Registered {formatTimeAgo(registration.registeredAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">{formatTimeAgo(quiz.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Created by:</span>
                <span className="font-medium">{quiz.createdBy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quiz.status)}`}>
                  {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                </span>
              </div>
              {quiz.status === 'scheduled' && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Starts in:</span>
                  <span className="font-medium text-blue-600">
                    {Math.ceil((quiz.startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Eye className="h-4 w-4" />
                Preview Quiz
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Users className="h-4 w-4" />
                View All Registrations
              </button>
              {quiz.status === 'draft' && (
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200">
                  <Edit className="h-4 w-4" />
                  Edit Questions
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Launch Modal */}
      {showLaunchModal && <LaunchModal />}
    </div>
  );
};

export default QuizDetailsPage;