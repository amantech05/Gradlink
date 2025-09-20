import React, { useEffect, useState } from 'react';
import { Upload, FileText, Calendar, Video, Image, File, X, CheckCircle } from 'lucide-react';

interface UploadedItem {
  id: string;
  name: string;
  type: 'session' | 'article';
  date: string;
  size: string;
}

const STORAGE_KEY = 'uploaded_items';

const Uploads = () => {
  const [activeTab, setActiveTab] = useState('session');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [items, setItems] = useState<UploadedItem[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const tabs = [
    { id: 'session', label: 'Session Materials', icon: Video },
    { id: 'article', label: 'Articles', icon: FileText }
  ];

  const simulateAddItems = (files: FileList) => {
    const added: UploadedItem[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      type: activeTab === 'session' ? 'session' : 'article',
      date: new Date().toISOString().slice(0, 10),
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`
    }));
    setItems((prev) => [...added, ...prev]);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    const totalSteps = 10;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setUploadProgress(step * (100 / totalSteps));
      if (step >= totalSteps) {
        clearInterval(interval);
        simulateAddItems(files);
        setIsUploading(false);
        setUploadComplete(true);
      }
    }, 200);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const SessionUploadForm = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Session Materials</h3>
        <p className="text-gray-600 mb-6">Share presentation slides, resources, and recordings from your mentorship sessions.</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
          <input
            type="text"
            placeholder="Enter session title..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={4}
            placeholder="Describe what was covered in this session..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Select category...</option>
              <option>Career Guidance</option>
              <option>Technical Skills</option>
              <option>Interview Preparation</option>
              <option>Industry Insights</option>
              <option>Portfolio Review</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Files</label>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
            onDrop={(e) => {
              e.preventDefault();
              handleFileUpload(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-sm text-gray-500">Supports: PDF, PPT, DOC, MP4, PNG, JPG (Max 100MB)</p>
            <input
              type="file"
              multiple
              accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              id="session-file-upload"
            />
            <label
              htmlFor="session-file-upload"
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Choose Files
            </label>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Uploading files...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Upload Complete */}
          {uploadComplete && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800">Files uploaded successfully!</span>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Publish Session
          </button>
        </div>
      </form>
    </div>
  );

  const ArticleUploadForm = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Write an Article</h3>
        <p className="text-gray-600 mb-6">Share your knowledge, experiences, and insights with the community.</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
          <input
            type="text"
            placeholder="Enter article title..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
          <textarea
            rows={2}
            placeholder="Brief description of your article..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Select category...</option>
              <option>Career Advice</option>
              <option>Networking</option>
              <option>Success Stories</option>
              <option>Industry Insights</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <input type="file" accept="image/*" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            rows={8}
            placeholder="Write your article here..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Save Draft</button>
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Publish Article</button>
        </div>
      </form>
    </div>
  );

  const FileIcon = ({ name }: { name: string }) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext || '')) return <Image className="w-5 h-5 text-indigo-600" />;
    if (['pdf', 'doc', 'docx', 'ppt', 'pptx'].includes(ext || '')) return <FileText className="w-5 h-5 text-indigo-600" />;
    if (['mp4', 'mov'].includes(ext || '')) return <Video className="w-5 h-5 text-indigo-600" />;
    return <File className="w-5 h-5 text-indigo-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Uploads</h1>
          <p className="text-gray-600">Share your session materials and articles with the community.</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="border-b border-gray-200 px-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  <span className="inline-flex items-center gap-2">
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Panels */}
          <div className="p-6">
            {activeTab === 'session' ? <SessionUploadForm /> : <ArticleUploadForm />}
          </div>
        </div>

        {/* Recent uploads */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent uploads</h2>
          </div>
          <div className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileIcon name={item.name} />
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-2">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.size}</div>
                      </div>
                    </div>
                    <button onClick={() => deleteItem(item.id)} className="text-gray-400 hover:text-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                    <span className="uppercase tracking-wide px-2 py-1 rounded bg-gray-100 text-gray-700">{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-sm text-gray-600">No uploads yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploads;