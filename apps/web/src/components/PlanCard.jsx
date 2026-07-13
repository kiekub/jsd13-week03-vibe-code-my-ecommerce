import { Link } from 'react-router-dom';

export default function PlanCard({ plan, showBookButton = true }) {
  const planName = plan.plan_name === 'monthly' ? 'รายเดือน' :
                   plan.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน';

  const planDescription = plan.plan_name === 'monthly'
    ? 'เปลี่ยนนิสัยการนอนอย่างจริงจัง ด้วยการดูแลตลอด 30 วัน'
    : plan.plan_name === 'weekly'
    ? 'เริ่มปรับเวลานอนของคุณใน 7 วัน'
    : 'ทดลองใช้บริการ 1 วัน';

  return (
    <div className={`card plan-card plan-${plan.plan_name}`}>
      <h3>{planName}</h3>
      <p className="price">฿{plan.price.toLocaleString()}</p>
      <p className="duration">{plan.duration} วัน</p>
      <p className="plan-per-day">
        ฿{(plan.price / plan.duration).toFixed(0)}/วัน
      </p>
      <p style={{ marginBottom: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        {planDescription}
      </p>
      {showBookButton && (
        <Link to="/hosts" className="btn btn-primary btn-sm">จองเลย</Link>
      )}
    </div>
  );
}
