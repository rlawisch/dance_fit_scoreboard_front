import { FunctionComponent } from "react";
import { FormWrapper } from "../../../styles/global";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPhaseFormCreate, IPhaseRealCreate } from "../../../types/form-types";
import { usePhases } from "../../../providers/Phases";
import Input from "../../Input";
import Select from "../../Select";
import Button from "../../Button";
import { MdFormatListNumbered } from "react-icons/md";
import { TbMusicPlus } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa6";

interface PhaseCreateFormProps {
  category_id: string | undefined;
}

const PhaseCreateForm: FunctionComponent<PhaseCreateFormProps> = ({
  category_id,
}) => {
  const { createPhase } = usePhases();

  const phaseCreateSchema = yup.object().shape({
    phase_number: yup.number().required(),
    music_number: yup.number().required(),
    modes_available: yup.string().required(),
    passing_players: yup.number().required(),
  });

  const {
    register: registerCreatePhase,
    handleSubmit: handleSubmitCreatePhase,
    formState: { errors: createPhaseErrors },
  } = useForm({
    resolver: yupResolver(phaseCreateSchema),
  });

  const modeOptions = [
    { label: "Single", value: "single" },
    { label: "Double", value: "double" },
    { label: "Single + Double", value: "single,double" },
  ];

  const onCreatePhaseFormSubmit = (formData: IPhaseFormCreate) => {
    const formatedModes = formData.modes_available.split(",");

    const realFormData: IPhaseRealCreate = {
      ...formData,
      modes_available: formatedModes,
      category_id: Number(category_id),
    };

    createPhase(realFormData);
  };

  return (
    <FormWrapper
      id="phase_create_form"
      onSubmit={handleSubmitCreatePhase(onCreatePhaseFormSubmit)}
    >
      <Input
        label="Número da Fase"
        icon={MdFormatListNumbered}
        name="phase_number"
        register={registerCreatePhase}
        error={createPhaseErrors.phase_number?.message}
      />

      <Input
        label="Número de Músicas"
        icon={TbMusicPlus}
        name="music_number"
        register={registerCreatePhase}
        error={createPhaseErrors.music_number?.message}
      />

      <Input
        label="Quantos passam de Fase?"
        icon={FaUserCheck}
        name="passing_players"
        register={registerCreatePhase}
        error={createPhaseErrors.passing_players?.message}
      />

      <Select
        label="Modos Jogados"
        placeholder="Selecionar"
        options={modeOptions}
        name="modes_available"
        register={registerCreatePhase}
        error={createPhaseErrors.modes_available?.message}
      />

      <Button vanilla={false} type="submit" form="phase_create_form">
        Criar Fase
      </Button>
    </FormWrapper>
  );
};

export default PhaseCreateForm;
