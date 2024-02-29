import { FunctionComponent } from "react";
import { ICategory, IMusic, IPhase } from "../../../types/entity-types";
import { FormWrapper, GlobalContainer } from "../../../styles/global";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IScoreCreate, IScoreFormCreate } from "../../../types/form-types";
import { MdOutlineNumbers } from "react-icons/md";
import Input from "../../Input";
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
import { useScore } from "../../../providers/Scores";

interface ScoreCreateFormProps {
  category: ICategory;
  phase: IPhase;
  music: IMusic;
}

const ScoreCreateForm: FunctionComponent<ScoreCreateFormProps> = ({
  category,
  phase,
  music,
}) => {
  const { createScore } = useScore();

  const scoreCreateSchema = yup.object().shape({
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
      .transform((value, originalValue) =>
        originalValue === "true" ? true : false
      ),
    grade: yup.string().required(),
    plate: yup.string().required(),
  });

  const {
    register: registerCreateScore,
    handleSubmit: handleSubmitCreateScore,
    formState: { errors: createScoreErrors },
  } = useForm({
    resolver: yupResolver(scoreCreateSchema),
  });

  const stagePassOptions = [
    { label: "Pass", value: "true" },
    { label: "Break", value: "false" },
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

  const onCreateScoreFormSubmit = (formData: IScoreFormCreate) => {
    console.log(formData);

    const { category_id, event } = category;

    const { phase_id } = phase;

    const { music_id } = music;

    const realFormData: IScoreCreate = {
      ...formData,
      event_id: Number(event.event_id),
      category_id: Number(category_id),
      phase_id: Number(phase_id),
      music_id: Number(music_id),
    };

    console.log(realFormData);
    createScore(realFormData);
  };

  return (
    <GlobalContainer>
      <p>Criar Score:</p>
      <FormWrapper onSubmit={handleSubmitCreateScore(onCreateScoreFormSubmit)}>
        <Input
          label="Pontuação"
          icon={MdOutlineNumbers}
          name="value"
          register={registerCreateScore}
          error={createScoreErrors.value?.message}
        />

        <Input
          label="Perfects"
          icon={BsEmojiSunglasses}
          name="perfect"
          register={registerCreateScore}
          error={createScoreErrors.perfect?.message}
        />

        <Input
          label="Greats"
          icon={BsEmojiSmile}
          name="great"
          register={registerCreateScore}
          error={createScoreErrors.great?.message}
        />

        <Input
          label="Goods"
          icon={BsEmojiNeutral}
          name="good"
          register={registerCreateScore}
          error={createScoreErrors.good?.message}
        />

        <Input
          label="Bads"
          icon={BsEmojiFrown}
          name="bad"
          register={registerCreateScore}
          error={createScoreErrors.bad?.message}
        />

        <Input
          label="Miss"
          icon={BsEmojiDizzy}
          name="miss"
          register={registerCreateScore}
          error={createScoreErrors.miss?.message}
        />

        <Input
          label="Max Combo"
          icon={BsCapslock}
          name="max_combo"
          register={registerCreateScore}
          error={createScoreErrors.max_combo?.message}
        />

        <Select
          label="Stage Pass"
          placeholder="Selecionar"
          options={stagePassOptions}
          name="stage_pass"
          register={registerCreateScore}
          error={createScoreErrors.stage_pass?.message}
        />

        <Select
          label="Grade"
          placeholder="Selecionar"
          options={gradeOptions}
          name="grade"
          register={registerCreateScore}
          error={createScoreErrors.grade?.message}
        />

        <Select
          label="Plate"
          placeholder="Selecionar"
          options={platingOptions}
          name="plate"
          register={registerCreateScore}
          error={createScoreErrors.plate?.message}
        />

        <Button vanilla={false} type="submit">
          Criar Score
        </Button>
      </FormWrapper>

      <FormWrapper></FormWrapper>
    </GlobalContainer>
  );
};

export default ScoreCreateForm;
