import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, BookmarkCheck, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onToggleLike, onToggleSave }) => {
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const renderContentWithMentions = (content: string) => {
    const mentionRegex = /@(\w+)/g;
    const parts = content.split(mentionRegex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="text-blue-600 font-medium hover:underline cursor-pointer">
            @{part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {post.author.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                post.author.role === 'mentor' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {post.author.role}
              </span>
              <span className="text-gray-500 text-sm">{formatTimeAgo(post.timestamp)}</span>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            {renderContentWithMentions(post.content)}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => onToggleLike(post.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  post.isLiked
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.likes} Likes</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-all duration-200">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{post.comments} Comments</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-all duration-200">
                <Share2 className="h-4 w-4" />
                <span className="text-sm font-medium">{post.shares} Shares</span>
              </button>
            </div>
            
            <button
              onClick={() => onToggleSave(post.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                post.isSaved
                  ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {post.isSaved ? (
                <BookmarkCheck className="h-4 w-4 fill-current" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {post.isSaved ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;