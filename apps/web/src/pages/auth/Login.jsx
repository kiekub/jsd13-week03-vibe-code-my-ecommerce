import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginType, setLoginType] = useState('user');
  const [form, setForm] = useState({ email: '', password: '' });
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
      const userData = await login(form.email, form.password, loginType);
      if (userData.type === 'host') {
        navigate('/host/dashboard');
      } else if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">เข้าสู่ระบบ</h1>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${loginType === 'user' ? 'active' : ''}`}
            onClick={() => { setLoginType('user'); setError(''); }}
          >
            ผู้ใช้
          </button>
          <button
            className={`auth-tab ${loginType === 'host' ? 'active' : ''}`}
            onClick={() => { setLoginType('host'); setError(''); }}
          >
            โฮสต์
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>อีเมล</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="ใส่อีเมลของคุณ"
            />
          </div>
          <div className="form-group">
            <label>รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="ใส่รหัสผ่าน"
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {loginType === 'user' && (
          <p className="auth-link">
            ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
          </p>
        )}

        <div className="auth-demo">
          <p className="demo-title">ข้อมูลทดสอบ (User)</p>
          <p className="demo-info">Email: namtan@example.com (admin)</p>
          <p className="demo-info">Email: love@example.com (user)</p>
          <p className="demo-info">Password: ชื่อ+0101-0110</p>
          <p className="demo-title" style={{marginTop: '0.8rem'}}>ข้อมูลทดสอบ (Host)</p>
          <p className="demo-info">Email: film@example.com</p>
          <p className="demo-info">Password: 666-0101</p>
        </div>
      </div>
    </div>
  );
}
