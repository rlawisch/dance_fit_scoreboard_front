import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { useScore } from "../../../../providers/Scores";
import { IScore } from "../../../../types/entity-types";
import {
  DyEvPlayerScoreListWrapper,
  DynamicEventScoreDataWrapper,
  DynamicEventScoreTable,
  DynamicEventTable,
  DynamicEventTd,
  DynamicEventTh,
  MusicLevelMiniature,
  MusicWrapper,
  PlayerInfoWrapper,
  PlayerMiniature,
  SmallScreeDynamicEventTableHeader,
  SmallScreenDynamicEventTable,
  TableScoreValue,
} from "../../../../styles/global";
import useDynamicModal from "../../../../providers/DynamicModal";
import { BallTriangle } from "react-loader-spinner";
import { stringShortener } from "../../../../utils/stringShortener";
import Button from "../../../../components/Button";
import {
  ScoreGrade,
  ScoreGradeWrapper,
} from "../../../../components/ScoreCard/styles";
import { getGradeImageFileName } from "../../../../utils/getGradeImageFileName";
import Modal from "../../../../components/Modal";
import ScoreCard from "../../../../components/ScoreCard";

interface RankingByMusicProps {}

interface LeaderboardMusic {
  music_id: string;
  name: string;
  level: number;
  mode: string;
  scores: IScore[];
}

