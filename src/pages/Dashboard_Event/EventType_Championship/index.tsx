import { FunctionComponent, useEffect } from "react";
import { GlobalContainer, PlayerInfoWrapper, PlayerMiniature, Table, TableDataWrapper, TableHeader, TableHeaderWrapper, Title } from "../../../styles/global";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import { AiOutlineArrowRight } from "react-icons/ai";

interface EventType_ChampionShipProps {
    
}
 
const EventType_ChampionShip: FunctionComponent<EventType_ChampionShipProps> = () => {
    
    const { event_id } = useParams()

    const navigate = useNavigate()
    
    const { eventData, getEventData, joinEvent } = useEvents()

    useEffect(() => {
        getEventData(Number(event_id))
    }, [])

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
                    <PlayerInfoWrapper>
                      <PlayerMiniature
                        src={
                          p.profilePicture
                            ? p.profilePicture
                            : "/img/default_player.png"
                        }
                        alt="Mini Profile Picture"
                      />
                      {p.nickname}
                    </PlayerInfoWrapper>
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
              eventData.categories
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <tr key={category.category_id}>
                    <td>
                      <TableDataWrapper>
                        {category.name}

                        <div>
                          <Button
                            onClick={() =>
                              navigate(
                                `/dashboard/events/${event_id}/categories/${category.category_id}`
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
}
 
export default EventType_ChampionShip;