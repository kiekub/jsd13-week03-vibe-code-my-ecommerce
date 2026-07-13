import { Link } from 'react-router-dom';
import HostCard from '../components/HostCard';
import PlanCard from '../components/PlanCard';
import ReviewCard from '../components/ReviewCard';
import { mockHosts, mockPlans, mockReviews, mockBookings, mockSessions, mockUsers } from '../mock/mockData';

function Home() {
  const activeHosts = mockHosts.filter(h => h.host_status === 'active').slice(0, 3);
  const latestReviews = mockReviews.slice(0, 6);

  return (
    <div>
      <section className="hero">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>

        <div className="hero-content">
          <h1>Sleep Better. Dream Bigger.</h1>
          <p>
            ปล่อยให้โฮสต์ส่วนตัวดูแลการนอนของคุณ ตั้งแต่เตือนเข้านอน ปลุกตอนเช้า
            จนถึงติดตามสถิติการนอนหลับ เพื่อให้คุณนอนหลับสบายทุกคืน
          </p>
          <div className="hero-actions">
            <Link to="/hosts" className="btn btn-primary">จองโฮสต์ของคุณ</Link>
            <Link to="/plans" className="btn btn-secondary">สำรวจแพ็กเกจ</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">โฮสต์แนะนำ</h2>
          <div className="card-grid">
            {activeHosts.map(host => (
              <HostCard key={host._id} host={host} />
            ))}
          </div>
          {mockHosts.filter(h => h.host_status === 'active').length > 3 && (
            <div className="section-more">
              <Link to="/hosts">ดูโฮสต์ทั้งหมด →</Link>
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">แพ็กเกจของเรา</h2>
          <div className="card-grid">
            {mockPlans.map(plan => (
              <PlanCard key={plan._id} plan={plan} />
            ))}
          </div>
        </section>

        <section className="promo-banner">
          <h3>ผู้ใช้ใหม่รับฟรี 2 วัน</h3>
          <p>ทดลองใช้บริการโฮสต์ส่วนตัวฟรี 2 วันแรก ไม่มีค่าใช้จ่าย</p>
        </section>

        <section className="section">
          <h2 className="section-title">สถิติความฝัน</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{mockUsers.length * 12}+</span>
              <span className="stat-label">ผู้ใช้ที่พอใจ</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{mockHosts.length}</span>
              <span className="stat-label">โฮสต์มืออาชีพ</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{mockSessions.length * 30}+</span>
              <span className="stat-label">เซสชันสำเร็จ</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">4.8</span>
              <span className="stat-label">คะแนนเฉลี่ย</span>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">รีวิวจากผู้ใช้</h2>
          <div className="card-grid">
            {latestReviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>พร้อมเริ่มต้นนอนหลับสบาย?</h2>
          <p>เลือกโฮสต์และแพ็กเกจที่เหมาะกับคุณ แล้วเริ่มปรับเวลานอนวันนี้</p>
          <Link to="/hosts" className="btn btn-primary">เริ่มเลย</Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