const RankingByMusic: FunctionComponent<RankingByMusicProps> = () => {
  const theme = useContext(ThemeContext);

  const { event_id } = useParams();

  // states
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [musicLeaderboard, setMusicLeaderboard] = useState<LeaderboardMusic[]>(
    []
  );
  const [visibleScores, setVisibleScores] = useState<{
    [key: string]: boolean;
  }>({});

  // providers
  const { getScoresByEvent, eventScores, isLoadingEventScores } = useScore();

  // life cycle
  useEffect(() => {
    getScoresByEvent(Number(event_id));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (eventScores) {
      // Create a map to group scores by music
      const musicScoresMap = new Map<string, LeaderboardMusic>();

      eventScores.forEach((score: IScore) => {
        // Filter out no bar players
        if (!score.player.bar) {
          return;
        }

        const musicId = score.music.music_id;
        const existingData = musicScoresMap.get(musicId) || {
          music_id: musicId,
          name: score.music.name,
          level: score.music.level,
          mode: score.music.mode,
          scores: [] as IScore[],
        };

        const leaderboardScore: IScore = {
          ...score,
        };

        existingData.scores.push(leaderboardScore);
        musicScoresMap.set(musicId, existingData);
      });

      // Convert the map to an array
      const musicLeaderboardArray = Array.from(musicScoresMap.values());

      // Sort each music's scores by value from highest to lowest
      musicLeaderboardArray.forEach((music) => {
        music.scores.sort((a, b) => b.value - a.value);
      });

      // Sort by mode then by level
      musicLeaderboardArray.sort((a, b) => {
        if (a.mode === b.mode) {
          return a.level - b.level;
        }
        return a.mode.localeCompare(b.mode);
      });

      setMusicLeaderboard(musicLeaderboardArray);
    }
  }, [eventScores, setMusicLeaderboard]);

  const {
    isModalOpen: isScoreDetailsModalOpen,
    openModal: openScoreDetailsModal,
    closeModal: closeScoreDetailsModal,
  } = useDynamicModal();

  const toggleScoresVisibility = (playerId: string) => {
    setVisibleScores((prevState) => ({
      ...prevState,
      [playerId]: !prevState[playerId],
    }));
  };

  return (
    <>
      {isLoadingEventScores ? (
        <BallTriangle
          height={36}
          width={36}
          radius={5}
          color={theme?.colors.primary}
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoadingEventScores}
        />
      ) : (
        <>
          <DynamicEventTable>
            <thead>
              <tr>
                <DynamicEventTh>Música</DynamicEventTh>
                <DynamicEventTh>Scores</DynamicEventTh>
              </tr>
            </thead>
            <tbody>
              {musicLeaderboard.map((music, index) => (
                <tr key={index}>
                  <DynamicEventTd>
                    <MusicWrapper>
                      <MusicLevelMiniature
                        src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level
                          .toString()
                          .padStart(2, "0")}.png`}
                      />
                      {stringShortener(windowWidth, music.name)}
                    </MusicWrapper>
                  </DynamicEventTd>

                  <DynamicEventTd>
                    <Button
                      onClick={() => toggleScoresVisibility(music.music_id)}
                    >
                      {visibleScores[music.music_id]
                        ? "Esconder Scores"
                        : "Mostrar Scores"}
                    </Button>

                    {visibleScores[music.music_id] && (
                      <DynamicEventScoreTable>
                        {music.scores.map((score, i) => (
                          <tr key={i}>
                            <td>
                              <DyEvPlayerScoreListWrapper>
                                <PlayerInfoWrapper>
                                  <PlayerMiniature
                                    src={
                                      score.player.profilePicture
                                        ? score.player.profilePicture
                                        : "/img/default_player.png"
                                    }
                                    alt="Mini Profile Picture"
                                  />
                                  {score.player.nickname}
                                </PlayerInfoWrapper>

                                <DynamicEventScoreDataWrapper>
                                  <TableScoreValue
                                    onClick={() =>
                                      openScoreDetailsModal(score.score_id)
                                    }
                                  >
                                    {score.value.toLocaleString()}
                                  </TableScoreValue>
                                  <ScoreGradeWrapper>
                                    <ScoreGrade
                                      src={getGradeImageFileName(score)}
                                    />
                                  </ScoreGradeWrapper>
                                  <Modal
                                    isOpen={isScoreDetailsModalOpen(
                                      score.score_id
                                    )}
                                    onClose={() =>
                                      closeScoreDetailsModal(score.score_id)
                                    }
                                  >
                                    <ScoreCard score={score} />
                                  </Modal>
                                </DynamicEventScoreDataWrapper>
                              </DyEvPlayerScoreListWrapper>
                            </td>
                          </tr>
                        ))}
                      </DynamicEventScoreTable>
                    )}
                  </DynamicEventTd>
                </tr>
              ))}
            </tbody>
          </DynamicEventTable>

          <SmallScreenDynamicEventTable>
            <tbody>
              {musicLeaderboard.map((music, index) => (
                <>
                  <SmallScreeDynamicEventTableHeader key={index}>
                    <DynamicEventTd>
                      <MusicWrapper>
                        <MusicLevelMiniature
                          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level
                            .toString()
                            .padStart(2, "0")}.png`}
                        />
                        {stringShortener(windowWidth, music.name)}
                      </MusicWrapper>
                    </DynamicEventTd>
                  </SmallScreeDynamicEventTableHeader>

                  <tr>
                    <DynamicEventTd>
                      <Button
                        onClick={() => toggleScoresVisibility(music.music_id)}
                      >
                        {visibleScores[music.music_id]
                          ? "Esconder Scores"
                          : "Mostrar Scores"}
                      </Button>

                      {visibleScores[music.music_id] && (
                        <DynamicEventScoreTable>
                          {music.scores.map((score, i) => (
                            <tr key={i}>
                              <td>
                                <DyEvPlayerScoreListWrapper>
                                  <PlayerInfoWrapper>
                                    <PlayerMiniature
                                      src={
                                        score.player.profilePicture
                                          ? score.player.profilePicture
                                          : "/img/default_player.png"
                                      }
                                      alt="Mini Profile Picture"
                                    />
                                    {score.player.nickname}
                                  </PlayerInfoWrapper>

                                  <DynamicEventScoreDataWrapper>
                                    <TableScoreValue
                                      onClick={() =>
                                        openScoreDetailsModal(score.score_id)
                                      }
                                    >
                                      {score.value.toLocaleString()}
                                    </TableScoreValue>
                                    <ScoreGradeWrapper>
                                      <ScoreGrade
                                        src={getGradeImageFileName(score)}
                                      />
                                    </ScoreGradeWrapper>
                                    <Modal
                                      isOpen={isScoreDetailsModalOpen(
                                        score.score_id
                                      )}
                                      onClose={() =>
                                        closeScoreDetailsModal(score.score_id)
                                      }
                                    >
                                      <ScoreCard score={score} />
                                    </Modal>
                                  </DynamicEventScoreDataWrapper>
                                </DyEvPlayerScoreListWrapper>
                              </td>
                            </tr>
                          ))}
                        </DynamicEventScoreTable>
                      )}
                    </DynamicEventTd>
                  </tr>
                </>
              ))}
            </tbody>
          </SmallScreenDynamicEventTable>
        </>
      )}
    </>
  );
};

export default RankingByMusic;
