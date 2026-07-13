import HostCard from '../components/HostCard';
import { mockHosts } from '../mock/mockData';

function Hosts() {
  const activeHosts = mockHosts.filter(h => h.host_status === 'active');
  const busyHosts = mockHosts.filter(h => h.host_status === 'busy');

  return (
    <div>
      <h1 className="page-title">โฮสต์ของเรา</h1>

      <section className="section">
        <h2 className="section-title">โฮสต์ว่าง</h2>
        <div className="card-grid">
          {activeHosts.map(host => (
            <HostCard key={host._id} host={host} />
          ))}
        </div>
      </section>

      {busyHosts.length > 0 && (
        <section className="section">
          <h2 className="section-title">โฮสต์ไม่ว่าง</h2>
          <div className="card-grid">
            {busyHosts.map(host => (
              <HostCard key={host._id} host={host} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Hosts;
