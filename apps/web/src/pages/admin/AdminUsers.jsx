import DataTable from '../../components/DataTable';
import { mockUsers } from '../../mock/mockData';

export default function AdminUsers() {
  const handleDelete = (user) => {
    console.log('Delete user:', user._id);
  };

  const columns = [
    { header: 'ชื่อ', key: 'name' },
    { header: 'อีเมล', key: 'email' },
    { header: 'บทบาท', render: (row) => row.role === 'admin' ? 'แอดมิน' : 'ผู้ใช้' },
    { header: 'เข้านอน', key: 'bedtime' },
    { header: 'ตื่น', key: 'waketime' },
  ];

  return (
    <div>
      <h1 className="page-title">จัดการผู้ใช้ ({mockUsers.length})</h1>
      <DataTable columns={columns} data={mockUsers} onDelete={handleDelete} emptyMessage="ไม่มีผู้ใช้" />
    </div>
  );
}
