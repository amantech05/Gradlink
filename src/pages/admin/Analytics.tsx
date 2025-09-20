import React from 'react';
import { TrendingUp, Users, FileText, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      description: 'vs last month'
    },
    {
      title: 'Active Sessions',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      description: 'this month'
    },
    {
      title: 'Articles Published',
      value: '456',
      change: '+15.3%',
      trend: 'up',
      description: 'vs last month'
    },
    {
      title: 'Mentorship Sessions',
      value: '789',
      change: '-2.1%',
      trend: 'down',
      description: 'vs last month'
    }
  ];

  const topContent = [
    { title: 'Breaking into Tech: A Junior\'s Journey', views: 1234, author: 'Sarah Johnson' },
    { title: 'The Importance of Networking', views: 987, author: 'Mike Chen' },
    { title: 'Machine Learning Career Path', views: 756, author: 'Dr. Emily Rodriguez' },
    { title: 'Interview Preparation Guide', views: 654, author: 'James Wilson' },
    { title: 'Building Your Portfolio', views: 543, author: 'Lisa Park' }
  ];

  const userGrowth = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Apr', users: 1920 },
    { month: 'May', users: 2150 },
    { month: 'Jun', users: 2380 },
    { month: 'Jul', users: 2620 },
    { month: 'Aug', users: 2847 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track platform performance and user engagement metrics.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="ml-1">{metric.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.description}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Growth Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white text-gray-900">
                  <option>Last 8 months</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>

              {/* Simple bar chart representation */}
              <div className="space-y-4">
                {userGrowth.map((data, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 text-sm text-gray-600">{data.month}</div>
                    <div className="flex-1 ml-4">
                      <div className="bg-gray-200 rounded-full h-6 relative">
                        <div
                          className="bg-indigo-600 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(data.users / 3000) * 100}%` }}
                        >
                          <span className="text-white text-xs font-medium">{data.users}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Content */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Content</h2>
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-indigo-600">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{content.title}</p>
                      <p className="text-xs text-gray-500">by {content.author}</p>
                      <p className="text-xs text-gray-500">{content.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Students</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">1,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-600">Alumni</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">987</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Articles</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">456</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="text-sm text-gray-600">Sessions</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">789</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'New user registered', user: 'John Doe', time: '2 minutes ago', type: 'user' },
                { action: 'Article published', user: 'Jane Smith', time: '15 minutes ago', type: 'content' },
                { action: 'Mentorship session completed', user: 'Mike Johnson', time: '1 hour ago', type: 'session' },
                { action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'system' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'user' ? 'bg-blue-100' :
                    activity.type === 'content' ? 'bg-purple-100' :
                    activity.type === 'session' ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    {activity.type === 'user' && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'content' && <FileText className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'session' && <Calendar className="w-4 h-4 text-green-600" />}
                    {activity.type === 'system' && <TrendingUp className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;