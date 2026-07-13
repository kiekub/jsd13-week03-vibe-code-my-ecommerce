import { Link } from 'react-router-dom';

export default function PlanCard({ plan, showBookButton = true }) {
  const planName = plan.plan_name === 'monthly' ? 'รายเดือน' :
                   plan.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน';

  return (
    <div className={`card plan-card plan-${plan.plan_name}`}>
      <h3>{planName}</h3>
      <p className="price">฿{plan.price.toLocaleString()}</p>
      <p className="duration">{plan.duration} วัน</p>
      <p className="plan-per-day">
        ฿{(plan.price / plan.duration).toFixed(0)}/วัน
      </p>
      {showBookButton && (
        <Link to="/hosts" className="btn btn-primary btn-sm">จองเลย</Link>
      )}
    </div>
  );
}
