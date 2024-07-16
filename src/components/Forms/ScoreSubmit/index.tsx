import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { IEvent, IMusic, IScorePreview } from "../../../types/entity-types";
import {
  ContentWrapper,
  DeleteWarning,
  FormWrapper,
  ScoreDGPReview,
  ScoreDGPreviewWrapper,
} from "../../../styles/global";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IScoreCreate, IScoreSubmitByPlayerForm } from "../../../types/form-types";
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
import Cropper, { Area, Point } from "react-easy-crop";
import { readFile } from "../../../utils/readFile";
import {
  CropperFullWrapper,
  CropperWrapper,
  SliderWrapper,
} from "../../../pages/Dashboard_Profile/styles";
import { Slider, Typography } from "@material-ui/core";
import { getCroppedImg } from "../../../utils/canvasUtils";
import { ThemeContext } from "styled-components";
import { BallTriangle } from "react-loader-spinner";
import { FaArrowUpRightFromSquare, FaCameraRetro } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { getScoreValue } from "../../../utils/getScoreValue";
import { getScoreGrade } from "../../../utils/getScoreGrade";
import { getScorePlate } from "../../../utils/getScorePlate";
import ScorePreviewCard from "../../ScorePreviewCard";

interface ScoreCreateFormProps {
  music: IMusic;
  event: IEvent | undefined;
}

