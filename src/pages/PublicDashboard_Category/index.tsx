import { FunctionComponent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../providers/Category";
import {
  GlobalContainer,
  LargeScreenTableDisplay,
  MusicLevelMiniature,
  MusicWrapper,
  PhaseBreakSpan,
  PhaseHeaderPassSpan,
  PhasePassSpan,
  PhaseTitleWrapper,
  PlayerInfoWrapper,
  PlayerMiniature,
  SmallScreenTableDataWrapper,
  SmallScreenTableDisplay,
  Table,
  TableData,
  TableDataButtonWrapper,
  TableDataWrapper,
  TableHeaderWrapper,
  TableScoreDataWrapper,
  TableScoreValue,
  Title,
} from "../../styles/global";
import Button from "../../components/Button";
import { IPhase, IScore } from "../../types/entity-types";
import { TableHeader, TableRow, TableWrapper } from "../../styles/global";
// import { TiUploadOutline } from "react-icons/ti";
// import Modal from "../../components/Modal";
// import ScoreCreateForm from "../../components/Forms/ScoreCreate";
import ScoreCard from "../../components/ScoreCard";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa6";
import {
  ScoreGrade,
  ScoreGradeWrapper,
} from "../../components/ScoreCard/styles";
import { getGradeImageFileName } from "../../utils/getGradeImageFileName";
import useDynamicModal from "../../providers/DynamicModal";
import Modal from "../../components/Modal";
// import useDynamicModal from "../../providers/DynamicModal";

interface PublicDashboardCategoryProps {}

const PublicDashboardCategory: FunctionComponent<
  PublicDashboardCategoryProps
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

  // const {
  //   isModalOpen: isScoreCreateModalOpen,
  //   openModal: openScoreCreateModal,
  //   closeModal: closeScoreCreateModal,
  // } = useDynamicModal();

  const {
    isModalOpen: isScoreDetailsModalOpen,
    openModal: openScoreDetailsModal,
    closeModal: closeScoreDetailsModal,
  } = useDynamicModal();

  return (
    <GlobalContainer>
      <Button onClick={() => navigate(`/public/events/${event_id}`)}>
        Voltar
      </Button>

      <Title>{categoryData?.name}</Title>

      {categoryData && (
        <Table>
          <thead>
            <tr>
              <TableHeader>
                <TableHeaderWrapper>Informações</TableHeaderWrapper>
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nível Mínimo: {categoryData.level_min}</td>
            </tr>
            <tr>
              <td>Nível Máximo: {categoryData.level_max}</td>
            </tr>
            <tr>
              <td>Número de Fases: {categoryData.number_of_phases}</td>
            </tr>
          </tbody>
        </Table>
      )}

      {categoryData?.players && (
        <Table>
          <thead>
            <tr>
              <TableHeader>
                <TableHeaderWrapper>Participantes</TableHeaderWrapper>
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {!!categoryData &&
              categoryData.players.map((p) => (
                <tr key={p.player_id}>
                  <td>
                    <TableDataWrapper>
                      <PlayerInfoWrapper>
                        <PlayerMiniature
                          src={
                            p.profilePicture
                              ? p.profilePicture
                              : "/img/default_player.png"
                          }
                          alt="Mini Profile Picture"
                        />
                        {p.nickname}
                      </PlayerInfoWrapper>
                    </TableDataWrapper>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      <SmallScreenTableDisplay>
        {categoryData &&
          sortedPhases?.map((phase: IPhase) => (
            <TableWrapper key={`phase-${phase.phase_number}`}>
              <Table key={`phase-${phase.phase_number}`}>
                <thead>
                  <tr>
                    <TableHeader>
                      <TableHeaderWrapper>
                        <PhaseTitleWrapper>
                          Fase{" "}
                          {phase.phase_number === categoryData.number_of_phases
                            ? "Final"
                            : phase.phase_number}
                          <PhaseHeaderPassSpan>
                            {"passam " + phase.passing_players}
                          </PhaseHeaderPassSpan>
                        </PhaseTitleWrapper>
                      </TableHeaderWrapper>
                    </TableHeader>
                  </tr>
                </thead>
              </Table>
              {categoryData?.players
                ?.sort((a, b) => {
                  // Calculate total scores for each player in the current phase
                  const totalScoreA = phase.scores
                    ?.filter((score) => score.player.player_id === a.player_id)
                    .reduce((acc, curr) => acc + curr.value, 0);

                  const totalScoreB = phase.scores
                    ?.filter((score) => score.player.player_id === b.player_id)
                    .reduce((acc, curr) => acc + curr.value, 0);

                  // Sort players based on total score value
                  if (!totalScoreA && !totalScoreB) {
                    return a.nickname.localeCompare(b.nickname); // Sort alphabetically
                  } else if (!totalScoreA) {
                    return 1; // Move player without scores to the end
                  } else if (!totalScoreB) {
                    return -1; // Move player without scores to the end
                  } else {
                    return totalScoreB - totalScoreA; // Sort by score descending
                  }
                })
                .map((player, index) => (
                  <Table
                    key={`phase-${phase.phase_number}-player-${player.player_id}`}
                  >
                    <tbody>
                      <TableRow key={player.player_id}>
                        <TableData
                          key={player.player_id}
                          colSpan={2}
                          style={
                            index + 1 > phase.passing_players
                              ? {
                                  background: `linear-gradient(90deg, rgba(31,31,31,0.3085609243697479) 40%, rgba(211, 32, 32, 0.519) 100%)`,
                                }
                              : {
                                  background: `linear-gradient(90deg, rgba(31,31,31,0.3085609243697479) 40%, rgba(51,213,34,0.5186449579831933) 100%)`,
                                }
                          }
                        >
                          <PlayerInfoWrapper>
                            <PlayerMiniature
                              src={
                                player.profilePicture ||
                                "/img/default_player.png"
                              }
                              alt={player.nickname}
                            />
                            {"#" + (index + 1) + " "}
                            {player.nickname}
                            {index + 1 > phase.passing_players ? (
                              <PhaseBreakSpan>
                                <ImCross />
                              </PhaseBreakSpan>
                            ) : (
                              <PhasePassSpan>
                                <FaCheck />
                              </PhasePassSpan>
                            )}
                          </PlayerInfoWrapper>
                        </TableData>
                      </TableRow>
                      {phase.musics
                        ?.sort((a, b) => a.level - b.level)
                        .map((music) => {
                          const score: IScore | undefined = phase.scores?.find(
                            (s: IScore) =>
                              s.player.player_id === player.player_id &&
                              s.music.music_id === music.music_id
                          );
                          return (
                            <TableRow
                              key={`player-${player.player_id}-music-${music.music_id}`}
                            >
                              <TableData>
                                <SmallScreenTableDataWrapper>
                                  <MusicWrapper>
                                    {music.name.length > 10
                                      ? `${music.name.substring(0, 10)}...`
                                      : music.name}
                                    <MusicLevelMiniature
                                      src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
                                    />
                                  </MusicWrapper>

                                  <TableDataButtonWrapper>
                                    {/* <Button
                                      vanilla={false}
                                      onClick={() =>
                                        openScoreCreateModal(music.music_id)
                                      }
                                    >
                                      <TiUploadOutline />
                                    </Button>
                                    <Modal
                                      isOpen={isScoreCreateModalOpen(
                                        music.music_id
                                      )}
                                      onClose={() =>
                                        closeScoreCreateModal(music.music_id)
                                      }
                                    >
                                      <ScoreCreateForm
                                        category={categoryData}
                                        phase={phase}
                                        music={music}
                                      />
                                    </Modal> */}
                                  </TableDataButtonWrapper>
                                </SmallScreenTableDataWrapper>
                              </TableData>
                              <TableData>
                                <SmallScreenTableDataWrapper>
                                  {score ? (
                                    <TableScoreDataWrapper>
                                    <ScoreGradeWrapper>
                                      <ScoreGrade
                                        src={getGradeImageFileName(score)}
                                      />
                                    </ScoreGradeWrapper>
                                    <TableScoreValue
                                      onClick={() =>
                                        openScoreDetailsModal(score.score_id)
                                      }
                                    >
                                      {score.value.toLocaleString()}
                                    </TableScoreValue>
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
                                  </TableScoreDataWrapper>
                                  ) : (
                                    "-"
                                  )}
                                </SmallScreenTableDataWrapper>
                              </TableData>
                            </TableRow>
                          );
                        })}
                      <TableRow>
                        <TableData>
                          <SmallScreenTableDataWrapper>
                            Total
                          </SmallScreenTableDataWrapper>
                        </TableData>
                        <TableData>
                          <SmallScreenTableDataWrapper>
                            {phase.scores
                              ?.filter(
                                (score: IScore) =>
                                  score.player.player_id === player.player_id
                              )
                              .reduce((acc, curr) => acc + curr.value, 0).toLocaleString() ||
                              "-"}
                          </SmallScreenTableDataWrapper>
                        </TableData>
                      </TableRow>
                    </tbody>
                  </Table>
                ))}
            </TableWrapper>
          ))}
      </SmallScreenTableDisplay>

      <LargeScreenTableDisplay>
        {categoryData &&
          sortedPhases?.map((phase: IPhase) => (
            <TableWrapper key={`phase-${phase.phase_number}`}>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>
                      <TableHeaderWrapper>
                        <PhaseTitleWrapper>
                          Fase{" "}
                          {phase.phase_number === categoryData.number_of_phases
                            ? "Final"
                            : phase.phase_number}
                          <PhaseHeaderPassSpan>
                            {"passam " + phase.passing_players}
                          </PhaseHeaderPassSpan>
                        </PhaseTitleWrapper>
                      </TableHeaderWrapper>
                    </TableHeader>
                  </tr>
                </thead>
              </Table>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Jogador</TableHeader>
                    {phase.musics?.map((music) => (
                      <TableHeader key={`music-${music.music_id}`}>
                        <TableHeaderWrapper>
                          <MusicWrapper>
                            {music.name.length > 16
                              ? `${music.name.substring(0, 16)}...`
                              : music.name}
                            <MusicLevelMiniature
                              src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
                            />
                          </MusicWrapper>
                          <div>
                            {/* <Button
                              vanilla={false}
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
                              <ScoreCreateForm
                                category={categoryData}
                                phase={phase}
                                music={music}
                              />
                            </Modal> */}
                          </div>
                        </TableHeaderWrapper>
                      </TableHeader>
                    ))}
                    <TableHeader>Total</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {categoryData?.players
                    ?.sort((a, b) => {
                      // Calculate total scores for each player in the current phase
                      const totalScoreA = phase.scores
                        ?.filter(
                          (score) => score.player.player_id === a.player_id
                        )
                        .reduce((acc, curr) => acc + curr.value, 0);

                      const totalScoreB = phase.scores
                        ?.filter(
                          (score) => score.player.player_id === b.player_id
                        )
                        .reduce((acc, curr) => acc + curr.value, 0);

                      // Sort players based on total score value
                      if (!totalScoreA && !totalScoreB) {
                        return a.nickname.localeCompare(b.nickname); // Sort alphabetically
                      } else if (!totalScoreA) {
                        return 1; // Move player without scores to the end
                      } else if (!totalScoreB) {
                        return -1; // Move player without scores to the end
                      } else {
                        return totalScoreB - totalScoreA; // Sort by score descending
                      }
                    })
                    .map((player, index) => (
                      <TableRow key={`player-${player.player_id}`}>
                        <TableData
                          style={
                            index + 1 > phase.passing_players
                              ? {
                                  background: `linear-gradient(90deg, rgba(31,31,31,0.3085609243697479) 20%, rgba(211, 32, 32, 0.519) 100%)`,
                                }
                              : {
                                  background: `linear-gradient(90deg, rgba(31,31,31,0.3085609243697479) 20%, rgba(51,213,34,0.5186449579831933) 100%)`,
                                }
                          }
                        >
                          <PlayerInfoWrapper>
                            <PlayerMiniature
                              src={
                                player.profilePicture ||
                                "/img/default_player.png"
                              }
                              alt={player.nickname}
                            />
                            {"#" + (index + 1) + " "}
                            {player.nickname}
                            {index + 1 > phase.passing_players ? (
                              <PhaseBreakSpan>
                                <ImCross />
                              </PhaseBreakSpan>
                            ) : (
                              <PhasePassSpan>
                                <FaCheck />
                              </PhasePassSpan>
                            )}
                          </PlayerInfoWrapper>
                        </TableData>
                        {phase.musics
                          ?.sort((a, b) => a.level - b.level)
                          .map((music) => {
                            const score: IScore | undefined =
                              phase.scores?.find(
                                (s: IScore) =>
                                  s.player.player_id === player.player_id &&
                                  s.music.music_id === music.music_id
                              );
                            return (
                              <TableData
                                key={`score-${player.player_id}-${music.music_id}`}
                              >
                                {score ? (
                                  <TableScoreDataWrapper>
                                  <ScoreGradeWrapper>
                                    <ScoreGrade
                                      src={getGradeImageFileName(score)}
                                    />
                                  </ScoreGradeWrapper>
                                  <TableScoreValue
                                    onClick={() =>
                                      openScoreDetailsModal(score.score_id)
                                    }
                                  >
                                    {score.value.toLocaleString()}
                                  </TableScoreValue>
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
                                </TableScoreDataWrapper>
                                ) : (
                                  "-"
                                )}
                              </TableData>
                            );
                          })}
                        <TableData>
                          {/* Calculate total score for this phase */}
                          {phase.scores
                            ?.filter(
                              (score: IScore) =>
                                score.player.player_id === player.player_id
                            )
                            .reduce((acc, curr) => acc + curr.value, 0)
                            .toLocaleString() || "-"}
                        </TableData>
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

export default PublicDashboardCategory;
