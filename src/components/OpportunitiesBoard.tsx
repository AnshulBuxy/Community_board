import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Users, Star, ExternalLink, Bookmark, BookmarkCheck, Building, Wifi, UserCheck } from 'lucide-react';
import UniversalSearchFilters from './UniversalSearchFilters';
import { useUniversalFilters } from '../hooks/useUniversalFilters';
import { User } from '../types';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  workType: 'remote' | 'onsite' | 'hybrid';
  field: 'tech' | 'marketing' | 'design' | 'finance' | 'sales' | 'operations';
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: Date;
  deadline?: Date;
  applicants: number;
  isSaved: boolean;
  poster: User;
  connectionInsights?: {
    appliedCount: number;
    hiredCount: number;
    connectionNames: string[];
  };
}

interface OpportunitiesBoardProps {
  currentUser: User;
}

const OpportunitiesBoard: React.FC<OpportunitiesBoardProps> = ({ currentUser }) => {
  const [opportunities] = useState<Opportunity[]>([
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      companyLogo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      type: 'full-time',
      workType: 'remote',
      field: 'tech',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      description: 'We are looking for a Senior React Developer to join our growing team. You will be responsible for developing and maintaining our web applications using React, TypeScript, and modern web technologies.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership experience'],
      skills: ['react', 'typescript', 'javascript'],
      postedDate: new Date(Date.now() - 86400000), // 1 day ago
      deadline: new Date(Date.now() + 2592000000), // 30 days from now
      applicants: 45,
      isSaved: false,
      poster: {
        id: 'hr1',
        name: 'Sarah Johnson',
        username: 'sarahjohnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'mentor',
        isOnline: true,
        rating: 4.8,
        availability: 'available'
      },
      connectionInsights: {
        appliedCount: 3,
        hiredCount: 0,
        connectionNames: ['Alex Rodriguez', 'Maria Garcia', 'David Kim']
      }
    },
    {
      id: '2',
      title: 'Python Data Scientist Intern',
      company: 'DataFlow Analytics',
      companyLogo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
      type: 'internship',
      workType: 'hybrid',
      field: 'tech',
      location: 'New York, NY',
      salary: '$25/hour',
      description: 'Join our data science team as an intern and work on real-world machine learning projects. Perfect opportunity for students looking to gain hands-on experience.',
      requirements: ['Python programming', 'Statistics knowledge', 'Currently enrolled in university'],
      skills: ['python', 'data-science'],
      postedDate: new Date(Date.now() - 172800000), // 2 days ago
      deadline: new Date(Date.now() + 1296000000), // 15 days from now
      applicants: 23,
      isSaved: true,
      poster: {
        id: 'hr2',
        name: 'Mike Chen',
        username: 'mikechen',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'mentor',
        isOnline: false,
        rating: 4.6,
        availability: 'busy'
      },
      connectionInsights: {
        appliedCount: 1,
        hiredCount: 1,
        connectionNames: ['Jennifer Liu']
      }
    },
    {
      id: '3',
      title: 'Frontend Developer (Remote)',
      company: 'StartupXYZ',
      companyLogo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      type: 'contract',
      workType: 'remote',
      field: 'tech',
      location: 'Remote',
      salary: '$80k - $100k',
      description: 'We need a talented frontend developer to help build our next-generation web application. Work with a small, agile team in a fast-paced startup environment.',
      requirements: ['3+ years frontend experience', 'React/Vue.js expertise', 'Startup experience preferred'],
      skills: ['react', 'javascript', 'typescript'],
      postedDate: new Date(Date.now() - 259200000), // 3 days ago
      deadline: new Date(Date.now() + 1728000000), // 20 days from now
      applicants: 67,
      isSaved: false,
      poster: {
        id: 'hr3',
        name: 'Emma Davis',
        username: 'emmadavis',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'mentor',
        isOnline: true,
        rating: 4.7,
        availability: 'available'
      }
    },
    {
      id: '4',
      title: 'Junior Full Stack Developer',
      company: 'WebSolutions Ltd.',
      companyLogo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      type: 'full-time',
      workType: 'onsite',
      field: 'tech',
      location: 'Austin, TX',
      salary: '$70k - $90k',
      description: 'Great opportunity for a junior developer to grow their skills in a supportive environment. You\'ll work on both frontend and backend technologies.',
      requirements: ['1-2 years experience', 'JavaScript proficiency', 'Eagerness to learn'],
      skills: ['javascript', 'nodejs', 'react'],
      postedDate: new Date(Date.now() - 345600000), // 4 days ago
      deadline: new Date(Date.now() + 2160000000), // 25 days from now
      applicants: 89,
      isSaved: true,
      poster: {
        id: 'hr4',
        name: 'Alex Rodriguez',
        username: 'alexrodriguez',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'mentor',
        isOnline: true,
        rating: 4.5,
        availability: 'available'
      }
    },
    {
      id: '5',
      title: 'Marketing Manager',
      company: 'BrandCorp',
      companyLogo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      type: 'full-time',
      workType: 'hybrid',
      field: 'marketing',
      location: 'Los Angeles, CA',
      salary: '$85k - $110k',
      description: 'Lead our marketing initiatives and drive brand growth. Perfect for someone with digital marketing experience and creative vision.',
      requirements: ['3+ years marketing experience', 'Digital marketing expertise', 'Analytics skills'],
      skills: ['marketing', 'analytics', 'content-creation'],
      postedDate: new Date(Date.now() - 432000000), // 5 days ago
      deadline: new Date(Date.now() + 1728000000), // 20 days from now
      applicants: 34,
      isSaved: false,
      poster: {
        id: 'hr5',
        name: 'Lisa Park',
        username: 'lisapark',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'mentor',
        isOnline: true,
        rating: 4.4,
        availability: 'available'
      },
      connectionInsights: {
        appliedCount: 2,
        hiredCount: 0,
        connectionNames: ['Sarah Wilson', 'Emma Davis']
      }
    }
  ]);

  // Additional filter states for job-specific filters
  const [workTypeFilter, setWorkTypeFilter] = useState<'all' | 'remote' | 'onsite' | 'hybrid'>('all');
  const [fieldFilter, setFieldFilter] = useState<'all' | 'tech' | 'marketing' | 'design' | 'finance' | 'sales' | 'operations'>('all');

  const {
    filteredItems: filteredOpportunities,
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
  } = useUniversalFilters(opportunities.map(opp => ({
    ...opp,
    name: opp.title,
    username: opp.company,
    role: 'mentor' as const,
    isOnline: true,
    timestamp: opp.postedDate,
    likes: opp.applicants,
    comments: 0,
    author: opp.poster
  })), 'recent');

  const [savedStates, setSavedStates] = useState<Record<string, boolean>>(
    opportunities.reduce((acc, opp) => ({ ...acc, [opp.id]: opp.isSaved }), {})
  );

  const handleToggleSave = (opportunityId: string) => {
    setSavedStates(prev => ({ ...prev, [opportunityId]: !prev[opportunityId] }));
  };

  // Apply additional filters
  const finalFilteredOpportunities = filteredOpportunities
    .map(filtered => opportunities.find(opp => opp.id === filtered.id)!)
    .filter(opp => {
      if (workTypeFilter !== 'all' && opp.workType !== workTypeFilter) return false;
      if (fieldFilter !== 'all' && opp.field !== fieldFilter) return false;
      return true;
    });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return 'Deadline passed';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const getTypeColor = (type: string) => {
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

  const getFieldColor = (field: string) => {
    switch (field) {
      case 'tech': return 'bg-indigo-100 text-indigo-800';
      case 'marketing': return 'bg-pink-100 text-pink-800';
      case 'design': return 'bg-yellow-100 text-yellow-800';
      case 'finance': return 'bg-green-100 text-green-800';
      case 'sales': return 'bg-red-100 text-red-800';
      case 'operations': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderConnectionInsights = (insights?: Opportunity['connectionInsights']) => {
    if (!insights || (insights.appliedCount === 0 && insights.hiredCount === 0)) return null;

    return (
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">From your network:</span>
        </div>
        <div className="space-y-1 text-sm text-blue-700">
          {insights.appliedCount > 0 && (
            <div className="flex items-center gap-1">
              <span>{insights.appliedCount} connection{insights.appliedCount > 1 ? 's' : ''} applied</span>
            </div>
          )}
          {insights.hiredCount > 0 && (
            <div className="flex items-center gap-1">
              <UserCheck className="h-3 w-3 text-green-600" />
              <span className="text-green-700">{insights.hiredCount} connection{insights.hiredCount > 1 ? 's' : ''} hired</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Opportunities Board</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover job opportunities, internships, and projects. Connect with companies and grow your career.
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
        placeholder="Search opportunities by title, company, skills, or location..."
        context="opportunities"
      />

      {/* Job-Specific Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <Briefcase className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Job Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Work Type Filter */}
          <div className="relative">
            <select
              value={workTypeFilter}
              onChange={(e) => setWorkTypeFilter(e.target.value as any)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Work Types</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <Wifi className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Field Filter */}
          <div className="relative">
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value as any)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Fields</option>
              <option value="tech">Technology</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
              <option value="finance">Finance</option>
              <option value="sales">Sales</option>
              <option value="operations">Operations</option>
            </select>
            <Building className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Active Job Filters Display */}
        {(workTypeFilter !== 'all' || fieldFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-500 py-1">Job filters:</span>
            {workTypeFilter !== 'all' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                {workTypeFilter.charAt(0).toUpperCase() + workTypeFilter.slice(1)}
              </span>
            )}
            {fieldFilter !== 'all' && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                {fieldFilter.charAt(0).toUpperCase() + fieldFilter.slice(1)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {finalFilteredOpportunities.length} {finalFilteredOpportunities.length === 1 ? 'Opportunity' : 'Opportunities'} Found
        </h2>
      </div>

      {/* Opportunities List */}
      {finalFilteredOpportunities.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No opportunities found matching your criteria</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="space-y-6">
          {finalFilteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={opportunity.companyLogo}
                    alt={opportunity.company}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{opportunity.title}</h3>
                    <p className="text-lg text-gray-700 font-medium">{opportunity.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(opportunity.type)}`}>
                        {opportunity.type.replace('-', ' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkTypeColor(opportunity.workType)}`}>
                        {opportunity.workType}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFieldColor(opportunity.field)}`}>
                        {opportunity.field}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleToggleSave(opportunity.id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    savedStates[opportunity.id]
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {savedStates[opportunity.id] ? (
                    <BookmarkCheck className="h-5 w-5 fill-current" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Connection Insights */}
              {renderConnectionInsights(opportunity.connectionInsights)}

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{opportunity.location}</span>
                </div>
                {opportunity.salary && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{opportunity.salary}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{opportunity.applicants} applicants</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">{opportunity.description}</p>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {formatTimeAgo(opportunity.postedDate)}</span>
                  </div>
                  {opportunity.deadline && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className={opportunity.deadline.getTime() - Date.now() < 604800000 ? 'text-red-600 font-medium' : ''}>
                        {formatDeadline(opportunity.deadline)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={opportunity.poster.avatar}
                      alt={opportunity.poster.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">Posted by {opportunity.poster.name}</span>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
                    <ExternalLink className="h-4 w-4" />
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center py-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
          Load More Opportunities
        </button>
      </div>
    </div>
  );
};

export default OpportunitiesBoard;