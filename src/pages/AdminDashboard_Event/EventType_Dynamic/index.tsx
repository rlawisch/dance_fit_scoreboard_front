import { FunctionComponent, useEffect } from "react";
import { GlobalContainer, Title } from "../../../styles/global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { useEvents } from "../../../providers/Events";

interface AdminEventType_DynamicProps {}

const AdminEventType_Dynamic: FunctionComponent<
  AdminEventType_DynamicProps
> = () => {

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

export default AdminEventType_Dynamic;
