import { FunctionComponent } from "react";
import { IScore } from "../../types/entity-types";
import {
  Bads,
  Goods,
  Greats,
  MaxCombo,
  Misses,
  Perfects,
  ScoreCardContainer,
  ScoreDetailDiscription,
  ScoreDetailValues,
  ScoreDetailedContainer,
  ScoreGradeAndPlating,
  ScorePlate,
  ScoreValue,
} from "./styles";
import { ScoreGrade } from "./styles";

interface ScoreCardProps {
  score: IScore;
}

function getGradeImageFileName(score: IScore): string {
  let fileNamePrefix = "";

  // Check if stage_pass is false, if yes, prefix with "x_"
  if (!score.stage_pass) {
    fileNamePrefix = "x_";
  }

  // Check if grade ends with "+", if yes, suffix with "_p"
  if (score.grade.endsWith("+")) {
    return `/static/musics/grading/${fileNamePrefix}${score.grade.toLowerCase().slice(0, -1)}_p.png`;
  } else {
    return `/static/musics/grading/${fileNamePrefix}${score.grade.toLowerCase()}.png`;
  }
}

const ScoreCard: FunctionComponent<ScoreCardProps> = ({ score }) => {
  return (
    <ScoreCardContainer>
      <ScoreGradeAndPlating>
        <ScoreValue>{score.value}</ScoreValue>
        <div>
          <ScoreGrade src={getGradeImageFileName(score)} />
        </div>
        <div>
          {score.plate && (
            <ScorePlate
              src={`/static/musics/plating/${score.plate.toLowerCase()}.png`}
            />
          )}
        </div>
      </ScoreGradeAndPlating>

      <ScoreDetailedContainer>
        <ScoreDetailDiscription>
          <Perfects>PERFECT</Perfects>

          <Greats>GREAT</Greats>

          <Goods>GOOD</Goods>

          <Bads>BAD</Bads>

          <Misses>MISS</Misses>

          <MaxCombo>MAX COMBO</MaxCombo>
        </ScoreDetailDiscription>

        <ScoreDetailValues>
          <Perfects>{score.perfect}</Perfects>

          <Greats>{score.great}</Greats>

          <Goods>{score.good}</Goods>

          <Bads>{score.bad}</Bads>

          <Misses>{score.miss}</Misses>

          <MaxCombo>{score.max_combo}</MaxCombo>
        </ScoreDetailValues>
      </ScoreDetailedContainer>
    </ScoreCardContainer>
  );
};

export default ScoreCard;
