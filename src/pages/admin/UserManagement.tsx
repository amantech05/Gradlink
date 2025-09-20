import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Plus, MoreHorizontal, UserCheck, UserX } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  avatar: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockUsers: AdminUser[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        role: 'student',
        status: 'active',
        joinDate: '2023-01-15',
        lastActive: '2024-01-20',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '2',
        name: 'Michael Carter',
        email: 'michael.carter@alumni.test',
        role: 'alumni',
        status: 'active',
        joinDate: '2020-05-10',
        lastActive: '2024-01-19',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@admin.test',
        role: 'admin',
        status: 'active',
        joinDate: '2019-03-20',
        lastActive: '2024-01-20',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '4',
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        role: 'student',
        status: 'inactive',
        joinDate: '2023-08-12',
        lastActive: '2023-12-15',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = !selectedStatus || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'alumni':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'student':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage users, roles, and permissions across the platform.</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex space-x-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
              >
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="admin">Admin</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-700">
                  {selectedUsers.length} user(s) selected
                </span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                    Activate
                  </button>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
                    Suspend
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1 text-gray-400 hover:text-indigo-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;