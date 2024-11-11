import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useAuth } from './components/context/AuthContext';
import { ProtectedUserRoute, ProtectedAdminRoute } from './components/ProtectedRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Footer from './layouts/Footer';
import React from 'react';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const ProfilePage = lazy(() => import('./pages/ProfileManagement'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./components/AdminDashboard/AdminLogin'));
const AdminOrders = lazy(() => import('./components/AdminDashboard/AdminOrders'));
const AdminServices = lazy(() => import('./components/AdminDashboard/AdminServices'));
const AdminSettings = lazy(() => import('./components/AdminDashboard/AdminSettings'));
const AdminReports = lazy(() => import('./components/AdminDashboard/AdminReports'));
const AdminAnalytics = lazy(() => import('./components/AdminDashboard/AdminAnalytics'));
const AdminUsers = lazy(() => import('./components/AdminDashboard/AdminUsers'));
const LoginOverlay = lazy(() => import('./components/LoginOverlay'));
const RegisterOverlay = lazy(() => import('./components/RegisterOverlay'));
const Services = lazy(() => import('./pages/Services'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminLogs = lazy(() => import('./components/AdminDashboard/AdminLogs'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <this.props.FallbackComponent error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Error Fallback Component
const ErrorFallback = ({ error }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error?.message || 'An unexpected error occurred'}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  </div>
);

function App() {
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showRegisterOverlay, setShowRegisterOverlay] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const handleCloseOverlay = () => {
    setShowLoginOverlay(false);
    setShowRegisterOverlay(false);
  };

  const handleSwitchToRegister = () => {
    setShowLoginOverlay(false);
    setShowRegisterOverlay(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterOverlay(false);
    setShowLoginOverlay(true);
  };

  useEffect(() => {
    setShowLoginOverlay(false);
    setShowRegisterOverlay(false);
  }, [location.pathname]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Home /> <Footer /></>} />
          <Route path="/services" element={<><Services /> <Footer /></>} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route path="/admin/login" element={user?.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> : <AdminLogin />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedUserRoute />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/orders" element={<OrderPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              <Route path="/admin-dashboard/orders" element={<AdminOrders />} />
              <Route path="/admin-dashboard/services" element={<AdminServices />} />
              <Route path="/admin-dashboard/settings" element={<AdminSettings />} />
              <Route path="/admin-dashboard/reports" element={<AdminReports />} />
              <Route path="/admin-dashboard/analytics" element={<AdminAnalytics />} />
              <Route path="/admin-dashboard/users" element={<AdminUsers />} />
              <Route path="/admin-dashboard/logs" element={<AdminLogs />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Overlays */}
        {showLoginOverlay && (
          <LoginOverlay 
            onClose={handleCloseOverlay}
            isOpen={showLoginOverlay}
            onSwitchToRegister={handleSwitchToRegister}
          />
        )}
        {showRegisterOverlay && (
          <RegisterOverlay 
            onClose={handleCloseOverlay}
            isOpen={showRegisterOverlay}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
