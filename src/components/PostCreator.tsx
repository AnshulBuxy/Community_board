import React, { useState, useRef, useEffect } from 'react';
import { Image, FileText, Send, AtSign } from 'lucide-react';
import { User } from '../types';
import { useMentions } from '../hooks/useMentions';
import { postsAPI } from '../services/api';

interface PostCreatorProps {
  currentUser: User;
  onCreatePost?: (content: string) => void;
  onPostCreated?: () => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ currentUser, onCreatePost, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { users, showMentions, mentionPosition, handleMentionSearch, hideMentions } = useMentions();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursor = e.target.selectionStart;
    setContent(value);
    setCursorPosition(cursor);

    // Check for mention trigger
    const textBeforeCursor = value.substring(0, cursor);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      const rect = e.target.getBoundingClientRect();
      const lineHeight = 20;
      const lines = textBeforeCursor.split('\n').length;
      
      handleMentionSearch(mentionMatch[1], {
        top: rect.top + lines * lineHeight,
        left: rect.left + 10
      });
    } else {
      hideMentions();
    }
  };

  const handleMentionSelect = (user: User) => {
    const textBeforeCursor = content.substring(0, cursorPosition);
    const textAfterCursor = content.substring(cursorPosition);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      const beforeMention = textBeforeCursor.substring(0, mentionMatch.index);
      const newContent = `${beforeMention}@${user.username} ${textAfterCursor}`;
      setContent(newContent);
      hideMentions();
      
      // Focus back to textarea
      setTimeout(() => {
        textareaRef.current?.focus();
        const newPosition = beforeMention.length + user.username.length + 2;
        textareaRef.current?.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  const handleSubmit = async () => {
    if (content.trim()) {
      setLoading(true);
      setError('');
      
      try {
        await postsAPI.createPost(content);
        setContent('');
        hideMentions();
        
        // Call the callback to refresh posts
        if (onPostCreated) {
          onPostCreated();
        }
        
        // Legacy callback support
        if (onCreatePost) {
          onCreatePost(content);
        }
      } catch (err) {
        setError('Failed to create post. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 relative">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind, student?"
            className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          
          {/* Mention Suggestions */}
          {showMentions && (
            <div 
              className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-48 overflow-y-auto"
              style={{
                top: mentionPosition.top + 40,
                left: mentionPosition.left
              }}
            >
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleMentionSelect(user)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-150"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                  </div>
                  <div className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'mentor' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Image className="h-4 w-4" />
                <span className="text-sm font-medium">Photo/Video</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Document</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <AtSign className="h-4 w-4" />
                <span className="text-sm">Mention</span>
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              disabled={!content.trim() || loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="h-4 w-4" />
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;