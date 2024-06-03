import React, { FunctionComponent, useEffect } from "react";
import Button from "../../../../components/Button";
import { useSongList } from "../../../../providers/SongLists";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../../providers/Events";
import {
  MusicLevelMiniature,
  MusicWrapper,
  Table,
  TableHeaderWrapper,
} from "../../../../styles/global";
import { IMusic } from "../../../../types/entity-types";
import DeleteButton from "../../../../components/Button_Delete";
import useModal from "../../../../providers/Modal";
import Modal from "../../../../components/Modal";
import SongListAddSongForm from "../../../../components/Forms/SongListAddSong";
import useDynamicModal from "../../../../providers/DynamicModal";
import { TbMusicMinus } from "react-icons/tb";
import SongListRemoveSongForm from "../../../../components/Forms/SongListRemoveSong";

interface ListManagementProps {}

const ListManagement: FunctionComponent<ListManagementProps> = () => {
  const { event_id } = useParams();

  const {
    songListData,
    getSongListData,
    setSongListData,
    songListRefreshTrigger,
  } = useSongList();

  const { getEventData, eventData } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id))
  }, [eventData])

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id))
  }, [songListRefreshTrigger])

  useEffect(() => {
    return () => {
      setSongListData(undefined)
    }
  }, [])

  // Group musics by mode
  const groupedMusics: { [mode: string]: IMusic[] } = {};
  songListData?.musics.forEach((music) => {
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
    isOpen: isOpenSongListAddSong,
    openModal: openSongListAddSong,
    closeModal: closeSongListAddSong,
  } = useModal();

  const {
    isModalOpen: isSongListRemoveSongOpen,
    openModal: openSongListRemoveSongModal,
    closeModal: closeSongListRemoveSongModal,
  } = useDynamicModal();

  return (
    <>
      {!!songListData && (
        <Button onClick={openSongListAddSong}>Adicionar Musica</Button>
      )}

      <Modal isOpen={isOpenSongListAddSong} onClose={closeSongListAddSong}>
        <SongListAddSongForm song_list={songListData} />
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Músicas</th>
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
                        <DeleteButton
                          onClick={() =>
                            openSongListRemoveSongModal(music.music_id)
                          }
                        >
                          <TbMusicMinus />
                        </DeleteButton>
                        <Modal
                          isOpen={isSongListRemoveSongOpen(music.music_id)}
                          onClose={() =>
                            closeSongListRemoveSongModal(music.music_id)
                          }
                        >
                          <SongListRemoveSongForm
                            song_list={songListData}
                            music={music}
                          />
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
    </>
  );
};

export default ListManagement;
