import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>🌙 Sleep Routine</h3>
          <p>บริการโฮสต์ส่วนตัวที่ช่วยดูแลการนอนของคุณ</p>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h4>ลิงก์ด่วน</h4>
            <Link to="/">หน้าแรก</Link>
            <Link to="/hosts">โฮสต์</Link>
            <Link to="/plans">แพ็กเกจ</Link>
          </div>
          <div className="footer-section">
            <h4>บัญชีผู้ใช้</h4>
            <Link to="/login">เข้าสู่ระบบ</Link>
            <Link to="/register">สมัครสมาชิก</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Sleep Routine. สงวนลิขสิทธิ์ทุกประการ</p>
      </div>
    </footer>
  );
}
