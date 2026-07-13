import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [hosts, setHosts] = useState([])
  const [plans, setPlans] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    axios.get('/api/hosts').then(res => setHosts(res.data)).catch(() => {})
    axios.get('/api/plans').then(res => setPlans(res.data)).catch(() => {})
    axios.get('/api/reviews').then(res => setReviews(res.data)).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <h1>นอนหลับสบาย ปล่อยให้โฮสต์ดูแลคุณ</h1>
        <p>บริการโฮสต์ส่วนตัวที่ช่วยเตือนเข้านอน ปลุกตอนเช้า และติดตามสถิติการนอนของคุณ</p>
        <div className="hero-actions">
          <Link to="/hosts" className="btn btn-primary">เลือกโฮสต์</Link>
          <Link to="/plans" className="btn btn-secondary">ดูแพ็กเกจ</Link>
        </div>
      </section>

      {/* Featured Hosts */}
      <section className="section">
        <h2 className="section-title">โฮสต์แนะนำ</h2>
        <div className="card-grid">
          {hosts.filter(h => h.host_status === 'active').slice(0, 3).map(host => (
            <Link to={`/hosts/${host._id}`} key={host._id} className="card card-link">
              <h3>{host.name}</h3>
              <p>บุคลิก: {host.personality}</p>
              <p>เพศ: {host.gender}</p>
              <p className="rating">⭐ {host.rating}</p>
              <span className="badge badge-active">ว่าง</span>
            </Link>
          ))}
        </div>
        {hosts.filter(h => h.host_status === 'active').length > 3 && (
          <div className="section-more">
            <Link to="/hosts">ดูโฮสต์ทั้งหมด →</Link>
          </div>
        )}
      </section>

      {/* Sleep Plans */}
      <section className="section">
        <h2 className="section-title">แพ็กเกจของเรา</h2>
        <div className="card-grid">
          {plans.map(plan => (
            <div key={plan._id} className={`card plan-card plan-${plan.plan_name}`}>
              <h3>
                {plan.plan_name === 'monthly' ? 'รายเดือน' :
                 plan.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน'}
              </h3>
              <p className="price">฿{plan.price}</p>
              <p className="duration">{plan.duration} วัน</p>
              <Link to="/hosts" className="btn btn-primary btn-sm">จองเลย</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <h2 className="section-title">รีวิวจากผู้ใช้</h2>
        <div className="card-grid">
          {reviews.slice(0, 6).map(review => (
            <div key={review._id} className="card">
              <p className="rating">{'⭐'.repeat(review.rating)}</p>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>พร้อมเริ่มต้นนอนหลับสบาย?</h2>
        <p>เลือกโฮสต์และแพ็กเกจที่เหมาะกับคุณ แล้วเริ่มปรับเวลานอนวันนี้</p>
        <Link to="/hosts" className="btn btn-primary">เริ่มเลย</Link>
      </section>
    </div>
  )
}

export default Home
