import { FunctionComponent, ReactNode, useState } from "react";
import { ModalContent, ModalWrapper } from "./styles";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode | undefined
}

const Modal: FunctionComponent<ModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <Button vanilla={true} onClick={() => toggleModal()}>Teste</Button>
      <ModalWrapper isOpen={isOpen}>
        <ModalContent>
            {props.children}
            <Button vanilla={false} onClick={() => closeModal()}>Fechar</Button>
        </ModalContent>
      </ModalWrapper>
    </div>
  );
};

export default Modal;
