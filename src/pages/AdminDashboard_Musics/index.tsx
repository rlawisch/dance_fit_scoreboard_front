import React, { FunctionComponent, useEffect } from "react";
import {
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
  Table,
  TableHeaderWrapper,
} from "../../styles/global";
import { useMusics } from "../../providers/Musics";
import Button from "../../components/Button";
import useModal from "../../providers/Modal";
import Modal from "../../components/Modal";
import MusicCreateForm from "../../components/Forms/MusicCreate";
import useDynamicModal from "../../providers/DynamicModal";
import UpdateButton from "../../components/Button_Update";
import { FaEdit } from "react-icons/fa";
import MusicUpdateForm from "../../components/Forms/MusicUpdate";
import { IMusic } from "../../types/entity-types";
import DeleteButton from "../../components/Button_Delete";
import { TbMusicMinus } from "react-icons/tb";
import MusicDeleteForm from "../../components/Forms/MusicDelete";

interface AdminDashboardMusicsProps {}

const AdminDashboardMusics: FunctionComponent<
  AdminDashboardMusicsProps
> = () => {
  const { musicsData, getMusicsData } = useMusics();

  const { musicRefreshTrigger } = useMusics()

  useEffect(() => {
    getMusicsData();
  }, [musicRefreshTrigger]);

  // Group musics by mode
  const groupedMusics: { [mode: string]: IMusic[] } = {};
  musicsData?.forEach((music) => {
    if (!groupedMusics[music.mode]) {
      groupedMusics[music.mode] = [];
    }
    groupedMusics[music.mode].push(music);
  });

  // Sort each group alphabetically by name
  Object.keys(groupedMusics).forEach((mode) => {
    groupedMusics[mode].sort((a, b) => a.name.localeCompare(b.name));
  });

  const {
    isOpen: isOpenMusicCreate,
    openModal: openMusicCreateModal,
    closeModal: closeMusicCreateModal,
  } = useModal();

  const {
    isModalOpen: isMusicUpdateModalOpen,
    openModal: openMusicUpdateModal,
    closeModal: closeMusicUpdateModal,
  } = useDynamicModal();

  const {
    isModalOpen: isMusicDeleteModalOpen,
    openModal: openMusicDeleteModal,
    closeModal: closeMusicDeleteModal,
  } = useDynamicModal();

  return (
    <GlobalContainer>
      <Button onClick={openMusicCreateModal}>Criar Música</Button>
      <Modal isOpen={isOpenMusicCreate} onClose={closeMusicCreateModal}>
        <MusicCreateForm />
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Tabela de Músicas</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedMusics).map((mode) => (
            <React.Fragment key={mode}>
              <tr>
                <th colSpan={2}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}s
                </th>
              </tr>
              {groupedMusics[mode].map((music) => (
                <tr key={music.music_id}>
                  <td>
                    <TableHeaderWrapper>
                      <MusicWrapper>
                        {music.name}
                        <MusicLevelMiniature
                          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level
                            .toString()
                            .padStart(2, "0")}.png`}
                        />
                      </MusicWrapper>
                      <div>
                        <UpdateButton
                          onClick={() => openMusicUpdateModal(music.music_id)}
                        >
                          <FaEdit />
                        </UpdateButton>
                        <Modal
                          key={music.music_id}
                          isOpen={isMusicUpdateModalOpen(music.music_id)}
                          onClose={() => closeMusicUpdateModal(music.music_id)}
                        >
                          <MusicUpdateForm key={music.music_id} music={music} />
                        </Modal>

                        <DeleteButton
                          onClick={() => openMusicDeleteModal(music.music_id)}
                        >
                          <TbMusicMinus />
                        </DeleteButton>
                        <Modal
                          isOpen={isMusicDeleteModalOpen(music.music_id)}
                          onClose={() => closeMusicDeleteModal(music.music_id)}
                        >
                          <MusicDeleteForm music={music} />
                        </Modal>
                      </div>
                    </TableHeaderWrapper>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </GlobalContainer>
  );
};

export default AdminDashboardMusics;
