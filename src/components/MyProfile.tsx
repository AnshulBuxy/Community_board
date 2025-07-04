import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Star, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Award, 
  BookOpen, 
  Users, 
  MessageCircle,
  Settings,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Heart,
  Building,
  DollarSign,
  Clock
} from 'lucide-react';
import { User as UserType } from '../types';

interface MyProfileProps {
  currentUser: UserType;
}

const MyProfile: React.FC<MyProfileProps> = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [savedFilter, setSavedFilter] = useState<'all' | 'posts' | 'jobs'>('all');
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: 'you@example.com',
    bio: 'Passionate student learning web development. Always eager to connect with mentors and fellow learners!',
    location: 'San Francisco, CA',
    website: 'https://yourportfolio.com',
    joinedDate: 'March 2023',
    skills: currentUser.skills || ['react', 'javascript'],
    interests: ['Web Development', 'UI/UX Design', 'Open Source'],
    achievements: [
      { id: '1', title: 'First Connection', description: 'Made your first connection on Sama', date: '2023-03-15' },
      { id: '2', title: 'Active Learner', description: 'Completed 10 mentoring sessions', date: '2023-06-20' },
      { id: '3', title: 'Community Helper', description: 'Helped 5 fellow students', date: '2023-08-10' }
    ]
  });

  // Mock saved data
  const [savedPosts] = useState([
    {
      id: '1',
      type: 'post',
      author: {
        name: 'Maria Rodriguez',
        username: 'maria_dev',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'mentor'
      },
      content: 'Excited to share my latest tutorial on advanced TypeScript patterns! Check it out and let me know what you think.',
      timestamp: new Date(Date.now() - 7200000),
      likes: 28,
      comments: 7,
      savedDate: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      type: 'post',
      author: {
        name: 'Alex Thompson',
        username: 'alex_mentor',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'mentor'
      },
      content: 'Working on a new Python data science course. Would love feedback from the community on what topics you\'d like to see covered!',
      timestamp: new Date(Date.now() - 14400000),
      likes: 22,
      comments: 15,
      savedDate: new Date(Date.now() - 86400000)
    }
  ]);

  const [savedJobs] = useState([
    {
      id: '1',
      type: 'job',
      title: 'Python Data Scientist Intern',
      company: 'DataFlow Analytics',
      companyLogo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
      jobType: 'internship',
      workType: 'hybrid',
      location: 'New York, NY',
      salary: '$25/hour',
      description: 'Join our data science team as an intern and work on real-world machine learning projects.',
      skills: ['python', 'data-science'],
      applicants: 23,
      savedDate: new Date(Date.now() - 172800000)
    },
    {
      id: '2',
      type: 'job',
      title: 'Junior Full Stack Developer',
      company: 'WebSolutions Ltd.',
      companyLogo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      jobType: 'full-time',
      workType: 'onsite',
      location: 'Austin, TX',
      salary: '$70k - $90k',
      description: 'Great opportunity for a junior developer to grow their skills in a supportive environment.',
      skills: ['javascript', 'nodejs', 'react'],
      applicants: 89,
      savedDate: new Date(Date.now() - 259200000)
    }
  ]);

  const [tempData, setTempData] = useState(profileData);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !tempData.skills.includes(newSkill.trim().toLowerCase())) {
      setTempData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim().toLowerCase()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setTempData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !tempData.interests.includes(newInterest.trim())) {
      setTempData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setTempData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
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

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'internship': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkTypeColor = (workType: string) => {
    switch (workType) {
      case 'remote': return 'bg-blue-100 text-blue-800';
      case 'onsite': return 'bg-gray-100 text-gray-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'activity', label: 'Activity', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center gap-6">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={profileData.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
            
            <p className="text-blue-100 text-lg mb-2">@{profileData.username}</p>
            
            <div className="flex items-center gap-4 text-blue-100">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {profileData.joinedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(currentUser.rating || 4.0)}
                <span className="ml-1">({currentUser.rating || 4.0})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => setTempData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={tempData.username}
                onChange={(e) => setTempData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={tempData.email}
                onChange={(e) => setTempData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={tempData.location}
                onChange={(e) => setTempData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={tempData.bio}
                onChange={(e) => setTempData(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={tempData.website}
                onChange={(e) => setTempData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tempData.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add a skill"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interests Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tempData.interests.map((interest) => (
                <span
                  key={interest}
                  className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                placeholder="Add an interest"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addInterest}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Info Cards */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-700 mb-4">{profileData.bio}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{profileData.location}</span>
              </div>
              {profileData.website && (
                <div className="flex items-center gap-3 text-gray-600">
                  <User className="h-4 w-4" />
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {profileData.website}
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
                {profileData.skills.map((skill) => (
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
                {profileData.interests.map((interest) => (
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
        </div>
      )}

      {/* Stats */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Connections</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSaved = () => {
    const allSaved = [
      ...savedPosts.map(post => ({ ...post, type: 'post' })),
      ...savedJobs.map(job => ({ ...job, type: 'job' }))
    ].sort((a, b) => b.savedDate.getTime() - a.savedDate.getTime());

    const filteredSaved = allSaved.filter(item => {
      if (savedFilter === 'all') return true;
      if (savedFilter === 'posts') return item.type === 'post';
      if (savedFilter === 'jobs') return item.type === 'job';
      return true;
    });

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookmarkCheck className="h-6 w-6 text-yellow-600" />
            Saved Items ({filteredSaved.length})
          </h2>
          
          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSavedFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                savedFilter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({allSaved.length})
            </button>
            <button
              onClick={() => setSavedFilter('posts')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                savedFilter === 'posts'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Posts ({savedPosts.length})
            </button>
            <button
              onClick={() => setSavedFilter('jobs')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                savedFilter === 'jobs'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Jobs ({savedJobs.length})
            </button>
          </div>
        </div>

        {/* Saved Items */}
        {filteredSaved.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No saved {savedFilter === 'all' ? 'items' : savedFilter} yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Start saving {savedFilter === 'all' ? 'posts and jobs' : savedFilter} to view them here!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSaved.map((item) => (
              <div key={`${item.type}-${item.id}`} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                {item.type === 'post' ? (
                  // Saved Post
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.author.avatar}
                          alt={item.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.author.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.author.role === 'mentor' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {item.author.role}
                            </span>
                            <span className="text-xs text-gray-500">
                              Saved {formatTimeAgo(item.savedDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200">
                        <BookmarkCheck className="h-5 w-5 fill-current" />
                      </button>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-3">{item.content}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{item.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{item.comments} comments</span>
                      </div>
                      <span>Posted {formatTimeAgo(item.timestamp)}</span>
                    </div>
                  </div>
                ) : (
                  // Saved Job
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.companyLogo}
                          alt={item.company}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                          <p className="text-gray-700 font-medium">{item.company}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(item.jobType)}`}>
                              {item.jobType.replace('-', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(item.workType)}`}>
                              {item.workType}
                            </span>
                            <span className="text-xs text-gray-500">
                              Saved {formatTimeAgo(item.savedDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200">
                        <BookmarkCheck className="h-5 w-5 fill-current" />
                      </button>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{item.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{item.applicants} applicants</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                          +{item.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAchievements = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profileData.achievements.map((achievement) => (
          <div key={achievement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Posted a new question about React hooks</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Connected with Sarah Wilson</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Completed mentoring session with John Doe</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      {/* Privacy Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Profile Visibility</p>
              <p className="text-sm text-gray-600">Control who can see your profile</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Everyone</option>
              <option>Connections Only</option>
              <option>Private</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Online Status</p>
              <p className="text-sm text-gray-600">Let others see when you're online</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive push notifications</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            Download My Data
          </button>
          <button className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors duration-200">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex space-x-1">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'saved' && renderSaved()}
      {activeSection === 'achievements' && renderAchievements()}
      {activeSection === 'activity' && renderActivity()}
      {activeSection === 'settings' && renderSettings()}
    </div>
  );
};

export default MyProfile;