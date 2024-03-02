import { FunctionComponent } from "react";
import {
  FormWrapper,
  GlobalContainer,
  MusicLevelMiniature,
  MusicWrapper,
} from "../../../styles/global";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../Input";
import Select from "../../Select";
import { TbFileMusic } from "react-icons/tb";
import { MdOutlineNumbers } from "react-icons/md";
import { IMusicUpdate } from "../../../types/form-types";
import UpdateButton from "../../Button_Update";
import { IMusic } from "../../../types/entity-types";
import { useMusics } from "../../../providers/Musics";

interface MusicUpdateFormProps {
  music: IMusic;
}

const MusicUpdateForm: FunctionComponent<MusicUpdateFormProps> = ({
  music,
}) => {
  const { updateMusic } = useMusics();
  
  const musicCreateSchema = yup.object().shape({
    name: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    level: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    mode: yup
      .string().transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    ),
  });

  const {
    register: registerUpdateMusic,
    handleSubmit: handleSubmitUpdateMusic,
    formState: { errors: updateMusicErrors },
  } = useForm({
    resolver: yupResolver(musicCreateSchema),
  });


  const modeOptions = [
    { label: "Single", value: "single" },
    { label: "Double", value: "double" },
  ];

  const onUpdateMusicFormSubmit = (formData: IMusicUpdate, music: IMusic) => {

    const { music_id } = music;

    // Filter out undefined properties from formData
    const filteredFormData: Partial<IMusicUpdate> = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined)
    );

    updateMusic(filteredFormData, Number(music_id));
  };

  return (
    <GlobalContainer>
      <p>Atualizar informações da Música:</p>
      <FormWrapper
        onSubmit={handleSubmitUpdateMusic((formData) =>
          onUpdateMusicFormSubmit(formData, music)
        )}
      >
      <MusicWrapper>
        {music.name}
        <MusicLevelMiniature
          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level.toString().padStart(2, "0")}.png`}
        />
      </MusicWrapper>
        <Input
          label="Nome"
          icon={TbFileMusic}
          name="name"
          register={registerUpdateMusic}
          error={updateMusicErrors.name?.message}
        />

        <Input
          label="Nível"
          icon={MdOutlineNumbers}
          name="level"
          type="number"
          register={registerUpdateMusic}
          error={updateMusicErrors.level?.message}
        />

        <Select
          label="Modo"
          placeholder="Selecionar"
          options={modeOptions}
          name="mode"
          register={registerUpdateMusic}
          error={updateMusicErrors.mode?.message}
        />

        <UpdateButton vanilla={false} type="submit">
          Atualizar
        </UpdateButton>
      </FormWrapper>
    </GlobalContainer>
  );
};

export default MusicUpdateForm;
