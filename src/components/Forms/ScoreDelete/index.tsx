import { FunctionComponent } from "react";
import {
  ContentWrapper,
  DeleteWarning,
  GlobalContainer,
} from "../../../styles/global";
import { useScore } from "../../../providers/Scores";
import DeleteButton from "../../Button_Delete";
import { IScore } from "../../../types/entity-types";

interface ScoreDeleteFormProps {
  score: IScore;
}

const ScoreDeleteForm: FunctionComponent<ScoreDeleteFormProps> = ({
  score,
}) => {
  const { deleteScore } = useScore();

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Você tem certeza que deseja deletar o Score?</p>

        <DeleteWarning>
          O Score será APAGADO do sistema! Pense bem antes de fazer a deleção!
        </DeleteWarning>

        <DeleteButton
          vanilla={false}
          onClick={() => deleteScore(Number(score.score_id))}
        >
          Deletar
        </DeleteButton>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default ScoreDeleteForm;
