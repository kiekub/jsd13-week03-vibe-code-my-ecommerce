export default function EmptyState({ icon = '○', message = 'ไม่มีข้อมูล', action }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <p>{message}</p>
      {action}
    </div>
  );
}
