import styled from "styled-components";

interface ModalWrapperProps {
  isOpen: boolean;
}

export const ModalWrapper = styled.div<ModalWrapperProps>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center; /* Center the modal vertically */
  align-items: center; /* Center the modal horizontally */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

export const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 20px;
  border-radius: 0.3rem;
  max-width: 80%; /* Set maximum width */
  max-height: 80%; /* Set maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  margin: auto; /* Center the modal content */
  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
