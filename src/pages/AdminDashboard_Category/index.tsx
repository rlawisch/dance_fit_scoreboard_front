import { FunctionComponent, useEffect } from "react";
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
  TableHeader,
  TableHeaderWrapper,
  TableRow,
  TableScoreDataWrapper,
  TableScoreValue,
  TableWrapper,
  Title,
} from "../../styles/global";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../providers/Category";
import { IPhase, IScore } from "../../types/entity-types";
import UpdateButton from "../../components/Button_Update";
import { FaEdit } from "react-icons/fa";
import {
  FaCheck,
  FaRegTrashCan,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa6";
import { TbMusicMinus, TbMusicPlus } from "react-icons/tb";
import DeleteButton from "../../components/Button_Delete";
import useModal from "../../providers/Modal";
import Modal from "../../components/Modal";
import PhaseCreateForm from "../../components/Forms/PhaseCreate";
import useDynamicModal from "../../providers/DynamicModal";
import PhaseUpdateForm from "../../components/Forms/PhaseUpdate";
import CategoryUpdateForm from "../../components/Forms/CategoryUpdate";
import PhaseAddMusicForm from "../../components/Forms/PhaseAddMusic";
import PhaseRemoveMusicForm from "../../components/Forms/PhaseRemoveMusic";
import { TiUploadOutline } from "react-icons/ti";
import ScoreCard from "../../components/ScoreCard";
import ScoreCreateByAdmForm from "../../components/Forms/ScoreCreateByAdmin";
import PhaseDeleteForm from "../../components/Forms/PhaseDelete";
import CategoryAdmAddPlayerForm from "../../components/Forms/CategoryAdmAddPlayer";
import { useEvents } from "../../providers/Events";
import CategoryAdmRemovePlayerForm from "../../components/Forms/CategoryAdmRemovePlayer";
import ScoreUpdateForm from "../../components/Forms/ScoreUpdate";
import ScoreDeleteForm from "../../components/Forms/ScoreDelete";
import { ImCross } from "react-icons/im";
import {
  ScoreGrade,
  ScoreGradeWrapper,
} from "../../components/ScoreCard/styles";
import { getGradeImageFileName } from "../../utils/getGradeImageFileName";

interface AdminDashboardCategoryProps {}

const AdminDashboardCategory: FunctionComponent<
  AdminDashboardCategoryProps
> = () => {
  const navigate = useNavigate();

  const { event_id, category_id } = useParams();

  const {
    categoryData,
    getCategoryData,
    joinCategory,
    categoryRefreshTrigger,
  } = useCategory();

  const { eventData, getEventData } = useEvents();

  useEffect(() => {
    getCategoryData(Number(category_id));
    getEventData(Number(event_id));
  }, [categoryRefreshTrigger]);

  const sortedPhases = categoryData?.phases?.sort(
    (a, b) => a.phase_number - b.phase_number,
  );

  const {
    isOpen: isOpenCategoryUpdate,
    openModal: openCategoryUpdateModal,
    closeModal: closeCategoryUpdateModal,
  } = useModal();

  const {
    isOpen: isOpenCategoryAdmAddPlayer,
    openModal: openCategoryAdmAddPlayerModal,
    closeModal: closeCategoryAdmAddPlayerModal,
  } = useModal();

  const {
    isModalOpen: isCategoryAdmRemovePlayerModalOpen,
    openModal: openCategoryAdmRemovePlayerModal,
    closeModal: closeCategoryAdmRemovePlayerModal,
  } = useDynamicModal();

  const {
    isOpen: isOpenPhaseCreate,
    openModal: openPhaseCreateModal,
    closeModal: closePhaseCreateModal,
  } = useModal();

  const {
    isModalOpen: isPhaseUpdateModalOpen,
    openModal: openPhaseUpdateModal,
    closeModal: closePhaseUpdateModal,
  } = useDynamicModal();

  const {
    isModalOpen: isPhaseAddMusicModalOpen,
    openModal: openPhaseAddMusicModal,
    closeModal: closePhaseAddMusicModal,
  } = useDynamicModal();

  const {
    isModalOpen: isPhaseRemoveMusicModalOpen,
    openModal: openPhaseRemoveMusicModal,
    closeModal: closePhaseRemoveMusicModal,
  } = useDynamicModal();

  const {
    isModalOpen: isPhaseDeleteModalOpen,
    openModal: openPhaseDeleteModal,
    closeModal: closePhaseDeleteModal,
  } = useDynamicModal();

  const {
    isModalOpen: isAdmScoreCreateModalOpen,
    openModal: openAdmScoreCreateModal,
    closeModal: closeAdmScoreCreateModal,
  } = useDynamicModal();

  const {
    isModalOpen: isScoreUpdateModalOpen,
    openModal: openScoreUpdateModal,
    closeModal: closeScoreUpdateModal,
  } = useDynamicModal();

  const {
    isModalOpen: isScoreDeleteModalOpen,
    openModal: openScoreDeleteModal,
    closeModal: closeScoreDeleteModal,
  } = useDynamicModal();

  const {
    isModalOpen: isScoreDetailsModalOpen,
    openModal: openScoreDetailsModal,
    closeModal: closeScoreDetailsModal,
  } = useDynamicModal();

  return (
    <GlobalContainer>
      <Button onClick={() => navigate(`/admin/events/${event_id}`)}>
        Voltar
      </Button>

      <Title>{categoryData?.name}</Title>

      <Button onClick={() => joinCategory(Number(categoryData?.category_id))}>
        Participar
      </Button>

      {categoryData && (
        <>
          <UpdateButton onClick={openPhaseCreateModal}>Criar Fase</UpdateButton>
          <Modal isOpen={isOpenPhaseCreate} onClose={closePhaseCreateModal}>
            <PhaseCreateForm category={categoryData} />
          </Modal>
        </>
      )}

      {categoryData && (
        <Table>
          <thead>
            <tr>
              <TableHeader>
                <TableHeaderWrapper>
                  Informações
                  <UpdateButton onClick={openCategoryUpdateModal}>
                    <FaEdit />
                  </UpdateButton>
                  <Modal
                    isOpen={isOpenCategoryUpdate}
                    onClose={closeCategoryUpdateModal}
                  >
                    <CategoryUpdateForm category={categoryData} />
                  </Modal>
                </TableHeaderWrapper>
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

      {!!eventData && !!categoryData && categoryData?.players && (
        <Table>
          <thead>
            <tr>
              <TableHeader>
                <TableHeaderWrapper>
                  Participantes
                  <UpdateButton onClick={openCategoryAdmAddPlayerModal}>
                    <FaUserPlus />
                  </UpdateButton>
                  <Modal
                    isOpen={isOpenCategoryAdmAddPlayer}
                    onClose={closeCategoryAdmAddPlayerModal}
                  >
                    <CategoryAdmAddPlayerForm
                      category={categoryData}
                      eventPlayers={eventData.players}
                    />
                  </Modal>
                </TableHeaderWrapper>
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
                      <DeleteButton
                        onClick={() =>
                          openCategoryAdmRemovePlayerModal(p.player_id)
                        }
                      >
                        <FaUserMinus />
                      </DeleteButton>
                      <Modal
                        isOpen={isCategoryAdmRemovePlayerModalOpen(p.player_id)}
                        onClose={() =>
                          closeCategoryAdmRemovePlayerModal(p.player_id)
                        }
                      >
                        <CategoryAdmRemovePlayerForm
                          player={p}
                          category={categoryData}
                        />
                      </Modal>
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
                        <div>
                          <UpdateButton
                            onClick={() =>
                              openPhaseUpdateModal(phase.phase_number)
                            }
                          >
                            <FaEdit />
                          </UpdateButton>
                          <Modal
                            isOpen={isPhaseUpdateModalOpen(phase.phase_number)}
                            onClose={() =>
                              closePhaseUpdateModal(phase.phase_number)
                            }
                          >
                            <PhaseUpdateForm
                              phase={phase}
                              category={categoryData}
                            />
                          </Modal>
                          <UpdateButton
                            onClick={() =>
                              openPhaseAddMusicModal(phase.phase_number)
                            }
                          >
                            <TbMusicPlus />
                          </UpdateButton>
                          <Modal
                            isOpen={isPhaseAddMusicModalOpen(
                              phase.phase_number,
                            )}
                            onClose={() =>
                              closePhaseAddMusicModal(phase.phase_number)
                            }
                          >
                            <PhaseAddMusicForm
                              phase={phase}
                              category={categoryData}
                            />
                          </Modal>
                          <DeleteButton
                            onClick={() =>
                              openPhaseDeleteModal(phase.phase_number)
                            }
                          >
                            <FaRegTrashCan />
                          </DeleteButton>
                          <Modal
                            isOpen={isPhaseDeleteModalOpen(phase.phase_number)}
                            onClose={() =>
                              closePhaseDeleteModal(phase.phase_number)
                            }
                          >
                            <PhaseDeleteForm phase={phase} />
                          </Modal>
                        </div>
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
                              s.music.music_id === music.music_id,
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
                                    <UpdateButton
                                      vanilla={false}
                                      onClick={() =>
                                        openAdmScoreCreateModal(music.music_id)
                                      }
                                    >
                                      <TiUploadOutline />
                                    </UpdateButton>
                                    <Modal
                                      isOpen={isAdmScoreCreateModalOpen(
                                        music.music_id,
                                      )}
                                      onClose={() =>
                                        closeAdmScoreCreateModal(music.music_id)
                                      }
                                    >
                                      <ScoreCreateByAdmForm
                                        category={categoryData}
                                        phase={phase}
                                        music={music}
                                      />
                                    </Modal>
                                    <DeleteButton
                                      vanilla={false}
                                      onClick={() =>
                                        openPhaseRemoveMusicModal(
                                          music.music_id,
                                        )
                                      }
                                    >
                                      <TbMusicMinus />
                                    </DeleteButton>
                                    <Modal
                                      isOpen={isPhaseRemoveMusicModalOpen(
                                        music.music_id,
                                      )}
                                      onClose={() =>
                                        closePhaseRemoveMusicModal(
                                          music.music_id,
                                        )
                                      }
                                    >
                                      <PhaseRemoveMusicForm
                                        category={categoryData}
                                        phase={phase}
                                        music={music}
                                      />
                                    </Modal>
                                  </TableDataButtonWrapper>
                                </SmallScreenTableDataWrapper>
                              </TableData>
                              <TableData>
                                {score ? (
                                  <SmallScreenTableDataWrapper>
                                    {/* <ScoreCard score={score} /> */}
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
                                          score.score_id,
                                        )}
                                        onClose={() =>
                                          closeScoreDetailsModal(score.score_id)
                                        }
                                      >
                                        <ScoreCard score={score} />
                                      </Modal>
                                    </TableScoreDataWrapper>
                                    <TableDataButtonWrapper>
                                      <UpdateButton
                                        onClick={() => {
                                          openScoreUpdateModal(score.score_id);
                                        }}
                                      >
                                        <FaEdit />
                                      </UpdateButton>
                                      <Modal
                                        isOpen={isScoreUpdateModalOpen(
                                          score.score_id,
                                        )}
                                        onClose={() =>
                                          closeScoreUpdateModal(score.score_id)
                                        }
                                      >
                                        <ScoreUpdateForm
                                          score_id={Number(score.score_id)}
                                        />
                                      </Modal>
                                      <DeleteButton
                                        onClick={() =>
                                          openScoreDeleteModal(score.score_id)
                                        }
                                      >
                                        <FaRegTrashCan />
                                      </DeleteButton>
                                      <Modal
                                        isOpen={isScoreDeleteModalOpen(
                                          score.score_id,
                                        )}
                                        onClose={() =>
                                          closeScoreDeleteModal(score.score_id)
                                        }
                                      >
                                        <ScoreDeleteForm score={score} />
                                      </Modal>
                                    </TableDataButtonWrapper>
                                  </SmallScreenTableDataWrapper>
                                ) : (
                                  "-"
                                )}
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
                                  score.player.player_id === player.player_id,
                              )
                              .reduce((acc, curr) => acc + curr.value, 0)
                              .toLocaleString() || "-"}
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
                        <div>
                          <UpdateButton
                            onClick={() =>
                              openPhaseUpdateModal(phase.phase_number)
                            }
                          >
                            <FaEdit />
                          </UpdateButton>
                          <Modal
                            isOpen={isPhaseUpdateModalOpen(phase.phase_number)}
                            onClose={() =>
                              closePhaseUpdateModal(phase.phase_number)
                            }
                          >
                            <PhaseUpdateForm
                              phase={phase}
                              category={categoryData}
                            />
                          </Modal>
                          <UpdateButton
                            onClick={() =>
                              openPhaseAddMusicModal(phase.phase_number)
                            }
                          >
                            <TbMusicPlus />
                          </UpdateButton>
                          <Modal
                            isOpen={isPhaseAddMusicModalOpen(
                              phase.phase_number,
                            )}
                            onClose={() =>
                              closePhaseAddMusicModal(phase.phase_number)
                            }
                          >
                            <PhaseAddMusicForm
                              phase={phase}
                              category={categoryData}
                            />
                          </Modal>
                          {/* TODO: Phase DELETE Feat */}
                          <DeleteButton
                            onClick={() =>
                              openPhaseDeleteModal(phase.phase_number)
                            }
                          >
                            <FaRegTrashCan />
                          </DeleteButton>
                          <Modal
                            isOpen={isPhaseDeleteModalOpen(phase.phase_number)}
                            onClose={() =>
                              closePhaseDeleteModal(phase.phase_number)
                            }
                          >
                            <PhaseDeleteForm phase={phase} />
                          </Modal>
                        </div>
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
                            <UpdateButton
                              vanilla={false}
                              onClick={() =>
                                openAdmScoreCreateModal(music.music_id)
                              }
                            >
                              <TiUploadOutline />
                            </UpdateButton>
                            <Modal
                              isOpen={isAdmScoreCreateModalOpen(music.music_id)}
                              onClose={() =>
                                closeAdmScoreCreateModal(music.music_id)
                              }
                            >
                              <ScoreCreateByAdmForm
                                category={categoryData}
                                phase={phase}
                                music={music}
                              />
                            </Modal>
                            <DeleteButton
                              vanilla={false}
                              onClick={() =>
                                openPhaseRemoveMusicModal(music.music_id)
                              }
                            >
                              <TbMusicMinus />
                            </DeleteButton>
                            <Modal
                              isOpen={isPhaseRemoveMusicModalOpen(
                                music.music_id,
                              )}
                              onClose={() =>
                                closePhaseRemoveMusicModal(music.music_id)
                              }
                            >
                              <PhaseRemoveMusicForm
                                category={categoryData}
                                phase={phase}
                                music={music}
                              />
                            </Modal>
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
                          (score) => score.player.player_id === a.player_id,
                        )
                        .reduce((acc, curr) => acc + curr.value, 0);

                      const totalScoreB = phase.scores
                        ?.filter(
                          (score) => score.player.player_id === b.player_id,
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
                                  s.music.music_id === music.music_id,
                              );
                            return (
                              <TableData
                                key={`score-${player.player_id}-${music.music_id}`}
                              >
                                {score ? (
                                  <div>
                                    {/* <ScoreCard score={score} /> */}
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
                                          score.score_id,
                                        )}
                                        onClose={() =>
                                          closeScoreDetailsModal(score.score_id)
                                        }
                                      >
                                        <ScoreCard score={score} />
                                      </Modal>
                                    </TableScoreDataWrapper>

                                    <UpdateButton
                                      onClick={() => {
                                        openScoreUpdateModal(score.score_id);
                                      }}
                                    >
                                      <FaEdit />
                                    </UpdateButton>
                                    <Modal
                                      isOpen={isScoreUpdateModalOpen(
                                        score.score_id,
                                      )}
                                      onClose={() =>
                                        closeScoreUpdateModal(score.score_id)
                                      }
                                    >
                                      <ScoreUpdateForm
                                        score_id={Number(score.score_id)}
                                      />
                                    </Modal>
                                    <DeleteButton
                                      onClick={() =>
                                        openScoreDeleteModal(score.score_id)
                                      }
                                    >
                                      <FaRegTrashCan />
                                    </DeleteButton>
                                    <Modal
                                      isOpen={isScoreDeleteModalOpen(
                                        score.score_id,
                                      )}
                                      onClose={() =>
                                        closeScoreDeleteModal(score.score_id)
                                      }
                                    >
                                      <ScoreDeleteForm score={score} />
                                    </Modal>
                                  </div>
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
                                score.player.player_id === player.player_id,
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

export default AdminDashboardCategory;
