import React, { useEffect, useMemo, useState } from 'react';
import { articles as seedArticles } from '../data/mockData';
import { Heart } from 'lucide-react';

interface LikeState {
  [id: string]: boolean;
}

const STORAGE_KEY = 'article_likes';

const Articles: React.FC = () => {
  const [likes, setLikes] = useState<LikeState>({});

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setLikes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Articles</h1>
          <p className="text-gray-600">Insights and stories from alumni and mentors.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="space-y-6">
            {seedArticles.map((article) => (
              <div key={article.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0 hover:bg-gray-50/60 rounded-md -mx-4 px-4 py-2 transition-colors">
                <div className="flex items-start space-x-4">
                  <img
                    src={`https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={article.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{article.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>By {article.author} • {new Date(article.date).toLocaleDateString()}</span>
                      <button
                        onClick={() => toggleLike(article.id)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-sm ${likes[article.id] ? 'text-red-600 border-red-200 bg-red-50' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                      >
                        <Heart className={`w-4 h-4 ${likes[article.id] ? 'fill-current' : ''}`} />
                        {likes[article.id] ? 'Liked' : 'Like'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles; 