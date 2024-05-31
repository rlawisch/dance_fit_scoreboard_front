import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../providers/Events";
import AdminEventType_Dynamic from "./EventType_Dynamic";
import AdminEventType_Championship from "./EventType_Championship";

interface AdminDashboardEventProps {}

const AdminDashboardEvent: FunctionComponent<AdminDashboardEventProps> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData } = useEvents()

  useEffect(() => {
    getEventData(Number(event_id))
  }, [])

  if (eventData?.event_type.name === 'Dinâmica') {
    return (
      <AdminEventType_Dynamic/>
    )
  }

  if (eventData?.event_type.name === "Campeonato") {
    return (
      <AdminEventType_Championship/>
    );
  }
};

export default AdminDashboardEvent;
