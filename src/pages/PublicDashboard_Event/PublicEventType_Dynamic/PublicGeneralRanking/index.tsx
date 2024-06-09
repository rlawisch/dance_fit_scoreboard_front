import { FunctionComponent, useEffect, useState } from "react";
import {
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
  PlayerInfoWrapper,
  PlayerMiniature,
  TableScoreValue,
} from "../../../../styles/global";
import { useScore } from "../../../../providers/Scores";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IScore } from "../../../../types/entity-types";
import ScoreCard from "../../../../components/ScoreCard";
import {
  ScoreGrade,
  ScoreGradeWrapper,
} from "../../../../components/ScoreCard/styles";
import { getGradeImageFileName } from "../../../../utils/getGradeImageFileName";
import useDynamicModal from "../../../../providers/DynamicModal";
import Modal from "../../../../components/Modal";

interface PublicGeneralRankingProps {}

interface LeaderboardPlayer {
  player_id: string;
  nickname: string;
  scores: IScore[];
  totalScore: number;
  profilePicture: string | undefined;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const PlayerScoreList = styled.ul`
  list-style: none;
`;

const ScoreListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const PublicGeneralRanking: FunctionComponent<PublicGeneralRankingProps> = () => {
  
  const { event_id } = useParams();

  const { getScoresByEvent, eventScores } = useScore();

  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);

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

      // Convert the map to an array and sort it by the total score
      const leaderboardArray = Array.from(playerScoresMap.values());
      leaderboardArray.sort((a, b) => b.totalScore - a.totalScore);

      setLeaderboard(leaderboardArray);
    }
  }, [eventScores]);

  const {
    isModalOpen: isScoreDetailsModalOpen,
    openModal: openScoreDetailsModal,
    closeModal: closeScoreDetailsModal,
  } = useDynamicModal();
  
  return (
    <GlobalContainer>
      <h2>Ranking Geral</h2>

      <Table>
        <thead>
          <tr>
            <Th>Player</Th>
            <Th>Scores</Th>
            <Th>Total Score</Th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <Td>
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
              </Td>
              <Td>
                <PlayerScoreList>
                  {player.scores.map((score, i) => (
                    <ScoreListItem key={i}>
                      <MusicWrapper>
                        <MusicLevelMiniature
                          src={`/static/musics/${score.music.mode}/${score.music.mode.charAt(0).toUpperCase()}${score.music.level
                            .toString()
                            .padStart(2, "0")}.png`}
                        />
                        {score.music.name}
                      </MusicWrapper>
                      <TableScoreValue
                        onClick={() => openScoreDetailsModal(score.score_id)}
                      >
                        {score.value.toLocaleString()}
                      </TableScoreValue>
                      <ScoreGradeWrapper>
                        <ScoreGrade src={getGradeImageFileName(score)} />
                      </ScoreGradeWrapper>
                      <Modal
                        isOpen={isScoreDetailsModalOpen(score.score_id)}
                        onClose={() => closeScoreDetailsModal(score.score_id)}
                      >
                        <ScoreCard score={score} />
                      </Modal>
                    </ScoreListItem>
                  ))}
                </PlayerScoreList>
              </Td>
              <Td>{player.totalScore.toLocaleString()}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GlobalContainer>
  );
};

export default PublicGeneralRanking;
