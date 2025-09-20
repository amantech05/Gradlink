import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Forgot password</h1>
        <p className="text-sm text-gray-500 mb-6">Enter your email to receive a reset link.</p>

        {sent ? (
          <div className="space-y-6">
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
              If an account exists for <span className="font-medium">{email}</span>, a reset link has been sent.
            </div>
            <Link to="/login" className="inline-flex justify-center w-full rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
            <div className="text-sm text-gray-600">
              Remembered it? <Link to="/login" className="text-indigo-600 hover:underline">Back to sign in</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 