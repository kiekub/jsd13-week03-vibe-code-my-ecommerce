import { useAuth } from '../../contexts/AuthContext';
import BookingTable from '../../components/BookingTable';
import { getBookingsByUser } from '../../mock/mockData';

export default function UserBookings() {
  const { user } = useAuth();
  const userBookings = getBookingsByUser(user.id);

  return (
    <div>
      <h1 className="page-title">การจองของฉัน</h1>
      <BookingTable bookings={userBookings} />
    </div>
  );
}
