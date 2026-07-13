export default function StatCard({ number, label, icon }) {
  return (
    <div className="stat-card">
      {icon && <span className="stat-icon">{icon}</span>}
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
