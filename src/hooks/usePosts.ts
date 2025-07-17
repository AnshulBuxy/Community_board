import { useState, useEffect, useMemo } from 'react';
import { Post, SortOption, RoleFilter, SkillFilter, RatingFilter, AvailabilityFilter } from '../types';
import { postsAPI } from '../services/api';


export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const fetchedPosts = await postsAPI.getPosts({
        sort_by: sortBy,
        role_filter: roleFilter,
        skill_filter: skillFilter,
        search_query: searchQuery
      });
      
      // Transform API response to match frontend Post interface
      const transformedPosts: Post[] = fetchedPosts.map((post: any) => ({
        id: post.id.toString(),
        author: {
          id: post.author.id.toString(),
          name: post.author.name,
          username: post.author.username,
          avatar: post.author.avatar,
          role: post.author.role,
          isOnline: post.author.is_online,
          skills: post.author.skills || [],
          rating: post.author.rating,
          availability: post.author.availability
        },
        content: post.content,
        timestamp: new Date(post.created_at),
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
        isLiked: false, // TODO: Implement user-specific like status
        isSaved: false, // TODO: Implement user-specific save status
        mentions: [] // TODO: Extract mentions from content
      }));
      
      setPosts(transformedPosts);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on component mount and when filters change
  useEffect(() => {
    fetchPosts();
  }, [sortBy, roleFilter, skillFilter, searchQuery]);

  const sortedAndFilteredPosts = useMemo(() => {
    // Since filtering is now done on the backend, just return posts
    // Additional client-side filtering can be added here if needed
    return posts;
  }, [posts]);

  const toggleLike = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;
      
      const increment = !post.isLiked;
      await postsAPI.toggleLike(postId, increment);
      
      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      ));
    } catch (err) {
      console.error('Error toggling like:', err);
    }
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
    loading,
    error,
    refetch: fetchPosts,
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