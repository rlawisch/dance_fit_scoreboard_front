import { FunctionComponent, useEffect } from "react";
import { GlobalContainer } from "../../styles/global";
import { DashboardEventContainer } from "./styles";
import Button from "../../components/Button";
import { Link, useParams } from "react-router-dom";
import { useEvent } from "../../providers/Event";
import { useEvents } from "../../providers/Events";

interface DashboardEventProps {}

const DashboardEvent: FunctionComponent<DashboardEventProps> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData } = useEvent();

  const { joinEvent } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  return (
    <GlobalContainer>
      <DashboardEventContainer>
        <Link to={"/dashboard/events"}>
          <Button vanilla={true}>Voltar</Button>
        </Link>

        <Button vanilla={true} onClick={() => joinEvent(Number(event_id))}>
          Participar
        </Button>
        <h1>{!!eventData && eventData.name}</h1>

        <h2>Participantes:</h2>

        {!!eventData &&
          eventData.players?.map((p) => {
            return <h3 key={p.player_id}>{p.nickname}</h3>;
          })}

        <h2>Categorias:</h2>

        {!!eventData &&
          eventData.categories?.map((c) => {
            return (
              <div key={c.category_id}>
                <h3>{c.name}</h3>
                <p>Nivel mínimo: {c.level_min}</p>
                <p>Nivel máximo: {c.level_max}</p>
              </div>
            );
          })}
      </DashboardEventContainer>
    </GlobalContainer>
  );
};

export default DashboardEvent;
