import { useState, useMemo } from 'react';
import { 
  UniversalSortOption, 
  UniversalRoleFilter, 
  UniversalSkillFilter, 
  UniversalRatingFilter, 
  UniversalAvailabilityFilter 
} from '../components/UniversalSearchFilters';

export interface FilterableUser {
  id: string;
  name: string;
  username: string;
  role: 'student' | 'mentor' | 'admin';
  skills?: string[];
  rating?: number;
  availability?: 'available' | 'busy' | 'offline';
  joinedDate?: Date;
  isOnline?: boolean;
}

export interface FilterablePost {
  id: string;
  content: string;
  author: FilterableUser;
  timestamp: Date;
  likes: number;
  comments: number;
  shares?: number;
}

export const useUniversalFilters = <T extends FilterableUser | FilterablePost>(
  items: T[],
  defaultSort: UniversalSortOption = 'recent'
) => {
  const [sortBy, setSortBy] = useState<UniversalSortOption>(defaultSort);
  const [roleFilter, setRoleFilter] = useState<UniversalRoleFilter>('all');
  const [skillFilter, setSkillFilter] = useState<UniversalSkillFilter>('all');
  const [ratingFilter, setRatingFilter] = useState<UniversalRatingFilter>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<UniversalAvailabilityFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        
        // For posts, search in content and author details
        if ('content' in item) {
          const post = item as FilterablePost;
          return (
            post.content.toLowerCase().includes(searchLower) ||
            post.author.name.toLowerCase().includes(searchLower) ||
            post.author.username.toLowerCase().includes(searchLower) ||
            post.author.skills?.some(skill => skill.toLowerCase().includes(searchLower))
          );
        }
        
        // For users, search in name, username, and skills
        const user = item as FilterableUser;
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower) ||
          user.skills?.some(skill => skill.toLowerCase().includes(searchLower))
        );
      });
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(item => {
        const user = 'content' in item ? (item as FilterablePost).author : (item as FilterableUser);
        
        if (roleFilter === 'mentor') return user.role === 'mentor';
        if (roleFilter === 'student') return user.role === 'student';
        if (roleFilter === 'both') return user.role === 'mentor' || user.role === 'student';
        return true;
      });
    }

    // Apply skill filter
    if (skillFilter !== 'all') {
      filtered = filtered.filter(item => {
        const user = 'content' in item ? (item as FilterablePost).author : (item as FilterableUser);
        return user.skills?.includes(skillFilter);
      });
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter.replace('+', ''));
      filtered = filtered.filter(item => {
        const user = 'content' in item ? (item as FilterablePost).author : (item as FilterableUser);
        return user.rating && user.rating >= minRating;
      });
    }

    // Apply availability filter
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(item => {
        const user = 'content' in item ? (item as FilterablePost).author : (item as FilterableUser);
        return user.availability === availabilityFilter;
      });
    }

    // Apply sorting
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'most-liked':
          if ('content' in a && 'content' in b) {
            return (b as FilterablePost).likes - (a as FilterablePost).likes;
          }
          return 0;
          
        case 'most-commented':
          if ('content' in a && 'content' in b) {
            return (b as FilterablePost).comments - (a as FilterablePost).comments;
          }
          return 0;
          
        case 'rating':
          const userA = 'content' in a ? (a as FilterablePost).author : (a as FilterableUser);
          const userB = 'content' in b ? (b as FilterablePost).author : (b as FilterableUser);
          return (userB.rating || 0) - (userA.rating || 0);
          
        case 'name':
          const nameA = 'content' in a ? (a as FilterablePost).author.name : (a as FilterableUser).name;
          const nameB = 'content' in b ? (b as FilterablePost).author.name : (b as FilterableUser).name;
          return nameA.localeCompare(nameB);
          
        case 'joined-date':
          const dateA = 'content' in a ? (a as FilterablePost).author.joinedDate : (a as FilterableUser).joinedDate;
          const dateB = 'content' in b ? (b as FilterablePost).author.joinedDate : (b as FilterableUser).joinedDate;
          if (!dateA || !dateB) return 0;
          return dateB.getTime() - dateA.getTime();
          
        case 'recent':
        default:
          if ('content' in a && 'content' in b) {
            return (b as FilterablePost).timestamp.getTime() - (a as FilterablePost).timestamp.getTime();
          }
          // For users, sort by online status then by name
          const onlineA = 'content' in a ? (a as FilterablePost).author.isOnline : (a as FilterableUser).isOnline;
          const onlineB = 'content' in b ? (b as FilterablePost).author.isOnline : (b as FilterableUser).isOnline;
          if (onlineA !== onlineB) return onlineB ? 1 : -1;
          
          const userNameA = 'content' in a ? (a as FilterablePost).author.name : (a as FilterableUser).name;
          const userNameB = 'content' in b ? (b as FilterablePost).author.name : (b as FilterableUser).name;
          return userNameA.localeCompare(userNameB);
      }
    });

    return sorted;
  }, [items, sortBy, roleFilter, skillFilter, ratingFilter, availabilityFilter, searchQuery]);

  return {
    filteredItems: filteredAndSortedItems,
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
  };
};