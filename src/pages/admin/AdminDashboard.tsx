import React from 'react';
import { Users, FileText, Settings, BarChart3, Shield, Bell, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Active Sessions', value: '1,234', icon: Activity, color: 'from-emerald-500 to-green-500', change: '+8%' },
    { label: 'Articles Published', value: '456', icon: FileText, color: 'from-purple-500 to-indigo-500', change: '+15%' },
    { label: 'System Health', value: '99.9%', icon: Shield, color: 'from-orange-500 to-amber-500', change: '+0.1%' },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registration', user: 'John Doe', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Article published', user: 'Jane Smith', time: '15 minutes ago', type: 'content' },
    { id: 3, action: 'Mentorship session completed', user: 'Mike Johnson', time: '1 hour ago', type: 'session' },
    { id: 4, action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'system' },
  ];

  const quickActions = [
    { label: 'Manage Users', icon: Users, href: '/admin/users', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Content Review', icon: FileText, href: '/admin/content', color: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'System Settings', icon: Settings, href: '/admin/settings', color: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'bg-emerald-600 hover:bg-emerald-700' },
    { label: 'Fund Monitoring', icon: DollarSign, href: '/admin/funds', color: 'bg-green-600 hover:bg-green-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}. Here's what's happening on your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={index}
                      href={action.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg text-white transition-colors ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{action.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Server Status</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API Response</span>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs">125ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                  <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View all</button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900' :
                        activity.type === 'content' ? 'bg-purple-100 dark:bg-purple-900' :
                        activity.type === 'session' ? 'bg-emerald-100 dark:bg-emerald-900' :
                        'bg-gray-100 dark:bg-gray-600'
                      }`}>
                        {activity.type === 'user' && <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                        {activity.type === 'content' && <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                        {activity.type === 'session' && <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                        {activity.type === 'system' && <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">by {activity.user}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

