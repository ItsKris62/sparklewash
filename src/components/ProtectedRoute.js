import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

/**
 * Helper function to handle protected route logic.
 * @param {Object} user - The authenticated user object.
 * @param {string} expectedRole - The role required to access the route.
 * @param {string} redirectPath - Path to redirect if not authenticated.
 * @param {Object} location - Current location object.
 * @returns {JSX.Element} Navigation logic or Outlet for route rendering.
 */
const ProtectedRoute = ({ user, expectedRole, redirectPath, location }) => {
  if (!user?.token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (user.role !== expectedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const ProtectedUserRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return ProtectedRoute({
    user,
    expectedRole: 'user',
    redirectPath: '/login',
    location
  });
};

export const ProtectedAdminRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return ProtectedRoute({
    user,
    expectedRole: 'admin',
    redirectPath: '/admin/login',
    location
  });
};
