import React, { useState, useRef } from 'react';
import NavigationHeader from './NavigationHeader';
import SearchAndFilters from './SearchAndFilters';
import PostCreator from './PostCreator';
import PostCard from './PostCard';
import SavedPostsSidebar from './SavedPostsSidebar';
import FloatingActionButton from './FloatingActionButton';
import DiscoverUsers from './DiscoverUsers';
import MyConnections from './MyConnections';
import MyRequests from './MyRequests';
import OpportunitiesBoard from './OpportunitiesBoard';
import { usePosts } from '../hooks/usePosts';
import { User } from '../types';

interface CommunitySectionProps {
  currentUser: User;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('community');
  const [showSavedSidebar, setShowSavedSidebar] = useState(false);
  const postCreatorRef = useRef<HTMLDivElement>(null);
  
  const {
    posts: allPosts,
    refetch,
    loading,
    error,
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

  const handleCreatePost = (content: string) => {
    // Refresh posts after creating a new post
    refetch();
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
              <PostCreator 
                currentUser={currentUser} 
                onCreatePost={handleCreatePost}
                onPostCreated={() => refetch()}
              />
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {sortBy === 'recent' && 'Recent Posts'}
                {sortBy === 'most-liked' && 'Most Liked Posts'}
                {sortBy === 'most-commented' && 'Most Commented Posts'}
                {getFilterSummary()}
              </h2>
              
              {loading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading posts...</p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800">{error}</p>
                  <button 
                    onClick={refetch}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Retry
                  </button>
                </div>
              )}
              
              <div className="space-y-4">
                {!loading && allPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No posts found matching your criteria</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  allPosts.map(post => (
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
    <div className="flex-1 bg-gray-50">
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

export default CommunitySection;