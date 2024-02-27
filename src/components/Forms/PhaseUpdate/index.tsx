import { yupResolver } from "@hookform/resolvers/yup";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IPhaseFormUpdate, IPhaseRealUpdate } from "../../../types/form-types";
import { IPhase } from "../../../types/entity-types";
import { usePhases } from "../../../providers/Phases";
import { FormWrapper, GlobalContainer } from "../../../styles/global";
import { TbMusicPlus } from "react-icons/tb";
import Input from "../../Input";
import { FaUserCheck } from "react-icons/fa6";
import Select from "../../Select";
import UpdateButton from "../../Button_Update";

interface PhaseUpdateFormProps {
  phase: IPhase;
}

const PhaseUpdateForm: FunctionComponent<PhaseUpdateFormProps> = ({
  phase,
}) => {
  const { updatePhase } = usePhases();

  const phaseUpdateSchema = yup.object().shape({
    music_number: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    modes_available: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    passing_players: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
  });

  const {
    register: registerUpdatePhase,
    handleSubmit: handleSubmitUpdatePhase,
    formState: { errors: createUpdateErrors },
  } = useForm({
    resolver: yupResolver(phaseUpdateSchema),
  });

  const modeOptions = [
    { label: "Single", value: "single" },
    { label: "Double", value: "double" },
    { label: "Single + Double", value: "single,double" },
  ];

  const onUpdatePhaseFormSubmit = (
    formData: IPhaseFormUpdate,
    phase: IPhase
  ) => {
    const { phase_id } = phase;
  
    // Filter out undefined properties from formData
    const filteredFormData: Partial<IPhaseFormUpdate> = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined)
    );
  
    console.log("filtered:", filteredFormData);
  
    let realFormData: IPhaseRealUpdate = { ...filteredFormData };
  
    if (filteredFormData.modes_available !== undefined) {
      realFormData = {
        ...realFormData,
        modes_available: filteredFormData.modes_available.split(",")
      };
    }
  
    console.log("real:", realFormData);
  
    updatePhase(realFormData, Number(phase_id));
  };
  

  return (
    <GlobalContainer>
      <p>Atualizar Informações da Fase {phase.phase_number}</p>
      <FormWrapper
        id="phase_update_form"
        onSubmit={handleSubmitUpdatePhase((formData) =>
          onUpdatePhaseFormSubmit(formData, phase)
        )}
      >
        <Input
          label="Número de Músicas"
          icon={TbMusicPlus}
          name="music_number"
          register={registerUpdatePhase}
          error={createUpdateErrors.music_number?.message}
        />

        <Input
          label="Quantos passam de Fase?"
          icon={FaUserCheck}
          name="passing_players"
          register={registerUpdatePhase}
          error={createUpdateErrors.passing_players?.message}
        />

        <Select
          label="Modos Jogados"
          placeholder="Selecionar"
          options={modeOptions}
          name="modes_available"
          register={registerUpdatePhase}
          error={createUpdateErrors.modes_available?.message}
        />

        <UpdateButton vanilla={false} type="submit" form="phase_update_form">
          Atualizar
        </UpdateButton>
      </FormWrapper>
    </GlobalContainer>
  );
};

export default PhaseUpdateForm;
