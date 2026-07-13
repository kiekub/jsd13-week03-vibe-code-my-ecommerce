import { useAuth } from '../../contexts/AuthContext';
import BookingTable from '../../components/BookingTable';
import { getBookingsByHost } from '../../mock/mockData';

export default function HostBookings() {
  const { user } = useAuth();
  const hostBookings = getBookingsByHost(user.id);

  return (
    <div>
      <h1 className="page-title">การจองที่เข้ามา</h1>
      <BookingTable bookings={hostBookings} showUser={true} />
    </div>
  );
}
