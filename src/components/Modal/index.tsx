import { FunctionComponent, ReactNode, useEffect } from "react";
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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return isOpen ? (
    <ModalWrapper isOpen={isOpen} onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <Button vanilla={false} onClick={closeModal}>
          Fechar
        </Button>
      </ModalContent>
    </ModalWrapper>
  ) : null;
};

export default Modal;
