import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';
import { mockBookings } from '../../mock/mockData';

export default function AdminBookings() {
  const handleDelete = (booking) => {
    console.log('Delete booking:', booking._id);
  };

  const columns = [
    { header: 'Payment ID', render: (row) => row.payment.payment_id },
    { header: 'ผู้ใช้', render: (row) => row.user_id?.name || 'N/A' },
    { header: 'โฮสต์', render: (row) => row.host_id?.name || 'N/A' },
    { header: 'แพ็กเกจ', render: (row) => row.plan_id?.plan_name || 'N/A' },
    { header: 'จำนวนเงิน', render: (row) => `฿${row.payment.amount.toLocaleString()}` },
    { header: 'สถานะ', render: (row) => <Badge status={row.booking_status} /> },
    { header: 'ชำระเงิน', render: (row) => <Badge status={row.payment.payment_status} /> },
  ];

  return (
    <div>
      <h1 className="page-title">จัดการการจอง ({mockBookings.length})</h1>
      <DataTable columns={columns} data={mockBookings} onDelete={handleDelete} emptyMessage="ไม่มีการจอง" />
    </div>
  );
}
