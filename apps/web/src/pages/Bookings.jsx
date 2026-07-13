import { useState, useEffect } from 'react'
import axios from 'axios'

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/bookings')
      .then(res => {
        setBookings(res.data)
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
      <h1 className="page-title">การจองของฉัน</h1>
      <div className="card-grid">
        {bookings.map(booking => (
          <div key={booking._id} className="card">
            <h3>การจอง #{booking.payment.payment_id}</h3>
            <p>ผู้ใช้: {booking.user_id?.name || 'N/A'}</p>
            <p>โฮสต์: {booking.host_id?.name || 'N/A'}</p>
            <p>แพ็กเกจ: {booking.plan_id?.plan_name || 'N/A'}</p>
            <p>ระยะเวลา: {booking.schedule.start_date} - {booking.schedule.end_date}</p>
            <p className="price">฿{booking.payment.amount}</p>
            <div>
              <span className={`badge badge-${booking.booking_status}`}>
                {booking.booking_status === 'success' ? 'สำเร็จ' :
                 booking.booking_status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
              </span>
              <span className={`badge badge-${booking.payment.payment_status}`} style={{marginLeft: '0.5rem'}}>
                {booking.payment.payment_status === 'paid' ? 'ชำระแล้ว' : 'รอชำระ'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookings
