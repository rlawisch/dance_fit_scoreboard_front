import { FunctionComponent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import { GlobalContainer, Title } from "../../../styles/global";
import Button from "../../../components/Button";

interface EventType_DynamicProps {}

const EventType_Dynamic: FunctionComponent<EventType_DynamicProps> = () => {
  
  const { event_id } = useParams()
  
  const navigate = useNavigate();

  const {
    eventData,
    getEventData,
  } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id))
}, [])

  return (
    <GlobalContainer>
      <Button onClick={() => navigate("/admin/events")}>Voltar</Button>

      <Title>{!!eventData && eventData.name}</Title>
    </GlobalContainer>
  );
};

export default EventType_Dynamic;
