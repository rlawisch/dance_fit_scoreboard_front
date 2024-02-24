import { yupResolver } from "@hookform/resolvers/yup";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { IUpdateEventFormData } from "../../../types/form-types";
import { useEvent } from "../../../providers/Event";
import { FormWrapper, GlobalContainer } from "../../../styles/global";
import Input from "../../Input";
import UpdateButton from "../../Button_Update";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IEvent } from "../../../types/entity-types";

interface EventUpdateFormProps {
    event: IEvent | undefined
}
 
const EventUpdateForm: FunctionComponent<EventUpdateFormProps> = ({ event }) => {

    const { updateEventData } = useEvent()

    const updateEventFormSchema = yup.object().shape({
        name: yup.string().required("Preencha este campo"),
      });

      const {
        register: registerUpdateEvent,
        handleSubmit: handleSubmitUpdateEvent,
        formState: { errors: updateEventErrors },
      } = useForm({
        resolver: yupResolver(updateEventFormSchema),
      });

      const onUpdateEventFormSubmit = (formData: IUpdateEventFormData) => {
        updateEventData(Number(event?.event_id), formData);
      };
    return ( 
        <GlobalContainer>
            <p>Alterar informações do Evento: {event?.name}</p>
            <FormWrapper
              id="update_event_form"
              onSubmit={handleSubmitUpdateEvent(onUpdateEventFormSubmit)}
            >
              <Input
                label="Nome"
                icon={MdDriveFileRenameOutline}
                name="name"
                register={registerUpdateEvent}
                error={updateEventErrors.name?.message}
              />

              <UpdateButton
                vanilla={false}
                type="submit"
                form="update_event_form"
              >
                Atualizar
              </UpdateButton>
            </FormWrapper>
          </GlobalContainer>
     );
}
 
export default EventUpdateForm;