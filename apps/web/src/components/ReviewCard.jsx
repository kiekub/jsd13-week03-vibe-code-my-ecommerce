export default function ReviewCard({ review, showBookingId = false }) {
  return (
    <div className="card review-card">
      <div className="review-rating">
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
      <p className="review-comment">"{review.comment}"</p>
      {showBookingId && review.booking_id?.payment?.payment_id && (
        <p className="review-booking-id">
          การจอง: {review.booking_id.payment.payment_id}
        </p>
      )}
    </div>
  );
}
