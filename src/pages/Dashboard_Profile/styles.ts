import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const ProfilePictureForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

export const UploadBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CropperFullWrapper = styled.div``;

export const CropperWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 1rem;
`;

export const ControlsWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;
