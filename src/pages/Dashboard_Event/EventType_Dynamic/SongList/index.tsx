import React, { FunctionComponent, useEffect } from "react";
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
import { useComfortLevel } from "../../../../providers/ComfortLevels";
import { usePlayer } from "../../../../providers/Players";
import Button from "../../../../components/Button";
import { TiUploadOutline } from "react-icons/ti";
import useDynamicModal from "../../../../providers/DynamicModal";
import Modal from "../../../../components/Modal";
import ScoreCreateForm from "../../../../components/Forms/ScoreSubmit";

interface SongListProps {}

const SongList: FunctionComponent<SongListProps> = () => {
  const { event_id } = useParams();

  const {
    songListData,
    getSongListData,
    setSongListData,
    songListRefreshTrigger,
  } = useSongList();

  const { getEventData, eventData } = useEvents();

  const { getEventPlayerComfortLevel, eventPlayerComfortLevel } =
    useComfortLevel();

  const { decodedPlayerInfo } = usePlayer();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id));

    if (
      eventData?.players?.some(
        (player) => player.player_id == decodedPlayerInfo.player_id
      )
    ) {
      getEventPlayerComfortLevel(Number(event_id));
    }
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

  // Determine comfort level range
  const isMusicInComfortLevelRange = (music: IMusic) => {
    if (!eventPlayerComfortLevel) {
      return false;
    }

    const { level_single, level_double } = eventPlayerComfortLevel;
    const comfortLevel = music.mode === "single" ? level_single : level_double;
    return music.level >= comfortLevel && music.level <= comfortLevel + 6;
  };

  const {
    isModalOpen: isScoreCreateModalOpen,
    openModal: openScoreCreateModal,
    closeModal: closeScoreCreateModal,
  } = useDynamicModal();

  return (
    <>
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
                        <MusicLevelMiniature
                          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level
                            .toString()
                            .padStart(2, "0")}.png`}
                        />
                        {music.name}
                      </MusicWrapper>

                      {isMusicInComfortLevelRange(music) && (
                        <div>
                          <Button
                            onClick={() => openScoreCreateModal(music.music_id)}
                          >
                            <TiUploadOutline />
                          </Button>
                          <Modal
                            isOpen={isScoreCreateModalOpen(music.music_id)}
                            onClose={() =>
                              closeScoreCreateModal(music.music_id)
                            }
                          >
                            <ScoreCreateForm
                              music={music}
                              event={eventData ? eventData : undefined}
                            />
                          </Modal>
                        </div>
                      )}
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

export default SongList;
