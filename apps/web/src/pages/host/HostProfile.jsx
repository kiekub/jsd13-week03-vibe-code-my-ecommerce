import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function HostProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    personality: user.personality,
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
                <label>เพศ</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="เคะ">เคะ</option>
                  <option value="เมะ">เมะ</option>
                </select>
              </div>
              <div className="form-group">
                <label>บุคลิก</label>
                <input
                  type="text"
                  name="personality"
                  value={formData.personality}
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
            <p><strong>เพศ:</strong> {user.gender}</p>
            <p><strong>บุคลิก:</strong> {user.personality}</p>
            <p><strong>บทบาท:</strong> โฮสต์</p>
            <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>แก้ไขโปรไฟล์</button>
          </>
        )}
      </div>
    </div>
  );
}
