import { FunctionComponent, useEffect } from "react";
import { GlobalContainer } from "../../styles/global";
import { useEvents } from "../../providers/Events";
import AdminEventCard from "../../components/AdminEventCard";

interface AdminDashboardEventsProps {}

const AdminDashboardEvents: FunctionComponent<
  AdminDashboardEventsProps
> = () => {
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <GlobalContainer>
      <h3>Eventos</h3>

      {events.map((ev) => {
        return <AdminEventCard key={ev.event_id} eventData={ev} />;
      })}
    </GlobalContainer>
  );
};

export default AdminDashboardEvents;
