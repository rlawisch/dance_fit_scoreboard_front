import { FunctionComponent, useEffect, useState } from "react";
import { IScore } from "../../types/entity-types";
import {
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
  PlayerInfoWrapper,
  PlayerMiniature,
} from "../../styles/global";
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
import { useScore } from "../../providers/Scores";
import useDynamicModal from "../../providers/DynamicModal";
import Modal from "../Modal";
import { stringShortener } from "../../utils/stringShortener";

interface ScoreValidationCardProps {
  score: IScore;
}

const ScoreValidationCard: FunctionComponent<ScoreValidationCardProps> = ({
  score,
}) => {
  const { adminValidateScore, adminInvalidateScore } = useScore();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  const {
    isModalOpen: isConfirmValidationModalOpen,
    openModal: openConfirmValidationModal,
    closeModal: closeConfirmValidationModal,
  } = useDynamicModal();

  const {
    isModalOpen: isConfirmInvalidationModalOpen,
    openModal: openConfirmInvalidationModal,
    closeModal: closeConfirmInvalidationModal,
  } = useDynamicModal();

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

        <MusicWrapper>
          <MusicLevelMiniature
            src={`/static/musics/${score.music.mode}/${score.music.mode.charAt(0).toUpperCase()}${score.music.level
              .toString()
              .padStart(2, "0")}.png`}
          />
          {stringShortener(windowWidth, score.music.name)}
        </MusicWrapper>

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
          <Button onClick={() => openConfirmValidationModal(score.score_id)}>
            Validar
          </Button>
          <Modal
            isOpen={isConfirmValidationModalOpen(score.score_id)}
            onClose={() => closeConfirmValidationModal(score.score_id)}
          >
            <GlobalContainer>
              <p>Tem certeza que quer validar o score ?</p>
              <p>{score.value}</p>
              <p>{score.great}</p>
              <Button
                vanilla={false}
                onClick={() => adminValidateScore(Number(score.score_id))}
              >
                Validar
              </Button>
            </GlobalContainer>
          </Modal>
        </div>
        <div>
          <DeleteButton
            onClick={() => openConfirmInvalidationModal(score.score_id)}
          >
            Invalidar
          </DeleteButton>
          <Modal
            isOpen={isConfirmInvalidationModalOpen(score.score_id)}
            onClose={() => closeConfirmInvalidationModal(score.score_id)}
          >
            <GlobalContainer>
              <p>Tem certeza que quer invalidar o score ?</p>
              <p>{score.value}</p>
              <p>{score.great}</p>

              <DeleteButton
                vanilla={false}
                onClick={() => adminInvalidateScore(Number(score.score_id))}
              >
                Invalidar
              </DeleteButton>
            </GlobalContainer>
          </Modal>
        </div>
      </ScoreValidationActionWrapper>
    </ScoreValidationCardContainer>
  );
};

export default ScoreValidationCard;
