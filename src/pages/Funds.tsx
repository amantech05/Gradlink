import React, { useEffect, useState } from 'react';
import {
  Heart,
  CreditCard,
  CheckCircle,
  Lightbulb,
  DollarSign,
  Clock,
  User,
  Send,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface Donation {
  id: string;
  name: string;
  amount: number;
  message?: string;
  ts: number;
  requestId?: string;
}

interface FundRequest {
  id: string;
  studentName: string;
  title: string;
  description: string;
  requiredAmount: number;
  raisedAmount: number;
  ts: number;
  status: 'active' | 'completed' | 'cancelled';
}

const DONATIONS_KEY = 'donations';
const FUND_REQUESTS_KEY = 'fund_requests';

// Mock Data
const mockRequests: FundRequest[] = [
  {
    id: 'r1',
    studentName: 'John Doe',
    title: 'AI Study App',
    description: 'An AI-powered assistant to help students learn faster.',
    requiredAmount: 500,
    raisedAmount: 150,
    ts: Date.now() - 86400000,
    status: 'active',
  },
  {
    id: 'r2',
    studentName: 'Jane Smith',
    title: 'Solar Energy Project',
    description: 'Developing affordable solar panels for local schools.',
    requiredAmount: 1000,
    raisedAmount: 600,
    ts: Date.now() - 172800000,
    status: 'active',
  },
];

const mockDonations: Donation[] = [
  { id: 'd1', name: 'Alumni A', amount: 100, requestId: 'r1', ts: Date.now() - 8000000 },
  { id: 'd2', name: 'Alumni B', amount: 50, requestId: 'r1', ts: Date.now() - 6000000 },
  { id: 'd3', name: 'Alumni C', amount: 200, requestId: 'r2', ts: Date.now() - 4000000 },
];

const Funds: React.FC = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';
  const isAlumni = user?.role === 'alumni';

  // Student form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredAmount, setRequiredAmount] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Alumni donation states
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [donorName, setDonorName] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState<string | null>(null);

  // Data states
  const [fundRequests, setFundRequests] = useState<FundRequest[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  // Load fund requests and donations from localStorage or use mock
  useEffect(() => {
    const storedRequests = localStorage.getItem(FUND_REQUESTS_KEY);
    const parsedRequests: FundRequest[] = storedRequests ? JSON.parse(storedRequests) : [];
    setFundRequests(parsedRequests.length ? parsedRequests : mockRequests);

    const storedDonations = localStorage.getItem(DONATIONS_KEY);
    const parsedDonations: Donation[] = storedDonations ? JSON.parse(storedDonations) : [];
    setDonations(parsedDonations.length ? parsedDonations : mockDonations);
  }, []);

  useEffect(() => {
    localStorage.setItem(FUND_REQUESTS_KEY, JSON.stringify(fundRequests));
  }, [fundRequests]);

  useEffect(() => {
    localStorage.setItem(DONATIONS_KEY, JSON.stringify(donations));
  }, [donations]);

  const calculateRaisedAmount = (requestId: string) => {
    return donations
      .filter((d) => d.requestId === requestId)
      .reduce((sum, d) => sum + d.amount, 0);
  };

  const getProgressPercentage = (requestId: string, requiredAmount: number) => {
    const raised = calculateRaisedAmount(requestId);
    return Math.min((raised / requiredAmount) * 100, 100);
  };

  // Student: Submit fund request
  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !requiredAmount || Number(requiredAmount) <= 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const newRequest: FundRequest = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      studentName: user?.name || 'Anonymous Student',
      title: title.trim(),
      description: description.trim(),
      requiredAmount: Number(requiredAmount),
      raisedAmount: 0,
      ts: Date.now(),
      status: 'active',
    };

    setFundRequests((prev) => [newRequest, ...prev]);
    setRequestSuccess(true);
    setSubmitting(false);
    setTitle('');
    setDescription('');
    setRequiredAmount('');

    setTimeout(() => setRequestSuccess(false), 3000);
  };

  // Alumni: Donate to request
  const submitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !donationAmount || Number(donationAmount) <= 0) return;

    setProcessing(true);
    await new Promise((r) => setTimeout(r, 700));

    const donation: Donation = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      name: donorName.trim() || 'Anonymous Alumni',
      amount: Number(donationAmount),
      message: donationMessage.trim() || undefined,
      ts: Date.now(),
      requestId: selectedRequest,
    };

    setDonations((prev) => [donation, ...prev]);

    setFundRequests((prev) =>
      prev.map((req) => {
        if (req.id === selectedRequest) {
          const newRaisedAmount = calculateRaisedAmount(selectedRequest) + Number(donationAmount);
          return {
            ...req,
            raisedAmount: newRaisedAmount,
            status: newRaisedAmount >= req.requiredAmount ? 'completed' : 'active',
          };
        }
        return req;
      })
    );

    setDonationSuccess(selectedRequest);
    setProcessing(false);
    setSelectedRequest(null);
    setDonationAmount('');
    setDonorName('');
    setDonationMessage('');

    setTimeout(() => setDonationSuccess(null), 3000);
  };

  if (isStudent) {
    // --- Student JSX (keep original UI) ---
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Project Funding</h1>
            <p className="text-gray-600">
              Share your innovative ideas and get funding support from our alumni community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Request Form */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">Submit Your Idea</h2>
              </div>
              <form onSubmit={submitRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., AI-Powered Study Assistant App"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project idea..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Funding (USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={requiredAmount}
                    onChange={(e) => setRequiredAmount(Number(e.target.value))}
                    placeholder="e.g., 5000"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
                {requestSuccess && (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-2">
                    <CheckCircle className="w-4 h-4" /> Your funding request has been submitted successfully!
                  </div>
                )}
              </form>
            </div>

            {/* My Requests */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Requests</h2>
              <div className="space-y-4">
                {fundRequests.filter((req) => req.studentName === user?.name).map((request) => {
                  const raised = calculateRaisedAmount(request.id);
                  const progress = getProgressPercentage(request.id, request.requiredAmount);
                  return (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{request.title}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{request.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            {raised} / {request.requiredAmount}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {progress.toFixed(1)}% funded •{' '}
                          {donations.filter((d) => d.requestId === request.id).length} supporters
                        </div>
                      </div>
                    </div>
                  );
                })}
                {fundRequests.filter((req) => req.studentName === user?.name).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No requests submitted yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAlumni) {
    // --- Alumni JSX (keep original UI) ---
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Student Innovation</h1>
            <p className="text-gray-600">
              Help fund the next generation of innovative projects from talented students.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Fund Requests */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Funding Requests</h2>
              <div className="space-y-6">
                {fundRequests.filter((req) => req.status === 'active').map((request) => {
                  const raised = calculateRaisedAmount(request.id);
                  const progress = getProgressPercentage(request.id, request.requiredAmount);
                  const supportersCount = donations.filter((d) => d.requestId === request.id).length;

                  return (
                    <div key={request.id} className="bg-white rounded-2xl shadow-sm border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <User className="w-4 h-4" />
                            <span>by {request.studentName}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{new Date(request.ts).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{request.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Funding Progress</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {raised} / {request.requiredAmount}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{progress.toFixed(1)}% funded</span>
                          <span>{supportersCount} supporters</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedRequest(request.id)}
                        className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Support This Project
                      </button>
                    </div>
                  );
                })}

                {fundRequests.filter((req) => req.status === 'active').length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active requests</h3>
                    <p className="text-gray-600">Check back later for new student projects to support.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Donation Form */}
            <div className="lg:col-span-1">
              {selectedRequest ? (
                <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-8">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Make a Donation</h3>
                  </div>

                  <form onSubmit={submitDonation} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {[50, 100, 250, 500].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => setDonationAmount(amount)}
                            className={`px-3 py-2 border rounded-md text-sm ${
                              donationAmount === amount ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                            }`}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(Number(e.target.value))}
                        placeholder="Custom amount"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Optional"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        rows={3}
                        value={donationMessage}
                        onChange={(e) => setDonationMessage(e.target.value)}
                        placeholder="Optional message"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
                    >
                      {processing ? 'Processing...' : 'Donate Now'}
                    </button>

                    {donationSuccess && (
                      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-2">
                        <CheckCircle className="w-4 h-4" /> Thank you for supporting this project!
                      </div>
                    )}
                  </form>
                </div>
              ) : (
                <div className="text-center text-gray-500 p-6 bg-white rounded-2xl shadow-sm border">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Select a project to donate.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Unauthorized</div>;
};

export default Funds;
