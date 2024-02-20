import { FunctionComponent, useState } from "react";
import { GlobalContainer } from "../../styles/global";
import { ProfilePicture, ProfilePictureForm, ProfileWrapper } from "./styles";
import { usePlayer } from "../../providers/Players";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import * as yup from "yup";
import UpdateButton from "../../components/Button_Update";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaFileAlt } from "react-icons/fa";
import { IProfilePicFormData } from "../../types/form-types";
import { profilePictureResolver } from "../../resolvers";

interface DashboardProfileProps {}

const DashboardProfile: FunctionComponent<DashboardProfileProps> = () => {
  const { playerData, uploadProfilePicture, isUploading } = usePlayer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfilePicFormData>({
    resolver: profilePictureResolver,
  });

  const onProfilePictureSubmit: SubmitHandler<IProfilePicFormData> = async (
    data: IProfilePicFormData
  ) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    uploadProfilePicture(formData);
  };

  return (
    <GlobalContainer>
      <ProfileWrapper>
        <ProfilePicture
          src={
            playerData?.profilePicture
              ? playerData?.profilePicture
              : `/src/assets/img/default_player.png`
          }
        />
        <Modal
          isOpen={false}
          openingText="Alterar Foto de Perfil"
          actionType="update"
        >
          <GlobalContainer>
            <p>
              Os arquivos de imagem devem ter até 8Mb de tamanho e ser .jpeg ou
              .png
            </p>
            <ProfilePictureForm
              id="profile_pic_form"
              onSubmit={handleSubmit(onProfilePictureSubmit)}
            >
              <Input
                name="file"
                icon={FaFileAlt}
                type="file"
                register={register}
                error={errors.file?.message}
              />
            </ProfilePictureForm>
            <UpdateButton vanilla={false} type="submit" form="profile_pic_form">
              Enviar
            </UpdateButton>
          </GlobalContainer>
        </Modal>
      </ProfileWrapper>
    </GlobalContainer>
  );
};

export default DashboardProfile;
