import React, { useState } from 'react';
import { MessageCircle, Users, Star, MapPin, Clock, UserPlus, UserCheck, Eye } from 'lucide-react';
import UniversalSearchFilters from './UniversalSearchFilters';
import { useUniversalFilters } from '../hooks/useUniversalFilters';
import { User } from '../types';

interface Connection {
  id: string;
  name: string;
  avatar: string;
}

interface UserWithConnections extends User {
  bio?: string;
  location?: string;
  joinedDate?: Date;
  mutualConnections?: Connection[];
  isConnected?: boolean;
  connectionStatus?: 'none' | 'pending' | 'connected';
}

interface DiscoverUsersProps {
  currentUser: User;
}

const DiscoverUsers: React.FC<DiscoverUsersProps> = ({ currentUser }) => {
  const [users] = useState<UserWithConnections[]>([
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: true,
      skills: ['react', 'javascript', 'typescript'],
      rating: 4.8,
      availability: 'available',
      bio: 'Senior Frontend Developer with 8+ years of experience. Passionate about teaching React and modern web development.',
      location: 'San Francisco, CA',
      joinedDate: new Date('2023-01-15'),
      connectionStatus: 'none',
      mutualConnections: [
        { id: 'm1', name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' },
        { id: 'm2', name: 'Mike Chen', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=50' },
        { id: 'm3', name: 'Emma Davis', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50' }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: true,
      skills: ['python', 'javascript', 'data-science'],
      rating: 4.2,
      availability: 'available',
      bio: 'Computer Science student passionate about data science and machine learning. Always eager to learn!',
      location: 'New York, NY',
      joinedDate: new Date('2023-03-20'),
      connectionStatus: 'pending',
      mutualConnections: [
        { id: 'm4', name: 'Alex Rodriguez', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50' },
        { id: 'm5', name: 'Lisa Park', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' }
      ]
    },
    {
      id: '3',
      name: 'Alice Brown',
      username: 'alicebrown',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: false,
      skills: ['python', 'react', 'typescript', 'nodejs'],
      rating: 4.5,
      availability: 'busy',
      bio: 'Full-stack developer and product manager. Love helping others transition into tech careers.',
      location: 'Austin, TX',
      joinedDate: new Date('2022-11-10'),
      connectionStatus: 'connected',
      mutualConnections: [
        { id: 'm6', name: 'David Kim', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50' }
      ]
    },
    {
      id: '4',
      name: 'Carlos Martinez',
      username: 'carlosm',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: true,
      skills: ['javascript', 'react', 'nodejs'],
      rating: 3.9,
      availability: 'available',
      bio: 'Bootcamp graduate looking to break into the tech industry. Focused on frontend development.',
      location: 'Los Angeles, CA',
      joinedDate: new Date('2023-06-01'),
      connectionStatus: 'none',
      mutualConnections: []
    },
    {
      id: '5',
      name: 'Dr. Emily Watson',
      username: 'emilywatson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: true,
      skills: ['python', 'typescript', 'data-science'],
      rating: 4.9,
      availability: 'available',
      bio: 'PhD in Computer Science, specializing in AI/ML. 15+ years of industry experience at top tech companies.',
      location: 'Seattle, WA',
      joinedDate: new Date('2022-08-15'),
      connectionStatus: 'none',
      mutualConnections: [
        { id: 'm7', name: 'Robert Johnson', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50' },
        { id: 'm8', name: 'Maria Garcia', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=50' },
        { id: 'm9', name: 'James Wilson', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50' },
        { id: 'm10', name: 'Anna Lee', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' }
      ]
    },
    {
      id: '6',
      name: 'Michael Chang',
      username: 'michaelchang',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: false,
      skills: ['python', 'data-science'],
      rating: 3.7,
      availability: 'offline',
      bio: 'Data science enthusiast transitioning from finance. Love working with Python and machine learning.',
      location: 'Chicago, IL',
      joinedDate: new Date('2023-04-12'),
      connectionStatus: 'none',
      mutualConnections: [
        { id: 'm11', name: 'Jennifer Liu', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' }
      ]
    }
  ]);

  const {
    filteredItems: filteredUsers,
    sortBy,
    setSortBy,
    roleFilter,
    setRoleFilter,
    skillFilter,
    setSkillFilter,
    ratingFilter,
    setRatingFilter,
    availabilityFilter,
    setAvailabilityFilter,
    searchQuery,
    setSearchQuery
  } = useUniversalFilters(users, 'rating');

  const [connectionStates, setConnectionStates] = useState<Record<string, 'none' | 'pending' | 'connected'>>(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.connectionStatus || 'none' }), {})
  );

  const handleConnect = (userId: string) => {
    setConnectionStates(prev => ({
      ...prev,
      [userId]: prev[userId] === 'none' ? 'pending' : 'none'
    }));
  };

  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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

  const getConnectionButton = (user: UserWithConnections) => {
    const status = connectionStates[user.id];
    
    switch (status) {
      case 'connected':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium cursor-default">
            <UserCheck className="h-4 w-4" />
            Connected
          </button>
        );
      case 'pending':
        return (
          <button 
            onClick={() => handleConnect(user.id)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200 transition-colors duration-200"
          >
            <Clock className="h-4 w-4" />
            Pending
          </button>
        );
      default:
        return (
          <button 
            onClick={() => handleConnect(user.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            <UserPlus className="h-4 w-4" />
            Connect
          </button>
        );
    }
  };

  const renderMutualConnections = (connections: Connection[]) => {
    if (!connections || connections.length === 0) return null;

    const displayConnections = connections.slice(0, 3);
    const remainingCount = connections.length - 3;

    return (
      <div className="flex items-center gap-2 mt-3 p-3 bg-blue-50 rounded-lg">
        <Users className="h-4 w-4 text-blue-600" />
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {displayConnections.map((connection) => (
              <img
                key={connection.id}
                src={connection.avatar}
                alt={connection.name}
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-blue-700 ml-2">
            {connections.length === 1 
              ? `1 mutual connection`
              : `${connections.length} mutual connections`
            }
            {remainingCount > 0 && ` (+${remainingCount} more)`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Users</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect, share, and learn with students and professionals on Sama. Find mentors, peers, and build your network.
        </p>
      </div>

      {/* Universal Search and Filters */}
      <UniversalSearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        skillFilter={skillFilter}
        onSkillFilterChange={setSkillFilter}
        ratingFilter={ratingFilter}
        onRatingFilterChange={setRatingFilter}
        availabilityFilter={availabilityFilter}
        onAvailabilityFilterChange={setAvailabilityFilter}
        placeholder="Search users by name, skills, or expertise..."
        context="discover"
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'} Found
        </h2>
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No users found matching your criteria</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              {/* User Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'mentor' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.availability === 'available' 
                        ? 'bg-green-100 text-green-800'
                        : user.availability === 'busy'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.availability}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(user.rating || 0)}
                    <span className="text-sm text-gray-600 ml-1">({user.rating})</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{user.bio}</p>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {user.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {user.skills && user.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                      +{user.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Location and Join Date */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.joinedDate && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Joined {formatJoinDate(user.joinedDate)}</span>
                  </div>
                )}
              </div>

              {/* Mutual Connections */}
              {renderMutualConnections(user.mutualConnections || [])}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex-1">
                  <Eye className="h-4 w-4" />
                  View Profile
                </button>
                {getConnectionButton(user)}
              </div>

              {/* Message Button */}
              <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                <MessageCircle className="h-4 w-4" />
                Message
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center py-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
          Load More Users
        </button>
      </div>
    </div>
  );
};

export default DiscoverUsers;