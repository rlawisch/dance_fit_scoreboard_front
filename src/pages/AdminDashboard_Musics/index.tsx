import { FunctionComponent, useEffect } from "react";
import { GlobalContainer, MusicLevelMiniature } from "../../styles/global";
import { useMusics } from "../../providers/Musics";
import { Table } from "../AdminDashboard_Event/styles";
import { MusicWrapper } from "./styles";
import Button from "../../components/Button";
import useModal from "../../providers/Modal";
import Modal from "../../components/Modal";
import MusicCreateForm from "../../components/Forms/MusicCreate";

interface AdminDashboardMusicsProps {}

const AdminDashboardMusics: FunctionComponent<
  AdminDashboardMusicsProps
> = () => {
  const { musicsData, getMusicsData } = useMusics();

  useEffect(() => {
    getMusicsData();
  }, []);

  const sortedMusics = musicsData?.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  const {
    isOpen: isOpenMusicCreate,
    openModal: openMusicCreateModal,
    closeModal: closeMusicCreateModal,
  } = useModal();

  // TODO: create music modal form
  // TODO: dynamic modal forms to update each music
  // TODO: dynamic modal forms to delete each music

  return (
    <GlobalContainer>
      <h2>Músicas</h2>

      <Button onClick={openMusicCreateModal}>Criar Música</Button>
      <Modal isOpen={isOpenMusicCreate} onClose={closeMusicCreateModal}>
          <MusicCreateForm/>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Tabela de Músicas</th>
          </tr>
        </thead>
        <tbody>
          {sortedMusics?.map((music) => (
            <tr key={music.music_id}>
              <td>
                <MusicWrapper>
                  {music.name}
                  <MusicLevelMiniature
                    src={`/src/assets/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
                  />
                </MusicWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GlobalContainer>
  );
};

export default AdminDashboardMusics;
