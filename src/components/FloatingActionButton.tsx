import React from 'react';
import { Plus, BookmarkCheck } from 'lucide-react';

interface FloatingActionButtonProps {
  onCreatePost: () => void;
  onToggleSaved: () => void;
  savedCount: number;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onCreatePost, 
  onToggleSaved,
  savedCount 
}) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* Saved Posts Button */}
      <button
        onClick={onToggleSaved}
        className="relative bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        <BookmarkCheck className="h-6 w-6" />
        {savedCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {savedCount > 9 ? '9+' : savedCount}
          </span>
        )}
      </button>
      
      {/* Create Post Button */}
      <button
        onClick={onCreatePost}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingActionButton;