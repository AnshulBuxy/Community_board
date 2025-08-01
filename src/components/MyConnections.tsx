import React, { useState } from 'react';
import { MessageCircle, Users, Star, MapPin, Clock, UserMinus, Eye } from 'lucide-react';
import UniversalSearchFilters from './UniversalSearchFilters';
import { useUniversalFilters } from '../hooks/useUniversalFilters';
import { User } from '../types';

interface ConnectionUser extends User {
  bio?: string;
  location?: string;
  joinedDate?: Date;
  connectionDate?: Date;
  lastActive?: Date;
  mutualConnections?: number;
}

interface MyConnectionsProps {
  currentUser: User;
}

const MyConnections: React.FC<MyConnectionsProps> = ({ currentUser }) => {
  const [connections] = useState<ConnectionUser[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      username: 'sarahwilson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: true,
      skills: ['react', 'javascript', 'typescript'],
      rating: 4.8,
      availability: 'available',
      bio: 'Senior React Developer at Google. Love mentoring aspiring developers.',
      location: 'Mountain View, CA',
      joinedDate: new Date('2022-08-15'),
      connectionDate: new Date('2023-09-20'),
      lastActive: new Date(Date.now() - 1800000), // 30 minutes ago
      mutualConnections: 12
    },
    {
      id: '2',
      name: 'Mike Chen',
      username: 'mikechen',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: true,
      skills: ['python', 'data-science'],
      rating: 4.2,
      availability: 'available',
      bio: 'Data Science bootcamp graduate. Currently working on ML projects.',
      location: 'San Francisco, CA',
      joinedDate: new Date('2023-02-10'),
      connectionDate: new Date('2023-08-15'),
      lastActive: new Date(Date.now() - 3600000), // 1 hour ago
      mutualConnections: 8
    },
    {
      id: '3',
      name: 'Emma Davis',
      username: 'emmadavis',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: false,
      skills: ['python', 'react', 'nodejs'],
      rating: 4.6,
      availability: 'busy',
      bio: 'Full-stack engineer with 6 years experience. Passionate about clean code.',
      location: 'Austin, TX',
      joinedDate: new Date('2022-11-20'),
      connectionDate: new Date('2023-07-10'),
      lastActive: new Date(Date.now() - 7200000), // 2 hours ago
      mutualConnections: 15
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      username: 'alexrodriguez',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: true,
      skills: ['javascript', 'react'],
      rating: 3.9,
      availability: 'available',
      bio: 'Frontend developer learning React. Always excited to collaborate!',
      location: 'New York, NY',
      joinedDate: new Date('2023-04-05'),
      connectionDate: new Date('2023-06-25'),
      lastActive: new Date(Date.now() - 900000), // 15 minutes ago
      mutualConnections: 5
    },
    {
      id: '5',
      name: 'Dr. Lisa Park',
      username: 'lisapark',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: false,
      skills: ['python', 'data-science', 'typescript'],
      rating: 4.9,
      availability: 'offline',
      bio: 'PhD in Computer Science. Research scientist specializing in AI/ML.',
      location: 'Boston, MA',
      joinedDate: new Date('2022-06-12'),
      connectionDate: new Date('2023-05-18'),
      lastActive: new Date(Date.now() - 86400000), // 1 day ago
      mutualConnections: 22
    }
  ]);

  const {
    filteredItems: filteredConnections,
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
  } = useUniversalFilters(connections, 'recent');

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Connections</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage and interact with your professional network. Stay connected with mentors and peers.
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
        placeholder="Search your connections by name, skills, or location..."
        context="connections"
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredConnections.length} {filteredConnections.length === 1 ? 'Connection' : 'Connections'}
        </h2>
      </div>

      {/* Connections Grid - More Concise */}
      {filteredConnections.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No connections found matching your criteria</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.map((connection) => (
            <div key={connection.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
              {/* User Header - Compact */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {connection.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base truncate">{connection.name}</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      connection.role === 'mentor' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {connection.role}
                    </span>
                    <div className="flex items-center gap-1">
                      {renderStars(connection.rating || 0)}
                      <span className="text-xs text-gray-600">({connection.rating})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio - Single line */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-1">{connection.bio}</p>

              {/* Skills - Limited to 2 */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {connection.skills?.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {connection.skills && connection.skills.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                      +{connection.skills.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Info - Compact */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{connection.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{connection.mutualConnections} mutual</span>
                </div>
              </div>

              {/* Last Active */}
              {connection.lastActive && (
                <div className="text-xs text-gray-400 mb-3">
                  Active {formatTimeAgo(connection.lastActive)}
                </div>
              )}

              {/* Action Buttons - Simplified */}
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex-1">
                  <MessageCircle className="h-3 w-3" />
                  Message
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                  <Eye className="h-3 w-3" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyConnections;