import DataTable from '../../components/DataTable';
import { mockPlans } from '../../mock/mockData';

export default function AdminPlans() {
  const handleDelete = (plan) => {
    console.log('Delete plan:', plan._id);
  };

  const columns = [
    { header: 'ชื่อแพ็กเกจ', render: (row) => row.plan_name === 'monthly' ? 'รายเดือน' : row.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน' },
    { header: 'ระยะเวลา', render: (row) => `${row.duration} วัน` },
    { header: 'ราคา', render: (row) => `฿${row.price.toLocaleString()}` },
  ];

  return (
    <div>
      <h1 className="page-title">จัดการแพ็กเกจ ({mockPlans.length})</h1>
      <DataTable columns={columns} data={mockPlans} onDelete={handleDelete} emptyMessage="ไม่มีแพ็กเกจ" />
    </div>
  );
}
