import { FunctionComponent } from "react";
import { EventCardContainer } from "./styles";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  event_id: string;
  name: string;
  status: boolean;
}

const EventCard: FunctionComponent<EventCardProps> = (props) => {
  const navigate = useNavigate();

  return (
    <EventCardContainer>
      <h3>{props.name}</h3>

      <Button
        vanilla={true}
        disabled={!props.status}
        onClick={() => navigate(`/dashboard/events/${props.event_id}`)}
      >
        Visitar
      </Button>
    </EventCardContainer>
  );
};

export default EventCard;
