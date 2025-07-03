import React from 'react';
import { X, BookmarkCheck, Calendar } from 'lucide-react';
import { Post } from '../types';

interface SavedPostsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedPosts: Post[];
  onToggleSave: (postId: string) => void;
}

const SavedPostsSidebar: React.FC<SavedPostsSidebarProps> = ({ 
  isOpen, 
  onClose, 
  savedPosts,
  onToggleSave 
}) => {
  if (!isOpen) return null;

  const formatDate = (timestamp: Date) => {
    return timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      <div className="absolute inset-0 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl lg:relative lg:max-w-none lg:w-80">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <BookmarkCheck className="h-5 w-5 text-yellow-600" />
            Saved Posts
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 max-h-full overflow-y-auto">
          {savedPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookmarkCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">No saved posts yet</p>
              <p className="text-gray-400 text-xs mt-1">Start saving posts to read them later!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedPosts.map(post => (
                <div key={post.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {post.author.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          post.author.role === 'mentor' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {post.author.role}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.timestamp)}
                        </div>
                        <button
                          onClick={() => onToggleSave(post.id)}
                          className="p-1 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded transition-colors duration-200"
                        >
                          <BookmarkCheck className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPostsSidebar;