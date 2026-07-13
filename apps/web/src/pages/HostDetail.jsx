import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function HostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [host, setHost] = useState(null)
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`/api/hosts/${id}`),
      axios.get('/api/plans')
    ])
      .then(([hostRes, plansRes]) => {
        setHost(hostRes.data)
        setPlans(plansRes.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>กำลังโหลด...</p>
  if (!host) return <p>ไม่พบโฮสต์</p>

  const handleBook = (planId) => {
    navigate(`/booking?host=${host._id}&plan=${planId}`)
  }

  return (
    <div>
      <button className="btn btn-back" onClick={() => navigate(-1)}>← กลับ</button>

      {/* Host Info */}
      <section className="host-detail">
        <div className="host-detail-info">
          <h1 className="page-title">{host.name}</h1>
          <div className="host-meta">
            <span className={`badge badge-${host.host_status}`}>
              {host.host_status === 'active' ? 'ว่าง' : 'ไม่ว่าง'}
            </span>
            <p className="rating">⭐ {host.rating}</p>
          </div>
          <div className="host-detail-fields">
            <p><strong>เพศ:</strong> {host.gender}</p>
            <p><strong>บุคลิก:</strong> {host.personality}</p>
            <p><strong>อีเมล:</strong> {host.email}</p>
          </div>
        </div>
      </section>

      {/* Available Plans */}
      <section className="section">
        <h2 className="section-title">แพ็กเกจที่มี</h2>
        <div className="card-grid">
          {plans.map(plan => (
            <div key={plan._id} className={`card plan-card plan-${plan.plan_name}`}>
              <h3>
                {plan.plan_name === 'monthly' ? 'รายเดือน' :
                 plan.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน'}
              </h3>
              <p className="price">฿{plan.price}</p>
              <p className="duration">{plan.duration} วัน</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleBook(plan._id)}
                disabled={host.host_status !== 'active'}
              >
                {host.host_status === 'active' ? 'จองเลย' : 'ไม่ว่าง'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HostDetail
