import { FunctionComponent, useEffect, useState } from "react";
import { IPlayer } from "../../../types/entity-types";
import {
  ContentWrapper,
  GlobalContainer,
  PlayerInfoWrapper,
  PlayerLi,
  PlayerMiniature,
  SelectedPlayerWrapper,
} from "../../../styles/global";
import { usePlayer } from "../../../providers/Players";
import { useEvents } from "../../../providers/Events";
import Input from "../../Input";
import { FaUserPlus } from "react-icons/fa6";
import Button from "../../Button";

interface EventAdmAddPlayerFormProps {
  event_id: number;
}

const EventAdmAddPlayerForm: FunctionComponent<EventAdmAddPlayerFormProps> = ({
  event_id,
}) => {
  const { players, getPlayers } = usePlayer();

  const { adminAddPlayer } = useEvents();

  useEffect(() => {
    getPlayers();
  }, []);

  const [searchPlayerQuery, setSearchPlayerQuery] = useState<string>("");
  const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    if (players && searchPlayerQuery.trim() !== "") {
      const filtered = players.filter((player) =>
        player.nickname.toLowerCase().includes(searchPlayerQuery.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  }, [searchPlayerQuery, players]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlayerQuery(event.target.value);
  };

  const handlePlayerSelect = (player: IPlayer) => {
    setSelectedPlayer(player);
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Adicionar jogador ao Evento</p>

        <p>Pesquise o jogador para qual deseja adicionar no Evento:</p>

        <Input
          icon={FaUserPlus}
          type="text"
          placeholder="Pesquisar"
          value={searchPlayerQuery}
          onChange={handleSearchChange}
        />

        {!!selectedPlayer && (
          <SelectedPlayerWrapper>
            <p>Jogador Selecionado:</p>
            {selectedPlayer ? (
              <>
                <PlayerMiniature
                  src={
                    selectedPlayer.profilePicture
                      ? selectedPlayer.profilePicture
                      : "/img/default_player.png"
                  }
                  alt="Mini Profile Picture"
                />
                {selectedPlayer.nickname}
              </>
            ) : (
              "Nenhum jogador selecionado"
            )}
          </SelectedPlayerWrapper>
        )}

        {!!selectedPlayer && (
          <Button
            vanilla={false}
            onClick={() =>
              adminAddPlayer(Number(event_id), Number(selectedPlayer.player_id))
            }
          >
            Adicionar
          </Button>
        )}

        <ul>
          {filteredPlayers.map((player) => (
            <PlayerLi
              key={player.player_id}
              onClick={() => handlePlayerSelect(player)}
            >
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
            </PlayerLi>
          ))}
        </ul>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default EventAdmAddPlayerForm;
