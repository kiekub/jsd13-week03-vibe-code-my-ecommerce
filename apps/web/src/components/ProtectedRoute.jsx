import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles, allowedTypes }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div className="loading-container"><p>กำลังโหลด...</p></div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedTypes && !allowedTypes.includes(user.type)) {
    if (user.type === 'host') return <Navigate to="/host/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  if (allowedRoles && user.type === 'user' && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
