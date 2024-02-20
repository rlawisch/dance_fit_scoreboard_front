import { FunctionComponent, useEffect } from "react";
import { GlobalContainer, PlayerMiniature } from "../../styles/global";
import { DashboardEventContainer } from "./styles";
import Button from "../../components/Button";
import { Link, useParams } from "react-router-dom";
import { useEvent } from "../../providers/Event";
import { useEvents } from "../../providers/Events";
import { EventTitle, EventTitleWrapper, EventTopButtonWrapper, Table, TableDataWrapper } from "../AdminDashboard_Event/styles";

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
      <EventTopButtonWrapper>
          <Link to={"/dashboard/events"}>
            <Button vanilla={true}>Voltar</Button>
          </Link>

          <Button vanilla={true} onClick={() => joinEvent(Number(event_id))}>
            Participar
          </Button>
        </EventTopButtonWrapper>

        <EventTitleWrapper>
          <EventTitle>{!!eventData && eventData.name}</EventTitle>
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
                  <td>
                    <TableDataWrapper>
                      <PlayerMiniature
                        src={
                          p.profilePicture
                            ? p.profilePicture
                            : "/src/assets/img/default_player.png"
                        }
                        alt="Mini Profile Picture"
                      />
                      {p.nickname}
                    </TableDataWrapper>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Table>
          <thead>
            <tr>
              <th>Categorias</th>
            </tr>
          </thead>
          <tbody>
            {!!eventData &&
              eventData.categories?.map((c) => (
                <tr key={c.category_id}>
                  <td>{c.name}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </DashboardEventContainer>
    </GlobalContainer>
  );
};

export default DashboardEvent;
