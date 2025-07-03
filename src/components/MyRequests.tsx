import React, { useState } from 'react';
import { MessageCircle, Users, Star, Clock, UserPlus, UserCheck, X, CheckCircle } from 'lucide-react';
import UniversalSearchFilters from './UniversalSearchFilters';
import { useUniversalFilters } from '../hooks/useUniversalFilters';
import { User } from '../types';

interface RequestUser extends User {
  bio?: string;
  location?: string;
  requestDate?: Date;
  requestType: 'sent' | 'received';
  message?: string;
}

interface MyRequestsProps {
  currentUser: User;
}

const MyRequests: React.FC<MyRequestsProps> = ({ currentUser }) => {
  const [requests] = useState<RequestUser[]>([
    {
      id: '1',
      name: 'Jennifer Liu',
      username: 'jenniferliu',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: true,
      skills: ['react', 'javascript', 'typescript'],
      rating: 4.7,
      availability: 'available',
      bio: 'Senior Frontend Engineer at Meta. Passionate about React and modern web development.',
      location: 'Menlo Park, CA',
      requestDate: new Date(Date.now() - 3600000), // 1 hour ago
      requestType: 'received',
      message: 'Hi! I saw your profile and would love to connect. I\'m interested in learning more about React best practices.'
    },
    {
      id: '2',
      name: 'David Kim',
      username: 'davidkim',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: false,
      skills: ['python', 'data-science'],
      rating: 4.1,
      availability: 'busy',
      bio: 'Data science student at Stanford. Working on machine learning projects.',
      location: 'Palo Alto, CA',
      requestDate: new Date(Date.now() - 7200000), // 2 hours ago
      requestType: 'received',
      message: 'Hello! I\'m a data science student and would appreciate any guidance you could offer.'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      username: 'mariagarcia',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: true,
      skills: ['python', 'react', 'nodejs'],
      rating: 4.8,
      availability: 'available',
      bio: 'Full-stack developer with 8 years experience. Love mentoring junior developers.',
      location: 'Seattle, WA',
      requestDate: new Date(Date.now() - 86400000), // 1 day ago
      requestType: 'sent',
      message: 'Hi Maria! I\'d love to connect and learn from your experience in full-stack development.'
    },
    {
      id: '4',
      name: 'James Wilson',
      username: 'jameswilson',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: true,
      skills: ['javascript', 'react'],
      rating: 3.8,
      availability: 'available',
      bio: 'Bootcamp graduate transitioning into tech. Focused on frontend development.',
      location: 'Portland, OR',
      requestDate: new Date(Date.now() - 172800000), // 2 days ago
      requestType: 'sent',
      message: 'Hello! I\'m new to React and would love to connect with experienced developers.'
    },
    {
      id: '5',
      name: 'Anna Lee',
      username: 'annalee',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: false,
      skills: ['python', 'data-science', 'typescript'],
      rating: 4.9,
      availability: 'offline',
      bio: 'Senior Data Scientist at Google. PhD in Statistics with 10+ years experience.',
      location: 'Mountain View, CA',
      requestDate: new Date(Date.now() - 259200000), // 3 days ago
      requestType: 'received',
      message: 'Hi! I\'m interested in data science mentorship and would love to learn from your expertise.'
    }
  ]);

  const {
    filteredItems: filteredRequests,
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
  } = useUniversalFilters(requests, 'recent');

  const [requestStates, setRequestStates] = useState<Record<string, 'pending' | 'accepted' | 'declined'>>(
    requests.reduce((acc, request) => ({ ...acc, [request.id]: 'pending' }), {})
  );

  const handleAcceptRequest = (requestId: string) => {
    setRequestStates(prev => ({ ...prev, [requestId]: 'accepted' }));
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequestStates(prev => ({ ...prev, [requestId]: 'declined' }));
  };

  const handleCancelRequest = (requestId: string) => {
    setRequestStates(prev => ({ ...prev, [requestId]: 'declined' }));
  };

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

  const renderActionButtons = (request: RequestUser) => {
    const state = requestStates[request.id];

    if (state === 'accepted') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
          <CheckCircle className="h-3 w-3" />
          Connected
        </div>
      );
    }

    if (state === 'declined') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
          <X className="h-3 w-3" />
          {request.requestType === 'received' ? 'Declined' : 'Cancelled'}
        </div>
      );
    }

    if (request.requestType === 'received') {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleAcceptRequest(request.id)}
            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors duration-200"
          >
            <UserCheck className="h-3 w-3" />
            Accept
          </button>
          <button
            onClick={() => handleDeclineRequest(request.id)}
            className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      );
    }

    // Sent request
    return (
      <button
        onClick={() => handleCancelRequest(request.id)}
        className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors duration-200"
      >
        <Clock className="h-3 w-3" />
        Pending
      </button>
    );
  };

  const receivedRequests = filteredRequests.filter(r => r.requestType === 'received');
  const sentRequests = filteredRequests.filter(r => r.requestType === 'sent');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Requests</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your connection requests. Accept new connections and track your sent requests.
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
        placeholder="Search requests by name, skills, or message..."
        context="requests"
      />

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <div className="flex-1 text-center py-2 bg-white rounded-md shadow-sm">
          <span className="font-medium text-gray-900">Received ({receivedRequests.length})</span>
        </div>
        <div className="flex-1 text-center py-2">
          <span className="font-medium text-gray-600">Sent ({sentRequests.length})</span>
        </div>
      </div>

      {/* Received Requests - Concise Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Received Requests</h2>
        
        {receivedRequests.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Users className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No received requests found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {receivedRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {request.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{request.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          request.role === 'mentor' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {request.role}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(request.requestDate!)}
                        </span>
                      </div>
                      {renderActionButtons(request)}
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(request.rating || 0)}
                      <span className="text-xs text-gray-600">({request.rating})</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{request.bio}</p>
                    
                    {request.message && (
                      <div className="bg-blue-50 p-2 rounded-lg mb-2">
                        <p className="text-xs text-gray-700 italic line-clamp-2">"{request.message}"</p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {request.skills?.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {request.skills && request.skills.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                          +{request.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sent Requests - Concise Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Sent Requests</h2>
        
        {sentRequests.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Users className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No sent requests found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sentRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {request.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{request.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          request.role === 'mentor' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {request.role}
                        </span>
                        <span className="text-xs text-gray-500">
                          Sent {formatTimeAgo(request.requestDate!)}
                        </span>
                      </div>
                      {renderActionButtons(request)}
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(request.rating || 0)}
                      <span className="text-xs text-gray-600">({request.rating})</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{request.bio}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {request.skills?.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {request.skills && request.skills.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                          +{request.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;