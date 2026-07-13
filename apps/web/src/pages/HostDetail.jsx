import { useParams, Link } from 'react-router-dom';
import Badge from '../components/Badge';
import PlanCard from '../components/PlanCard';
import { mockHosts, mockPlans } from '../mock/mockData';

function HostDetail() {
  const { id } = useParams();
  const host = mockHosts.find(h => h._id === id);

  if (!host) {
    return (
      <div className="empty-state">
        <span className="empty-icon">👤</span>
        <p>ไม่พบโฮสต์</p>
        <Link to="/hosts" className="btn btn-primary btn-sm">กลับไปหน้าโฮสต์</Link>
      </div>
    );
  }

  return (
    <div>
      <button className="btn-back" onClick={() => window.history.back()}>← กลับ</button>

      <div className="host-detail">
        <div className="host-detail-info">
          <div className="host-card-avatar">
            <span className="host-avatar-icon">👤</span>
          </div>
          <h1>{host.name}</h1>
          <div className="host-meta">
            <Badge status={host.host_status} />
            <span className="host-card-gender">{host.gender}</span>
            <span className="host-card-rating">⭐ {host.rating}</span>
          </div>
          <div className="host-detail-fields">
            <p><strong>บุคลิก:</strong> {host.personality}</p>
            <p><strong>อีเมล:</strong> {host.email}</p>
          </div>
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">แพ็กเกจที่มี</h2>
        <div className="card-grid">
          {mockPlans.map(plan => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HostDetail;
