import { useState, useEffect } from 'react'
import axios from 'axios'

const tabs = ['users', 'hosts', 'bookings', 'reviews', 'plans']
const tabLabels = { users: 'ผู้ใช้', hosts: 'โฮสต์', bookings: 'การจอง', reviews: 'รีวิว', plans: 'แพ็กเกจ' }

function Admin() {
  const [activeTab, setActiveTab] = useState('users')
  const [data, setData] = useState({ users: [], hosts: [], bookings: [], reviews: [], plans: [] })
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    Promise.all([
      axios.get('/api/users'),
      axios.get('/api/hosts'),
      axios.get('/api/bookings'),
      axios.get('/api/reviews'),
      axios.get('/api/plans')
    ]).then(([u, h, b, r, p]) => {
      setData({ users: u.data, hosts: h.data, bookings: b.data, reviews: r.data, plans: p.data })
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (endpoint, id) => {
    if (!confirm('ลบรายการนี้?')) return
    try {
      await axios.delete(`/api/${endpoint}/${id}`)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>กำลังโหลด...</p>

  return (
    <div>
      <h1 className="page-title">จัดการข้อมูล (Admin)</h1>

      <div className="tab-bar">
        {tabs.map(t => (
          <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {tabLabels[t]} ({data[t].length})
          </button>
        ))}
      </div>

      <div className="admin-table-wrapper">
        {activeTab === 'users' && (
          <table className="admin-table">
            <thead><tr><th>ชื่อ</th><th>อีเมล</th><th>เข้านอน</th><th>ตื่น</th><th></th></tr></thead>
            <tbody>
              {data.users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.bedtime}</td>
                  <td>{u.waketime}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete('users', u._id)}>ลบ</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'hosts' && (
          <table className="admin-table">
            <thead><tr><th>ชื่อ</th><th>เพศ</th><th>บุคลิก</th><th>คะแนน</th><th>สถานะ</th><th></th></tr></thead>
            <tbody>
              {data.hosts.map(h => (
                <tr key={h._id}>
                  <td>{h.name}</td>
                  <td>{h.gender}</td>
                  <td>{h.personality}</td>
                  <td>⭐ {h.rating}</td>
                  <td><span className={`badge badge-${h.host_status}`}>{h.host_status === 'active' ? 'ว่าง' : 'ไม่ว่าง'}</span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete('hosts', h._id)}>ลบ</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'bookings' && (
          <table className="admin-table">
            <thead><tr><th>Payment ID</th><th>ผู้ใช้</th><th>โฮสต์</th><th>แพ็กเกจ</th><th>จำนวนเงิน</th><th>สถานะ</th><th></th></tr></thead>
            <tbody>
              {data.bookings.map(b => (
                <tr key={b._id}>
                  <td>{b.payment.payment_id}</td>
                  <td>{b.user_id?.name || 'N/A'}</td>
                  <td>{b.host_id?.name || 'N/A'}</td>
                  <td>{b.plan_id?.plan_name || 'N/A'}</td>
                  <td>฿{b.payment.amount}</td>
                  <td><span className={`badge badge-${b.booking_status}`}>
                    {b.booking_status === 'success' ? 'สำเร็จ' : b.booking_status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
                  </span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete('bookings', b._id)}>ลบ</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'reviews' && (
          <table className="admin-table">
            <thead><tr><th>คะแนน</th><th>ความคิดเห็น</th><th></th></tr></thead>
            <tbody>
              {data.reviews.map(r => (
                <tr key={r._id}>
                  <td>⭐ {r.rating}</td>
                  <td>{r.comment}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete('reviews', r._id)}>ลบ</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'plans' && (
          <table className="admin-table">
            <thead><tr><th>แพ็กเกจ</th><th>ระยะเวลา</th><th>ราคา</th><th></th></tr></thead>
            <tbody>
              {data.plans.map(p => (
                <tr key={p._id}>
                  <td>{p.plan_name === 'monthly' ? 'รายเดือน' : p.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน'}</td>
                  <td>{p.duration} วัน</td>
                  <td>฿{p.price}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete('plans', p._id)}>ลบ</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Admin
