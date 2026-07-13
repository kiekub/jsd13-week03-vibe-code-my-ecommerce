import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/" className="btn btn-primary">กลับหน้าแรก</Link>
    </div>
  );
}
