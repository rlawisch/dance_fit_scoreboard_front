import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import UEventType_Dynamic from "./EventType_Dynamic";
import UEventType_Championship from "./EventType_Championship";

interface UDashboardEventProps {}

const UDashboardEvent: FunctionComponent<UDashboardEventProps> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData } = useEvents()

  useEffect(() => {
    getEventData(Number(event_id))
  }, [])

  if (eventData?.event_type.name === 'Dinâmica') {
    return (
      <UEventType_Dynamic/>
    )
  }

  if (eventData?.event_type.name === "Campeonato") {
    return (
      <UEventType_Championship/>
    );
  }
};

export default UDashboardEvent;
