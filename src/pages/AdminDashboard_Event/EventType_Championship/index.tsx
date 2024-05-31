import { FunctionComponent, useEffect } from "react";
import { GlobalContainer, PlayerInfoWrapper, PlayerMiniature, Table, TableDataWrapper, TableHeader, TableHeaderWrapper, Title } from "../../../styles/global";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import useModal from "../../../providers/Modal";
import useDynamicModal from "../../../providers/DynamicModal";
import UpdateButton from "../../../components/Button_Update";
import DeleteButton from "../../../components/Button_Delete";
import Modal from "../../../components/Modal";
import EventUpdateForm from "../../../components/Forms/EventUpdate";
import CategoryCreateForm from "../../../components/Forms/CategoryCreate";
import { FaRegTrashCan, FaUserPlus } from "react-icons/fa6";
import EventAdmAddPlayerForm from "../../../components/Forms/EventAdmAddPlayer";
import { AiOutlineArrowRight } from "react-icons/ai";
import CategoryDeleteForm from "../../../components/Forms/CategoryDelete";

interface AdminEventType_ChampionshipProps {}

const AdminEventType_Championship: FunctionComponent<
  AdminEventType_ChampionshipProps
> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const {
    eventData,
    getEventData,
    joinEvent,
    leaveEvent,
    eventRefreshTrigger,
  } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  useEffect(() => {
    getEventData(Number(event_id));
  }, [eventRefreshTrigger]);

  const {
    isOpen: isOpenEventUpdate,
    openModal: openEventUpdateModal,
    closeModal: closeEventUpdateModal,
  } = useModal();

  const {
    isOpen: isOpenAdmAddPlayer,
    openModal: openAdmAddPlayerModal,
    closeModal: closeAdmAddPlayerModal,
  } = useModal();

  const {
    isOpen: isOpenCategoryCreate,
    openModal: openCategoryCreateModal,
    closeModal: closeCategoryCreateModal,
  } = useModal();

  const {
    isModalOpen: isCategoryDeleteModalOpen,
    openModal: openCategoryDeleteModal,
    closeModal: closeCategoryDeleteModal,
  } = useDynamicModal();

  return (
    <GlobalContainer>
      <Button onClick={() => navigate("/admin/events")}>Voltar</Button>

      <Title>{!!eventData && eventData.name}</Title>

      <Button vanilla={true} onClick={() => joinEvent(Number(event_id))}>
        Participar
      </Button>
      <UpdateButton onClick={openEventUpdateModal}>Editar Evento</UpdateButton>

      <DeleteButton onClick={() => leaveEvent(Number(event_id))}>
        Deixar Evento
      </DeleteButton>

      <Modal isOpen={isOpenEventUpdate} onClose={closeEventUpdateModal}>
        <EventUpdateForm event={eventData} />
      </Modal>

      <Modal isOpen={isOpenCategoryCreate} onClose={closeCategoryCreateModal}>
        <CategoryCreateForm event={eventData} />
      </Modal>

      <Table>
        <thead>
          <tr>
            <TableHeader>
              <TableHeaderWrapper>
                <h4>Participantes</h4>
                {!!eventData && (
                  <div>
                    <UpdateButton onClick={openAdmAddPlayerModal}>
                      <FaUserPlus />
                    </UpdateButton>
                    <Modal
                      isOpen={isOpenAdmAddPlayer}
                      onClose={closeAdmAddPlayerModal}
                    >
                      <EventAdmAddPlayerForm
                        event_id={Number(eventData.event_id)}
                      />
                    </Modal>
                  </div>
                )}
              </TableHeaderWrapper>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {!!eventData &&
            eventData.players?.map((p) => (
              <tr key={p.player_id}>
                <td>
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
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Table>
        <thead>
          <tr>
            <TableHeader>
              <TableHeaderWrapper>
                <h4>Categorias</h4>
                <UpdateButton onClick={openCategoryCreateModal}>+</UpdateButton>
              </TableHeaderWrapper>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {!!eventData &&
            eventData.categories
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <tr key={category.category_id}>
                  <td>
                    <TableDataWrapper>
                      {category.name}

                      <div>
                        <Button
                          onClick={() =>
                            navigate(
                              `/admin/events/${event_id}/categories/${category.category_id}`
                            )
                          }
                        >
                          <AiOutlineArrowRight />
                        </Button>
                        <DeleteButton
                          onClick={() =>
                            openCategoryDeleteModal(category.category_id)
                          }
                        >
                          <FaRegTrashCan />
                        </DeleteButton>
                        <Modal
                          isOpen={isCategoryDeleteModalOpen(
                            category.category_id
                          )}
                          onClose={() =>
                            closeCategoryDeleteModal(category.category_id)
                          }
                        >
                          <CategoryDeleteForm category={category} />
                        </Modal>
                      </div>
                    </TableDataWrapper>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </GlobalContainer>
  );
};

export default AdminEventType_Championship;
