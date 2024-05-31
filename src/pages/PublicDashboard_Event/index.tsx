import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../providers/Events";
import PublicEventType_Dynamic from "./PublicEventType_Dynamic";
import PublicEventType_Championship from "./PublicEventType_Championship";

interface PublicDashboardEventProps {}

const PublicDashboardEvent: FunctionComponent<
  PublicDashboardEventProps
> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  if (eventData?.event_type.name === 'Dinâmica') {
    return (
      <PublicEventType_Dynamic/>
    )
  }

  if (eventData?.event_type.name === "Campeonato") {
    return (
      <PublicEventType_Championship/>
    );
  }
};

export default PublicDashboardEvent;
