import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../providers/Events";
import EventType_Dynamic from "./EventType_Dynamic";
import EventType_ChampionShip from "./EventType_Championship";

interface DashboardEventProps {}

const DashboardEvent: FunctionComponent<DashboardEventProps> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  if (eventData?.event_type.name === 'Dinâmica') {
    return (
      <EventType_Dynamic/>
    )
  }

  if (eventData?.event_type.name === "Campeonato") {
    return (
      <EventType_ChampionShip/>
    );
  }
};

export default DashboardEvent;
