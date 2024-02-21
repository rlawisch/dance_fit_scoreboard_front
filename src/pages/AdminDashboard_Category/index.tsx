import { FunctionComponent, useEffect, useState } from "react";
import { GlobalContainer, PlayerMiniature } from "../../styles/global";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../providers/Category";
import { CategoryTitle, ScoreboardTable } from "./styles";
import { Table, TableDataWrapper } from "../AdminDashboard_Event/styles";
import { IPhase } from "../../types/entity-types";
import React from "react";

interface AdminDashboardCategoryProps {}

interface ScoreSum {
  [playerId: string]: number;
}

function calculateTotalColumns(phases: IPhase[] | undefined): number {
  if (!phases) return 0;
  return (
    phases.reduce((acc, phase) => acc + (phase.musics?.length || 0), 0) + 1
  );
}


const AdminDashboardCategory: FunctionComponent<
  AdminDashboardCategoryProps
> = () => {
  const navigate = useNavigate();

  const { event_id, category_id } = useParams();

  const { categoryData, getCategoryData } = useCategory();

  useEffect(() => {
    getCategoryData(Number(category_id));
  }, []);

  const [scoreSum, setScoreSum] = useState<ScoreSum>({});

  useEffect(() => {
    // Calculate sum of scores for each player

    categoryData?.players?.forEach((player) => {
      let totalScore = 0;
      categoryData.phases?.forEach((phase) => {
        phase.musics?.forEach((music) => {
          const score = music.scores?.find(
            (s) => s.player.player_id === player.player_id
          );
          if (score) {
            totalScore += score.value;
          }
        });
      });
      scoreSum[player.player_id] = totalScore;
    });
    setScoreSum(scoreSum);
  }, [categoryData]);

  return (
    <GlobalContainer>
      <Button onClick={() => navigate(`/admin/events/${event_id}`)}>
        Voltar
      </Button>

      <CategoryTitle>{categoryData?.name}</CategoryTitle>

      <Table>
        <thead>
          <tr>
            <th>Participantes</th>
          </tr>
        </thead>
        <tbody>
          {!!categoryData &&
            categoryData.players?.map((p) => (
              <tr key={p.player_id}>
                <td>
                  <TableDataWrapper>
                    <PlayerMiniature
                      src={
                        p.profilePicture
                          ? p.profilePicture
                          : "/src/assets/img/default_player.png"
                      }
                      alt="Mini Profile Picture"
                    />
                    {p.nickname}
                  </TableDataWrapper>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {!!categoryData && (
        <ScoreboardTable>
          <thead>
            <tr>
              <th>Player</th>
              {categoryData?.phases?.flatMap((phase) =>
                phase.musics?.map((music) => (
                  <th key={music.music_id}>{music.name}</th>
                ))
              )}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.phases?.map((phase) => (
              <React.Fragment key={phase.phase_id}>
                <tr>
                  <td colSpan={calculateTotalColumns(categoryData?.phases) +1}>
                    Fase {phase.phase_number}
                  </td>
                </tr>
                {phase.musics &&
                  phase.musics.length > 0 &&
                  categoryData.players?.map((player) => (
                    <tr key={player.player_id}>
                      <td>
                        <TableDataWrapper>
                          <PlayerMiniature
                            src={
                              player.profilePicture
                                ? player.profilePicture
                                : "/src/assets/img/default_player.png"
                            }
                            alt="Mini Profile Picture"
                          />
                          {player.nickname}
                        </TableDataWrapper>
                      </td>
                      {phase.musics?.map((music) => (
                        <td key={music.music_id}>
                          {
                            music.scores?.find(
                              (score) =>
                                score.player.player_id === player.player_id
                            )?.value
                          }
                        </td>
                      ))}
                      <td>{scoreSum[player.player_id]}</td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </ScoreboardTable>
      )}


    </GlobalContainer>
  );
};

export default AdminDashboardCategory;
