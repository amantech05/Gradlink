import React from 'react';
import { Users, Briefcase, Calendar, MessageSquare, Star, Globe, TrendingUp, Bookmark } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { notices, articles, meetings } from '../data/mockData';

const AlumniDashboard: React.FC = () => {
  const { user } = useAuth();
  const recentNotices = notices.slice(0, 4);
  const upcoming = meetings.filter(m => m.status === 'upcoming').slice(0, 2);

  
  const stats = [
    { label: 'Connections', value: 124, icon: Users, color: 'from-sky-500 to-cyan-500' },
    { label: 'Mentorships', value: 8, icon: MessageSquare, color: 'from-violet-500 to-indigo-500' },
    { label: 'Endorsements', value: 34, icon: Star, color: 'from-amber-500 to-orange-500' },
    { label: 'Opportunities', value: 5, icon: Briefcase, color: 'from-emerald-500 to-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header card */}
        <div className="rounded-2xl overflow-hidden bg-white shadow-sm border mb-8">
          <div className="p-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm/5 opacity-90">Welcome back</p>
                <h1 className="text-2xl sm:text-3xl font-semibold">{user?.name}</h1>
                <p className="mt-1 text-indigo-100">Share opportunities and guide the next generation.</p>
              </div>
              <div className="hidden sm:flex gap-2">
                <button className="px-3 py-2 bg-white/10 rounded-md text-sm hover:bg-white/20">Post Update</button>
                <button className="px-3 py-2 bg-white/10 rounded-md text-sm hover:bg-white/20">Invite</button>
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl border bg-white p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-600" /> Community Highlights</h3>
                  <button className="text-sm text-indigo-600 hover:underline">View all</button>
                </div>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-6">
                {articles.slice(0, 2).map(a => (
                  <div key={a.id} className="rounded-xl border overflow-hidden hover:shadow-sm transition-shadow">
                    <img src={`https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800`} className="h-32 w-full object-cover" alt={a.title} />
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{a.title}</h4>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>{a.author}</span>
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4" />
                          Save
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
              <ul className="space-y-3 text-sm">
                {upcoming.map(m => (
                  <li key={m.id} className="flex items-center justify-between border rounded-lg p-3">
                    <span className="text-gray-700">{m.title}</span>
                    <span className="text-gray-500">{new Date(m.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Network</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50 flex items-center gap-2"><Users className="w-4 h-4 text-indigo-600" /> Find Alumni</button>
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50 flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-600" /> Share Opportunity</button>
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-600" /> Mentor Requests</button>
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50 flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-600" /> Schedule</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
              <div className="space-y-3">
                {recentNotices.map(n => (
                  <div key={n.id} className="p-3 rounded-lg border flex items-start gap-3">
                    <span className={`mt-1 w-2 h-2 rounded-full ${n.priority === 'urgent' ? 'bg-red-500' : n.priority === 'normal' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{n.title}</div>
                      <div className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard; 