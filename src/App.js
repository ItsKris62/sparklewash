// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import UserDashboard from './pages/UserDashboard';
import Orders from './pages/OrderPage';
import ProfileManagement from './pages/ProfileManagement';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './layouts/Footer';
import SideNav from './layouts/SideNav';
import NotFoundPage from './pages/NotFound';
import { UserProvider } from './components/context/UserContext';
import AdminLogin from './components/AdminDashboard/AdminLogin'; // Import AdminLogin component
import { AuthProvider, useAuth } from './components/context/AuthContext'; // Corrected import

function App() {
  const location = useLocation();
  const { setUser } = useAuth(); // Replacing useUser with useAuth

  const isUserDashboard = location.pathname.startsWith('/user-dashboard');
  const isAdminDashboard = location.pathname.startsWith('/admin-dashboard');

  // Logout function to clear auth context
  const handleLogout = () => {
    setUser({ firstName: '', lastName: '', token: null });
  };

  return (
    <div className="App">
      {isUserDashboard && <SideNav onLogout={handleLogout} />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        
        {/* Protected Routes for User and Admin Dashboards */}
        <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileManagement /></ProtectedRoute>} />
        <Route path="/admin-dashboard/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        
        {/* Add route for Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isUserDashboard && !isAdminDashboard && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
        <App />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;

// ProtectedRoute Component to handle route protection based on authentication
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  // Redirect to login if the user is not authenticated
  return user?.token ? children : <Navigate to="/login" />;
}
