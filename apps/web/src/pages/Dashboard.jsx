import { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [sessions, setSessions] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bookings')

  useEffect(() => {
    Promise.all([
      axios.get('/api/bookings'),
      axios.get('/api/sessions'),
      axios.get('/api/users')
    ])
      .then(([bookRes, sessRes, userRes]) => {
        setBookings(bookRes.data)
        setSessions(sessRes.data)
        setUsers(userRes.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p>กำลังโหลด...</p>

  return (
    <div>
      <h1 className="page-title">แดชบอร์ดของฉัน</h1>

      <div className="tab-bar">
        <button className={`tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>การจอง</button>
        <button className={`tab ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>เซสชัน</button>
        <button className={`tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>โปรไฟล์</button>
      </div>

      {activeTab === 'bookings' && (
        <div className="card-grid">
          {bookings.map(b => (
            <div key={b._id} className="card">
              <h3>#{b.payment.payment_id}</h3>
              <p>โฮสต์: {b.host_id?.name || 'N/A'}</p>
              <p>แพ็กเกจ: {b.plan_id?.plan_name || 'N/A'}</p>
              <p>ระยะเวลา: {b.schedule.start_date} - {b.schedule.end_date}</p>
              <p className="price">฿{b.payment.amount}</p>
              <div>
                <span className={`badge badge-${b.booking_status}`}>
                  {b.booking_status === 'success' ? 'สำเร็จ' : b.booking_status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
                </span>
                <span className={`badge badge-${b.payment.payment_status}`} style={{marginLeft: '0.5rem'}}>
                  {b.payment.payment_status === 'paid' ? 'ชำระแล้ว' : 'รอชำระ'}
                </span>
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p>ยังไม่มีการจอง</p>}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="card-grid">
          {sessions.map(s => (
            <div key={s._id} className="card">
              <h3>เซสชัน</h3>
              <p>วันที่: {new Date(s.session_date).toLocaleDateString('th-TH')}</p>
              <p>นอน: <span className={s.bedtime_status === 'completed' ? 'status-ok' : 'status-fail'}>
                {s.bedtime_status === 'completed' ? 'สำเร็จ' : 'พลาด'}
              </span></p>
              <p>ตื่น: <span className={s.wake_status === 'completed' ? 'status-ok' : 'status-fail'}>
                {s.wake_status === 'completed' ? 'สำเร็จ' : 'พลาด'}
              </span></p>
              <p>สถานะ: <span className={`badge badge-${s.confirmation_status}`}>
                {s.confirmation_status === 'confirmed' ? 'ยืนยันแล้ว' : s.confirmation_status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
              </span></p>
              {s.sleep_duration && <p>ชั่วโมงนอน: {s.sleep_duration} ชม.</p>}
            </div>
          ))}
          {sessions.length === 0 && <p>ยังไม่มีเซสชัน</p>}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="card-grid">
          {users.slice(0, 1).map(u => (
            <div key={u._id} className="card profile-card">
              <h3>{u.name}</h3>
              <p><strong>อีเมล:</strong> {u.email}</p>
              <p><strong>เวลาเข้านอน:</strong> {u.bedtime}</p>
              <p><strong>เวลาตื่น:</strong> {u.waketime}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
