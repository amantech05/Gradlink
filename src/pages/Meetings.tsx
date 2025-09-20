import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock, Video, Plus } from 'lucide-react';
import { meetings as seedMeetings } from '../data/mockData';
import { useSearchParams } from 'react-router-dom';

interface NewMeetingForm {
  title: string;
  mentor: string;
  date: string;
  duration: number;
  type: 'virtual' | 'in-person';
}

const STORAGE_KEY = 'user_meetings';

const Meetings: React.FC = () => {
  const [params] = useSearchParams();
  const prefillMentor = params.get('mentor') || '';

  const [items, setItems] = useState<typeof seedMeetings>([]);
  const [form, setForm] = useState<NewMeetingForm>({
    title: '',
    mentor: prefillMentor,
    date: '',
    duration: 30,
    type: 'virtual'
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    setItems([...seedMeetings, ...parsed]);
  }, []);

  const upcoming = useMemo(() => items.filter(m => m.status === 'upcoming'), [items]);

  const createMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    await new Promise((r) => setTimeout(r, 400));
    const newMeeting = {
      id: `${Date.now()}`,
      title: form.title || `Session with ${form.mentor}`,
      mentor: form.mentor,
      date: new Date(form.date).toISOString(),
      duration: form.duration,
      type: form.type,
      status: 'upcoming' as const
    };
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [newMeeting, ...existing];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setItems((prev) => [newMeeting, ...prev]);
    setForm({ title: '', mentor: prefillMentor, date: '', duration: 30, type: 'virtual' });
    setCreating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meetings</h1>
          <p className="text-gray-600">View and schedule mentorship sessions.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcoming.map((m) => (
                  <div key={m.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{m.title}</h3>
                      <p className="text-sm text-gray-600">with {m.mentor}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(m.date).toLocaleString()} • {m.duration} min
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${m.type === 'virtual' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'}`}>{m.type}</span>
                  </div>
                ))}
                {upcoming.length === 0 && (
                  <div className="text-sm text-gray-600">No upcoming meetings yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule a meeting</h2>
              <form onSubmit={createMeeting} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mentor</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.mentor}
                    onChange={(e) => setForm({ ...form, mentor: e.target.value })}
                    placeholder="Mentor name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Session topic"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date & time</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                    <input
                      type="number"
                      min={15}
                      step={15}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as 'virtual' | 'in-person' })}
                    required
                  >
                    <option value="virtual">Virtual</option>
                    <option value="in-person">In person</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={creating}
                  className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {creating ? 'Scheduling…' : 'Schedule meeting'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick tips</h2>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                <li>Be specific about your meeting goal to get better guidance.</li>
                <li>Prepare your questions in advance to make the most of the time.</li>
                <li>Follow up with notes and action items after the session.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings; 