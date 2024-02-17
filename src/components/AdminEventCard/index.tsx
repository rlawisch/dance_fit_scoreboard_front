import { FunctionComponent } from "react";
import { IEvent } from "../../types";
import { AdminEventCardContainer } from "./styles";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

interface AdminEventCardProps {
  eventData: IEvent;
}

const AdminEventCard: FunctionComponent<AdminEventCardProps> = (props) => {
  const navigate = useNavigate();

  return (
    <AdminEventCardContainer>
      <h3>{props.eventData.name}</h3>

      <Button
        vanilla={true}
        disabled={!props.eventData.status}
        onClick={() => navigate(`/admin/events/${props.eventData.event_id}`)}
      >
        Visitar
      </Button>
    </AdminEventCardContainer>
  );
};

export default AdminEventCard;
