import styled from "styled-components";

interface ModalWrapperProps {
  isOpen: boolean;
}

export const ModalWrapper = styled.div<ModalWrapperProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background};
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 20px;
  border-radius: 0.3rem;
  position: absolute;
  min-width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
