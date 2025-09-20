import React, { useEffect, useMemo, useState } from 'react';
import { Search, Filter, AlertCircle, Info, Calendar, User, Bell, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllNotices, createNotice } from './noticeStore';

const STORAGE_KEY = 'notice_read_ids';

const Noticeboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [readIds, setReadIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const all = getAllNotices();

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setReadIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
  }, [readIds]);

  const categories = ['Announcement', 'Events', 'Technical', 'Academic', 'Career'];
  const priorities = ['urgent', 'normal', 'info'];

  const filteredNotices = all.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || notice.category === selectedCategory;
    const matchesPriority = !selectedPriority || notice.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  const visible = filteredNotices.slice(0, page * pageSize);
  const hasMore = visible.length < filteredNotices.length;

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          badgeColor: 'bg-red-100 text-red-800'
        };
      case 'normal':
        return {
          icon: Bell,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          badgeColor: 'bg-yellow-100 text-yellow-800'
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          badgeColor: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          icon: Bell,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          badgeColor: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const markRead = (id: string) => {
    setReadIds(prev => Array.from(new Set([...prev, id])));
  };

  const isRead = (id: string) => readIds.includes(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Noticeboard</h1>
          <p className="text-gray-600">Stay updated with the latest announcements and important information.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => { setPage(1); setSearchTerm(e.target.value); }}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => { setPage(1); setSelectedCategory(e.target.value); }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={selectedPriority}
                  onChange={(e) => { setPage(1); setSelectedPriority(e.target.value); }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
                  <option value="info">Info</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notices */}
        <div className="space-y-6">
          {visible.map((notice) => {
            const config = getPriorityConfig(notice.priority);
            const Icon = config.icon;
            const read = isRead(notice.id);

            return (
              <div
                key={notice.id}
                className={`bg-white rounded-2xl shadow-sm border ${config.borderColor} hover:shadow-md transition-shadow ${read ? 'opacity-90' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-3 rounded-lg ${config.bgColor}`}>
                      <Icon className={`w-6 h-6 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link to={`/notice/${notice.id}`} className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 block">
                            {notice.title}
                          </Link>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.badgeColor}`}>
                              {notice.priority.toUpperCase()}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                              {notice.category}
                            </span>
                            {read && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs">
                                <Check className="w-3 h-3" /> Read
                              </span>
                            )}
                          </div>
                        </div>
                        <button onClick={() => markRead(notice.id)} className="text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50">
                          Mark as read
                        </button>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 leading-relaxed line-clamp-3">{notice.content}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-1" />
                          <span>Posted by {notice.author}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(notice.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {visible.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later for new announcements.</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-8">
            <button onClick={() => setPage((p) => p + 1)} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Load More Notices
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Noticeboard;