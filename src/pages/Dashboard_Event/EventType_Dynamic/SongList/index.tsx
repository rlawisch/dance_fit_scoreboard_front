import React, { FunctionComponent, useEffect } from "react";
import { useSongList } from "../../../../providers/SongLists";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../../providers/Events";
import {
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
  Table,
  TableHeaderWrapper,
} from "../../../../styles/global";
import { IMusic, IScore } from "../../../../types/entity-types";
import { useComfortLevel } from "../../../../providers/ComfortLevels";
import { usePlayer } from "../../../../providers/Players";
import Button from "../../../../components/Button";
import { TiUploadOutline } from "react-icons/ti";
import useDynamicModal from "../../../../providers/DynamicModal";
import Modal from "../../../../components/Modal";
import ScoreCreateForm from "../../../../components/Forms/ScoreSubmit";
import { useScore } from "../../../../providers/Scores";
import ScoreCard from "../../../../components/ScoreCard";
import styled from "styled-components";

interface SongListProps {}

const Paragraph = styled.p`
  padding: 1rem;
`

const List = styled.ul`
  padding: 2rem;
`

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

  const {
    pendingScores,
    getPendingScoresByEvent,
    eventScores,
    getScoresByEvent,
  } = useScore();

  useEffect(() => {
    getEventData(Number(event_id));
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
    <GlobalContainer>

    <Paragraph>
      Aqui é onde os jogadores fazem o envio dos Scores usando o botão <Button><TiUploadOutline /></Button>, uma vez enviado, o Score é mandado para análise da administração e se os dados estiverem corretos e baterem com os dados da foto do DG ele será aprovado para só então aparecer nos Rankings.
    </Paragraph>

    <Paragraph>
      Use a função de enquadramento da foto do DG para ter certeza de que aparecem legíveis dados como:
    </Paragraph>

    <Paragraph>
      Caso o jogador já possuir tanto um Score já ranqueado ou em análise, ao abrir o formulário de cadastro os mesmos apareçerão para ter certeza de que não está fazendo o envio de um Score de valor mais baixo.
    </Paragraph>


    <List>
      <li>
        Nick do Card
      </li>
      <li>
        Pontuação
      </li>
      <li>
        Grade (SSS+, etc..)
      </li>
      <li>
        Plate (Fair Game, etc..)
      </li>
    </List>
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
                            {!!getApprovedScore(Number(music.music_id)) && (
                              <>
                                Você já possui um Score já aprovado para esta
                                música:
                                <ScoreCard
                                  score={getApprovedScore(
                                    Number(music.music_id)
                                  )}
                                />
                              </>
                            )}

                            {!!getPendingScore(Number(music.music_id)) && (
                              <>
                                Você já possui um Score em análise para esta
                                música:
                                <ScoreCard
                                  score={getPendingScore(
                                    Number(music.music_id)
                                  )}
                                />
                              </>
                            )}
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
    </GlobalContainer>
  );
};

export default SongList;
