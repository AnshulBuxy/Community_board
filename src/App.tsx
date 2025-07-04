import React, { useState, useRef } from 'react';
import NavigationHeader from './components/NavigationHeader';
import SearchAndFilters from './components/SearchAndFilters';
import PostCreator from './components/PostCreator';
import PostCard from './components/PostCard';
import SavedPostsSidebar from './components/SavedPostsSidebar';
import FloatingActionButton from './components/FloatingActionButton';
import DiscoverUsers from './components/DiscoverUsers';
import MyConnections from './components/MyConnections';
import MyRequests from './components/MyRequests';
import OpportunitiesBoard from './components/OpportunitiesBoard';
import MyProfile from './components/MyProfile';
import { usePosts } from './hooks/usePosts';
import { User } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [showSavedSidebar, setShowSavedSidebar] = useState(false);
  const postCreatorRef = useRef<HTMLDivElement>(null);
  
  const {
    posts,
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
  } = usePosts();

  const currentUser: User = {
    id: 'current-user',
    name: 'You',
    username: 'you',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'student',
    isOnline: true,
    skills: ['react', 'javascript'],
    rating: 4.0,
    availability: 'available'
  };

  const handleCreatePost = (content: string) => {
    console.log('Creating post:', content);
    // In a real app, this would make an API call
  };

  const scrollToPostCreator = () => {
    postCreatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getFilterSummary = () => {
    const filters = [];
    if (sortBy !== 'recent') filters.push(sortBy.replace('-', ' '));
    if (roleFilter !== 'all') filters.push(roleFilter);
    if (skillFilter !== 'all') filters.push(skillFilter);
    if (ratingFilter !== 'all') filters.push(`${ratingFilter} rating`);
    if (availabilityFilter !== 'all') filters.push(availabilityFilter);
    if (searchQuery) filters.push(`"${searchQuery}"`);
    
    return filters.length > 0 ? ` • ${filters.join(', ')}` : '';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverUsers currentUser={currentUser} />;
      case 'connections':
        return <MyConnections currentUser={currentUser} />;
      case 'requests':
        return <MyRequests currentUser={currentUser} />;
      case 'opportunities':
        return <OpportunitiesBoard currentUser={currentUser} />;
      case 'profile':
        return <MyProfile currentUser={currentUser} />;
      default:
        return (
          <>
            <SearchAndFilters
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
            />
            
            <div ref={postCreatorRef}>
              <PostCreator currentUser={currentUser} onCreatePost={handleCreatePost} />
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {sortBy === 'recent' && 'Recent Posts'}
                {sortBy === 'most-liked' && 'Most Liked Posts'}
                {sortBy === 'most-commented' && 'Most Commented Posts'}
                {getFilterSummary()}
              </h2>
              
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No posts found matching your criteria</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  posts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onToggleLike={toggleLike}
                      onToggleSave={toggleSave}
                    />
                  ))
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {renderContent()}
          </div>
          
          {/* Saved Posts Sidebar - only show on community tab */}
          {activeTab === 'community' && (
            <SavedPostsSidebar
              isOpen={showSavedSidebar}
              onClose={() => setShowSavedSidebar(false)}
              savedPosts={savedPosts}
              onToggleSave={toggleSave}
            />
          )}
        </div>
      </div>
      
      {/* Floating Action Button - only show on community tab */}
      {activeTab === 'community' && (
        <FloatingActionButton
          onCreatePost={scrollToPostCreator}
          onToggleSaved={() => setShowSavedSidebar(!showSavedSidebar)}
          savedCount={savedPosts.length}
        />
      )}
    </div>
  );
};

export default App;