import React, { useEffect, useState } from 'react';
import { Heart, CreditCard, CheckCircle } from 'lucide-react';

interface Donation {
  id: string;
  name: string;
  amount: number;
  message?: string;
  ts: number;
}

const STORAGE_KEY = 'donations';

const preset = [10, 25, 50, 100];

const Funds: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('' as any);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<Donation | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const parsed: Donation[] = stored ? JSON.parse(stored) : [];
    setDonations(parsed);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
  }, [donations]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 700));
    const donation: Donation = {
      id: `${Date.now()}`,
      name: name.trim() || 'Anonymous',
      amount: Number(amount),
      message: message.trim() || undefined,
      ts: Date.now(),
    };
    setDonations((prev) => [donation, ...prev]);
    setSuccess(donation);
    setProcessing(false);
    setAmount('' as any);
    setName('');
    setMessage('');
  };

  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Our Community</h1>
          <p className="text-gray-600">Your donation helps fund mentorship programs, student scholarships, and platform improvements.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Make a donation</h2>
              <div className="text-sm text-gray-600">Raised: <span className="font-semibold">${total.toLocaleString()}</span></div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {preset.map((p) => (
                    <button type="button" key={p} onClick={() => setAmount(p)} className={`px-3 py-2 border rounded-md text-sm ${amount === p ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>${p}</button>
                  ))}
                </div>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Custom amount"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A note to our team"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {processing ? 'Processing…' : 'Donate'}
              </button>
              {success && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-2">
                  <CheckCircle className="w-4 h-4" /> Thank you for donating ${success.amount}!
                </div>
              )}
            </form>

            <p className="text-xs text-gray-500 mt-4">Note: This is a demo. No real payment is processed.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-pink-600" /> Recent supporters</h2>
            <div className="space-y-3">
              {donations.map((d) => (
                <div key={d.id} className="flex items-start justify-between border rounded-lg p-3">
                  <div>
                    <div className="font-medium text-gray-900">{d.name}</div>
                    {d.message && <div className="text-sm text-gray-600">{d.message}</div>}
                  </div>
                  <div className="text-indigo-600 font-semibold">${d.amount.toLocaleString()}</div>
                </div>
              ))}
              {donations.length === 0 && (
                <div className="text-sm text-gray-600">No donations yet. Be the first to support!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds; 