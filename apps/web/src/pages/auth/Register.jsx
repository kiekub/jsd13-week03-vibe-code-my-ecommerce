import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', bedtime: '22:00', waketime: '07:00' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'สมัครสมาชิกไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">สมัครสมาชิก</h1>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ชื่อ</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="ใส่ชื่อของคุณ" />
          </div>
          <div className="form-group">
            <label>อีเมล</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="ใส่อีเมลของคุณ" />
          </div>
          <div className="form-group">
            <label>รหัสผ่าน</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="ใส่รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>เวลาเข้านอน</label>
              <input type="time" name="bedtime" value={form.bedtime} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>เวลาตื่น</label>
              <input type="time" name="waketime" value={form.waketime} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>
        </form>

        <p className="auth-link">
          มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}
