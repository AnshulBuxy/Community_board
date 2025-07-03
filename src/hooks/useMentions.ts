import { useState, useEffect } from 'react';
import { User } from '../types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    username: 'mentor_john',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'mentor',
    isOnline: true
  },
  {
    id: '2',
    name: 'Emily Johnson',
    username: 'emily_dev',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'mentor',
    isOnline: false
  },
  {
    id: '3',
    name: 'Alex Wong',
    username: 'alex_student',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'student',
    isOnline: true
  }
];

export const useMentions = () => {
  const [users] = useState<User[]>(mockUsers);
  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const handleMentionSearch = (query: string, position: { top: number; left: number }) => {
    setMentionQuery(query);
    setMentionPosition(position);
    setShowMentions(query.length > 0);
  };

  const hideMentions = () => {
    setShowMentions(false);
    setMentionQuery('');
  };

  return {
    users: filteredUsers,
    showMentions,
    mentionPosition,
    handleMentionSearch,
    hideMentions
  };
};