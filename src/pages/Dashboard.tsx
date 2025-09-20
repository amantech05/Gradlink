import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, BookOpen, Bell, TrendingUp, Clock, Star, FileText } from 'lucide-react';
import LevelBadge from '../components/common/LevelBadge';
import { useAuth } from '../hooks/useAuth';
import { meetings, notices, articles } from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Mentorship Sessions', value: '12', icon: Users, color: 'bg-blue-500' },
    { label: 'Articles Published', value: '5', icon: FileText, color: 'bg-green-500' },
    { label: 'Network Connections', value: '48', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Hours Learned', value: '127', icon: Clock, color: 'bg-orange-500' }
  ];

  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming').slice(0, 3);
  const recentNotices = notices.slice(0, 3);
  const featuredArticles = articles.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">Here's what's happening in your network today.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <LevelBadge level={user?.level || 'Bronze'} progress={user?.levelProgress} showProgress />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Meetings */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
                  <Link to="/meetings" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                        <p className="text-sm text-gray-600">with {meeting.mentor}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(meeting.date).toLocaleDateString()} • {meeting.duration} min
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          meeting.type === 'virtual' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {meeting.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Featured Articles</h2>
                  <Link to="/articles" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {featuredArticles.map((article) => (
                    <div key={article.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={`https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=400`}
                          alt={article.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>By {article.author}</span>
                            <span>{article.likes} likes</span>
                            <span>{article.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/uploads"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Upload Content
                </Link>
                <Link
                  to="/mentors"
                  className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Find Mentors
                </Link>
                <Link
                  to="/meetings"
                  className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Schedule Meeting
                </Link>
                <Link
                  to="/funds"
                  className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Donate Funds
                </Link>
              </div>
            </div>

            {/* Recent Notices */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Notices</h2>
                  <Link to="/noticeboard" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentNotices.map((notice) => (
                    <div key={notice.id} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        notice.priority === 'urgent' ? 'bg-red-500' :
                        notice.priority === 'normal' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{notice.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notice.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievement Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Level Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Current Level</span>
                    <span className="font-medium">{user?.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${user?.levelProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{user?.levelProgress}% to next level</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mentorship Sessions</span>
                    <span className="text-green-600">12/15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Articles Published</span>
                    <span className="text-green-600">5/8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Network Connections</span>
                    <span className="text-green-600">48/50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;