import React, { useState } from 'react';
import { Save, Shield, Bell, Mail, Database, Server, Globe, Users } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'Grad Link',
    siteDescription: 'Alumni Connection Platform',
    allowRegistration: true,
    requireEmailVerification: false,
    enableNotifications: true,
    enableMentorshipRequests: true,
    maxFileUploadSize: 100,
    sessionTimeout: 30,
    maintenanceMode: false,
    enableAnalytics: true,
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    enableSSL: true,
    backupFrequency: 'daily',
    retentionPeriod: 30
  });

  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Server }
  ];

  const handleSave = () => {
    // In real app, save to API
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Name
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => updateSetting('siteName', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          rows={3}
          value={settings.siteDescription}
          onChange={(e) => updateSetting('siteDescription', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Maintenance Mode
          </label>
          <p className="text-sm text-gray-500">
            Temporarily disable the site for maintenance
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.maintenanceMode}
          onChange={(e) => updateSetting('maintenanceMode', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Enable Analytics
          </label>
          <p className="text-sm text-gray-500">
            Track user behavior and site performance
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.enableAnalytics}
          onChange={(e) => updateSetting('enableAnalytics', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const UserSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Allow User Registration
          </label>
          <p className="text-sm text-gray-500">
            Allow new users to create accounts
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.allowRegistration}
          onChange={(e) => updateSetting('allowRegistration', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Require Email Verification
          </label>
          <p className="text-sm text-gray-500">
            Users must verify their email before accessing the platform
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.requireEmailVerification}
          onChange={(e) => updateSetting('requireEmailVerification', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max File Upload Size (MB)
        </label>
        <input
          type="number"
          value={settings.maxFileUploadSize}
          onChange={(e) => updateSetting('maxFileUploadSize', parseInt(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        />
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Enable Notifications
          </label>
          <p className="text-sm text-gray-500">
            Send notifications to users about platform activities
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.enableNotifications}
          onChange={(e) => updateSetting('enableNotifications', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Enable Mentorship Requests
          </label>
          <p className="text-sm text-gray-500">
            Allow users to send mentorship requests
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.enableMentorshipRequests}
          onChange={(e) => updateSetting('enableMentorshipRequests', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const EmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Host
          </label>
          <input
            type="text"
            value={settings.smtpHost}
            onChange={(e) => updateSetting('smtpHost', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <input
            type="number"
            value={settings.smtpPort}
            onChange={(e) => updateSetting('smtpPort', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SMTP Username
        </label>
        <input
          type="text"
          value={settings.smtpUsername}
          onChange={(e) => updateSetting('smtpUsername', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SMTP Password
        </label>
        <input
          type="password"
          value={settings.smtpPassword}
          onChange={(e) => updateSetting('smtpPassword', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Enable SSL
          </label>
          <p className="text-sm text-gray-500">
            Use SSL encryption for email connections
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.enableSSL}
          onChange={(e) => updateSetting('enableSSL', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-yellow-600 mr-2" />
          <span className="text-sm font-medium text-yellow-800">
            Security settings require careful consideration
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password Policy
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
            <span className="text-sm text-gray-700">Minimum 8 characters</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
            <span className="text-sm text-gray-700">Require uppercase letters</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
            <span className="text-sm text-gray-700">Require numbers</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
            <span className="text-sm text-gray-700">Require special characters</span>
          </label>
        </div>
      </div>
    </div>
  );

  const SystemSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Backup Frequency
        </label>
        <select
          value={settings.backupFrequency}
          onChange={(e) => updateSetting('backupFrequency', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Data Retention Period (days)
        </label>
        <input
          type="number"
          value={settings.retentionPeriod}
          onChange={(e) => updateSetting('retentionPeriod', parseInt(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
        />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-red-800 mb-2">Danger Zone</h4>
        <div className="space-y-2">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
            Clear All Cache
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm ml-2">
            Reset Database
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'users': return <UserSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'email': return <EmailSettings />;
      case 'security': return <SecuritySettings />;
      case 'system': return <SystemSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {renderTabContent()}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;