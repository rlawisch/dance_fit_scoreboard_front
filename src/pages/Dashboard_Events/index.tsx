import { FunctionComponent, useEffect } from "react";
import { GlobalContainer } from "../../styles/global";
import { useEvents } from "../../providers/Events";
import EventCard from "../../components/EventCard";

interface DashboardEventsProps {}

const DashboardEvents: FunctionComponent<DashboardEventsProps> = () => {
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <GlobalContainer>
      <h3>Eventos</h3>

      {events.map((ev) => {
        return (
          <EventCard
            key={ev.event_id}
            event_id={ev.event_id}
            name={ev.name}
            status={ev.status}
          />
        );
      })}
    </GlobalContainer>
  );
};

export default DashboardEvents;
