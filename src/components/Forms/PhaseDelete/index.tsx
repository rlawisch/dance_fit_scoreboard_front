import { FunctionComponent } from "react";
import { IPhase } from "../../../types/entity-types";
import { usePhases } from "../../../providers/Phases";
import {
  ContentWrapper,
  DeleteWarning,
  GlobalContainer,
} from "../../../styles/global";
import DeleteButton from "../../Button_Delete";

interface PhaseDeleteFormProps {
  phase: IPhase;
}

const PhaseDeleteForm: FunctionComponent<PhaseDeleteFormProps> = ({
  phase,
}) => {
  const { deletePhase } = usePhases();

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Você tem certeza que deseja deletar a Fase {phase.phase_number}?</p>

        <DeleteWarning>
          Todos os Scores cadastrados nas músicas desta fase serão perdidos!
          Pense bem antes de fazer a deleção!
        </DeleteWarning>

        <DeleteButton
          vanilla={false}
          onClick={() => deletePhase(Number(phase.phase_id))}
        >
          Deletar
        </DeleteButton>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default PhaseDeleteForm;
