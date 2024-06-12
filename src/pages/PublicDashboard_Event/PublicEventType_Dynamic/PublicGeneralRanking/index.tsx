import { FunctionComponent, useEffect, useState } from "react";
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
  RankingMedal,
  SmallScreeDynamicEventTableHeader,
  SmallScreenDynamicEventTable,
  TableScoreValue,
} from "../../../../styles/global";
import { useParams } from "react-router-dom";
import { useScore } from "../../../../providers/Scores";
import { IScore } from "../../../../types/entity-types";
import useDynamicModal from "../../../../providers/DynamicModal";
import {
  ScoreGrade,
  ScoreGradeWrapper,
} from "../../../../components/ScoreCard/styles";
import { getGradeImageFileName } from "../../../../utils/getGradeImageFileName";
import Modal from "../../../../components/Modal";
import ScoreCard from "../../../../components/ScoreCard";
import Button from "../../../../components/Button";

interface PublicGeneralRankingProps {}

interface LeaderboardPlayer {
  player_id: string;
  nickname: string;
  scores: IScore[];
  totalScore: number;
  profilePicture: string | undefined;
}

const medals = [
  "/static/medals/goldMedal.png",
  "/static/medals/silverMedal.png",
  "/static/medals/bronzeMedal.png",
];

const PublicGeneralRanking: FunctionComponent<
  PublicGeneralRankingProps
> = () => {
  const { event_id } = useParams();

  const { getScoresByEvent, eventScores } = useScore();

  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  const [visibleScores, setVisibleScores] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    getScoresByEvent(Number(event_id));
  }, []);

  useEffect(() => {
    if (eventScores) {
      // Create a map to group scores by player
      const playerScoresMap = new Map<string, LeaderboardPlayer>();

      eventScores.forEach((score: IScore) => {
        const playerId = score.player.player_id;
        const existingData = playerScoresMap.get(playerId) || {
          player_id: playerId,
          nickname: score.player.nickname,
          profilePicture: score.player.profilePicture,
          scores: [] as IScore[],
          totalScore: 0,
        };

        const leaderboardScore: IScore = {
          ...score,
        };

        existingData.scores.push(leaderboardScore);
        existingData.totalScore += score.value;

        playerScoresMap.set(playerId, existingData);
      });

      // Convert the map to an array
      const leaderboardArray = Array.from(playerScoresMap.values());

      // Sort each player's scores by mode and level
      leaderboardArray.forEach((player) => {
        player.scores.sort((a, b) => {
          if (a.music.mode !== b.music.mode) {
            return a.music.mode.localeCompare(b.music.mode); // Sort by mode
          }
          return a.music.level - b.music.level; // Sort by level within the same mode
        });
      });

      // Sort the leaderboard by the total score
      leaderboardArray.sort((a, b) => b.totalScore - a.totalScore);

      setLeaderboard(leaderboardArray);
    }
  }, [eventScores]);

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
      <DynamicEventTable>
        <thead>
          <tr>
            <DynamicEventTh>Posição</DynamicEventTh>
            <DynamicEventTh>Jogador(a)</DynamicEventTh>
            <DynamicEventTh>Scores</DynamicEventTh>
            <DynamicEventTh># de Músicas Jogadas</DynamicEventTh>
            <DynamicEventTh>Pontuação</DynamicEventTh>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <DynamicEventTd>
                {index < 3 ? (
                  <RankingMedal
                    src={medals[index]}
                    alt={`${index + 1} medal`}
                  />
                ) : (
                  `#${index + 1}`
                )}
              </DynamicEventTd>

              <DynamicEventTd>
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
              </DynamicEventTd>

              <DynamicEventTd>
                <Button
                  onClick={() => toggleScoresVisibility(player.player_id)}
                >
                  {visibleScores[player.player_id]
                    ? "Esconder Scores"
                    : "Mostrar Scores"}
                </Button>

                {visibleScores[player.player_id] && (
                  <DynamicEventScoreTable>
                    {player.scores.map((score, i) => (
                      <tr key={i}>
                        <td>
                          <DyEvPlayerScoreListWrapper>
                            <MusicWrapper>
                              <MusicLevelMiniature
                                src={`/static/musics/${score.music.mode}/${score.music.mode.charAt(0).toUpperCase()}${score.music.level
                                  .toString()
                                  .padStart(2, "0")}.png`}
                              />
                              {score.music.name}
                            </MusicWrapper>

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
                                isOpen={isScoreDetailsModalOpen(score.score_id)}
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

              <DynamicEventTd>
                {player.scores.length} {"/ 14"}
              </DynamicEventTd>

              <DynamicEventTd>
                {(player.totalScore / (14 * 10000)).toFixed(2).toLocaleString()}
              </DynamicEventTd>
            </tr>
          ))}
        </tbody>
      </DynamicEventTable>

      <SmallScreenDynamicEventTable>
        <tbody>
          {leaderboard.map((player, index) => (
            <>
              <SmallScreeDynamicEventTableHeader key={index}>
                <DynamicEventTd>
                  {index < 3 ? (
                    <RankingMedal
                      src={medals[index]}
                      alt={`${index + 1} medal`}
                    />
                  ) : (
                    `#${index + 1}`
                  )}
                </DynamicEventTd>
              </SmallScreeDynamicEventTableHeader>
              <tr>
                <DynamicEventTd>
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
                </DynamicEventTd>
              </tr>
              <tr>
                <DynamicEventTd>
                  <Button
                    onClick={() => toggleScoresVisibility(player.player_id)}
                  >
                    {visibleScores[player.player_id]
                      ? "Esconder Scores"
                      : "Mostrar Scores"}
                  </Button>

                  {visibleScores[player.player_id] && (
                    <DynamicEventScoreTable>
                      {player.scores.map((score, i) => (
                        <tr key={i}>
                          <td>
                            <DyEvPlayerScoreListWrapper>
                              <MusicWrapper>
                                <MusicLevelMiniature
                                  src={`/static/musics/${score.music.mode}/${score.music.mode.charAt(0).toUpperCase()}${score.music.level
                                    .toString()
                                    .padStart(2, "0")}.png`}
                                />
                                {score.music.name}
                              </MusicWrapper>

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
              <tr>
                <DynamicEventTd>
                  {`# de Músicas Jogadas: ${player.scores.length} / 14`}
                </DynamicEventTd>
              </tr>
              <tr>
                <DynamicEventTd>
                  {"Pontuação:  "}
                  {(player.totalScore / (14 * 10000))
                    .toFixed(2)
                    .toLocaleString()}
                </DynamicEventTd>
              </tr>
            </>
          ))}
        </tbody>
      </SmallScreenDynamicEventTable>
    </>
  );
};

export default PublicGeneralRanking;
