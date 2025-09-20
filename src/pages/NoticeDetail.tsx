import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { notices } from '../data/mockData';

const STORAGE_KEY = 'notice_read_ids';

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const notice = useMemo(() => notices.find(n => n.id === id), [id]);

  useEffect(() => {
    if (!id) return;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const set = new Set<string>(stored ? JSON.parse(stored) : []);
    set.add(id);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  }, [id]);

  if (!notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Notice not found.</p>
          <Link to="/noticeboard" className="text-indigo-600 hover:underline">Back to notices</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/noticeboard" className="text-sm text-indigo-600 hover:underline">← Back to notices</Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">{notice.title}</h1>
        <div className="mt-2 text-sm text-gray-500">{new Date(notice.date).toLocaleDateString()} • {notice.category}</div>
        <div className="mt-6 bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{notice.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail; 