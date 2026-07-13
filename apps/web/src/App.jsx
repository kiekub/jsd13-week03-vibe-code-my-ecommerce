import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

import Home from './pages/Home';
import Hosts from './pages/Hosts';
import HostDetail from './pages/HostDetail';
import Plans from './pages/Plans';
import BookingPage from './pages/BookingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

import UserDashboard from './pages/user/UserDashboard';
import UserBookings from './pages/user/UserBookings';
import UserSessions from './pages/user/UserSessions';
import UserProfile from './pages/user/UserProfile';

import HostDashboardPage from './pages/host/HostDashboard';
import HostPlans from './pages/host/HostPlans';
import HostBookings from './pages/host/HostBookings';
import HostSessions from './pages/host/HostSessions';
import HostReviews from './pages/host/HostReviews';
import HostProfile from './pages/host/HostProfile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminHosts from './pages/admin/AdminHosts';
import AdminPlans from './pages/admin/AdminPlans';
import AdminBookings from './pages/admin/AdminBookings';
import AdminSessions from './pages/admin/AdminSessions';
import AdminReviews from './pages/admin/AdminReviews';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}

function DashboardRoute({ children }) {
  return (
    <ProtectedRoute allowedTypes={['user']}>
      <div className="app">
        <Navbar />
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </ProtectedRoute>
  );
}

function HostRoute({ children }) {
  return (
    <ProtectedRoute allowedTypes={['host']}>
      <div className="app">
        <Navbar />
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </ProtectedRoute>
  );
}

function AdminRoute({ children }) {
  return (
    <ProtectedRoute allowedTypes={['user']} allowedRoles={['admin']}>
      <div className="app">
        <Navbar />
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div className="loading-container"><p>กำลังโหลด...</p></div>;

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to={
        user?.type === 'host' ? '/host/dashboard' :
        user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'
      } replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/hosts" element={<PublicLayout><Hosts /></PublicLayout>} />
      <Route path="/hosts/:id" element={<PublicLayout><HostDetail /></PublicLayout>} />
      <Route path="/plans" element={<PublicLayout><Plans /></PublicLayout>} />
      <Route path="/booking" element={<PublicLayout><BookingPage /></PublicLayout>} />

      <Route path="/dashboard" element={<DashboardRoute><UserDashboard /></DashboardRoute>} />
      <Route path="/dashboard/bookings" element={<DashboardRoute><UserBookings /></DashboardRoute>} />
      <Route path="/dashboard/sessions" element={<DashboardRoute><UserSessions /></DashboardRoute>} />
      <Route path="/dashboard/profile" element={<DashboardRoute><UserProfile /></DashboardRoute>} />

      <Route path="/host/dashboard" element={<HostRoute><HostDashboardPage /></HostRoute>} />
      <Route path="/host/plans" element={<HostRoute><HostPlans /></HostRoute>} />
      <Route path="/host/bookings" element={<HostRoute><HostBookings /></HostRoute>} />
      <Route path="/host/sessions" element={<HostRoute><HostSessions /></HostRoute>} />
      <Route path="/host/reviews" element={<HostRoute><HostReviews /></HostRoute>} />
      <Route path="/host/profile" element={<HostRoute><HostProfile /></HostRoute>} />

      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/admin/hosts" element={<AdminRoute><AdminHosts /></AdminRoute>} />
      <Route path="/admin/plans" element={<AdminRoute><AdminPlans /></AdminRoute>} />
      <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
      <Route path="/admin/sessions" element={<AdminRoute><AdminSessions /></AdminRoute>} />
      <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
