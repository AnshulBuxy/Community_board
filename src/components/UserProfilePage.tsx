import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  Activity, 
  MessageCircle, 
  Users, 
  BookOpen, 
  Shield, 
  Ban, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Building,
  Globe,
  Heart,
  Share2,
  UserCheck,
  UserX,
  MoreHorizontal
} from 'lucide-react';

interface UserProfilePageProps {
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
  status: 'active' | 'inactive' | 'blocked';
  joinedDate: Date;
  lastActive: Date;
  completedSessions: number;
  posts: number;
  connections: number;
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

const UserProfilePage: React.FC<UserProfilePageProps> = ({ userId, onBack }) => {
  // Mock user data - in real app, this would be fetched based on userId
  const [user] = useState<UserProfile>({
    id: userId,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@sama.org',
    phone: '+91 9876543213',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'mentor',
    organization: 'sama',
    bio: 'Senior React Developer at Google. Love mentoring aspiring developers and sharing knowledge about modern web development.',
    location: 'Mountain View, CA',
    website: 'https://sarahwilson.dev',
    skills: ['react', 'javascript', 'typescript', 'nodejs', 'python'],
    interests: ['Web Development', 'Open Source', 'Teaching', 'AI/ML'],
    rating: 4.8,
    status: 'active',
    joinedDate: new Date('2023-01-15'),
    lastActive: new Date(Date.now() - 1800000), // 30 minutes ago
    completedSessions: 45,
    posts: 23,
    connections: 67,
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
        description: 'Completed mentoring session with John Doe',
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

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [userStatus, setUserStatus] = useState(user.status);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  const handleBlockUser = () => {
    setUserStatus('blocked');
    setShowBlockModal(false);
    // In real app, make API call to block user
  };

  const handleUnblockUser = () => {
    setUserStatus('active');
    // In real app, make API call to unblock user
  };

  const handleRemoveUser = () => {
    setShowRemoveModal(false);
    // In real app, make API call to remove user
    onBack(); // Go back after removal
  };

  const BlockModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Ban className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Block User</h3>
            <p className="text-sm text-gray-600">This action can be reversed</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">
          Are you sure you want to block <strong>{user.name}</strong>? They will not be able to access the platform until unblocked.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowBlockModal(false)}
            className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleBlockUser}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Block User
          </button>
        </div>
      </div>
    </div>
  );

  const RemoveModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Remove User</h3>
            <p className="text-sm text-red-600">This action cannot be undone</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">
          Are you sure you want to permanently remove <strong>{user.name}</strong> from the platform? This will delete all their data and cannot be reversed.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowRemoveModal(false)}
            className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleRemoveUser}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Remove User
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
          Back to User Management
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
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(userStatus)}`}>
                  {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
                </span>
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
            {userStatus === 'blocked' ? (
              <button
                onClick={handleUnblockUser}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <UserCheck className="h-4 w-4" />
                Unblock
              </button>
            ) : (
              <button
                onClick={() => setShowBlockModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <Ban className="h-4 w-4" />
                Block User
              </button>
            )}
            
            <button
              onClick={() => setShowRemoveModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
              Remove User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{user.completedSessions}</div>
          <div className="text-sm text-gray-600">Sessions</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{user.posts}</div>
          <div className="text-sm text-gray-600">Posts</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{user.connections}</div>
          <div className="text-sm text-gray-600">Connections</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{formatTimeAgo(user.lastActive)}</div>
          <div className="text-sm text-gray-600">Last Active</div>
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

      {/* Modals */}
      {showBlockModal && <BlockModal />}
      {showRemoveModal && <RemoveModal />}
    </div>
  );
};

export default UserProfilePage;