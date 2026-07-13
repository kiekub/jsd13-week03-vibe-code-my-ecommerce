import { Link } from 'react-router-dom';
import HostCard from '../components/HostCard';
import PlanCard from '../components/PlanCard';
import ReviewCard from '../components/ReviewCard';
import { mockHosts, mockPlans, mockReviews } from '../mock/mockData';

function Home() {
  const activeHosts = mockHosts.filter(h => h.host_status === 'active').slice(0, 3);
  const latestReviews = mockReviews.slice(0, 6);

  return (
    <div>
      <section className="hero">
        <h1>นอนหลับสบาย ปล่อยให้โฮสต์ดูแลคุณ</h1>
        <p>บริการโฮสต์ส่วนตัวที่ช่วยเตือนเข้านอน ปลุกตอนเช้า และติดตามสถิติการนอนของคุณ</p>
        <div className="hero-actions">
          <Link to="/hosts" className="btn btn-primary">เลือกโฮสต์</Link>
          <Link to="/plans" className="btn btn-secondary">ดูแพ็กเกจ</Link>
        </div>
      </section>

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
  );
}

export default Home;
