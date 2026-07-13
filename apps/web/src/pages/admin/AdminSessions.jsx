import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';
import { mockSessions } from '../../mock/mockData';

export default function AdminSessions() {
  const handleDelete = (session) => {
    console.log('Delete session:', session._id);
  };

  const columns = [
    { header: 'วันที่', render: (row) => new Date(row.session_date).toLocaleDateString('th-TH') },
    { header: 'Payment ID', render: (row) => row.booking_id?.payment?.payment_id || 'N/A' },
    { header: 'สถานะเข้านอน', render: (row) => <Badge status={row.bedtime_status} /> },
    { header: 'สถานะตื่น', render: (row) => <Badge status={row.wake_status} /> },
    { header: 'การยืนยัน', render: (row) => <Badge status={row.confirmation_status} /> },
    { header: 'ชั่วโมงนอน', render: (row) => row.sleep_duration ? `${row.sleep_duration} ชม.` : '-' },
  ];

  return (
    <div>
      <h1 className="page-title">จัดการเซสชัน ({mockSessions.length})</h1>
      <DataTable columns={columns} data={mockSessions} onDelete={handleDelete} emptyMessage="ไม่มีเซสชัน" />
    </div>
  );
}
