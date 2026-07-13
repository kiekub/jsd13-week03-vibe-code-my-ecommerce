import { useAuth } from '../../contexts/AuthContext';
import SessionTable from '../../components/SessionTable';
import { getBookingsByUser, getSessionsByBookingIds } from '../../mock/mockData';

export default function UserSessions() {
  const { user } = useAuth();
  const userBookings = getBookingsByUser(user.id);
  const userSessions = getSessionsByBookingIds(userBookings.map(b => b._id));

  return (
    <div>
      <h1 className="page-title">เซสชันของฉัน</h1>
      <SessionTable sessions={userSessions} />
    </div>
  );
}
