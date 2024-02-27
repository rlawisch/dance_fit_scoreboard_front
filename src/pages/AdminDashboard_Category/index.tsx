import { FunctionComponent, useEffect } from "react";
import {
  GlobalContainer,
  MusicLevelMiniature,
  PlayerMiniature,
} from "../../styles/global";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../providers/Category";
import {
  CategoryTitle,
  LargeScreenTableDisplay,
  PlayerInfoWrapper,
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
import { IPhase, IScore } from "../../types/entity-types";
import UpdateButton from "../../components/Button_Update";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan, FaUserPlus } from "react-icons/fa6";
import { TbMusicMinus, TbMusicPlus } from "react-icons/tb";
import DeleteButton from "../../components/Button_Delete";
import useModal from "../../providers/Modal";
import Modal from "../../components/Modal";
import PhaseCreateForm from "../../components/Forms/PhaseCreate";
import useDynamicModal from "../../providers/DynamicModal";
import PhaseUpdateForm from "../../components/Forms/PhaseUpdate";
import { MusicWrapper } from "../AdminDashboard_Musics/styles";
import CategoryUpdateForm from "../../components/Forms/CategoryUpdate";

interface AdminDashboardCategoryProps {}

const AdminDashboardCategory: FunctionComponent<
  AdminDashboardCategoryProps
> = () => {
  const navigate = useNavigate();

  const { event_id, category_id } = useParams();

  const { categoryData, getCategoryData, joinCategory } = useCategory();

  useEffect(() => {
    getCategoryData(Number(category_id));
  }, []);

  const {
    isOpen: isOpenCategoryUpdate,
    openModal: openCategoryUpdateModal,
    closeModal: closeCategoryUpdateModal,
  } = useModal();

  const sortedPhases = categoryData?.phases?.sort(
    (a, b) => a.phase_number - b.phase_number
  );

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

  return (
    <GlobalContainer>
      <Button onClick={() => navigate(`/admin/events/${event_id}`)}>
        Voltar
      </Button>

      <CategoryTitle>{categoryData?.name}</CategoryTitle>

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

      {/* TODO: Button -> update Phase */}
      {/* TODO: Button -> add Music to Phase */}
      {/* TODO: Button -> remove Music to Phase */}

      {categoryData && (
        <Table>
          <thead>
            <tr>
              <th>
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
              </th>
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
              <th>
                Participantes
                <UpdateButton>
                  <FaUserPlus />
                </UpdateButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!categoryData &&
              categoryData.players.map((p) => (
                <tr key={p.player_id}>
                  <td>
                    <TableDataWrapper>
                      <PlayerMiniature
                        src={
                          p.profilePicture
                            ? p.profilePicture
                            : "/img/default_player.png"
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
      )}

      <SmallScreenTableDisplay>
        {categoryData && sortedPhases?.map((phase: IPhase) => (
          <ResponsiveTableWrapper key={`phase-${phase.phase_number}`}>
            <Table>
              <thead>
                <tr>
                  <th>
                    Fase {phase.phase_number}
                    <UpdateButton
                      onClick={() => openPhaseUpdateModal(phase.phase_number)}
                    >
                      <FaEdit />
                    </UpdateButton>
                    <Modal
                      isOpen={isPhaseUpdateModalOpen(phase.phase_number)}
                      onClose={() => closePhaseUpdateModal(phase.phase_number)}
                    >
                      <PhaseUpdateForm phase={phase} category={categoryData} />
                    </Modal>
                    <UpdateButton>
                      <TbMusicPlus />
                    </UpdateButton>
                    <DeleteButton>
                      <FaRegTrashCan />
                    </DeleteButton>
                  </th>
                </tr>
              </thead>
            </Table>
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
                            player.profilePicture || "/img/default_player.png"
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
                        <ResponsiveTableCell>
                          <MusicWrapper>
                            {music.name}
                            <MusicLevelMiniature
                              src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
                            />
                            <DeleteButton>
                              <TbMusicMinus />
                            </DeleteButton>
                          </MusicWrapper>
                        </ResponsiveTableCell>
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
        {categoryData && sortedPhases?.map((phase: IPhase) => (
          <TableWrapper key={`phase-${phase.phase_number}`}>
            <Table>
              <thead>
                <tr>
                  <th>
                    Fase {phase.phase_number}
                    <UpdateButton
                      onClick={() => openPhaseUpdateModal(phase.phase_number)}
                    >
                      <FaEdit />
                    </UpdateButton>
                    <Modal
                      isOpen={isPhaseUpdateModalOpen(phase.phase_number)}
                      onClose={() => closePhaseUpdateModal(phase.phase_number)}
                    >
                      <PhaseUpdateForm phase={phase} category={categoryData} />
                    </Modal>
                    <UpdateButton>
                      <TbMusicPlus />
                    </UpdateButton>
                    <DeleteButton>
                      <FaRegTrashCan />
                    </DeleteButton>
                  </th>
                </tr>
              </thead>
            </Table>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Jogador</TableHeader>
                  {phase.musics?.map((music) => (
                    <TableHeader key={`music-${music.music_id}`}>
                      <MusicWrapper>
                        {music.name}
                        <MusicLevelMiniature
                          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
                        />
                        <DeleteButton>
                          <TbMusicMinus />
                        </DeleteButton>
                      </MusicWrapper>
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
                            player.profilePicture || "/img/default_player.png"
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
