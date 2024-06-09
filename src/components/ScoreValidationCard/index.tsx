import { FunctionComponent } from "react";
import { IScore } from "../../types/entity-types";
import { PlayerInfoWrapper, PlayerMiniature } from "../../styles/global";
import {
  ScoreImage,
  ScoreValidationActionWrapper,
  ScoreValidationCardContainer,
  ScoreValidationDetailedInfoWrapper,
  ScoreValidationImageWrapper,
  ScoreValidationMainInfoWrapper,
} from "./styles";
import {
  Bads,
  Goods,
  Greats,
  MaxCombo,
  Misses,
  Perfects,
  ScoreDetailDiscription,
  ScoreDetailValues,
  ScoreGrade,
  ScoreGradeAndPlating,
  ScorePlate,
  ScoreValue,
} from "../ScoreCard/styles";
import { getGradeImageFileName } from "../../utils/getGradeImageFileName";
import Button from "../Button";
import DeleteButton from "../Button_Delete";

interface ScoreValidationCardProps {
  score: IScore;
}

const ScoreValidationCard: FunctionComponent<ScoreValidationCardProps> = ({
  score,
}) => {
  return (
    <ScoreValidationCardContainer>
      <ScoreValidationMainInfoWrapper>
        <PlayerInfoWrapper>
          <PlayerMiniature
            src={score.player.profilePicture || "/img/default_player.png"}
            alt={score.player.nickname}
          />
          {score.player.nickname}
        </PlayerInfoWrapper>

        <ScoreGradeAndPlating>
          <ScoreValue>{score.value.toLocaleString()}</ScoreValue>
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
      </ScoreValidationMainInfoWrapper>

      <ScoreValidationImageWrapper>
        <ScoreImage src={score.score_picture} />
      </ScoreValidationImageWrapper>

      <ScoreValidationDetailedInfoWrapper>
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
      </ScoreValidationDetailedInfoWrapper>

      <ScoreValidationActionWrapper>
        <div>
          <Button>Validar</Button>
        </div>
        <div>
          <DeleteButton>Invalidar</DeleteButton>
        </div>
      </ScoreValidationActionWrapper>
    </ScoreValidationCardContainer>
  );
};

export default ScoreValidationCard;
