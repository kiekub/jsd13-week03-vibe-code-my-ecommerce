import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockHosts, mockPlans } from '../mock/mockData';

function BookingPage() {
  const [searchParams] = useSearchParams();
  const hostId = searchParams.get('host');
  const planId = searchParams.get('plan');

  const host = mockHosts.find(h => h._id === hostId);
  const plan = mockPlans.find(p => p._id === planId);

  const [formData, setFormData] = useState({
    payment_method: 'credit_card',
    start_date: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="booking-success">
        <h1>✦ การจองสำเร็จ!</h1>
        <p>ชำระเงินเรียบร้อยแล้ว</p>
        <p>โฮสต์จะติดต่อกลับภายใน 24 ชั่วโมง</p>
        <Link to="/" className="btn btn-primary">กลับหน้าแรก</Link>
      </div>
    );
  }

  if (!host || !plan) {
    return (
      <div className="empty-state">
        <span className="empty-icon">◎</span>
        <p>กรุณาเลือกโฮสต์และแพ็กเกจก่อนทำการจอง</p>
        <Link to="/hosts" className="btn btn-primary btn-sm">เลือกโฮสต์</Link>
      </div>
    );
  }

  return (
    <div className="booking-layout">
      <h1 className="page-title">ทำการจอง</h1>

      <div className="payment-summary">
        <h3>สรุปการจอง</h3>
        <p><strong>โฮสต์:</strong> {host.name}</p>
        <p><strong>แพ็กเกจ:</strong> {plan.plan_name === 'monthly' ? 'รายเดือน' : plan.plan_name === 'weekly' ? 'รายสัปดาห์' : 'รายวัน'}</p>
        <p><strong>ระยะเวลา:</strong> {plan.duration} วัน</p>
        <p className="price">฿{plan.price.toLocaleString()}</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>วันที่เริ่มต้น</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>วิธีชำระเงิน</label>
          <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
            <option value="credit_card">บัตรเครดิต</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">โอนเงิน</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary auth-submit">ยืนยันการจอง</button>
      </form>
    </div>
  );
}

export default BookingPage;
