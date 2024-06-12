import { FunctionComponent, useEffect } from "react";
import {
  PlayerInfoWrapper,
  PlayerMiniature,
  Table,
  TableDataWrapper,
  TableHeader,
  TableHeaderWrapper,
} from "../../../../styles/global";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../../providers/Events";


interface PublicPlayerListProps {
    
}
 
const PublicPlayerList: FunctionComponent<PublicPlayerListProps> = () => {
    const { event_id } = useParams();

  const { eventData, getEventData } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <TableHeader>
              <TableHeaderWrapper>Participantes</TableHeaderWrapper>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {!!eventData &&
            eventData.players?.map((player) => (
              <tr key={player.player_id}>
                <td>
                  <TableDataWrapper>
                    <PlayerInfoWrapper>
                      <PlayerMiniature
                        src={
                          player.profilePicture
                            ? player.profilePicture
                            : "/img/default_player.png"
                        }
                        alt="Mini Profile Picture"
                      />
                      {player.nickname}
                    </PlayerInfoWrapper>
                  </TableDataWrapper>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
 
export default PublicPlayerList;