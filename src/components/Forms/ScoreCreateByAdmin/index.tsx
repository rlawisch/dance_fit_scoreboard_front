import { FunctionComponent, useEffect, useState } from "react";
import {
  ICategory,
  IMusic,
  IPhase,
  IPlayer,
} from "../../../types/entity-types";
import {
  FormWrapper,
  GlobalContainer,
  PlayerInfoWrapper,
  PlayerLi,
  PlayerMiniature,
  SelectedPlayerWrapper,
} from "../../../styles/global";
import { useScore } from "../../../providers/Scores";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IScoreCreateByAdmin,
  IScoreFormCreate,
} from "../../../types/form-types";
import Input from "../../Input";
import { FaUserPlus } from "react-icons/fa6";
import { MdOutlineNumbers } from "react-icons/md";
import {
  BsCapslock,
  BsEmojiDizzy,
  BsEmojiFrown,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiSunglasses,
} from "react-icons/bs";
import Select from "../../Select";
import Button from "../../Button";
import { toast } from "react-toastify";

interface ScoreCreateByAdmFormProps {
  category: ICategory;
  phase: IPhase;
  music: IMusic;
}

const ScoreCreateByAdmForm: FunctionComponent<ScoreCreateByAdmFormProps> = ({
  category,
  phase,
  music,
}) => {
  const { adminCreateScore } = useScore();

  const admScoreCreateSchema = yup.object().shape({
    value: yup.number().required(),
    perfect: yup.number().required(),
    great: yup.number().required(),
    good: yup.number().required(),
    bad: yup.number().required(),
    miss: yup.number().required(),
    max_combo: yup.number().required(),
    stage_pass: yup
      .boolean()
      .required()
      .transform((_, originalValue) =>
        originalValue === "true" ? true : false
      ),
    grade: yup.string().required(),
    plate: yup.string().required(),
  });

  const {
    register: registerAdmCreateScore,
    handleSubmit: handleSubmitAdmCreateScore,
    formState: { errors: createAdmScoreErrors },
  } = useForm({
    resolver: yupResolver(admScoreCreateSchema),
  });

  const stagePassOptions = [
    { label: "Pass", value: "true" },
    { label: "Break", value: "" },
  ];

  const gradeOptions = [
    { label: "SSS+", value: "SSS+" },
    { label: "SSS", value: "SSS" },
    { label: "SS+", value: "SS+" },
    { label: "SS", value: "SS" },
    { label: "S+", value: "S+" },
    { label: "S", value: "S" },
    { label: "AAA+", value: "AAA+" },
    { label: "AAA", value: "AAA" },
    { label: "AA+", value: "AA+" },
    { label: "AA", value: "AA" },
    { label: "A+", value: "A+" },
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "F", value: "F" },
  ];

  const platingOptions = [
    { label: "Perfect Game", value: "PG" },
    { label: "Ultimate Game", value: "UG" },
    { label: "Extreme Game", value: "EG" },
    { label: "Superb Game", value: "SG" },
    { label: "Marvelous Game", value: "MG" },
    { label: "Talented Game", value: "TG" },
    { label: "Fair Game", value: "FG" },
    { label: "Rough Game", value: "RG" },
  ];

  const onAdmCreateScoreFormSubmit = (formData: IScoreFormCreate) => {
    console.log(formData);

    const { category_id, event } = category;

    const { phase_id } = phase;

    const { music_id } = music;

    if (!selectedPlayer) {
      toast.error("Por favor selecione um Jogador");
      return;
    }

    const { player_id } = selectedPlayer;

    const realFormData: IScoreCreateByAdmin = {
      ...formData,
      event_id: Number(event.event_id),
      category_id: Number(category_id),
      phase_id: Number(phase_id),
      music_id: Number(music_id),
      player_id: Number(player_id),
    };

    console.log(realFormData);
    adminCreateScore(realFormData);
  };

  const categoryPlayers = category.players;

  const [searchPlayerQuery, setSearchPlayerQuery] = useState<string>("");
  const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    if (categoryPlayers && searchPlayerQuery.trim() !== "") {
      const filtered = categoryPlayers.filter((player) =>
        player.nickname.toLowerCase().includes(searchPlayerQuery.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  }, [searchPlayerQuery, categoryPlayers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlayerQuery(event.target.value);
  };

  const handlePlayerSelect = (player: IPlayer) => {
    setSelectedPlayer(player);
  };

  return (
    <GlobalContainer>
      <p>Criar Score</p>

      <p>Pesquise o jogador para qual deseja adicionar o Score:</p>
      <Input
        icon={FaUserPlus}
        type="text"
        placeholder="Pesquisar"
        value={searchPlayerQuery}
        onChange={handleSearchChange}
      />

      {!!selectedPlayer && (
        <SelectedPlayerWrapper>
          <p>Jogador Selecionado:</p>
          {selectedPlayer ? (
            <>
              <PlayerMiniature
                src={
                  selectedPlayer.profilePicture
                    ? selectedPlayer.profilePicture
                    : "/img/default_player.png"
                }
                alt="Mini Profile Picture"
              />
              {selectedPlayer.nickname}
            </>
          ) : (
            "Nenhum jogador selecionado"
          )}
        </SelectedPlayerWrapper>
      )}
      
      <ul>
        {filteredPlayers.map((player) => (
          <PlayerLi
            key={player.player_id}
            onClick={() => handlePlayerSelect(player)}
          >
            <PlayerInfoWrapper>
              <PlayerMiniature
                src={
                  player.profilePicture
                    ? player.profilePicture
                    : "/img/default_player.png"
                }
                alt="Mini Profile Picture"
              />
              {player.nickname}
            </PlayerInfoWrapper>
          </PlayerLi>
        ))}
      </ul>

      <FormWrapper
        onSubmit={handleSubmitAdmCreateScore(onAdmCreateScoreFormSubmit)}
      >
        <Input
          label="Pontuação"
          icon={MdOutlineNumbers}
          name="value"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.value?.message}
        />

        <Input
          label="Perfects"
          icon={BsEmojiSunglasses}
          name="perfect"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.perfect?.message}
        />

        <Input
          label="Greats"
          icon={BsEmojiSmile}
          name="great"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.great?.message}
        />

        <Input
          label="Goods"
          icon={BsEmojiNeutral}
          name="good"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.good?.message}
        />

        <Input
          label="Bads"
          icon={BsEmojiFrown}
          name="bad"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.bad?.message}
        />

        <Input
          label="Miss"
          icon={BsEmojiDizzy}
          name="miss"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.miss?.message}
        />

        <Input
          label="Max Combo"
          icon={BsCapslock}
          name="max_combo"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.max_combo?.message}
        />

        <Select
          label="Stage Pass"
          placeholder="Selecionar"
          options={stagePassOptions}
          name="stage_pass"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.stage_pass?.message}
        />

        <Select
          label="Grade"
          placeholder="Selecionar"
          options={gradeOptions}
          name="grade"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.grade?.message}
        />

        <Select
          label="Plate"
          placeholder="Selecionar"
          options={platingOptions}
          name="plate"
          register={registerAdmCreateScore}
          error={createAdmScoreErrors.plate?.message}
        />

        <Button vanilla={false} type="submit">
          Criar Score
        </Button>
      </FormWrapper>
    </GlobalContainer>
  );
};

export default ScoreCreateByAdmForm;
