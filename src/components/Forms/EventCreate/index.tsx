import { FunctionComponent } from "react";
import { FormWrapper, GlobalContainer } from "../../../styles/global";
import * as yup from "yup";
import { useEvents } from "../../../providers/Events";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IEventCreate } from "../../../types/form-types";
import Input from "../../Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../Button";

interface EventCreateFormProps {}

const EventCreateForm: FunctionComponent<EventCreateFormProps> = () => {
  const { createEvent } = useEvents();

  const createEventFormSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const {
    register: registerCreateEvent,
    handleSubmit: handleSubmitCreateEvent,
    formState: { errors: createEventErrors },
  } = useForm({
    resolver: yupResolver(createEventFormSchema),
  });

  const onCreateEventFormSubmit = (formData: IEventCreate) => {
    createEvent(formData);
  };

  return (
    <GlobalContainer>
    <p>Criar novo Evento:</p>
      <FormWrapper
        id="create_event_form"
        onSubmit={handleSubmitCreateEvent(onCreateEventFormSubmit)}
      >
        <Input
          label="Nome"
          icon={MdDriveFileRenameOutline}
          name="name"
          register={registerCreateEvent}
          error={createEventErrors.name?.message}
        />
      </FormWrapper>

      <Button vanilla={false} type="submit" form="create_event_form">
        Criar
      </Button>
    </GlobalContainer>
  );
};

export default EventCreateForm;
