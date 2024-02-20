import { FunctionComponent } from "react";
import { IEvent } from "../../types/entity-types";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { EventCardContainer } from "../EventCard/styles";

interface AdminEventCardProps {
  eventData: IEvent;
}

const AdminEventCard: FunctionComponent<AdminEventCardProps> = (props) => {
  const navigate = useNavigate();

  return (
    <EventCardContainer>
      <h3>{props.eventData.name}</h3>

      <Button
        vanilla={true}
        disabled={!props.eventData.status}
        onClick={() => navigate(`/admin/events/${props.eventData.event_id}`)}
      >
        Visitar
      </Button>
    </EventCardContainer>
  );
};

export default AdminEventCard;
