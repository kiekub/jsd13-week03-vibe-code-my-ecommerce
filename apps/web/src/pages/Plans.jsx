import { useState, useEffect } from 'react'
import axios from 'axios'

function Plans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/plans')
      .then(res => {
        setPlans(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>กำลังโหลด...</p>

  return (
    <div>
      <h1 className="page-title">แพ็กเกจของเรา</h1>
      <div className="card-grid">
        {plans.map(plan => (
          <div key={plan._id} className="card">
            <h3 className={`badge badge-${plan.plan_name}`}>
              {plan.plan_name === 'monthly' ? 'รายเดือน' :
               plan.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน'}
            </h3>
            <p className="price">฿{plan.price}</p>
            <p className="duration">{plan.duration} วัน</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans
