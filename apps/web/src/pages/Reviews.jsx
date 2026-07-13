import { useState, useEffect } from 'react'
import axios from 'axios'

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/reviews')
      .then(res => {
        setReviews(res.data)
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
      <h1 className="page-title">รีวิวจากผู้ใช้</h1>
      <div className="card-grid">
        {reviews.map(review => (
          <div key={review._id} className="card">
            <p className="rating">⭐ {review.rating}/5</p>
            <p>"{review.comment}"</p>
          </div>
        ))}
        {reviews.length === 0 && <p>ยังไม่มีรีวิว</p>}
      </div>
    </div>
  )
}

export default Reviews
