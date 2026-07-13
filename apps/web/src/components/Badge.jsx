const statusMap = {
  active: { label: 'ว่าง', className: 'badge-active' },
  busy: { label: 'ไม่ว่าง', className: 'badge-busy' },
  success: { label: 'สำเร็จ', className: 'badge-success' },
  pending: { label: 'รอดำเนินการ', className: 'badge-pending' },
  cancelled: { label: 'ยกเลิก', className: 'badge-cancelled' },
  paid: { label: 'ชำระแล้ว', className: 'badge-paid' },
  confirmed: { label: 'ยืนยันแล้ว', className: 'badge-confirmed' },
  completed: { label: 'สำเร็จ', className: 'badge-success' },
  missed: { label: 'พลาด', className: 'badge-cancelled' },
};

export default function Badge({ status }) {
  const info = statusMap[status] || { label: status, className: '' };
  return <span className={`badge ${info.className}`}>{info.label}</span>;
}
