import React, { useEffect, useState } from 'react';
import { Users, Briefcase, Calendar, MessageSquare, Star, Globe, TrendingUp, Bookmark, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { notices, meetings } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

interface FundRequest {
  id: string;
  studentName: string;
  title: string;
  description: string;
  requiredAmount: number;
  ts: number;
  status: 'active' | 'completed' | 'cancelled';
}

interface Donation {
  id: string;
  name: string;
  amount: number;
  requestId: string;
  ts: number;
}

const FUND_REQUESTS_KEY = 'fund_requests';
const DONATIONS_KEY = 'donations';

const AlumniDashboard: React.FC = () => {
  const { user } = useAuth();
  const recentNotices = notices.slice(0, 4);
  const upcoming = meetings.filter(m => m.status === 'upcoming').slice(0, 2);

  const [fundRequests, setFundRequests] = useState<FundRequest[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  // Load fund requests and donations from localStorage on mount
  useEffect(() => {
    // Load stored data
    let storedRequests = localStorage.getItem(FUND_REQUESTS_KEY);
    let storedDonations = localStorage.getItem(DONATIONS_KEY);

    // Mock fund requests if none exist
    if (!storedRequests) {
      const mockRequests: FundRequest[] = [
        {
          id: uuidv4(),
          studentName: 'Demo Student 1',
          title: 'Laptop for Project',
          description: 'Need a laptop for final year project work.',
          requiredAmount: 50000,
          ts: Date.now(),
          status: 'active',
        },
        {
          id: uuidv4(),
          studentName: 'Demo Student 2',
          title: 'Course Fee Support',
          description: 'Need help to pay online course fees.',
          requiredAmount: 20000,
          ts: Date.now(),
          status: 'active',
        }
      ];
      localStorage.setItem(FUND_REQUESTS_KEY, JSON.stringify(mockRequests));
      storedRequests = JSON.stringify(mockRequests);
    }

    // Mock donations if none exist
    if (!storedDonations) {
      const parsedRequests: FundRequest[] = storedRequests ? JSON.parse(storedRequests) : [];
      const mockDonations: Donation[] = [
        {
          id: uuidv4(),
          name: 'Alumni 1',
          amount: 10000,
          requestId: parsedRequests[0].id,
          ts: Date.now(),
        },
        {
          id: uuidv4(),
          name: 'Alumni 2',
          amount: 5000,
          requestId: parsedRequests[1].id,
          ts: Date.now(),
        }
      ];
      localStorage.setItem(DONATIONS_KEY, JSON.stringify(mockDonations));
      storedDonations = JSON.stringify(mockDonations);
    }

    setFundRequests(storedRequests ? JSON.parse(storedRequests) : []);
    setDonations(storedDonations ? JSON.parse(storedDonations) : []);
  }, []);

  // Helper to calculate raised amount for a fund request
  const calculateRaisedAmount = (requestId: string) => {
    return donations
      .filter(d => d.requestId === requestId)
      .reduce((sum, d) => sum + d.amount, 0);
  };

  // Handle custom donation
  const donateToRequest = (requestId: string, amount: number) => {
    const newDonation: Donation = {
      id: uuidv4(),
      name: user?.name || 'Anonymous Alumni',
      amount,
      requestId,
      ts: Date.now(),
    };
    const updatedDonations = [...donations, newDonation];
    setDonations(updatedDonations);
    localStorage.setItem(DONATIONS_KEY, JSON.stringify(updatedDonations));
    alert(`₹${amount} donated successfully!`);
  };

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
            {/* Fund Requests */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-indigo-600" /> Fund Requests
              </h3>
              {fundRequests.length > 0 ? (
                <div className="space-y-4">
                  {fundRequests.map(req => {
                    const raised = calculateRaisedAmount(req.id);
                    const progress = Math.min((raised / req.requiredAmount) * 100, 100);
                    const reqDonations = donations.filter(d => d.requestId === req.id);

                    return (
                      <div key={req.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{req.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${req.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{req.description}</p>
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>{raised} / {req.requiredAmount} raised</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>

                        {/* Donor list with amounts */}
                        {reqDonations.length > 0 && (
                          <div className="mb-2 text-xs text-gray-700">
                            Donors: {reqDonations.map(d => `${d.name} (₹${d.amount})`).join(', ')}
                          </div>
                        )}

                        {/* Donate button with prompt */}
                        <button
                          onClick={() => {
                            const amountStr = prompt('Enter donation amount (₹):');
                            if (!amountStr) return;
                            const amount = Number(amountStr);
                            if (isNaN(amount) || amount <= 0) return alert('Enter a valid amount!');
                            donateToRequest(req.id, amount);
                          }}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                        >
                          Donate
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No fund requests available.</p>
              )}
            </div>
          </div>

          {/* Right column: notices */}
          <div className="space-y-6">
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
