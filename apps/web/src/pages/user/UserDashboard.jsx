import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import { getBookingsByUser, getSessionsByBookingIds } from '../../mock/mockData';

export default function UserDashboard() {
  const { user } = useAuth();

  const userBookings = getBookingsByUser(user.id);
  const userSessions = getSessionsByBookingIds(userBookings.map(b => b._id));

  const upcomingBookings = userBookings.filter(b =>
    b.booking_status === 'success' || b.booking_status === 'pending'
  );
  const recentSessions = userSessions.slice(-5).reverse();

  const onTimeCount = userSessions.filter(s => s.bedtime_status === 'completed').length;

  return (
    <div>
      <h1 className="page-title">สวัสดี, {user.name} 👋</h1>

      <div className="stats-grid">
        <StatCard number={userBookings.length} label="การจองทั้งหมด" icon="📋" />
        <StatCard number={userSessions.length} label="เซสชันทั้งหมด" icon="😴" />
        <StatCard number={onTimeCount} label="เข้านอนตรงเวลา" icon="✅" />
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <h2 className="section-title">การจองที่กำลังดำเนินอยู่</h2>
          {upcomingBookings.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>ยังไม่มีการจอง</p>
              <Link to="/hosts" className="btn btn-primary btn-sm">เลือกโฮสต์</Link>
            </div>
          ) : (
            <div className="card-grid">
              {upcomingBookings.slice(0, 3).map(b => (
                <div key={b._id} className="card">
                  <h3>#{b.payment.payment_id}</h3>
                  <p>โฮสต์: {b.host_id?.name || 'N/A'}</p>
                  <p>แพ็กเกจ: {b.plan_id?.plan_name || 'N/A'}</p>
                  <p className="price">฿{b.payment.amount.toLocaleString()}</p>
                  <Badge status={b.booking_status} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">เซสชันล่าสุด</h2>
          {recentSessions.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">😴</span>
              <p>ยังไม่มีเซสชัน</p>
            </div>
          ) : (
            <div className="card-grid">
              {recentSessions.map(s => (
                <div key={s._id} className="card">
                  <p>วันที่: {new Date(s.session_date).toLocaleDateString('th-TH')}</p>
                  <p>นอน: <Badge status={s.bedtime_status} /></p>
                  <p>ตื่น: <Badge status={s.wake_status} /></p>
                  {s.sleep_duration && <p>ชั่วโมงนอน: {s.sleep_duration} ชม.</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
