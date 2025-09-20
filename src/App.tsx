import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import { AuthProvider, useAuth } from "./hooks/useAuth";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Mentors from "./pages/Mentors";
import Uploads from "./pages/Uploads";
import Noticeboard from "./pages/Noticeboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Meetings from "./pages/Meetings";
import Articles from "./pages/Articles";
import Messages from "./pages/Messages";
import NoticeDetail from "./pages/NoticeDetail";
import StudentDashboard from "./pages/StudentDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import Funds from "./pages/Funds";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import Analytics from "./pages/admin/Analytics";
import FundMonitoring from "./pages/admin/FundMonitoring";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                {user?.role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : user?.role === "alumni" ? (
                  <AlumniDashboard />
                ) : user?.role === "student" ? (
                  <StudentDashboard />
                ) : (
                  <Dashboard />
                )}
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <UserManagement />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <AdminRoute>
              <AdminLayout>
                <ContentManagement />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AdminLayout>
                <Analytics />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminLayout>
                <SystemSettings />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/funds"
          element={
            <AdminRoute>
              <AdminLayout>
                <FundMonitoring />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/funds"
          element={
            <AdminRoute>
              <AdminLayout>
                <FundMonitoring />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/mentors"
          element={
            <PrivateRoute>
              <Layout>
                <Mentors />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/uploads"
          element={
            <PrivateRoute>
              <Layout>
                <Uploads />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/noticeboard"
          element={
            <PrivateRoute>
              <Layout>
                <Noticeboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/notice/:id"
          element={
            <PrivateRoute>
              <Layout>
                <NoticeDetail />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/meetings"
          element={
            <PrivateRoute>
              <Layout>
                <Meetings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/articles"
          element={
            <PrivateRoute>
              <Layout>
                <Articles />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <Layout>
                <Messages />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/funds"
          element={
            <PrivateRoute>
              <Layout>
                <Funds />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* Keep landing available if needed */}
        <Route path="/landing" element={<Landing />} />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
