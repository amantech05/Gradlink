import { notices as seed } from '../data/mockData';
import { Notice } from '../types';

const STORAGE_KEY = 'custom_notices';

export function getAllNotices(): Notice[] {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  const custom: Notice[] = stored ? JSON.parse(stored) : [];
  return [...custom, ...seed];
}

export function createNotice(input: Omit<Notice, 'id' | 'date'> & { date?: string }): Notice {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  const custom: Notice[] = stored ? JSON.parse(stored) : [];
  const newNotice: Notice = {
    id: `${Date.now()}`,
    title: input.title,
    content: input.content,
    category: input.category,
    priority: input.priority,
    date: input.date || new Date().toISOString().slice(0, 10),
    author: input.author
  };
  const next = [newNotice, ...custom];
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return newNotice;
} 