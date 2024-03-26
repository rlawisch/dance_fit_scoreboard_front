import { FunctionComponent, useEffect } from "react";
import {
  ContentWrapper,
  FormWrapper,
  GlobalContainer,
} from "../../../styles/global";
import * as yup from "yup";
import { useEvents } from "../../../providers/Events";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IEventCreate } from "../../../types/form-types";
import Input from "../../Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../Button";
import Select from "../../Select";

interface EventCreateFormProps {}

const EventCreateForm: FunctionComponent<EventCreateFormProps> = () => {
  const { createEvent, eventTypes, getEventTypes } = useEvents();

  useEffect(() => {
    getEventTypes()
  }, [])

  const createEventFormSchema = yup.object().shape({
    name: yup.string().required(),
    event_type_id: yup.number().required()
  });

  const eventTypeOptions = eventTypes.map(eventType => ({
    label: eventType.name,
    value: eventType.event_type_id
  }))

  const {
    register: registerCreateEvent,
    handleSubmit: handleSubmitCreateEvent,
    formState: { errors: createEventErrors },
  } = useForm({
    resolver: yupResolver(createEventFormSchema),
  });

  const onCreateEventFormSubmit = (formData: IEventCreate) => {
    createEvent(formData)
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Criar novo Evento:</p>
        <FormWrapper
          onSubmit={handleSubmitCreateEvent(onCreateEventFormSubmit)}
        >
          <Input
            label="Nome"
            icon={MdDriveFileRenameOutline}
            name="name"
            register={registerCreateEvent}
            error={createEventErrors.name?.message}
          />

          <Select
            label="Tipo de Evento"
            placeholder="Selecionar"
            options={eventTypeOptions}
            name="event_type_id"
            register={registerCreateEvent}
            error={createEventErrors.event_type_id?.message}
          />

          <Button vanilla={false} type="submit">
            Criar
          </Button>
        </FormWrapper>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default EventCreateForm;
