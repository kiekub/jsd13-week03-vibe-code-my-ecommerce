import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import { getBookingsByHost, getSessionsByBookingIds, getReviewsByBookingIds } from '../../mock/mockData';

export default function HostDashboard() {
  const { user } = useAuth();

  const hostBookings = getBookingsByHost(user.id);
  const hostSessions = getSessionsByBookingIds(hostBookings.map(b => b._id));
  const hostReviews = getReviewsByBookingIds(hostBookings.map(b => b._id));

  const upcomingBookings = hostBookings.filter(b =>
    b.booking_status === 'success' || b.booking_status === 'pending'
  );
  const upcomingSessions = hostSessions.filter(s =>
    s.confirmation_status === 'pending' || s.confirmation_status === 'confirmed'
  );

  const avgRating = hostReviews.length > 0
    ? (hostReviews.reduce((sum, r) => sum + r.rating, 0) / hostReviews.length).toFixed(1)
    : '0.0';

  return (
    <div>
      <h1 className="page-title">สวัสดี, {user.name} 👋</h1>

      <div className="stats-grid">
        <StatCard number={hostBookings.length} label="การจองทั้งหมด" icon="📋" />
        <StatCard number={hostSessions.length} label="เซสชันทั้งหมด" icon="😴" />
        <StatCard number={avgRating} label="คะแนนเฉลี่ย" icon="⭐" />
        <StatCard number={hostReviews.length} label="รีวิวทั้งหมด" icon="💬" />
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <h2 className="section-title">การจองที่กำลังดำเนินอยู่</h2>
          {upcomingBookings.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>ยังไม่มีการจอง</p>
            </div>
          ) : (
            <div className="card-grid">
              {upcomingBookings.slice(0, 3).map(b => (
                <div key={b._id} className="card">
                  <h3>#{b.payment.payment_id}</h3>
                  <p>ผู้ใช้: {b.user_id?.name || 'N/A'}</p>
                  <p>แพ็กเกจ: {b.plan_id?.plan_name || 'N/A'}</p>
                  <Badge status={b.booking_status} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">เซสชันที่กำลังจะถึง</h2>
          {upcomingSessions.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">😴</span>
              <p>ยังไม่มีเซสชันที่กำลังจะถึง</p>
            </div>
          ) : (
            <div className="card-grid">
              {upcomingSessions.slice(0, 3).map(s => (
                <div key={s._id} className="card">
                  <p>วันที่: {new Date(s.session_date).toLocaleDateString('th-TH')}</p>
                  <p>นอน: <Badge status={s.bedtime_status} /></p>
                  <p>ตื่น: <Badge status={s.wake_status} /></p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