const ScoreCreateForm: FunctionComponent<ScoreCreateFormProps> = ({
  music,
  event,
}) => {
  const theme = useContext(ThemeContext);

  const { submitScore, isLoadingSubmitScore } = useScore();

  const scoreCreateSchema = yup.object().shape({
    perfect: yup
      .number()
      .required()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value)),
    great: yup
      .number()
      .required()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value)),
    good: yup
      .number()
      .required()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value)),
    bad: yup
      .number()
      .required()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value)),
    miss: yup
      .number()
      .required()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value)),
    max_combo: yup.number().required(),
    stage_pass: yup
      .boolean()
      .required()
      .transform((_, originalValue) =>
        originalValue === "true" ? true : false
      ),
  });

  const {
    register: registerCreateScore,
    handleSubmit: handleSubmitCreateScore,
    watch,
    formState: { errors: createScoreErrors },
  } = useForm<IScoreSubmitByPlayerForm>({
    resolver: yupResolver(scoreCreateSchema),
  });

  const stagePassOptions = [
    { label: "Pass", value: "true" },
    { label: "Break", value: "" },
  ];

  // crop component states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({} as Area);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: string | null = null;

      try {
        const fileData = await readFile(file);

        if (typeof fileData === "string") {
          imageDataUrl = fileData;
        } else if (fileData instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          imageDataUrl = decoder.decode(fileData);
        }
      } catch (e) {
        console.warn("Failed to process the image", e);
      }

      setImageSrc(imageDataUrl);
    }
  };

  const onCreateScoreFormSubmit = async (formData: IScoreSubmitByPlayerForm) => {
    try {
      if (imageSrc) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

        if (croppedImage !== null) {
          const response = await fetch(croppedImage);
          const blob = await response.blob();

          // Create a file from the blob with the name "score_picture.jpg"
          const file = new File([blob], "score_picture.jpg", {
            type: "image/jpeg",
          });

          // Create a new FormData object
          const multipartForm = new FormData();

          // Append the new file to the FormData object
          multipartForm.append("file", file, "score_picture.jpg");

          const { music_id } = music;

          const { perfect, great, good, bad, miss, max_combo, stage_pass } =
            formData;

          const scoreValue = getScoreValue(
            perfect,
            great,
            good,
            bad,
            miss,
            max_combo
          );

          const scoreGrade = getScoreGrade(scoreValue);

          const scorePlate = getScorePlate(great, good, bad, miss, stage_pass);

          const realFormData: IScoreCreate = {
            ...formData,
            value: scoreValue,
            plate: scorePlate,
            grade: scoreGrade,
            event_id: Number(event?.event_id),
            music_id: Number(music_id),
          };

          Object.keys(realFormData).forEach((key) => {
            const value = (realFormData as any)[key];
            if (value !== undefined) {
              multipartForm.append(key, value);
            }
          });

          submitScore(multipartForm);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isPreviewVisible, setPreviewVisible] = useState<boolean>(false);

  const showCroppedImage = async () => {
    try {
      if (imageSrc) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

        setCroppedImage(croppedImage);
        setPreviewVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [scorePreview, setScorePreview] = useState<IScorePreview>({
    perfect: 0,
    great: 0,
    good: 0,
    bad: 0,
    miss: 0,
    max_combo: 0,
    stage_pass: false,
    value: 0,
    grade: "",
    plate: undefined,
  });

  const perfect = watch("perfect");
  const great = watch("great");
  const good = watch("good");
  const bad = watch("bad");
  const miss = watch("miss");
  const max_combo = watch("max_combo");
  const stage_pass = watch("stage_pass");

  useEffect(() => {
    const value = getScoreValue(
      Number(perfect),
      Number(great),
      Number(good),
      Number(bad),
      Number(miss),
      Number(max_combo)
    );
    const grade = getScoreGrade(value);
    const plate = getScorePlate(
      Number(great),
      Number(good),
      Number(bad),
      Number(miss),
      Boolean(stage_pass)
    );

    setScorePreview((prevScore) => ({
      ...prevScore,
      value: Number(value),
      grade: grade,
      plate: plate,
      perfect: Number(perfect),
      great: Number(great),
      good: Number(good),
      bad: Number(bad),
      miss: Number(miss),
      max_combo: Number(max_combo),
      stage_pass: Boolean(stage_pass),
    }));
  }, [perfect, great, good, bad, miss, max_combo, stage_pass]);

  return (
    <>
      <ContentWrapper>
        <FormWrapper
          onSubmit={handleSubmitCreateScore(onCreateScoreFormSubmit)}
        >
          <Input
            name="file"
            icon={FaCameraRetro}
            label="Foto do Score"
            type="file"
            onChange={onFileChange}
          />

          {imageSrc && (
            <CropperFullWrapper>
              <CropperWrapper>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={5 / 4}
                  cropShape="rect"
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </CropperWrapper>
              <SliderWrapper>
                <Typography variant="overline" style={{ marginTop: `1rem` }}>
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(_, zoom) =>
                    setZoom(typeof zoom === "number" ? zoom : zoom[0])
                  }
                />
              </SliderWrapper>
            </CropperFullWrapper>
          )}

          <Button
            type="button"
            onClick={() => showCroppedImage()}
            style={{ margin: `1rem 0` }}
          >
            Mostrar Foto Cortada
          </Button>

          {croppedImage && isPreviewVisible && (
            <ScoreDGPreviewWrapper>
              <Button vanilla={false} onClick={() => setPreviewVisible(false)}>
                <ImCross />
              </Button>
              <ScoreDGPReview src={croppedImage} />
            </ScoreDGPreviewWrapper>
          )}

          <Input
            label="Perfects"
            icon={BsEmojiSunglasses}
            name="perfect"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.perfect?.message}
          />

          <Input
            label="Greats"
            icon={BsEmojiSmile}
            name="great"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.great?.message}
          />

          <Input
            label="Goods"
            icon={BsEmojiNeutral}
            name="good"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.good?.message}
          />

          <Input
            label="Bads"
            icon={BsEmojiFrown}
            name="bad"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.bad?.message}
          />

          <Input
            label="Miss"
            icon={BsEmojiDizzy}
            name="miss"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.miss?.message}
          />

          <Input
            label="Max Combo"
            icon={BsCapslock}
            name="max_combo"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
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

          <Button
            type="button"
            onClick={() => showCroppedImage()}
            style={{ margin: `1rem 0` }}
          >
            Mostrar Foto Cortada
          </Button>

          <h2>Prévia do Score:</h2>

          <ScorePreviewCard score={scorePreview}/>

          <DeleteWarning>
            NÃO ESQUECER DE TIRAR O ZOOM E ENQUADRAR A FOTO ANTES DE ENVIAR!!
          </DeleteWarning>

          <Button
            vanilla={false}
            type="submit"
            style={{ marginTop: `1rem`, marginBottom: `4rem` }}
          >
            Enviar Score <FaArrowUpRightFromSquare />
          </Button>

          <BallTriangle
            height={36}
            width={36}
            radius={5}
            color={theme?.colors.primary}
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isLoadingSubmitScore}
          />
        </FormWrapper>
      </ContentWrapper>
    </>
  );
};

export default ScoreCreateForm;
