import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'alumni' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password, role);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue to your dashboard.</p>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Sign in as</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setRole('student')} className={`px-3 py-1.5 text-sm rounded-md border ${role === 'student' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Student</button>
              <button type="button" onClick={() => setRole('alumni')} className={`px-3 py-1.5 text-sm rounded-md border ${role === 'alumni' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Alumni</button>
              <button type="button" onClick={() => setRole('admin')} className={`px-3 py-1.5 text-sm rounded-md border ${role === 'admin' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Admin</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@gradapp.test"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline">Forgot?</Link>
            </div>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="demo1234"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="inline-flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50">
              <span className="text-[#DB4437]">G</span>
              Google
            </button>
            <button className="inline-flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50">
              <span className="text-[#1877F2]">f</span>
              Facebook
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-6">
          No account yet? <Link to="/signup" className="text-indigo-600 hover:underline">Create one</Link>
        </p>
        <div className="mt-6 text-xs text-gray-500">
          <p>Demo: email <span className="font-medium">demo@gradapp.test</span> / password <span className="font-medium">demo1234</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 