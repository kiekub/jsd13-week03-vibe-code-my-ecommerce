import Badge from './Badge';

export default function BookingTable({ bookings, showUser = false, showHost = false }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📋</span>
        <p>ไม่มีการจอง</p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            {showUser && <th>ผู้ใช้</th>}
            {showHost && <th>โฮสต์</th>}
            <th>แพ็กเกจ</th>
            <th>ระยะเวลา</th>
            <th>จำนวนเงิน</th>
            <th>สถานะ</th>
            <th>ชำระเงิน</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.payment.payment_id}</td>
              {showUser && <td>{b.user_id?.name || 'N/A'}</td>}
              {showHost && <td>{b.host_id?.name || 'N/A'}</td>}
              <td>{b.plan_id?.plan_name || 'N/A'}</td>
              <td>{b.schedule.start_date} - {b.schedule.end_date}</td>
              <td>฿{b.payment.amount.toLocaleString()}</td>
              <td><Badge status={b.booking_status} /></td>
              <td><Badge status={b.payment.payment_status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
