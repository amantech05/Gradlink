import React from 'react';
import { Calendar, GraduationCap, Users, BookOpen, Clock, Trophy, MessageSquare, Bell } from 'lucide-react';
import LevelBadge from '../components/common/LevelBadge';
import { useAuth } from '../hooks/useAuth';
import { meetings, notices, articles } from '../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming').slice(0, 3);
  const recentNotices = notices.slice(0, 3);

  const stats = [
    { label: 'Credits Earned', value: 92, icon: GraduationCap, color: 'from-indigo-500 to-blue-500' },
    { label: 'Mentor Sessions', value: 14, icon: Users, color: 'from-emerald-500 to-teal-500' },
    { label: 'Hours Studied', value: 128, icon: Clock, color: 'from-orange-500 to-amber-500' },
    { label: 'Achievements', value: 6, icon: Trophy, color: 'from-fuchsia-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-white shadow-sm border">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm/5 opacity-90">Good Morning</p>
                  <h1 className="text-2xl sm:text-3xl font-semibold">{user?.name}</h1>
                  <p className="mt-2 text-indigo-100">Here is your learning overview for today.</p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
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
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Level</h2>
              <LevelBadge level={user?.level || 'Bronze'} progress={user?.levelProgress} />
            </div>
            <div className="rounded-xl bg-gray-50 p-4 border">
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Upcoming</span>
              </div>
              <ul className="space-y-3">
                {upcomingMeetings.map(m => (
                  <li key={m.id} className="text-sm flex items-center justify-between">
                    <span className="text-gray-700">{m.title}</span>
                    <span className="text-gray-500">{new Date(m.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-600" /> Featured Articles</h3>
                  <button className="text-sm text-indigo-600 hover:underline">View all</button>
                </div>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-6">
                {articles.slice(0, 2).map(a => (
                  <div key={a.id} className="rounded-xl border overflow-hidden hover:shadow-sm transition-shadow">
                    <img src={`https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800`} className="h-32 w-full object-cover" alt={a.title} />
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{a.title}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notices</h3>
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

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50">Find Mentors</button>
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50">Schedule Meeting</button>
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50">Read Articles</button>
                <button className="rounded-lg border p-3 text-left hover:bg-gray-50">Upload Work</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 