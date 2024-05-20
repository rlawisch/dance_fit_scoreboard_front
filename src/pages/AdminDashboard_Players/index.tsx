import { FunctionComponent, useEffect } from "react";
import {
  GlobalContainer,
  PlayerInfoWrapper,
  PlayerMiniature,
  Table,
} from "../../styles/global";
import { usePlayer } from "../../providers/Players";
import useModal from "../../providers/Modal";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import PlayerCreateForm from "../../components/Forms/PlayerCreate";

interface AdminDashboardPlayersProps {}

const AdminDashboardPlayers: FunctionComponent<
  AdminDashboardPlayersProps
> = () => {
  const { getPlayers, players, playerRefreshTrigger } = usePlayer();

  useEffect(() => {
    getPlayers();
  }, [playerRefreshTrigger]);

  const {
    isOpen: isPlayerCreateModalOpen,
    openModal: openPlayerCreateModal,
    closeModal: closePlayerCreateModal,
  } = useModal();

  return (
    <GlobalContainer>
      <Button onClick={openPlayerCreateModal}>Cadastrar Jogador</Button>
      <Modal isOpen={isPlayerCreateModalOpen} onClose={closePlayerCreateModal}>
        <PlayerCreateForm />
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Jogadores</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player) => (
            <tr key={player.player_id}>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GlobalContainer>
  );
};

export default AdminDashboardPlayers;
