import React, { FunctionComponent, useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import { useSongList } from "../../../../../providers/SongLists";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../../../providers/Events";
import {
  DynamicEventApprovedScoreWarning,
  DynamicEventPendingScoreWarning,
  DynamicEventScoreSubmissionWarning,
  MusicLevelMiniature,
  MusicListDataWrapper,
  MusicWrapper,
  Table,
} from "../../../../../styles/global";
import { IMusic, IScore } from "../../../../../types/entity-types";
import DeleteButton from "../../../../../components/Button_Delete";
import useModal from "../../../../../providers/Modal";
import Modal from "../../../../../components/Modal";
import SongListAddSongForm from "../../../../../components/Forms/SongListAddSong";
import useDynamicModal from "../../../../../providers/DynamicModal";
import { TbMusicMinus } from "react-icons/tb";
import SongListRemoveSongForm from "../../../../../components/Forms/SongListRemoveSong";
import { stringShortener } from "../../../../../utils/stringShortener";
import { usePlayer } from "../../../../../providers/Players";
import { useScore } from "../../../../../providers/Scores";
import { useComfortLevel } from "../../../../../providers/ComfortLevels";
import { TiUploadOutline } from "react-icons/ti";
import styled from "styled-components";
import ScoreCard from "../../../../../components/ScoreCard";
import ScoreCreateForm from "../../../../../components/Forms/ScoreSubmit";

interface USongListProps {}

const Paragraph = styled.p`
  padding: 1rem;
`;

const List = styled.ul`
  padding: 2rem;
`;

const USongList: FunctionComponent<USongListProps> = () => {
  const { event_id } = useParams();

  const { isAdmin, isLoggedIn, decodedPlayerInfo } = usePlayer();

  const {
    songListData,
    getSongListData,
    setSongListData,
    songListRefreshTrigger,
  } = useSongList();

  const {
    pendingScores,
    eventScores,
    getPendingScoresByEvent,
    getScoresByEvent,
  } = useScore();

  const { getEventData, eventData } = useEvents();

  const { getEventPlayerComfortLevel, eventPlayerComfortLevel } =
    useComfortLevel();

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

    getPendingScoresByEvent(Number(event_id));

    getScoresByEvent(Number(event_id));

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
    isOpen: isOpenSongListAddSong,
    openModal: openSongListAddSong,
    closeModal: closeSongListAddSong,
  } = useModal();

  const {
    isModalOpen: isSongListRemoveSongOpen,
    openModal: openSongListRemoveSongModal,
    closeModal: closeSongListRemoveSongModal,
  } = useDynamicModal();

  const {
    isModalOpen: isScoreCreateModalOpen,
    openModal: openScoreCreateModal,
    closeModal: closeScoreCreateModal,
  } = useDynamicModal();

  const getApprovedScore = (musicId: number): IScore | undefined => {
    return eventScores?.find(
      (score) =>
        Number(score.music.music_id) === musicId &&
        score.player.player_id === decodedPlayerInfo.player_id
    );
  };

  const getPendingScore = (musicId: number): IScore | undefined => {
    return pendingScores?.find(
      (score) =>
        Number(score.music.music_id) === musicId &&
        score.player.player_id === decodedPlayerInfo.player_id
    );
  };

  return (
    <>
      {!!songListData && isAdmin() && (
        <Button onClick={openSongListAddSong}>Adicionar Musica</Button>
      )}

      <Modal isOpen={isOpenSongListAddSong} onClose={closeSongListAddSong}>
        <SongListAddSongForm song_list={songListData} />
      </Modal>

      <Paragraph>
        Aqui é onde os jogadores fazem o envio dos Scores usando o botão{" "}
        <Button>
          <TiUploadOutline />
        </Button>
        , uma vez enviado, o Score é mandado para análise da administração e se
        os dados estiverem corretos e baterem com os dados da foto do DG ele
        será aprovado para só então aparecer nos Rankings.
      </Paragraph>

      <Paragraph>
        Use a função de enquadramento da foto do DG para ter certeza de que
        aparecem legíveis dados como:
      </Paragraph>

      <List>
        <li>Nick do Card</li>
        <li>Pontuação</li>
        <li>Grade (SSS+, etc..)</li>
        <li>Plate (Fair Game, etc..)</li>
      </List>

      <Paragraph>
        Caso o jogador já possuir tanto um Score já ranqueado ou em análise, ao
        abrir o formulário de cadastro os mesmos apareçerão para ter certeza de
        que não está fazendo o envio de um Score de valor mais baixo.
      </Paragraph>

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
                        <p>{stringShortener(windowWidth, music.name)}</p>
                      </MusicWrapper>
                      <div>
                        {isLoggedIn() && isMusicInComfortLevelRange(music) && (
                          <>
                            <Button
                              onClick={() =>
                                openScoreCreateModal(music.music_id)
                              }
                            >
                              <TiUploadOutline />
                            </Button>
                            <Modal
                              isOpen={isScoreCreateModalOpen(music.music_id)}
                              onClose={() =>
                                closeScoreCreateModal(music.music_id)
                              }
                            >
                              {!!getApprovedScore(Number(music.music_id)) && (
                                <DynamicEventApprovedScoreWarning>
                                  <h4>Score já APROVADO</h4>
                                  <ScoreCard
                                    score={getApprovedScore(
                                      Number(music.music_id)
                                    )}
                                  />
                                </DynamicEventApprovedScoreWarning>
                              )}

                              {!!getPendingScore(Number(music.music_id)) && (
                                <DynamicEventPendingScoreWarning>
                                  <h4>Score em ANÁLISE</h4>
                                  <ScoreCard
                                    score={getPendingScore(
                                      Number(music.music_id)
                                    )}
                                  />

                                  <DynamicEventScoreSubmissionWarning>
                                    <strong>IMPORTANTE</strong>: O Envio de um
                                    novo Score irá SUBSTITUIR o Score em Análise
                                    atual!
                                  </DynamicEventScoreSubmissionWarning>
                                </DynamicEventPendingScoreWarning>
                              )}
                              <ScoreCreateForm
                                music={music}
                                event={eventData ? eventData : undefined}
                              />
                            </Modal>
                          </>
                        )}

                        {isAdmin() && (
                          <>
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
                          </>
                        )}
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

export default USongList;
