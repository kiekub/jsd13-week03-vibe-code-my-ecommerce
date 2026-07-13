import { useAuth } from '../../contexts/AuthContext';
import ReviewCard from '../../components/ReviewCard';
import { getBookingsByHost, getReviewsByBookingIds } from '../../mock/mockData';

export default function HostReviews() {
  const { user } = useAuth();
  const hostBookings = getBookingsByHost(user.id);
  const hostReviews = getReviewsByBookingIds(hostBookings.map(b => b._id));

  return (
    <div>
      <h1 className="page-title">รีวิวที่ได้รับ</h1>
      {hostReviews.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">★</span>
          <p>ยังไม่มีรีวิว</p>
        </div>
      ) : (
        <div className="card-grid">
          {hostReviews.map(review => (
            <ReviewCard key={review._id} review={review} showBookingId={true} />
          ))}
        </div>
      )}
    </div>
  );
}
