import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const hostId = searchParams.get('host')
  const planId = searchParams.get('plan')

  const [host, setHost] = useState(null)
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    user_id: '',
    start_date: '',
    end_date: '',
    payment_method: 'credit_card',
  })

  useEffect(() => {
    if (!hostId || !planId) {
      navigate('/hosts')
      return
    }
    Promise.all([
      axios.get(`/api/hosts/${hostId}`),
      axios.get(`/api/plans/${planId}`)
    ])
      .then(([hostRes, planRes]) => {
        setHost(hostRes.data)
        setPlan(planRes.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [hostId, planId, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.user_id || !form.start_date || !form.end_date) return

    setSubmitting(true)
    try {
      const paymentId = 'PAY' + Date.now().toString().slice(-6)
      await axios.post('/api/bookings', {
        user_id: form.user_id,
        plan_id: planId,
        host_id: hostId,
        schedule: {
          start_date: form.start_date,
          end_date: form.end_date,
          frequency: 'daily'
        },
        payment: {
          payment_id: paymentId,
          payment_method: form.payment_method,
          amount: plan.price,
          payment_status: 'paid',
          paid_at: new Date()
        },
        booking_status: 'success',
        booking_date: new Date()
      })
      setSuccess(true)
    } catch (err) {
      console.error(err)
      alert('จองไม่สำเร็จ กรุณาลองใหม่')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>กำลังโหลด...</p>
  if (!host || !plan) return <p>ไม่พบข้อมูล</p>

  if (success) {
    return (
      <div className="booking-success">
        <h1>🎉 จองสำเร็จ!</h1>
        <p>โฮสต์ <strong>{host.name}</strong> จะดูแลคุณตามแพ็กเกจ <strong>{plan.plan_name}</strong></p>
        <p>ระยะเวลา: {form.start_date} ถึง {form.end_date}</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>กลับหน้าแรก</button>
      </div>
    )
  }

  return (
    <div>
      <button className="btn btn-back" onClick={() => navigate(-1)}>← กลับ</button>
      <h1 className="page-title">จองโฮสต์</h1>

      {/* Booking Form */}
      <section className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input type="text" name="user_id" value={form.user_id} onChange={handleChange} required placeholder="ใส่ User ID" />
          </div>
          <div className="form-group">
            <label>วันเริ่มต้น</label>
            <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>วันสิ้นสุด</label>
            <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />
          </div>

          {/* Payment */}
          <h2 className="section-title">ชำระเงิน</h2>
          <div className="form-group">
            <label>วิธีชำระเงิน</label>
            <select name="payment_method" value={form.payment_method} onChange={handleChange}>
              <option value="credit_card">บัตรเครดิต</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">โอนเงิน</option>
            </select>
          </div>
          <div className="payment-summary">
            <p>โฮสต์: <strong>{host.name}</strong></p>
            <p>แพ็กเกจ: <strong>{plan.plan_name} ({plan.duration} วัน)</strong></p>
            <p className="price">฿{plan.price}</p>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'กำลังจอง...' : 'ยืนยันการจอง'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default BookingPage
