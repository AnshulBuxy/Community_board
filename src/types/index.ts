export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: 'student' | 'mentor' | 'admin';
  isOnline: boolean;
  skills?: string[];
  rating?: number;
  availability?: 'available' | 'busy' | 'offline';
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  mentions: string[];
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

export type SortOption = 'recent' | 'most-liked' | 'most-commented';
export type FilterOption = 'all' | 'mentors' | 'students' | 'online';
export type RoleFilter = 'all' | 'mentor' | 'student' | 'both';
export type SkillFilter = 'all' | 'python' | 'react' | 'javascript' | 'typescript';
export type RatingFilter = 'all' | '4+' | '3+' | '2+';
export type AvailabilityFilter = 'all' | 'available' | 'busy' | 'offline';