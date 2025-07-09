import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Award, Clock, Users, Target, Star, Crown, BarChart3 } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  organization: string;
  avatar: string;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in minutes
  completedAt: Date;
  rank: number;
  isCurrentUser?: boolean;
}

interface UserQuizLeaderboardPageProps {
  quiz: any;
  onBack: () => void;
}

const UserQuizLeaderboardPage: React.FC<UserQuizLeaderboardPageProps> = ({ quiz, onBack }) => {
  // Mock leaderboard data with current user
  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      organization: 'Sama',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 95,
      totalQuestions: quiz.questions,
      timeTaken: 22,
      completedAt: new Date(Date.now() - 3600000),
      rank: 1
    },
    {
      id: '2',
      name: 'Mike Chen',
      organization: 'Navgurukul',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 92,
      totalQuestions: quiz.questions,
      timeTaken: 25,
      completedAt: new Date(Date.now() - 7200000),
      rank: 2
    },
    {
      id: 'current-user',
      name: 'You',
      organization: 'Sama',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 88,
      totalQuestions: quiz.questions,
      timeTaken: 28,
      completedAt: new Date(Date.now() - 10800000),
      rank: 3,
      isCurrentUser: true
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      organization: 'Sama',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 85,
      totalQuestions: quiz.questions,
      timeTaken: 30,
      completedAt: new Date(Date.now() - 14400000),
      rank: 4
    },
    {
      id: '5',
      name: 'Jennifer Liu',
      organization: 'Meraki',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 82,
      totalQuestions: quiz.questions,
      timeTaken: 27,
      completedAt: new Date(Date.now() - 18000000),
      rank: 5
    },
    {
      id: '6',
      name: 'David Kim',
      organization: 'Sama',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 78,
      totalQuestions: quiz.questions,
      timeTaken: 32,
      completedAt: new Date(Date.now() - 21600000),
      rank: 6
    },
    {
      id: '7',
      name: 'Maria Garcia',
      organization: 'Navgurukul',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 75,
      totalQuestions: quiz.questions,
      timeTaken: 29,
      completedAt: new Date(Date.now() - 25200000),
      rank: 7
    },
    {
      id: '8',
      name: 'James Wilson',
      organization: 'Zuvy',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      score: 72,
      totalQuestions: quiz.questions,
      timeTaken: 35,
      completedAt: new Date(Date.now() - 28800000),
      rank: 8
    }
  ]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-gray-500 font-bold">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-500';
      default: return 'bg-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const currentUser = leaderboard.find(entry => entry.isCurrentUser);
  const averageScore = Math.round(leaderboard.reduce((sum, entry) => sum + entry.score, 0) / leaderboard.length);

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
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-yellow-300" />
            <h1 className="text-3xl font-bold">{quiz.title} - Results</h1>
          </div>
          <p className="text-purple-100 mb-4">{quiz.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">Participants</span>
              </div>
              <div className="text-2xl font-bold">{quiz.participants}</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4" />
                <span className="text-sm">Your Score</span>
              </div>
              <div className="text-2xl font-bold">{currentUser?.score}%</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4" />
                <span className="text-sm">Your Rank</span>
              </div>
              <div className="text-2xl font-bold">#{currentUser?.rank}</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Average</span>
              </div>
              <div className="text-2xl font-bold">{averageScore}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Performance Card */}
      {currentUser && (
        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Your Performance</h2>
              <p className="text-gray-600">Great job on completing the quiz!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{currentUser.score}%</div>
              <div className="text-sm text-gray-600">Your Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">#{currentUser.rank}</div>
              <div className="text-sm text-gray-600">Your Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{currentUser.timeTaken}m</div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {Math.round((currentUser.score / 100) * currentUser.totalQuestions)}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Podium */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Top Performers</h2>
        
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd Place */}
          {leaderboard[1] && (
            <div className="text-center">
              <div className="relative mb-3">
                <img
                  src={leaderboard[1].avatar}
                  alt={leaderboard[1].name}
                  className="w-16 h-16 rounded-full object-cover mx-auto border-4 border-gray-300"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 h-20 flex flex-col justify-end">
                <h3 className="font-semibold text-gray-900 text-sm">{leaderboard[1].name}</h3>
                <p className="text-gray-600 text-xs">{leaderboard[1].score}%</p>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {leaderboard[0] && (
            <div className="text-center">
              <div className="relative mb-3">
                <img
                  src={leaderboard[0].avatar}
                  alt={leaderboard[0].name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-yellow-400"
                />
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 h-24 flex flex-col justify-end">
                <h3 className="font-bold text-gray-900">{leaderboard[0].name}</h3>
                <p className="text-yellow-700 font-semibold">{leaderboard[0].score}%</p>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {leaderboard[2] && (
            <div className="text-center">
              <div className="relative mb-3">
                <img
                  src={leaderboard[2].avatar}
                  alt={leaderboard[2].name}
                  className={`w-16 h-16 rounded-full object-cover mx-auto border-4 ${
                    leaderboard[2].isCurrentUser ? 'border-blue-400' : 'border-amber-400'
                  }`}
                />
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                  leaderboard[2].isCurrentUser ? 'bg-blue-500' : 'bg-amber-500'
                }`}>
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                {leaderboard[2].isCurrentUser && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    You
                  </div>
                )}
              </div>
              <div className={`rounded-lg p-3 h-20 flex flex-col justify-end ${
                leaderboard[2].isCurrentUser ? 'bg-blue-100' : 'bg-amber-100'
              }`}>
                <h3 className="font-semibold text-gray-900 text-sm">{leaderboard[2].name}</h3>
                <p className={`text-xs ${
                  leaderboard[2].isCurrentUser ? 'text-blue-700' : 'text-amber-700'
                }`}>
                  {leaderboard[2].score}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Complete Leaderboard</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Rank</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Participant</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Organization</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Score</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Time Taken</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <tr 
                  key={entry.id} 
                  className={`hover:bg-gray-50 ${
                    entry.isCurrentUser 
                      ? 'bg-blue-50 border-l-4 border-blue-500' 
                      : entry.rank <= 3 
                      ? getRankBg(entry.rank) + ' bg-opacity-10' 
                      : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                      {entry.isCurrentUser && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className={`font-medium ${entry.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                          {entry.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {entry.organization}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${
                        entry.isCurrentUser ? 'text-blue-600' : getScoreColor(entry.score)
                      }`}>
                        {entry.score}%
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({Math.round((entry.score / 100) * entry.totalQuestions)}/{entry.totalQuestions})
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{entry.timeTaken}m</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 text-sm">
                      {formatTimeAgo(entry.completedAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Performance</h3>
              <p className="text-2xl font-bold text-green-600">
                {currentUser && currentUser.score >= averageScore ? 'Above Average' : 'Below Average'}
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            {currentUser && currentUser.score >= averageScore 
              ? `You scored ${currentUser.score - averageScore}% above the average`
              : `You scored ${averageScore - (currentUser?.score || 0)}% below the average`
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Time Efficiency</h3>
              <p className="text-2xl font-bold text-blue-600">
                {currentUser?.timeTaken}m
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            You completed the quiz in {currentUser?.timeTaken} minutes
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Achievement</h3>
              <p className="text-2xl font-bold text-purple-600">
                {currentUser?.rank === 1 ? 'Winner!' : 
                 currentUser?.rank === 2 ? 'Runner-up!' :
                 currentUser?.rank === 3 ? 'Third Place!' :
                 `Top ${Math.round((currentUser?.rank || 0) / leaderboard.length * 100)}%`}
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            You ranked #{currentUser?.rank} out of {leaderboard.length} participants
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserQuizLeaderboardPage;