import { FunctionComponent, useEffect } from "react";
import { GlobalContainer } from "../../styles/global";
import { useEvents } from "../../providers/Events";
import EventCard from "../../components/EventCard";

interface DashboardEventsProps {}

const DashboardEvents: FunctionComponent<DashboardEventsProps> = () => {
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <GlobalContainer>
      <h3>Eventos</h3>

      {events.map((ev) => {
        return <EventCard key={ev.event_id} eventData={ev} />;
      })}
    </GlobalContainer>
  );
};

export default DashboardEvents;
