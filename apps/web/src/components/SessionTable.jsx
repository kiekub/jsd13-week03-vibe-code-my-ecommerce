import Badge from './Badge';

export default function SessionTable({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">😴</span>
        <p>ไม่มีเซสชัน</p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>สถานะเข้านอน</th>
            <th>สถานะตื่น</th>
            <th>การยืนยัน</th>
            <th>ชั่วโมงนอน</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s._id}>
              <td>{new Date(s.session_date).toLocaleDateString('th-TH')}</td>
              <td><Badge status={s.bedtime_status} /></td>
              <td><Badge status={s.wake_status} /></td>
              <td><Badge status={s.confirmation_status} /></td>
              <td>{s.sleep_duration ? `${s.sleep_duration} ชม.` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
