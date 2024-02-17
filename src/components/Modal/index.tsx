import { FunctionComponent, ReactNode, useState } from "react";
import { ModalContent, ModalWrapper } from "./styles";
import Button from "../Button";
import UpdateButton from "../Button_Update";
import DeleteButton from "../Button_Delete";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode | undefined;
  actionType?: "update" | "delete";
  openingText: string;
}

const Modal: FunctionComponent<ModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {!props.actionType && (
        <Button vanilla={true} onClick={() => toggleModal()}>
          {props.openingText}
        </Button>
      )}

      {props.actionType === "update" && (
        <UpdateButton onClick={() => toggleModal()}>{props.openingText}</UpdateButton>
      )}

      {props.actionType === "delete" && (
        <DeleteButton onClick={() => toggleModal()}>{props.openingText}</DeleteButton>
      )}

      <ModalWrapper isOpen={isOpen}>
        <ModalContent>
          {props.children}
          <Button vanilla={false} onClick={() => closeModal()}>
            Fechar
          </Button>
        </ModalContent>
      </ModalWrapper>
    </div>
  );
};

export default Modal;
