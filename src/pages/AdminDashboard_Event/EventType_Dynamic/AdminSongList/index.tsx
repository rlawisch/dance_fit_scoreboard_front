import React, { FunctionComponent, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { useSongList } from "../../../../providers/SongLists";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../../providers/Events";
import {
  MusicLevelMiniature,
  MusicListDataWrapper,
  MusicWrapper,
  Table,
} from "../../../../styles/global";
import { IMusic } from "../../../../types/entity-types";
import DeleteButton from "../../../../components/Button_Delete";
import useModal from "../../../../providers/Modal";
import Modal from "../../../../components/Modal";
import SongListAddSongForm from "../../../../components/Forms/SongListAddSong";
import useDynamicModal from "../../../../providers/DynamicModal";
import { TbMusicMinus } from "react-icons/tb";
import SongListRemoveSongForm from "../../../../components/Forms/SongListRemoveSong";
import { stringShortener } from "../../../../utils/stringShortener";

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    getEventData(Number(event_id));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id));
  }, [eventData]);

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id));
  }, [songListRefreshTrigger]);

  useEffect(() => {
    return () => {
      setSongListData(undefined);
    };
  }, []);

  // Group musics by mode
  const groupedMusics: { [mode: string]: IMusic[] } = {};
  songListData?.musics.forEach((music) => {
    if (!groupedMusics[music.mode]) {
      groupedMusics[music.mode] = [];
    }
    groupedMusics[music.mode].push(music);
  });

  // Sort each group by level
  Object.keys(groupedMusics).forEach((mode) => {
    groupedMusics[mode].sort((a, b) => a.level - b.level);
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
        {Object.keys(groupedMusics).map((mode) => (
          <React.Fragment key={mode}>
            <thead>
              <th>{mode.charAt(0).toUpperCase() + mode.slice(1)}s</th>
            </thead>
            <tbody>
              {groupedMusics[mode].map((music) => (
                <tr key={music.music_id}>
                  <td>
                    <MusicListDataWrapper>
                      <MusicWrapper>
                        <MusicLevelMiniature
                          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level
                            .toString()
                            .padStart(2, "0")}.png`}
                        />
                        <p>
                          {stringShortener(windowWidth, music.name)}
                        </p>
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
                    </MusicListDataWrapper>
                  </td>
                </tr>
              ))}
            </tbody>
          </React.Fragment>
        ))}
      </Table>
    </>
  );
};

export default ListManagement;
