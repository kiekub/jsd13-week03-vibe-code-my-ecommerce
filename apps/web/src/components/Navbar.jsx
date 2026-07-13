import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">🌙 Sleep Routine</Link>
      <nav>
        <Link to="/">หน้าแรก</Link>
        <Link to="/hosts">โฮสต์</Link>
        <Link to="/plans">แพ็กเกจ</Link>
        <Link to="/dashboard">แดชบอร์ด</Link>
        <Link to="/admin">จัดการ</Link>
      </nav>
    </header>
  )
}

export default Navbar
