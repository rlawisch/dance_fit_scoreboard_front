import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../providers/Event";
import { useEvents } from "../../providers/Events";
import { GlobalContainer, PlayerMiniature } from "../../styles/global";
import {
  AdminDashboardEventContainer,
  CategoryTable,
  CategoryTableHeaderWrapper,
  EventTitle,
  EventTitleWrapper,
  EventTopButtonWrapper,
  Table,
  TableDataWrapper,
} from "./styles";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUpdateEventFormData } from "../../types/form-types";
import Input from "../../components/Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import UpdateButton from "../../components/Button_Update";
import useModal from "../../providers/Modal";

interface AdminDashboardEventProps {}

const AdminDashboardEvent: FunctionComponent<AdminDashboardEventProps> = () => {
  const { event_id } = useParams();

  const { eventData, getEventData, updateEventData } = useEvent();

  const navigate = useNavigate();

  const {
    isOpen: isOpenEventUpdate,
    openModal: openEventUpdateModal,
    closeModal: closeEventUpdateModal,
  } = useModal();

  const { joinEvent } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  const updateEventFormSchema = yup.object().shape({
    name: yup.string().required("Preencha este campo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateEventFormSchema),
  });

  const onUpdateEventFormSubmit = (formData: IUpdateEventFormData) => {
    updateEventData(Number(event_id), formData);
  };

  // TODO: Modal > Form to add Categories to the Event

  // TODO: Each Categorie will render a button to delete with confirmation modal

  return (
    <GlobalContainer>
      <AdminDashboardEventContainer>
        <EventTopButtonWrapper>
          <Link to={"/admin/events"}>
            <Button vanilla={true}>Voltar</Button>
          </Link>

          <Button vanilla={true} onClick={() => joinEvent(Number(event_id))}>
            Participar
          </Button>
        </EventTopButtonWrapper>

        <EventTitleWrapper>
          <EventTitle>{!!eventData && eventData.name}</EventTitle>

          <UpdateButton onClick={openEventUpdateModal}>
            Editar Evento
          </UpdateButton>
          <Modal isOpen={isOpenEventUpdate} onClose={closeEventUpdateModal}>
            <GlobalContainer>
              Alterar informações do Evento: {eventData?.name}
              <form
                id="update_event_form"
                onSubmit={handleSubmit(onUpdateEventFormSubmit)}
              >
                <Input
                  label="Nome"
                  icon={MdDriveFileRenameOutline}
                  name="name"
                  register={register}
                  error={errors.name?.message}
                />

                <UpdateButton
                  vanilla={false}
                  type="submit"
                  form="update_event_form"
                >
                  Atualizar
                </UpdateButton>
              </form>
            </GlobalContainer>
          </Modal>
        </EventTitleWrapper>

        <Table>
          <thead>
            <tr>
              <th>Participantes</th>
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

        <CategoryTable>
          <thead>
            <tr>
              <CategoryTableHeaderWrapper>
                Categorias
                <UpdateButton vanilla={false}>+</UpdateButton>
              </CategoryTableHeaderWrapper>
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
