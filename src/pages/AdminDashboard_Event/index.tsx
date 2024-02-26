import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../providers/Event";
import { useEvents } from "../../providers/Events";
import {
  GlobalContainer,
  PlayerMiniature,
} from "../../styles/global";
import {
  AdminDashboardEventContainer,
  CategoryTable,
  TableHeaderWrapper,
  EventTitle,
  Table,
  TableDataWrapper,
} from "./styles";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import UpdateButton from "../../components/Button_Update";
import useModal from "../../providers/Modal";
import EventUpdateForm from "../../components/Forms/EventUpdate";
import CategoryCreateForm from "../../components/Forms/CategoryCreate";

interface AdminDashboardEventProps {}

const AdminDashboardEvent: FunctionComponent<AdminDashboardEventProps> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const { eventData, getEventData } = useEvent();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  const { joinEvent } = useEvents();

  const {
    isOpen: isOpenEventUpdate,
    openModal: openEventUpdateModal,
    closeModal: closeEventUpdateModal,
  } = useModal();

  const {
    isOpen: isOpenCategoryCreate,
    openModal: openCategoryCreateModal,
    closeModal: closeCategoryCreateModal,
  } = useModal();

  return (
    <GlobalContainer>
      <AdminDashboardEventContainer>
        <Link to={"/admin/events"}>
          <Button vanilla={true}>Voltar</Button>
        </Link>

        <EventTitle>{!!eventData && eventData.name}</EventTitle>

        <Button vanilla={true} onClick={() => joinEvent(Number(event_id))}>
          Participar
        </Button>
        <UpdateButton onClick={openEventUpdateModal}>
          Editar Evento
        </UpdateButton>

        <Modal isOpen={isOpenEventUpdate} onClose={closeEventUpdateModal}>
          <EventUpdateForm event={eventData}/>
        </Modal>

        <Modal isOpen={isOpenCategoryCreate} onClose={closeCategoryCreateModal}>
          <CategoryCreateForm event={eventData}/>
        </Modal>

        <Table>
          <thead>
            <tr>
              <TableHeaderWrapper>
                <h4>Participantes</h4>
                <UpdateButton>+</UpdateButton>
              </TableHeaderWrapper>
            </tr>
          </thead>
          <tbody>
            {!!eventData &&
              eventData.players?.map((p) => (
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

        <CategoryTable>
          <thead>
            <tr>
              <TableHeaderWrapper>
                <h4>Categorias</h4>
                <UpdateButton onClick={openCategoryCreateModal}>+</UpdateButton>
              </TableHeaderWrapper>
            </tr>
          </thead>
          <tbody>
            {!!eventData &&
              eventData.categories?.map((c) => (
                <tr
                  key={c.category_id}
                  onClick={() => navigate(`categories/${c.category_id}`)}
                >
                  <td>{c.name}</td>
                </tr>
              ))}
          </tbody>
        </CategoryTable>
      </AdminDashboardEventContainer>
    </GlobalContainer>
  );
};

export default AdminDashboardEvent;
