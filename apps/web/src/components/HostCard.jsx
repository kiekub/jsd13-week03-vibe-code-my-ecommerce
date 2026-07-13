import { Link } from 'react-router-dom';
import Badge from './Badge';

export default function HostCard({ host, showLink = true }) {
  const cardContent = (
    <div className="host-card">
      <div className="host-card-avatar">
        <span className="host-avatar-icon">
          {host.gender === 'เคะ' ? '✦' : '❋'}
        </span>
      </div>
      <div className="host-card-info">
        <h3 className="host-card-name">{host.name}</h3>
        <p className="host-card-personality">{host.personality}</p>
        <div className="host-card-meta">
          <span className="host-card-gender">{host.gender}</span>
          <span className="host-card-rating">★ {host.rating}</span>
        </div>
        <Badge status={host.host_status} />
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link to={`/hosts/${host._id}`} className="card card-link">
        {cardContent}
      </Link>
    );
  }

  return <div className="card">{cardContent}</div>;
}
