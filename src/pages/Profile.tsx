import React, { useState } from "react";
import {
  Edit,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Award,
  BookOpen,
  Users,
} from "lucide-react";
import LevelBadge from "../components/common/LevelBadge";
import { useAuth } from "../hooks/useAuth";
import { achievements, articles } from "../data/mockData";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "achievements", label: "Achievements" },
    { id: "articles", label: "Articles" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <div className="relative -mt-16">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="mt-4 sm:mt-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {user?.name}
                    </h1>
                    <p className="text-gray-600">{user?.title}</p>
                    <div className="mt-2">
                      <LevelBadge
                        level={user?.level || "Bronze"}
                        progress={user?.levelProgress}
                        showProgress
                      />
                    </div>
                  </div>
                  <button className="mt-4 sm:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {user?.email}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {new Date(user?.joinDate || "").toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center border">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {achievements.length}
            </div>
            <div className="text-gray-600">Achievements</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center border">
            <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {articles.length}
            </div>
            <div className="text-gray-600">Articles</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center border">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">48</div>
            <div className="text-gray-600">Connections</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center border">
            <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-gray-600">Sessions</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    About
                  </h3>
                  <p className="text-gray-600">
                    Passionate computer science graduate with a strong
                    foundation in software development and machine learning.
                    Eager to contribute to innovative projects and learn from
                    experienced professionals in the tech industry.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JavaScript",
                      "Python",
                      "React",
                      "Node.js",
                      "Machine Learning",
                      "SQL",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Bachelor of Science in Computer Science
                      </h4>
                      <p className="text-gray-600">
                        University of Technology • 2020-2024
                      </p>
                      <p className="text-sm text-gray-500">
                        GPA: 3.8/4.0 • Bhagwan Parshuram Institute & Technology
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Achievements Timeline
                </h3>
                <div className="space-y-6">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            achievement.type === "academic"
                              ? "bg-indigo-100"
                              : achievement.type === "professional"
                              ? "bg-emerald-100"
                              : "bg-fuchsia-100"
                          }`}
                        >
                          {achievement.badge}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          {achievement.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "articles" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Published Articles
                </h3>
                <div className="grid gap-6">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer">
                            {article.title}
                          </h4>
                          <p className="text-gray-600 mt-2">
                            {article.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                            <span>
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                            <span>{article.likes} likes</span>
                            <span>{article.views} views</span>
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {article.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        Published article "Breaking into Tech"
                      </p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        Connected with 3 new mentors
                      </p>
                      <p className="text-sm text-gray-500">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="w-8 h-8 bg-fuchsia-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-fuchsia-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        Earned "Hackathon Winner" achievement
                      </p>
                      <p className="text-sm text-gray-500">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
