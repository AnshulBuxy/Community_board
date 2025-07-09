import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  Award, 
  Activity, 
  MessageCircle, 
  Users, 
  BookOpen, 
  Building,
  Globe,
  Heart,
  Share2,
  UserPlus,
  UserCheck,
  Clock
} from 'lucide-react';

interface UserProfileCardProps {
  userId: string;
  onBack: () => void;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'student' | 'mentor';
  organization: string;
  bio: string;
  location: string;
  website?: string;
  skills: string[];
  interests: string[];
  rating: number;
  status: 'active' | 'inactive';
  joinedDate: Date;
  connectionStatus: 'none' | 'pending' | 'connected';
  achievements: {
    id: string;
    title: string;
    description: string;
    earnedDate: Date;
    icon: string;
  }[];
  recentActivity: {
    id: string;
    type: 'post' | 'connection' | 'session' | 'achievement';
    description: string;
    timestamp: Date;
  }[];
  recentPosts: {
    id: string;
    content: string;
    timestamp: Date;
    likes: number;
    comments: number;
    shares: number;
  }[];
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userId, onBack }) => {
  // Mock user data - in real app, this would be fetched based on userId
  const [user] = useState<UserProfile>({
    id: userId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'mentor',
    organization: 'sama',
    bio: 'Senior Frontend Developer with 8+ years of experience. Passionate about teaching React and modern web development.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    skills: ['react', 'javascript', 'typescript', 'nodejs'],
    interests: ['Web Development', 'Open Source', 'Teaching'],
    rating: 4.8,
    status: 'active',
    joinedDate: new Date('2023-01-15'),
    connectionStatus: 'none',
    achievements: [
      {
        id: '1',
        title: 'Top Mentor',
        description: 'Completed 50+ mentoring sessions',
        earnedDate: new Date('2023-08-15'),
        icon: '🏆'
      },
      {
        id: '2',
        title: 'Community Helper',
        description: 'Helped 100+ students',
        earnedDate: new Date('2023-06-20'),
        icon: '🤝'
      },
      {
        id: '3',
        title: 'Knowledge Sharer',
        description: 'Created 20+ helpful posts',
        earnedDate: new Date('2023-09-10'),
        icon: '📚'
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'post',
        description: 'Posted about React best practices',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        type: 'session',
        description: 'Completed mentoring session with Jane Smith',
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: '3',
        type: 'connection',
        description: 'Connected with 3 new students',
        timestamp: new Date(Date.now() - 86400000)
      },
      {
        id: '4',
        type: 'achievement',
        description: 'Earned "Top Mentor" achievement',
        timestamp: new Date(Date.now() - 172800000)
      }
    ],
    recentPosts: [
      {
        id: '1',
        content: 'Just finished an amazing session on React hooks! The key is understanding the dependency array and when to use useCallback vs useMemo.',
        timestamp: new Date(Date.now() - 3600000),
        likes: 24,
        comments: 8,
        shares: 3
      },
      {
        id: '2',
        content: 'Pro tip: Always use TypeScript for larger React projects. It saves so much debugging time and makes your code more maintainable!',
        timestamp: new Date(Date.now() - 86400000),
        likes: 31,
        comments: 12,
        shares: 7
      },
      {
        id: '3',
        content: 'Looking forward to mentoring more students this week. If you\'re struggling with JavaScript fundamentals, feel free to reach out!',
        timestamp: new Date(Date.now() - 172800000),
        likes: 18,
        comments: 5,
        shares: 2
      }
    ]
  });

  const [connectionStatus, setConnectionStatus] = useState(user.connectionStatus);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return MessageCircle;
      case 'connection': return Users;
      case 'session': return BookOpen;
      case 'achievement': return Award;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'post': return 'bg-blue-100 text-blue-600';
      case 'connection': return 'bg-green-100 text-green-600';
      case 'session': return 'bg-purple-100 text-purple-600';
      case 'achievement': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleConnect = () => {
    if (connectionStatus === 'none') {
      setConnectionStatus('pending');
    } else if (connectionStatus === 'pending') {
      setConnectionStatus('none');
    }
  };

  const getConnectionButton = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <button className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium cursor-default">
            <UserCheck className="h-5 w-5" />
            Connected
          </button>
        );
      case 'pending':
        return (
          <button 
            onClick={handleConnect}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200 transition-colors duration-200"
          >
            <Clock className="h-5 w-5" />
            Pending
          </button>
        );
      default:
        return (
          <button 
            onClick={handleConnect}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            <UserPlus className="h-5 w-5" />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Discover Users
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
              </div>
              
              <div className="flex items-center gap-4 text-blue-100 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'mentor' ? 'bg-purple-500' : 'bg-blue-500'
                }`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{user.organization}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-blue-100">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(user.joinedDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(user.rating)}
                  <span className="ml-1">({user.rating})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-medium transition-all duration-200">
              <MessageCircle className="h-5 w-5" />
              Message
            </button>
            {getConnectionButton()}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-700 mb-4">{user.bio}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
              {user.website && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Globe className="h-4 w-4" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {user.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Interests</h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {user.recentPosts.map((post) => (
                <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatTimeAgo(post.timestamp)}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              {user.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(achievement.earnedDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {user.recentActivity.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;