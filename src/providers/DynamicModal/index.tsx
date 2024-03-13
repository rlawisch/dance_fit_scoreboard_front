import { useState } from "react";

type ModalKey = string | number;

const useDynamicModal = (initialState: Record<ModalKey, boolean> = {}) => {
  const [modalStates, setModalStates] = useState(initialState);

  const openModal = (key: ModalKey) => {
    setModalStates((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const closeModal = (key: ModalKey) => {
    setModalStates((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const isModalOpen = (key: ModalKey) => {
    return modalStates[key] || false;
  };

  return { isModalOpen, openModal, closeModal };
};

export default useDynamicModal;
