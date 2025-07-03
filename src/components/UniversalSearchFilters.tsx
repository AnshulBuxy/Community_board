import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Filter, Star, Users, Code, Wifi, X } from 'lucide-react';

export type UniversalSortOption = 'recent' | 'most-liked' | 'most-commented' | 'rating' | 'name' | 'joined-date';
export type UniversalRoleFilter = 'all' | 'mentor' | 'student' | 'both';
export type UniversalSkillFilter = 'all' | 'python' | 'react' | 'javascript' | 'typescript' | 'nodejs' | 'data-science';
export type UniversalRatingFilter = 'all' | '4+' | '3+' | '2+' | '1+';
export type UniversalAvailabilityFilter = 'all' | 'available' | 'busy' | 'offline';

interface UniversalSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: UniversalSortOption;
  onSortChange: (sort: UniversalSortOption) => void;
  roleFilter: UniversalRoleFilter;
  onRoleFilterChange: (filter: UniversalRoleFilter) => void;
  skillFilter: UniversalSkillFilter;
  onSkillFilterChange: (filter: UniversalSkillFilter) => void;
  ratingFilter: UniversalRatingFilter;
  onRatingFilterChange: (filter: UniversalRatingFilter) => void;
  availabilityFilter: UniversalAvailabilityFilter;
  onAvailabilityFilterChange: (filter: UniversalAvailabilityFilter) => void;
  placeholder?: string;
  showSortOptions?: UniversalSortOption[];
  context?: 'community' | 'discover' | 'connections' | 'requests' | 'opportunities';
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
    <div className="relative w-full min-w-[160px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full justify-between"
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="h-4 w-4 text-gray-500 flex-shrink-0" />}
          <span className="text-sm font-medium text-gray-700 flex-shrink-0">{label}:</span>
          <span className="text-sm text-gray-900 truncate">{selectedOption?.label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
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
                {OptionIcon && <OptionIcon className="h-4 w-4 flex-shrink-0" />}
                <span className="text-sm truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const UniversalSearchFilters: React.FC<UniversalSearchFiltersProps> = ({
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
  onAvailabilityFilterChange,
  placeholder = "Search posts, users, skills, requests...",
  showSortOptions,
  context = 'community'
}) => {
  const getDefaultSortOptions = (): { id: UniversalSortOption; label: string; icon: React.ComponentType<any> }[] => {
    switch (context) {
      case 'discover':
        return [
          { id: 'rating', label: 'Highest Rated', icon: Star },
          { id: 'name', label: 'Name (A-Z)', icon: Users },
          { id: 'joined-date', label: 'Recently Joined', icon: Users }
        ];
      case 'connections':
      case 'requests':
        return [
          { id: 'recent', label: 'Recent', icon: Users },
          { id: 'name', label: 'Name (A-Z)', icon: Users },
          { id: 'rating', label: 'Highest Rated', icon: Star }
        ];
      case 'opportunities':
        return [
          { id: 'recent', label: 'Recent', icon: Users },
          { id: 'most-liked', label: 'Most Popular', icon: Star }
        ];
      default: // community
        return [
          { id: 'recent', label: 'Recent', icon: Users },
          { id: 'most-liked', label: 'Most Liked', icon: Star },
          { id: 'most-commented', label: 'Most Commented', icon: Users }
        ];
    }
  };

  const sortOptions = showSortOptions 
    ? getDefaultSortOptions().filter(opt => showSortOptions.includes(opt.id))
    : getDefaultSortOptions();

  const roleOptions = [
    { id: 'all' as UniversalRoleFilter, label: 'All Roles', icon: Users },
    { id: 'mentor' as UniversalRoleFilter, label: 'Mentors', icon: Users },
    { id: 'student' as UniversalRoleFilter, label: 'Students', icon: Users },
    { id: 'both' as UniversalRoleFilter, label: 'Both', icon: Users }
  ];

  const skillOptions = [
    { id: 'all' as UniversalSkillFilter, label: 'All Skills', icon: Code },
    { id: 'python' as UniversalSkillFilter, label: 'Python', icon: Code },
    { id: 'react' as UniversalSkillFilter, label: 'React', icon: Code },
    { id: 'javascript' as UniversalSkillFilter, label: 'JavaScript', icon: Code },
    { id: 'typescript' as UniversalSkillFilter, label: 'TypeScript', icon: Code },
    { id: 'nodejs' as UniversalSkillFilter, label: 'Node.js', icon: Code },
    { id: 'data-science' as UniversalSkillFilter, label: 'Data Science', icon: Code }
  ];

  const ratingOptions = [
    { id: 'all' as UniversalRatingFilter, label: 'All Ratings', icon: Star },
    { id: '4+' as UniversalRatingFilter, label: '4+ Stars', icon: Star },
    { id: '3+' as UniversalRatingFilter, label: '3+ Stars', icon: Star },
    { id: '2+' as UniversalRatingFilter, label: '2+ Stars', icon: Star },
    { id: '1+' as UniversalRatingFilter, label: '1+ Stars', icon: Star }
  ];

  const availabilityOptions = [
    { id: 'all' as UniversalAvailabilityFilter, label: 'All Status', icon: Wifi },
    { id: 'available' as UniversalAvailabilityFilter, label: 'Available', icon: Wifi },
    { id: 'busy' as UniversalAvailabilityFilter, label: 'Busy', icon: Wifi },
    { id: 'offline' as UniversalAvailabilityFilter, label: 'Offline', icon: Wifi }
  ];

  const clearAllFilters = () => {
    onSortChange(sortOptions[0].id);
    onRoleFilterChange('all');
    onSkillFilterChange('all');
    onRatingFilterChange('all');
    onAvailabilityFilterChange('all');
    onSearchChange('');
  };

  const hasActiveFilters = () => {
    return (
      sortBy !== sortOptions[0].id ||
      roleFilter !== 'all' ||
      skillFilter !== 'all' ||
      ratingFilter !== 'all' ||
      availabilityFilter !== 'all' ||
      searchQuery.trim() !== ''
    );
  };

  const getFilterSummary = () => {
    const filters = [];
    if (sortBy !== sortOptions[0].id) {
      const sortLabel = sortOptions.find(opt => opt.id === sortBy)?.label;
      if (sortLabel) filters.push(sortLabel);
    }
    if (roleFilter !== 'all') filters.push(roleOptions.find(opt => opt.id === roleFilter)?.label);
    if (skillFilter !== 'all') filters.push(skillOptions.find(opt => opt.id === skillFilter)?.label);
    if (ratingFilter !== 'all') filters.push(ratingOptions.find(opt => opt.id === ratingFilter)?.label);
    if (availabilityFilter !== 'all') filters.push(availabilityOptions.find(opt => opt.id === availabilityFilter)?.label);
    if (searchQuery.trim()) filters.push(`"${searchQuery}"`);
    
    return filters.filter(Boolean);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Filters Section */}
      <div className="space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Sort & Filter:</span>
          </div>
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <X className="h-3 w-3" />
              Clear All
            </button>
          )}
        </div>

        {/* Filter Dropdowns - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <Dropdown
            label="Sort"
            value={sortBy}
            options={sortOptions}
            onChange={onSortChange}
            icon={Star}
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
        {hasActiveFilters() && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-500 py-1">Active filters:</span>
            {getFilterSummary().map((filter, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {filter}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalSearchFilters;