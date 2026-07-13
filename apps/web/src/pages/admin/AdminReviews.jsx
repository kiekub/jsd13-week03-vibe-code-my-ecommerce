import DataTable from '../../components/DataTable';
import { mockReviews } from '../../mock/mockData';

export default function AdminReviews() {
  const handleDelete = (review) => {
    console.log('Delete review:', review._id);
  };

  const columns = [
    { header: 'Payment ID', render: (row) => row.booking_id?.payment?.payment_id || 'N/A' },
    { header: 'คะแนน', render: (row) => '★'.repeat(row.rating) },
    { header: 'ความคิดเห็น', key: 'comment' },
  ];

  return (
    <div>
      <h1 className="page-title">จัดการรีวิว ({mockReviews.length})</h1>
      <DataTable columns={columns} data={mockReviews} onDelete={handleDelete} emptyMessage="ไม่มีรีวิว" />
    </div>
  );
}
