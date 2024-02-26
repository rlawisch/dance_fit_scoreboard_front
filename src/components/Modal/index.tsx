import { FunctionComponent, ReactNode } from "react";
import { ModalContent, ModalWrapper } from "./styles";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode | undefined;
  onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  children,
  onClose,
}) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        {children}
        <Button vanilla={false} onClick={() => closeModal()}>
          Fechar
        </Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
