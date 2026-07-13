import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import ReviewCard from '../../components/ReviewCard';
import { mockUsers, mockHosts, mockBookings, mockSessions, mockReviews, mockPlans } from '../../mock/mockData';

export default function AdminDashboard() {
  const activeBookings = mockBookings.filter(b =>
    b.booking_status === 'success' || b.booking_status === 'pending'
  );

  const todaySessions = mockSessions.filter(s => {
    const sessionDate = new Date(s.session_date).toDateString();
    const today = new Date().toDateString();
    return sessionDate === today;
  });

  const recentBookings = mockBookings.slice(-5).reverse();
  const recentReviews = mockReviews.slice(-3).reverse();

  return (
    <div>
      <h1 className="page-title">แดชบอร์ดแอดมิน</h1>

      <div className="stats-grid">
        <StatCard number={mockUsers.length} label="ผู้ใช้ทั้งหมด" icon="◎" />
        <StatCard number={mockHosts.length} label="โฮสต์ทั้งหมด" icon="✦" />
        <StatCard number={activeBookings.length} label="การจองที่ใช้งาน" icon="◇" />
        <StatCard number={mockSessions.length} label="เซสชันทั้งหมด" icon="☽" />
        <StatCard number={mockReviews.length} label="รีวิวทั้งหมด" icon="★" />
        <StatCard number={mockPlans.length} label="แพ็กเกจ" icon="○" />
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <h2 className="section-title">การจองล่าสุด</h2>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>ผู้ใช้</th>
                  <th>โฮสต์</th>
                  <th>แพ็กเกจ</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b._id}>
                    <td>{b.payment.payment_id}</td>
                    <td>{b.user_id?.name || 'N/A'}</td>
                    <td>{b.host_id?.name || 'N/A'}</td>
                    <td>{b.plan_id?.plan_name || 'N/A'}</td>
                    <td><Badge status={b.booking_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">รีวิวล่าสุด</h2>
          <div className="card-grid">
            {recentReviews.map(review => (
              <ReviewCard key={review._id} review={review} showBookingId={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
