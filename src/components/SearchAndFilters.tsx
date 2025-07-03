import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Clock, TrendingUp, MessageCircle, Filter, Star, Users, Code, Wifi } from 'lucide-react';
import { SortOption, RoleFilter, SkillFilter, RatingFilter, AvailabilityFilter } from '../types';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  roleFilter: RoleFilter;
  onRoleFilterChange: (filter: RoleFilter) => void;
  skillFilter: SkillFilter;
  onSkillFilterChange: (filter: SkillFilter) => void;
  ratingFilter: RatingFilter;
  onRatingFilterChange: (filter: RatingFilter) => void;
  availabilityFilter: AvailabilityFilter;
  onAvailabilityFilterChange: (filter: AvailabilityFilter) => void;
}

interface DropdownProps {
  label: string;
  value: string;
  options: { id: string; label: string; icon?: React.ComponentType<any> }[];
  onChange: (value: any) => void;
  icon?: React.ComponentType<any>;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[140px] justify-between"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-gray-500" />}
          <span className="text-sm font-medium text-gray-700">{label}:</span>
          <span className="text-sm text-gray-900">{selectedOption?.label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {options.map(option => {
            const OptionIcon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  value === option.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                {OptionIcon && <OptionIcon className="h-4 w-4" />}
                <span className="text-sm">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  roleFilter,
  onRoleFilterChange,
  skillFilter,
  onSkillFilterChange,
  ratingFilter,
  onRatingFilterChange,
  availabilityFilter,
  onAvailabilityFilterChange
}) => {
  const sortOptions = [
    { id: 'recent' as SortOption, label: 'Recent', icon: Clock },
    { id: 'most-liked' as SortOption, label: 'Most Liked', icon: TrendingUp },
    { id: 'most-commented' as SortOption, label: 'Most Commented', icon: MessageCircle }
  ];

  const roleOptions = [
    { id: 'all' as RoleFilter, label: 'All Roles', icon: Users },
    { id: 'mentor' as RoleFilter, label: 'Mentors', icon: Users },
    { id: 'student' as RoleFilter, label: 'Students', icon: Users },
    { id: 'both' as RoleFilter, label: 'Both', icon: Users }
  ];

  const skillOptions = [
    { id: 'all' as SkillFilter, label: 'All Skills', icon: Code },
    { id: 'python' as SkillFilter, label: 'Python', icon: Code },
    { id: 'react' as SkillFilter, label: 'React', icon: Code },
    { id: 'javascript' as SkillFilter, label: 'JavaScript', icon: Code },
    { id: 'typescript' as SkillFilter, label: 'TypeScript', icon: Code }
  ];

  const ratingOptions = [
    { id: 'all' as RatingFilter, label: 'All Ratings', icon: Star },
    { id: '4+' as RatingFilter, label: '4+ Stars', icon: Star },
    { id: '3+' as RatingFilter, label: '3+ Stars', icon: Star },
    { id: '2+' as RatingFilter, label: '2+ Stars', icon: Star }
  ];

  const availabilityOptions = [
    { id: 'all' as AvailabilityFilter, label: 'All Status', icon: Wifi },
    { id: 'available' as AvailabilityFilter, label: 'Available', icon: Wifi },
    { id: 'busy' as AvailabilityFilter, label: 'Busy', icon: Wifi },
    { id: 'offline' as AvailabilityFilter, label: 'Offline', icon: Wifi }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts, users, skills, requests..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Filters Section */}
      <div className="space-y-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Sort & Filter:</span>
        </div>

        {/* First Row - Sort and Role */}
        <div className="flex flex-wrap gap-3">
          <Dropdown
            label="Sort"
            value={sortBy}
            options={sortOptions}
            onChange={onSortChange}
            icon={TrendingUp}
          />
          
          <Dropdown
            label="Role"
            value={roleFilter}
            options={roleOptions}
            onChange={onRoleFilterChange}
            icon={Users}
          />
          
          <Dropdown
            label="Skill"
            value={skillFilter}
            options={skillOptions}
            onChange={onSkillFilterChange}
            icon={Code}
          />
        </div>

        {/* Second Row - Rating and Availability */}
        <div className="flex flex-wrap gap-3">
          <Dropdown
            label="Rating"
            value={ratingFilter}
            options={ratingOptions}
            onChange={onRatingFilterChange}
            icon={Star}
          />
          
          <Dropdown
            label="Status"
            value={availabilityFilter}
            options={availabilityOptions}
            onChange={onAvailabilityFilterChange}
            icon={Wifi}
          />
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(sortBy !== 'recent' || roleFilter !== 'all' || skillFilter !== 'all' || ratingFilter !== 'all' || availabilityFilter !== 'all') && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Active filters:</span>
              {sortBy !== 'recent' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  {sortOptions.find(opt => opt.id === sortBy)?.label}
                </span>
              )}
              {roleFilter !== 'all' && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                  {roleOptions.find(opt => opt.id === roleFilter)?.label}
                </span>
              )}
              {skillFilter !== 'all' && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {skillOptions.find(opt => opt.id === skillFilter)?.label}
                </span>
              )}
              {ratingFilter !== 'all' && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                  {ratingOptions.find(opt => opt.id === ratingFilter)?.label}
                </span>
              )}
              {availabilityFilter !== 'all' && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                  {availabilityOptions.find(opt => opt.id === availabilityFilter)?.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;