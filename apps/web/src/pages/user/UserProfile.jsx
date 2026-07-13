import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bedtime: user.bedtime,
    waketime: user.waketime,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="page-title">โปรไฟล์ของฉัน</h1>
      <div className="card profile-card">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>ชื่อ</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>อีเมล</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>เวลาเข้านอน</label>
                <input
                  type="time"
                  name="bedtime"
                  value={formData.bedtime}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>เวลาตื่น</label>
                <input
                  type="time"
                  name="waketime"
                  value={formData.waketime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="profile-actions">
              <button type="submit" className="btn btn-primary btn-sm">บันทึก</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>ยกเลิก</button>
            </div>
          </form>
        ) : (
          <>
            <h3>{user.name}</h3>
            <p><strong>อีเมล:</strong> {user.email}</p>
            <p><strong>เวลาเข้านอน:</strong> {user.bedtime}</p>
            <p><strong>เวลาตื่น:</strong> {user.waketime}</p>
            <p><strong>บทบาท:</strong> {user.role === 'admin' ? 'แอดมิน' : 'ผู้ใช้'}</p>
            <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>แก้ไขโปรไฟล์</button>
          </>
        )}
      </div>
    </div>
  );
}
