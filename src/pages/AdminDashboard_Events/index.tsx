import { FunctionComponent, useEffect } from "react";
import { GlobalContainer, Table } from "../../styles/global";
import { useEvents } from "../../providers/Events";
import Button from "../../components/Button";
import useModal from "../../providers/Modal";
import Modal from "../../components/Modal";
import EventCreateForm from "../../components/Forms/EventCreate";
import useDynamicModal from "../../providers/DynamicModal";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import DeleteButton from "../../components/Button_Delete";
import { FaRegTrashCan } from "react-icons/fa6";
import EventDeleteForm from "../../components/Forms/EventDelete";

interface AdminDashboardEventsProps {}

const AdminDashboardEvents: FunctionComponent<
  AdminDashboardEventsProps
> = () => {
  const { events, getEvents, eventRefreshTrigger } = useEvents();

  const navigate = useNavigate();

  useEffect(() => {
    getEvents();
  }, [eventRefreshTrigger]);

  const {
    isOpen: isOpenEventCreateModal,
    openModal: openEventCreateModal,
    closeModal: closeEventCreateModal,
  } = useModal();

  const {
    isModalOpen: isEventDeleteModalOpen,
    openModal: openEventDeleteModal,
    closeModal: closeEventDeleteModal,
  } = useDynamicModal();

  return (
    <GlobalContainer>

      <Button onClick={openEventCreateModal}>Criar Evento</Button>
      <Modal isOpen={isOpenEventCreateModal} onClose={closeEventCreateModal}>
        <EventCreateForm />
      </Modal>

      {events && (
        <Table>
          <thead>
            <tr>
              <th>
                <h4>Eventos</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>
                  {event.name}
                  <Button onClick={() => navigate(`/admin/events/${event.event_id}`)}>
                    <AiOutlineArrowRight />
                  </Button>
                  <DeleteButton
                    onClick={() =>
                      openEventDeleteModal(event.event_id)
                    }
                  >
                    <FaRegTrashCan />
                  </DeleteButton>
                  <Modal
                    isOpen={isEventDeleteModalOpen(event.event_id)}
                    onClose={() =>
                      closeEventDeleteModal(event.event_id)
                    }
                  >
                    <EventDeleteForm event={event}/>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </GlobalContainer>
  );
};

export default AdminDashboardEvents;
