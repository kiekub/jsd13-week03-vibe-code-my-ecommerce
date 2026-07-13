import { useState, useEffect } from 'react'
import axios from 'axios'

function Hosts() {
  const [hosts, setHosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/hosts')
      .then(res => {
        setHosts(res.data)
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
      <h1 className="page-title">โฮสต์ของเรา</h1>
      <div className="card-grid">
        {hosts.map(host => (
          <div key={host._id} className="card">
            <h3>{host.name}</h3>
            <p>บุคลิก: {host.personality}</p>
            <p>เพศ: {host.gender}</p>
            <p className="rating">⭐ {host.rating}</p>
            <div className="host-status">
              <span className={`badge badge-${host.host_status}`}>
                {host.host_status === 'active' ? 'ว่าง' : 'ไม่ว่าง'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hosts
