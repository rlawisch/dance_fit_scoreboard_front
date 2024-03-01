import { FunctionComponent } from "react";
import { ICategory, IMusic, IPhase } from "../../../types/entity-types";
import {
  DeleteWarning,
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
} from "../../../styles/global";
import { usePhases } from "../../../providers/Phases";
import DeleteButton from "../../Button_Delete";

interface PhaseRemoveMusicFormProps {
  category: ICategory;
  phase: IPhase;
  music: IMusic;
}

const PhaseRemoveMusicForm: FunctionComponent<PhaseRemoveMusicFormProps> = ({
  category,
  phase,
  music,
}) => {
  const { removeMusic } = usePhases();

  return (
    <GlobalContainer>
      <p>Você deseja remover a música</p>
      <MusicWrapper>
        {music.name}
        <MusicLevelMiniature
          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
        />
      </MusicWrapper>
      <p>da Fase {phase.phase_number} da categoria {category.name}?</p>

      <DeleteWarning>
        Todos os Scores desta Fase serão afetados pela remoção da Música da
        mesma! Pense bem antes de fazer a remoção!
      </DeleteWarning>

      <DeleteButton
        vanilla={false}
        onClick={() => removeMusic(phase, Number(music.music_id))}
      >
        Remover
      </DeleteButton>
    </GlobalContainer>
  );
};

export default PhaseRemoveMusicForm;
