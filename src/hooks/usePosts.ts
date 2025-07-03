import { useState, useEffect, useMemo } from 'react';
import { Post, SortOption, RoleFilter, SkillFilter, RatingFilter, AvailabilityFilter } from '../types';

// Mock data - in real app, this would come from an API
const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Sarah Lee',
      username: 'sarahlee',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: true,
      skills: ['react', 'javascript'],
      rating: 4.5,
      availability: 'available'
    },
    content: 'Just finished a fantastic session with @mentor_john on React state management! Feeling much more confident now. Highly recommend connecting with experienced folks on Sama!',
    timestamp: new Date(Date.now() - 3600000),
    likes: 15,
    comments: 3,
    shares: 1,
    isLiked: false,
    isSaved: false,
    mentions: ['mentor_john']
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'David Chen',
      username: 'davidchen',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      isOnline: false,
      skills: ['python', 'javascript'],
      rating: 3.8,
      availability: 'offline'
    },
    content: 'Anyone else struggling with setting up their first Node.js backend? Looking for some quick tips or resources!',
    timestamp: new Date(Date.now() - 10800000),
    likes: 8,
    comments: 12,
    shares: 2,
    isLiked: false,
    isSaved: false,
    mentions: []
  },
  {
    id: '3',
    author: {
      id: '3',
      name: 'Maria Rodriguez',
      username: 'maria_dev',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: true,
      skills: ['python', 'react', 'typescript'],
      rating: 4.9,
      availability: 'available'
    },
    content: 'Excited to share my latest tutorial on advanced TypeScript patterns! Check it out and let me know what you think. Happy to help anyone with questions! 🚀',
    timestamp: new Date(Date.now() - 7200000),
    likes: 28,
    comments: 7,
    shares: 5,
    isLiked: true,
    isSaved: false,
    mentions: []
  },
  {
    id: '4',
    author: {
      id: '4',
      name: 'Alex Thompson',
      username: 'alex_mentor',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      isOnline: true,
      skills: ['python', 'javascript'],
      rating: 4.2,
      availability: 'busy'
    },
    content: 'Working on a new Python data science course. Would love feedback from the community on what topics you\'d like to see covered!',
    timestamp: new Date(Date.now() - 14400000),
    likes: 22,
    comments: 15,
    shares: 3,
    isLiked: false,
    isSaved: false,
    mentions: []
  }
];

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedAndFilteredPosts = useMemo(() => {
    let filtered = posts;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(post => {
        if (roleFilter === 'mentor') return post.author.role === 'mentor';
        if (roleFilter === 'student') return post.author.role === 'student';
        if (roleFilter === 'both') return post.author.role === 'mentor' || post.author.role === 'student';
        return true;
      });
    }

    // Apply skill filter
    if (skillFilter !== 'all') {
      filtered = filtered.filter(post => 
        post.author.skills?.includes(skillFilter)
      );
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter.replace('+', ''));
      filtered = filtered.filter(post => 
        post.author.rating && post.author.rating >= minRating
      );
    }

    // Apply availability filter
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(post => 
        post.author.availability === availabilityFilter
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'most-liked':
          return b.likes - a.likes;
        case 'most-commented':
          return b.comments - a.comments;
        case 'recent':
        default:
          return b.timestamp.getTime() - a.timestamp.getTime();
      }
    });

    return sorted;
  }, [posts, sortBy, roleFilter, skillFilter, ratingFilter, availabilityFilter, searchQuery]);

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const toggleSave = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const savedPosts = useMemo(() => 
    posts.filter(post => post.isSaved), 
    [posts]
  );

  return {
    posts: sortedAndFilteredPosts,
    savedPosts,
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
    setSearchQuery,
    toggleLike,
    toggleSave
  };
};