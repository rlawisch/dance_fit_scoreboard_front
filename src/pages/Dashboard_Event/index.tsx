import { FunctionComponent, useEffect } from "react";
import {
  GlobalContainer,
  PlayerMiniature,
  Table,
  TableDataWrapper,
  TableHeader,
  TableHeaderWrapper,
  Title,
} from "../../styles/global";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../providers/Event";
import { useEvents } from "../../providers/Events";
import { AiOutlineArrowRight } from "react-icons/ai";

interface DashboardEventProps {}

const DashboardEvent: FunctionComponent<DashboardEventProps> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData } = useEvent();

  const navigate = useNavigate();

  const { joinEvent } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  return (
    <GlobalContainer>
      <Button onClick={() => navigate("/dashboard/events")}>Voltar</Button>

      <Title>{!!eventData && eventData.name}</Title>

      <Button vanilla={true} onClick={() => joinEvent(Number(event_id))}>
        Participar
      </Button>

      <Table>
        <thead>
          <tr>
            <TableHeader>
              <TableHeaderWrapper>
                <h4>Participantes</h4>
              </TableHeaderWrapper>
            </TableHeader>
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
                          : "/img/default_player.png"
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
            <TableHeader>
              <TableHeaderWrapper>
                <h4>Categorias</h4>
              </TableHeaderWrapper>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {!!eventData &&
            eventData.categories?.map((category) => (
              <tr key={category.category_id}>
                <td>
                  <TableDataWrapper>
                    {category.name}

                    <div>
                      <Button
                        onClick={() =>
                          navigate(
                            `/admin/events/${event_id}/categories/${category.category_id}`
                          )
                        }
                      >
                        <AiOutlineArrowRight />
                      </Button>
                    </div>
                  </TableDataWrapper>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </GlobalContainer>
  );
};

export default DashboardEvent;
