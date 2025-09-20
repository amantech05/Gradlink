import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Calendar, Search, Download, Filter, Heart, Eye } from 'lucide-react';

interface Donation {
  id: string;
  name: string;
  amount: number;
  message?: string;
  ts: number;
}

const STORAGE_KEY = 'donations';

const FundMonitoring: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [filterAmount, setFilterAmount] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const parsed: Donation[] = stored ? JSON.parse(stored) : [];
    setDonations(parsed);
  }, []);

  // Calculate statistics
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalDonors = donations.length;
  const averageDonation = totalDonors > 0 ? totalAmount / totalDonors : 0;
  const uniqueDonors = new Set(donations.map(d => d.name.toLowerCase())).size;

  // Filter and sort donations
  const filteredDonations = donations
    .filter(donation => {
      const matchesSearch = donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (donation.message && donation.message.toLowerCase().includes(searchTerm.toLowerCase()));
      
      let matchesAmount = true;
      if (filterAmount === 'small') matchesAmount = donation.amount <= 25;
      else if (filterAmount === 'medium') matchesAmount = donation.amount > 25 && donation.amount <= 100;
      else if (filterAmount === 'large') matchesAmount = donation.amount > 100;

      return matchesSearch && matchesAmount;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.ts - a.ts;
        case 'amount':
          return b.amount - a.amount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Get recent donations (last 7 days)
  const recentDonations = donations.filter(d => 
    Date.now() - d.ts < 7 * 24 * 60 * 60 * 1000
  );

  // Get top donors
  const donorTotals = donations.reduce((acc, donation) => {
    const name = donation.name.toLowerCase();
    acc[name] = (acc[name] || 0) + donation.amount;
    return acc;
  }, {} as Record<string, number>);

  const topDonors = Object.entries(donorTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([name, total]) => ({ name, total }));

  const exportData = () => {
    const csvContent = [
      ['Name', 'Amount', 'Date', 'Message'],
      ...donations.map(d => [
        d.name,
        d.amount.toString(),
        new Date(d.ts).toLocaleDateString(),
        d.message || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Fund Monitoring</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor donations, track funding progress, and analyze donor contributions.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Raised</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalAmount.toLocaleString()}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  {recentDonations.length} recent donations
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Donations</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalDonors}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {uniqueDonors} unique donors
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Average Donation</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${averageDonation.toFixed(0)}</p>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  Per contribution
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Unique Donors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{uniqueDonors}</p>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  Active supporters
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Donations Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Donations</h2>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search donors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="date">Sort by Date</option>
                      <option value="amount">Sort by Amount</option>
                      <option value="name">Sort by Name</option>
                    </select>

                    {/* Filter */}
                    <select
                      value={filterAmount}
                      onChange={(e) => setFilterAmount(e.target.value as any)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="all">All Amounts</option>
                      <option value="small">&lt;= $25</option>
                      <option value="medium">$26 - $100</option>
                      <option value="large">&gt; $100</option>
                    </select>

                    {/* Export */}
                    <button
                      onClick={exportData}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center text-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Donor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredDonations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {donation.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {donation.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                            ${donation.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {new Date(donation.ts).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                            {donation.message || '-'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredDonations.length === 0 && (
                <div className="text-center py-12">
                  <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No donations found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {donations.length === 0 ? 'No donations have been made yet.' : 'Try adjusting your search criteria.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Donors */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Donors</h2>
              <div className="space-y-3">
                {topDonors.map((donor, index) => (
                  <div key={donor.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {donor.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ${donor.total.toLocaleString()}
                    </div>
                  </div>
                ))}
                {topDonors.length === 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                    No donors yet
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Donations</h2>
              <div className="space-y-3">
                {recentDonations.slice(0, 5).map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                        {donation.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {donation.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {new Date(donation.ts).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ${donation.amount}
                    </div>
                  </div>
                ))}
                {recentDonations.length === 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                    No recent donations
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${recentDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Largest Donation</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${donations.length > 0 ? Math.max(...donations.map(d => d.amount)).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Smallest Donation</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${donations.length > 0 ? Math.min(...donations.map(d => d.amount)).toLocaleString() : '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundMonitoring;
