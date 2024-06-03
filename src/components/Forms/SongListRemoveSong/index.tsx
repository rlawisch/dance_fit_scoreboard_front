import { FunctionComponent } from "react";
import {
  ContentWrapper,
  DeleteWarning,
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
} from "../../../styles/global";
import { useSongList } from "../../../providers/SongLists";
import { IMusic, ISongList } from "../../../types/entity-types";
import DeleteButton from "../../Button_Delete";

interface SongListRemoveSongFormProps {
  music: IMusic;
  song_list: ISongList | undefined;
}

const SongListRemoveSongForm: FunctionComponent<
  SongListRemoveSongFormProps
> = ({ music, song_list }) => {
  const { removeSongFromList } = useSongList();

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Você deseja remover a música:</p>

        <MusicWrapper>
          {music.name}
          <MusicLevelMiniature
            src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
          />
        </MusicWrapper>
        <p>da Lista de Músicas do evento ?</p>

        <DeleteWarning>
          Todos os Scores relacionados a esta música neste evento serão afetados
          pela remoção da música da lista! Pense bem antes de fazer a remoção!
        </DeleteWarning>

        <DeleteButton
          vanilla={false}
          onClick={() =>
            removeSongFromList(
              Number(song_list?.song_list_id),
              Number(music.music_id)
            )
          }
        >
          Remover
        </DeleteButton>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default SongListRemoveSongForm;
