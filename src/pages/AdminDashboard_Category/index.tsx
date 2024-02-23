import React, { FunctionComponent, useEffect, useState } from "react";
import { GlobalContainer, PlayerMiniature } from "../../styles/global";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../providers/Category";
import {
  CategoryTitle,
  LargeScreenTableDisplay,
  PhaseTitle,
  PlayerInfoWrapper,
  ResponsiveTable,
  ResponsiveTableCell,
  ResponsiveTableHeader,
  ResponsiveTableRow,
  ResponsiveTableWrapper,
  SmallScreenTableDisplay,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "./styles";
import { Table, TableDataWrapper } from "../AdminDashboard_Event/styles";
import { IPhase, IPlayer, IScore } from "../../types/entity-types";

interface AdminDashboardCategoryProps {}

const AdminDashboardCategory: FunctionComponent<
  AdminDashboardCategoryProps
> = () => {
  const navigate = useNavigate();

  const { event_id, category_id } = useParams();

  const { categoryData, getCategoryData } = useCategory();

  useEffect(() => {
    getCategoryData(Number(category_id));
  }, []);

  const sortedPhases = categoryData?.phases?.sort(
    (a, b) => a.phase_number - b.phase_number
  );

  const renderLargeScreenTable = () => {
    return sortedPhases?.map((phase: IPhase) => (
      <TableWrapper key={`phase-${phase.phase_number}`}>
        <PhaseTitle>Fase {phase.phase_number}</PhaseTitle>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Player</TableHeader>
              {phase.musics?.map((music) => (
                <TableHeader key={`music-${music.music_id}`}>
                  {music.name}
                </TableHeader>
              ))}
              <TableHeader>Total</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {categoryData?.players?.map((player) => (
              <TableRow key={`player-${player.player_id}`}>
                <TableCell>
                  <PlayerInfoWrapper>
                    <PlayerMiniature
                      src={
                        player.profilePicture ||
                        "/src/assets/img/default_player.png"
                      }
                      alt={player.nickname}
                    />
                    {player.nickname}
                  </PlayerInfoWrapper>
                </TableCell>
                {phase.musics?.map((music) => {
                  const score: IScore | undefined = phase.scores?.find(
                    (s: IScore) =>
                      s.player.player_id === player.player_id &&
                      s.music.music_id === music.music_id
                  );
                  return (
                    <TableCell
                      key={`score-${player.player_id}-${music.music_id}`}
                    >
                      {score ? score.value : "-"}
                    </TableCell>
                  );
                })}
                <TableCell>
                  {/* Calculate total score for this phase */}
                  {phase.scores
                    ?.filter(
                      (score: IScore) =>
                        score.player.player_id === player.player_id
                    )
                    .reduce((acc, curr) => acc + curr.value, 0) || "-"}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    ));
  };

  const renderSmallScreenTable = () => {
    return sortedPhases?.map((phase) => (
      <ResponsiveTableWrapper key={`phase-${phase.phase_number}`}>
        <PhaseTitle>Fase {phase.phase_number}</PhaseTitle>
        {categoryData?.players?.map((player) => (
          <Table key={`phase-${phase.phase_number}-player-${player.player_id}`}>
            <thead>
              <ResponsiveTableRow>
                <ResponsiveTableHeader>Música</ResponsiveTableHeader>
                <ResponsiveTableHeader>Score</ResponsiveTableHeader>
              </ResponsiveTableRow>
            </thead>
            <tbody>
              <ResponsiveTableRow>
                <ResponsiveTableCell colSpan={2}>
                  <PlayerInfoWrapper>
                    <PlayerMiniature
                      src={
                        player.profilePicture ||
                        "/src/assets/img/default_player.png"
                      }
                      alt={player.nickname}
                    />
                    {player.nickname}
                  </PlayerInfoWrapper>
                </ResponsiveTableCell>
              </ResponsiveTableRow>
              {phase.musics?.map((music) => {
                const score: IScore | undefined = phase.scores?.find(
                  (s: IScore) =>
                    s.player.player_id === player.player_id &&
                    s.music.music_id === music.music_id
                );
                return (
                  <ResponsiveTableRow
                    key={`player-${player.player_id}-music-${music.music_id}`}
                  >
                    <ResponsiveTableCell>{music.name}</ResponsiveTableCell>
                    <ResponsiveTableCell>
                      {score ? score.value : "-"}
                    </ResponsiveTableCell>
                  </ResponsiveTableRow>
                );
              })}
              <ResponsiveTableRow>
                <ResponsiveTableCell>Total</ResponsiveTableCell>
                <ResponsiveTableCell>
                  {/* Calculate total score for this phase */}
                  {phase.scores
                    ?.filter(
                      (score: IScore) =>
                        score.player.player_id === player.player_id
                    )
                    .reduce((acc, curr) => acc + curr.value, 0) || "-"}
                </ResponsiveTableCell>
              </ResponsiveTableRow>
            </tbody>
          </Table>
        ))}
      </ResponsiveTableWrapper>
    ));
  };

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

      <SmallScreenTableDisplay>
        {sortedPhases?.map((phase) => (
          <ResponsiveTableWrapper key={`phase-${phase.phase_number}`}>
            <PhaseTitle>Fase {phase.phase_number}</PhaseTitle>
            {categoryData?.players?.map((player) => (
              <Table
                key={`phase-${phase.phase_number}-player-${player.player_id}`}
              >
                <thead>
                  <ResponsiveTableRow>
                    <ResponsiveTableHeader>Música</ResponsiveTableHeader>
                    <ResponsiveTableHeader>Score</ResponsiveTableHeader>
                  </ResponsiveTableRow>
                </thead>
                <tbody>
                  <ResponsiveTableRow>
                    <ResponsiveTableCell colSpan={2}>
                      <PlayerInfoWrapper>
                        <PlayerMiniature
                          src={
                            player.profilePicture ||
                            "/src/assets/img/default_player.png"
                          }
                          alt={player.nickname}
                        />
                        {player.nickname}
                      </PlayerInfoWrapper>
                    </ResponsiveTableCell>
                  </ResponsiveTableRow>
                  {phase.musics?.map((music) => {
                    const score: IScore | undefined = phase.scores?.find(
                      (s: IScore) =>
                        s.player.player_id === player.player_id &&
                        s.music.music_id === music.music_id
                    );
                    return (
                      <ResponsiveTableRow
                        key={`player-${player.player_id}-music-${music.music_id}`}
                      >
                        <ResponsiveTableCell>{music.name}</ResponsiveTableCell>
                        <ResponsiveTableCell>
                          {score ? score.value : "-"}
                        </ResponsiveTableCell>
                      </ResponsiveTableRow>
                    );
                  })}
                  <ResponsiveTableRow>
                    <ResponsiveTableCell>Total</ResponsiveTableCell>
                    <ResponsiveTableCell>
                      {/* Calculate total score for this phase */}
                      {phase.scores
                        ?.filter(
                          (score: IScore) =>
                            score.player.player_id === player.player_id
                        )
                        .reduce((acc, curr) => acc + curr.value, 0) || "-"}
                    </ResponsiveTableCell>
                  </ResponsiveTableRow>
                </tbody>
              </Table>
            ))}
          </ResponsiveTableWrapper>
        ))}
      </SmallScreenTableDisplay>

      <LargeScreenTableDisplay>
        {sortedPhases?.map((phase: IPhase) => (
          <TableWrapper key={`phase-${phase.phase_number}`}>
            <PhaseTitle>Fase {phase.phase_number}</PhaseTitle>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Player</TableHeader>
                  {phase.musics?.map((music) => (
                    <TableHeader key={`music-${music.music_id}`}>
                      {music.name}
                    </TableHeader>
                  ))}
                  <TableHeader>Total</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {categoryData?.players?.map((player) => (
                  <TableRow key={`player-${player.player_id}`}>
                    <TableCell>
                      <PlayerInfoWrapper>
                        <PlayerMiniature
                          src={
                            player.profilePicture ||
                            "/src/assets/img/default_player.png"
                          }
                          alt={player.nickname}
                        />
                        {player.nickname}
                      </PlayerInfoWrapper>
                    </TableCell>
                    {phase.musics?.map((music) => {
                      const score: IScore | undefined = phase.scores?.find(
                        (s: IScore) =>
                          s.player.player_id === player.player_id &&
                          s.music.music_id === music.music_id
                      );
                      return (
                        <TableCell
                          key={`score-${player.player_id}-${music.music_id}`}
                        >
                          {score ? score.value : "-"}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      {/* Calculate total score for this phase */}
                      {phase.scores
                        ?.filter(
                          (score: IScore) =>
                            score.player.player_id === player.player_id
                        )
                        .reduce((acc, curr) => acc + curr.value, 0) || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        ))}
      </LargeScreenTableDisplay>
    </GlobalContainer>
  );
};

export default AdminDashboardCategory;
