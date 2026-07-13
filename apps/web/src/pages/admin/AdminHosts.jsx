import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';
import { mockHosts } from '../../mock/mockData';

export default function AdminHosts() {
  const handleDelete = (host) => {
    console.log('Delete host:', host._id);
  };

  const columns = [
    { header: 'ชื่อ', key: 'name' },
    { header: 'เพศ', key: 'gender' },
    { header: 'บุคลิก', key: 'personality' },
    { header: 'คะแนน', render: (row) => `⭐ ${row.rating}` },
    { header: 'สถานะ', render: (row) => <Badge status={row.host_status} /> },
  ];

  return (
    <div>
      <h1 className="page-title">จัดการโฮสต์ ({mockHosts.length})</h1>
      <DataTable columns={columns} data={mockHosts} onDelete={handleDelete} emptyMessage="ไม่มีโฮสต์" />
    </div>
  );
}
