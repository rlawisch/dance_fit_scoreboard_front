import { FunctionComponent, useEffect, useState } from "react";
import { useSongList } from "../../../providers/SongLists";
import { useMusics } from "../../../providers/Musics";
import {
  ContentWrapper,
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
} from "../../../styles/global";
import { IMusic, ISongList } from "../../../types/entity-types";
import Input from "../../Input";
import { TbMusic } from "react-icons/tb";
import { MusicLi, SelectedMusicWrapper } from "../../../styles/global";
import Button from "../../Button";

interface SongListAddSongFormProps {
    song_list: ISongList | undefined
}

const SongListAddSongForm: FunctionComponent<SongListAddSongFormProps> = ({
    song_list
}) => {
  const { addSongToList } = useSongList();

  const { musicsData, getMusicsData } = useMusics();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredMusics, setFilteredMusics] = useState<IMusic[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<IMusic | null>(null);

  useEffect(() => {
    getMusicsData();
  }, []);

  useEffect(() => {
    if (musicsData && searchQuery.trim() !== "") {
      // Filter musicsData based on search query
      const filtered = musicsData.filter((music) =>
        music.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMusics(filtered);
    }
  }, [searchQuery, musicsData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMusicSelect = (music: IMusic) => {
    // Implement logic to add selected music to category's phase
    // For example:
    // addMusic(selectedMusic, phase.id);
    setSelectedMusic(music);
  };

  const handleAddMusic = (music: IMusic) => {
    // calls the function to add music to song list
    addSongToList(Number(song_list?.song_list_id), Number(music.music_id))
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Pesquise o nome da música que deseja adicionar à lista:</p>

        <Input
          icon={TbMusic}
          type="text"
          placeholder="Pesquisar"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {!!selectedMusic && (
          <SelectedMusicWrapper>
            <p>Música selecionada:</p>
            <MusicWrapper>
              {selectedMusic.name}
              <MusicLevelMiniature
                src={`/static/musics/${selectedMusic.mode}/${selectedMusic.mode.charAt(0).toUpperCase()}${selectedMusic.level.toString().padStart(2, "0")}.png`}
              />
            </MusicWrapper>
          </SelectedMusicWrapper>
        )}

        {!!selectedMusic && (
          <Button vanilla={false} onClick={() => handleAddMusic(selectedMusic)}>
            Adicionar
          </Button>
        )}

        <ul>
          {filteredMusics.map((music) => (
            <MusicLi
              key={music.music_id}
              onClick={() => handleMusicSelect(music)}
            >
              <MusicWrapper>
                {music.name}
                <MusicLevelMiniature
                  src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
                />
              </MusicWrapper>
            </MusicLi>
          ))}
        </ul>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default SongListAddSongForm;
