import { FunctionComponent } from "react";
import { EventCardContainer } from "./styles";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { IEvent } from "../../types/entity-types";

interface EventCardProps {
  eventData: IEvent;
}

const EventCard: FunctionComponent<EventCardProps> = (props) => {
  const navigate = useNavigate();

  return (
    <EventCardContainer>
      <h3>{props.eventData.name}</h3>

      <Button
        vanilla={true}
        disabled={!props.eventData.status}
        onClick={() =>
          navigate(`/dashboard/events/${props.eventData.event_id}`)
        }
      >
        Visitar
      </Button>
    </EventCardContainer>
  );
};

export default EventCard;
