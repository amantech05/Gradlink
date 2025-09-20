export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  level: 'Bronze' | 'Silver' | 'Gold';
  levelProgress: number;
  joinDate: string;
  achievements: Achievement[];
  articles: Article[];
  role: Role;
}

export type Role = 'student' | 'alumni' | 'admin';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'academic' | 'professional' | 'extracurricular';
  badge: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  availability: 'Available' | 'Busy' | 'Unavailable';
  avatar: string;
  bio: string;
  experience: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: 'urgent' | 'normal' | 'info';
  date: string;
  author: string;
}

export interface Meeting {
  id: string;
  title: string;
  mentor: string;
  date: string;
  duration: number;
  type: 'virtual' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
}