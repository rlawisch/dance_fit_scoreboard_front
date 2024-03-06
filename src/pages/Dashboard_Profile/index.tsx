import React, { FunctionComponent, useContext, useState } from "react";
import { GlobalContainer } from "../../styles/global";
import {
  CropperFullWrapper,
  CropperWrapper,
  ProfilePicture,
  ProfilePictureForm,
  ProfileWrapper,
  SliderWrapper,
} from "./styles";
import { usePlayer } from "../../providers/Players";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import UpdateButton from "../../components/Button_Update";
import { useForm } from "react-hook-form";
import { FaFileAlt } from "react-icons/fa";
import { IProfilePicFormData } from "../../types/form-types";
import { profilePictureResolver } from "../../resolvers";
import { BallTriangle } from "react-loader-spinner";
import { ThemeContext } from "styled-components";
import useModal from "../../providers/Modal";
import Cropper, { Area } from "react-easy-crop";
import { readFile } from "../../utils/readFile";
import { getCroppedImg, getRotatedImage } from "../../utils/canvasUtils";
import { Orientation, getOrientation } from "get-orientation/browser";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { yupResolver } from "@hookform/resolvers/yup";

interface DashboardProfileProps {}

const ORIENTATION_TO_ANGLE = {
  [Orientation.TOP_LEFT]: 0,
  [Orientation.TOP_RIGHT]: 0,
  [Orientation.BOTTOM_RIGHT]: 180,
  [Orientation.BOTTOM_LEFT]: 180,
  [Orientation.LEFT_TOP]: -90,
  [Orientation.RIGHT_TOP]: 90,
  [Orientation.RIGHT_BOTTOM]: 90,
  [Orientation.LEFT_BOTTOM]: -90,
};

const DashboardProfile: FunctionComponent<DashboardProfileProps> = () => {
  const { playerData, uploadProfilePicture, isUploading } = usePlayer();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({} as Area);


  const onCropComplete = (croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: string | null = null;

      try {
        const fileData = await readFile(file);

        const orientation: Orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];

        if (typeof fileData === "string") {
          imageDataUrl = fileData;
        } else if (fileData instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          imageDataUrl = decoder.decode(fileData);
        }

        if (typeof imageDataUrl === "string" && rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {
        console.warn("Failed to process the image:", e);
      }

      setImageSrc(imageDataUrl);
    }
  };

  const {
    isOpen: isOpenPicUpdate,
    openModal: openPicUpdateModal,
    closeModal: closePicUpdateModal,
  } = useModal();

  const theme = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfilePicFormData>({
    resolver: profilePictureResolver,
  });

  yupResolver;

  const onProfilePictureSubmit = async () => {
    try {
      if (imageSrc) {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation
        );

        if (croppedImage !== null) {
          const response = await fetch(croppedImage);
          const blob = await response.blob();
          const file = new File([blob], "profile_picture.jpg", {
            type: "image/jpeg",
          });

          const formData = new FormData();
          formData.append("file", file, "profile_picture.jpg");

          // Check if FormData is populated
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }

          // Call the uploadProfilePicture function with the cropped image
          uploadProfilePicture(formData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContainer>
      <ProfileWrapper>
        <ProfilePicture
          src={
            playerData?.profilePicture
              ? playerData?.profilePicture
              : `/img/default_player.png`
          }
        />

        <UpdateButton onClick={openPicUpdateModal}>Alterar Avatar</UpdateButton>
        <Modal isOpen={isOpenPicUpdate} onClose={closePicUpdateModal}>
          <GlobalContainer>
            <p>
              Os arquivos de imagem devem ter até 8Mb de tamanho e ser .jpeg ou
              .png
            </p>

            <ProfilePictureForm onSubmit={handleSubmit(onProfilePictureSubmit)}>
              <Input
                name="file"
                icon={FaFileAlt}
                type="file"
                register={register}
                onChange={onFileChange}
                error={errors?.file}
              />

              {imageSrc && (
                <CropperFullWrapper>
                  <CropperWrapper>
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      rotation={rotation}
                      zoom={zoom}
                      aspect={3 / 3}
                      cropShape="round"
                      onCropChange={setCrop}
                      onRotationChange={setRotation}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </CropperWrapper>
                  <SliderWrapper>
                    <Typography
                      variant="overline"
                      style={{ marginRight: "16px", padding: "8px" }}
                    >
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
                  <SliderWrapper>
                    <Typography
                      variant="overline"
                      style={{ marginRight: "16px", padding: "8px" }}
                    >
                      Rotation
                    </Typography>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      onChange={(_, rotation) =>
                        setRotation(
                          typeof rotation === "number" ? rotation : rotation[0]
                        )
                      }
                    />
                  </SliderWrapper>
                </CropperFullWrapper>
              )}

              <UpdateButton vanilla={false} type="submit">
                Enviar
              </UpdateButton>
              <BallTriangle
                height={36}
                width={36}
                radius={5}
                color={theme?.colors.primary}
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={isUploading}
              />
            </ProfilePictureForm>
          </GlobalContainer>
        </Modal>
      </ProfileWrapper>
    </GlobalContainer>
  );
};

export default DashboardProfile;
