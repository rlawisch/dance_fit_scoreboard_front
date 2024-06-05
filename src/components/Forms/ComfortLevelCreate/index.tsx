import { FunctionComponent } from "react";
import { IEnrollment } from "../../../types/entity-types";
import { useComfortLevel } from "../../../providers/ComfortLevels";
import { useEvents } from "../../../providers/Events";
import { useEnrollments } from "../../../providers/Enrollments";
import {
  ContentWrapper,
  FormWrapper,
  GlobalContainer,
} from "../../../styles/global";
import Input from "../../Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IComfortLevelFormCreate } from "../../../types/form-types";
import { Bs1CircleFill, Bs2CircleFill } from "react-icons/bs";
import Button from "../../Button";

interface ComfortLevelCreateFormProps {
  enrollment: IEnrollment;
}

const ComfortLevelCreateForm: FunctionComponent<
  ComfortLevelCreateFormProps
> = ({ enrollment }) => {

  const { createComfortLevel } = useComfortLevel();

  const { adminAddPlayer } = useEvents();

  const { removeEnrollment } = useEnrollments();

  const createComfortLevelSchema = yup.object().shape({
    level_single: yup.number().required(),
    level_double: yup.number().required(),
  });

  const {
    register: registerCreateComfortLevel,
    handleSubmit: handleSubmitCreateComfortLevel,
    formState: { errors: createComfortLevelErrors },
  } = useForm({
    resolver: yupResolver(createComfortLevelSchema),
  });

  const onCreateComfortLevelSubmit = (formData: IComfortLevelFormCreate) => {
    console.log(formData)
    
    const { level_single, level_double } = formData;

    const { player, event } = enrollment;

    const comfortLevelData = {
      level_single: level_single,
      level_double: level_double,
      player_id: Number(player.player_id),
      event_id: Number(event.event_id),
    };

     console.log(comfortLevelData)

    createComfortLevel(comfortLevelData)
    adminAddPlayer(Number(event.event_id), Number(player.player_id))
    removeEnrollment(enrollment.enrollment_id)
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <FormWrapper onSubmit={handleSubmitCreateComfortLevel(onCreateComfortLevelSubmit)}>
          <Input
            label="NC Single"
            icon={Bs1CircleFill}
            name="level_single"
            register={registerCreateComfortLevel}
            error={createComfortLevelErrors.level_single?.message}
          />

          <Input
            label="NC Double"
            icon={Bs2CircleFill}
            name="level_double"
            register={registerCreateComfortLevel}
            error={createComfortLevelErrors.level_double?.message}
          />

          <Button vanilla={false} type="submit">
            Criar
          </Button>
        </FormWrapper>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default ComfortLevelCreateForm;
