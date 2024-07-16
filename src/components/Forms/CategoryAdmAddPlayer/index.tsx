import { FunctionComponent, useEffect, useState } from "react";
import {
  ContentWrapper,
  GlobalContainer,
  PlayerLi,
  PlayerMiniature,
  SelectedPlayerWrapper,
  PlayerInfoWrapper,
} from "../../../styles/global";
import { ICategory, IPlayer } from "../../../types/entity-types";
import Input from "../../Input";
import { FaUserPlus } from "react-icons/fa6";
import Button from "../../Button";
import { useCategory } from "../../../providers/Category";

interface CategoryAdmAddPlayerFormProps {
  category: ICategory;
  eventPlayers: IPlayer[] | undefined;
}

const CategoryAdmAddPlayerForm: FunctionComponent<
  CategoryAdmAddPlayerFormProps
> = ({ category, eventPlayers }) => {
  const { adminAddPlayer } = useCategory();

  const [searchPlayerQuery, setSearchPlayerQuery] = useState<string>("");
  const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    if (eventPlayers && searchPlayerQuery.trim() !== "") {
      const filtered = eventPlayers.filter((player) =>
        player.nickname.toLowerCase().includes(searchPlayerQuery.toLowerCase()),
      );
      setFilteredPlayers(filtered);
    }
  }, [searchPlayerQuery, eventPlayers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlayerQuery(event.target.value);
  };

  const handlePlayerSelect = (player: IPlayer) => {
    setSelectedPlayer(player);
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Adicionar jogador</p>

        <p>
          Pesquise o jogador para qual deseja adicionar na Categoria:{" "}
          {category.name}
        </p>

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
              <PlayerInfoWrapper>
                <PlayerMiniature
                  src={
                    selectedPlayer.profilePicture
                      ? selectedPlayer.profilePicture
                      : "/img/default_player.png"
                  }
                  alt="Mini Profile Picture"
                />
                {selectedPlayer.nickname}
              </PlayerInfoWrapper>
            ) : (
              "Nenhum jogador selecionado"
            )}
          </SelectedPlayerWrapper>
        )}

        {!!selectedPlayer && (
          <Button
            vanilla={false}
            onClick={() =>
              adminAddPlayer(
                Number(category.category_id),
                Number(selectedPlayer.player_id),
              )
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

export default CategoryAdmAddPlayerForm;
