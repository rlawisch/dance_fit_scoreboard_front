import { FunctionComponent } from "react";
import { IEvent } from "../../../types/entity-types";
import { DeleteWarning, GlobalContainer } from "../../../styles/global";
import DeleteButton from "../../Button_Delete";
import { useEvents } from "../../../providers/Events";

interface EventDeleteFormProps {
  event: IEvent;
}

const EventDeleteForm: FunctionComponent<EventDeleteFormProps> = ({
  event,
}) => {
  const { deleteEvent } = useEvents();

  return (
    <GlobalContainer>
      <p>Você tem certeza que deseja deletar o evento:</p>
      <h3>{event.name}</h3>

      <DeleteWarning>
        Todas as Categorias, Fases e Scores relacionadas a este evento serão
        deletadas! Pense bem antes de fazer a deleção!
      </DeleteWarning>

      <DeleteButton
        vanilla={false}
        onClick={() => deleteEvent(Number(event.event_id))}
      >
        Deletar
      </DeleteButton>
    </GlobalContainer>
  );
};

export default EventDeleteForm;
