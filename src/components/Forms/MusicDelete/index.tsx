import { FunctionComponent } from "react";
import {
  DeleteWarning,
  GlobalContainer,
  MusicLevelMiniature,
} from "../../../styles/global";
import { IMusic } from "../../../types/entity-types";
import { MusicWrapper } from "../../../pages/AdminDashboard_Musics/styles";
import DeleteButton from "../../Button_Delete";
import { useMusics } from "../../../providers/Musics";

interface MusicDeleteFormProps {
  music: IMusic;
}

const MusicDeleteForm: FunctionComponent<MusicDeleteFormProps> = ({
  music,
}) => {
  const { deleteMusic } = useMusics();

  return (
    <GlobalContainer>
      <p>Você tem certeza que deseja deletar a música:</p>
      <MusicWrapper>
        {music.name}
        <MusicLevelMiniature
          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
        />
      </MusicWrapper>

      <DeleteWarning>
        Todos os Scores e Fases que envolvem esta música sofreram alterações com
        a deleção da mesma! Pense bem antes de fazer a deleção!
      </DeleteWarning>

      <DeleteButton
        vanilla={false}
        onClick={() => deleteMusic(Number(music.music_id))}
      >
        Deletar
      </DeleteButton>
    </GlobalContainer>
  );
};

export default MusicDeleteForm;