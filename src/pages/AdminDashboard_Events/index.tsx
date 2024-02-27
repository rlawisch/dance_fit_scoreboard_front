import { FunctionComponent, useEffect } from "react";
import { GlobalContainer } from "../../styles/global";
import { useEvents } from "../../providers/Events";
import AdminEventCard from "../../components/AdminEventCard";
import Button from "../../components/Button";
import useModal from "../../providers/Modal";
import Modal from "../../components/Modal";
import EventCreateForm from "../../components/Forms/EventCreate";

interface AdminDashboardEventsProps {}

const AdminDashboardEvents: FunctionComponent<
  AdminDashboardEventsProps
> = () => {
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
  }, []);

  const {
    isOpen: isOpenEventCreateModal,
    openModal: openEventCreateModal,
    closeModal: closeEventCreateModal
  } = useModal()

  return (
    <GlobalContainer>
      <h3>Eventos</h3>

      <Button onClick={openEventCreateModal}>
        Criar Evento
      </Button>
      <Modal isOpen={isOpenEventCreateModal} onClose={closeEventCreateModal}>
        <EventCreateForm />
      </Modal>

      {events.map((ev) => {
        return <AdminEventCard key={ev.event_id} eventData={ev} />;
      })}
    </GlobalContainer>
  );
};

export default AdminDashboardEvents;
