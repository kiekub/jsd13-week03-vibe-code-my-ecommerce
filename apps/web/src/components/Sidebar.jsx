import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const userLinks = [
  { to: '/dashboard', label: 'แดชบอร์ด', icon: '◈' },
  { to: '/dashboard/bookings', label: 'การจองของฉัน', icon: '◎' },
  { to: '/dashboard/sessions', label: 'เซสชันของฉัน', icon: '☽' },
  { to: '/dashboard/profile', label: 'โปรไฟล์', icon: '◇' },
];

const hostLinks = [
  { to: '/host/dashboard', label: 'แดชบอร์ด', icon: '◈' },
  { to: '/host/plans', label: 'แพ็กเกจของฉัน', icon: '◎' },
  { to: '/host/bookings', label: 'การจองที่เข้ามา', icon: '☽' },
  { to: '/host/sessions', label: 'เซสชันที่กำลังจะถึง', icon: '✦' },
  { to: '/host/reviews', label: 'รีวิว', icon: '★' },
  { to: '/host/profile', label: 'โปรไฟล์', icon: '◇' },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'แดชบอร์ด', icon: '◈' },
  { to: '/admin/users', label: 'ผู้ใช้', icon: '◎' },
  { to: '/admin/hosts', label: 'โฮสต์', icon: '✦' },
  { to: '/admin/plans', label: 'แพ็กเกจ', icon: '☽' },
  { to: '/admin/bookings', label: 'การจอง', icon: '◇' },
  { to: '/admin/sessions', label: 'เซสชัน', icon: '○' },
  { to: '/admin/reviews', label: 'รีวิว', icon: '★' },
];

export default function Sidebar() {
  const { user } = useAuth();

  let links = userLinks;
  let title = 'แดชบอร์ดผู้ใช้';
  if (user?.type === 'host') {
    links = hostLinks;
    title = 'แดชบอร์ดโฮสต์';
  } else if (user?.role === 'admin') {
    links = adminLinks;
    title = 'แดชบอร์ดแอดมิน';
  }

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">{title}</h3>
      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to.endsWith('/dashboard')}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
