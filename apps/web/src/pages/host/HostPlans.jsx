import PlanCard from '../../components/PlanCard';
import { mockPlans } from '../../mock/mockData';

export default function HostPlans() {
  return (
    <div>
      <h1 className="page-title">แพ็กเกจทั้งหมด</h1>
      <div className="card-grid">
        {mockPlans.map(plan => (
          <PlanCard key={plan._id} plan={plan} showBookButton={false} />
        ))}
      </div>
    </div>
  );
}
