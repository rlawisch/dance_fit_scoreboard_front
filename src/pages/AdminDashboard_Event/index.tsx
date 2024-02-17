import { FunctionComponent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEvent } from "../../providers/Event";
import { useEvents } from "../../providers/Events";
import { GlobalContainer } from "../../styles/global";
import {
  AdminDashboardEventContainer,
  EventTitleWrapper,
  EventTopButtonWrapper,
  Table,
} from "./styles";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

interface AdminDashboardEventProps {}

const AdminDashboardEvent: FunctionComponent<AdminDashboardEventProps> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData } = useEvent();

  const { joinEvent } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  return (
    <GlobalContainer>
      <AdminDashboardEventContainer>
        <EventTopButtonWrapper>
          <Link to={"/admin/events"}>
            <Button vanilla={true}>Voltar</Button>
          </Link>

          <Button vanilla={true} onClick={() => joinEvent(Number(event_id))}>
            Participar
          </Button>
        </EventTopButtonWrapper>

        <EventTitleWrapper>
          <h1>{!!eventData && eventData.name}</h1>
          
          <Modal isOpen={false} openingText="Editar" actionType="update">
            <GlobalContainer>
              Alterar informações do Evento: {eventData?.name}
            </GlobalContainer>
          </Modal>
        </EventTitleWrapper>

        <Table>
          <thead>
            <tr>
              <th>Participantes</th>
            </tr>
          </thead>
          <tbody>
            {!!eventData &&
              eventData.players?.map((p) => (
                <tr key={p.player_id}>
                  <td>{p.nickname}</td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Level Mín.</th>
              <th>Level Máx.</th>
            </tr>
          </thead>
          <tbody>
            {!!eventData &&
              eventData.categories?.map((c) => (
                <tr key={c.category_id}>
                  <td>{c.name}</td>
                  <td>{c.level_min}</td>
                  <td>{c.level_max}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </AdminDashboardEventContainer>
    </GlobalContainer>
  );
};

export default AdminDashboardEvent;
