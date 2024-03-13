import { FunctionComponent, useEffect, useState } from "react";
import { ICategory, IMusic, IPhase } from "../../../types/entity-types";
import {
  ContentWrapper,
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
} from "../../../styles/global";
import { usePhases } from "../../../providers/Phases";
import { useMusics } from "../../../providers/Musics";
import { MusicLi, SelectedMusicWrapper } from "./styles";
import Input from "../../Input";
import { TbMusic } from "react-icons/tb";
import Button from "../../Button";

interface PhaseAddMusicFormProps {
  phase: IPhase;
  category: ICategory;
}

const PhaseAddMusicForm: FunctionComponent<PhaseAddMusicFormProps> = ({
  phase,
}) => {
  const { addMusic } = usePhases();

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
        music.name.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const handleAddMusic = (phase: IPhase, selectedMusic: IMusic) => {
    const { music_id } = selectedMusic;

    addMusic(phase, Number(music_id));
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Pesquise o nome da música que deseja adicionar a esta fase</p>
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
          <Button
            vanilla={false}
            onClick={() => handleAddMusic(phase, selectedMusic)}
          >
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

export default PhaseAddMusicForm;
