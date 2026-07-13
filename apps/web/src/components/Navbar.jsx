import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: '/', label: 'หน้าแรก' },
        { to: '/hosts', label: 'โฮสต์' },
        { to: '/plans', label: 'แพ็กเกจ' },
      ];
    }

    if (user.type === 'host') {
      return [
        { to: '/host/dashboard', label: 'แดชบอร์ด' },
        { to: '/host/plans', label: 'แพ็กเกจ' },
        { to: '/host/bookings', label: 'การจอง' },
        { to: '/host/sessions', label: 'เซสชัน' },
        { to: '/host/reviews', label: 'รีวิว' },
      ];
    }

    if (user.role === 'admin') {
      return [
        { to: '/admin/dashboard', label: 'แดชบอร์ด' },
        { to: '/admin/users', label: 'ผู้ใช้' },
        { to: '/admin/hosts', label: 'โฮสต์' },
        { to: '/admin/plans', label: 'แพ็กเกจ' },
        { to: '/admin/bookings', label: 'การจอง' },
        { to: '/admin/sessions', label: 'เซสชัน' },
        { to: '/admin/reviews', label: 'รีวิว' },
      ];
    }

    return [
      { to: '/dashboard', label: 'แดชบอร์ด' },
      { to: '/dashboard/bookings', label: 'การจองของฉัน' },
      { to: '/dashboard/sessions', label: 'เซสชัน' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">🌙 Sleep Routine</Link>
      <nav>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to}>{link.label}</Link>
        ))}
        {isAuthenticated ? (
          <>
            <span className="navbar-user">{user.name}</span>
            <button className="btn btn-sm btn-secondary" onClick={handleLogout}>ออกจากระบบ</button>
          </>
        ) : (
          <>
            <Link to="/login">เข้าสู่ระบบ</Link>
            <Link to="/register">สมัครสมาชิก</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
