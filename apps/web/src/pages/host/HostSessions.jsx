import { useAuth } from '../../contexts/AuthContext';
import SessionTable from '../../components/SessionTable';
import { getBookingsByHost, getSessionsByBookingIds } from '../../mock/mockData';

export default function HostSessions() {
  const { user } = useAuth();
  const hostBookings = getBookingsByHost(user.id);
  const hostSessions = getSessionsByBookingIds(hostBookings.map(b => b._id));

  return (
    <div>
      <h1 className="page-title">เซสชันที่กำลังจะถึง</h1>
      <SessionTable sessions={hostSessions} />
    </div>
  );
}
