import { FunctionComponent } from "react";
import {
  ContentWrapper,
  FormWrapper,
  GlobalContainer,
} from "../../../styles/global";
import { useScore } from "../../../providers/Scores";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IScoreUpdate } from "../../../types/form-types";
import Input from "../../Input";
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
import UpdateButton from "../../Button_Update";
import { toast } from "react-toastify";

interface ScoreUpdateFormProps {
  score_id: number;
}

const ScoreUpdateForm: FunctionComponent<ScoreUpdateFormProps> = ({
  score_id,
}) => {
  const { updateScore } = useScore();

  const scoreUpdateSchema = yup.object().shape({
    value: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    perfect: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    great: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    good: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    bad: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    miss: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    max_combo: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    stage_pass: yup
      .boolean()
      .transform((_, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : originalValue === ""
              ? undefined
              : null
      ),
    grade: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    plate: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === "null"
          ? null
          : originalValue === ""
            ? undefined
            : value
      )
      .nullable(),
  });

  const {
    register: registerUpdateScore,
    handleSubmit: handleSubmitUpdateScore,
    formState: { errors: updateScoreErrors },
  } = useForm({
    resolver: yupResolver(scoreUpdateSchema),
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
    { label: "Nenhum", value: "null" },
    { label: "Perfect Game", value: "PG" },
    { label: "Ultimate Game", value: "UG" },
    { label: "Extreme Game", value: "EG" },
    { label: "Superb Game", value: "SG" },
    { label: "Marvelous Game", value: "MG" },
    { label: "Talented Game", value: "TG" },
    { label: "Fair Game", value: "FG" },
    { label: "Rough Game", value: "RG" },
  ];

  const onUpdateScoreFromSubmit = (formData: IScoreUpdate) => {
    console.log(formData);

    if (JSON.stringify(formData) === "{}") {
      toast.error(
        "Nenhum campo preenchido, não é possível fazer a atualização"
      );
      return;
    }

    updateScore(formData, score_id);
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Atualizar Score:</p>

        <p>Apenas preencha os campos que deseja atualizar</p>

        <FormWrapper
          onSubmit={handleSubmitUpdateScore(onUpdateScoreFromSubmit)}
        >
          <Input
            label="Pontuação"
            icon={MdOutlineNumbers}
            name="value"
            type="number"
            register={registerUpdateScore}
            error={updateScoreErrors.value?.message}
          />

          <Input
            label="Perfects"
            icon={BsEmojiSunglasses}
            name="perfect"
            type="number"
            register={registerUpdateScore}
            error={updateScoreErrors.perfect?.message}
          />

          <Input
            label="Greats"
            icon={BsEmojiSmile}
            name="great"
            type="number"
            register={registerUpdateScore}
            error={updateScoreErrors.great?.message}
          />

          <Input
            label="Goods"
            icon={BsEmojiNeutral}
            name="good"
            type="number"
            register={registerUpdateScore}
            error={updateScoreErrors.good?.message}
          />

          <Input
            label="Bads"
            icon={BsEmojiFrown}
            name="bad"
            type="number"
            register={registerUpdateScore}
            error={updateScoreErrors.bad?.message}
          />

          <Input
            label="Miss"
            icon={BsEmojiDizzy}
            name="miss"
            type="number"
            register={registerUpdateScore}
            error={updateScoreErrors.miss?.message}
          />

          <Input
            label="Max Combo"
            icon={BsCapslock}
            name="max_combo"
            type="number"
            register={registerUpdateScore}
            error={updateScoreErrors.max_combo?.message}
          />

          <Select
            label="Stage Pass"
            placeholder="Selecionar"
            options={stagePassOptions}
            name="stage_pass"
            register={registerUpdateScore}
            error={updateScoreErrors.stage_pass?.message}
          />

          <Select
            label="Grade"
            placeholder="Selecionar"
            options={gradeOptions}
            name="grade"
            register={registerUpdateScore}
            error={updateScoreErrors.grade?.message}
          />

          <Select
            label="Plate"
            placeholder="Selecionar"
            options={platingOptions}
            name="plate"
            register={registerUpdateScore}
            error={updateScoreErrors.plate?.message}
          />

          <UpdateButton vanilla={false} type="submit">
            Atualizar
          </UpdateButton>
        </FormWrapper>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default ScoreUpdateForm;
