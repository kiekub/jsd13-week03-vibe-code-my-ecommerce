import PlanCard from '../components/PlanCard';
import { mockPlans } from '../mock/mockData';

function Plans() {
  return (
    <div>
      <h1 className="page-title">แพ็กเกจของเรา</h1>
      <div className="card-grid">
        {mockPlans.map(plan => (
          <PlanCard key={plan._id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

export default Plans;
